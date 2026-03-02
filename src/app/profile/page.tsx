import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserRoadmaps } from "@/lib/roadmap-service";
import { CheckCircle2, Flame, Zap, Layers, BookOpen, Trophy } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "My Profile — akashcodeofficial",
    description: "Your engineering learning profile and progress",
};

const TRACK_META: Record<string, { emoji: string; color: string; accentClass: string }> = {
    backend: { emoji: "⚙️", color: "#3B82F6", accentClass: "bg-blue-500" },
    devops: { emoji: "☁️", color: "#A855F7", accentClass: "bg-purple-500" },
    "system-design": { emoji: "🏗️", color: "#F97316", accentClass: "bg-orange-500" },
    genai: { emoji: "✨", color: "#00FF7F", accentClass: "bg-neon" },
};

const LEVELS = [
    { label: "Intern", min: 0, max: 100 },
    { label: "Junior", min: 100, max: 300 },
    { label: "Mid", min: 300, max: 600 },
    { label: "Senior", min: 600, max: 1000 },
    { label: "Staff", min: 1000, max: 99999 },
];

const BADGES = [
    { id: "first_milestone", emoji: "🎯", label: "First Step", desc: "Completed your first milestone", threshold: 1 },
    { id: "phase_complete", emoji: "🏅", label: "Phase 1 Done", desc: "Finished your first full phase", threshold: 3 },
    { id: "streak_7", emoji: "🔥", label: "7-Day Streak", desc: "7 days in a row", threshold: 7 },
    { id: "halfway", emoji: "⚡", label: "Halfway", desc: "50% through a track", threshold: 50 },
    { id: "track_done", emoji: "🚀", label: "Track Complete", desc: "Finished an entire track", threshold: 100 },
];

