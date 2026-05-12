// ─── User ─────────────────────────────────────────────────────────────────
export type UserRole = "freelancer" | "client" | "admin";
export type AuthProvider = "local" | "google";
export type Availability = "available" | "busy" | "unavailable";

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: AuthProvider;
  avatar?: string;
  bio?: string;
  headline?: string;
  location?: string;
  skills: string[];
  hourlyRate?: number;
  availability: Availability;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────
export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "freelancer" | "client";
}

// ─── Gig ──────────────────────────────────────────────────────────────────
export type GigStatus = "active" | "paused" | "draft" | "archived";
export type ExperienceLevel = "entry" | "intermediate" | "expert";
export type DeliveryTime = "1_day" | "3_days" | "1_week" | "2_weeks" | "1_month";

export interface GigPackage {
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export interface Gig {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  tags: string[];
  skills: string[];
  freelancer: User | string;
  images: string[];
  startingPrice: number;
  packages: {
    basic: GigPackage;
    standard?: GigPackage;
    premium?: GigPackage;
  };
  experienceLevel: ExperienceLevel;
  deliveryTime: DeliveryTime;
  revisions: number;
  status: GigStatus;
  isRemote: boolean;
  location?: string;
  views: number;
  averageRating: number;
  totalReviews: number;
  totalOrders: number;
  aiDemandScore?: number;
  trendingScore?: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────
export interface Review {
  _id: string;
  gig: string;
  reviewer: User;
  freelancer: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpful: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: User;
  category: string;
  tags: string[];
  status: "draft" | "published";
  readTime: number;
  views: number;
  publishedAt: string;
  createdAt: string;
}

// ─── AI ───────────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export interface GeminiMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

export interface Conversation {
  _id: string;
  title: string;
  totalMessages: number;
  updatedAt: string;
  createdAt: string;
}

export interface CareerAnalysis {
  demandScore: number;
  salaryRange: { min: number; max: number; currency: string };
  topSkillGaps: string[];
  trendingSkills: string[];
  careerInsights: string;
  recommendedActions: {
    action: string;
    priority: "high" | "medium" | "low";
    timeframe: string;
  }[];
  marketOutlook: "growing" | "stable" | "declining";
  competitionLevel: "low" | "medium" | "high";
}

export interface Recommendations {
  gigCategories: {
    category: string;
    reason: string;
    demandLevel: "high" | "medium" | "low";
    avgRate: string;
  }[];
  skillsToLearn: {
    skill: string;
    reason: string;
    priority: "high" | "medium" | "low";
    estimatedTime: string;
  }[];
  portfolioProjects: {
    title: string;
    description: string;
    skillsUsed: string[];
  }[];
  rateRecommendation: {
    suggested: number;
    reasoning: string;
  };
}

// ─── API Response ─────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Admin ────────────────────────────────────────────────────────────────
export interface PlatformStats {
  overview: {
    totalUsers: number;
    totalFreelancers: number;
    totalClients: number;
    totalGigs: number;
    totalReviews: number;
    totalAISessions: number;
    newUsersThisMonth: number;
    newGigsThisMonth: number;
  };
  aiUsageByFeature: { _id: string; count: number }[];
  userGrowth: { _id: { year: number; month: number }; count: number }[];
  topCategories: { _id: string; count: number }[];
}

// ─── Filter & Query ───────────────────────────────────────────────────────
export interface GigFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  experienceLevel?: ExperienceLevel;
  deliveryTime?: DeliveryTime;
  sortBy?: "newest" | "oldest" | "price_asc" | "price_desc" | "rating" | "trending";
  page?: number;
  limit?: number;
}

export interface TalentFilters {
  search?: string;
  skills?: string;
  availability?: Availability;
  minRate?: number;
  maxRate?: number;
  sortBy?: "newest" | "rate_asc" | "rate_desc";
  page?: number;
  limit?: number;
}