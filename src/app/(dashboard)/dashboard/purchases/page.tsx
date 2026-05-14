"use client";

import { useState } from "react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/EmptyState";
import { RatingStars } from "@/components/shared/RatingStars";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockPurchases = [
  { id: "PUR-001", gig: "Full-Stack Next.js Web Application", freelancer: "Sarah Developer", amount: 799, status: "delivered", date: "2025-03-20", rating: 5, reviewed: true },
  { id: "PUR-002", gig: "Professional UI/UX Design System", freelancer: "Marcus Designer", amount: 599, status: "delivered", date: "2025-03-05", rating: 4, reviewed: true },
  { id: "PUR-003", gig: "Python Data Analytics Dashboard", freelancer: "Priya DataSci", amount: 299, status: "in_progress", date: "2025-04-01", rating: 0, reviewed: false },
  { id: "PUR-004", gig: "AWS Cloud Architecture Setup", freelancer: "Jake DevOps", amount: 1299, status: "pending", date: "2025-04-06", rating: 0, reviewed: false },
];

export default function PurchasesPage() {
  const [search, setSearch] = useState("");

  const filtered = mockPurchases.filter(
    (p) =>
      p.gig.toLowerCase().includes(search.toLowerCase()) ||
      p.freelancer.toLowerCase().includes(search.toLowerCase())
  );

  const totalSpent = mockPurchases.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Purchases</h1>
        <p className="text-muted-foreground">All services you&apos;ve purchased on NexusAI.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalSpent)}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-2xl font-bold">{mockPurchases.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Purchases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-2xl font-bold text-green-600">
              {mockPurchases.filter((p) => p.status === "delivered").length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Completed</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Purchase History</CardTitle>
            <Input
              placeholder="Search purchases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No purchases yet" description="Browse gigs and hire your first freelancer." />
          ) : (
            <div className="space-y-3">
              {filtered.map((purchase) => (
                <div key={purchase.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{purchase.gig}</div>
                      <div className="text-xs text-muted-foreground">by {purchase.freelancer}</div>
                      <div className="text-xs text-muted-foreground">{purchase.id} · {formatDate(purchase.date)}</div>
                      {purchase.reviewed && <RatingStars rating={purchase.rating} size="sm" className="mt-1" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-12 sm:ml-0">
                    <Badge
                      variant={purchase.status === "delivered" ? "default" : "secondary"}
                      className="text-xs capitalize"
                    >
                      {purchase.status.replace("_", " ")}
                    </Badge>
                    <span className="font-bold text-sm">{formatCurrency(purchase.amount)}</span>
                    {purchase.status === "delivered" && !purchase.reviewed && (
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Star className="h-3 w-3 mr-1" /> Review
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}