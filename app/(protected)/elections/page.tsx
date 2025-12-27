"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ElectionsPage() {
  const { elections, users, authUser, nominate, vote } = useApp();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [nomineeEmail, setNomineeEmail] = useState("");

  if (!authUser) {
    router.push("/login");
    return null;
  }

  const active = elections.find((e) => e.isOpen);
  if (!active) {
    return <div>No active elections.</div>;
  }

  const alreadyVoted = !!active.votes[authUser.id];
  const nominees = active.nominees.map((id) => users.find((u) => u.id === id)).filter(Boolean);

  const submitNomination = () => {
    const found = users.find((u) => u.email === nomineeEmail);
    if (found) nominate(active.id, found.id);
    setOpen(false);
    setNomineeEmail("");
  };

  const voteFor = (id: string) => {
    if (!alreadyVoted) vote(active.id, authUser.id, id);
  };

  const isExec = ["President", "Vice President", "Secretary"].includes(authUser.role);
  const summary: Record<string, number> = {};
  Object.values(active.votes).forEach((nid) => (summary[nid] = (summary[nid] ?? 0) + 1));

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Election: {active.title}</h2>
        <Button onClick={() => setOpen(true)}>Nominate</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nominees</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {nominees.map((n) => (
            <div key={n!.id} className="flex items-center justify-between">
              <div>{n!.name}</div>
              <Button disabled={alreadyVoted} onClick={() => voteFor(n!.id)}>{alreadyVoted ? "Voted" : "Vote"}</Button>
            </div>
          ))}
          {nominees.length === 0 && <div>No nominees yet.</div>}
        </CardContent>
      </Card>

      {isExec && (
        <Card>
          <CardHeader>
            <CardTitle>Vote Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm">
              {Object.entries(summary).map(([nid, count]) => {
                const user = users.find((u) => u.id === nid);
                return <li key={nid}>{user?.name}: {count}</li>;
              })}
              {Object.keys(summary).length === 0 && <li>No votes yet.</li>}
            </ul>
          </CardContent>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Nominate</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Input placeholder="Nominee email" value={nomineeEmail} onChange={(e) => setNomineeEmail(e.target.value)} />
        </DialogContent>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submitNomination}>Submit</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}


