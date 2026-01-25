import { prisma } from "./prisma";

/**
 * Calculate if two dates are consecutive days
 */
function isConsecutiveDay(date1: Date, date2: Date): boolean {
    const day1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const day2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diffTime = Math.abs(day2.getTime() - day1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
}

/**
 * Check if a date is today
 */
function isToday(date: Date): boolean {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

/**
 * Update user's streak when they complete a milestone
 * Streak increments only once per day regardless of number of milestones completed
 */
export async function updateUserStreak(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            currentStreak: true,
            longestStreak: true,
            lastActivityDate: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const now = new Date();
    let newStreak = 1;
    let newLongestStreak = user.longestStreak;

    if (user.lastActivityDate) {
        // If last activity was today, don't update streak (only count once per day)
        if (isToday(user.lastActivityDate)) {
            return user.currentStreak;
        }

        // If last activity was yesterday, increment streak
        if (isConsecutiveDay(user.lastActivityDate, now)) {
            newStreak = user.currentStreak + 1;
        }
        // Otherwise, streak is broken, reset to 1
    }

    // Update longest streak if current streak is higher
    if (newStreak > newLongestStreak) {
        newLongestStreak = newStreak;
    }

    // Update user's streak in database
    await prisma.user.update({
        where: { id: userId },
        data: {
            currentStreak: newStreak,
            longestStreak: newLongestStreak,
            lastActivityDate: now,
        },
    });

    return newStreak;
}

/**
 * Get user's current streak (with validation)
 */
export async function getUserStreak(userId: string): Promise<{
    currentStreak: number;
    longestStreak: number;
}> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            currentStreak: true,
            longestStreak: true,
            lastActivityDate: true,
        },
    });

    if (!user) {
        return { currentStreak: 0, longestStreak: 0 };
    }

    // Check if streak should be reset (if last activity was more than 1 day ago)
    if (user.lastActivityDate) {
        const now = new Date();
        const lastActivity = new Date(user.lastActivityDate);

        // If last activity was today or yesterday, streak is valid
        if (isToday(lastActivity) || isConsecutiveDay(lastActivity, now)) {
            return {
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak,
            };
        }

        // Streak is broken, reset it
        await prisma.user.update({
            where: { id: userId },
            data: {
                currentStreak: 0,
            },
        });

        return {
            currentStreak: 0,
            longestStreak: user.longestStreak,
        };
    }

    return {
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
    };
}
