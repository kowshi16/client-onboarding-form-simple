import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ServiceOptionId } from "@/lib/constants/form-options";

interface ServiceCardProps {
    service: {
        id: string;
        label: string;
        icon: string;
        description: string;
        gradient: string;
    };
    isSelected: boolean;
    onToggle: (checked: boolean) => void;
}

/**
 * Individual service selection card component
 */
export function ServiceCard({ service, isSelected, onToggle }: ServiceCardProps) {
    return (
        <FormItem
            className={cn(
                "relative overflow-hidden rounded-xl border-2 p-4 transition-all cursor-pointer hover:scale-105",
                isSelected
                    ? "border-violet-300 bg-white shadow-lg"
                    : "border-gray-200 bg-white/50 hover:border-gray-300"
            )}
        >
            <FormControl>
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={onToggle}
                    className="absolute top-4 right-4"
                    aria-describedby={`service-${service.id}-description`}
                />
            </FormControl>
            <div className="pr-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl" role="img" aria-label={service.label}>
                        {service.icon}
                    </span>
                    <FormLabel className="font-semibold text-gray-800 cursor-pointer">
                        {service.label}
                    </FormLabel>
                </div>
                <p
                    id={`service-${service.id}-description`}
                    className="text-sm text-gray-600"
                >
                    {service.description}
                </p>
            </div>
            {isSelected && (
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
                        service.gradient
                    )}
                    aria-hidden="true"
                />
            )}
        </FormItem>
    );
}