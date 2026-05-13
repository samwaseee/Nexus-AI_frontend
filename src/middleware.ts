import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 1. Protect Admin Routes
    if (pathname.startsWith("/dashboard/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 2. Protect Freelancer-Specific AI Tools
    const freelancerRoutes = [
      "/dashboard/ai-pitch",
      "/dashboard/recommendations",
      "/dashboard/chat",
      "/dashboard/analytics"
    ];

    if (freelancerRoutes.some(route => pathname.startsWith(route)) && token?.role === "client") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // This ensures the middleware only runs if the user is authenticated
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // Protect all dashboard routes, but ignore internal Next.js files
  matcher: ["/dashboard/:path*"],
};