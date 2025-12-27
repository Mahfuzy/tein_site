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

  return (
    <div className="mx-auto max-w-md p-6">
      <Card>
        <CardHeader>
          <CardTitle>Member Login</CardTitle>
          <p className="text-sm text-neutral-500 mt-2">
            Demo credentials: BR\STU\25\00001 / password123
          </p>
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
    </div>
  );
}


