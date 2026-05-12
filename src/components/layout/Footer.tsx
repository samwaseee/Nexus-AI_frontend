import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">NexusAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The AI-powered career intelligence layer for the gig economy. Work smarter, not harder.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-primary">Explore Gigs</Link></li>
              <li><Link href="/talent" className="hover:text-primary">Browse Talent</Link></li>
              <li><Link href="/register" className="hover:text-primary">Join as Freelancer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">AI Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/ai-pitch" className="hover:text-primary">Pitch Builder</Link></li>
              <li><Link href="/dashboard/analytics" className="hover:text-primary">Career Analytics</Link></li>
              <li><Link href="/dashboard/chat" className="hover:text-primary">AI Career Coach</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NexusAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}