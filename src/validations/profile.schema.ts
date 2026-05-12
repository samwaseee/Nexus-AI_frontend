import * as z from "zod";

export const profileSchema = z.object({
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }).optional(),
  skills: z.array(z.string()).min(1, { message: "Please add at least one skill." }),
  hourlyRate: z.coerce.number().min(5, { message: "Minimum rate must be at least $5." }).optional(),
  portfolioUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;