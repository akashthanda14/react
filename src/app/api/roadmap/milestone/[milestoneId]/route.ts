import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * PATCH /api/roadmap/milestone/[milestoneId]
 *
 * Mark a specific milestone as complete or incomplete.
 * Looks up the UserMilestoneProgress record for the authenticated user.
 *
 * Body: { completed: boolean }
 */
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ milestoneId: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { milestoneId } = await context.params;
        const body = await request.json();
        const { completed } = body;

        if (typeof completed !== 'boolean') {
            return NextResponse.json(
                { error: 'Body must include completed: boolean' },
                { status: 400 }
            );
        }

        // Find the progress record for this user + milestone
        // A user may have multiple roadmaps; find the one that owns this milestone
        const progressRecord = await prisma.userMilestoneProgress.findFirst({
            where: {
                milestoneId,
                userRoadmap: {
                    userId: session.user.id,
                },
            },
        });

        if (!progressRecord) {
            return NextResponse.json(
                { error: 'Milestone progress record not found' },
                { status: 404 }
            );
        }

        // Update: completedAt drives the completed state (null = incomplete)
        const updated = await prisma.userMilestoneProgress.update({
            where: { id: progressRecord.id },
            data: {
                completedAt: completed ? new Date() : null,
            },
        });

        return NextResponse.json({
            success: true,
            milestoneId,
            completed,
            completedAt: updated.completedAt,
        });
    } catch (error) {
        console.error('[PATCH milestone]', error);
        return NextResponse.json(
            { error: 'Failed to update milestone' },
            { status: 500 }
        );
    }
}
