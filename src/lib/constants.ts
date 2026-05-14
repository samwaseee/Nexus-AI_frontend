export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const APP_NAME = "NexusAI";
export const APP_DESCRIPTION =
  "AI-powered career intelligence platform for freelancers and gig workers.";

// ─── Routes ───────────────────────────────────────────────────────────────
export const ROUTES = {
  // Public / Marketing
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EXPLORE: "/explore",
  TALENT: "/talent",
  ABOUT: "/about",
  BLOG: "/blog",
  CONTACT: "/contact",
  FAQ: "/faq",
  PRIVACY: "/privacy",

  // Global AI Features (Standalone pages)
  DASHBOARD_PITCH: "/ai-pitch",
  DASHBOARD_RECOMMENDATIONS: "/recommendations",
  DASHBOARD_CHAT: "/chat",
  DASHBOARD_ANALYTICS: "/analytics",

  // Core Dashboard
  DASHBOARD: "/dashboard",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_MESSAGES: "/dashboard/messages",

  // Freelancer Dashboard
  DASHBOARD_GIGS: "/dashboard/gigs",
  DASHBOARD_ORDERS: "/dashboard/orders",
  DASHBOARD_FINANCES: "/dashboard/finances",

  // Client Dashboard
  DASHBOARD_PURCHASES: "/dashboard/purchases",
  DASHBOARD_SAVED: "/dashboard/saved",
  DASHBOARD_BILLING: "/dashboard/billing",

  // Admin Dashboard
  DASHBOARD_USERS: "/dashboard/admin/users",
  DASHBOARD_MODERATION: "/dashboard/admin/moderation",
  DASHBOARD_DISPUTES: "/dashboard/admin/disputes",
  DASHBOARD_SETTINGS: "/dashboard/admin/settings",
} as const;

// ─── User Roles ───────────────────────────────────────────────────────────
export const ROLES = {
  FREELANCER: "freelancer",
  CLIENT: "client",
  ADMIN: "admin",
} as const;

// ─── Gig Categories — must match backend seed data ────────────────────────
export const GIG_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "DevOps & Cloud",
  "AI & Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "Content Writing",
  "Digital Marketing",
] as const;

// ─── Skills pool for tag inputs ───────────────────────────────────────────
export const SKILLS_POOL = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB",
  "PostgreSQL", "AWS", "Docker", "Kubernetes", "Figma", "TailwindCSS",
  "GraphQL", "REST APIs", "Machine Learning", "TensorFlow", "Solidity",
  "Rust", "Go", "Vue.js", "Angular", "Swift", "Kotlin", "Flutter",
] as const;

// ─── Experience levels ────────────────────────────────────────────────────
export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
] as const;

// ─── Delivery times ───────────────────────────────────────────────────────
export const DELIVERY_TIMES = [
  { value: "1_day", label: "24 Hours" },
  { value: "3_days", label: "3 Days" },
  { value: "1_week", label: "1 Week" },
  { value: "2_weeks", label: "2 Weeks" },
  { value: "1_month", label: "1 Month" },
] as const;

// ─── Sort options ─────────────────────────────────────────────────────────
export const GIG_SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "trending", label: "Trending" },
] as const;

export const TALENT_SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "rate_asc", label: "Rate: Low to High" },
  { value: "rate_desc", label: "Rate: High to Low" },
] as const;

// ─── Availability options ─────────────────────────────────────────────────
export const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available", color: "text-green-500" },
  { value: "busy", label: "Busy", color: "text-yellow-500" },
  { value: "unavailable", label: "Unavailable", color: "text-red-500" },
] as const;

// ─── Pagination ───────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 12;

// ─── Demo credentials ─────────────────────────────────────────────────────
export const DEMO_CREDENTIALS = {
  user: { email: "user@nexusai.com", password: "Demo@1234" },
  admin: { email: "admin@nexusai.com", password: "Demo@1234" },
  client: { email: "client@nexusai.com", password: "Demo@1234" },
} as const;