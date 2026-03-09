import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Flame, Zap, Layers, BookOpen } from "lucide-react";
import { auth } from "@/lib/auth";

export const metadata = {
    title: "Dashboard",
    description: "Your engineering learning dashboard",
};

const TRACKS = [
    { slug: "backend", title: "Backend Engineering", emoji: "⚙️", href: "/learn/backend", accent: "border-l-blue-500" },
    { slug: "system-design", title: "System Design", emoji: "🏗️", href: "/learn/system-design", accent: "border-l-orange-500" },
    { slug: "devops", title: "DevOps & Cloud", emoji: "☁️", href: "/learn/devops", accent: "border-l-purple-500" },
    { slug: "genai", title: "Generative AI", emoji: "🤖", href: "/learn/genai", accent: "border-l-neon" },
    { slug: "foundations", title: "Full Stack Frontend", emoji: "🖥️", href: "/learn/foundations", accent: "border-l-yellow-500" },
];

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/login?callbackUrl=/dashboard");

    const firstName = session.user.name?.split(" ")[0] ?? "Engineer";

    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

                {/* ── Greeting ── */}
                <header>
                    <h1 className="text-3xl font-bold text-foreground font-display mb-1.5">
                        {getGreeting()}, {firstName} 👋
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Welcome back. Choose a track below to continue learning.
                    </p>
                </header>

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { icon: <Flame className="w-4 h-4 text-orange-400" />, value: "5", label: "Tracks" },
                        { icon: <Zap className="w-4 h-4 text-yellow-400" />, value: "128K+", label: "Community" },
                        { icon: <BookOpen className="w-4 h-4 text-neon" />, value: "26", label: "Phases" },
                        { icon: <Layers className="w-4 h-4 text-muted-foreground" />, value: "Free", label: "Access" },
                    ].map((stat) => (
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

                {/* ── Learning Tracks ── */}
                <div>
                    <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Learning Tracks
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {TRACKS.map((t) => (
                            <Link
                                key={t.slug}
                                href={t.href}
                                className={`p-5 rounded-xl border-l-4 border border-border bg-surface hover:bg-surface-raised transition-all group ${t.accent}`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-lg" aria-hidden="true">{t.emoji}</span>
                                    <span className="text-sm font-semibold text-foreground font-display truncate">
                                        {t.title}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">View Roadmap</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-neon transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
