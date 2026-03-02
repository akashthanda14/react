"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Circle,
    ChevronDown,
    ChevronUp,
    Lock,
    ArrowRight,
    Bot,
    X,
    Layers,
    Plus,
    Target,
    BookOpen,
    Zap,
} from "lucide-react";
import Link from "next/link";

// ─── Types (mirroring roadmap-service) ───────────────────────────────────────
interface MilestoneData {
    id: string;
    title: string;
    order: number;
    completed: boolean;
}

interface SkillData {
    id: string;
    name: string;
    description: string | null;
    order: number;
}

interface PhaseData {
    id: string;
    name: string;
    description: string | null;
    outcome: string | null;
    order: number;
    skills: SkillData[];
    milestones: MilestoneData[];
}

interface RoadmapData {
    id: string;
    trackName: string;
    trackSlug: string;
    phases: PhaseData[];
}

interface RoadmapViewClientProps {
    roadmap: RoadmapData;
    userName?: string;
}

// ─── Track accent colors ──────────────────────────────────────────────────────
const TRACK_META: Record<string, { emoji: string; color: string; border: string; bg: string }> = {
    backend: { emoji: "⚙️", color: "#3B82F6", border: "border-blue-500/30", bg: "bg-blue-500/10" },
    devops: { emoji: "☁️", color: "#A855F7", border: "border-purple-500/30", bg: "bg-purple-500/10" },
    "system-design": { emoji: "🏗️", color: "#F97316", border: "border-orange-500/30", bg: "bg-orange-500/10" },
    genai: { emoji: "✨", color: "#00FF7F", border: "border-neon/30", bg: "bg-neon/10" },
};

