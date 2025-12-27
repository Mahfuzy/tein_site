"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authUser, logout } = useApp();
  const router = useRouter();

  if (!authUser) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-neutral-200 dark:border-neutral-800 p-4 space-y-2">
        <div className="font-semibold">TEIN Portal</div>
        <nav className="grid gap-1 text-sm">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/elections" className="hover:underline">Elections</Link>
          <Link href="/approvals" className="hover:underline">Approvals</Link>
          <Link href="/roles" className="hover:underline">Roles</Link>
        </nav>
        <div className="pt-4 text-xs text-neutral-500">Logged in as: {authUser?.name ?? "Guest"}</div>
        <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}


