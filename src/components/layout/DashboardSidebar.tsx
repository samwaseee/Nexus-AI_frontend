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
  Briefcase
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

  const links = role === "client" 
    ? [...commonLinks, ...clientLinks]
    : [...commonLinks, ...freelancerLinks];

  return (
    <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)] hidden md:block">
      <nav className="flex flex-col gap-2 p-4">
        <div className="mb-4 px-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {role === "client" ? "Client Portal" : "Talent Portal"}
          </h2>
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}