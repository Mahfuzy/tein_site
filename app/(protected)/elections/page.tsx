"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ElectionsPage() {
  const { elections, users, authUser, castVotes, hasUserVoted, getElectionResults } = useApp();
  const router = useRouter();
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});

  if (!authUser) {
    router.push("/login");
    return null;
  }

  const active = elections.find((e) => e.isOpen);
  if (!active) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No active elections at the moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const alreadyVoted = hasUserVoted(active.id, authUser.id);
  const isExec = ["President", "Vice President", "Secretary", "ITEC"].includes(authUser.role);
  const results = getElectionResults(active.id);

  const handleSelectCandidate = (position: string, candidateId: string) => {
    if (alreadyVoted) return;
    setSelectedVotes((prev) => ({ ...prev, [position]: candidateId }));
  };

  const handleSubmitVotes = () => {
    if (alreadyVoted || Object.keys(selectedVotes).length === 0) return;
    castVotes(active.id, authUser.id, selectedVotes);
    setSelectedVotes({});
  };

  const allPositionsVoted = active.positions.every((pos) => selectedVotes[pos]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{active.title}</h2>
        {alreadyVoted && (
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
            ✓ You have voted
          </span>
        )}
      </div>

      {/* Voting Section */}
      {!alreadyVoted && (
        <div className="grid gap-4">
          {active.positions.map((position) => {
            const positionCandidates = active.candidates.filter((c) => c.position === position);

            return (
              <Card key={position}>
                <CardHeader>
                  <CardTitle className="text-lg">{position}</CardTitle>
                </CardHeader>
                <CardContent>
                  {positionCandidates.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No candidates for this position yet.</p>
                  ) : (
                    <div className="grid gap-2">
                      {positionCandidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${selectedVotes[position] === candidate.id
                              ? "border-primary bg-primary/10"
                              : "hover:bg-muted"
                            }`}
                          onClick={() => handleSelectCandidate(position, candidate.id)}
                        >
                          <div className="flex items-center gap-3">
                            {candidate.imageUrl && (
                              <img
                                src={candidate.imageUrl}
                                alt={candidate.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              {candidate.manifesto && (
                                <p className="text-xs text-muted-foreground line-clamp-1">{candidate.manifesto}</p>
                              )}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVotes[position] === candidate.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                            }`}>
                            {selectedVotes[position] === candidate.id && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <Button
            onClick={handleSubmitVotes}
            disabled={!allPositionsVoted}
            className="w-full"
          >
            {allPositionsVoted ? "Submit Your Votes" : "Select a candidate for each position"}
          </Button>
        </div>
      )}

      {/* Results Section (visible to execs or after voting) */}
      {isExec && active.resultsVisible && (
        <Card>
          <CardHeader>
            <CardTitle>Election Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(results).map(([position, candidates]) => (
                <div key={position}>
                  <h4 className="font-semibold mb-2">{position}</h4>
                  {candidates.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No votes yet</p>
                  ) : (
                    <ul className="space-y-1">
                      {candidates.map((c) => (
                        <li key={c.candidateId} className="flex justify-between text-sm">
                          <span>{c.name}</span>
                          <span className="text-muted-foreground">
                            {c.votes} votes ({c.percentage.toFixed(1)}%)
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voter statistics for execs */}
      {isExec && (
        <Card>
          <CardHeader>
            <CardTitle>Voting Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Total voters: {active.submittedVoters?.length || 0}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
