"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Code, Cloud, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

const TRACKS = [
    {
        slug: "backend",
        name: "Full Stack Engineer",
        targetRole: "Backend / Fullstack Engineer",
        description: "Frontend, backend, databases, APIs, testing, and deployment from zero to production",
        icon: Code,
        emoji: "⚙️",
        phases: 6,
        skills: 30,
        stack: ["React", "Node.js", "PostgreSQL", "Docker"],
        accentColor: "#3B82F6",
        borderClass: "border-blue-500/40",
        glowClass: "shadow-[0_0_24px_rgba(59,130,246,0.12)]",
        bgClass: "bg-blue-500/5",
    },
    {
        slug: "devops",
        name: "DevOps Engineer",
        targetRole: "DevOps Engineer",
        description: "Linux, CI/CD, Docker, Kubernetes, cloud infrastructure, GitOps, and SRE practices",
        icon: Cloud,
        emoji: "☁️",
        phases: 6,
        skills: 30,
        stack: ["Docker", "K8s", "Terraform", "AWS"],
        accentColor: "#A855F7",
        borderClass: "border-purple-500/40",
        glowClass: "shadow-[0_0_24px_rgba(168,85,247,0.12)]",
        bgClass: "bg-purple-500/5",
    },
    {
        slug: "system-design",
        name: "System Design Specialist",
        targetRole: "System Design Specialist",
        description: "Distributed systems, scalability, databases, real-world design interviews at FAANG level",
        icon: Cpu,
        emoji: "🏗️",
        phases: 6,
        skills: 30,
        stack: ["CAP Theorem", "Kafka", "Redis", "CQRS"],
        accentColor: "#F97316",
        borderClass: "border-orange-500/40",
        glowClass: "shadow-[0_0_24px_rgba(249,115,22,0.12)]",
        bgClass: "bg-orange-500/5",
    },
    {
        slug: "genai",
        name: "Generative AI Engineer",
        targetRole: "GenAI Engineer",
        description: "LLMs, prompt engineering, RAG systems, fine-tuning, agents, and production AI deployment",
        icon: Sparkles,
        emoji: "✨",
        phases: 6,
        skills: 30,
        stack: ["LangChain", "RAG", "Fine-tuning", "Agents"],
        accentColor: "#00FF7F",
        borderClass: "border-neon/40",
        glowClass: "shadow-[0_0_24px_rgba(0,255,127,0.12)]",
        bgClass: "bg-neon/5",
    },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedTrack = TRACKS.find((t) => t.slug === selected);

    const handleStart = async () => {
        if (!selected) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/roadmap/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    experienceLevel: "Just starting out",
                    targetRole: TRACKS.find((t) => t.slug === selected)!.targetRole,
                    weeklyHours: "4-6 hours per week",
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                if (response.status === 400 && text.includes("already has a roadmap")) {
                    router.push("/roadmap");
                    router.refresh();
                    return;
                }
                throw new Error(text || "Failed to create roadmap");
            }

            router.push("/roadmap");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background px-4 py-16">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs text-muted-foreground mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                        Step 1 of 1 — Choose your track
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                        What do you want to<br />
                        <span className="text-neon">become?</span>
                    </h1>
                    <p className="text-base text-muted-foreground max-w-lg mx-auto">
                        Pick the engineering role you're building toward. You'll get a structured, phase-based roadmap — built for that exact goal.
                    </p>
                </div>

                {/* Track Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {TRACKS.map((track) => {
                        const isSelected = selected === track.slug;
                        return (
                            <button
                                key={track.slug}
                                id={`track-${track.slug}`}
                                onClick={() => setSelected(track.slug)}
                                className={`relative text-left p-5 rounded-xl border-2 transition-all duration-200 ${track.bgClass}
                                    ${isSelected
                                        ? `${track.borderClass} ${track.glowClass} scale-[1.02]`
                                        : "border-border hover:border-muted-foreground/30 hover:scale-[1.01]"
                                    }`}
                            >
                                {/* Selected check */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4">
                                        <CheckCircle2 className="w-5 h-5 text-neon" />
                                    </div>
                                )}

                                {/* Icon + Name */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                                        style={{ backgroundColor: `${track.accentColor}18` }}
                                    >
                                        {track.emoji}
                                    </div>
                                    <h2 className="font-display font-bold text-foreground text-base leading-tight pr-6">
                                        {track.name}
                                    </h2>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {track.description}
                                </p>

                                {/* Tech stack tags */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {track.stack.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-muted-foreground border border-border bg-surface"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                                    <span>
                                        <span className="font-semibold text-foreground">{track.phases}</span> phases
                                    </span>
                                    <span>
                                        <span className="font-semibold text-foreground">{track.skills}+</span> skills
                                    </span>
                                    <span className="ml-auto text-neon text-[10px] font-semibold">
                                        {isSelected ? "Selected ✓" : "Select →"}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Error */}
                {error && (
                    <div className="p-4 mb-4 bg-danger/10 border border-danger/30 rounded-lg text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* CTA */}
                <button
                    onClick={handleStart}
                    disabled={!selected || isSubmitting}
                    id="start-track-btn"
                    className={`w-full py-4 font-bold text-base rounded-xl transition-all inline-flex items-center justify-center gap-3
                        ${selected
                            ? "bg-neon text-background hover:bg-neon/90 hover:scale-[1.01] shadow-[0_0_24px_rgba(0,255,127,0.25)]"
                            : "bg-surface border border-border text-muted-foreground cursor-not-allowed"
                        }
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100`}
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            Setting up your roadmap…
                        </>
                    ) : selected ? (
                        <>
                            Start {selectedTrack?.name} Roadmap
                            <ArrowRight className="w-5 h-5" />
                        </>
                    ) : (
                        "Select a track to continue"
                    )}
                </button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    Free to start · No credit card · Switch tracks anytime
                </p>
            </div>
        </div>
    );
}
