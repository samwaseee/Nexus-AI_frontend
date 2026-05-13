"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, MessageSquare, ShoppingBag, Users, Clock, CheckCircle, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const role = session?.user?.role || "freelancer";

  if (status === "loading") {
    return <div className="animate-pulse h-full w-full bg-muted/20 rounded-xl min-h-[400px]" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {role === "admin" ? "Admin Control Panel" : "Overview"}
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}. Here is your account summary.
        </p>
      </div>

      {/* Render the correct cards based on role */}
      {role === "admin" ? (
        <AdminMetrics />
      ) : role === "client" ? (
        <ClientMetrics />
      ) : (
        <FreelancerMetrics />
      )}
      
      <div className="min-h-[400px] rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/10 mt-8">
        {role === "admin" ? "System Logs / Recent User Activity will go here" : "Recent Activity Feed / Notifications will go here"}
      </div>
    </div>
  );
}

function AdminMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Platform Users</CardTitle><Users className="h-4 w-4 text-primary" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">1,204</div><p className="text-xs text-muted-foreground">+48 new this week</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Platform Revenue</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">$12,450</div><p className="text-xs text-muted-foreground">Generated this month</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending Approval</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold text-amber-500">24</div><p className="text-xs text-muted-foreground">Requires moderation</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Disputes</CardTitle><ShieldAlert className="h-4 w-4 text-destructive" /></CardHeader>
        <CardContent><div className="text-2xl font-bold text-destructive">3</div><p className="text-xs text-muted-foreground">Needs resolution</p></CardContent>
      </Card>
    </div>
  );
}

function ClientMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Projects</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">2</div><p className="text-xs text-muted-foreground">In progress with freelancers</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Spent</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">$840</div><p className="text-xs text-muted-foreground">Across 4 completed orders</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Saved Talent</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">14</div><p className="text-xs text-muted-foreground">Freelancers bookmarked</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending Approvals</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">1</div><p className="text-xs text-muted-foreground">Awaiting your review</p></CardContent>
      </Card>
    </div>
  );
}

function FreelancerMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Orders</CardTitle><ShoppingBag className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">3</div><p className="text-xs text-muted-foreground">2 awaiting requirements</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Unread Messages</CardTitle><MessageSquare className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">12</div><p className="text-xs text-muted-foreground">From 4 different chats</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Earnings (Month)</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">$1,240</div><p className="text-xs text-muted-foreground">+19% from last month</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Profile Views</CardTitle><Activity className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">342</div><p className="text-xs text-muted-foreground">Past 7 days</p></CardContent>
      </Card>
    </div>
  );
}