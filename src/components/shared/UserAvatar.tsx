import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name: string;
    avatar?: string;
  };
  className?: string; // Allows us to change the size depending on where we use it!
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  if (!user) return null;

  return (
    <div 
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-full border border-border bg-muted", 
        className
      )}
    >
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="object-cover"
          unoptimized // Bypasses Next.js image optimization errors for SVGs
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/10 font-bold uppercase text-primary">
          {user.name?.[0]}
        </div>
      )}
    </div>
  );
}