/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { NextRequest, NextResponse } from "next/server";

// Define public and protected routes
const publicRoutes = ["/login", "/register", "/"];
const protectedRoutes = [
  // "/course",
  // "/contact",
  "/user/dashboard",
  "/admin/dashboard",
];

const isPublicRoute = (path: string): boolean => {
  // Check if the path exactly matches a public route or starts with one
  return publicRoutes.some((route) => path === route || path.startsWith(route));
};

const isProtectedRoute = (path: string): boolean => {
  // Check if the path starts with any of the protected routes
  return protectedRoutes.some((route) => path.startsWith(route));
};

const redirectTo = (path: string, request: NextRequest): NextResponse => {
  const redirectResponse = NextResponse.redirect(new URL(path, request.url));
  redirectResponse.headers.set("x-middleware-cache", "no-cache"); // Disable caching
  return redirectResponse;
};

export function middleware(request: NextRequest): NextResponse {
  const userCookie = request.cookies.get("user")?.value;
  let user = null;

  // Parse user cookie if it exists
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
      // Clear invalid user cookie if needed
      const response = redirectTo("/login", request);
      response.cookies.delete("user");
      return response;
    }
  }

  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users trying to access protected routes
  if (!user && isProtectedRoute(pathname)) {
    return redirectTo("/login", request);
  }

  // Redirect verified users away from the "/complete" page
  if (user?.isVerified && pathname === "/complete") {
    return redirectTo("/", request);
  }

  // Redirect unverified users trying to access protected routes to "/complete"
  if (user && !user.isVerified && isProtectedRoute(pathname)) {
    return redirectTo("/complete", request);
  }

  // Redirect authenticated users away from auth pages (login/register)
  if (user && ["/login", "/register"].includes(pathname)) {
    return redirectTo("/", request);
  }

  // Allow the request to proceed if no redirection conditions were met
  return NextResponse.next();
}

// Apply middleware to all routes except those listed
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
