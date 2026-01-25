import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const phases = [
    {
        id: 1,
        name: "System Design Fundamentals",
        learn: "Scalability concepts, CAP theorem, consistency patterns, basic architecture",
        outcome: "Understand core distributed systems principles and tradeoffs",
        milestones: [
            "Explain CAP theorem with real-world examples",
            "Design a basic client-server architecture",
            "Compare strong vs eventual consistency tradeoffs",
        ],
    },
    {
        id: 2,
        name: "Building Blocks",
        learn: "Load balancers, caches, databases, message queues, CDNs",
        outcome: "Choose and apply appropriate components for system requirements",
        milestones: [
            "Design caching strategy for a high-traffic system",
            "Choose between SQL and NoSQL for different use cases",
            "Implement message queue for async processing",
        ],
    },
    {
        id: 3,
        name: "Data & Storage",
        learn: "SQL vs NoSQL, sharding, replication, data modeling, consistency",
        outcome: "Design data storage solutions for different scale requirements",
        milestones: [
            "Design database schema with proper normalization",
            "Implement database sharding strategy",
            "Explain replication and partitioning tradeoffs",
        ],
    },
    {
        id: 4,
        name: "Scale & Reliability",
        learn: "Horizontal scaling, fault tolerance, disaster recovery, rate limiting",
        outcome: "Design systems that handle millions of users reliably",
        milestones: [
            "Design a system to handle 10M daily active users",
            "Implement fault tolerance with redundancy",
            "Design rate limiting and backpressure mechanisms",
        ],
    },
    {
        id: 5,
        name: "Real-World Systems",
        learn: "Design Twitter, Netflix, Uber, WhatsApp, URL shortener",
        outcome: "Apply concepts to design complete production systems",
        milestones: [
            "Design a URL shortening service end-to-end",
            "Design a real-time messaging system",
            "Design a video streaming platform architecture",
        ],
    },
];

export default function SystemDesignRoadmapPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Tracks
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        System Design Specialist Roadmap
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Master distributed systems, scalability, and architectural design through structured problem-solving phases.
                    </p>
                </div>

                {/* Phases */}
                <div className="space-y-6">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className="p-6 bg-card border border-border rounded-xl hover:border-neon/30 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <span className="text-xl font-bold text-neon">
                                            {phase.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        {phase.name}
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-foreground/70 mb-1">
                                                What you learn:
                                            </p>
                                            <p className="text-muted-foreground">
                                                {phase.learn}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-foreground/70 mb-1">
                                                Outcome:
                                            </p>
                                            <p className="text-muted-foreground">
                                                {phase.outcome}
                                            </p>
                                        </div>

                                        {/* Milestones */}
                                        <div className="pt-3 mt-3 border-t border-border/50">
                                            <p className="text-sm font-medium text-foreground/70 mb-2">
                                                Milestones:
                                            </p>
                                            <ul className="space-y-2">
                                                {phase.milestones.map((milestone, idx) => (
                                                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <span className="text-neon mt-0.5">•</span>
                                                        <span>{milestone}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-muted-foreground/30" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="mt-12 p-6 bg-card/50 border border-border rounded-xl">
                    <p className="text-sm text-muted-foreground">
                        Each phase builds on the previous. Complete validation checkpoints before progressing to the next phase.
                    </p>
                </div>
            </div>
        </div>
    );
}
