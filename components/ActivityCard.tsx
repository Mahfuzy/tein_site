"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Activity } from "@/data/activities";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const color = activity.status === "Upcoming" ? "bg-[var(--ndc-green)]" : activity.status === "Completed" ? "bg-neutral-500" : "bg-red-600";
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">{activity.title}</CardTitle>
            <Badge className={`${color} text-white`}>{activity.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-neutral-500">{new Date(activity.date).toDateString()}</div>
          <p className="mt-2 text-sm leading-relaxed">{activity.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}


