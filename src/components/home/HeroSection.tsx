"use client";

import Link from "next/link";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react"; // Removed unused icon imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

// ─── REUSABLE FLOATING WRAPPER ───────────────────────────────────────────
function HeroFloatingWrapper({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5); // Fixed: changed top to height for accuracy
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
      className="relative w-full"
    >
      <div 
        style={{ 
          transform: "translateZ(100px)",
          transformStyle: "preserve-3d" 
        }} 
      >
        {children}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-[#0a0a0b] [perspective:2000px]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-900/10 pointer-events-none" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="container relative py-20 md:py-32">
        <HeroFloatingWrapper>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Badge variant="outline" className="mb-4 px-5 py-2 text-sm bg-white/5 border-primary/30 text-primary-foreground backdrop-blur-md">
                <Sparkles className="h-4 w-4 mr-2 text-primary animate-pulse" />
                Powered by Gemini 1.5 Pro
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]"
            >
              Your AI Career
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500 block pb-2">
                Co-Pilot for the
              </span>
              Gig Economy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              NexusAI analyzes market volatility, crafts elite pitches,
              and optimizes your rates using real-time neural data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button size="lg" asChild className="h-14 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                <Link href={ROUTES.REGISTER}>
                  Initialize Career <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-10 text-lg font-bold rounded-full border-white/10 hover:bg-white/5 backdrop-blur-sm">
                <Link href={ROUTES.EXPLORE}>System Explore</Link>
              </Button>
            </motion.div>
          </div>
        </HeroFloatingWrapper>
      </div>
    </section>
  );
}