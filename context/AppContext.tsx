"use client";

import React from "react";

export type Role = "President" | "Vice President" | "Secretary" | "ITEC" | "Deputy ITEC" | "Member";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  memberId: string;
  password: string;
  role: Role;
  status: "Pending" | "Active" | "Rejected";
  approvals?: string[]; // userIds who approved
  rejections?: string[]; // userIds who rejected
  // Registration details
  institution?: string;
  surname?: string;
  firstName?: string;
  otherNames?: string;
  gender?: string;
  dob?: string;
  constituency?: string;
  homeTown?: string;
  region?: string;
  partyPosition?: string;
  level?: string;
  programme?: string;
  hallHostel?: string;
  roomNo?: string;
  studentId?: string;
  voterId?: string;
  partyMembershipNo?: string;
  signature?: string;
  signatureDate?: string;
  passportPhoto?: string; // base64 encoded image
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: string[]; // userIds
  createdBy: string; // userId
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  manifesto?: string;
}

export interface Election {
  id: string;
  title: string;
  positions: string[]; // Ordered list of positions to vote for
  candidates: Candidate[];
  votes: Record<string, Record<string, string>>; // userId -> { position -> candidateId }
  submittedVoters: string[]; // userIds who completed voting
  resultsVisible: boolean;
  isOpen: boolean; // Admin-controlled open/close state
}

interface AppState {
  users: User[];
  events: EventItem[];
  elections: Election[];
  authUser: User | null;
}

interface AppContextValue extends AppState {
  registerUser(user: Omit<User, "id" | "status" | "approvals" | "memberId">): void;
  login(memberId: string, password: string): boolean;
  loginAs(role: Role): void;
  loginAsUser(userId: string): void;
  logout(): void;
  approveUser(targetUserId: string, approverId: string): void;
  rejectUser(targetUserId: string, rejecterId: string): void;
  grantRole(userId: string, newRole: Role): void;
  updateUser(userId: string, updates: Partial<User>): void;
  addEvent(event: Omit<EventItem, "id" | "attendees">): void;
  joinEvent(eventId: string, userId: string): void;
  // Election functions
  addCandidate(electionId: string, name: string, position: string, imageUrl?: string, manifesto?: string): void;
  removeCandidate(electionId: string, candidateId: string): void;
  castVotes(electionId: string, userId: string, votes: Record<string, string>): void;
  toggleElectionStatus(electionId: string): void;
  hasUserVoted(electionId: string, userId: string): boolean;
  toggleResultsVisibility(electionId: string): void;
  getElectionResults(electionId: string): Record<string, { candidateId: string; name: string; votes: number; percentage: number; imageUrl?: string }[]>;
}

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

function uid(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

const LOCAL_KEY = "tein_demo_state_v2";

function loadState(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as AppState) : null;
  } catch {
    return null;
  }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch { }
}

