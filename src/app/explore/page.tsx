"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { GigCard } from "@/components/cards/GigCard";
import { GigCardSkeleton } from "@/components/cards/GigCardSkeleton";
import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { gigApi } from "@/lib/api";
import { Gig } from "@/types";

const CATEGORIES = [
  "All",
  "Web Development",
  "AI & Machine Learning",
  "Data Science",
  "Design",
  "Writing",
];

const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
];

export default function ExplorePage() {
  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch gigs reacting to ALL filters and sorting
  const { data, isLoading, error } = useQuery({
    queryKey: ["gigs", searchQuery, category, minPrice, maxPrice, sortBy],
    queryFn: async () => {
      const res = await gigApi.getGigs({
        search: searchQuery,
        category: category === "All" ? undefined : category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy: sortBy, // Added sort parameter
      });
      return res.data;
    },
  });

  const gigs: Gig[] = data?.data ?? [];

  const handleResetFilters = () => {
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  const activeFilterCount = (category !== "All" ? 1 : 0) + (minPrice || maxPrice ? 1 : 0);
  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label;

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Explore Gigs
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find the perfect AI-powered talent for your next project.
          </p>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/30 p-4 rounded-lg border">
            
            {/* Search */}
            <div className="w-full sm:max-w-md">
              <SearchBar
                placeholder="Search for skills, roles, or gig titles..."
                onSearch={setSearchQuery}
              />
            </div>

            {/* Actions: Sort & Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
                    {currentSortLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={sortBy === option.value ? "bg-muted font-medium" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Filter Toggle */}
              <Button 
                variant={showFilters ? "default" : "outline"} 
                className="w-full sm:w-auto relative"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Collapsible Filter Panel */}
          {showFilters && (
            <div className="p-6 bg-card border rounded-lg animate-in fade-in slide-in-from-top-2 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Category Filter */}
                <div className="space-y-3">
                  <Label className="text-base">Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <Button
                        key={cat}
                        variant={category === cat ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setCategory(cat)}
                        className="rounded-full transition-all"
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-3">
                  <Label className="text-base">Price Range ($)</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-28 pl-7"
                        min="0"
                      />
                    </div>
                    <span className="text-muted-foreground font-medium">-</span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-28 pl-7"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Action */}
              {activeFilterCount > 0 && (
                <div className="mt-6 flex justify-end border-t pt-4">
                  <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-muted-foreground hover:text-foreground">
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Gig Grid & States */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <GigCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            title="Error loading gigs"
            description="We couldn't connect to the server. Make sure your backend is running."
          />
        ) : gigs.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No gigs found"
            description="We couldn't find any gigs matching your exact filters."
            action={<Button onClick={() => { setSearchQuery(""); handleResetFilters(); }}>Clear All Filters</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}