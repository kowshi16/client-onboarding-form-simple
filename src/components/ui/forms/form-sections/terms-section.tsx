import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { OnboardingFormData } from "@/lib/validations/onboarding-schema";

interface TermsSectionProps {
    control: Control<OnboardingFormData>;
}

export function TermsSection({ control }: TermsSectionProps) {
    const handleLinkClick = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="bg-gradient-to-r from-violet-50 to-pink-50 rounded-xl p-6">
            <FormField
                control={control}
                name="acceptTerms"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1"
                                aria-describedby="terms-description"
                            />
                        </FormControl>
                        <div className="space-y-2 leading-none">
                            <FormLabel className="text-lg font-semibold text-gray-800">
                                Terms and Conditions *
                            </FormLabel>
                            <FormDescription id="terms-description" className="text-gray-600">
                                I agree to the{" "}
                                <button
                                    type="button"
                                    className="text-violet-600 hover:text-violet-800 underline font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded"
                                    onClick={() => handleLinkClick("/terms")}
                                    aria-label="Open terms of service in new tab"
                                >
                                    terms of service
                                </button>
                                {" "}and{" "}
                                <button
                                    type="button"
                                    className="text-violet-600 hover:text-violet-800 underline font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded"
                                    onClick={() => handleLinkClick("/privacy")}
                                    aria-label="Open privacy policy in new tab"
                                >
                                    privacy policy
                                </button>
                                . I understand that by submitting this form, I'm requesting a
                                consultation for the selected services.
                            </FormDescription>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
}