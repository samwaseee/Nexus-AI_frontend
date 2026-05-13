"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Palette, Database, Cloud, Brain,
  Shield, Bitcoin, PenTool, Megaphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

const categories = [
  { name: "Web Development", icon: Code2, count: "2.4k gigs", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Mobile Development", icon: Smartphone, count: "1.2k gigs", color: "text-green-500", bg: "bg-green-500/10" },
  { name: "UI/UX Design", icon: Palette, count: "1.8k gigs", color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Data Science", icon: Database, count: "980 gigs", color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "DevOps & Cloud", icon: Cloud, count: "760 gigs", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { name: "AI & Machine Learning", icon: Brain, count: "1.1k gigs", color: "text-primary", bg: "bg-primary/10" },
  { name: "Cybersecurity", icon: Shield, count: "430 gigs", color: "text-red-500", bg: "bg-red-500/10" },
  { name: "Blockchain", icon: Bitcoin, count: "520 gigs", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "Content Writing", icon: PenTool, count: "890 gigs", color: "text-secondary", bg: "bg-secondary/10" },
  { name: "Digital Marketing", icon: Megaphone, count: "670 gigs", color: "text-destructive", bg: "bg-destructive/10" },
];

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span className="text-primary">category</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            10 high-demand categories. All with AI demand scores and rate benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`${ROUTES.EXPLORE}?category=${encodeURIComponent(cat.name)}`}
              >
                <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <cat.icon className={`h-5 w-5 ${cat.color}`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm leading-tight">{cat.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{cat.count}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}