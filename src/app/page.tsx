import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AIShowcase } from "@/components/home/AIShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrendingGigs } from "@/components/home/TrendingGigs";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { PricingSection } from "@/components/home/PricingSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AIShowcase />
        <TrendingGigs />
        <CategoriesSection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection />
        <BlogPreview />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
      </main>
    </div>
  );
}