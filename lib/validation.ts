import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Use a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Use a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const onboardingSchema = z.object({
  fullName: z.string().trim().min(2, "Tell us your name."),
  role: z.enum(["student", "first-time founder", "professional", "other"]),
  ventureIdea: z.string().trim().min(3, "Describe your venture idea in a few words."),
  ventureCategory: z.string().trim().max(80).optional(),
  skillCheck: z.array(z.number().min(0).max(3)).length(5),
  companyName: z.string().trim().min(2, "Choose a company name."),
});

export type SignUpInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
