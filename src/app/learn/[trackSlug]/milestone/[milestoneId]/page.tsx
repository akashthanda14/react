
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface PageProps {
    params: {
        trackSlug: string;
        milestoneId: string;
    };
}

export default async function MilestonePage({ params }: PageProps) {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login");
    }

    const { trackSlug, milestoneId } = params;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/roadmap"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Roadmap
                    </Link>
                </div>

                <div className="bg-card border border-border rounded-xl p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon/10 text-neon rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        Milestone
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        Milestone: {milestoneId}
                    </h1>

                    <p className="text-muted-foreground mb-8">
                        This is a placeholder for the milestone learning and validation page.
                        Track: <span className="text-foreground font-medium">{trackSlug}</span>
                    </p>

                    <div className="p-6 bg-muted/50 rounded-lg border border-border/50">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-neon" />
                            Validation Task
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Coming soon: Interactive quizzes and verification tasks to prove your mastery of this skill.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
