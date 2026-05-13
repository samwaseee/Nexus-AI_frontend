import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../shared/UserAvatar";

interface TalentCardProps {
  talent: {
    id: string;
    name: string;
    headline: string;
    avatar: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    location: string;
    skills: string[];
    isVerified: boolean;
  };
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4">
          <UserAvatar 
            user={{ name: talent.name, avatar: talent.avatar }} 
            className="h-24 w-24 border-2 text-3xl" 
          />
        </div>
        <div className="mb-1 flex items-center justify-center gap-1">
          <h3 className="font-semibold line-clamp-1">{talent.name}</h3>
          {talent.isVerified && (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          )}
        </div>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {talent.headline}
        </p>
        
        <div className="mb-4 flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{talent.rating}</span>
            <span className="text-muted-foreground">({talent.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{talent.location}</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-1.5">
          {talent.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
          {talent.skills.length > 3 && (
            <Badge variant="outline" className="font-normal text-muted-foreground">
              +{talent.skills.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <div className="mt-auto border-t bg-muted/20 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-bold text-lg">${talent.hourlyRate}</span>
            <span className="text-muted-foreground">/hr</span>
          </div>
          <Button asChild size="sm">
            <Link href={`/talent/${talent.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}