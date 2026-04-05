import Link from "next/link";

interface Phase {
    id: number;
    name: string;
    learn: string;
    outcome: string;
    milestones: string[];
}

interface TrackLayoutProps {
    title: string;
    emoji: string;
    color: string;
    phases: number;
    hours: number;
    description: string;
    phaseData: Phase[];
}

export default function TrackRoadmapLayout({
    title, emoji, color, phases, hours, description, phaseData,
}: TrackLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-[900px] mx-auto px-6 pt-28 pb-24">

                {/* Back */}
                <Link href="/learn" className="inline-flex items-center gap-2 text-[13px] text-foreground/30 hover:text-foreground transition-colors mb-10">
                    ← All Tracks
                </Link>

                {/* Header */}
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{emoji}</span>
                        <span className="font-mono text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-md border"
                            style={{ color, borderColor: `${color}33`, backgroundColor: `${color}10` }}>
                            {phases} phases · {hours}h
                        </span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                        {title} Roadmap
                    </h1>
                    <p className="text-[15px] text-foreground/40 leading-relaxed max-w-[600px]">
                        {description}
                    </p>
                </div>

                {/* Phases */}
                <div className="space-y-4">
                    {phaseData.map((phase) => (
                        <div key={phase.id}
                            className="p-6 sm:p-8 bg-surface border border-border rounded-xl hover:border-foreground/15 transition-all">
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-lg font-bold"
                                        style={{ backgroundColor: `${color}12`, color }}>
                                        {phase.id}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display font-bold text-lg text-foreground mb-4">
                                        {phase.name}
                                    </h3>

                                    <div className="space-y-3 mb-5">
                                        <div>
                                            <p className="text-[11px] font-medium text-foreground/25 uppercase tracking-wider mb-1">What you learn</p>
                                            <p className="text-[14px] text-foreground/50 leading-relaxed">{phase.learn}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-foreground/25 uppercase tracking-wider mb-1">Outcome</p>
                                            <p className="text-[14px] text-foreground/50 leading-relaxed">{phase.outcome}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <p className="text-[11px] font-medium text-foreground/25 uppercase tracking-wider mb-3">Milestones</p>
                                        <ul className="space-y-2">
                                            {phase.milestones.map((m, idx) => (
                                                <li key={idx} className="text-[13px] text-foreground/40 flex items-start gap-2.5">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                                                    <span>{m}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div className="mt-12 border border-border rounded-xl p-8 text-center">
                    <p className="text-[14px] text-foreground/30">
                        Each phase builds on the previous. Work through them in order for the best results.
                    </p>
                </div>
            </div>
        </div>
    );
}
