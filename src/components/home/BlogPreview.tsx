"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export function BlogPreview() {
  const { data } = useQuery({
    queryKey: ["blog-preview"],
    queryFn: async () => {
      const res = await blogApi.getPosts({ limit: 3 });
      return res.data;
    },
  });

  const posts: BlogPost[] = data?.data ?? [];

  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              From the <span className="text-primary">blog</span>
            </h2>
            <p className="text-muted-foreground mt-1">
              Insights, tips, and trends for the modern freelancer.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href={ROUTES.BLOG}>
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post._id} href={`${ROUTES.BLOG}/${post.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                <div className="relative h-48 bg-muted overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-5 space-y-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}