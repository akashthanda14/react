import Link from "next/link";

export const metadata = {
    title: "Learning Tracks",
    description: "Choose your engineering path. Structured, phase-based roadmaps built from real production experience.",
};

const tracks = [
    {
        slug: "backend",
        title: "Backend Engineering",
        emoji: "⚙️",
        desc: "APIs · Databases · Caching · Message Queues · Production Patterns",
        phases: 5, hours: 40, engineers: "2.4K",
        color: "#00E599", href: "/learn/backend",
    },
    {
        slug: "system-design",
        title: "System Design",
        emoji: "🏗️",
        desc: "Scalability · Distributed Systems · Load Balancing · Architecture",
        phases: 5, hours: 35, engineers: "1.8K",
        color: "#00D4FF", href: "/learn/system-design",
    },
    {
        slug: "devops",
        title: "DevOps & Cloud",
        emoji: "☁️",
        desc: "Docker · Kubernetes · AWS · CI/CD · Monitoring · Infrastructure",
        phases: 5, hours: 30, engineers: "1.2K",
        color: "#FF6B6B", href: "/learn/devops",
    },
    {
        slug: "genai",
        title: "Generative AI",
        emoji: "🤖",
        desc: "Prompt Engineering · RAG · Agents · LangChain · AI Architecture",
        phases: 5, hours: 25, engineers: "3.1K",
        color: "#C084FC", href: "/learn/genai",
    },
    {
        slug: "foundations",
        title: "Full Stack Frontend",
        emoji: "🖥️",
        desc: "React · Next.js · TypeScript · State Management · Performance",
        phases: 5, hours: 35, engineers: "1.6K",
        color: "#FFB347", href: "/learn/foundations",
    },
];

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-24">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="font-display font-bold text-foreground leading-tight"
                        style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
                        Learning tracks.
                    </h1>
                    <p className="text-[15px] text-foreground/40 mt-4 max-w-[480px] leading-relaxed">
                        Battle-tested roadmaps from real production experience. Each track is
                        structured into progressive phases with milestone checkpoints.
                    </p>
                </div>

                {/* Tracks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                    {tracks.map((t) => (
                        <Link
                            key={t.slug}
                            href={t.href}
                            className="group relative bg-surface border border-border rounded-xl p-7 transition-all duration-200 hover:border-foreground/15"
                        >
                            <div className="text-3xl mb-5">{t.emoji}</div>
                            <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-neon transition-colors">
                                {t.title}
                            </h3>
                            <p className="text-[13px] text-foreground/40 leading-relaxed mb-6">{t.desc}</p>

                            <div className="flex items-center gap-3 text-[11px] font-mono text-foreground/25 mb-6">
                                <span>{t.phases} phases</span>
                                <span>·</span>
                                <span>{t.hours}h</span>
                                <span>·</span>
                                <span style={{ color: t.color }}>{t.engineers} enrolled</span>
                            </div>

                            <div className="flex items-center justify-between pt-5 border-t border-border">
                                <span className="text-[13px] font-medium text-neon group-hover:underline">
                                    View Roadmap →
                                </span>
                                <span className="text-[11px] font-mono text-foreground/20">FREE</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* How it works */}
                <div className="border border-border rounded-xl overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/[0.08]">
                        {[
                            { step: "01", title: "Structured Phases", desc: "Each track is broken into 5 progressive phases. Complete them in order for maximum retention." },
                            { step: "02", title: "Milestone Checkpoints", desc: "Every phase has milestones — concrete projects and concepts you should be able to explain." },
                            { step: "03", title: "Production Skills", desc: "Built from real-world experience, not textbook theory. Every topic maps to skills companies test for." },
                        ].map((item) => (
                            <div key={item.step} className="bg-background p-8 sm:p-10">
                                <div className="font-mono text-2xl font-bold text-foreground/10 mb-3">{item.step}</div>
                                <h3 className="font-display font-bold text-foreground text-sm mb-2">{item.title}</h3>
                                <p className="text-[13px] text-foreground/40 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-foreground/30 mb-4">
                        Want personalized mentorship alongside the roadmap?
                    </p>
                    <Link href="/pricing" className="text-[13px] font-medium text-neon hover:underline">
                        View Pricing →
                    </Link>
                </div>

            </div>
        </div>
    );
}
