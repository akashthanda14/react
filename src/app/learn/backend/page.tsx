import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const phases = [
    {
        id: 1,
        name: "Fundamentals",
        learn: "HTTP, REST APIs, databases (SQL/NoSQL), authentication basics",
        outcome: "Build and deploy a CRUD API with database integration",
        milestones: [
            "Build a REST API with CRUD operations",
            "Implement JWT-based authentication",
            "Design and query a relational database schema",
        ],
    },
    {
        id: 2,
        name: "Architecture Patterns",
        learn: "MVC, microservices, event-driven architecture, API design patterns",
        outcome: "Design scalable backend systems with proper separation of concerns",
        milestones: [
            "Refactor a monolith into microservices",
            "Implement event-driven communication between services",
            "Design API contracts with versioning strategy",
        ],
    },
    {
        id: 3,
        name: "Data & Caching",
        learn: "Database optimization, caching strategies (Redis), message queues",
        outcome: "Optimize data access and implement efficient caching layers",
        milestones: [
            "Implement Redis caching for frequently accessed data",
            "Optimize database queries with indexing",
            "Set up a message queue for async processing",
        ],
    },
    {
        id: 4,
        name: "Scale & Performance",
        learn: "Load balancing, horizontal scaling, CDNs, database sharding",
        outcome: "Handle high traffic and scale systems to millions of users",
        milestones: [
            "Configure load balancer across multiple instances",
            "Implement database sharding strategy",
            "Explain horizontal vs vertical scaling tradeoffs",
        ],
    },
    {
        id: 5,
        name: "Production Systems",
        learn: "Monitoring, logging, error handling, deployment strategies, security",
        outcome: "Deploy and maintain production-grade backend systems",
        milestones: [
            "Set up monitoring and alerting for production system",
            "Implement structured logging and error tracking",
            "Deploy with zero-downtime strategy",
        ],
    },
];

export default function BackendRoadmapPage() {
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
                        Backend / Fullstack Engineer Roadmap
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Master server-side development, API design, databases, and full-stack architecture through structured phases.
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
