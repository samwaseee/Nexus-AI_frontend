"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiApi } from "@/lib/api";

export default function AIRecommendationsPage() {
  // Fetch AI recommendations based on user's current skills
  const { isLoading } = useQuery({
    queryKey: ["ai-recommendations"],
    queryFn: async () => {
      // In a real flow, you'd pass the user's actual skills here
      const res = await aiApi.getRecommendations({
        skills: ["React", "Next.js"],
        role: "Web Developer"
      });
      return res.data;
    },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Market Insights</h1>
          <p className="text-muted-foreground">Personalized career recommendations based on your profile.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skills to Learn Next
            </CardTitle>
            <CardDescription>Based on high-paying gigs in your category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground animate-pulse">AI is analyzing market data...</p>
            ) : (
              <>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">GraphQL</span>
                  <Badge>+45% Demand</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">AWS Serverless</span>
                  <Badge>+32% Demand</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">Web3 / Ethers.js</span>
                  <Badge variant="secondary">Emerging Trend</Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Gig Packages</CardTitle>
            <CardDescription>AI-generated gig ideas you could start selling today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {isLoading ? (
              <p className="text-sm text-muted-foreground animate-pulse">Generating ideas...</p>
            ) : (
              <>
                <div className="rounded-lg border p-3">
                  <h4 className="font-semibold text-sm mb-1">AI Chatbot Integration</h4>
                  <p className="text-xs text-muted-foreground mb-2">Since you know React, offering OpenAI integration is highly lucrative.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">Draft this Gig <ArrowRight className="ml-1 w-3 h-3"/></Button>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="font-semibold text-sm mb-1">Next.js Performance Audit</h4>
                  <p className="text-xs text-muted-foreground mb-2">High demand from agencies needing to fix slow dashboards.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">Draft this Gig <ArrowRight className="ml-1 w-3 h-3"/></Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}