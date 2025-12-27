"use client";

import { Candidate } from "@/context/AppContext";
import { getPlaceholderImage } from "@/lib/electionUtils";
import { Check } from "lucide-react";

interface CandidateCardProps {
    candidate: Candidate;
    isSelected: boolean;
    onSelect: () => void;
}

export default function CandidateCard({ candidate, isSelected, onSelect }: CandidateCardProps) {
    const imageUrl = candidate.imageUrl || getPlaceholderImage(candidate.name);

    return (
        <button
            type="button"
            onClick={onSelect}
            className={`relative w-full p-4 rounded border-2 transition-all text-left ${isSelected
                    ? "border-[var(--ndc-red-primary)] bg-[var(--ndc-red-primary)]/5 shadow-lg"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-[var(--ndc-red-primary)]/50"
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Candidate Image */}
                <div className="flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt={candidate.name}
                        className={`w-16 h-16 rounded-full object-cover ring-2 ${isSelected ? "ring-[var(--ndc-red-primary)]" : "ring-neutral-300 dark:ring-neutral-700"
                            }`}
                    />
                </div>

                {/* Candidate Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1">{candidate.name}</h3>
                    {candidate.manifesto && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                            {candidate.manifesto}
                        </p>
                    )}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-[var(--ndc-red-primary)] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    </div>
                )}
            </div>
        </button>
    );
}
