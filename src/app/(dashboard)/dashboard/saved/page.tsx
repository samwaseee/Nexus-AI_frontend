"use client";

import { Bookmark, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { RatingStars } from "@/components/shared/RatingStars";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

interface Gig {
  _id: string;
  title: string;
  category: string;
  price?: number;
  images?: string[];
  averageRating?: number;
  totalReviews?: number;
  freelancer?: {
    name: string;
  };
  slug?: string;
  startingPrice?: number;
}

interface SavedGigsResponse {
  success: boolean;
  message: string;
  data: Gig[]; // or string[] if it's just IDs, but usually it's the populated objects
}

export default function SavedPage() {
  const queryClient = useQueryClient();

  // 1. Fetch the real saved gigs from your Express backend
  const { data: response, isLoading } = useQuery({
    queryKey: ["saved-gigs"],
    queryFn: () => api.get("/users/saved-gigs").then((res: { data: SavedGigsResponse }) => res.data),
  });

  const savedGigs = response?.data || [];

  // 2. Setup the mutation to remove a gig
  const toggleSavedMutation = useMutation({
    mutationFn: (gigId: string) => api.post(`/users/saved-gigs/${gigId}`),
    onSuccess: () => {
      // Tell React Query to refresh the list instantly
      queryClient.invalidateQueries({ queryKey: ["saved-gigs"] });
    },
  });

  const removeSaved = (id: string) => {
    toggleSavedMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Gigs</h1>
          <p className="text-muted-foreground">Gigs you&apos;ve bookmarked for later.</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {savedGigs.length} saved
        </Badge>
      </div>

      {savedGigs.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved gigs"
          description="Browse gigs and bookmark the ones you like."
          action={
            <Button asChild>
              <Link href="/explore">Browse Gigs</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedGigs.map((item: Gig) => (
            <Card key={item._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 bg-muted overflow-hidden">
                <Image
                  src={item.images?.[0] || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400"}
                  alt={item.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={toggleSavedMutation.isPending}
                  className="absolute top-2 right-2 h-7 w-7 bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeSaved(item._id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">{item.title}</h3>
                
                {/* Handled populated freelancer object */}
                <div className="text-xs text-muted-foreground">
                  by {item.freelancer?.name || "Platform Talent"}
                </div>
                
                <div className="flex items-center gap-1">
                  <RatingStars rating={item.averageRating || 0} size="sm" />
                  <span className="text-xs text-muted-foreground">({item.totalReviews || 0})</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-muted-foreground">Starting at</span>
                    <div className="font-bold text-primary">{formatCurrency(item.startingPrice || 0)}</div>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/gigs/${item.slug || item._id}`}>
                      View <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}