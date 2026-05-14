"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    category: "Getting Started",
    items: [
      { q: "How do I create an account?", a: "Click 'Sign Up Free' on the homepage. Choose Freelancer or Client, fill in your details, and you're in. No credit card required for the free plan." },
      { q: "What's the difference between Freelancer and Client accounts?", a: "Freelancers create gig listings, use AI tools to optimize their career, and get found by clients. Clients browse talent, post project requirements, and hire freelancers." },
      { q: "Is NexusAI free to use?", a: "Yes. The free plan gives you a full profile, gig browsing, and 5 AI Pitch generations per month. Pro plan ($19/month) unlocks unlimited AI features." },
    ],
  },
  {
    category: "AI Features",
    items: [
      { q: "How does the AI Pitch Builder work?", a: "Fill a short form with your role, skills, experience, tone, and target audience. Gemini AI generates a portfolio summary, cover letter template, and LinkedIn bio in under 30 seconds." },
      { q: "How accurate is the Career Analytics demand score?", a: "The demand score is calculated from your skills compared against current market signals and gig posting trends. It's directional guidance, not a guaranteed earnings prediction." },
      { q: "Does the AI Career Coach remember previous conversations?", a: "Yes. Each conversation is saved and the AI uses your profile data and conversation history to give increasingly personalized advice." },
      { q: "Can I use AI features without a paid plan?", a: "The free plan includes 5 AI Pitch generations per month. Career Analytics, Smart Recommendations, and the Career Coach are available on the Pro plan." },
    ],
  },
  {
    category: "Payments & Pricing",
    items: [
      { q: "How do payments work between clients and freelancers?", a: "Currently NexusAI is a discovery and intelligence platform. Payment coordination happens directly between clients and freelancers. Integrated payments are on our roadmap." },
      { q: "Can I cancel my Pro subscription anytime?", a: "Yes. Cancel anytime from your dashboard settings. You keep Pro access until the end of your billing period." },
      { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee on the Pro plan if you're not satisfied. Contact support at hello@nexusai.com." },
    ],
  },
  {
    category: "Account & Privacy",
    items: [
      { q: "Is my data used to train AI models?", a: "No. Your profile and prompt data is used only in real-time to generate your personalized outputs. We do not use your data for model training." },
      { q: "Can I delete my account?", a: "Yes. Go to Dashboard → Settings → Delete Account. All your data is permanently removed within 30 days." },
      { q: "How do I report a problem with a freelancer or gig?", a: "Use the Report button on any gig or profile page. Our moderation team reviews all reports within 48 hours." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-sm pr-4">{q}</span>
        <ChevronDown className={cn("h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="container py-12 md:py-16 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about NexusAI.
        </p>
      </div>

      {faqs.map((section) => (
        <div key={section.category} className="space-y-3">
          <h2 className="text-lg font-semibold text-primary">{section.category}</h2>
          {section.items.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      ))}

      <div className="text-center py-8 border rounded-lg space-y-3 bg-muted/30">
        <p className="font-medium">Still have questions?</p>
        <p className="text-sm text-muted-foreground">Our team is happy to help.</p>
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}