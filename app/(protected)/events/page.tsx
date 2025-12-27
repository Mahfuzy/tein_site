"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const { events, authUser, addEvent, joinEvent } = useApp();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", location: "" });

  if (!authUser) {
    router.push("/login");
    return null;
  }

  const isExec = ["President", "Vice President", "Secretary"].includes(authUser.role);

  const submit = () => {
    addEvent({ title: form.title, date: form.date || new Date().toISOString(), location: form.location, createdBy: authUser.id });
    setOpen(false);
    setForm({ title: "", date: "", location: "" });
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Events</h2>
        {isExec && <Button onClick={() => setOpen(true)}>Add Event</Button>}
      </div>

      {events.map((e) => (
        <Card key={e.id}>
          <CardHeader>
            <CardTitle>{e.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm">
              <div>{new Date(e.date).toLocaleString()}</div>
              <div className="text-neutral-500">{e.location}</div>
              <div className="text-neutral-500">Attendees: {e.attendees.length}</div>
            </div>
            <Button variant="secondary" onClick={() => joinEvent(e.id, authUser.id)}>Join</Button>
          </CardContent>
        </Card>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
        <DialogContent className="space-y-3">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Date (ISO or human)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </DialogContent>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit}>Save</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}


