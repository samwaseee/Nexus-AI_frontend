"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gigApi } from "@/lib/api";
import { Gig } from "@/types";

export default function ManageGigsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-gigs"],
    queryFn: async () => {
      const res = await gigApi.getMyGigs();
      return res.data?.data || res.data || [];
    },
  });

  const gigs: Gig[] = data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Gigs</h1>
          <p className="text-muted-foreground">Manage your active services and listings.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Gig
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 text-muted-foreground">
                  <th className="h-12 px-4 font-medium">Gig Title</th>
                  <th className="h-12 px-4 font-medium">Category</th>
                  <th className="h-12 px-4 font-medium">Starting Price</th>
                  <th className="h-12 px-4 font-medium">Status</th>
                  <th className="h-12 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-4 text-center">Loading gigs...</td></tr>
                ) : gigs.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No gigs found. Create one to get started!</td></tr>
                ) : (
                  gigs.map((gig) => (
                    <tr key={gig._id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium max-w-[300px] truncate">{gig.title}</td>
                      <td className="p-4">{gig.category}</td>
                      <td className="p-4">${gig.startingPrice || 0}</td>
                      <td className="p-4">
                        <Badge variant="secondary" className="capitalize">{gig.status || "active"}</Badge>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}