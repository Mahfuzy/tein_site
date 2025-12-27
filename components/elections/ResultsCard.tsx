"use client";

import { Trophy, Medal } from "lucide-react";
import { getPlaceholderImage } from "@/lib/electionUtils";

interface ResultItem {
    candidateId: string;
    name: string;
    votes: number;
    percentage: number;
    imageUrl?: string;
}

interface ResultsCardProps {
    position: string;
    results: ResultItem[];
}

export default function ResultsCard({ position, results }: ResultsCardProps) {
    const winner = results[0];
    const hasVotes = results.some((r) => r.votes > 0);

    return (
        <div className="border-2 border-neutral-200 dark:border-neutral-800 rounded p-6 space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">{position}</h3>

            {!hasVotes ? (
                <p className="text-neutral-500 dark:text-neutral-400 italic">No votes cast yet</p>
            ) : (
                <div className="space-y-3">
                    {results.map((result, index) => {
                        const isWinner = index === 0 && result.votes > 0;
                        const isRunnerUp = index === 1 && result.votes > 0;

                        return (
                            <div
                                key={result.candidateId}
                                className={`p-4 rounded border-2 transition-all ${isWinner
                                        ? "border-[var(--ndc-red-primary)] bg-[var(--ndc-red-primary)]/10 shadow-md"
                                        : "border-neutral-200 dark:border-neutral-800"
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <img
                                        src={result.imageUrl || getPlaceholderImage(result.name)}
                                        alt={result.name}
                                        className={`w-12 h-12 rounded-full object-cover ring-2 ${isWinner ? "ring-[var(--ndc-red-primary)]" : "ring-neutral-300 dark:ring-neutral-700"
                                            }`}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold ${isWinner ? "text-lg" : ""}`}>
                                                {result.name}
                                            </span>
                                            {isWinner && (
                                                <div className="flex items-center gap-1 bg-[var(--ndc-red-primary)] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                                    <Trophy className="w-3 h-3" />
                                                    WINNER
                                                </div>
                                            )}
                                            {isRunnerUp && (
                                                <div className="flex items-center gap-1 bg-neutral-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                                    <Medal className="w-3 h-3" />
                                                    2nd
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {result.votes} {result.votes === 1 ? "vote" : "votes"} ({result.percentage.toFixed(1)}%)
                                        </div>
                                    </div>
                                </div>

                                {/* Vote percentage bar */}
                                <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${isWinner ? "bg-[var(--ndc-red-primary)]" : "bg-neutral-400 dark:bg-neutral-600"
                                            }`}
                                        style={{ width: `${result.percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
