"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ApprovalsPage() {
    const { users, authUser, approveUser, rejectUser } = useApp();
    const router = useRouter();

    if (!authUser || !["President", "Vice President", "Secretary"].includes(authUser.role)) {
        router.push("/login");
        return null;
    }

    const pendingUsers = users.filter((u) => u.status === "Pending");
    const approvedUsers = users.filter((u) => u.status === "Active");
    const rejectedUsers = users.filter((u) => u.status === "Rejected");

    const handleApprove = (userId: string) => {
        approveUser(userId, authUser.id);
        const user = users.find((u) => u.id === userId);
        const approvalsCount = (user?.approvals?.length || 0) + 1;

        if (approvalsCount >= 2) {
            toast.success("User approved and activated!");
        } else {
            toast.success("Approval recorded. One more approval needed.");
        }
    };

    const handleReject = (userId: string) => {
        rejectUser(userId, authUser.id);
        toast.success("User application rejected.");
    };

    // Check if current executive has already taken action (approved or rejected)
    const hasActioned = (user: typeof users[0]) => {
        return user.approvals?.includes(authUser.id) || user.rejections?.includes(authUser.id);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Membership Approvals</h1>
                <Badge variant="secondary">{pendingUsers.length} Pending</Badge>
            </div>

            {/* Pending Approvals */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Applications</CardTitle>
                    <p className="text-sm text-neutral-500">
                        Members require 2 executive approvals to be activated
                    </p>
                </CardHeader>
                <CardContent>
                    {pendingUsers.length === 0 ? (
                        <p className="text-sm text-neutral-500">No pending applications</p>
                    ) : (
                        <div className="space-y-4">
                            {pendingUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between border-b border-neutral-200 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="space-y-1">
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-neutral-500">{user.email}</div>
                                        <div className="text-sm text-neutral-500">
                                            Member ID: {user.memberId}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-neutral-500">
                                                Approvals: {user.approvals?.length || 0} / 2
                                            </span>
                                            {user.approvals && user.approvals.length > 0 && (
                                                <Badge variant="outline" className="text-xs">
                                                    {user.approvals.length === 1 ? "1 Approval" : `${user.approvals.length} Approvals`}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="default"
                                            onClick={() => handleApprove(user.id)}
                                            disabled={hasActioned(user)}
                                        >
                                            {user.approvals?.includes(authUser.id) ? "Approved" : "Approve"}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleReject(user.id)}
                                            disabled={hasActioned(user)}
                                        >
                                            {user.rejections?.includes(authUser.id) ? "Rejected" : "Reject"}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recently Approved */}
            <Card>
                <CardHeader>
                    <CardTitle>Approved Members</CardTitle>
                </CardHeader>
                <CardContent>
                    {approvedUsers.length === 0 ? (
                        <p className="text-sm text-neutral-500">No approved members yet</p>
                    ) : (
                        <div className="space-y-2">
                            {approvedUsers.slice(0, 5).map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between text-sm border-b border-neutral-100 pb-2 last:border-0"
                                >
                                    <div>
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-neutral-500 ml-2">({user.role})</span>
                                    </div>
                                    <Badge variant="default" className="bg-green-600">Active</Badge>
                                </div>
                            ))}
                            {approvedUsers.length > 5 && (
                                <p className="text-xs text-neutral-500 pt-2">
                                    And {approvedUsers.length - 5} more...
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Rejected */}
            {rejectedUsers.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Rejected Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {rejectedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between text-sm border-b border-neutral-100 pb-2 last:border-0"
                                >
                                    <div>
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-neutral-500 ml-2">{user.email}</span>
                                    </div>
                                    <Badge variant="destructive">Rejected</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
