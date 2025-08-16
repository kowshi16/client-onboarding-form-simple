import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { SERVICE_OPTIONS } from "@/lib/constants/form-options";
import { BUDGET_CONSTRAINTS } from "@/lib/constants/form-options";
import type { OnboardingFormData } from "@/lib/validations/onboarding-schema";

/**
 * Custom hook for handling query parameter pre-filling
 */
export function useQueryParamsPrefill(
    form: UseFormReturn<OnboardingFormData>
) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const prefillData: Partial<OnboardingFormData> = {};

        // Pre-fill name
        const name = searchParams.get("name");
        if (name) {
            prefillData.fullName = decodeURIComponent(name);
        }

        // Pre-fill email
        const email = searchParams.get("email");
        if (email) {
            prefillData.email = decodeURIComponent(email);
        }

        // Pre-fill company
        const company = searchParams.get("company");
        if (company) {
            prefillData.companyName = decodeURIComponent(company);
        }

        // Pre-fill services
        const service = searchParams.get("service");
        if (service) {
            const decodedService = decodeURIComponent(service);
            const validServices = SERVICE_OPTIONS.map((s) => s.id);
            if (validServices.includes(decodedService as any)) {
                prefillData.services = [decodedService];
            }
        }

        // Pre-fill budget
        const budget = searchParams.get("budget");
        if (budget) {
            const budgetNum = parseInt(decodeURIComponent(budget));
            if (
                !isNaN(budgetNum) &&
                budgetNum >= BUDGET_CONSTRAINTS.MIN &&
                budgetNum <= BUDGET_CONSTRAINTS.MAX
            ) {
                prefillData.budgetUsd = budgetNum;
            }
        }

        // Apply prefilled data if any exists
        if (Object.keys(prefillData).length > 0) {
            form.reset({ ...form.getValues(), ...prefillData });
        }
    }, [searchParams, form]);
}