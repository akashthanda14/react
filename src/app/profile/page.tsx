import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Flame, Layers, BookOpen, Trophy } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "My Profile — akashcodeofficial",
    description: "Your engineering learning profile",
};

const TRACKS = [
    { slug: "backend", title: "Backend Engineering", emoji: "⚙️", href: "/learn/backend", color: "#3B82F6" },
    { slug: "system-design", title: "System Design", emoji: "🏗️", href: "/learn/system-design", color: "#F97316" },
    { slug: "devops", title: "DevOps & Cloud", emoji: "☁️", href: "/learn/devops", color: "#A855F7" },
    { slug: "genai", title: "Generative AI", emoji: "🤖", href: "/learn/genai", color: "#00FF7F" },
    { slug: "foundations", title: "Full Stack Frontend", emoji: "🖥️", href: "/learn/foundations", color: "#EAB308" },
];

const BADGES = [
    { id: "explorer", emoji: "🎯", label: "Explorer", desc: "Visited a learning track" },
    { id: "community", emoji: "🏅", label: "Community", desc: "Joined the community" },
    { id: "streak_7", emoji: "🔥", label: "7-Day Streak", desc: "7 days in a row" },
    { id: "learner", emoji: "⚡", label: "Fast Learner", desc: "Completed a phase quickly" },
    { id: "builder", emoji: "🚀", label: "Builder", desc: "Built a project" },
];

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/login?callbackUrl=/profile");

    const initial = (session.user.name ?? "A")[0].toUpperCase();

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

                {/* Profile Header */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <div className="flex items-start gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-neon/20 border border-neon/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-neon font-display">{initial}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="font-display text-xl font-bold text-foreground">{session.user.name ?? "Engineer"}</h1>
                            <p className="text-sm text-muted-foreground">{session.user.email}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                                    Learning in progress
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { icon: <Layers className="w-4 h-4 text-neon" />, value: "5", label: "Tracks Available" },
                        { icon: <BookOpen className="w-4 h-4 text-muted-foreground" />, value: "26", label: "Total Phases" },
                        { icon: <Trophy className="w-4 h-4 text-yellow-400" />, value: "Free", label: "Plan" },
                    ].map((s) => (
                        <div key={s.label} className="p-4 rounded-xl border border-border bg-surface">
                            <div className="mb-2">{s.icon}</div>
                            <p className="text-xl font-bold text-foreground font-display">{s.value}</p>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Available Tracks */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <h2 className="font-display font-semibold text-foreground text-sm mb-5">Learning Tracks</h2>
                    <div className="space-y-3">
                        {TRACKS.map((t) => (
                            <Link
                                key={t.slug}
                                href={t.href}
                                className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:bg-surface-raised transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-base">{t.emoji}</span>
                                    <span className="text-sm font-medium text-foreground">{t.title}</span>
                                </div>
                                <span className="text-xs text-muted-foreground group-hover:text-neon transition-colors">
                                    View →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Badges */}
                <div className="p-6 rounded-xl border border-border bg-surface">
                    <h2 className="font-display font-semibold text-foreground text-sm mb-5 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" /> Badges
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {BADGES.map((badge) => (
                            <div
                                key={badge.id}
                                title={badge.desc}
                                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-surface-raised opacity-40 text-center transition-all"
                            >
                                <span className="text-2xl">{badge.emoji}</span>
                                <span className="text-[10px] font-semibold text-foreground leading-tight">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                        Badges coming soon — complete tracks to earn them!
                    </p>
                </div>

            </div>
        </div>
    );
}
