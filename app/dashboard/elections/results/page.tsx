"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import ResultsCard from "@/components/elections/ResultsCard";
import { Eye, EyeOff, BarChart3, Users } from "lucide-react";

export default function ResultsPage() {
    const { elections, authUser, toggleResultsVisibility, getElectionResults } = useApp();
    const election = elections[0];

    // Only logged-in members can view results
    if (!authUser) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Election Results</h1>
                <Card>
                    <CardContent className="p-6 text-center text-neutral-600 dark:text-neutral-400">
                        <p>Please log in to view election results.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!election) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Election Results</h1>
                <Card>
                    <CardContent className="p-6 text-neutral-600 dark:text-neutral-400">
                        No active elections at this time.
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Check for old election data structure
    if (!election.positions || !election.candidates) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Election Results</h1>
                <Card>
                    <CardContent className="p-6 text-center text-amber-600 dark:text-amber-400">
                        <p>Please clear localStorage (F12 console: localStorage.removeItem('tein_demo_state_v2'); location.reload())</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const canToggleVisibility = authUser.role === "ITEC";
    const results = getElectionResults(election.id);
    const totalVoters = election.submittedVoters?.length || 0;

    const handleToggleVisibility = () => {
        toggleResultsVisibility(election.id);
        toast.success(
            election.resultsVisible
                ? "Results are now hidden from the public"
                : "Results are now visible to all members"
        );
    };

    // Calculate statistics
    const totalCandidates = election.candidates.length;
    const totalVotesCast = Object.values(results).reduce(
        (sum, positionResults) => sum + positionResults.reduce((pSum, r) => pSum + r.votes, 0),
        0
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-2">{election.title} - Results</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Live results dashboard
                    </p>
                </div>
                {canToggleVisibility && (
                    <Button
                        variant={election.resultsVisible ? "outline" : "default"}
                        onClick={handleToggleVisibility}
                    >
                        {election.resultsVisible ? (
                            <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Hide Results
                            </>
                        ) : (
                            <>
                                <Eye className="w-4 h-4 mr-2" />
                                Make Results Public
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[var(--ndc-red-primary)]/10 rounded-lg">
                                <Users className="w-6 h-6 text-[var(--ndc-red-primary)]" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{totalVoters}</div>
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Voters</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{totalVotesCast}</div>
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">Votes Cast</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/10 rounded-lg">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{totalCandidates}</div>
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">Candidates</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Visibility Status */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                        {election.resultsVisible ? (
                            <>
                                <Eye className="w-4 h-4 text-green-600" />
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                    Results are visible to all members
                                </span>
                            </>
                        ) : (
                            <>
                                <EyeOff className="w-4 h-4 text-amber-600" />
                                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                                    Results are hidden (admin view only)
                                </span>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Results by Position */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Results by Position</h2>

                {totalVoters === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center text-neutral-500 dark:text-neutral-400 italic">
                            No votes have been cast yet.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {election.positions.map((position) => (
                            <ResultsCard key={position} position={position} results={results[position] || []} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
