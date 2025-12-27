"use client";

import { Check } from "lucide-react";

interface VotingProgressProps {
    positions: string[];
    currentIndex: number;
    completedPositions: Set<string>;
}

export default function VotingProgress({ positions, currentIndex, completedPositions }: VotingProgressProps) {
    const progress = ((currentIndex + 1) / positions.length) * 100;

    return (
        <div className="space-y-4">
            {/* Progress Bar */}
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">
                        Position {currentIndex + 1} of {positions.length}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-[var(--ndc-red-primary)] h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Position List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {positions.map((position, index) => {
                    const isCompleted = completedPositions.has(position);
                    const isCurrent = index === currentIndex;

                    return (
                        <div
                            key={position}
                            className={`px-2 py-1 rounded-sm flex items-center gap-1 ${isCurrent
                                    ? "bg-[var(--ndc-red-primary)] text-white font-bold"
                                    : isCompleted
                                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                                }`}
                        >
                            {isCompleted && <Check className="w-3 h-3 flex-shrink-0" />}
                            <span className="truncate">{position}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
