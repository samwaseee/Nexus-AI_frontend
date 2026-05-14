"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  UserCircle, 
  MessageSquare, 
  Briefcase,
  Users,
  Settings,
  ClipboardList,
  Wallet,
  ShoppingCart,
  Bookmark,
  CreditCard,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role || "freelancer";

  // 1. Base links EVERYONE sees
  const commonLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  // 2. FREELANCER (Focus: Earning & Fulfillment)
  const freelancerLinks = [
    { name: "Manage Gigs", href: "/dashboard/gigs", icon: Briefcase },
    { name: "Active Orders", href: "/dashboard/orders", icon: ClipboardList },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Finances", href: "/dashboard/finances", icon: Wallet },
  ];

  // 3. CLIENT (Focus: Spending & Project Management)
  const clientLinks = [
    { name: "My Purchases", href: "/dashboard/purchases", icon: ShoppingCart },
    { name: "Saved Talent", href: "/dashboard/saved", icon: Bookmark },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Billing & Invoices", href: "/dashboard/billing", icon: CreditCard },
  ];

  // 4. ADMIN (Focus: Governance & Platform Health)
  const adminLinks = [
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Gig Moderation", href: "/dashboard/admin/moderation", icon: ShieldCheck },
    { name: "Disputes", href: "/dashboard/admin/disputes", icon: AlertTriangle },
    { name: "System Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  // Resolve links dynamically
  let links;
  if (role === "admin") {
    links = [...commonLinks, ...adminLinks];
  } else if (role === "client") {
    links = [...commonLinks, ...clientLinks];
  } else {
    links = [...commonLinks, ...freelancerLinks];
  }

  return (
    <aside className="group relative z-20 hidden md:flex flex-col border-r bg-card min-h-[calc(100vh-4rem)] w-16 hover:w-64 transition-[width] duration-300 ease-in-out overflow-x-hidden">
      <nav className="flex w-64 flex-col gap-2 p-3">
        <div className="mb-4 mt-2 flex h-6 items-center px-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {role === "admin" ? "Admin Portal" : role === "client" ? "Client Portal" : "Talent Portal"}
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
                "flex items-center rounded-md px-2.5 py-2.5 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              </div>
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