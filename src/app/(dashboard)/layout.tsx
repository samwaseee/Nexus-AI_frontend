import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth/next";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Uncomment this when you are ready to strictly enforce authentication
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/login?callbackUrl=/dashboard");
  // }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      <div className="w-full md:w-64 shrink-0 border-r bg-muted/30">
        <DashboardSidebar />
      </div>
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}