
import { auth } from "@/lib/auth";
import { createUserRoadmap } from "@/lib/roadmap-service";
import { NextResponse } from "next/server";
import { z } from "zod";

const onboardingSchema = z.object({
    experienceLevel: z.enum([
        "Just starting out",
        "1-2 years of experience",
        "3-5 years of experience",
        "5+ years of experience",
    ]),
    targetRole: z.enum([
        "Backend / Fullstack Engineer",
        "DevOps Engineer",
        "System Design Specialist",
        "GenAI Engineer",
    ]),
    weeklyHours: z.enum([
        "1-3 hours per week",
        "4-6 hours per week",
        "7-10 hours per week",
        "10+ hours per week",
    ]),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const result = onboardingSchema.safeParse(body);

        if (!result.success) {
            return new NextResponse("Invalid request body", { status: 400 });
        }

        const { experienceLevel, targetRole, weeklyHours } = result.data;

        try {
            const roadmap = await createUserRoadmap({
                userId: session.user.id,
                onboardingAnswers: {
                    experienceLevel,
                    targetRole,
                    weeklyHours,
                },
            });

            return NextResponse.json(roadmap);
        } catch (error: any) {
            if (error.message.includes("User already has a roadmap")) {
                // If roadmap exists, just return success/redirect
                return NextResponse.json({ message: "Roadmap already exists" }, { status: 200 });
            }
            throw error;
        }

    } catch (error) {
        console.error("[ROADMAP_CREATE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
