"use client";

import { motion } from "framer-motion";
import { UserPlus, BrainCircuit, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and build your freelancer profile with your skills, experience, and career goals.",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "Let AI Analyze You",
    description: "Our AI reads your profile and compares it against live market data to score your demand.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Get AI-Powered Tools",
    description: "Use the Pitch Builder, Career Coach, and Recommendations to upgrade your positioning.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Land Better Gigs",
    description: "Apply with AI-crafted pitches, attract higher-paying clients, and grow your income.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How NexusAI <span className="text-primary">works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From signup to your first AI-powered pitch in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center space-y-4"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <step.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">{step.step}</span>
              </div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}