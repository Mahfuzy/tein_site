"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-56px)] grid md:grid-cols-[240px_1fr]">
      <aside className="hidden md:block sticky top-14 self-start">
        <div className="w-[240px]">
          <Sidebar />
        </div>
      </aside>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}


