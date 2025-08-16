import { Control } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { SERVICE_OPTIONS } from "@/lib/constants/form-options";
import type { OnboardingFormData } from "@/lib/validations/onboarding-schema";
import { ServiceCard } from "../form-fields/service-card";

interface ServicesSectionProps {
    control: Control<OnboardingFormData>;
}

export function ServicesSection({ control }: ServicesSectionProps) {
    return (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
            <FormField
                control={control}
                name="services"
                render={() => (
                    <FormItem>
                        <FormLabel className="text-xl font-semibold text-gray-800 mb-4 block">
                            Services We Can Help You With *
                        </FormLabel>
                        <FormDescription className="text-gray-600 mb-6">
                            Select all services that interest you for your project
                        </FormDescription>
                        <div className="grid md:grid-cols-2 gap-4">
                            {SERVICE_OPTIONS.map((service) => (
                                <FormField
                                    key={service.id}
                                    control={control}
                                    name="services"
                                    render={({ field }) => {
                                        const isSelected = field.value?.includes(service.id);
                                        return (
                                            <ServiceCard
                                                service={service}
                                                isSelected={isSelected}
                                                onToggle={(checked) => {
                                                    return checked
                                                        ? field.onChange([...field.value, service.id])
                                                        : field.onChange(
                                                            field.value?.filter((value) => value !== service.id)
                                                        );
                                                }}
                                            />
                                        );
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}