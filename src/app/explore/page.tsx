"use client";

import { useState, useEffect } from "react";
// 1. Import keepPreviousData
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// 2. Import Chevron icons for the buttons
import { Search, SlidersHorizontal, X, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
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

  // 3. Add Pagination State
  const [page, setPage] = useState(1);
  const limit = 6;

  // 4. Reset to page 1 whenever a filter changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category, minPrice, maxPrice, sortBy]);

  // Fetch gigs reacting to ALL filters, sorting, AND pagination
  const { data, isLoading, error, isFetching } = useQuery({
    // Add `page` to the queryKey so it refetches when the page changes
    queryKey: ["gigs", searchQuery, category, minPrice, maxPrice, sortBy, page],
    queryFn: async () => {
      const res = await gigApi.getGigs({
        search: searchQuery,
        category: category === "All" ? undefined : category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy: sortBy,
        page: page,   // Send page to backend
        limit: limit, // Send limit to backend
      });
      return res.data;
    },
    // 5. Keep the old data on screen while fetching the next page
    placeholderData: keepPreviousData,
  });

  // Extract gigs and pagination metadata from your backend response
  const gigs: Gig[] = data?.data ?? [];
  const totalPages = data?.meta?.totalPages || data?.meta?.pageCount || 1; // Backend must return this!

  const handleResetFilters = () => {
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    setPage(1); // Reset page on clear
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
            {Array.from({ length: limit }).map((_, i) => (
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
            action={<Button onClick={handleResetFilters}>Clear All Filters</Button>}
          />
        ) : (
          <div className="space-y-8">
            {/* The Grid - slightly dims when fetching the next page */}
            <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isFetching ? 'opacity-60 transition-opacity duration-200' : ''}`}>
              {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>

            {/* 6. Functional Pagination Buttons */}
            {!isLoading && totalPages > 0 && (
              <div className="mt-8 flex items-center justify-center gap-4 border-t pt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || isFetching}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                <div className="text-sm font-medium text-muted-foreground">
                  Page {page} of {totalPages}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isFetching}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}