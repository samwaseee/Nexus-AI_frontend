"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { BrainCircuit, Menu } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
              NexusAI
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6 text-sm font-medium">
            <Link href="/explore" className="transition-colors hover:text-primary">Explore Gigs</Link>
            <Link href="/talent" className="transition-colors hover:text-primary">Browse Talent</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">About</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {session ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="secondary" className="font-medium">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={() => signOut()}>Log Out</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}