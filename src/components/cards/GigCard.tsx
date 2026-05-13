import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gig } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { DELIVERY_TIMES } from "@/lib/constants";
import { RatingStars } from "../shared/RatingStars";

interface GigCardProps {
  gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
  const freelancer = typeof gig.freelancer === "object" ? gig.freelancer : null;
  const deliveryLabel =
    DELIVERY_TIMES.find((d) => d.value === gig.deliveryTime)?.label ?? "Custom";

  return (
    <Card className="group flex flex-col h-full overflow-hidden border-border/60 bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300">

      {/* Image Section */}
      <div className="relative h-48 w-full bg-muted flex-shrink-0 overflow-hidden">
        {gig.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gig.images[0]}
            alt={gig.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <span className="text-4xl transition-transform duration-500 group-hover:scale-110">💼</span>
          </div>
        )}

        {/* Subtle overlay gradient for image contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Trending Badge (Glassmorphism style) */}
        {gig.aiDemandScore && gig.aiDemandScore > 85 && (
          <Badge 
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-md text-primary font-semibold border-none shadow-sm"
            variant="outline"
          >
            🔥 Trending
          </Badge>
        )}
      </div>

      <CardContent className="p-5 flex-1 flex flex-col space-y-4">
        {/* Freelancer Profile */}
        {freelancer && (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted overflow-hidden flex-shrink-0 border border-border">
              {freelancer.avatar ? (
                <Image
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  width={24}
                  height={24}
                  className="object-cover"
                  unoptimized // Bypasses Next.js image optimization errors for DiceBear SVGs
                />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                  {freelancer.name?.[0]}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground truncate">
              {freelancer.name}
            </span>
          </div>
        )}

        {/* Title & Description Container (Fixed Heights for Alignment) */}
        <div className="space-y-2 flex-1">
          {/* min-h-[2.75rem] strictly reserves exactly 2 lines of space for the title */}
          <h3 className="font-bold text-base leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-primary transition-colors">
            {gig.title}
          </h3>

          {/* min-h-[2.5rem] strictly reserves exactly 2 lines of space for description */}
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {gig.shortDescription}
          </p>
        </div>

        {/* Tags Container (Fixed height to prevent wrapping pushing layout down) */}
        <div className="flex flex-wrap gap-1.5 h-[24px] overflow-hidden">
          {gig.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Meta Info (Time & Rating) */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {deliveryLabel}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              {gig.isRemote ? (
                "Remote"
              ) : (
                <>
                  <MapPin className="h-3.5 w-3.5" />
                  {gig.location}
                </>
              )}
            </div>
          </div>

          {gig.totalReviews > 0 && (
            <div className="flex items-center gap-1">
              <RatingStars rating={gig.averageRating} size="sm" />
              <span className="text-xs font-medium text-muted-foreground">
                ({gig.totalReviews})
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-5 pt-4 border-t border-border/50 bg-muted/10 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-0.5">
            Starting at
          </p>
          <p className="font-bold text-lg text-foreground">
            {formatCurrency(gig.startingPrice)}
          </p>
        </div>
        <Button size="sm" className="font-semibold shadow-sm transition-transform active:scale-95" asChild>
          <Link href={`/explore/${gig._id}`}>View Details</Link>
        </Button>
      </CardFooter>

    </Card>
  );
}