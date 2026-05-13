import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { API_BASE_URL } from "./constants";
import { Availability, UserRole } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const json = await res.json();

          if (!res.ok || !json.success) return null;

          const { user, accessToken } = json.data;

          // We must return everything defined in our User interface
          return {
            id: user._id,
            _id: user._id, // Add this
            name: user.name,
            email: user.email,
            image: user.avatar,
            role: user.role, // This will now match UserRole
            accessToken,
            isVerified: user.isVerified ?? false, // Add this
            availability: user.availability ?? "available", // Add this
          };
        } catch {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token._id = user._id; // Map the internal ID
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.isVerified = user.isVerified;
        token.availability = user.availability;
      }

      if (account?.provider === "google" && account.id_token) {
        try {
          const res = await fetch(
            `${API_BASE_URL}/auth/google/callback?id_token=${account.id_token}`,
          );
          if (res.ok) {
            const json = await res.json();
            token.accessToken = json.data?.accessToken;
            token.role = json.data?.user?.role;
            token.id = json.data?.user?._id;
            token._id = json.data?.user?._id;
            token.isVerified = json.data?.user?.isVerified;
            token.availability = json.data?.user?.availability;
          }
        } catch {
          // Fallback
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user._id = token._id as string;
        session.user.role = token.role as UserRole; 
        session.user.accessToken = token.accessToken as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.availability = token.availability as Availability;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
