"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wand2, BarChart2, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

const aiFeatures = [
  {
    icon: Wand2,
    badge: "Content Generator",
    title: "Pitch Builder",
    description: "Fill a short form. Get a full portfolio summary, cover letter, and LinkedIn bio — tailored to your exact skills and target clients.",
    cta: "Try Pitch Builder",
    href: ROUTES.DASHBOARD_PITCH,
    color: "text-primary",
    badgeVariant: "default" as const,
  },
  {
    icon: BarChart2,
    badge: "Data Analyzer",
    title: "Career Analytics",
    description: "Know your market demand score, salary range, top skill gaps, and trending skills in your niche — all from your profile.",
    cta: "Analyze Career",
    href: ROUTES.DASHBOARD_ANALYTICS,
    color: "text-secondary",
    badgeVariant: "secondary" as const,
  },
  {
    icon: Sparkles,
    badge: "Recommendations",
    title: "Smart Recommendations",
    description: "AI matches you to the highest-demand gig categories, suggests skills to learn, and even recommends portfolio projects to build.",
    cta: "Get Recommendations",
    href: ROUTES.DASHBOARD_RECOMMENDATIONS,
    color: "text-destructive",
    badgeVariant: "destructive" as const,
  },
  {
    icon: MessageSquare,
    badge: "Chat Assistant",
    title: "AI Career Coach",
    description: "Ask anything — 'Should I raise my rate?', 'What skills should I learn?', 'How do I write a better proposal?' — and get specific answers.",
    cta: "Chat with Coach",
    href: ROUTES.DASHBOARD_CHAT,
    color: "text-primary",
    badgeVariant: "default" as const,
  },
];

export function AIShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" /> 4 AI Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your AI-powered{" "}
            <span className="text-primary">career intelligence</span> suite
          </h2>
          <p className="text-muted-foreground text-lg">
            Four deeply integrated AI tools that work together to accelerate
            your freelance career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <Badge variant={feature.badgeVariant} className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={feature.href}>
                      {feature.cta} <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}