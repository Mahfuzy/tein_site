"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b-2 border-[var(--ndc-red-primary)] bg-white/95 backdrop-blur-md shadow-md">
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
            <Link href="/" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">About</Link>
            <Link href="/dashboard/activities" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Activities</Link>
            <Link href="/dashboard/executives" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Executives</Link>
          </nav>
        )}
        {showAuthContent && authUser && (
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Dashboard</Link>
            <Link href="/dashboard/elections" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Elections</Link>
            <Link href="/dashboard/activities" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Activities</Link>
            <Link href="/dashboard/executives" className="text-sm font-bold uppercase tracking-wide hover:text-[var(--ndc-red-primary)] transition-colors">Executives</Link>
          </nav>
        )}
        <nav className="flex items-center gap-2">
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          {showAuthContent && authUser ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <User className="h-4 w-4" />
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
      {/* mobile menu */}
      {open && showAuthContent && (
        <div className="md:hidden border-t-2 border-[var(--ndc-red-primary)] bg-white/98 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 grid gap-1 text-sm">
            {!authUser && (
              <>
                <Link href="/" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Home</Link>
                <Link href="#about" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">About</Link>
                <Link href="/dashboard/activities" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Activities</Link>
                <Link href="/dashboard/executives" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Executives</Link>
              </>
            )}
            {authUser && (
              <>
                <div className="py-3 px-4 flex items-center gap-2 text-sm font-semibold border-b border-gray-200 mb-1">
                  <User className="h-4 w-4" />
                  {authUser.name}
                </div>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Dashboard</Link>
                <Link href="/dashboard/elections" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Elections</Link>
                <Link href="/dashboard/activities" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Activities</Link>
                <Link href="/dashboard/executives" onClick={() => setOpen(false)} className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase">Executives</Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="py-3 px-4 rounded-sm hover:bg-[var(--ndc-red-primary)]/10 hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase text-left flex items-center gap-2 text-[var(--ndc-red-primary)]"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
            {!authUser && (
              <div className="flex gap-2 pt-3 mt-2 border-t-2 border-[var(--ndc-red-primary)]">
                <Link href="/register" onClick={() => setOpen(false)} className="flex-1"><Button size="sm" className="w-full">Join Now</Button></Link>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1"><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


