"use client";

import { useState } from "react";
import { ShoppingBag, Clock, CheckCircle, XCircle, Eye, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockOrders = [
  { id: "ORD-001", gig: "Full-Stack Next.js Web Application", client: "TechCorp Inc.", amount: 799, status: "in_progress", date: "2025-04-01", delivery: "2025-04-15" },
  { id: "ORD-002", gig: "UI/UX Design for Mobile App", client: "StartupXYZ", amount: 599, status: "completed", date: "2025-03-15", delivery: "2025-03-25" },
  { id: "ORD-003", gig: "ML Model Development", client: "DataDriven Co.", amount: 2499, status: "pending", date: "2025-04-05", delivery: "2025-04-26" },
  { id: "ORD-004", gig: "AWS Cloud Architecture Setup", client: "CloudFirst Ltd.", amount: 1299, status: "completed", date: "2025-02-20", delivery: "2025-03-05" },
  { id: "ORD-005", gig: "React Native Mobile App", client: "AppVentures", amount: 1499, status: "cancelled", date: "2025-03-01", delivery: "2025-03-31" },
];

const statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-blue-500/10 text-blue-600", icon: Clock },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600", icon: XCircle },
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockOrders.filter((o) => {
    const matchesSearch = o.gig.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || o.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalEarnings = mockOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Track and manage all your active and past orders.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Orders", value: mockOrders.length, color: "text-foreground" },
          { label: "In Progress", value: mockOrders.filter(o => o.status === "in_progress").length, color: "text-blue-600" },
          { label: "Completed", value: mockOrders.filter(o => o.status === "completed").length, color: "text-green-600" },
          { label: "Total Earned", value: formatCurrency(totalEarnings), color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle className="text-base">All Orders</CardTitle>
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "in_progress", "completed", "cancelled"].map((s) => (
                <Button
                  key={s}
                  variant={filter === s ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setFilter(s)}
                >
                  {s === "all" ? "All" : s.replace("_", " ")}
                </Button>
              ))}
            </div>
          </div>
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 max-w-xs"
          />
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="No orders found" description="No orders match your current filters." />
          ) : (
            <div className="space-y-3">
              {filtered.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{order.gig}</div>
                        <div className="text-xs text-muted-foreground">{order.client} · {order.id}</div>
                        <div className="text-xs text-muted-foreground">
                          Ordered {formatDate(order.date)} · Due {formatDate(order.delivery)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-12 sm:ml-0">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                      <span className="font-bold text-sm">{formatCurrency(order.amount)}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}