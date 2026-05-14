"use client";

import { useSession } from "next-auth/react";
import { UserRole } from "@/types"; // Adjust import based on where your types live

export function useRole() {
  const { data: session, status } = useSession();

  // Safely extract the role, defaulting to null if not loaded
  const role = (session?.user?.role as UserRole) || null;

  return {
    role,
    isAdmin: role === "admin",
    isClient: role === "client",
    isFreelancer: role === "freelancer",
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}