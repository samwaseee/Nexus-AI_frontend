"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started in the gig economy.",
    badge: null,
    features: [
      "Create freelancer profile",
      "Browse all gigs",
      "5 AI Pitch generations/month",
      "Basic career analytics",
      "Community support",
    ],
    cta: "Get Started Free",
    href: ROUTES.REGISTER,
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious freelancers who want to grow fast.",
    badge: "Most Popular",
    features: [
      "Everything in Free",
      "Unlimited AI Pitch generations",
      "Full career analytics & insights",
      "Smart recommendations engine",
      "Unlimited AI career coach chat",
      "Priority profile placement",
      "Advanced market demand scores",
    ],
    cta: "Start Pro Trial",
    href: ROUTES.REGISTER,
    variant: "default" as const,
  },
  {
    name: "Agency",
    price: "$49",
    period: "per month",
    description: "For agencies and teams managing multiple freelancers.",
    badge: null,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team analytics dashboard",
      "Custom AI prompts",
      "API access",
      "Dedicated account manager",
      "White-label options",
    ],
    cta: "Contact Sales",
    href: ROUTES.CONTACT,
    variant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent <span className="text-primary">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free. Upgrade when you&apos;re ready to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="px-3 py-1">{plan.badge}</Badge>
                </div>
              )}
              <Card className={`h-full ${plan.badge ? "border-primary shadow-lg shadow-primary/10" : ""}`}>
                <CardHeader className="p-6 pb-4">
                  <div className="font-semibold text-lg">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <Button variant={plan.variant} className="w-full" asChild>
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}