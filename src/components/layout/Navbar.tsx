"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BrainCircuit,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User,
  Wand2,
  BarChart2,
  MessageSquare,
  Sparkles,
  Briefcase,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const publicNavLinks = [
  { href: ROUTES.EXPLORE, label: "Explore Gigs" },
  { href: ROUTES.TALENT, label: "Browse Talent" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.BLOG, label: "Blog" },
];

const aiFeatureLinks = [
  { href: ROUTES.DASHBOARD_PITCH, label: "Pitch Builder", icon: Wand2, desc: "Generate pro pitches & bios" },
  { href: ROUTES.DASHBOARD_ANALYTICS, label: "Career Analytics", icon: BarChart2, desc: "Analyze your market demand" },
  { href: ROUTES.DASHBOARD_RECOMMENDATIONS, label: "Smart Recommendations", icon: Sparkles, desc: "AI-curated gig matches" },
  { href: ROUTES.DASHBOARD_CHAT, label: "AI Career Coach", icon: MessageSquare, desc: "Chat with your AI advisor" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "NA";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">

        {/* ─── Logo ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">NexusAI</span>
          </Link>

          {/* ─── Desktop Nav ─────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md transition-colors hover:text-primary hover:bg-muted",
                  pathname === link.href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* AI Features dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground transition-colors hover:text-primary hover:bg-muted text-sm font-medium">
                  AI Features
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal mb-1">
                  Powered by Gemini AI
                </DropdownMenuLabel>
                {aiFeatureLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-start gap-3 p-2 rounded-md cursor-pointer">
                      <item.icon className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* ─── Right side ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {session ? (
            /* Authenticated user menu */
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-border bg-muted px-2 py-1 text-sm hover:bg-accent transition-colors">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {initials}
                    </div>
                    <span className="max-w-[100px] truncate font-medium">{user?.name}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-muted-foreground font-normal capitalize">{user?.role}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.DASHBOARD} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.DASHBOARD_PROFILE} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "freelancer" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.DASHBOARD_GIGS} className="cursor-pointer">
                          <Briefcase className="mr-2 h-4 w-4" /> My Gigs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ROUTES.DASHBOARD_PITCH} className="cursor-pointer">
                          <Wand2 className="mr-2 h-4 w-4" /> AI Pitch Builder
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.DASHBOARD_USERS} className="cursor-pointer">
                        <Users className="mr-2 h-4 w-4" /> Manage Users
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Guest buttons */
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={ROUTES.LOGIN}>Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.REGISTER}>Sign Up Free</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* ─── Mobile menu ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-1">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t mt-2">
            <p className="px-3 py-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">AI Features</p>
            {aiFeatureLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t mt-2 flex flex-col gap-2">
            {session ? (
              <>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href={ROUTES.DASHBOARD} onClick={() => setMobileOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>Log In</Link>
                </Button>
                <Button size="sm" asChild className="w-full">
                  <Link href={ROUTES.REGISTER} onClick={() => setMobileOpen(false)}>Sign Up Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}