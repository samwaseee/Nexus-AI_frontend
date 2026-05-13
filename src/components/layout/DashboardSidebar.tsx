"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  UserCircle, 
  PenTool, 
  Lightbulb, 
  MessageSquare, 
  BarChart3, 
  Briefcase,
  Users,
  Settings
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role || "freelancer";

  // Base links everyone sees
  const commonLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  // Freelancer-specific AI tool links
  const freelancerLinks = [
    { name: "AI Pitch Builder", href: "/dashboard/ai-pitch", icon: PenTool },
    { name: "Smart Matches", href: "/dashboard/recommendations", icon: Lightbulb },
    { name: "Career Coach", href: "/dashboard/chat", icon: MessageSquare },
  ];

  // Client/Manager specific links
  const clientLinks = [
    { name: "Manage Gigs", href: "/dashboard/gigs", icon: Briefcase },
    { name: "Talent Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  ];

  // Admin specific links
  const adminLinks = [
    { name: "Platform Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Manage Gigs", href: "/dashboard/admin/gigs", icon: Briefcase },
    { name: "System Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  // Resolve links based on role
  let links;
  if (role === "admin") {
    links = adminLinks;
  } else if (role === "client") {
    links = [...commonLinks, ...clientLinks];
  } else {
    links = [...commonLinks, ...freelancerLinks];
  }

  return (
    <aside 
      className="group relative z-20 hidden md:flex flex-col border-r bg-card min-h-[calc(100vh-4rem)] w-16 hover:w-64 transition-[width] duration-300 ease-in-out overflow-x-hidden"
    >
      {/* We force the inner nav to always be 64 (256px) wide. 
        This prevents the text from wrapping/crunching onto multiple lines 
        while the parent aside is animating its width.
      */}
      <nav className="flex w-64 flex-col gap-2 p-3">
        
        {/* Portal Title Header */}
        <div className="mb-4 mt-2 flex h-6 items-center px-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {role === "admin" ? "Admin Portal" : role === "client" ? "Client Portal" : "Talent Portal"}
          </h2>
        </div>

        {/* Links Map */}
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center rounded-md px-2.5 py-2.5 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {/* Fixed width container for icon keeps it perfectly centered when collapsed */}
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              </div>
              
              {/* Text fades in and out smoothly on hover */}
              <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}