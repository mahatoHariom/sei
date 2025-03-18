import { NextRequest, NextResponse } from "next/server";
import { UserDetail } from "./types";

const PUBLIC_ROUTES = new Set(["/", "/about", "/contact"]);
const AUTH_ROUTES = new Set(["/login", "/register"]);
const VERIFICATION_ROUTE = "/complete";
const PROTECTED_ROUTES = ["/user/dashboard", "/admin/dashboard"];

type User = {
  id: string;
  isVerified: boolean;
  role: string;
  userDetail?: UserDetail;
};

class AuthMiddleware {
  private request: NextRequest;
  private pathname: string;
  private user: User | null;

  constructor(request: NextRequest) {
    this.request = request;
    this.pathname = request.nextUrl.pathname;
    this.user = this.parseUserFromCookie();
  }

  private parseUserFromCookie(): User | null {
    try {
      const userCookie = this.request.cookies.get("user")?.value;
      return userCookie ? JSON.parse(userCookie) : null;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
      return null;
    }
  }

  private redirect(path: string): NextResponse {
    const redirectUrl = new URL(path, this.request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  private isProtectedRoute(): boolean {
    return PROTECTED_ROUTES.some((route) => this.pathname.startsWith(route));
  }

  private isAuthRoute(): boolean {
    return AUTH_ROUTES.has(this.pathname);
  }

  private isPublicRoute(): boolean {
    return PUBLIC_ROUTES.has(this.pathname);
  }

  public handleRequest(): NextResponse {
    // Allow all routes if no user cookie exists
    if (!this.request.cookies.has("user")) {
      return NextResponse.next();
    }

    // Handle cases when user cookie exists
    if (!this.user) {
      // Invalid cookie - clear it and allow access
      const response = NextResponse.next();
      response.cookies.delete("user");
      return response;
    }

    // User is authenticated but not verified
    if (!this.user.isVerified) {
      if (this.pathname !== VERIFICATION_ROUTE) {
        return this.redirect(VERIFICATION_ROUTE);
      }
      return NextResponse.next();
    }

    // Verified user trying to access auth routes
    if (this.isAuthRoute() || this.pathname === VERIFICATION_ROUTE) {
      return this.redirect("/");
    }

    // Allow access to protected routes if verified
    if (this.isProtectedRoute()) {
      return NextResponse.next();
    }

    // Allow public routes for all users
    return NextResponse.next();
  }
}

export function middleware(request: NextRequest): NextResponse {
  const authMiddleware = new AuthMiddleware(request);
  return authMiddleware.handleRequest();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
