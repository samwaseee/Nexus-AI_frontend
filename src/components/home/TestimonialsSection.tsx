"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Full-Stack Developer",
    avatar: "SK",
    rating: 5,
    text: "The AI Pitch Builder helped me rewrite my entire portfolio. My profile views went up 3x and I landed my first $5,000 project within two weeks.",
  },
  {
    name: "Marcus T.",
    role: "UI/UX Designer",
    avatar: "MT",
    rating: 5,
    text: "Career Analytics showed me I was undercharging by 40%. I raised my rates and still kept all my clients. This tool paid for itself 100x over.",
  },
  {
    name: "Priya S.",
    role: "Data Scientist",
    avatar: "PS",
    rating: 5,
    text: "The AI Career Coach is like having a mentor available 24/7. It gave me a specific skill roadmap that helped me break into ML consulting.",
  },
  {
    name: "Jake R.",
    role: "DevOps Engineer",
    avatar: "JR",
    rating: 5,
    text: "Smart Recommendations pointed me toward cloud architecture gigs I hadn't considered. Now it's my highest-earning niche by far.",
  },
  {
    name: "Aisha M.",
    role: "Content Strategist",
    avatar: "AM",
    rating: 5,
    text: "Finally a platform that understands the gig economy. The AI tools aren't generic — they actually know my skills and give specific advice.",
  },
  {
    name: "Chen W.",
    role: "Mobile Developer",
    avatar: "CW",
    rating: 5,
    text: "I used the Pitch Builder before a major client pitch and won the contract. The client specifically mentioned my proposal stood out from 50+ others.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Freelancers who{" "}
            <span className="text-primary">love NexusAI</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results from real freelancers using our AI-powered tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}