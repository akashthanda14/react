import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
    getPhaseProgress,
    getTrackProgress,
    getOverallProgress
} from '@/lib/roadmap-service';

/**
 * GET /api/roadmap/progress
 * 
 * Calculate progress for phases, tracks, or overall.
 * 
 * Query params:
 * - type: "phase" | "track" | "overall"
 * - userRoadmapId: Required for phase/track
 * - phaseId: Required for phase
 * - trackId: Required for track
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
        const type = searchParams.get('type');
        const userRoadmapId = searchParams.get('userRoadmapId');
        const phaseId = searchParams.get('phaseId');
        const trackId = searchParams.get('trackId');

        if (!type) {
            return NextResponse.json(
                { error: 'Missing type parameter (phase|track|overall)' },
                { status: 400 }
            );
        }

        switch (type) {
            case 'phase': {
                if (!userRoadmapId || !phaseId) {
                    return NextResponse.json(
                        { error: 'Missing userRoadmapId or phaseId' },
                        { status: 400 }
                    );
                }

                const progress = await getPhaseProgress(userRoadmapId, phaseId);
                return NextResponse.json(progress);
            }

            case 'track': {
                if (!userRoadmapId || !trackId) {
                    return NextResponse.json(
                        { error: 'Missing userRoadmapId or trackId' },
                        { status: 400 }
                    );
                }

                const progress = await getTrackProgress(userRoadmapId, trackId);
                return NextResponse.json(progress);
            }

            case 'overall': {
                const progress = await getOverallProgress(session.user.id);
                return NextResponse.json(progress);
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid type. Must be: phase, track, or overall' },
                    { status: 400 }
                );
        }
    } catch (error: any) {
        console.error('Error calculating progress:', error);
        return NextResponse.json(
            { error: 'Failed to calculate progress' },
            { status: 500 }
        );
    }
}
