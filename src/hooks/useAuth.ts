import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const role = user?.role;
  const accessToken = user?.accessToken;

  const isAdmin = role === "admin";
  const isFreelancer = role === "freelancer";
  const isClient = role === "client";

  const logout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.HOME);
    router.refresh();
  };

  return {
    user,
    role,
    accessToken,
    isLoading,
    isAuthenticated,
    isAdmin,
    isFreelancer,
    isClient,
    logout,
  };
}