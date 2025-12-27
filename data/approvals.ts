export interface ApprovalRequest {
    id: string;
    userId: string;
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    status: "Pending" | "Approved" | "Rejected";
    notes?: string;
}

// Mock approval data - this will be synced with User.status in AppContext
export const mockApprovals: ApprovalRequest[] = [];
