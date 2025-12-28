"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut, X } from "lucide-react";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { authUser, logout } = useApp();

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Prevent hydration mismatch by not rendering auth-dependent content during SSR
  const showAuthContent = mounted;

  return (
    <>
      <header className="sticky top-0 z-[60] w-full border-b-2 border-[var(--ndc-red-primary)] bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="TEIN home" className="flex items-center gap-3 font-bold text-lg group">
            <img
              src="/tein-logo.jpg"
              alt="TEIN Logo"
              className="h-12 w-12 rounded-sm object-cover ring-2 ring-[var(--ndc-red-primary)]"
            />
            <span className="text-[var(--ndc-black)] font-extrabold uppercase tracking-tight text-xl">TEIN</span>
          </Link>
          {showAuthContent && !authUser && (
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Home</Link>
              <Link href="#about" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">About</Link>
              <Link href="/dashboard/activities" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Activities</Link>
              <Link href="/dashboard/executives" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Executives</Link>
            </nav>
          )}
          {showAuthContent && authUser && (
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Dashboard</Link>
              <Link href="/dashboard/elections" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Elections</Link>
              <Link href="/dashboard/activities" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Activities</Link>
              <Link href="/dashboard/executives" className="text-sm font-bold uppercase tracking-wide text-[var(--ndc-black)] hover:text-[var(--ndc-red-primary)] transition-colors">Executives</Link>
            </nav>
          )}
          <nav className="flex items-center gap-2">
            <div className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
                <Menu className="h-5 w-5 text-[var(--ndc-black)]" />
              </Button>
            </div>
            {showAuthContent && authUser ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--ndc-black)]">
                  <User className="h-4 w-4 text-[var(--ndc-black)]" />
                  {authUser.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : showAuthContent ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/register" aria-label="Join TEIN"><Button size="sm">Join Now</Button></Link>
                <Link href="/login" aria-label="Login"><Button variant="outline" size="sm">Login</Button></Link>
              </div>
            ) : null}
          </nav>
        </div>
        {/* Mobile menu for non-logged-in users - dropdown from top */}
        {open && showAuthContent && !authUser && (
          <div className="md:hidden border-t-2 border-[var(--ndc-red-primary)] bg-white/98 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-4 grid gap-1 text-sm">
              <Link href="/" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Home</Link>
              <Link href="#about" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">About</Link>
              <Link href="/dashboard/activities" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Activities</Link>
              <Link href="/dashboard/executives" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Executives</Link>
              <div className="flex gap-2 pt-3 mt-2 border-t-2 border-[var(--ndc-red-primary)]">
                <Link href="/register" onClick={() => setOpen(false)} className="flex-1"><Button size="sm" className="w-full">Join Now</Button></Link>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1"><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile sidebar for logged-in users - slides from right - OUTSIDE header for proper z-index */}
      {showAuthContent && authUser && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-[100] md:hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setOpen(false)}
          />

          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-[100] md:hidden transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-[var(--ndc-red-primary)] bg-[var(--ndc-red-primary)]">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-white" />
                <span className="font-bold text-white">{authUser.name}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-sm hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Sidebar Content */}
            <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-140px)]">
              <Link href="/dashboard" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Dashboard</Link>
              <Link href="/dashboard/activities" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Activities</Link>
              <Link href="/dashboard/events" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Events</Link>
              <Link href="/dashboard/executives" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Executives</Link>
              <Link href="/dashboard/elections" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Vote</Link>
              <Link href="/dashboard/elections/results" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Results</Link>
              {(authUser.role === "ITEC" || authUser.role === "Deputy ITEC") && (
                <Link href="/dashboard/elections/manage" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Manage Candidates</Link>
              )}
              {["President", "Vice President", "Secretary"].includes(authUser.role) && (
                <Link href="/dashboard/approvals" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Approvals</Link>
              )}
              {["President", "Vice President"].includes(authUser.role) && (
                <Link href="/dashboard/roles" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Roles</Link>
              )}
              <Link href="/dashboard/profile" onClick={() => setOpen(false)} className="block py-3 px-4 rounded-sm text-[var(--ndc-black)] hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Profile</Link>
            </nav>

            {/* Sidebar Footer - Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="w-full py-3 px-4 rounded-sm bg-[var(--ndc-red-primary)]/10 hover:bg-[var(--ndc-red-primary)] text-[var(--ndc-red-primary)] hover:text-white transition-colors font-bold uppercase flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}


