import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  headline: z.string().max(150).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).max(20).optional(),
  hourlyRate: z.number().min(0).optional(),
  availability: z.enum(["available", "busy", "unavailable"]).optional(),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;