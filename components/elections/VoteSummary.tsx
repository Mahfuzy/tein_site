"use client";

import { Candidate } from "@/context/AppContext";
import { Edit2 } from "lucide-react";
import Button from "@/components/ui/button";
import { getPlaceholderImage } from "@/lib/electionUtils";

interface VoteSummaryProps {
    positions: string[];
    votes: Record<string, string>;
    candidates: Candidate[];
    onEdit: (positionIndex: number) => void;
}

export default function VoteSummary({ positions, votes, candidates, onEdit }: VoteSummaryProps) {
    const getCandidateById = (id: string) => candidates.find((c) => c.id === id);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Review Your Votes</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Please review your selections before submitting. Click "Edit" to change any vote.
            </p>

            <div className="space-y-3">
                {positions.map((position, index) => {
                    const candidateId = votes[position];
                    const candidate = candidateId ? getCandidateById(candidateId) : null;

                    return (
                        <div
                            key={position}
                            className="flex items-center justify-between p-4 border-2 border-neutral-200 dark:border-neutral-800 rounded"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div className="text-sm font-bold text-neutral-500 dark:text-neutral-400 w-20">
                                    {position}
                                </div>
                                {candidate ? (
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={candidate.imageUrl || getPlaceholderImage(candidate.name)}
                                            alt={candidate.name}
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--ndc-red-primary)]"
                                        />
                                        <span className="font-semibold">{candidate.name}</span>
                                    </div>
                                ) : (
                                    <span className="text-neutral-400 italic">No selection</span>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit(index)}
                            >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
