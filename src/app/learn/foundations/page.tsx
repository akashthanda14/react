import BranchingRoadmapPage from "@/components/BranchingRoadmapPage";

const phases = [
    {
        id: 1,
        title: "Web Fundamentals",
        learn: "HTML5, CSS3, responsive design, JavaScript ES6+, DOM manipulation",
        outcome: "Build responsive, interactive web pages from scratch.",
        milestones: [
            "Build a responsive portfolio website with CSS Grid/Flexbox",
            "Implement interactive form validation with vanilla JS",
            "Create a dynamic single-page layout with DOM manipulation",
        ],
        concepts: ["HTML semantics", "CSS layout", "JavaScript events", "Responsive design"],
        project: "Personal portfolio site",
    },
    {
        id: 2,
        title: "React & Component Architecture",
        learn: "React fundamentals, JSX, hooks, component patterns, state management",
        outcome: "Build complex, component-based user interfaces with React.",
        milestones: [
            "Build a full CRUD app with React hooks",
            "Implement custom hooks for reusable logic",
            "Design a component library with proper prop patterns",
        ],
        concepts: ["Components", "Hooks", "Composition", "State flow"],
        project: "CRUD dashboard in React",
    },
    {
        id: 3,
        title: "TypeScript & State Management",
        learn: "TypeScript with React, Zustand, context API, data fetching patterns",
        outcome: "Write type-safe React applications with scalable state management.",
        milestones: [
            "Convert a JavaScript React app to TypeScript",
            "Implement global state management with Zustand",
            "Build data-fetching layer with error and loading states",
        ],
        concepts: ["Types and interfaces", "Global state", "Async data", "Error handling"],
        project: "Typed product dashboard",
    },
    {
        id: 4,
        title: "Next.js & Full Stack",
        learn: "Next.js App Router, SSR/SSG, API routes, authentication, database integration",
        outcome: "Build and deploy production full-stack applications with Next.js.",
        milestones: [
            "Build a full-stack Next.js app with authentication",
            "Implement server components and dynamic routing",
            "Deploy to Vercel with database and environment config",
        ],
        concepts: ["App Router", "Server components", "API routes", "Auth and data"],
        project: "Full-stack app with auth and DB",
    },
    {
        id: 5,
        title: "Performance & Production",
        learn: "Performance optimization, testing, accessibility, CI/CD, monitoring",
        outcome: "Ship production-grade frontend applications with confidence.",
        milestones: [
            "Optimize Core Web Vitals to green scores",
            "Implement unit and integration tests with Jest/Vitest",
            "Set up CI/CD pipeline with automated testing and deployment",
        ],
        concepts: ["Core Web Vitals", "Testing", "Accessibility", "Monitoring"],
        project: "Production-ready frontend system",
    },
];

const decisionBranches = [
    {
        title: "Client vs Server Components",
        whenToUse: "Use server components when data and SEO matter. Use client components when interactivity and local state are necessary.",
        decision: "Default to server; opt into client only for true interactivity.",
        task: "Take one page and split it into the smallest useful server/client boundary.",
    },
    {
        title: "Local State vs Global State",
        whenToUse: "Use local state for UI-specific behavior. Use global state when multiple distant components need the same source of truth.",
        decision: "Keep state as local as possible.",
        task: "Move one piece of state from props into a store only if it truly needs to be shared.",
    },
    {
        title: "SSR vs SSG vs CSR",
        whenToUse: "Use SSR for dynamic data, SSG for static content, and CSR for highly interactive app flows.",
        decision: "Match rendering strategy to user experience and freshness needs.",
        task: "Choose rendering strategies for three different product pages and explain why.",
    },
];

const advancedLayers = [
    {
        title: "Frontend Architecture",
        items: ["Component boundaries", "State flow", "Routing", "Layout composition"],
    },
    {
        title: "Production Frontend",
        items: ["Performance tuning", "Accessibility", "Testing", "Deployments"],
    },
    {
        title: "Full Stack Skills",
        items: ["Auth flows", "API integration", "Database-backed UI", "Monitoring and analytics"],
    },
];

const executionPlan = [
    {
        title: "Days 1–30",
        items: ["Learn HTML, CSS, and JavaScript by building tiny pages.", "Rebuild the same UI in React and understand component boundaries.", "Practice responsive layouts every week."],
    },
    {
        title: "Days 31–60",
        items: ["Add TypeScript and state management to a React app.", "Build one authenticated Next.js flow.", "Ship one project with data fetching and forms."],
    },
    {
        title: "Days 61–90",
        items: ["Focus on performance, tests, and accessibility.", "Deploy a polished full-stack app and measure Core Web Vitals.", "Create a frontend capstone with real production polish."],
    },
];

export default function FoundationsPage() {
    return (
        <BranchingRoadmapPage
            title="Full Stack Frontend"
            emoji="🖥️"
            color="#FFB347"
            phasesCount={5}
            hours={35}
            description="From HTML/CSS foundations to production Next.js — master React, TypeScript, state management, and performance optimization."
            rootGoal="Build production-ready frontend systems"
            rootOutcome="Move from static pages to accessible, performant, full-stack user experiences."
            rootExecution="Learn the browser, then React, then Next.js, then production quality."
            summaryStats={[
                { value: "5", label: "phases" },
                { value: "3", label: "decision branches" },
                { value: "1", label: "full-stack capstone" },
                { value: "35h", label: "study time" },
            ]}
            pills={["HTML", "CSS", "React", "TypeScript", "Next.js"]}
            phaseHeader="Web → React → TypeScript → Next.js → Production"
            phaseDescription="The roadmap branches from browser fundamentals into reusable components, typed state, full-stack integration, and production readiness."
            phases={phases}
            decisionBranches={decisionBranches}
            advancedLayers={advancedLayers}
            executionPlan={executionPlan}
            mistakes={[
                "Skipping HTML and CSS fundamentals and jumping straight to frameworks.",
                "Overusing global state when local state is enough.",
                "Ignoring accessibility and performance until late in the project.",
            ]}
            topSignals={[
                "They build components with a clear state boundary.",
                "They think about accessibility and performance early.",
                "They can ship a polished full-stack app end to end.",
            ]}
            footerNote="Frontend mastery is about reliable UI systems, not just making things look good."
        />
    );
}
