import Link from "next/link";
import { CheckCircle2, X, ArrowRight, Zap } from "lucide-react";

export const metadata = {
    title: "Pricing — akashcodeofficial",
    description: "Start free. Upgrade to Pro when you're ready for the full roadmap.",
};

const FREE_FEATURES = [
    { text: "All 4 tracks visible", included: true },
    { text: "Full phase structure & names", included: true },
    { text: "Phase 1 completely unlocked", included: true },
    { text: "Progress tracking (Phase 1)", included: true },
    { text: "Phases 2–6 unlocked", included: false },
    { text: "Full milestone details", included: false },
    { text: "AI next-step nudges", included: false },
    { text: "Completion certificates", included: false },
    { text: "Community Discord access", included: false },
];

const PRO_FEATURES = [
    { text: "Everything in Free", included: true },
    { text: "All 6 phases fully unlocked", included: true },
    { text: "All milestone details & skills", included: true },
    { text: "AI next-step recommendations", included: true },
    { text: "Completion certificates", included: true },
    { text: "Community Discord access", included: true },
    { text: "New tracks as released", included: true },
    { text: "Priority support", included: true },
];

const FAQ = [
    {
        q: "Can I cancel anytime?",
        a: "Yes. No lock-ins, no questions asked. You'll retain access until the end of your billing period.",
    },
    {
        q: "What's in Phase 1 for free?",
        a: "The entire first phase — all skills, all milestones, full detail. It's enough to evaluate whether the track fits your goals.",
    },
    {
        q: "Is there a student discount?",
        a: "Send a DM on Instagram @akashcodeofficial with your student ID and we'll sort you out.",
    },
    {
        q: "What if I want more than one track?",
        a: "Pro unlocks all 4 tracks simultaneously. Pick up a second track any time without paying more.",
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-16">

                {/* Header */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-semibold text-neon mb-6">
                        <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                        Simple pricing
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                        Start free.{" "}
                        <span className="text-neon">Upgrade when ready.</span>
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
                        No credit card required to start. Phase 1 of every track is free, forever.
                    </p>
                </header>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">

                    {/* Free */}
                    <div className="p-8 rounded-xl border border-border bg-surface flex flex-col">
                        <div className="mb-6">
                            <h2 className="font-display text-xl font-bold text-foreground mb-1">
                                Free
                            </h2>
                            <p className="text-sm text-muted-foreground">Start learning immediately</p>
                        </div>
                        <div className="mb-8">
                            <span className="font-display text-5xl font-bold text-foreground">
                                $0
                            </span>
                            <span className="text-muted-foreground text-sm ml-1">/month</span>
                        </div>
                        <div className="space-y-3 mb-8 flex-1">
                            {FREE_FEATURES.map((f) => (
                                <div key={f.text} className="flex items-start gap-3">
                                    {f.included ? (
                                        <CheckCircle2
                                            className="w-4 h-4 text-muted-foreground/60 mt-0.5 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <X
                                            className="w-4 h-4 text-disabled mt-0.5 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span
                                        className={`text-sm ${
                                            f.included ? "text-foreground" : "text-disabled"
                                        }`}
                                    >
                                        {f.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/onboarding"
                            className="block w-full text-center py-3 btn-ghost text-sm font-semibold rounded-lg"
                        >
                            Start for Free
                        </Link>
                    </div>

                    {/* Pro */}
                    <div className="relative p-8 rounded-xl border border-neon/30 bg-surface overflow-hidden shadow-neon-sm flex flex-col">
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent pointer-events-none"
                            aria-hidden="true"
                        />

                        <div className="relative flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    Pro
                                </h2>
                                <span className="px-2.5 py-1 bg-neon/15 text-neon text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    Most Popular
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">
                                Full access to everything
                            </p>
                            <div className="mb-8">
                                <span className="font-display text-5xl font-bold text-foreground">
                                    $9
                                </span>
                                <span className="text-muted-foreground text-sm ml-1">/month</span>
                            </div>
                            <div className="space-y-3 mb-8 flex-1">
                                {PRO_FEATURES.map((f) => (
                                    <div key={f.text} className="flex items-start gap-3">
                                        <CheckCircle2
                                            className="w-4 h-4 text-neon mt-0.5 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm text-foreground">{f.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <Link
                                    href="/onboarding"
                                    className="flex items-center justify-center gap-2 w-full py-3 btn-neon text-sm font-semibold rounded-lg animate-neon-pulse"
                                >
                                    Start Pro{" "}
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                                <p className="text-center text-xs text-muted-foreground mt-3">
                                    Cancel anytime · No lock-in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <section aria-label="Frequently asked questions">
                    <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
                        Common questions
                    </h2>
                    <div className="max-w-2xl mx-auto space-y-3">
                        {FAQ.map((item) => (
                            <div
                                key={item.q}
                                className="p-5 rounded-xl border border-border bg-surface hover:bg-surface-raised transition-colors"
                            >
                                <h3 className="font-semibold text-foreground text-sm mb-2">
                                    {item.q}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <div className="text-center mt-16 p-8 rounded-xl border border-border bg-surface">
                    <p className="font-display font-bold text-xl text-foreground mb-2">
                        Still on the fence?
                    </p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                        Start with the free Phase 1 of any track. If it&apos;s not the best structured
                        roadmap you&apos;ve seen, don&apos;t upgrade.
                    </p>
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 px-6 py-3 btn-neon text-sm font-semibold"
                    >
                        Start Free{" "}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
