"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Star, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "12,000+", label: "Freelancers Registered", color: "text-primary" },
  { icon: Briefcase, value: "8,500+", label: "Gigs Posted", color: "text-secondary" },
  { icon: Star, value: "4.8/5", label: "Average Rating", color: "text-yellow-500" },
  { icon: Globe, value: "48+", label: "Countries Served", color: "text-destructive" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <stat.icon className="h-8 w-8 mx-auto opacity-80" />
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}