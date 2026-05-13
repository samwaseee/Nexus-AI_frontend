"use client";

import { motion } from "framer-motion";
import {
  Wand2, BarChart2, Sparkles, MessageSquare, Search, Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Wand2,
    title: "AI Pitch Builder",
    description: "Generate personalized portfolio summaries, cover letters, and LinkedIn bios in seconds. Stand out from the competition.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BarChart2,
    title: "Career Analytics",
    description: "Get demand scores, salary benchmarks, and skill gap analysis based on real market data for your exact skill set.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "AI surfaces the highest-demand gig categories, tools to learn, and portfolio projects to build for your profile.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: MessageSquare,
    title: "AI Career Coach",
    description: "Context-aware chat coach that knows your profile and gives specific, actionable advice — not generic tips.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Search,
    title: "Smart Gig Discovery",
    description: "Advanced search with filters for budget, skills, delivery time, and experience level to find the perfect match.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Every freelancer profile is verified and skill-tested. Clients get quality talent, freelancers get credibility.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-primary">win in the gig economy</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            NexusAI combines talent marketplace with AI intelligence — giving you
            an unfair advantage over every competitor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full border hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}