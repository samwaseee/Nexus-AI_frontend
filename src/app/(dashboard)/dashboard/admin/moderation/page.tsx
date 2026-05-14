"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, X, ShieldCheck, Loader2, ExternalLink } from "lucide-react";
import Link from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminApi } from "@/lib/api"; // Matches your global Axios api file

interface AdminGig {
  _id: string;
  title: string;
  price: number;
  category: string;
  status: "pending" | "approved" | "rejected";
  freelancerId?: {
    name: string;
    email: string;
  };
}

export default function GigModerationPage() {
  const queryClient = useQueryClient();

  // 1. Fetch Gigs from your Admin endpoint
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-gigs"],
    queryFn: () => adminApi.getGigs().then((res) => res.data),
  });

  const gigs = response?.data || [];

  // Filter for only pending gigs to keep the moderation queue focused
  const pendingGigs = gigs.filter((gig: AdminGig) => gig.status === "pending");

  // 2. Status Mutation matching your exact: updateGigStatus(id, status)
  const moderationMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateGigStatus(id, status),
    onSuccess: () => {
      // Instantly refresh the queue upon action
      queryClient.invalidateQueries({ queryKey: ["admin-gigs"] });
    },
  });

  const handleAction = (id: string, status: "approved" | "rejected") => {
    moderationMutation.mutate({ id, status });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gig Moderation Queue</h1>
        <p className="text-muted-foreground">
          Review newly created marketplace listings before they go live to ensure quality control.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals ({pendingGigs.length})</CardTitle>
          <CardDescription>
            Gigs submitted by freelancers requiring approval to list publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px] text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Loading moderation queue...
            </div>
          ) : pendingGigs.length === 0 ? (
            <div className="rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[300px] text-center p-8 bg-muted/10">
              <div className="rounded-full bg-green-500/10 p-3 mb-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Clear Queue</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Excellent! All submitted service listings have been successfully audited.
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="h-12 px-4 font-medium">Service Info</th>
                    <th className="h-12 px-4 font-medium">Category</th>
                    <th className="h-12 px-4 font-medium">Starting Price</th>
                    <th className="h-12 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingGigs.map((gig: AdminGig) => (
                    <tr key={gig._id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div>
                          <p className="font-medium max-w-md truncate">{gig.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            By: {gig.freelancerId?.name || "Unknown Freelancer"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant="outline" className="capitalize">
                          {gig.category}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle font-semibold text-foreground">
                        ${gig.price}
                      </td>
                      <td className="p-4 align-middle text-right flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Approve Listing"
                          className="hover:bg-green-500/10 hover:text-green-600"
                          onClick={() => handleAction(gig._id, "approved")}
                          disabled={moderationMutation.isPending}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Reject Listing"
                          className="hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleAction(gig._id, "rejected")}
                          disabled={moderationMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}