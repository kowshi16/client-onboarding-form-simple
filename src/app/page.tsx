import OnboardingForm from "@/components/ui/forms/onboarding-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Onboarding | Start Your Project Journey",
  description:
    "Tell us about your project and let's create something amazing together. Our onboarding process helps us understand your needs and craft the perfect solution.",
  keywords: [
    "onboarding",
    "project consultation",
    "web development",
    "UI/UX design",
    "branding",
    "mobile app",
  ],
};

export default function OnboardingPage() {
  return <OnboardingForm />;
}
