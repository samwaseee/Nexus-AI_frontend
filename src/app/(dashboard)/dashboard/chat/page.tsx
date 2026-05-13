"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { aiApi } from "@/lib/api"; // Make sure your API is imported!

export default function CareerCoachChatPage() {
    // 1. These are the variables TypeScript was looking for! 
    // They MUST be inside the component function.
    const [messages, setMessages] = useState([
        { role: "ai", text: "Hi! I'm your NexusAI Career Coach. Are you looking for advice on pricing your gigs, learning new skills, or handling a difficult client?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // 2. The updated handleSend function
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message to UI immediately
        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput(""); // Clear the input field
        setIsTyping(true);

        try {
            // 1. Map our simple frontend state into Gemini's strict format
            const geminiHistory = messages.map((msg) => ({
                role: msg.role === "ai" ? "model" : "user",
                parts: [{ text: msg.text }],
            }));

            // 2. Call your actual backend endpoint
            const res = await aiApi.chat({
                message: input,
                history: geminiHistory // Send the correctly formatted array!
            });

            // 3. Update UI (Assuming your controller sends { success: true, data: "..." })
            setMessages([...newMessages, {
                role: "ai",
                // Notice the extra .response added to the chain!
                text: res.data?.data?.response || res.data?.response || "Could not parse response."
            }]);

        } catch (error) {
            console.error("AI Chat Error:", error);
            setMessages([...newMessages, {
                role: "ai",
                text: "Sorry, my AI brain is disconnected right now! Check your backend server."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    // 3. The UI
    return (
        <div className="h-[calc(100vh-10rem)] max-w-4xl mx-auto flex flex-col space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Career Coach</h1>
                <p className="text-muted-foreground">Get personalized advice to grow your freelance business.</p>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`rounded-lg p-3 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 whitespace-pre-wrap"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div className="rounded-lg p-3 text-sm bg-muted/50 flex gap-1 items-center">
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75" />
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                </CardContent>
                <div className="p-4 bg-background border-t">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            placeholder="Ask about pricing, skills, or clients..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={!input.trim() || isTyping}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}