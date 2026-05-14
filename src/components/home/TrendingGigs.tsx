"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { 
  motion, 
  Variants, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { GigCard } from "@/components/cards/GigCard";
import { gigApi } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { Gig } from "@/types";

// ─── 3D FLOATING WRAPPER COMPONENT ─────────────────────────────────────────
function FloatingCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Rotate 15 degrees based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full rounded-2xl transition-secondary"
    >
      <div 
        style={{ 
          transform: "translateZ(75px)", // Creates the floating depth
          transformStyle: "preserve-3d" 
        }} 
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    } 
  },
};

export function TrendingGigs() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending-gigs"],
    queryFn: async () => {
      const res = await gigApi.getGigs({ sortBy: "trending", limit: 4 });
      return res.data;
    },
  });

  const gigs: Gig[] = data?.data ?? [];

  return (
    <section className="py-20 md:py-28 bg-[#0a0a0b] text-white overflow-hidden">
      <div className="container">
        
        {/* HEADER AREA */}
        <div className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Live Trends</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">
              MARKET <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500">LEGENDS</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg max-w-md font-medium leading-relaxed">
              Curated high-performance services dominating the industry this week.
            </p>
          </motion.div>
          
          <Button size="lg" className="rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 px-8 group" asChild>
            <Link href={ROUTES.EXPLORE}>
              Explore All <ArrowRight className="ml-2 h-5 w-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {/* GRID AREA WITH 3D PERSPECTIVE */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "show"} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 [perspective:1500px]"
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl h-[400px] animate-pulse" />
            ))
          ) : (
            gigs.map((gig) => (
              <motion.div 
                key={gig._id} 
                variants={cardVariants}
                className="relative group"
              >
                {/* Outer Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition duration-700"></div>
                
                <FloatingCard>
                  <GigCard gig={gig} />
                </FloatingCard>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}