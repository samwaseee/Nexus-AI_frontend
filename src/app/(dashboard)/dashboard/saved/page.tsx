"use client";

import { useState } from "react";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { RatingStars } from "@/components/shared/RatingStars";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const mockSaved = [
  { id: "1", title: "Full-Stack Next.js Web Application Development", freelancer: "Sarah Developer", price: 299, rating: 4.9, reviews: 47, category: "Web Development", image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400" },
  { id: "2", title: "Professional UI/UX Design for Mobile & Web Apps", freelancer: "Marcus Designer", price: 199, rating: 4.8, reviews: 33, category: "UI/UX Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
  { id: "3", title: "Machine Learning Model Development & Deployment", freelancer: "Priya DataSci", price: 499, rating: 4.7, reviews: 21, category: "AI & ML", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400" },
];

export default function SavedPage() {
  const [saved, setSaved] = useState(mockSaved);

  const removeSaved = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Gigs</h1>
          <p className="text-muted-foreground">Gigs you&apos;ve bookmarked for later.</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {saved.length} saved
        </Badge>
      </div>

      {saved.length === 0 ? (
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
          {saved.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 bg-muted overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeSaved(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">{item.title}</h3>
                <div className="text-xs text-muted-foreground">by {item.freelancer}</div>
                <div className="flex items-center gap-1">
                  <RatingStars rating={item.rating} size="sm" />
                  <span className="text-xs text-muted-foreground">({item.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-muted-foreground">Starting at</span>
                    <div className="font-bold text-primary">{formatCurrency(item.price)}</div>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/gigs/${item.id}`}>
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