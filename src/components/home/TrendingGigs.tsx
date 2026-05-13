"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GigCard } from "@/components/cards/GigCard";
import { GigCardSkeleton } from "@/components/cards/GigCardSkeleton";
import { gigApi } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { Gig } from "@/types";

export function TrendingGigs() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending-gigs"],
    queryFn: async () => {
      const res = await gigApi.getGigs({ sortBy: "trending", limit: 4 });
      return res.data;
    },
  });

  const gigs: Gig[] = data?.data ?? [];

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trending <span className="text-primary">Gigs</span>
            </h2>
            <p className="text-muted-foreground mt-1">
              Highest-demand services on the platform right now
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href={ROUTES.EXPLORE}>
              View All Gigs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <GigCardSkeleton key={i} />)
            : gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)}
        </div>
      </div>
    </section>
  );
}