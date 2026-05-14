"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Clock, RotateCcw, Check, AlertCircle, Heart, Share2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/shared/UserAvatar";
import api, { gigApi } from "@/lib/api";

// High-quality static fallbacks to pad the carousel
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200", // Code/Laptop
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200", // Tech Setup
  "https://images.unsplash.com/photo-1602576666092-bf6447a729fc?w=1200"  // Creative/Keyboard
];

export default function GigDetailsPage({ params }: { params: { slug: string } }) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"basic" | "standard" | "premium">("standard");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Refs for carousel and scroll throttling
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<number>(0);

  // 1. Fetch the specific gig by its slug
  const { data, isLoading: isGigLoading, error } = useQuery({
    queryKey: ["gig", params.slug],
    queryFn: async () => {
      const res = await gigApi.getGigBySlug(params.slug);
      return res.data.data;
    },
  });

  // 2. Fetch the user's saved gigs to check if THIS gig is already saved
  const { data: savedGigsRes } = useQuery({
    queryKey: ["saved-gigs"],
    queryFn: () => api.get("/users/saved-gigs").then((res) => res.data),
  });

  const gig = data;
  
  // Combine the actual gig image with our static fallbacks
  const displayImages = gig?.images?.length 
    ? [...gig.images, ...FALLBACK_IMAGES] 
    : FALLBACK_IMAGES;
  
  type SavedGigItem = { _id: string } | string;

  // Check if this specific gig is in the user's saved list
  const isSaved = savedGigsRes?.data?.some((saved: SavedGigItem) => {
    // If it's an object, check the ._id; otherwise, compare the string directly
    const savedId = typeof saved === "object" ? saved._id : saved;
    return savedId === gig?._id;
  });

  // 3. Mutation to toggle the save status
  const toggleSaveMutation = useMutation({
    mutationFn: () => api.post(`/users/saved-gigs/${gig._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-gigs"] });
    },
  });

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  // 4. Scroll-blocking wheel listener for "Doom Scrolling"
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevents the main page from scrolling

      const now = Date.now();
      if (now - scrollTimeout.current < 400) return; // 400ms throttle

      if (e.deltaY > 20 || e.deltaX > 20) {
        nextImage();
        scrollTimeout.current = now;
      } else if (e.deltaY < -20 || e.deltaX < -20) {
        prevImage();
        scrollTimeout.current = now;
      }
    };

    // The { passive: false } allows us to use e.preventDefault() safely
    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, [nextImage, prevImage]);

  if (isGigLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl animate-pulse">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Gig not found</h2>
        <p className="text-muted-foreground">The gig you are looking for does not exist or was removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        
        {/* ─── LEFT COLUMN: GIG DETAILS ───────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                {gig.category}
              </Badge>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => toggleSaveMutation.mutate()}
                  disabled={toggleSaveMutation.isPending}
                  className={isSaved ? "border-red-500 bg-red-50" : ""}
                >
                  {toggleSaveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
              {gig.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {gig.freelancer && (
                <div className="flex items-center gap-3 pr-6 border-r">
                  <UserAvatar 
                    user={{ 
                      name: gig.freelancer.name || "Freelancer", 
                      avatar: gig.freelancer.avatar 
                    }} 
                    className="h-10 w-10" 
                  />
                  <div>
                    <span className="font-semibold text-foreground block">{gig.freelancer.name}</span>
                    <span className="text-muted-foreground text-xs">Top Rated Seller</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-foreground text-base">{gig.averageRating?.toFixed(1) || "5.0"}</span>
                <span className="text-muted-foreground">({gig.totalReviews || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Usually responds in 1 hr</span>
              </div>
            </div>
          </div>

          {/* ─── 3D DYNAMIC CAROUSEL (SWIPE & SCROLL ENABLED) ──────────────────────── */}
          <div 
            ref={carouselRef}
            className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/5 shadow-inner flex items-center justify-center [perspective:1000px] touch-pan-y"
          >
            {/* Invisible Drag Overlay for Touch/Swipe */}
            <motion.div 
              className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                // Highly responsive swipe detection (50px threshold)
                if (info.offset.x < -50) nextImage();
                else if (info.offset.x > 50) prevImage();
              }}
            />

            {displayImages.map((src, idx) => {
              const diff = (idx - currentImageIndex + displayImages.length) % displayImages.length;
              
              let position = "back";
              if (diff === 0) position = "front";
              else if (diff === 1) position = "right";
              else if (diff === displayImages.length - 1) position = "left";

              const variants = {
                front: { x: "0%", z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 20 },
                right: { x: "50%", z: -100, rotateY: -35, scale: 0.8, opacity: 0.6, zIndex: 15 },
                left: { x: "-50%", z: -100, rotateY: 35, scale: 0.8, opacity: 0.6, zIndex: 15 },
                back: { x: "0%", z: -200, rotateY: 0, scale: 0.6, opacity: 0, zIndex: 10 },
              };

              return (
                <motion.div
                  key={idx}
                  className="absolute w-[60%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-white/20 pointer-events-none"
                  initial={false}
                  animate={position}
                  variants={variants}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }} // Better 3D snap effect
                >
                  <Image 
                    src={src} 
                    alt={`${gig?.title || "Gig"} - Image ${idx + 1}`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    className="object-cover"
                  />
                  {/* Dark overlay for images pushed to the side */}
                  <motion.div 
                    className="absolute inset-0 bg-black"
                    initial={false}
                    animate={{ opacity: position === "front" ? 0 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}

            {/* Navigation Arrows (Still useful for desktop users who prefer clicking) */}
            <div className="absolute inset-x-4 flex items-center justify-between z-40 pointer-events-none">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md hover:bg-background text-foreground shadow-lg transition-transform hover:scale-110 pointer-events-auto"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md hover:bg-background text-foreground shadow-lg transition-transform hover:scale-110 pointer-events-auto"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
              {displayImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 pointer-events-auto ${
                    idx === currentImageIndex 
                      ? "w-8 bg-primary shadow-md" 
                      : "w-2 bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Dynamic Description */}
          <div className="pt-4">
            <h2 className="text-2xl font-bold mb-6">About This Gig</h2>
            <div className="prose prose-base dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {gig.description}
            </div>
            
            {/* Dynamic Skills/Tags */}
            {gig.skills && gig.skills.length > 0 && (
              <div className="mt-10 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Skills & Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="px-4 py-2 bg-muted hover:bg-muted/80">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── RIGHT COLUMN: PRICING TABS (STICKY) ──────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {gig.packages ? (
              <Card className="border-primary/20 shadow-xl">
                <Tabs 
                  defaultValue="standard" 
                  value={activeTab} 
                  onValueChange={(val) => setActiveTab(val as "basic" | "standard" | "premium")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 rounded-none border-b h-14 bg-transparent p-0">
                    <TabsTrigger value="basic" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-muted/30">Basic</TabsTrigger>
                    <TabsTrigger value="standard" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-muted/30">Standard</TabsTrigger>
                    <TabsTrigger value="premium" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-muted/30">Premium</TabsTrigger>
                  </TabsList>
                  
                  {/* Map through the packages dynamically */}
                  {(["basic", "standard", "premium"] as const).map((tier) => {
                    const pkg = gig.packages[tier];
                    if (!pkg) return null;

                    return (
                      <TabsContent key={tier} value={tier} className="mt-0">
                        <CardHeader className="pt-6">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                            <span className="text-2xl font-bold">${pkg.price}</span>
                          </div>
                          <CardDescription className="pt-2 text-sm leading-snug h-12">
                            {pkg.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-center gap-4 text-sm font-medium text-foreground pb-4 border-b">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{pkg.deliveryDays} Days Delivery</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <RotateCcw className="h-4 w-4 text-muted-foreground" />
                              <span>{pkg.revisions === -1 ? "Unlimited" : pkg.revisions} Revisions</span>
                            </div>
                          </div>
                          
                          {pkg.features && pkg.features.length > 0 && (
                            <ul className="space-y-3">
                              {pkg.features.map((feature: string) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <span className="leading-tight">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                        <CardFooter className="pb-6">
                          <Button className="w-full h-12 text-lg font-semibold" size="lg">
                            Continue (${pkg.price})
                          </Button>
                        </CardFooter>
                      </TabsContent>
                    );
                  })}
                </Tabs>
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