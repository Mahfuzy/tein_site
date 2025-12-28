"use client";

import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const demoCredentials = [
  { role: "President", name: "Ada Lovelace", memberId: "BR\\STU\\25\\00001", password: "password123" },
  { role: "Vice President", name: "Alan Turing", memberId: "BR\\STU\\25\\00002", password: "password123" },
  { role: "Secretary", name: "Grace Hopper", memberId: "BR\\STU\\25\\00003", password: "password123" },
  { role: "ITEC", name: "Tim Berners-Lee", memberId: "BR\\STU\\25\\00004", password: "password123" },
  { role: "Member", name: "Linus Member", memberId: "BR\\STU\\25\\00005", password: "password123" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!memberId || !password) {
      setError("Please enter both Member ID and password");
      return;
    }

    const success = login(memberId, password);

    if (success) {
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      setError("Invalid Member ID or password. Please try again.");
      toast.error("Login failed");
    }
  };

  const fillCredentials = (memberId: string, password: string) => {
    setMemberId(memberId);
    setPassword(password);
    setError("");
  };

  return (
    <div className="mx-auto max-w-md p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Member Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <Label>Member ID</Label>
              <Input
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="e.g. BR\STU\25\00001"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <Link href="#" className="text-neutral-600 hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <div className="text-center text-sm text-neutral-500">
              Don't have an account? <Link href="/register" className="text-red-600 hover:underline">Register here</Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="border-dashed border-2 border-[var(--ndc-red-primary)]/30 bg-[var(--ndc-red-primary)]/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Demo Credentials</CardTitle>
          <p className="text-xs text-neutral-500">Click any account to auto-fill the login form</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {demoCredentials.map((cred) => (
            <button
              key={cred.memberId}
              type="button"
              onClick={() => fillCredentials(cred.memberId, cred.password)}
              className="w-full text-left p-2 rounded border border-neutral-200 bg-white hover:border-[var(--ndc-red-primary)] hover:bg-[var(--ndc-red-primary)]/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm">{cred.role}</span>
                  <span className="text-neutral-500 text-xs ml-2">({cred.name})</span>
                </div>
                <span className="text-xs text-neutral-400 group-hover:text-[var(--ndc-red-primary)]">Click to fill</span>
              </div>
              <div className="text-xs text-neutral-500 mt-1 font-mono">
                {cred.memberId}
              </div>
            </button>
          ))}
          <p className="text-xs text-neutral-400 text-center pt-2">
            All accounts use password: <code className="bg-neutral-100 px-1 rounded">password123</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


