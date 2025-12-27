// Election utility functions

/**
 * Check if current time is within voting hours
 */
export function isVotingOpen(startHour: number, endHour: number): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= startHour && currentHour < endHour;
}

/**
 * Generate placeholder image URL with initials
 */
export function getPlaceholderImage(name: string): string {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    // Using UI Avatars API for placeholder images
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=DC143C&color=fff&size=200&bold=true`;
}

/**
 * Format time remaining until voting closes
 */
export function getTimeRemaining(endHour: number): string {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= endHour) {
        return "Voting closed";
    }

    const hoursLeft = endHour - currentHour;
    const minutesLeft = 60 - now.getMinutes();

    if (hoursLeft === 0) {
        return `${minutesLeft} minutes remaining`;
    }

    return `${hoursLeft} hours ${minutesLeft} minutes remaining`;
}
