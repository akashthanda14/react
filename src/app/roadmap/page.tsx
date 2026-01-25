import Link from "next/link";
import { ArrowRight, Circle, CheckCircle2, Clock, BarChart, Layers as LayersIcon, Plus as PlusIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserRoadmaps, UserRoadmapData } from "@/lib/roadmap-service";

export default async function RoadmapPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/login?callbackUrl=/roadmap");
    }

    const roadmaps = await getUserRoadmaps(session.user.id);

    if (roadmaps.length === 0) {
        // Empty state: No roadmaps yet
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 bg-neon/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LayersIcon className="w-8 h-8 text-neon" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        No Active Roadmaps
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        You haven't started any learning tracks yet. Take our quick assessment to get a personalized roadmap.
                    </p>
                    <Link
                        href="/onboarding"
                        className="px-8 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all inline-flex items-center gap-2"
                    >
                        Create My Roadmap
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    // If multiple roadmaps, show dashboard. For now, let's render them stacked.
    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground mb-2">
                            My Learning Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Tracking {roadmaps.length} active learning path{roadmaps.length > 1 ? 's' : ''}
                        </p>
                    </div>
                    <Link
                        href="/onboarding"
                        className="px-4 py-2 border border-neon/30 text-neon hover:bg-neon/10 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Track
                    </Link>
                </div>

                <div className="space-y-16">
                    {roadmaps.map((roadmap) => (
                        <RoadmapView key={roadmap.id} roadmap={roadmap} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RoadmapView({ roadmap }: { roadmap: UserRoadmapData }) {
    // Calculate progress
    const totalMilestones = roadmap.phases.flatMap(p => p.milestones).length;
    const completedMilestones = roadmap.phases.flatMap(p => p.milestones).filter(m => m.completed).length;
    const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    return (
        <div className="relative">
            {/* Header Card */}
            <div className="p-8 bg-card border border-border rounded-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <LayersIcon className="w-32 h-32 text-foreground" />
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-xs font-semibold text-neon mb-4">
                        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        Active Track
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        {roadmap.trackName}
                    </h2>

                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                        <div className="flex items-center gap-2">
                            <BarChart className="w-4 h-4" />
                            <span>{roadmap.experienceLevel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{roadmap.timeCommitment}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Overall Progress</span>
                            <span className="text-neon">{progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-neon transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {completedMilestones} of {totalMilestones} milestones completed
                        </p>
                    </div>
                </div>
            </div>

            {/* Phases */}
            <div className="space-y-4">
                {roadmap.phases.map((phase) => (
                    <div
                        key={phase.id}
                        className={`p-6 bg-card border rounded-xl transition-all ${phase.order === roadmap.currentPhaseOrder
                                ? "border-neon/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                                : phase.order < roadmap.currentPhaseOrder
                                    ? "border-border/50 opacity-70" // Completed/Past
                                    : "border-border opacity-50 grayscale-[0.5]" // Future
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${phase.order === roadmap.currentPhaseOrder
                                        ? "bg-neon/10 border-neon/30 text-neon"
                                        : "bg-muted border-border text-muted-foreground"
                                    }`}>
                                    <span className="font-bold">{phase.order}</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {phase.name}
                                    </h3>
                                    {phase.order === roadmap.currentPhaseOrder && (
                                        <span className="px-2 py-0.5 bg-neon/10 text-neon text-[10px] font-bold uppercase tracking-wider rounded">
                                            Current
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {phase.description}
                                </p>

                                <div className="space-y-2">
                                    {phase.milestones.map((milestone) => (
                                        <div key={milestone.id} className="flex items-start gap-3 p-3 bg-background/50 rounded border border-border/50">
                                            {milestone.completed ? (
                                                <CheckCircle2 className="w-5 h-5 text-neon mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-muted-foreground/30 mt-0.5 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className={`text-sm font-medium ${milestone.completed ? "text-foreground line-through opacity-50" : "text-foreground"}`}>
                                                    {milestone.title}
                                                </p>
                                                {!milestone.completed && phase.order === roadmap.currentPhaseOrder && (
                                                    <div className="mt-2">
                                                        <Link
                                                            href={`/learn/${roadmap.trackSlug}/milestone/${milestone.id}`}
                                                            className="text-xs text-neon hover:underline"
                                                        >
                                                            Complete Milestone →
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
