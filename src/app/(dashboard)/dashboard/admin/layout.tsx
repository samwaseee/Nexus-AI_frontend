import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Assuming this is where your authOptions live
import { ShieldAlert } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. The Vault Door: Double-check authentication on the server
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      {/* 2. Admin Warning Banner */}
      <div className="flex items-center justify-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg border border-destructive/20 text-sm font-medium">
        <ShieldAlert className="h-4 w-4" />
        <span>
          <strong>Admin Mode Active:</strong> You have elevated privileges. Actions taken here affect the entire platform.
        </span>
      </div>

      {/* 3. Render the Admin Pages */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}