// ─── AI Recommendation Card ───────────────────────────────────────────────────
function AIRecommendationCard({
    phases,
    onDismiss,
}: {
    phases: PhaseData[];
    onDismiss: () => void;
}) {
    // Find the first incomplete milestone across phases
    let recommendation = { topic: "", reason: "", phase: "" };
    for (const phase of phases) {
        const incomplete = phase.milestones.find((m) => !m.completed);
        if (incomplete) {
            const completedCount = phase.milestones.filter((m) => m.completed).length;
            const total = phase.milestones.length;
            recommendation = {
                topic: incomplete.title,
                reason: `You're ${Math.round((completedCount / total) * 100)}% done with ${phase.name}. Complete this milestone to keep momentum.`,
                phase: phase.name,
            };
            break;
        }
    }

    if (!recommendation.topic) return null;

    return (
        <div className="relative p-4 rounded-xl border border-ai/30 bg-ai/5 shadow-ai-sm animate-in slide-up">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-ai/5 to-transparent pointer-events-none" />
            <div className="relative">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-ai/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-ai" />
                        </div>
                        <span className="text-xs font-semibold text-ai uppercase tracking-wider">AI Next Step</span>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
                    {recommendation.topic}
                </p>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {recommendation.reason}
                </p>
                <button className="text-xs font-semibold text-ai flex items-center gap-1 hover:gap-2 transition-all">
                    Go to Milestone <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}

// ─── Phase Card ───────────────────────────────────────────────────────────────
function PhaseCard({
    phase,
    isLocked,
    onMilestoneToggle,
    defaultOpen,
}: {
    phase: PhaseData;
    isLocked: boolean;
    onMilestoneToggle: (milestoneId: string, completed: boolean) => void;
    defaultOpen: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const total = phase.milestones.length;
    const completed = phase.milestones.filter((m) => m.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isComplete = completed === total && total > 0;

    return (
        <div
            className={`relative rounded-xl border transition-all duration-300 ${isComplete
                ? "border-neon/30 bg-neon/5"
                : isLocked
                    ? "border-border/40 opacity-60"
                    : "border-border bg-surface"
                }`}
        >
            {/* Phase Header */}
            <button
                className="w-full text-left p-5 flex items-center gap-4"
                onClick={() => !isLocked && setIsOpen(!isOpen)}
                disabled={isLocked}
            >
                {/* Phase number badge */}
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm border transition-all ${isComplete
                        ? "bg-neon text-background border-neon"
                        : isLocked
                            ? "bg-surface border-border text-disabled"
                            : "bg-surface-raised border-border text-muted-foreground"
                        }`}
                >
                    {isComplete ? <CheckCircle2 className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : phase.order}
                </div>

                {/* Title area */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-foreground text-base leading-tight font-display">
                            {phase.name}
                        </span>
                        {isComplete && (
                            <span className="px-2 py-0.5 bg-neon/15 text-neon text-[10px] font-bold uppercase tracking-widest rounded-full">
                                Complete
                            </span>
                        )}
                        {isLocked && (
                            <span className="px-2 py-0.5 bg-surface-raised text-disabled text-[10px] font-bold uppercase tracking-widest rounded-full">
                                Pro
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{phase.description}</p>
                </div>

                {/* Right: stats + chevron */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {completed}/{total}
                        </span>
                        <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {phase.skills.length}
                        </span>
                    </div>
                    {!isLocked && (
                        isOpen
                            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                </div>
            </button>

            {/* Mini progress bar */}
            {!isLocked && (
                <div className="px-5 pb-1">
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                        <div
                            className="h-full bg-neon rounded-full progress-bar-animated"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Locked overlay teaser */}
            {isLocked && (
                <div className="px-5 pb-5">
                    <div className="p-4 rounded-lg border border-border/50 bg-surface-raised/50 text-center">
                        <Lock className="w-5 h-5 text-disabled mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-3">
                            Unlock this phase with <span className="text-foreground font-medium">Pro</span>
                        </p>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-background bg-neon rounded-lg hover:bg-neon/90 transition-colors"
                        >
                            Upgrade to Pro <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Expanded Body */}
            {isOpen && !isLocked && (
                <div className="px-5 pb-5 space-y-5">
                    {/* Phase outcome */}
                    {phase.outcome && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-neon/5 border border-neon/10">
                            <Zap className="w-4 h-4 text-neon mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[11px] font-semibold text-neon uppercase tracking-wider mb-0.5">
                                    Phase Outcome
                                </p>
                                <p className="text-sm text-foreground">{phase.outcome}</p>
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {phase.skills.length > 0 && (
                        <div>
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <BookOpen className="w-3 h-3" /> Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {phase.skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface-raised border border-border text-muted-foreground"
                                        title={skill.description || ""}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Milestones */}
                    <div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Target className="w-3 h-3" /> Milestones
                        </p>
                        <div className="space-y-2">
                            {phase.milestones.map((milestone) => (
                                <button
                                    key={milestone.id}
                                    onClick={() => onMilestoneToggle(milestone.id, !milestone.completed)}
                                    className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all group ${milestone.completed
                                        ? "bg-neon/5 border-neon/20"
                                        : "bg-surface-raised border-border hover:border-neon/20 hover:bg-neon/5"
                                        }`}
                                >
                                    <div className="mt-0.5 flex-shrink-0">
                                        {milestone.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-neon" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-disabled group-hover:text-muted-foreground transition-colors" />
                                        )}
                                    </div>
                                    <span
                                        className={`text-sm font-medium leading-snug ${milestone.completed
                                            ? "text-muted-foreground line-through"
                                            : "text-foreground"
                                            }`}
                                    >
                                        {milestone.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function RoadmapViewClient({ roadmap, userName }: RoadmapViewClientProps) {
    const [phases, setPhases] = useState<PhaseData[]>(roadmap.phases);
    const [showAI, setShowAI] = useState(true);

    const trackMeta = TRACK_META[roadmap.trackSlug] ?? TRACK_META["backend"];

    const totalMilestones = phases.flatMap((p) => p.milestones).length;
    const completedMilestones = phases.flatMap((p) => p.milestones).filter((m) => m.completed).length;
    const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    // Find first incomplete phase for "current" logic
    const currentPhaseIndex = phases.findIndex((p) =>
        p.milestones.some((m) => !m.completed)
    );

    const handleMilestoneToggle = async (milestoneId: string, completed: boolean) => {
        // Optimistic update
        setPhases((prev) =>
            prev.map((phase) => ({
                ...phase,
                milestones: phase.milestones.map((m) =>
                    m.id === milestoneId ? { ...m, completed } : m
                ),
            }))
        );

        // Persist to DB
        try {
            await fetch(`/api/roadmap/milestone/${milestoneId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed }),
            });
        } catch {
            // Revert on error
            setPhases((prev) =>
                prev.map((phase) => ({
                    ...phase,
                    milestones: phase.milestones.map((m) =>
                        m.id === milestoneId ? { ...m, completed: !completed } : m
                    ),
                }))
            );
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* ── Top Progress Bar ── */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xl">{trackMeta.emoji}</span>
                            <span className="font-semibold text-foreground text-sm truncate font-display">
                                {roadmap.trackName}
                            </span>
                        </div>
                        <div className="flex-1 flex items-center gap-3">
                            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-neon rounded-full progress-bar-animated"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <span className="text-sm font-semibold text-neon whitespace-nowrap">
                                {progressPercent}%
                            </span>
                        </div>
                        <span className="hidden sm:block text-xs text-muted-foreground whitespace-nowrap">
                            {completedMilestones}/{totalMilestones} milestones
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Main Layout ── */}
            <div className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">

                {/* ── LEFT SIDEBAR ── */}
                <aside className="hidden lg:flex flex-col gap-4 sticky top-20 h-fit">
                    {/* Track info */}
                    <div className={`p-4 rounded-xl border ${trackMeta.border} ${trackMeta.bg}`}>
                        <div className="text-2xl mb-2">{trackMeta.emoji}</div>
                        <p className="font-semibold text-foreground text-sm font-display">{roadmap.trackName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{phases.length} phases</p>
                    </div>

                    {/* Phase navigation */}
                    <div className="p-4 rounded-xl border border-border bg-surface space-y-1">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Phases
                        </p>
                        {phases.map((phase, idx) => {
                            const phaseCompleted = phase.milestones.length > 0 && phase.milestones.every((m) => m.completed);
                            const isCurrent = idx === currentPhaseIndex;
                            return (
                                <button
                                    key={phase.id}
                                    onClick={() => {
                                        document.getElementById(`phase-${phase.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all ${isCurrent
                                        ? "bg-neon/10 text-neon"
                                        : phaseCompleted
                                            ? "text-muted-foreground hover:text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-surface-raised"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${phaseCompleted ? "bg-neon" : isCurrent ? "bg-neon animate-dot-pulse" : "bg-border"
                                            }`}
                                    />
                                    <span className="truncate">{phase.name.replace(/Phase \d+ — /, "")}</span>
                                    {phaseCompleted && <CheckCircle2 className="w-3 h-3 text-neon ml-auto flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Overall progress */}
                    <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Progress
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Done", value: completedMilestones, icon: <CheckCircle2 className="w-3.5 h-3.5 text-neon" /> },
                                { label: "Left", value: totalMilestones - completedMilestones, icon: <Circle className="w-3.5 h-3.5 text-muted-foreground" /> },
                                { label: "Phases", value: `${phases.filter((p) => p.milestones.every((m) => m.completed) && p.milestones.length > 0).length}/${phases.length}`, icon: <Layers className="w-3.5 h-3.5 text-muted-foreground" /> },
                                { label: "Skills", value: phases.reduce((s, p) => s + p.skills.length, 0), icon: <BookOpen className="w-3.5 h-3.5 text-muted-foreground" /> },
                            ].map((stat) => (
                                <div key={stat.label} className="p-2.5 bg-surface-raised rounded-lg">
                                    <div className="flex items-center gap-1 mb-1">{stat.icon}</div>
                                    <p className="text-sm font-bold text-foreground font-display">{stat.value}</p>
                                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add track */}
                    <Link
                        href="/onboarding"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-neon/30 hover:bg-neon/5 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Another Track
                    </Link>
                </aside>

                {/* ── MAIN ROADMAP CANVAS ── */}
                <main className="min-w-0 space-y-3">
                    {/* Greeting + AI card */}
                    {userName && (
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-foreground font-display mb-1">
                                {userName}&apos;s Roadmap
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {progressPercent === 0
                                    ? "Let's get started. Complete your first milestone."
                                    : progressPercent === 100
                                        ? "🎉 Track complete! Pick your next challenge."
                                        : `Keep going — you're ${progressPercent}% through the ${roadmap.trackName} track.`}
                            </p>
                        </div>
                    )}

                    {/* AI Recommendation */}
                    {showAI && (
                        <AIRecommendationCard phases={phases} onDismiss={() => setShowAI(false)} />
                    )}

                    {/* Phase cards with connectors */}
                    {phases.map((phase, idx) => {
                        const isLocked = false; // TODO: tie to pro tier
                        const phaseCompleted = phase.milestones.length > 0 && phase.milestones.every((m) => m.completed);
                        const isCurrentPhase = idx === currentPhaseIndex;
                        const isDefaultOpen = isCurrentPhase || idx === 0;

                        return (
                            <div key={phase.id} id={`phase-${phase.id}`}>
                                <PhaseCard
                                    phase={phase}
                                    isLocked={isLocked}
                                    onMilestoneToggle={handleMilestoneToggle}
                                    defaultOpen={isDefaultOpen}
                                />
                                {/* Connector line between phases */}
                                {idx < phases.length - 1 && (
                                    <div className="flex justify-center my-1">
                                        <div
                                            className={`phase-connector h-6 ${phaseCompleted ? "completed" : ""}`}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Track complete CTA */}
                    {progressPercent === 100 && (
                        <div className="p-8 text-center rounded-xl border border-neon/30 bg-neon/5 animate-in slide-up">
                            <div className="text-4xl mb-3">🎉</div>
                            <h3 className="text-xl font-bold text-foreground font-display mb-2">Track Complete!</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                You've finished the {roadmap.trackName} track. Time to level up.
                            </p>
                            <Link
                                href="/onboarding"
                                className="inline-flex items-center gap-2 px-6 py-3 btn-neon text-sm"
                            >
                                Start Next Track <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
