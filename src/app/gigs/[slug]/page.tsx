"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Star, Clock, RotateCcw, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { gigApi } from "@/lib/api";

export default function GigDetailsPage({ params }: { params: { slug: string } }) {
  // Fetch the specific gig by its slug
  const { data, isLoading, error } = useQuery({
    queryKey: ["gig", params.slug],
    queryFn: async () => {
      // Assuming your api.ts has a getGigBySlug method. 
      // If it's called something else like getGig(slug), adjust accordingly!
      const res = await gigApi.getGigBySlug(params.slug);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Gig not found</h2>
        <p className="text-muted-foreground">The gig you are looking for does not exist or was removed.</p>
      </div>
    );
  }

  const gig = data;

  // Dynamically select a package to display (Standard if available, otherwise Premium or Basic)
  const displayPackage = gig.packages?.standard || gig.packages?.premium || gig.packages?.basic;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {gig.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {gig.freelancer && (
                <div className="flex items-center gap-2">
                  <UserAvatar 
                    user={{ 
                      name: gig.freelancer.name || "Freelancer", 
                      avatar: gig.freelancer.avatar 
                    }} 
                    className="h-6 w-6 text-[10px]" 
                  />
                  <span className="font-medium text-foreground">{gig.freelancer.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium text-foreground">{gig.averageRating?.toFixed(1) || "5.0"}</span>
                <span>({gig.totalReviews || 0} reviews)</span>
              </div>
              <Badge variant="secondary">{gig.category}</Badge>
            </div>
          </div>

          {/* Dynamic Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            <Image 
              src={gig.images?.[0] || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200"} 
              alt={gig.title} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Dynamic Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About This Gig</h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
              {gig.description}
            </div>
            
            {/* Dynamic Skills/Tags */}
            {gig.skills && gig.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Skills Required / Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill: string) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Pricing & Checkout */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {displayPackage ? (
              <Card className="border-primary/20 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{displayPackage.name}</CardTitle>
                    <span className="text-2xl font-bold">${displayPackage.price}</span>
                  </div>
                  <CardDescription>{displayPackage.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{displayPackage.deliveryDays} Days Delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="h-4 w-4 text-muted-foreground" />
                      <span>{displayPackage.revisions} Revisions</span>
                    </div>
                  </div>
                  
                  {displayPackage.features && displayPackage.features.length > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                      {displayPackage.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">Continue to Checkout</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Pricing packages are currently unavailable for this gig.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}