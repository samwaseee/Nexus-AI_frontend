"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Users, Briefcase, Star, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: 12000, suffix: "+", label: "Freelancers Registered" },
  { icon: Briefcase, value: 8500, suffix: "+", label: "Gigs Posted" },
  { icon: Star, value: 4.8, suffix: "/5", label: "Average Rating", decimals: 1 },
  { icon: Globe, value: 48, suffix: "+", label: "Countries Served" },
];

// ─── REUSABLE ROLLING NUMBER COMPONENT ───────────────────────────────────
function RollingNumber({ value, duration = 2, decimals = 0 }: { value: number; duration?: number; decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: duration,
        ease: [0.32, 0.72, 0, 1], // Custom professional ease-out
      });
    }
  }, [isInView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              {/* Icon Container with subtle white-wash hover effect */}
              <div className="mb-4 inline-flex items-center justify-center p-3 rounded-xl bg-white/10 border border-white/5 group-hover:bg-white/20 transition-all duration-300">
                <stat.icon className="h-7 w-7 text-white" />
              </div>

              <div className="space-y-1">
                <div className="text-4xl md:text-5xl font-black tracking-tighter">
                  <RollingNumber value={stat.value} decimals={stat.decimals} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">
                  {stat.label}
                </div>
              </div>

              {/* A subtle highlight line to add polish */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                className="h-1 bg-white/20 mx-auto mt-4 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}