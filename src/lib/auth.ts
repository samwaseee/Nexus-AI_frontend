import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { API_BASE_URL } from "@/lib/constants";
import { UserRole, Availability } from "@/types"; // Import our custom types

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          
          if (res.ok && data.data) {
            // Map the backend response to our strict NextAuth User type
            return {
              id: data.data.user.id || data.data.user._id,
              _id: data.data.user._id || data.data.user.id,
              name: data.data.user.name,
              email: data.data.user.email,
              role: data.data.user.role,
              accessToken: data.data.token,
              isVerified: data.data.user.isVerified || false,
              availability: data.data.user.availability || "available",
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any; 
        
        token.id = u.id;
        token._id = u._id;
        token.role = u.role;
        token.accessToken = u.accessToken;
        token.isVerified = u.isVerified;
        token.availability = u.availability;
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
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
};