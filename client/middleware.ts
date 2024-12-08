// /* eslint-disable prefer-const */
// import { NextRequest, NextResponse } from "next/server";

// const isPublicPage = (path: string): boolean =>
//   ["/login", "/register"].includes(path);

// const redirectTo = (path: string, request: NextRequest): NextResponse => {
//   const redirectResponse = NextResponse.redirect(new URL(path, request.url));
//   redirectResponse.headers.set("x-middleware-cache", "no-cache"); // Disable caching
//   return redirectResponse;
// };

// export function middleware(request: NextRequest): NextResponse {
//   const userCookie = request.cookies.get("user")?.value;
//   let user = null;

//   // Parse user cookie if it exists
//   if (userCookie) {
//     try {
//       user = JSON.parse(userCookie);
//     } catch (error) {
//       console.error("Failed to parse user cookie:", error);
//       // Clear invalid user cookie if needed
//       const response = redirectTo("/login", request);
//       response.cookies.delete("user");
//       return response;
//     }
//   }

//   const { pathname } = request.nextUrl;

//   // Redirect unauthenticated users trying to access protected routes
//   if (!user && !isPublicPage(pathname)) {
//     return redirectTo("/login", request);
//   }

//   // Redirect verified users away from the "/complete" page
//   if (user?.isVerified && pathname === "/complete") {
//     return redirectTo("/", request);
//   }

//   // Redirect unverified users trying to access the home page to "/complete"
//   if (user && !user.isVerified && pathname === "/") {
//     return redirectTo("/complete", request);
//   }

//   // Redirect authenticated users away from public pages like login or register
//   if (user && isPublicPage(pathname)) {
//     return redirectTo("/", request);
//   }

//   // Allow the request to proceed if no redirection conditions were met
//   return NextResponse.next();
// }

// // Apply middleware to all routes except those listed
// export const config = {
//   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
// };
