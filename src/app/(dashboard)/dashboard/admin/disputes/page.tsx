"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, AlertTriangle, Loader2, Scale, UserCheck, UserX, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // <-- NEW IMPORT

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminApi } from "@/lib/api";

interface AdminDispute {
  _id: string;
  orderId: string;
  reason: string;
  status: "open" | "resolved_client" | "resolved_freelancer";
  amount: number;
  client?: { name: string; email: string };
  freelancer?: { name: string; email: string };
  createdAt: string;
}

export default function DisputesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [expandedDisputeId, setExpandedDisputeId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-disputes", debouncedSearch],
    queryFn: () => adminApi.getDisputes({ search: debouncedSearch }).then((res) => res.data),
    refetchInterval: 10000, 
  });

  const disputes = response?.data || [];
  const activeDisputes = disputes.filter((d: AdminDispute) => d.status === "open");

  const resolveMutation = useMutation({
    mutationFn: ({ id, resolution }: { id: string; resolution: "resolved_client" | "resolved_freelancer" }) =>
      adminApi.resolveDispute(id, resolution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-disputes"] });
      setExpandedDisputeId(null);
    },
  });

  const handleResolve = (e: React.MouseEvent, id: string, resolution: "resolved_client" | "resolved_freelancer") => {
    e.stopPropagation();
    
    const winner = resolution === "resolved_client" ? "Client" : "Freelancer";
    if (confirm(`Are you sure you want to resolve this in favor of the ${winner}?`)) {
      resolveMutation.mutate({ id, resolution });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedDisputeId(expandedDisputeId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* ... Header and Search ... */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispute Resolution</h1>
          <p className="text-muted-foreground">
            Review and mediate financial conflicts between clients and freelancers.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by order ID or email..." 
            className="pl-8" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Disputes ({activeDisputes.length})</CardTitle>
          <CardDescription>
            Orders where work was challenged or delivery was rejected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px] text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Loading dispute queue...
            </div>
          ) : activeDisputes.length === 0 ? (
            <div className="rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[300px] text-center p-8 bg-muted/10">
              <div className="rounded-full bg-amber-500/10 p-3 mb-4">
                <Scale className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium">No active disputes</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                The platform is running smoothly. Any reported conflicts requiring admin mediation will appear here.
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="h-12 px-4 font-medium w-8"></th>
                    <th className="h-12 px-4 font-medium">Order & Reason</th>
                    <th className="h-12 px-4 font-medium">Involved Parties</th>
                    <th className="h-12 px-4 font-medium">Amount in Escrow</th>
                    <th className="h-12 px-4 font-medium text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDisputes.map((dispute: AdminDispute) => {
                    const isExpanded = expandedDisputeId === dispute._id;

                    return (
                      <React.Fragment key={dispute._id}>
                        {/* MAIN ROW */}
                        <tr 
                          className={`border-b transition-colors hover:bg-muted/50 cursor-pointer ${isExpanded ? "bg-muted/20" : ""}`}
                          onClick={() => toggleExpand(dispute._id)}
                        >
                          <td className="p-4 align-middle">
                            <div className="transition-transform duration-200">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle w-[35%]">
                            <div>
                              <p className="font-medium text-destructive">Order #{dispute.orderId?.slice(-6).toUpperCase() || "UNKNOWN"}</p>
                              {!isExpanded && (
                                <p className="text-xs text-muted-foreground mt-1 truncate max-w-[250px]">
                                  {"\""}{dispute.reason}{"\""}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="space-y-1">
                              <p className="text-xs"><span className="font-medium text-muted-foreground">C:</span> {dispute.client?.name || "Unknown"}</p>
                              <p className="text-xs"><span className="font-medium text-muted-foreground">F:</span> {dispute.freelancer?.name || "Unknown"}</p>
                            </div>
                          </td>
                          <td className="p-4 align-middle font-semibold text-foreground">
                            ${dispute.amount?.toFixed(2) || "0.00"}
                          </td>
                          <td className="p-4 align-middle text-right flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-green-500/10 hover:text-green-600 hover:border-green-600"
                              onClick={(e) => handleResolve(e, dispute._id, "resolved_client")}
                              disabled={resolveMutation.isPending}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Favor Client
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                              onClick={(e) => handleResolve(e, dispute._id, "resolved_freelancer")}
                              disabled={resolveMutation.isPending}
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Favor Freelancer
                            </Button>
                          </td>
                        </tr>

                        {/* ANIMATED EXPANDED PANEL */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <tr className="border-b bg-muted/10 overflow-hidden">
                              <td colSpan={5} className="p-0">
                                {/* The magic happens here! */}
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                  <div className="p-6 border-l-4 border-l-destructive/50 ml-4 my-4 rounded-r-md bg-background shadow-inner">
                                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                      <AlertTriangle className="h-4 w-4 text-destructive" />
                                      Full Dispute Claim
                                    </h4>
                                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                                      {dispute.reason}
                                    </p>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}