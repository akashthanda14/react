import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserRoadmap, getUserRoadmaps } from '@/lib/roadmap-service';

/**
 * GET /api/roadmap
 * 
 * Fetch user's roadmap(s).
 * 
 * Query params:
 * - trackSlug (optional): Specific track slug to fetch
 * 
 * If trackSlug provided: Returns single roadmap
 * If no trackSlug: Returns all user's roadmaps
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
        const trackSlug = searchParams.get('trackSlug');

        if (trackSlug) {
            // Fetch specific roadmap
            const roadmap = await getUserRoadmap(session.user.id, trackSlug);
            return NextResponse.json(roadmap);
        } else {
            // Fetch all roadmaps
            const roadmaps = await getUserRoadmaps(session.user.id);
            return NextResponse.json(roadmaps);
        }
    } catch (error: any) {
        console.error('Error fetching roadmap:', error);

        if (error.message.includes('not found')) {
            return NextResponse.json(
                { error: error.message },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch roadmap' },
            { status: 500 }
        );
    }
}
