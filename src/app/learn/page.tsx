import Link from "next/link";
import { ArrowRight, Code, Cloud, Cpu, Sparkles } from "lucide-react";

const tracks = [
    {
        id: "backend",
        title: "Backend / Fullstack Engineer",
        icon: Code,
        forWhom: "Engineers building scalable server-side systems and full-stack applications",
        outcome: "Design APIs, databases, microservices, and end-to-end web applications",
        href: "/learn/backend",
    },
    {
        id: "devops",
        title: "DevOps Engineer",
        icon: Cloud,
        forWhom: "Engineers managing infrastructure, deployments, and system reliability",
        outcome: "Build CI/CD pipelines, container orchestration, and monitoring systems",
        href: "/learn/devops",
    },
    {
        id: "system-design",
        title: "System Design Specialist",
        icon: Cpu,
        forWhom: "Engineers preparing for system design interviews and architecture roles",
        outcome: "Design distributed systems, handle scale, and make architectural tradeoffs",
        href: "/learn/system-design",
    },
    {
        id: "genai",
        title: "GenAI Engineer",
        icon: Sparkles,
        forWhom: "Engineers building AI-powered applications and LLM integrations",
        outcome: "Build RAG systems, prompt engineering pipelines, and AI product features",
        href: "/learn/genai",
    },
];

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        Engineering Tracks
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Choose your engineering path. Each track provides a structured roadmap with milestones and validation checkpoints.
                    </p>
                </div>

                {/* Tracks Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {tracks.map((track) => {
                        const Icon = track.icon;
                        return (
                            <Link
                                key={track.id}
                                href={track.href}
                                className="group p-8 bg-card border border-border rounded-xl hover:shadow-lg hover:border-neon/30 transition-all"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                            <Icon className="w-7 h-7 text-neon" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-foreground group-hover:text-neon transition-colors">
                                                {track.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <p className="text-sm font-medium text-foreground/70 mb-1">
                                            Who this is for:
                                        </p>
                                        <p className="text-muted-foreground">
                                            {track.forWhom}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground/70 mb-1">
                                            What you'll be able to design:
                                        </p>
                                        <p className="text-muted-foreground">
                                            {track.outcome}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <span className="text-sm font-semibold text-neon group-hover:underline">
                                        View Roadmap
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Info Section */}
                <div className="mt-16 p-6 bg-card/50 border border-border rounded-xl">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                        How Roadmaps Work
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                        <div>
                            <p className="font-medium text-foreground mb-1">Structured Path</p>
                            <p>Follow a clear sequence of topics and milestones</p>
                        </div>
                        <div>
                            <p className="font-medium text-foreground mb-1">Validation Checkpoints</p>
                            <p>Verify understanding before progressing to next stage</p>
                        </div>
                        <div>
                            <p className="font-medium text-foreground mb-1">Progress Tracking</p>
                            <p>Monitor completion and identify knowledge gaps</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
