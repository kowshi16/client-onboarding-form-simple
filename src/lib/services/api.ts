import { format } from "date-fns";
import type { OnboardingFormData } from "@/lib/validations/onboarding-schema";

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    status: number;
}

export async function submitOnboardingForm(
    data: OnboardingFormData
): Promise<ApiResponse> {
    try {
        const endpoint = process.env.NEXT_PUBLIC_ONBOARD_URL;

        if (!endpoint) {
            throw new Error("NEXT_PUBLIC_ONBOARD_URL is not configured");
        }

        const payload = {
            ...data,
            projectStartDate: format(data.projectStartDate, "yyyy-MM-dd"),
            budgetUsd: data.budgetUsd || undefined,
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.text();

        if (response.ok) {
            return {
                success: true,
                status: response.status,
                data: responseData ? JSON.parse(responseData) : null,
            };
        } else {
            return {
                success: false,
                status: response.status,
                error: `Submission failed: ${response.status} ${response.statusText}`,
            };
        }
    } catch (error) {
        console.error("API submission error:", error);

        if (error instanceof TypeError && error.message.includes('fetch')) {
            return {
                success: false,
                status: 0,
                error: "Network error: Please check your connection and try again.",
            };
        }

        return {
            success: false,
            status: 500,
            error: error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}