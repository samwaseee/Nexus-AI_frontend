import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protects all routes starting with /dashboard
  matcher: ["/dashboard/:path*"],
};