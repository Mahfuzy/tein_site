"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Plus, Users, Power, PowerOff } from "lucide-react";
import { getPlaceholderImage } from "@/lib/electionUtils";

export default function ManageCandidatesPage() {
    const { elections, authUser, addCandidate, removeCandidate, toggleElectionStatus } = useApp();
    const election = elections[0];

    const [candidateName, setCandidateName] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [manifesto, setManifesto] = useState("");

    // Check if user is ITEC or Deputy ITEC
    const canManageCandidates = authUser && (authUser.role === "ITEC" || authUser.role === "Deputy ITEC");

    if (!canManageCandidates) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Manage Candidates</h1>
                <Card>
                    <CardContent className="p-6 text-center text-neutral-600 dark:text-neutral-400">
                        <p>Access denied. Only ITEC and Deputy ITEC can manage candidates.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!election) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Manage Candidates</h1>
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
                <h1 className="text-2xl font-bold">Manage Candidates</h1>
                <Card>
                    <CardContent className="p-6 text-center text-amber-600 dark:text-amber-400">
                        <p>Please clear localStorage (F12 console: localStorage.removeItem('tein_demo_state_v2'); location.reload())</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    const handleAddCandidate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!candidateName.trim()) {
            toast.error("Please enter candidate name");
            return;
        }

        if (!selectedPosition) {
            toast.error("Please select a position");
            return;
        }

        addCandidate(election.id, candidateName.trim(), selectedPosition, imageUrl.trim() || undefined, manifesto.trim() || undefined);

        toast.success(`${candidateName} added as candidate for ${selectedPosition}`);

        // Reset form
        setCandidateName("");
        setImageUrl("");
        setManifesto("");
    };

    const handleRemoveCandidate = (candidateId: string, name: string) => {
        if (confirm(`Are you sure you want to remove ${name} from the election?`)) {
            removeCandidate(election.id, candidateId);
            toast.success(`${name} has been removed`);
        }
    };

    const candidatesByPosition: Record<string, typeof election.candidates> = {};
    election.positions.forEach((position) => {
        candidatesByPosition[position] = election.candidates.filter((c) => c.position === position);
    });

    const handleToggleElectionStatus = () => {
        toggleElectionStatus(election.id);
        toast.success(election.isOpen ? "Election has been closed" : "Election has been opened");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Candidates - {election.title}</h1>
                <Button
                    variant={election.isOpen ? "outline" : "default"}
                    onClick={handleToggleElectionStatus}
                >
                    {election.isOpen ? (
                        <>
                            <PowerOff className="w-4 h-4 mr-2" />
                            Close Election
                        </>
                    ) : (
                        <>
                            <Power className="w-4 h-4 mr-2" />
                            Open Election
                        </>
                    )}
                </Button>
            </div>

            {/* Election Status Card */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                        {election.isOpen ? (
                            <>
                                <Power className="w-4 h-4 text-green-600" />
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                    Election is currently OPEN for voting
                                </span>
                            </>
                        ) : (
                            <>
                                <PowerOff className="w-4 h-4 text-red-600" />
                                <span className="text-red-600 dark:text-red-400 font-semibold">
                                    Election is currently CLOSED
                                </span>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Add Candidate Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add New Candidate
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddCandidate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Candidate Name *</Label>
                                <Input
                                    id="name"
                                    value={candidateName}
                                    onChange={(e) => setCandidateName(e.target.value)}
                                    placeholder="e.g. Kwame Mensah"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="position">Position *</Label>
                                <select
                                    id="position"
                                    value={selectedPosition}
                                    onChange={(e) => setSelectedPosition(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900"
                                    required
                                >
                                    <option value="">Select position...</option>
                                    {election.positions.map((position) => (
                                        <option key={position} value={position}>
                                            {position}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                                <Input
                                    id="imageUrl"
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    Leave empty for auto-generated avatar
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="manifesto">Manifesto (optional)</Label>
                                <textarea
                                    id="manifesto"
                                    value={manifesto}
                                    onChange={(e) => setManifesto(e.target.value)}
                                    placeholder="Candidate's campaign manifesto..."
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 min-h-[100px]"
                                />
                            </div>
                        </div>

                        <Button type="submit">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Candidate
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Candidates by Position */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Registered Candidates ({election.candidates.length})
                </h2>

                {election.positions.map((position) => {
                    const positionCandidates = candidatesByPosition[position] || [];

                    return (
                        <Card key={position}>
                            <CardHeader>
                                <CardTitle className="text-lg uppercase tracking-wide">
                                    {position} ({positionCandidates.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {positionCandidates.length === 0 ? (
                                    <p className="text-neutral-500 dark:text-neutral-400 italic">
                                        No candidates registered for this position yet.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {positionCandidates.map((candidate) => (
                                            <div
                                                key={candidate.id}
                                                className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded"
                                            >
                                                <img
                                                    src={candidate.imageUrl || getPlaceholderImage(candidate.name)}
                                                    alt={candidate.name}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-300 dark:ring-neutral-700"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold">{candidate.name}</div>
                                                    {candidate.manifesto && (
                                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                            {candidate.manifesto}
                                                        </p>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemoveCandidate(candidate.id, candidate.name)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
