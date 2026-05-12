import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  // Extending the built-in Session type
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
    accessToken: string;
  }

  // Extending the built-in User type
  interface User extends DefaultUser {
    role: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  // Extending the built-in JWT type
  interface JWT extends DefaultJWT {
    role: string;
    accessToken: string;
  }
}