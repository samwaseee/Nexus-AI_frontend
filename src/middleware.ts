import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Grab the token (NextAuth handles the secret automatically in most setups, 
  // but if it fails, add secret: process.env.NEXTAUTH_SECRET)
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // ─── 1. AUTH PAGES (Hide if logged in) ──────────────────────────────────
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage) {
    if (token) {
      // Bounce logged-in users straight to their dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next(); // Let guests see the login page
  }

  // ─── 2. DASHBOARD PROTECTION ───────────────────────────────────────────
  if (pathname.startsWith("/dashboard")) {
    // If no token, kick them to login
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    const role = token.role;

    // Admin Restrictions
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Freelancer Restrictions
    const freelancerRoutes = ["/dashboard/gigs", "/dashboard/orders", "/dashboard/finances"];
    if (freelancerRoutes.some(r => pathname.startsWith(r)) && role !== "freelancer") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Client Restrictions
    const clientRoutes = ["/dashboard/purchases", "/dashboard/saved", "/dashboard/billing"];
    if (clientRoutes.some(r => pathname.startsWith(r)) && role !== "client") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // We explicitly tell the middleware to watch the dashboard AND auth pages
  matcher: ["/dashboard/:path*", "/login", "/register"],
};