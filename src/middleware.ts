import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_PATHS = ["/dashboard", "/profile", "/learn"];

// Routes only for unauthenticated users — redirect logged-in users away
const AUTH_ONLY_PATHS = ["/auth/login", "/auth/register", "/auth/forgot-password"];

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isProtected = PROTECTED_PATHS.some((p) => nextUrl.pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY_PATHS.some((p) => nextUrl.pathname.startsWith(p));

  // Unauthenticated user hitting a protected route → send to login with callbackUrl
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user hitting an auth page → send to dashboard
  if (isAuthOnly && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  // Pass pathname header for server components that need it
  const headers = new Headers(req.headers);
  headers.set("x-pathname", nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
