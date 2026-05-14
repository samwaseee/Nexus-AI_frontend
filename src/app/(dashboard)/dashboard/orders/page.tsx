"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, PackageOpen, Clock, CheckCircle, XCircle, ArrowRight, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

// 1. Strict TypeScript Interface (No more 'any' errors!)
interface Order {
  _id: string;
  orderNumber: string;
  title: string;
  client: { name: string };
  freelancer: { name: string };
  amount: number;
  status: "pending" | "in_progress" | "completed" | "cancelled" | "in_dispute";
  deadline: string;
}

// 2. Type-Safe Status Configuration
const statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  pending: { label: "Pending Start", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Clock },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
  in_dispute: { label: "In Dispute", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  // Fetch Orders for the logged-in user
  const { data: response, isLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: () => api.get("/orders").then((res) => res.data),
  });

  const orders: Order[] = response?.data || [];

  // Filter logic based on tabs
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
                          order.title.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === "active") return ["pending", "in_progress", "in_dispute"].includes(order.status);
    if (activeTab === "completed") return order.status === "completed";
    if (activeTab === "cancelled") return order.status === "cancelled";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">Track your active projects and deliveries.</p>
        </div>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search order # or title..." 
              className="pl-8" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="m-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>
                {activeTab === "active" ? "Current Projects" : activeTab === "completed" ? "Past Deliveries" : "Cancelled Orders"}
              </CardTitle>
              <CardDescription>
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  Loading your orders...
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-muted/10">
                  <div className="bg-muted p-4 rounded-full mb-4">
                    <PackageOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No orders found</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {"You don't have any orders matching this status or search criteria."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status]?.icon || Clock;
                    return (
                      <div key={order._id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium hover:underline cursor-pointer">
                              {order.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>#{order.orderNumber}</span>
                            <span>•</span>
                            <span>With: {order.freelancer?.name || order.client?.name}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                          <div className="text-left sm:text-right min-w-[100px]">
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="font-medium">${order.amount.toFixed(2)}</p>
                          </div>
                          
                          <div className="text-left sm:text-right min-w-[120px]">
                            <p className="text-sm text-muted-foreground">Due Date</p>
                            <p className="font-medium">{new Date(order.deadline).toLocaleDateString()}</p>
                          </div>

                          <Badge variant="outline" className={`ml-auto sm:ml-0 flex items-center gap-1 ${statusConfig[order.status]?.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[order.status]?.label}
                          </Badge>

                          <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}