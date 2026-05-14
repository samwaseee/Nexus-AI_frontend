import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row w-full bg-background">
      
      {/* The sidebar will handle its own link rendering based on the session */}
      <DashboardSidebar />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
        <div className="w-full">
          {children}
        </div>
      </main>
      
    </div>
  );
}