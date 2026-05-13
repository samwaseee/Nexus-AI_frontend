"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to supercharge your freelance career?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Join 12,000+ freelancers already using NexusAI to earn more,
            pitch better, and grow faster with the power of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="h-12 px-8 text-base font-semibold"
            >
              <Link href={ROUTES.REGISTER}>
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 text-base border-white/30 text-primary-foreground hover:bg-white/10"
            >
              <Link href={ROUTES.EXPLORE}>Browse Gigs</Link>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60">
            No credit card required. Free forever plan available.
          </p>
        </motion.div>
      </div>
    </section>
  );
}