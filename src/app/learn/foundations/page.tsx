import TrackRoadmapLayout from "@/components/TrackRoadmapLayout";

const phases = [
    {
        id: 1,
        name: "Web Fundamentals",
        learn: "HTML5, CSS3, responsive design, JavaScript ES6+, DOM manipulation",
        outcome: "Build responsive, interactive web pages from scratch",
        milestones: [
            "Build a responsive portfolio website with CSS Grid/Flexbox",
            "Implement interactive form validation with vanilla JS",
            "Create a dynamic single-page layout with DOM manipulation",
        ],
    },
    {
        id: 2,
        name: "React & Component Architecture",
        learn: "React fundamentals, JSX, hooks, component patterns, state management",
        outcome: "Build complex, component-based user interfaces with React",
        milestones: [
            "Build a full CRUD app with React hooks",
            "Implement custom hooks for reusable logic",
            "Design a component library with proper prop patterns",
        ],
    },
    {
        id: 3,
        name: "TypeScript & State Management",
        learn: "TypeScript with React, Zustand, context API, data fetching patterns",
        outcome: "Write type-safe React applications with scalable state management",
        milestones: [
            "Convert a JavaScript React app to TypeScript",
            "Implement global state management with Zustand",
            "Build data-fetching layer with error and loading states",
        ],
    },
    {
        id: 4,
        name: "Next.js & Full Stack",
        learn: "Next.js App Router, SSR/SSG, API routes, authentication, database integration",
        outcome: "Build and deploy production full-stack applications with Next.js",
        milestones: [
            "Build a full-stack Next.js app with authentication",
            "Implement server components and dynamic routing",
            "Deploy to Vercel with database and environment config",
        ],
    },
    {
        id: 5,
        name: "Performance & Production",
        learn: "Performance optimization, testing, accessibility, CI/CD, monitoring",
        outcome: "Ship production-grade frontend applications with confidence",
        milestones: [
            "Optimize Core Web Vitals to green scores",
            "Implement unit and integration tests with Jest/Vitest",
            "Set up CI/CD pipeline with automated testing and deployment",
        ],
    },
];

export default function FoundationsPage() {
    return (
        <TrackRoadmapLayout
            title="Full Stack Frontend"
            emoji="🖥️"
            color="#FFB347"
            phases={5}
            hours={35}
            description="From HTML/CSS foundations to production Next.js — master React, TypeScript, state management, and performance optimization."
            phaseData={phases}
        />
    );
}
