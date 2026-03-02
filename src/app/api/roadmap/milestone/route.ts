import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { updateMilestoneProgress } from '@/lib/roadmap-service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/roadmap/milestone
 * 
 * Mark a milestone as complete or incomplete.
 * 
 * Body:
 * {
 *   "userRoadmapId": "roadmap_123",
 *   "milestoneId": "milestone_456",
 *   "completed": true
 * }
 */
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { userRoadmapId, milestoneId, completed } = body;

        // Validate input
        if (!userRoadmapId || !milestoneId || typeof completed !== 'boolean') {
            return NextResponse.json(
                { error: 'Missing required fields: userRoadmapId, milestoneId, completed' },
                { status: 400 }
            );
        }

        // Verify the roadmap belongs to the user
        const roadmap = await prisma.userRoadmap.findUnique({
            where: { id: userRoadmapId },
        });

        if (!roadmap) {
            return NextResponse.json(
                { error: 'Roadmap not found' },
                { status: 404 }
            );
        }

        if (roadmap.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Forbidden - roadmap does not belong to user' },
                { status: 403 }
            );
        }

        // Update milestone progress
        await updateMilestoneProgress(userRoadmapId, milestoneId, completed);

        // Fetch updated progress
        const progress = await prisma.userMilestoneProgress.findUnique({
            where: {
                userRoadmapId_milestoneId: {
                    userRoadmapId,
                    milestoneId,
                },
            },
            include: {
                milestone: true,
            },
        });

        return NextResponse.json({
            success: true,
            progress,
        });
    } catch (error: any) {
        console.error('Error updating milestone:', error);
        return NextResponse.json(
            { error: 'Failed to update milestone progress' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/roadmap/milestone
 * 
 * Get completed milestones for a user's roadmap.
 * 
 * Query params:
 * - userRoadmapId: Roadmap ID
 */
export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const userRoadmapId = searchParams.get('userRoadmapId');

        if (!userRoadmapId) {
            return NextResponse.json(
                { error: 'Missing userRoadmapId parameter' },
                { status: 400 }
            );
        }

        // Verify the roadmap belongs to the user
        const roadmap = await prisma.userRoadmap.findUnique({
            where: { id: userRoadmapId },
        });

        if (!roadmap) {
            return NextResponse.json(
                { error: 'Roadmap not found' },
                { status: 404 }
            );
        }

        if (roadmap.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Forbidden - roadmap does not belong to user' },
                { status: 403 }
            );
        }

        // Fetch milestone progress
        const progress = await prisma.userMilestoneProgress.findMany({
            where: {
                userRoadmapId,
                completedAt: { not: null },
            },
            include: {
                milestone: {
                    include: {
                        phase: true,
                    },
                },
            },
            orderBy: {
                completedAt: 'desc',
            },
        });

        return NextResponse.json({
            completedMilestones: progress,
            totalCompleted: progress.length,
        });
    } catch (error: any) {
        console.error('Error fetching milestones:', error);
        return NextResponse.json(
            { error: 'Failed to fetch milestone progress' },
            { status: 500 }
        );
    }
}
