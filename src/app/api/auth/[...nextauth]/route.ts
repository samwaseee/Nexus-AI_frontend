import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Assuming you saved authOptions in src/lib/auth.ts

const handler = NextAuth(authOptions);

// Next.js App Router requires exporting the handler for specific HTTP methods
export { handler as GET, handler as POST };