const initialSeed: AppState = {
  users: [
    { id: "u_pres", name: "Ada Lovelace", email: "pres@example.com", phone: "0200000001", memberId: "BR\\STU\\25\\00001", password: "password123", role: "President", status: "Active" },
    { id: "u_vp", name: "Alan Turing", email: "vp@example.com", phone: "0200000002", memberId: "BR\\STU\\25\\00002", password: "password123", role: "Vice President", status: "Active" },
    { id: "u_sec", name: "Grace Hopper", email: "sec@example.com", phone: "0200000003", memberId: "BR\\STU\\25\\00003", password: "password123", role: "Secretary", status: "Active" },
    { id: "u_itec", name: "Tim Berners-Lee", email: "itec@example.com", phone: "0200000005", memberId: "BR\\STU\\25\\00004", password: "password123", role: "ITEC", status: "Active" },
    { id: "u_mem", name: "Linus Member", email: "member@example.com", phone: "0200000004", memberId: "BR\\STU\\25\\00005", password: "password123", role: "Member", status: "Active" },
  ],
  events: [
    { id: "ev1", title: "Welcome Meetup", date: new Date().toISOString(), location: "Main Hall", attendees: ["u_pres"], createdBy: "u_pres" },
  ],
  elections: [
    {
      id: "el1",
      title: "Executive Elections 2025",
      positions: ["President", "Vice President", "Secretary", "Organizer", "Treasurer", "Communications Officer", "Women's Commissioner", "ITEC"],
      candidates: [],
      votes: {},
      submittedVoters: [],
      resultsVisible: false,
      isOpen: false, // Admin controls this
    },
  ],
  authUser: null,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(() => loadState() ?? initialSeed);

  React.useEffect(() => {
    saveState(state);
  }, [state]);

  const registerUser = (user: Omit<User, "id" | "status" | "approvals" | "memberId">) => {
    // Get current year in 2-digit format (e.g., 25 for 2025)
    const year = new Date().getFullYear().toString().slice(-2);

    // Get sequential number (5 digits, starting from 00001)
    const sequentialNum = String(state.users.length + 1).padStart(5, "0");

    // Format: BR\STU\YY\#####
    const memberId = `BR\\STU\\${year}\\${sequentialNum}`;

    setState((s) => ({
      ...s,
      users: [
        ...s.users,
        {
          ...user,
          id: uid("user"),
          memberId,
          status: "Pending",
          approvals: []
        },
      ],
    }));
  };

  const login = (memberId: string, password: string): boolean => {
    const user = state.users.find(
      (u) => u.memberId === memberId && u.password === password && u.status === "Active"
    );
    if (user) {
      setState((s) => ({ ...s, authUser: user }));
      return true;
    }
    return false;
  };

  const loginAs = (role: Role) => {
    setState((s) => ({
      ...s,
      authUser: s.users.find((u) => u.role === role) ?? null,
    }));
  };

  const loginAsUser = (userId: string) => {
    setState((s) => ({ ...s, authUser: s.users.find((u) => u.id === userId) ?? null }));
  };

  const logout = () => setState((s) => ({ ...s, authUser: null }));

  const approveUser = (targetUserId: string, approverId: string) => {
    setState((s) => {
      const users = s.users.map((u) => {
        if (u.id !== targetUserId) return u;
        const approvals = Array.from(new Set([...(u.approvals ?? []), approverId]));
        const status = approvals.length >= 2 ? "Active" : u.status;
        return { ...u, approvals, status };
      });
      return { ...s, users };
    });
  };

  const rejectUser = (targetUserId: string, rejecterId: string) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => {
        if (u.id !== targetUserId) return u;
        const rejections = Array.from(new Set([...(u.rejections ?? []), rejecterId]));
        // Set status to Rejected if we have any rejection
        return { ...u, rejections, status: "Rejected" };
      }),
    }));
  };

  const addEvent = (event: Omit<EventItem, "id" | "attendees">) => {
    setState((s) => ({
      ...s,
      events: [...s.events, { ...event, id: uid("event"), attendees: [] }],
    }));
  };

  const joinEvent = (eventId: string, userId: string) => {
    setState((s) => ({
      ...s,
      events: s.events.map((e) => (e.id === eventId ? { ...e, attendees: Array.from(new Set([...e.attendees, userId])) } : e)),
    }));
  };

  // Election Management Functions
  const addCandidate = (electionId: string, name: string, position: string, imageUrl?: string, manifesto?: string) => {
    setState((s) => ({
      ...s,
      elections: s.elections.map((el) =>
        el.id === electionId
          ? {
            ...el,
            candidates: [...el.candidates, { id: uid("cand"), name, position, imageUrl, manifesto }],
          }
          : el
      ),
    }));
  };

  const removeCandidate = (electionId: string, candidateId: string) => {
    setState((s) => ({
      ...s,
      elections: s.elections.map((el) =>
        el.id === electionId
          ? {
            ...el,
            candidates: el.candidates.filter((c) => c.id !== candidateId),
          }
          : el
      ),
    }));
  };

  const castVotes = (electionId: string, userId: string, votes: Record<string, string>) => {
    setState((s) => ({
      ...s,
      elections: s.elections.map((el) =>
        el.id === electionId
          ? {
            ...el,
            votes: { ...el.votes, [userId]: votes },
            submittedVoters: [...(el.submittedVoters || []), userId],
          }
          : el
      ),
    }));
  };


  const toggleElectionStatus = (electionId: string) => {
    setState((s) => ({
      ...s,
      elections: s.elections.map((el) =>
        el.id === electionId ? { ...el, isOpen: !el.isOpen } : el
      ),
    }));
  };

  const hasUserVoted = (electionId: string, userId: string): boolean => {
    const election = state.elections.find((el) => el.id === electionId);
    return election && election.submittedVoters ? election.submittedVoters.includes(userId) : false;
  };

  const toggleResultsVisibility = (electionId: string) => {
    setState((s) => ({
      ...s,
      elections: s.elections.map((el) =>
        el.id === electionId ? { ...el, resultsVisible: !el.resultsVisible } : el
      ),
    }));
  };

  const getElectionResults = (electionId: string): Record<string, { candidateId: string; name: string; votes: number; percentage: number; imageUrl?: string }[]> => {
    const election = state.elections.find((el) => el.id === electionId);
    if (!election) return {};

    const results: Record<string, { candidateId: string; name: string; votes: number; percentage: number; imageUrl?: string }[]> = {};

    election.positions.forEach((position) => {
      const positionCandidates = election.candidates.filter((c) => c.position === position);
      const voteCounts: Record<string, number> = {};

      // Count votes for this position
      Object.values(election.votes).forEach((userVotes) => {
        const candidateId = userVotes[position];
        if (candidateId) {
          voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
        }
      });

      const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

      // Build results for this position
      results[position] = positionCandidates.map((candidate) => ({
        candidateId: candidate.id,
        name: candidate.name,
        votes: voteCounts[candidate.id] || 0,
        percentage: totalVotes > 0 ? ((voteCounts[candidate.id] || 0) / totalVotes) * 100 : 0,
        imageUrl: candidate.imageUrl,
      })).sort((a, b) => b.votes - a.votes); // Sort by votes descending
    });

    return results;
  };

  const grantRole = (userId: string, newRole: Role) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
    }));
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, ...updates } : u)),
    }));
  };

  const value: AppContextValue = {
    ...state,
    registerUser,
    login,
    loginAs,
    loginAsUser,
    logout,
    approveUser,
    rejectUser,
    grantRole,
    updateUser,
    addEvent,
    joinEvent,
    addCandidate,
    removeCandidate,
    castVotes,
    toggleElectionStatus,
    hasUserVoted,
    toggleResultsVisibility,
    getElectionResults,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}




