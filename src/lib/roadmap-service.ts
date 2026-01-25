/**
 * Roadmap Service
 * 
 * Handles creation and management of user roadmaps.
 * This service layer sits between the UI and the database.
 */

import { PrismaClient } from '@prisma/client';
import { assignRoadmap, type OnboardingAnswers } from './roadmap-mapper';

const prisma = new PrismaClient();

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface CreateRoadmapInput {
    userId: string;
    onboardingAnswers: OnboardingAnswers;
}

export interface UserRoadmapData {
    id: string;
    userId: string;
    trackId: string;
    trackName: string;
    trackSlug: string;
    experienceLevel: string;
    timeCommitment: string;
    currentPhaseOrder: number;
    estimatedWeeks: number;
    paceDescription: string;
    startedAt: Date;
    phases: PhaseData[];
}

export interface PhaseData {
    id: string;
    name: string;
    description: string | null;
    outcome: string | null;
    order: number;
    skills: SkillData[];
    milestones: MilestoneData[];
}

export interface SkillData {
    id: string;
    name: string;
    description: string | null;
    order: number;
}

export interface MilestoneData {
    id: string;
    title: string;
    description: string | null;
    order: number;
    completed: boolean;
}

// ============================================
// CORE SERVICE FUNCTIONS
// ============================================

/**
 * Create a new user roadmap based on onboarding answers.
 * 
 * Flow:
 * 1. Use roadmap-mapper to determine track and start phase
 * 2. Fetch track from database
 * 3. Create UserRoadmap record
 * 4. Create UserMilestoneProgress records for all milestones
 * 5. Return complete roadmap data
 * 
 * @param input - User ID and onboarding answers
 * @returns Created user roadmap with all related data
 */
export async function createUserRoadmap(
    input: CreateRoadmapInput
): Promise<UserRoadmapData> {
    const { userId, onboardingAnswers } = input;

    // Step 1: Run deterministic mapping logic
    const assignment = assignRoadmap(onboardingAnswers);

    // Step 2: Fetch track from database
    const track = await prisma.track.findUnique({
        where: { slug: assignment.trackSlug },
        include: {
            phases: {
                orderBy: { order: 'asc' },
                include: {
                    skills: {
                        orderBy: { order: 'asc' },
                    },
                    milestones: {
                        orderBy: { order: 'asc' },
                    },
                },
            },
        },
    });

    if (!track) {
        throw new Error(`Track not found: ${assignment.trackSlug}`);
    }

    // Step 3: Check if user already has a roadmap for this track
    const existingRoadmap = await prisma.userRoadmap.findUnique({
        where: {
            userId_trackId: {
                userId,
                trackId: track.id,
            },
        },
    });

    if (existingRoadmap) {
        throw new Error(`User already has a roadmap for track: ${track.name}`);
    }

    // Step 4: Create UserRoadmap record
    const userRoadmap = await prisma.userRoadmap.create({
        data: {
            userId,
            trackId: track.id,
            experienceLevel: onboardingAnswers.experienceLevel,
            timeCommitment: onboardingAnswers.weeklyHours,
            currentPhaseOrder: assignment.startPhaseOrder,
        },
    });

    // Step 5: Create UserMilestoneProgress records for all milestones
    const allMilestones = track.phases.flatMap((phase) => phase.milestones);

    await prisma.userMilestoneProgress.createMany({
        data: allMilestones.map((milestone) => ({
            userRoadmapId: userRoadmap.id,
            milestoneId: milestone.id,
            completed: false,
        })),
    });

    // Step 6: Fetch and return complete roadmap data
    return getUserRoadmap(userId, track.slug);
}

/**
 * Get user's roadmap for a specific track.
 * 
 * @param userId - User ID
 * @param trackSlug - Track slug (e.g., 'backend', 'devops')
 * @returns Complete roadmap data with progress
 */
