"use client"; // We need this now because we are using state to filter

import { useState } from "react";
import TalentCard from "@/components/cards/TalentCard";
import { SearchBar } from "@/components/shared/SearchBar"; // Using your named export

const DUMMY_TALENT = [
  {
    id: "1",
    name: "Sarah Developer",
    headline: "Full-Stack Developer | React & Node.js Expert",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=sarah",
    rating: 4.9,
    reviews: 124,
    hourlyRate: 75,
    location: "Remote",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    isVerified: true,
  },
  {
    id: "2",
    name: "Marcus Designer",
    headline: "UI/UX Designer | Product Design Specialist",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=marcus",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 85,
    location: "Remote",
    skills: ["Figma", "UI Design", "UX Research", "TailwindCSS"],
    isVerified: true,
  },
  {
    id: "3",
    name: "Priya DataSci",
    headline: "Data Scientist | ML Engineer",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=priya",
    rating: 5.0,
    reviews: 42,
    hourlyRate: 95,
    location: "Remote",
    skills: ["Python", "TensorFlow", "AWS", "Machine Learning"],
    isVerified: true,
  }
];

export default function TalentPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Actually filter the talent based on your debounced search bar!
  const filteredTalent = DUMMY_TALENT.filter((talent) => {
    const query = searchQuery.toLowerCase();
    return (
      talent.name.toLowerCase().includes(query) ||
      talent.headline.toLowerCase().includes(query) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Talent</h1>
          <p className="text-muted-foreground mt-1">
            Find and hire expert freelancers for your next project.
          </p>
        </div>
        <div className="w-full md:w-72">
          {/* Passing the required onSearch prop */}
          <SearchBar 
            placeholder="Search skills or names..." 
            onSearch={setSearchQuery} 
          />
        </div>
      </div>

      {filteredTalent.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTalent.map((talent) => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
          <h3 className="text-lg font-semibold">No talent found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}