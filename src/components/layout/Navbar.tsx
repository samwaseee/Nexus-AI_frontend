"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { UserAvatar } from "@/components/shared/UserAvatar"; // IMPORTANT: Import your custom component

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

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const user = session?.user;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
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

          {/* User Avatar Dropdown (Visible on BOTH Mobile and Desktop if logged in) */}
          {session ? (
            <div className="flex items-center ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* Clean circular button, no chevron arrow */}
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden border border-border hover:ring-2 hover:ring-primary transition-all">
                    {/* Using your custom UserAvatar component */}
                    <UserAvatar 
                      user={{ 
                        name: user?.name || "User", 
                        avatar: user?.image || undefined 
                      }} 
                      className="h-full w-full" 
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1">
                  <DropdownMenuLabel>
                    <div className="font-medium truncate">{user?.name}</div>
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
            /* Guest buttons (Hidden on mobile, moved to hamburger) */
            <div className="hidden md:flex items-center gap-2 ml-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={ROUTES.LOGIN}>Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.REGISTER}>Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu toggle (Hamburger) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* ─── Mobile menu (Hamburger Content ONLY) ────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-1 shadow-xl">
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

          {/* Login/Signup inside hamburger ONLY if logged out */}
          {!session && (
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" size="lg" asChild className="w-full">
                <Link href={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>Log In</Link>
              </Button>
              <Button size="lg" asChild className="w-full">
                <Link href={ROUTES.REGISTER} onClick={() => setMobileOpen(false)}>Sign Up Free</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </motion.header>
  );
}