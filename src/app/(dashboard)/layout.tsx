import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
// import { redirect } from "next/navigation";
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row w-full bg-background">
      
      <DashboardSidebar />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
        {/* Changed from 'mx-auto max-w-7xl' to just 'w-full' */}
        <div className="w-full">
          {children}
        </div>
      </main>
      
    </div>
  );
}