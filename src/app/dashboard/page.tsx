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

    const getHour = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    // Stats per roadmap
    const enriched = roadmaps.map((r) => {
        const total = r.phases.flatMap((p) => p.milestones).length;
        const done = r.phases.flatMap((p) => p.milestones).filter((m) => m.completed).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        // Current phase = first with incomplete milestones
        const currentPhase = r.phases.find((p) => p.milestones.some((m) => !m.completed));
        const nextMilestone = currentPhase?.milestones.find((m) => !m.completed);
        return { ...r, total, done, pct, currentPhase, nextMilestone };
    });

    const primary = enriched[0];
    const totalTopicsDone = enriched.reduce((s, r) => s + r.done, 0);
    const streak = 7; // TODO: real streak from DB

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

                {/* ── Greeting ── */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground font-display mb-1">
                        {getHour()}, {firstName} 👋
                    </h1>
                    {streak > 0 && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-orange-400" />
                            You&apos;re on a <span className="text-foreground font-semibold">{streak}-day streak</span> — keep it going
                        </p>
                    )}
                </div>

                {/* ── Continue Card ── */}
                {primary ? (
                    <div className="relative p-6 rounded-xl border border-border bg-surface overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon/3 to-transparent pointer-events-none" />
                        <div className="relative">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                Continue where you left off
                            </p>
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xl">{TRACK_META[primary.trackSlug]?.emoji ?? "📚"}</span>
                                        <h2 className="text-lg font-bold text-foreground font-display">
                                            {primary.trackName}
                                        </h2>
                                    </div>
                                    {primary.currentPhase && (
                                        <p className="text-sm text-muted-foreground">
                                            {primary.currentPhase.name.replace(/Phase \d+ — /, "")}
                                            {primary.nextMilestone && (
                                                <span className="text-foreground"> · {primary.nextMilestone.title}</span>
                                            )}
                                        </p>
                                    )}
                                </div>
                                <Link
                                    href="/roadmap"
                                    className="flex items-center gap-2 px-4 py-2 btn-neon text-sm"
                                >
                                    Continue <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="mt-5 space-y-1.5">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{primary.done} milestones done</span>
                                    <span className="text-neon font-semibold">{primary.pct}%</span>
                                </div>
                                <div className="h-2.5 bg-border rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-neon rounded-full progress-bar-animated"
                                        style={{ width: `${primary.pct}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 rounded-xl border border-dashed border-border bg-surface text-center">
                        <p className="text-muted-foreground text-sm mb-4">No active track yet</p>
                        <Link href="/onboarding" className="inline-flex items-center gap-2 px-4 py-2 btn-neon text-sm">
                            Choose a Track <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* ── AI Recommendation ── */}
                {primary?.nextMilestone && (
                    <div className="p-5 rounded-xl border border-ai/30 bg-ai/5 shadow-ai-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-ai/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Bot className="w-4 h-4 text-ai" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[11px] font-semibold text-ai uppercase tracking-wider mb-1">
                                    AI Recommendation
                                </p>
                                <p className="text-sm text-foreground font-medium mb-0.5">
                                    {primary.nextMilestone.title}
                                </p>
                                <p className="text-xs text-muted-foreground mb-3">
                                    You&apos;re {primary.pct}% done with {primary.trackName}. This is the next milestone in your current phase.
                                </p>
                                <Link
                                    href="/roadmap"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ai hover:gap-2.5 transition-all"
                                >
                                    Go to Milestone <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { icon: <Flame className="w-4 h-4 text-orange-400" />, value: `${streak}`, label: "Day Streak" },
                        { icon: <Zap className="w-4 h-4 text-yellow-400" />, value: `${totalTopicsDone * 30}`, label: "XP Earned" },
                        { icon: <CheckCircle2 className="w-4 h-4 text-neon" />, value: `${totalTopicsDone}`, label: "Milestones" },
                        { icon: <Layers className="w-4 h-4 text-muted-foreground" />, value: enriched.length.toString(), label: "Tracks" },
                    ].map((stat) => (
                        <div key={stat.label} className="p-4 rounded-xl border border-border bg-surface">
                            <div className="flex items-center gap-1.5 mb-2">{stat.icon}</div>
                            <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Track Cards ── */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Your Tracks
                        </h2>
                        <Link
                            href="/onboarding"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-neon transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Track
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
                                    <span className="text-lg">{TRACK_META[r.trackSlug]?.emoji ?? "📚"}</span>
                                    <span className="text-sm font-semibold text-foreground font-display truncate">
                                        {r.trackName}
                                    </span>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-neon rounded-full progress-bar-animated"
                                            style={{ width: `${r.pct}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">{r.pct}% · {r.done}/{r.total} milestones</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
