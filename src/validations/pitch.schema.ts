import { z } from "zod";

export const pitchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  skills: z.array(z.string()).min(1, "Add at least one skill").max(15),
  yearsOfExperience: z.number().min(0).max(50),
  tone: z.enum(["professional", "friendly", "bold"]).default("professional"),
  targetAudience: z.string().min(1, "Target audience is required"),
  keyAchievement: z.string().optional(),
});

export const careerAnalyzerSchema = z.object({
  skills: z.array(z.string()).min(1).max(20),
  currentRole: z.string().min(1, "Current role is required"),
  yearsOfExperience: z.number().min(0).max(50),
  targetRole: z.string().optional(),
  location: z.string().optional(),
});

export const gigSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(120),
  description: z.string().min(50, "Description must be at least 50 characters"),
  shortDescription: z.string().min(20).max(200),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).max(10),
  skills: z.array(z.string()).max(15),
  startingPrice: z.number().min(5, "Minimum price is $5"),
  experienceLevel: z.enum(["entry", "intermediate", "expert"]),
  deliveryTime: z.enum(["1_day", "3_days", "1_week", "2_weeks", "1_month"]),
  isRemote: z.boolean().default(true),
});

export type PitchInput = z.infer<typeof pitchSchema>;
export type CareerAnalyzerInput = z.infer<typeof careerAnalyzerSchema>;
export type GigInput = z.infer<typeof gigSchema>;