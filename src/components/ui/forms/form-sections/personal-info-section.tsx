import { Control } from "react-hook-form";
import { Building, Mail, User } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { OnboardingFormData } from "@/lib/validations/onboarding-schema";

interface PersonalInfoSectionProps {
    control: Control<OnboardingFormData>;
}

export function PersonalInfoSection({ control }: PersonalInfoSectionProps) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                    Personal Information
                </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Full Name *
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    className="h-12 text-lg border-2 focus:border-violet-500 transition-colors"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address *
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="your.email@company.com"
                                    className="h-12 text-lg border-2 focus:border-violet-500 transition-colors"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Company Name */}
            <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg font-semibold flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Company Name *
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Your company name"
                                className="h-12 text-lg border-2 focus:border-violet-500 transition-colors"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
