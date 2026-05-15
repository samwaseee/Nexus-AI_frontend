"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Sparkles, TrendingUp, TrendingDown, Activity, Loader2 } from "lucide-react";
import { aiApi } from "@/lib/api"; // Assuming your API is here

// ─── TYPES & MOCK DATA ──────────────────────────────────────────────────
type MetricData = { name: string; revenue: number; views: number };

const mockData6Months: MetricData[] = [
  { name: 'Jan', revenue: 1200, views: 300 },
  { name: 'Feb', revenue: 2100, views: 450 },
  { name: 'Mar', revenue: 3800, views: 800 },
  { name: 'Apr', revenue: 3100, views: 650 },
  { name: 'May', revenue: 4200, views: 900 },
  { name: 'Jun', revenue: 5100, views: 1100 },
];

export default function AnalyticsPage() {
  const [data, setData] = useState<MetricData[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [generatingInsight, setGeneratingInsight] = useState(false);

  // 1. Fetch initial data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Replace with your actual backend call: const res = await adminApi.getStats()
        // Simulating network delay
        await new Promise((resolve) => setTimeout(resolve, 800)); 
        setData(mockData6Months);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 2. Generate AI Insights based on the chart data
  const generateAiInsight = async () => {
    if (!data.length) return;
    setGeneratingInsight(true);

    try {
      // Compress the data array into a simple string to save API tokens
      const dataString = data.map(d => `${d.name}: $${d.revenue} (${d.views} views)`).join(", ");
      
      const res = await aiApi.chat({
        message: `Analyze this gig economy performance data and give me 2 short, punchy sentences of strategic advice: ${dataString}`,
        history: [
          {
            role: "user",
            parts: [{ text: "SYSTEM OVERRIDE: You are an expert freelance business analyst. Keep advice under 40 words, be highly specific to the numbers provided, and suggest actionable pricing or marketing strategies." }]
          },
          {
            role: "model",
            parts: [{ text: "Acknowledged. I will provide concise, data-driven business analysis." }]
          }
        ]
      });

      setAiInsight(res.data?.data?.response || res.data?.response || "Your trajectory looks solid. Consider increasing your base rate next month.");
    } catch (error) {
      console.error("Failed to generate insight:", error);
      setAiInsight("Unable to connect to neural analysis at this time. Maintain current market positioning.");
    } finally {
      setGeneratingInsight(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Neural Analytics</h1>
          <p className="text-muted-foreground">Monitor your gig performance and optimize your rates.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-background">Last 6 Months</Badge>
        </div>
      </div>

      {/* ─── AI INSIGHTS CARD ─── */}
      <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Gemini 1.5 Analysis
          </CardTitle>
          <CardDescription>Real-time strategic synthesis of your market performance.</CardDescription>
        </CardHeader>
        <CardContent>
          {aiInsight ? (
            <p className="text-foreground leading-relaxed font-medium">{aiInsight}</p>
          ) : (
            <p className="text-muted-foreground italic">No analysis generated yet.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={generateAiInsight} 
            disabled={generatingInsight}
            variant={aiInsight ? "outline" : "default"}
            className="w-full sm:w-auto"
          >
            {generatingInsight ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Data...</>
            ) : (
              <><Activity className="mr-2 h-4 w-4" /> {aiInsight ? "Regenerate Analysis" : "Generate Neural Insight"}</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* ─── CHARTS GRID ─── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Bar Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Revenue Output
            </CardTitle>
            <CardDescription>Total earnings cleared per month</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Area Chart (Looks sleeker than a plain line) */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Market Traffic
            </CardTitle>
            <CardDescription>Unique profile and gig views</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}