// Tiny activity heatmap — last 7 weeks (42 days)
function ActivityGrid({ completedCount }: { completedCount: number }) {
    // Simulate activity (in production: read from completion timestamps)
    const today = new Date();
    const days = Array.from({ length: 42 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (41 - i));
        const seed = d.getDate() + d.getMonth() * 31;
        // Pseudo-random activity based on completedCount
        const active = completedCount > 0 && (seed % 3 !== 0);
        const level = active ? (seed % 4) : 0; // 0=none, 1=light, 2=medium, 3=dark
        return { date: d, level };
    });

    const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

    return (
        <div>
            <div className="flex gap-1 mb-2">
                {DAY_LABELS.map((label, i) => (
                    <div key={i} className="w-4 text-[10px] text-muted-foreground text-center">{label}</div>
                ))}
            </div>
            <div className="flex flex-wrap gap-1">
                {days.map((day, i) => (
                    <div
                        key={i}
                        title={day.date.toLocaleDateString()}
                        className={`w-4 h-4 rounded-sm flex-shrink-0 ${day.level === 0 ? "bg-surface-raised" :
                            day.level === 1 ? "bg-neon/20" :
                                day.level === 2 ? "bg-neon/50" :
                                    "bg-neon"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/login?callbackUrl=/profile");

    const roadmaps = await getUserRoadmaps(session.user.id);
    const initial = (session.user.name ?? "A")[0].toUpperCase();
    const memberSince = "Feb 2026"; // TODO: from user.createdAt

    const enriched = roadmaps.map((r) => {
        const total = r.phases.flatMap((p) => p.milestones).length;
        const done = r.phases.flatMap((p) => p.milestones).filter((m) => m.completed).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        return { ...r, total, done, pct };
    });

    const totalDone = enriched.reduce((s, r) => s + r.done, 0);
    const totalSkills = enriched.reduce((s, r) => s + r.phases.reduce((ps, p) => ps + p.skills.length, 0), 0);
    const xp = totalDone * 30;
    const streak = 7; // TODO: real DB value

    // Determine current level
    const currentLevel = LEVELS.find((l) => xp >= l.min && xp < l.max) ?? LEVELS[0];
    const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1];
    const levelPct = nextLevel ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100) : 100;

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

                {/* Profile Header */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <div className="flex items-start gap-5">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-2xl bg-neon/20 border border-neon/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-neon font-display">{initial}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="font-display text-xl font-bold text-foreground">{session.user.name ?? "Engineer"}</h1>
                            <p className="text-sm text-muted-foreground">{session.user.email}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span>Member since {memberSince}</span>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                                    {streak} day streak
                                </span>
                            </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-semibold text-neon">
                            {currentLevel.label}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { icon: <CheckCircle2 className="w-4 h-4 text-neon" />, value: totalDone, label: "Milestones" },
                        { icon: <Zap className="w-4 h-4 text-yellow-400" />, value: `${xp} XP`, label: "Total XP" },
                        { icon: <BookOpen className="w-4 h-4 text-muted-foreground" />, value: totalSkills, label: "Skills" },
                        { icon: <Layers className="w-4 h-4 text-muted-foreground" />, value: enriched.length, label: "Tracks" },
                    ].map((s) => (
                        <div key={s.label} className="p-4 rounded-xl border border-border bg-surface">
                            <div className="mb-2">{s.icon}</div>
                            <p className="text-xl font-bold text-foreground font-display">{s.value}</p>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Level Progress */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display font-semibold text-foreground text-sm">Level Progress</h2>
                        <span className="text-xs text-muted-foreground">{xp} / {nextLevel?.min ?? "MAX"} XP</span>
                    </div>
                    {/* Level track */}
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                        {LEVELS.map((level, i) => {
                            const isActive = level.label === currentLevel.label;
                            const isPast = LEVELS.indexOf(currentLevel) > i;
                            return (
                                <div key={level.label} className="flex items-center gap-2 flex-shrink-0">
                                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${isActive ? "bg-neon text-background" : isPast ? "bg-neon/20 text-neon" : "bg-surface-raised text-disabled"
                                        }`}>
                                        {level.label}
                                    </div>
                                    {i < LEVELS.length - 1 && (
                                        <div className={`h-px w-8 flex-shrink-0 ${isPast ? "bg-neon/40" : "bg-border"}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                            className="h-full bg-neon rounded-full progress-bar-animated"
                            style={{ width: `${levelPct}%` }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {nextLevel ? `${nextLevel.min - xp} XP to ${nextLevel.label}` : "Max level reached 🎉"}
                    </p>
                </div>

                {/* Track Completion */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <h2 className="font-display font-semibold text-foreground text-sm mb-5">Track Progress</h2>
                    {enriched.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-sm text-muted-foreground mb-3">No tracks started yet</p>
                            <Link href="/onboarding" className="text-xs text-neon hover:underline">Choose a track →</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {enriched.map((r) => (
                                <div key={r.id}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{TRACK_META[r.trackSlug]?.emoji ?? "📚"}</span>
                                            <span className="text-sm font-medium text-foreground">{r.trackName}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-neon">{r.pct}%</span>
                                    </div>
                                    <div className="h-2 bg-border rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full progress-bar-animated"
                                            style={{ width: `${r.pct}%`, backgroundColor: TRACK_META[r.trackSlug]?.color ?? "#00FF7F" }}
                                        />
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-1">{r.done}/{r.total} milestones</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Badges */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <h2 className="font-display font-semibold text-foreground text-sm mb-5 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" /> Badges
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {BADGES.map((badge) => {
                            const earned = totalDone >= badge.threshold;
                            return (
                                <div
                                    key={badge.id}
                                    title={badge.desc}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${earned ? "border-neon/20 bg-neon/5" : "border-border bg-surface-raised opacity-40"
                                        }`}
                                >
                                    <span className="text-2xl">{badge.emoji}</span>
                                    <span className="text-[10px] font-semibold text-foreground leading-tight">{badge.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Activity Grid */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <h2 className="font-display font-semibold text-foreground text-sm mb-5">Activity (Last 6 Weeks)</h2>
                    <ActivityGrid completedCount={totalDone} />
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] text-muted-foreground">Less</span>
                        {["bg-surface-raised", "bg-neon/20", "bg-neon/50", "bg-neon"].map((c) => (
                            <div key={c} className={`w-3.5 h-3.5 rounded-sm ${c}`} />
                        ))}
                        <span className="text-[10px] text-muted-foreground">More</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
