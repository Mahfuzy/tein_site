"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { authUser } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const baseLinks = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/activities", label: "Activities" },
    { href: "/dashboard/events", label: "Events" },
    { href: "/dashboard/executives", label: "Executives" },
    { href: "/dashboard/elections", label: "Vote" },
  ];

  // Executive-only links (President, Vice President, Secretary)
  const isExecutive = mounted && authUser && ["President", "Vice President", "Secretary"].includes(authUser.role);

  const electionLinks = [
    { href: "/dashboard/elections/results", label: "Results" },
  ];

  // Add manage link for ITEC/Deputy ITEC (only after mounting to prevent hydration mismatch)
  if (mounted && authUser && (authUser.role === "ITEC" || authUser.role === "Deputy ITEC")) {
    electionLinks.unshift({ href: "/dashboard/elections/manage", label: "Manage Candidates" });
  }

  const profileLink = { href: "/dashboard/profile", label: "Profile" };

  return (
    <aside className="border-r border-neutral-200 dark:border-neutral-800 p-4 space-y-4">
      <div className="font-semibold">TEIN Portal</div>

      <nav className="grid gap-1 text-sm">
        {baseLinks.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`px-2 py-1 rounded ${active ? "bg-neutral-100 dark:bg-neutral-900" : "hover:underline"}`}
            >
              {l.label}
            </Link>
          );
        })}

        {/* Election Sub-menu */}
        {pathname.startsWith("/dashboard/elections") && (
          <div className="pl-4 space-y-1 border-l-2 border-[var(--ndc-red-primary)] ml-2">
            {electionLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-2 py-1 rounded block text-xs ${active ? "bg-neutral-100 dark:bg-neutral-900 font-semibold" : "hover:underline"
                    }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Approvals - Executive only */}
        {isExecutive && (
          <Link
            href="/dashboard/approvals"
            className={`px-2 py-1 rounded ${pathname === "/dashboard/approvals" ? "bg-neutral-100 dark:bg-neutral-900" : "hover:underline"}`}
          >
            Approvals
          </Link>
        )}

        {/* Roles - President/VP only */}
        {mounted && authUser && ["President", "Vice President"].includes(authUser.role) && (
          <Link
            href="/dashboard/roles"
            className={`px-2 py-1 rounded ${pathname === "/dashboard/roles" ? "bg-neutral-100 dark:bg-neutral-900" : "hover:underline"}`}
          >
            Roles
          </Link>
        )}

        <Link
          href={profileLink.href}
          className={`px-2 py-1 rounded ${pathname === profileLink.href ? "bg-neutral-100 dark:bg-neutral-900" : "hover:underline"}`}
        >
          {profileLink.label}
        </Link>
      </nav>
    </aside>
  );
}


