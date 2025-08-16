import { Control } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, Calendar as CalendarClock } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { OnboardingFormData } from "@/lib/validations/onboarding-schema";

interface ProjectDetailsSectionProps {
    control: Control<OnboardingFormData>;
}

export function ProjectDetailsSection({ control }: ProjectDetailsSectionProps) {
    return (
        <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-100 rounded-lg">
                    <CalendarClock className="h-5 w-5 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Project Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Budget */}
                <FormField
                    control={control}
                    name="budgetUsd"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                Budget (USD)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="e.g., 50000"
                                    className="h-12 text-lg border-2 focus:border-cyan-500 transition-colors"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value === "" ? undefined : parseInt(value));
                                    }}
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormDescription>Optional. Range: $100 - $1,000,000</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Project Start Date */}
                <FormField
                    control={control}
                    name="projectStartDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                Project Start Date *
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "h-12 w-full text-lg pl-3 text-left font-normal border-2 focus:border-cyan-500 transition-colors",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date(new Date().setHours(0, 0, 0, 0))
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Select when you'd like to start your project
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}