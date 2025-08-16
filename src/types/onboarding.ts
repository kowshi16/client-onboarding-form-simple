export interface OnboardingFormData {
    fullName: string;
    email: string;
    companyName: string;
    services: string[];
    budgetUsd?: number;
    projectStartDate: Date;
    acceptTerms: boolean;
}

export interface SubmissionState {
    status: "idle" | "loading" | "success" | "error";
    message: string;
    submittedData?: OnboardingFormData;
}

export interface OnboardingResponse {
    success: boolean;
    message?: string;
}