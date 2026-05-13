import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gig } from "@/types";
import { formatCurrency, truncate } from "@/lib/utils";
import { DELIVERY_TIMES } from "@/lib/constants";
import { RatingStars } from "../shared/RatingStars";

interface GigCardProps {
  gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
  const freelancer = typeof gig.freelancer === "object" ? gig.freelancer : null;
  const deliveryLabel =
    DELIVERY_TIMES.find((d) => d.value === gig.deliveryTime)?.label ?? "";

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-200 border border-border">
      {/* Image */}
      <div className="relative h-48 w-full bg-muted flex-shrink-0">
        {gig.images?.[0] ? (
          <Image
            src={gig.images[0]}
            alt={gig.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <span className="text-4xl">💼</span>
          </div>
        )}
        {gig.aiDemandScore && gig.aiDemandScore > 85 && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
            🔥 Trending
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex-1 space-y-3">
        {/* Freelancer */}
        {freelancer && (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-muted overflow-hidden flex-shrink-0">
              {freelancer.avatar ? (
                <Image
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  width={28}
                  height={28}
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                  {freelancer.name?.[0]}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground truncate">
              {freelancer.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">
          {gig.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {gig.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {gig.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {deliveryLabel}
          </div>
          {gig.isRemote ? (
            <span>Remote</span>
          ) : (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {gig.location}
            </div>
          )}
        </div>

        {/* Rating */}
        {gig.totalReviews > 0 && (
          <div className="flex items-center gap-1">
            <RatingStars rating={gig.averageRating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({gig.totalReviews})
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t">
        <div>
          <p className="text-xs text-muted-foreground">Starting at</p>
          <p className="font-bold text-primary">
            {formatCurrency(gig.startingPrice)}
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href={`/explore/${gig._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}