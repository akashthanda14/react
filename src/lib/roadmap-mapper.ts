/**
 * Roadmap Assignment Logic (Deterministic)
 * 
 * This module provides simple, deterministic logic to assign tracks and phases
 * to users based on their onboarding answers. No AI, no ML - just mapping tables.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export type ExperienceLevel =
    | "Just starting out"
    | "1-2 years of experience"
    | "3-5 years of experience"
    | "5+ years of experience";

export type TargetRole =
    | "Backend / Fullstack Engineer"
    | "DevOps Engineer"
    | "System Design Specialist"
    | "GenAI Engineer";

export type WeeklyHours =
    | "1-3 hours per week"
    | "4-6 hours per week"
    | "7-10 hours per week"
    | "10+ hours per week";

export interface OnboardingAnswers {
    experienceLevel: ExperienceLevel;
    targetRole: TargetRole;
    weeklyHours: WeeklyHours;
}

export interface RoadmapAssignment {
    trackSlug: string;
    trackName: string;
    startPhaseOrder: number;
    estimatedWeeks: number;
    paceDescription: string;
}

// ============================================
// MAPPING TABLE 1: Target Role → Track Slug
// ============================================

const ROLE_TO_TRACK_MAP: Record<TargetRole, { slug: string; name: string }> = {
    "Backend / Fullstack Engineer": {
        slug: "backend",
        name: "Backend / Fullstack Engineer",
    },
    "DevOps Engineer": {
        slug: "devops",
        name: "DevOps Engineer",
    },
    "System Design Specialist": {
        slug: "system-design",
        name: "System Design Specialist",
    },
    "GenAI Engineer": {
        slug: "genai",
        name: "GenAI Engineer",
    },
};

// ============================================
// MAPPING TABLE 2: Experience → Start Phase
// ============================================

/**
 * Determines which phase to start based on experience level.
 * 
 * Logic:
 * - Beginners start at Phase 1 (Fundamentals)
 * - 1-2 years can skip to Phase 2 (they know basics)
 * - 3-5 years start at Phase 3 (intermediate)
 * - 5+ years start at Phase 4 (advanced topics)
 * 
 * Note: Phase order is 1-indexed in the database
 */
const EXPERIENCE_TO_START_PHASE: Record<ExperienceLevel, number> = {
    "Just starting out": 1,
    "1-2 years of experience": 2,
    "3-5 years of experience": 3,
    "5+ years of experience": 4,
};

// ============================================
// MAPPING TABLE 3: Weekly Hours → Pace
// ============================================

/**
 * Estimates completion time based on weekly time commitment.
 * 
 * Assumptions:
 * - Each phase takes ~15 hours to complete (skills + milestones)
 * - 5 phases total = 75 hours per track
 * - Adjusted for starting phase
 * 
 * Formula: (remaining phases * 15 hours) / weekly hours = weeks
 */
interface PaceInfo {
    hoursPerWeek: number;
    description: string;
}

const WEEKLY_HOURS_TO_PACE: Record<WeeklyHours, PaceInfo> = {
    "1-3 hours per week": {
        hoursPerWeek: 2,
        description: "Relaxed pace - Learn at your own speed",
    },
    "4-6 hours per week": {
        hoursPerWeek: 5,
        description: "Steady pace - Consistent progress",
    },
    "7-10 hours per week": {
        hoursPerWeek: 8.5,
        description: "Intensive pace - Fast track learning",
    },
    "10+ hours per week": {
        hoursPerWeek: 12,
        description: "Accelerated pace - Rapid skill development",
    },
};

// ============================================
// CORE ASSIGNMENT FUNCTION
// ============================================

/**
 * Assigns a roadmap to a user based on their onboarding answers.
 * 
 * This is deterministic - same inputs always produce same output.
 * No AI, no randomness, just simple mapping logic.
 * 
 * @param answers - User's onboarding questionnaire answers
 * @returns Roadmap assignment with track, start phase, and pace
 */
export function assignRoadmap(answers: OnboardingAnswers): RoadmapAssignment {
    // Step 1: Map target role to track
    const track = ROLE_TO_TRACK_MAP[answers.targetRole];

    // Step 2: Determine starting phase based on experience
    const startPhaseOrder = EXPERIENCE_TO_START_PHASE[answers.experienceLevel];

    // Step 3: Calculate estimated completion time
    const paceInfo = WEEKLY_HOURS_TO_PACE[answers.weeklyHours];
    const totalPhases = 5;
    const remainingPhases = totalPhases - startPhaseOrder + 1;
    const hoursPerPhase = 15;
    const totalHours = remainingPhases * hoursPerPhase;
    const estimatedWeeks = Math.ceil(totalHours / paceInfo.hoursPerWeek);

    return {
        trackSlug: track.slug,
        trackName: track.name,
        startPhaseOrder,
        estimatedWeeks,
        paceDescription: paceInfo.description,
    };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get human-readable explanation of the assignment logic.
 */
export function getAssignmentExplanation(
    answers: OnboardingAnswers,
    assignment: RoadmapAssignment
): string {
    const phaseNames = ["Fundamentals", "Intermediate", "Advanced", "Expert", "Mastery"];
    const startPhaseName = phaseNames[assignment.startPhaseOrder - 1];

    return `Based on your ${answers.experienceLevel.toLowerCase()} and ${answers.weeklyHours.toLowerCase()} commitment, you'll start at ${startPhaseName} and complete the ${assignment.trackName} track in approximately ${assignment.estimatedWeeks} weeks.`;
}

/**
 * Validate onboarding answers before assignment.
 */
export function validateOnboardingAnswers(
    answers: Partial<OnboardingAnswers>
): answers is OnboardingAnswers {
    return !!(
        answers.experienceLevel &&
        answers.targetRole &&
        answers.weeklyHours
    );
}

// ============================================
// EXPORTS
// ============================================

export default {
    assignRoadmap,
    getAssignmentExplanation,
    validateOnboardingAnswers,
};
