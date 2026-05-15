"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { Send, Bot, User, Sparkles, RefreshCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"; 
import { useChat } from "@/hooks/useAI";

function PitchBuilderChat() {
  const searchParams = useSearchParams();
  
  // 1. Check if the user is actually logged in!
  const { status } = useSession(); 

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: "ai", 
      text: "Ready to win your next gig. Paste the job description or client requirements below, and I will draft a highly optimized, professional pitch for you." 
    }
  ]);

  // 2. Use your custom React Query hook instead of raw aiApi
  const { mutateAsync: sendChat, isPending: isTyping } = useChat();

  const hasAutoSubmitted = useRef(false);

  // ─── REUSABLE SUBMIT LOGIC ───
  const submitMessage = async (textToSubmit: string, currentMessages = messages) => {
    if (!textToSubmit.trim()) return;

    // PREVENT CRASH: Stop the API call if they aren't logged in
    if (status === "unauthenticated") {
      setMessages((prev) => [...prev, { role: "user", text: textToSubmit }, { 
        role: "ai", text: "🚨 Please log in to generate an AI Pitch! I need your authentication token to proceed." 
      }]);
      setInput("");
      return;
    }

    const newMessages = [...currentMessages, { role: "user", text: textToSubmit }];
    setMessages(newMessages);
    setInput("");

    try {
      const validHistory = currentMessages.length > 1 ? currentMessages.slice(1) : [];
      const optimizedHistory = validHistory.slice(-4); 

      const mappedHistory = optimizedHistory.map((msg) => ({
        role: msg.role === "ai" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

      const geminiHistory = [
        { 
          role: "user", 
          parts: [{ text: "SYSTEM OVERRIDE: Act strictly as the NexusAI Pitch Builder. Write highly optimized, professional gig economy cover letters based on user input. Acknowledge." }] 
        },
        { 
          role: "model", 
          parts: [{ text: "Acknowledged." }] 
        },
        ...mappedHistory
      ];

      // 3. Trigger your React Query hook
      const res = await sendChat({
        message: textToSubmit, 
        history: geminiHistory 
      });

      setMessages((prev) => [...prev, {
        role: "ai",
        text: res.data?.data?.response || res.data?.response || "Could not parse response."
      }]);

    } catch (error) {
      console.error("AI Pitch Builder Error:", error);
      setMessages((prev) => [...prev, {
        role: "ai",
        text: "System error: Unable to generate pitch. Ensure you are logged in and your backend is running."
      }]);
    }
  };

  // ─── AUTO-SUBMIT FROM URL PARAMETERS ───
  useEffect(() => {
    const promptParam = searchParams.get("prompt");
    
    // Only fire if the prompt exists, hasn't fired yet, AND auth is fully loaded
    if (promptParam && !hasAutoSubmitted.current && status !== "loading") {
      hasAutoSubmitted.current = true; 
      
      submitMessage(promptParam, messages);
      window.history.replaceState(null, '', '/ai-pitch');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, status]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input, messages);
  };

  const handleReset = () => {
    setMessages([{ role: "ai", text: "Memory cleared. Paste the next job description when you are ready!" }]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-10rem)] max-w-4xl mx-auto flex flex-col space-y-6">
      
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pitch Builder</h1>
          <p className="text-muted-foreground">Generate the perfect proposal for your next client.</p>
        </div>
      </div>

      {/* Auth Warning Banner */}
      {status === "unauthenticated" && (
        <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">You are currently logged out. You must sign in to use the AI Pitch Builder.</p>
        </div>
      )}

      <Card className="flex-1 flex flex-col overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-muted/10 py-4 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">Draft a Proposal</CardTitle>
            <CardDescription>Enter the job details below and let NexusAI write your cover letter.</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Clear Memory
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-6 bg-background">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`rounded-xl p-4 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 whitespace-pre-wrap border border-border/50"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-xl p-4 text-sm bg-muted/50 border border-border/50 flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-75" />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 bg-background border-t">
          <form onSubmit={handleSend} className="flex gap-3">
            <Input
              placeholder={status === "unauthenticated" ? "Log in to start typing..." : "Paste job description, specific requirements, or client tone..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status === "unauthenticated" || isTyping}
              className="flex-1 h-12 rounded-full px-6 bg-muted/50 border-border focus-visible:ring-primary/20 disabled:opacity-50"
            />
            <Button type="submit" disabled={!input.trim() || isTyping || status === "unauthenticated"} className="h-12 w-12 rounded-full p-0 shadow-md disabled:opacity-50">
              <Send className="h-5 w-5" />
              <span className="sr-only">Generate Pitch</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default function AIPitchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading interface...</div>}>
      <PitchBuilderChat />
    </Suspense>
  );
}