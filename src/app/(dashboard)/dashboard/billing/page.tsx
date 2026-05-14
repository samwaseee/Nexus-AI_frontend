"use client";

import { useState } from "react";
import { CreditCard, Check, Zap, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    features: ["5 AI Pitch generations/month", "Basic analytics", "Profile & gig listing", "Community support"],
    current: false,
  },
  {
    name: "Pro",
    price: 19,
    period: "month",
    features: ["Unlimited AI features", "Full career analytics", "Smart recommendations", "AI career coach", "Priority placement"],
    current: true,
    popular: true,
  },
  {
    name: "Agency",
    price: 49,
    period: "month",
    features: ["Everything in Pro", "10 team members", "Team analytics", "API access", "Dedicated support"],
    current: false,
  },
];

const invoices = [
  { id: "INV-001", date: "2025-04-01", amount: 19, status: "paid", plan: "Pro" },
  { id: "INV-002", date: "2025-03-01", amount: 19, status: "paid", plan: "Pro" },
  { id: "INV-003", date: "2025-02-01", amount: 19, status: "paid", plan: "Pro" },
];

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleUpgrade = async (planName: string) => {
    setLoadingPlan(planName);
    await new Promise((r) => setTimeout(r, 1500));
    setLoadingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
      </div>

      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold">Pro Plan — Active</div>
              <div className="text-sm text-muted-foreground">Next billing date: May 1, 2025 · $19.00</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Change Plan</Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary shadow-md" : ""}>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{plan.name}</div>
                  {plan.popular && <Badge className="text-xs">Popular</Badge>}
                  {plan.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                </div>
                <div>
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current || loadingPlan === plan.name}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.current ? "Current Plan" : loadingPlan === plan.name ? "Processing..." : `Switch to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Payment Method</CardTitle>
            <Button variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" /> Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg border">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-sm">Visa ending in 4242</div>
              <div className="text-xs text-muted-foreground">Expires 12/2026</div>
            </div>
            <Badge variant="secondary" className="ml-auto text-xs">Default</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Billing History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{inv.plan} Plan</div>
                    <div className="text-xs text-muted-foreground">{inv.id} · {formatDate(inv.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs bg-green-500">Paid</Badge>
                  <span className="font-semibold text-sm">${inv.amount}.00</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}