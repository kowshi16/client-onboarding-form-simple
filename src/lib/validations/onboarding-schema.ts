import * as z from "zod";

export const onboardingSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Full name must be at least 2 characters")
        .max(80, "Full name must be less than 80 characters")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Full name can only contain letters, spaces, apostrophes, and hyphens"
        ),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    companyName: z
        .string()
        .min(1, "Company name is required")
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name must be less than 100 characters"),

    services: z
        .array(z.string())
        .min(1, "Please select at least one service"),

    budgetUsd: z
        .number()
        .int("Budget must be a whole number")
        .min(100, "Minimum budget is $100")
        .max(1000000, "Maximum budget is $1,000,000")
        .optional()
        .or(z.literal("")),

    projectStartDate: z
        .date({
            message: "Project start date is required",
        })
        .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Project start date must be today or later"
        ),

    acceptTerms: z
        .boolean()
        .refine((val) => val === true, "You must accept the terms and conditions"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;