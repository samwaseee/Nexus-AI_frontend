"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Clock, Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GigCardSkeleton } from "@/components/cards/GigCardSkeleton";
import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

const CATEGORIES = ["All", "Career Growth", "Industry Insights", "AI & Technology", "Tips & Tricks"];

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["blog", category],
    queryFn: async () => {
      const res = await blogApi.getPosts({
        category: category === "All" ? undefined : category,
        limit: 9,
      });
      return res.data;
    },
  });

  const posts: BlogPost[] = (data?.data ?? []).filter((p: BlogPost) =>
    search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="container py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-bold">NexusAI Blog</h1>
        <p className="text-muted-foreground text-lg">
          Insights, trends, and actionable tips for the modern freelancer.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <GigCardSkeleton key={i} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No posts found. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                <div className="relative h-48 bg-muted">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl">📝</div>
                  )}
                </div>
                <CardContent className="p-5 space-y-3">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min read</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}