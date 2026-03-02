import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserRoadmaps } from "@/lib/roadmap-service";
import RoadmapViewClient from "./RoadmapViewClient";

export const metadata = {
    title: "My Roadmap — akashcodeofficial",
    description: "Your personalized engineering learning roadmap",
};

export default async function RoadmapPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/login?callbackUrl=/roadmap");
    }

    const roadmaps = await getUserRoadmaps(session.user.id);
    const firstName = session.user.name?.split(" ")[0] ?? "Engineer";

    // Empty state
    if (roadmaps.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-neon/10 border border-neon/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Layers className="w-8 h-8 text-neon" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-3 font-display">
                        No Roadmap Yet
                    </h1>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                        Pick a track and get a structured, phase-by-phase learning path built for engineers serious about leveling up.
                    </p>
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 px-6 py-3 btn-neon text-sm font-semibold"
                    >
                        Choose Your Track
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    // Show the first roadmap as the primary view
    // (future: tab switcher for multiple tracks)
    const primaryRoadmap = roadmaps[0];

    return (
        <RoadmapViewClient
            roadmap={primaryRoadmap}
            userName={firstName}
        />
    );
}
