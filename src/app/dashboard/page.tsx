import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, Bot, Flame, Zap, Layers, Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserRoadmaps } from "@/lib/roadmap-service";

export const metadata = {
    title: "Dashboard — akashcodeofficial",
    description: "Your engineering learning dashboard",
};

const TRACK_META: Record<string, { emoji: string; accentClass: string }> = {
    backend: { emoji: "⚙️", accentClass: "border-l-blue-500" },
    devops: { emoji: "☁️", accentClass: "border-l-purple-500" },
    "system-design": { emoji: "🏗️", accentClass: "border-l-orange-500" },
    genai: { emoji: "✨", accentClass: "border-l-neon" },
};

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/login?callbackUrl=/dashboard");

    const roadmaps = await getUserRoadmaps(session.user.id);
    const firstName = session.user.name?.split(" ")[0] ?? "Engineer";

    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    const enriched = roadmaps.map((r) => {
        const total = r.phases.flatMap((p) => p.milestones).length;
        const done = r.phases.flatMap((p) => p.milestones).filter((m) => m.completed).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const currentPhase = r.phases.find((p) => p.milestones.some((m) => !m.completed));
        const nextMilestone = currentPhase?.milestones.find((m) => !m.completed);
        return { ...r, total, done, pct, currentPhase, nextMilestone };
    });

    const primary = enriched[0];
    const totalTopicsDone = enriched.reduce((s, r) => s + r.done, 0);
    const streak = 7; // TODO: pull from DB

    const statItems = [
        { icon: <Flame className="w-4 h-4 text-orange-400" aria-hidden="true" />, value: `${streak}`, label: "Day Streak" },
        { icon: <Zap className="w-4 h-4 text-yellow-400" aria-hidden="true" />, value: `${totalTopicsDone * 30}`, label: "XP Earned" },
        { icon: <CheckCircle2 className="w-4 h-4 text-neon" aria-hidden="true" />, value: `${totalTopicsDone}`, label: "Milestones" },
        { icon: <Layers className="w-4 h-4 text-muted-foreground" aria-hidden="true" />, value: enriched.length.toString(), label: "Tracks" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

                {/* ── Greeting ── */}
                <header>
                    <h1 className="text-3xl font-bold text-foreground font-display mb-1.5">
                        {getGreeting()}, {firstName} 👋
                    </h1>
                    {streak > 0 && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-orange-400 flex-shrink-0" aria-hidden="true" />
                            You&apos;re on a{" "}
                            <span className="text-foreground font-semibold">{streak}-day streak</span>{" "}
                            — keep it going
                        </p>
                    )}
                </header>

                {/* ── Continue Card ── */}
                {primary ? (
                    <div className="relative p-6 rounded-xl border border-border bg-surface overflow-hidden group hover:bg-surface-raised transition-colors">
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none"
                            aria-hidden="true"
                        />
                        <div className="relative">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                Continue where you left off
                            </p>
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <span className="text-xl" aria-hidden="true">
                                            {TRACK_META[primary.trackSlug]?.emoji ?? "📚"}
                                        </span>
                                        <h2 className="text-lg font-bold text-foreground font-display">
                                            {primary.trackName}
                                        </h2>
                                    </div>
                                    {primary.currentPhase && (
                                        <p className="text-sm text-muted-foreground">
                                            {primary.currentPhase.name.replace(/Phase \d+ — /, "")}
                                            {primary.nextMilestone && (
                                                <span className="text-foreground">
                                                    {" "}· {primary.nextMilestone.title}
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>
                                <Link
                                    href="/roadmap"
                                    className="flex items-center gap-2 px-4 py-2.5 btn-neon text-sm flex-shrink-0"
                                >
                                    Continue{" "}
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </div>

                            <div className="mt-5 space-y-1.5">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{primary.done} milestones done</span>
                                    <span className="text-neon font-semibold">{primary.pct}%</span>
                                </div>
                                <div
                                    className="h-2 bg-border rounded-full overflow-hidden"
                                    role="progressbar"
                                    aria-valuenow={primary.pct}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${primary.trackName} progress`}
                                >
                                    <div
                                        className="h-full bg-neon rounded-full progress-bar-animated"
                                        style={{ width: `${primary.pct}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 rounded-xl border border-dashed border-border bg-surface text-center">
                        <div className="w-12 h-12 bg-neon/10 border border-neon/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Layers className="w-6 h-6 text-neon" aria-hidden="true" />
                        </div>
                        <p className="text-foreground font-semibold mb-1">No active track yet</p>
                        <p className="text-muted-foreground text-sm mb-5">
                            Pick a track to get your structured, phase-by-phase roadmap.
                        </p>
                        <Link
                            href="/onboarding"
                            className="inline-flex items-center gap-2 px-5 py-2.5 btn-neon text-sm"
                        >
                            Choose a Track{" "}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>
                )}

                {/* ── AI Recommendation ── */}
                {primary?.nextMilestone && (
                    <div className="p-5 rounded-xl border border-ai/30 bg-ai/5 shadow-ai-sm">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-8 h-8 rounded-lg bg-ai/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                                aria-hidden="true"
                            >
                                <Bot className="w-4 h-4 text-ai" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-semibold text-ai uppercase tracking-wider mb-1">
                                    AI Recommendation
                                </p>
                                <p className="text-sm text-foreground font-medium mb-1 truncate">
                                    {primary.nextMilestone.title}
                                </p>
                                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                    You&apos;re {primary.pct}% done with {primary.trackName}. This is
                                    the next milestone in your current phase.
                                </p>
                                <Link
                                    href="/roadmap"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ai hover:gap-2.5 transition-all"
                                >
                                    Go to Milestone{" "}
                                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {statItems.map((stat) => (
                        <div
                            key={stat.label}
                            className="p-4 rounded-xl border border-border bg-surface hover:bg-surface-raised transition-colors"
                        >
                            <div className="flex items-center gap-1.5 mb-3">
                                {stat.icon}
                            </div>
                            <p className="text-2xl font-bold text-foreground font-display leading-none mb-1">
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Track Cards ── */}
                {enriched.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Your Tracks
                            </h2>
                            <Link
                                href="/onboarding"
                                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-neon transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                Add Track
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {enriched.map((r) => (
                                <Link
                                    key={r.id}
                                    href="/roadmap"
                                    className={`p-4 rounded-xl border-l-4 border border-border bg-surface hover:bg-surface-raised transition-all group ${TRACK_META[r.trackSlug]?.accentClass ?? ""}`}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="text-lg"
                                            aria-hidden="true"
                                        >
                                            {TRACK_META[r.trackSlug]?.emoji ?? "📚"}
                                        </span>
                                        <span className="text-sm font-semibold text-foreground font-display truncate">
                                            {r.trackName}
                                        </span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div
                                            className="h-1.5 bg-border rounded-full overflow-hidden"
                                            role="progressbar"
                                            aria-valuenow={r.pct}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${r.trackName} progress`}
                                        >
                                            <div
                                                className="h-full bg-neon rounded-full progress-bar-animated"
                                                style={{ width: `${r.pct}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {r.pct}% · {r.done}/{r.total} milestones
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
