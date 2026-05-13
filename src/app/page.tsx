import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AIShowcase } from "@/components/home/AIShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrendingGigs } from "@/components/home/TrendingGigs";
import { StatsSection } from "@/components/home/StatesSection";
import { TestimonialsSection } from "@/components/home/TesttimonialSecion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. The main hero intro */}
      <HeroSection />
      
      {/* 2. Quick social proof / numbers */}
      <StatsSection />
      
      {/* 3. The AI Tools spotlight */}
      <AIShowcase />
      
      {/* 4. Live marketplace data */}
      <TrendingGigs />
      
      {/* 5. General platform features */}
      <FeaturesSection />
      
      {/* 6. Step-by-step guide */}
      <HowItWorks />
      
      {/* 7. Social proof / Reviews */}
      <TestimonialsSection />
    </div>
  );
}