export async function getUserRoadmap(
    userId: string,
    trackSlug: string
): Promise<UserRoadmapData> {
    const track = await prisma.track.findUnique({
        where: { slug: trackSlug },
    });

    if (!track) {
        throw new Error(`Track not found: ${trackSlug}`);
    }

    const userRoadmap = await prisma.userRoadmap.findUnique({
        where: {
            userId_trackId: {
                userId,
                trackId: track.id,
            },
        },
        include: {
            track: {
                include: {
                    phases: {
                        orderBy: { order: 'asc' },
                        include: {
                            skills: {
                                orderBy: { order: 'asc' },
                            },
                            milestones: {
                                orderBy: { order: 'asc' },
                            },
                        },
                    },
                },
            },
            milestoneProgress: {
                include: {
                    milestone: true,
                },
            },
        },
    });

    if (!userRoadmap) {
        throw new Error(`User roadmap not found for track: ${trackSlug}`);
    }

    // Map milestone progress to milestones
    const milestoneProgressMap = new Map(
        userRoadmap.milestoneProgress.map((mp) => [mp.milestoneId, mp.completed])
    );

    // Transform data for response
    const phases: PhaseData[] = userRoadmap.track.phases.map((phase) => ({
        id: phase.id,
        name: phase.name,
        description: phase.description,
        outcome: phase.outcome,
        order: phase.order,
        skills: phase.skills.map((skill) => ({
            id: skill.id,
            name: skill.name,
            description: skill.description,
            order: skill.order,
        })),
        milestones: phase.milestones.map((milestone) => ({
            id: milestone.id,
            title: milestone.title,
            description: milestone.description,
            order: milestone.order,
            completed: milestoneProgressMap.get(milestone.id) || false,
        })),
    }));

    // Calculate estimated weeks (simplified - could be more sophisticated)
    const remainingPhases = phases.length - userRoadmap.currentPhaseOrder + 1;
    const hoursPerPhase = 15;
    const weeklyHours = getWeeklyHoursFromCommitment(userRoadmap.timeCommitment || '');
    const estimatedWeeks = Math.ceil((remainingPhases * hoursPerPhase) / weeklyHours);

    return {
        id: userRoadmap.id,
        userId: userRoadmap.userId,
        trackId: userRoadmap.trackId,
        trackName: userRoadmap.track.name,
        trackSlug: userRoadmap.track.slug,
        experienceLevel: userRoadmap.experienceLevel || '',
        timeCommitment: userRoadmap.timeCommitment || '',
        currentPhaseOrder: userRoadmap.currentPhaseOrder,
        estimatedWeeks,
        paceDescription: getPaceDescription(userRoadmap.timeCommitment || ''),
        startedAt: userRoadmap.startedAt,
        phases,
    };
}

/**
 * Get all roadmaps for a user.
 * 
 * @param userId - User ID
 * @returns Array of user roadmaps
 */
export async function getUserRoadmaps(userId: string): Promise<UserRoadmapData[]> {
    const userRoadmaps = await prisma.userRoadmap.findMany({
        where: { userId },
        include: {
            track: true,
        },
    });

    // Fetch full data for each roadmap
    const roadmaps = await Promise.all(
        userRoadmaps.map((ur) => getUserRoadmap(userId, ur.track.slug))
    );

    return roadmaps;
}

/**
 * Update milestone completion status.
 * 
 * @param userRoadmapId - User roadmap ID
 * @param milestoneId - Milestone ID
 * @param completed - Completion status
 */
export async function updateMilestoneProgress(
    userRoadmapId: string,
    milestoneId: string,
    completed: boolean
): Promise<void> {
    await prisma.userMilestoneProgress.update({
        where: {
            userRoadmapId_milestoneId: {
                userRoadmapId,
                milestoneId,
            },
        },
        data: {
            completed,
            completedAt: completed ? new Date() : null,
        },
    });
}

/**
 * Update user's current phase.
 * 
 * @param userRoadmapId - User roadmap ID
 * @param phaseOrder - New phase order
 */
