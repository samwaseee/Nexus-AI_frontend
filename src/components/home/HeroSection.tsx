"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";
import createGlobe from "cobe";

// ─── GEMINI LOGO COMPONENT ──────────────────────────────────────────────
const GeminiLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 22C12 22 12 14.5 3.5 12C12 9.5 12 2 12 2C12 2 12 9.5 20.5 12C12 14.5 12 22 12 22Z"
      fill="currentColor"
    />
  </svg>
);

// ─── FRAMER-STYLE ANIMATION VARIANTS ────────────────────────────────────
const customEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: customEase },
  },
};

const globeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 2, ease: customEase, delay: 0.2 },
  },
};

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  // Delay start to match stagger animation timing
  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 22); // speed — lower = faster

    return () => clearTimeout(timeout);
  }, [displayed, started, text]);

  return (
    <p className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-middle animate-pulse" />
      )}
    </p>
  );
}

// ─── 3D GLOBE COMPONENT ─────────────────────────────────────────────────
function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !resolvedTheme) return;

    const isDark = resolvedTheme === "dark";
    let phi = 0;

    const size = Math.min(window.innerWidth, 1000);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1, // Optimized for performance
      width: size,
      height: size,
      phi: 0,
      theta: 0.2,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 8000,
      mapBrightness: isDark ? 8 : 2,
      baseColor: isDark ? [0.05, 0.05, 0.08] : [1, 1, 1],
      markerColor: [0.49, 0.27, 0.93],
      glowColor: isDark ? [0.15, 0.08, 0.25] : [0.9, 0.7, 0.9],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [51.5074, -0.1278], size: 0.04 },
        { location: [23.8103, 90.4125], size: 0.07 },
        { location: [35.6762, 139.6503], size: 0.04 },
      ],
    });

    // High-performance Request Animation Frame Loop
    let animationId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      if (time - lastTime < 33) return; // Cap at ~30 FPS
      lastTime = time;
      phi += 0.003;
      globe.update({ phi });
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, [isMounted, resolvedTheme]);

  if (!isMounted || !resolvedTheme) {
    return <div style={{ width: "100%", aspectRatio: "1/1", display: "block" }} />;
  }

  return (
    <div style={{ width: "100%", maxWidth: "1000px", aspectRatio: "1/1", margin: "0 auto" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

// ─── MAIN HERO SECTION ──────────────────────────────────────────────────
export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[95vh] pt-32 pb-0 bg-background flex flex-col items-center justify-center [perspective:2000px]">

      {/* ─── LAYER 1: LIQUID BACKGROUND ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="hidden">
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div
          className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40"
          style={{ filter: "url(#liquid-goo)" }}
        >
          <motion.div
            animate={{ x: ["0vw", "20vw", "-10vw", "0vw"], y: ["0vh", "15vh", "-10vh", "0vh"], scale: [1, 1.2, 0.8, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-primary/60 mix-blend-multiply dark:mix-blend-screen blur-3xl"
          />
          <motion.div
            animate={{ x: ["0vw", "-25vw", "15vw", "0vw"], y: ["0vh", "-15vh", "20vh", "0vh"], scale: [1, 0.9, 1.3, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-secondary/60 mix-blend-multiply dark:mix-blend-screen blur-3xl"
          />
          <motion.div
            animate={{ x: ["0vw", "15vw", "-20vw", "0vw"], y: ["0vh", "-20vh", "15vh", "0vh"], scale: [1, 1.4, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-primary/40 mix-blend-multiply dark:mix-blend-screen blur-3xl"
          />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ─── LAYER 2: 3D GLOBE (Right Side + Transparent Blend) ─── */}
      {isMounted && (
        <motion.div
          variants={globeVariants}
          initial="hidden"
          animate="show"
          className="absolute top-[15%] -right-[60%] md:-right-[20%] w-[160vw] md:w-[90vw] max-w-[1100px] aspect-square pointer-events-none opacity-90"
          style={{
            // The Magic Trick: Screen in Dark Mode (kills black), Multiply in Light Mode (kills white)
            mixBlendMode: resolvedTheme === "dark" ? "screen" : "multiply",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 50%, transparent 80%)",
            maskImage: "radial-gradient(circle at 50% 50%, black 50%, transparent 80%)",
          }}
        >
          <InteractiveGlobe />
        </motion.div>
      )}

      {/* ─── LAYER 3: FOREGROUND CONTENT ─── */}
      <div className="container relative z-20 flex flex-col items-center md:items-start mt-[-10vh] md:pr-[40vw]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl text-center md:text-left space-y-8"
        >
          <motion.div variants={textRevealVariants} className="flex justify-center md:justify-start">
            <Badge
              variant="outline"
              className="px-5 py-2 text-sm bg-background/50 border-primary/30 text-foreground backdrop-blur-md rounded-full shadow-sm"
            >
              <GeminiLogo className="h-4 w-4 mr-2 text-primary" />
              Powered by Gemini 3.0
            </Badge>
          </motion.div>

          <motion.h1
            variants={textRevealVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.95]"
          >
            Your AI Career
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block pb-2 mt-2">
              Co-Pilot for the
            </span>
            Gig Economy
          </motion.h1>

          <motion.div variants={textRevealVariants}>
            <TypewriterText
              text="NexusAI analyzes market volatility, crafts elite pitches, and optimizes your rates using real-time neural data."
              className="text-lg md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-medium"
            />
          </motion.div>

          <motion.div
            variants={textRevealVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6"
          >
            <Button
              size="lg"
              asChild
              className="h-14 px-10 text-lg font-bold rounded-full shadow-[0_0_30px_rgba(var(--primary),0.2)] hover:shadow-[0_0_40px_rgba(var(--primary),0.4)] transition-all"
            >
              <Link href={ROUTES.REGISTER}>
                Initialize Career <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-14 px-10 text-lg font-bold rounded-full bg-background/50 backdrop-blur-md hover:bg-accent transition-all"
            >
              <Link href={ROUTES.EXPLORE}>Explore Gigs</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}