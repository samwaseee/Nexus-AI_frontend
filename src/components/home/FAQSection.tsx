"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What makes NexusAI different from Upwork or Fiverr?",
    a: "NexusAI isn't just a marketplace — it's an AI intelligence layer for your career. While Upwork and Fiverr are purely transactional, NexusAI gives you tools to understand your market value, generate winning pitches, and get specific career coaching. Think of us as the 'brain' behind your gig career.",
  },
  {
    q: "How does the AI Pitch Builder work?",
    a: "You fill a short form with your role, skills, years of experience, tone preference, and target audience. Our AI (powered by Google Gemini) generates a full portfolio summary, a cover letter template, and a LinkedIn-style bio — all tailored to your exact profile. Takes under 30 seconds.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "No. Your profile data is only used in real-time to generate personalized outputs during your session. We do not store your prompts for model training or share your data with third parties.",
  },
  {
    q: "Can I use NexusAI as a client hiring talent?",
    a: "Yes. Register as a Client to browse verified freelancers, filter by skills and availability, view portfolios and ratings, and post gig requests. Our AI can also help you find the best-matched talent for your specific project.",
  },
  {
    q: "How accurate is the Career Analytics demand score?",
    a: "The demand score is calculated using your skills compared against current market signals, trending categories, and rate benchmarks from thousands of gig postings. It's a directional signal to guide your positioning, not a guarantee of earnings.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan gives you a full profile, gig browsing, and 5 AI Pitch generations per month. Upgrade to Pro for unlimited AI features, full analytics, and advanced recommendations.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className="border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium pr-4">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked <span className="text-primary">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about NexusAI.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}