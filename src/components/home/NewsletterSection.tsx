"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay ahead of the <span className="text-primary">market</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Weekly insights on trending skills, rate benchmarks, and AI career
            tips — delivered to your inbox. No spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">You&apos;re in! Check your inbox.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
              <Button type="submit" className="h-11 px-6 flex-shrink-0" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground">
            Join 5,000+ freelancers already subscribed. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}