export async function updateCurrentPhase(
    userRoadmapId: string,
    phaseOrder: number
): Promise<void> {
    await prisma.userRoadmap.update({
        where: { id: userRoadmapId },
        data: { currentPhaseOrder: phaseOrder },
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getWeeklyHoursFromCommitment(commitment: string): number {
    const hoursMap: Record<string, number> = {
        '1-3 hours per week': 2,
        '4-6 hours per week': 5,
        '7-10 hours per week': 8.5,
        '10+ hours per week': 12,
    };
    return hoursMap[commitment] || 5;
}

function getPaceDescription(commitment: string): string {
    const paceMap: Record<string, string> = {
        '1-3 hours per week': 'Relaxed pace - Learn at your own speed',
        '4-6 hours per week': 'Steady pace - Consistent progress',
        '7-10 hours per week': 'Intensive pace - Fast track learning',
        '10+ hours per week': 'Accelerated pace - Rapid skill development',
    };
    return paceMap[commitment] || 'Steady pace - Consistent progress';
}

// ============================================
// MILESTONE STATISTICS
// ============================================

/**
 * Get milestone completion statistics for a user's roadmap.
 * 
 * @param userRoadmapId - User roadmap ID
 * @returns Statistics about milestone completion
 */
export async function getMilestoneStats(userRoadmapId: string) {
    const progress = await prisma.userMilestoneProgress.findMany({
        where: { userRoadmapId },
    });

    const completed = progress.filter(p => p.completed).length;
    const total = progress.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
        completed,
        total,
        percentage,
        remaining: total - completed,
    };
}

/**
 * Get recently completed milestones for a user.
 * 
 * @param userId - User ID
 * @param limit - Number of recent milestones to fetch
 * @returns Recent milestone completions
 */
export async function getRecentCompletions(userId: string, limit: number = 10) {
    const roadmaps = await prisma.userRoadmap.findMany({
        where: { userId },
        select: { id: true },
    });

    const roadmapIds = roadmaps.map(r => r.id);

    const recentCompletions = await prisma.userMilestoneProgress.findMany({
        where: {
            userRoadmapId: { in: roadmapIds },
            completed: true,
        },
        include: {
            milestone: {
                include: {
                    phase: {
                        include: {
                            track: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            completedAt: 'desc',
        },
        take: limit,
    });

    return recentCompletions.map(rc => ({
        milestoneId: rc.milestoneId,
        milestoneTitle: rc.milestone.title,
        phaseName: rc.milestone.phase.name,
        trackName: rc.milestone.phase.track.name,
        completedAt: rc.completedAt,
    }));
}

// ============================================
// PROGRESS CALCULATION ENGINE
// ============================================

/**
 * Calculate progress for a specific phase.
 * 
 * Progress is computed on-read from milestone completion.
 * No stored percentages - always fresh and deterministic.
 * 
 * @param userRoadmapId - User roadmap ID
 * @param phaseId - Phase ID
 * @returns Phase progress statistics
 */
export async function getPhaseProgress(
    userRoadmapId: string,
    phaseId: string
) {
    // Get all milestones for this phase
    const phaseMilestones = await prisma.milestone.findMany({
        where: { phaseId },
        select: { id: true },
    });

    const milestoneIds = phaseMilestones.map(m => m.id);

    // Get user's progress on these milestones
    const progress = await prisma.userMilestoneProgress.findMany({
        where: {
            userRoadmapId,
            milestoneId: { in: milestoneIds },
        },
    });

    const totalMilestones = milestoneIds.length;
    const completedMilestones = progress.filter(p => p.completed).length;
    const percentage = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

    return {
        phaseId,
        totalMilestones,
        completedMilestones,
        percentage,
        remaining: totalMilestones - completedMilestones,
        isComplete: completedMilestones === totalMilestones && totalMilestones > 0,
    };
}

/**
 * Calculate progress for an entire track.
 * 
 * Aggregates milestone completion across all phases.
 * Deterministic - same data always produces same result.
 * 
 * @param userRoadmapId - User roadmap ID
 * @param trackId - Track ID
 * @returns Track progress statistics
 */
export async function getTrackProgress(
    userRoadmapId: string,
    trackId: string
) {
    // Get all phases for this track
    const phases = await prisma.phase.findMany({
        where: { trackId },
        include: {
            milestones: {
                select: { id: true },
            },
        },
    });

    // Collect all milestone IDs across all phases
    const allMilestoneIds = phases.flatMap(phase =>
        phase.milestones.map(m => m.id)
    );

    // Get user's progress on all milestones
    const progress = await prisma.userMilestoneProgress.findMany({
        where: {
            userRoadmapId,
            milestoneId: { in: allMilestoneIds },
        },
    });

    const totalMilestones = allMilestoneIds.length;
    const completedMilestones = progress.filter(p => p.completed).length;
    const percentage = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

    // Calculate per-phase progress
    const phaseProgress = await Promise.all(
        phases.map(phase => getPhaseProgress(userRoadmapId, phase.id))
    );

    const completedPhases = phaseProgress.filter(p => p.isComplete).length;

    return {
        trackId,
        totalMilestones,
        completedMilestones,
        percentage,
        remaining: totalMilestones - completedMilestones,
        totalPhases: phases.length,
        completedPhases,
        phaseProgress,
        isComplete: completedMilestones === totalMilestones && totalMilestones > 0,
    };
}

/**
 * Get overall progress summary for a user across all their roadmaps.
 * 
 * @param userId - User ID
 * @returns Overall progress statistics
 */
export async function getOverallProgress(userId: string) {
    const roadmaps = await prisma.userRoadmap.findMany({
        where: { userId },
        include: {
            track: true,
        },
    });

    const trackProgress = await Promise.all(
        roadmaps.map(roadmap =>
            getTrackProgress(roadmap.id, roadmap.trackId)
        )
    );

    const totalMilestones = trackProgress.reduce(
        (sum, tp) => sum + tp.totalMilestones,
        0
    );
    const completedMilestones = trackProgress.reduce(
        (sum, tp) => sum + tp.completedMilestones,
        0
    );
    const percentage = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

    return {
        totalRoadmaps: roadmaps.length,
        totalMilestones,
        completedMilestones,
        percentage,
        remaining: totalMilestones - completedMilestones,
        trackProgress: trackProgress.map((tp, idx) => ({
            trackName: roadmaps[idx].track.name,
            trackSlug: roadmaps[idx].track.slug,
            ...tp,
        })),
    };
}

// ============================================
// MILESTONE VALIDATION
// ============================================

export interface ValidationResponse {
    passed: boolean;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    feedback?: string;
}

/**
 * Get validation questions for a milestone.
 * Hides correct answer field from the client.
 */
export async function getMilestoneQuestions(milestoneId: string) {
    const questions = await prisma.milestoneQuestion.findMany({
        where: { milestoneId },
        orderBy: { order: 'asc' },
        include: {
            options: {
                orderBy: { order: 'asc' },
                select: {
                    id: true,
                    text: true,
                    order: true,
                    // Exclude isCorrect from client-side response
                },
            },
        },
    });
    return questions;
}

/**
 * Validate user answers for a milestone assessment.
 * 
 * @param userRoadmapId - The user's roadmap ID
 * @param milestoneId - The milestone being validated
 * @param answers - Map of questionId -> selectedOptionId
 */
export async function validateMilestoneAssessment(
    userRoadmapId: string,
    milestoneId: string,
    answers: Record<string, string>
): Promise<ValidationResponse> {
    // 1. Fetch questions with correct answers
    const questions = await prisma.milestoneQuestion.findMany({
        where: { milestoneId },
        include: {
            options: true,
        },
    });

    if (questions.length === 0) {
        // If no questions exist, auto-pass (or handle as error depending on logic)
        // For now, let's assume we can mark complete if there are no checks.
        await updateMilestoneProgress(userRoadmapId, milestoneId, true);
        return {
            passed: true,
            score: 100,
            totalQuestions: 0,
            correctAnswers: 0,
            feedback: "No validation questions required.",
        };
    }

    let correctCount = 0;

    // 2. Check answers
    for (const question of questions) {
        const selectedOptionId = answers[question.id];
        const correctOption = question.options.find(opt => opt.isCorrect);

        if (correctOption && selectedOptionId === correctOption.id) {
            correctCount++;
        }
    }

    // 3. Determine pass/fail (Require 100% for now, or configurable threshold)
    const passed = correctCount === questions.length;
    const score = Math.round((correctCount / questions.length) * 100);

    // 4. Update progress if passed
    if (passed) {
        await updateMilestoneProgress(userRoadmapId, milestoneId, true);
    }

    return {
        passed,
        score,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        feedback: passed
            ? "Great job! Milestone completed."
            : "Some answers were incorrect. Please review and try again.",
    };
}

// ============================================
// EXPORTS
// ============================================

export default {
    createUserRoadmap,
    getUserRoadmap,
    getUserRoadmaps,
    updateMilestoneProgress,
    updateCurrentPhase,
    getMilestoneStats,
    getRecentCompletions,
    getPhaseProgress,
    getTrackProgress,
    getOverallProgress,
    getMilestoneQuestions,
    validateMilestoneAssessment,
};
