import { BrainCircuit, Target, Users, Zap, Heart, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const team = [
  { name: "Alex Rivera", role: "CEO & Co-Founder", avatar: "AR", bio: "Former Google engineer. 10+ years in AI and marketplace products." },
  { name: "Priya Sharma", role: "CTO & Co-Founder", avatar: "PS", bio: "Ex-Meta ML engineer. Built recommendation systems at scale." },
  { name: "Marcus Chen", role: "Head of Product", avatar: "MC", bio: "Previously led product at Toptal. Obsessed with freelancer success." },
  { name: "Sara Kim", role: "Head of AI", avatar: "SK", bio: "PhD in NLP. Spent 5 years at DeepMind before joining NexusAI." },
];

const values = [
  { icon: Target, title: "Freelancer First", description: "Every decision we make starts with one question: does this help freelancers earn more and work better?" },
  { icon: Zap, title: "AI With Purpose", description: "We don't use AI for the sake of it. Every AI feature solves a real problem freelancers face daily." },
  { icon: Heart, title: "Radical Transparency", description: "No hidden fees, no opaque algorithms. We tell you exactly how demand scores and recommendations are calculated." },
  { icon: Globe, title: "Global by Default", description: "Talent is everywhere. Our platform is built for freelancers and clients across every timezone and currency." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl text-center space-y-6">
          <Badge variant="secondary" className="mb-2">Our Story</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            We built the career layer the{" "}
            <span className="text-primary">gig economy was missing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            NexusAI started when our founders kept watching brilliant freelancers
            undercharge, underpitch, and underperform — not from lack of skill,
            but lack of market intelligence. We built the AI co-pilot we wish
            they had.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 container max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To give every freelancer — regardless of where they are or how
              long they've been working — access to the same career intelligence
              that top agencies have. Market data, AI-powered positioning, and
              personalized coaching, democratized.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe the future of work is independent. NexusAI exists to
              make that future more equitable, more profitable, and more
              sustainable for the people building it.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Freelancers served", value: "12,000+" },
              { label: "Countries represented", value: "48" },
              { label: "AI pitches generated", value: "85,000+" },
              { label: "Avg rate increase", value: "43%" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-5 text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 container">
        <h2 className="text-3xl font-bold text-center mb-12">Meet the team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground mx-auto">
                  {member.avatar}
                </div>
                <div>
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-xs text-primary">{member.role}</div>
                </div>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <BrainCircuit className="h-12 w-12 mx-auto opacity-80" />
          <h2 className="text-3xl font-bold">Join us in building the future of work</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Whether you're a freelancer looking to grow or a client looking for top talent —
            NexusAI is built for you.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}