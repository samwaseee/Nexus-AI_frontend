import * as z from "zod";

export const pitchBuilderSchema = z.object({
  role: z.string().min(2, { message: "Target role is required (e.g., Full Stack Developer)." }),
  targetAudience: z.string().min(2, { message: "Target audience is required (e.g., SaaS Startups)." }),
  tone: z.enum(["professional", "confident", "casual", "creative"], {
    message: "Please select a tone for the AI.",
  }),
  keyAchievements: z.string().max(300, { message: "Keep achievements brief so the AI can format them." }).optional(),
});

export type PitchBuilderFormValues = z.infer<typeof pitchBuilderSchema>;