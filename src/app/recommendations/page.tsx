"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, ArrowRight, Activity, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRecommendations } from "@/hooks/useAI";

// ─── TYPES ──────────────────────────────────────────────────────────────
type SkillInsight = {
  name: string;
  demand: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

type GigInsight = {
  title: string;
  description: string;
};

type AIInsightsData = {
  skillsToLearn: SkillInsight[];
  suggestedGigs: GigInsight[];
};

// ─── GEMINI LOGO COMPONENT ──────────────────────────────────────────────
const GeminiLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22C12 22 12 14.5 3.5 12C12 9.5 12 2 12 2C12 2 12 9.5 20.5 12C12 14.5 12 22 12 22Z" fill="currentColor" />
  </svg>
);

const CACHE_KEY = "nexus_ai_insights_cache";
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days in milliseconds

export default function AIRecommendationsPage() {
  const router = useRouter();

  // Local state to hold the data since we are using a mutation hook
  const [data, setData] = useState<AIInsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 1. Initialize your custom hook
  const { mutateAsync: fetchRecommendations } = useRecommendations();

  // 2. Fetch or load from cache on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);

      // Check for valid cached data first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, payload } = JSON.parse(cached);
        // If the cache is less than 7 days old, load it and skip the API call
        if (Date.now() - timestamp < CACHE_DURATION_MS) {
          setData(payload);
          setIsLoading(false);
          return;
        }
      }

      try {
        // Trigger your custom hook!
        // You can pass any necessary user context here for the backend
        const res = await fetchRecommendations({
          role: "freelancer",
          focus: "tech"
        });

        // Use the response from your backend (fallback to simulated data if backend is empty during testing)
        const freshData: AIInsightsData = res.data || {
          skillsToLearn: [
            { name: "Model Deployment (MLOps)", demand: "+45% Demand", variant: "default" },
            { name: "Advanced RAG Pipelines", demand: "+32% Demand", variant: "default" },
            { name: "Streamlit UI Integration", demand: "Emerging Trend", variant: "secondary" }
          ],
          suggestedGigs: [
            {
              title: "AI Chatbot Integration",
              description: "Since you know React, offering OpenAI integration is highly lucrative.",
            },
            {
              title: "Next.js Performance Audit",
              description: "High demand from agencies needing to fix slow dashboards.",
            }
          ]
        };

        setData(freshData);

        // Save the fresh data to localStorage with a new timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          payload: freshData
        }));

      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchRecommendations]);

  // 3. Route to the Pitch Builder with Context
  const handleDraftGig = (title: string, description: string) => {
    const autoPrompt = `I want to offer a freelance service for: "${title}". ${description}. Please write a professional, high-converting cover letter/pitch for this specific gig.`;
    router.push(`/ai-pitch?prompt=${encodeURIComponent(autoPrompt)}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* ─── HEADER ─── */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <GeminiLogo className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Market Insights</h1>
          <p className="text-muted-foreground">Personalized career trajectories mapped by Gemini 1.5 Flash.</p>
        </div>
      </div>

      {isError && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Failed to connect to the neural network. Please check your connection or log in.</p>
        </div>
      )}

      {/* ─── CONTENT GRID ─── */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* SKILLS CARD */}
        <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skill Acquisition Matrix
            </CardTitle>
            <CardDescription>Based on high-paying trajectories in your category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-6 w-full bg-muted/60 animate-pulse rounded" />
                <div className="h-6 w-full bg-muted/50 animate-pulse rounded" />
                <div className="h-6 w-3/4 bg-muted/40 animate-pulse rounded" />
              </div>
            ) : (
              data?.skillsToLearn.map((skill, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <Badge variant={skill.variant} className="ml-2 whitespace-nowrap">{skill.demand}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* GIGS CARD */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Suggested Gig Packages
            </CardTitle>
            <CardDescription>Ready-to-deploy market offerings generated for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {isLoading ? (
              <div className="space-y-4">
                <div className="h-24 w-full bg-muted/60 animate-pulse rounded-lg" />
                <div className="h-24 w-full bg-muted/40 animate-pulse rounded-lg" />
              </div>
            ) : (
              data?.suggestedGigs.map((gig, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30 group">
                  <h4 className="font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors">{gig.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{gig.description}</p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs font-medium hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleDraftGig(gig.title, gig.description)}
                  >
                    Draft this Gig <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}