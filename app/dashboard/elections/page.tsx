"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import CandidateCard from "@/components/elections/CandidateCard";
import VotingProgress from "@/components/elections/VotingProgress";
import VoteSummary from "@/components/elections/VoteSummary";
import ResultsCard from "@/components/elections/ResultsCard";
import { getTimeRemaining } from "@/lib/electionUtils";
import { AlertCircle, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ElectionsPage() {
  const { elections, authUser, castVotes, hasUserVoted, getElectionResults } = useApp();
  const router = useRouter();

  const election = elections[0]; // Get the current election
  const [verified, setVerified] = useState(!!authUser);
  const [memberId, setMemberId] = useState("");
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const isElectionOpen = election ? election.isOpen : false;
  const userHasVoted = election && authUser ? hasUserVoted(election.id, authUser.id) : false;

  // Check if user has already voted
  useEffect(() => {
    if (userHasVoted) {
      setHasVoted(true);
    }
  }, [userHasVoted]);

  if (!election) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Election Portal</h1>
        <Card>
          <CardContent className="p-6 text-neutral-600 dark:text-neutral-400">
            No active elections at this time.
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if election has the new data structure (backwards compatibility)
  if (!election.positions || !election.candidates || election.submittedVoters === undefined) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Election Portal</h1>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-6 h-6" />
              <span className="font-semibold">Old Election Data Detected</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              The election system has been upgraded. Please clear your browser data to use the new features.
            </p>
            <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded text-sm font-mono">
              localStorage.removeItem('tein_demo_state_v2');<br />
              location.reload();
            </div>
            <p className="text-xs text-neutral-500">
              Copy and paste this in your browser console (F12), or contact ITEC for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPosition = election.positions[currentPositionIndex];
  const positionCandidates = election.candidates.filter((c) => c.position === currentPosition);
  const completedPositions = new Set(Object.keys(votes));
  const canProceed = votes[currentPosition] !== undefined;
  const isLastPosition = currentPositionIndex === election.positions.length - 1;

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId) {
      toast.error("Please enter your member ID");
      return;
    }
    // In a real app, you would verify against the user database
    setVerified(true);
    toast.success("Verification successful");
  };

  const handleCandidateSelect = (candidateId: string) => {
    setVotes({ ...votes, [currentPosition]: candidateId });
  };

  const handleNext = () => {
    if (!canProceed) {
      toast.error(`Please select a candidate for ${currentPosition}`);
      return;
    }

    if (isLastPosition) {
      setShowSummary(true);
    } else {
      setCurrentPositionIndex(currentPositionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1);
    }
  };

  const handleEditPosition = (index: number) => {
    setShowSummary(false);
    setCurrentPositionIndex(index);
  };

  const handleSubmit = () => {
    if (!authUser) {
      toast.error("You must be logged in to vote");
      return;
    }

    // Check all positions have votes
    const missingPositions = election.positions.filter((p) => !votes[p]);
    if (missingPositions.length > 0) {
      toast.error(`Please vote for all positions. Missing: ${missingPositions.join(", ")}`);
      return;
    }

    castVotes(election.id, authUser.id, votes);
    setHasVoted(true);
    toast.success("Your votes have been recorded. Thank you for voting!");
  };

  const results = getElectionResults(election.id);

  // Show results if user has voted or if results are visible
  const showResults = hasVoted || election.resultsVisible;

  // Election closed message
  if (!election.isOpen && !showResults) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{election.title}</h1>
        <Card>
          <CardContent className="p-6 flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
            <AlertCircle className="w-5 h-5" />
            <span>This election is currently closed. Please check back later or contact ITEC for more information.</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show results view
  if (showResults && election.resultsVisible) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{election.title} - Results</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Total voters: {election.submittedVoters.length}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {election.positions.map((position) => (
            <ResultsCard key={position} position={position} results={results[position] || []} />
          ))}
        </div>
      </div>
    );
  }

  // Already voted message
  if (hasVoted) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{election.title}</h1>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-semibold text-lg">You have successfully voted!</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Thank you for participating in the {election.title}. Results will be announced when voting closes.
            </p>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verification required
  if (!verified || !authUser) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{election.title}</h1>
        {isVotingOpen && (
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Verify Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-100">
                  Please verify your membership to participate in the election. You must be a registered TEIN member to vote.
                </div>
              </div>
              <form className="space-y-4" onSubmit={verify}>
                <div>
                  <Label>Member ID</Label>
                  <Input
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="e.g. TEIN-UG-0001"
                  />
                </div>
                <Button type="submit">Verify</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Voting Summary View
  if (showSummary) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{election.title}</h1>
        {isVotingOpen && (
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
        )}

        <Card>
          <CardContent className="p-6 space-y-6">
            <VoteSummary
              positions={election.positions}
              votes={votes}
              candidates={election.candidates}
              onEdit={handleEditPosition}
            />

            <div className="flex items-center gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Submit All Votes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Position-by-Position Voting View
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{election.title}</h1>

      <VotingProgress
        positions={election.positions}
        currentIndex={currentPositionIndex}
        completedPositions={completedPositions}
      />

      <Card>
        <CardHeader>
          <CardTitle className="uppercase tracking-wide">{currentPosition}</CardTitle>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Select one candidate for this position
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {positionCandidates.length === 0 ? (
            <p className="text-neutral-500 dark:text-neutral-400 italic py-8 text-center">
              No candidates registered for this position yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {positionCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={votes[currentPosition] === candidate.id}
                  onSelect={() => handleCandidateSelect(candidate.id)}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPositionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!canProceed} className="flex-1">
              {isLastPosition ? "Review Votes" : "Next Position"}
              {!isLastPosition && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
