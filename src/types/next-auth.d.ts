import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserRole, Availability } from "./index";

declare module "next-auth" {
  // Extending the built-in Session type
  interface Session {
    user: {
      _id: string;
      id: string;
      role: UserRole;
      accessToken: string;
      isVerified: boolean;
      availability: Availability;
    } & DefaultSession["user"];
  }

  // Extending the built-in User type
  interface User extends DefaultUser {
    _id: string;
    id: string;
    role: UserRole;
    accessToken: string;
    isVerified: boolean;
    availability: Availability;
  }
}

declare module "next-auth/jwt" {
  // Extending the built-in JWT type
  interface JWT extends DefaultJWT {
    _id: string;
    id: string;
    role: UserRole;
    accessToken: string;
    isVerified: boolean;
    availability: Availability;
  }
}