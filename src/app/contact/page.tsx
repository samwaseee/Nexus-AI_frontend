"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@nexusai.com", href: "mailto:hello@nexusai.com" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA (Remote-first)", href: null },
  { icon: Clock, label: "Response time", value: "Within 24 hours", href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, feedback, or partnership idea? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <Card key={item.label}>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <div className="text-sm font-medium">{item.value}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-5 space-y-2">
                <div className="font-semibold">For developers</div>
                <p className="text-sm text-primary-foreground/80">
                  Check our API docs and integrate NexusAI into your workflow.
                </p>
                <a href="#" className="text-sm underline">View API Docs →</a>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-semibold">Message sent!</h3>
                    <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        rows={6}
                        placeholder="Tell us more..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}