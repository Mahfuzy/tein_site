"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function DashboardHome() {
  const { users, events, authUser } = useApp();

  const pendingCount = users.filter((u) => u.status === "Pending").length;
  const activeMembers = users.filter((u) => u.status === "Active").length;
  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date()).length;

  const isExec = authUser && ["President", "Vice President", "Secretary"].includes(authUser.role);

  const stats = [
    { label: "Active Members", value: activeMembers.toString() },
    { label: "Upcoming Events", value: upcomingEvents.toString() },
    ...(isExec ? [{ label: "Pending Approvals", value: pendingCount.toString() }] : []),
    { label: "Total Events", value: events.length.toString() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome{authUser ? `, ${authUser.name}` : " to TEIN Dashboard"}
        </h1>
        {authUser && (
          <p className="text-sm text-neutral-500 mt-1">
            Role: {authUser.role} • Member ID: {authUser.memberId}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-neutral-500">{s.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">{s.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


