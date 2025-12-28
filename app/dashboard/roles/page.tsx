"use client";

import { useState } from "react";
import { useApp, Role } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

const roles: Role[] = ["President", "Vice President", "Secretary", "Member"];

export default function RolesPage() {
  const { users, authUser, grantRole } = useApp();
  const router = useRouter();
  const [selectedRoles, setSelectedRoles] = useState<Record<string, Role>>({});

  if (!authUser || !["President", "Vice President"].includes(authUser.role)) {
    router.push("/dashboard");
    return null;
  }

  const members = users.filter((u) => u.status === "Active");

  const handleGrantRole = (userId: string) => {
    const newRole = selectedRoles[userId];
    if (!newRole) {
      toast.error("Please select a role");
      return;
    }

    grantRole(userId, newRole);
    toast.success(`Role updated to ${newRole}`);
    setSelectedRoles({ ...selectedRoles, [userId]: undefined as any });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Role Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Assign Roles</CardTitle>
          <p className="text-sm text-neutral-500">
            Grant or update roles for active members
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-neutral-500">{m.email}</div>
                <div className="text-sm">
                  <span className="text-neutral-500">Current Role:</span>{" "}
                  <span className="font-medium">{m.role}</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Select
                  value={selectedRoles[m.id] || ""}
                  onChange={(e) =>
                    setSelectedRoles({ ...selectedRoles, [m.id]: e.target.value as Role })
                  }
                  className="w-48"
                >
                  <option value="">Select role...</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
                <Button size="sm" variant="default" onClick={() => handleGrantRole(m.id)}>
                  Update
                </Button>
              </div>
            </div>
          ))}
          {members.length === 0 && <div className="text-sm text-neutral-500">No active members available.</div>}
        </CardContent>
      </Card>
    </div>
  );
}


