export const SERVICE_OPTIONS = [
    {
        id: "UI/UX",
        label: "UI/UX Design",
        icon: "🎨",
        description: "User interface & experience design",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        id: "Branding",
        label: "Branding",
        icon: "✨",
        description: "Brand identity & visual design",
        gradient: "from-purple-500 to-violet-500",
    },
    {
        id: "Web Dev",
        label: "Web Development",
        icon: "💻",
        description: "Custom web applications",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "Mobile App",
        label: "Mobile App Development",
        icon: "📱",
        description: "iOS & Android applications",
        gradient: "from-emerald-500 to-teal-500",
    },
] as const;

export const BUDGET_CONSTRAINTS = {
    MIN: 100,
    MAX: 1000000,
} as const;

export const FORM_SECTIONS = {
    PERSONAL_INFO: "Personal Information",
    SERVICES: "Services We Can Help You With",
    PROJECT_DETAILS: "Project Details",
    TERMS: "Terms and Conditions",
} as const;

export type ServiceOptionId = typeof SERVICE_OPTIONS[number]["id"];