"use client";

import { Suspense } from "react";
import { format } from "date-fns";
import {
    CheckCircle,
    AlertCircle,
    Loader2,
    Sparkles,
    Building,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form";
import { useQueryParamsPrefill } from "@/lib/hooks/use-query-params";
import { PersonalInfoSection } from "./form-sections/personal-info-section";
import { ServicesSection } from "./form-sections/services-section";
import { ProjectDetailsSection } from "./form-sections/project-details-section";
import { TermsSection } from "./form-sections/terms-section";

/**
 * Main onboarding form component with all sections
 */
function OnboardingFormContent() {
    const { form, submission, onSubmit, isLoading } = useOnboardingForm();

    // Pre-fill form from query parameters
    useQueryParamsPrefill(form);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 relative">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-violet-200 mb-6">
                        <Sparkles className="h-5 w-5 text-violet-600" />
                        <span className="text-sm font-semibold text-violet-700">
                            Premium Onboarding Experience
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                        Welcome to Our Team
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Let's create something amazing together. Tell us about your project
                        and we'll craft the perfect solution for your needs.
                    </p>
                </div>

                <Card className="shadow-2xl border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 text-white p-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Building className="h-8 w-8" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold">
                                    Client Onboarding
                                </CardTitle>
                                <CardDescription className="text-violet-100 text-lg">
                                    Share your vision and let's bring it to life
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                        {/* Success Alert */}
                        {submission.status === "success" && (
                            <Alert className="border-emerald-200 bg-emerald-50">
                                <CheckCircle className="h-5 w-5 text-emerald-600" />
                                <AlertDescription className="text-emerald-800">
                                    <div className="font-semibold mb-2">{submission.message}</div>
                                    {submission.submittedData && (
                                        <div className="bg-emerald-100 rounded-lg p-4 mt-3">
                                            <h4 className="font-semibold mb-2">
                                                Submission Summary:
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <strong>Name:</strong>{" "}
                                                    {submission.submittedData.fullName}
                                                </div>
                                                <div>
                                                    <strong>Company:</strong>{" "}
                                                    {submission.submittedData.companyName}
                                                </div>
                                                <div>
                                                    <strong>Services:</strong>{" "}
                                                    {submission.submittedData.services.join(", ")}
                                                </div>
                                                <div>
                                                    <strong>Start Date:</strong>{" "}
                                                    {format(
                                                        submission.submittedData.projectStartDate,
                                                        "PPP"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Error Alert */}
                        {submission.status === "error" && (
                            <Alert className="border-red-200 bg-red-50">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                <AlertDescription className="text-red-800 font-medium">
                                    {submission.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Form {...form}>
                            <form onSubmit={onSubmit} className="space-y-8">
                                {/* Personal Information Section */}
                                <PersonalInfoSection control={form.control} />

                                {/* Services Section */}
                                <ServicesSection control={form.control} />

                                {/* Project Details Section */}
                                <ProjectDetailsSection control={form.control} />

                                {/* Terms Section */}
                                <TermsSection control={form.control} />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-14 text-xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 hover:from-violet-700 hover:via-blue-700 hover:to-cyan-700 shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                            Submitting Your Information...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-3 h-6 w-6" />
                                            Start Your Project Journey
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-sm text-gray-500 mt-4">
                                    We'll review your information and get back to you within 24
                                    hours with next steps.
                                </p>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

/**
 * Main export with Suspense wrapper for useSearchParams
 */
export default function OnboardingForm() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                </div>
            }
        >
            <OnboardingFormContent />
        </Suspense>
    );
}
