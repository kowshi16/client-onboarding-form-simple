import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    onboardingSchema,
    type OnboardingFormData,
} from "@/lib/validations/onboarding-schema";
import { submitOnboardingForm } from "@/lib/services/api";

export interface SubmissionState {
    status: "idle" | "loading" | "success" | "error";
    message: string;
    submittedData?: OnboardingFormData;
}

/**
 * Custom hook for managing onboarding form state and submission
 */
export function useOnboardingForm() {
    const [submission, setSubmission] = useState<SubmissionState>({
        status: "idle",
        message: "",
    });

    const form = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            fullName: "",
            email: "",
            companyName: "",
            services: [],
            budgetUsd: undefined,
            projectStartDate: undefined,
            acceptTerms: false,
        },
    });

    const onSubmit = async (data: OnboardingFormData): Promise<void> => {
        setSubmission({ status: "loading", message: "" });

        const result = await submitOnboardingForm(data);

        if (result.success) {
            setSubmission({
                status: "success",
                message:
                    "Thank you! Your onboarding form has been submitted successfully.",
                submittedData: data,
            });
            form.reset();
        } else {
            setSubmission({
                status: "error",
                message: result.error || "An unexpected error occurred",
            });
        }
    };

    return {
        form,
        submission,
        onSubmit: form.handleSubmit(onSubmit),
        isLoading: submission.status === "loading",
        isSuccess: submission.status === "success",
        isError: submission.status === "error",
    };
}
