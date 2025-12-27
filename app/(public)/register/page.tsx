"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const { registerUser } = useApp();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    institution: "",
    surname: "",
    firstName: "",
    otherNames: "",
    gender: "Male",
    dob: "",
    constituency: "",
    homeTown: "",
    region: "",
    partyPosition: "",
    level: "",
    programme: "",
    hallHostel: "",
    roomNo: "",
    studentId: "",
    voterId: "",
    partyMembershipNo: "",
    phone: "",
    email: "",
    role: "Member",
    password: "",
    signature: "",
    signatureDate: "",
  });
  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.surname}`.trim();

    // Pass all form data to registerUser
    registerUser({
      name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role as any,
      passportPhoto: passportPhoto || undefined,
      // Registration details
      institution: form.institution,
      surname: form.surname,
      firstName: form.firstName,
      otherNames: form.otherNames,
      gender: form.gender,
      dob: form.dob,
      constituency: form.constituency,
      homeTown: form.homeTown,
      region: form.region,
      partyPosition: form.partyPosition,
      level: form.level,
      programme: form.programme,
      hallHostel: form.hallHostel,
      roomNo: form.roomNo,
      studentId: form.studentId,
      voterId: form.voterId,
      partyMembershipNo: form.partyMembershipNo,
      signature: form.signature,
      signatureDate: form.signatureDate,
    });

    toast.success("Registration submitted successfully");
    setSubmitted(true);
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>TEIN Membership Registration</CardTitle>
              <p className="text-sm text-neutral-500">Please fill all required fields.</p>
            </div>
            <div>
              <input
                type="file"
                id="passport-photo-input"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label
                htmlFor="passport-photo-input"
                className="w-24 h-24 border-2 border-dashed border-neutral-300 rounded bg-neutral-50 flex items-center justify-center text-xs text-neutral-400 cursor-pointer hover:border-[var(--ndc-red-primary)] hover:bg-neutral-100 transition-colors overflow-hidden"
              >
                {passportPhoto ? (
                  <img src={passportPhoto} alt="Passport" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-center px-2">Click to upload<br />Passport Photo</span>
                )}
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <p className="text-sm">Your registration is pending approval by the executives.</p>
          ) : (
            <form className="space-y-6" onSubmit={submit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Institution</Label>
                  <Input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
                </div>
                <div>
                  <Label>Constituency</Label>
                  <Input value={form.constituency} onChange={(e) => setForm({ ...form, constituency: e.target.value })} />
                </div>
                <div>
                  <Label>Surname</Label>
                  <Input value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
                </div>
                <div>
                  <Label>First Name</Label>
                  <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                  <Label>Other Names</Label>
                  <Input value={form.otherNames} onChange={(e) => setForm({ ...form, otherNames: e.target.value })} />
                </div>
                <div>
                  <Label>Gender</Label>
                  <div className="flex items-center gap-4 h-10">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="gender" checked={form.gender === "Male"} onChange={() => setForm({ ...form, gender: "Male" })} />
                      Male
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="gender" checked={form.gender === "Female"} onChange={() => setForm({ ...form, gender: "Female" })} />
                      Female
                    </label>
                  </div>
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                </div>
                <div>
                  <Label>Home Town/Branch</Label>
                  <Input value={form.homeTown} onChange={(e) => setForm({ ...form, homeTown: e.target.value })} />
                </div>
                <div>
                  <Label>Region</Label>
                  <Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Any party position held/holding</Label>
                  <Input value={form.partyPosition} onChange={(e) => setForm({ ...form, partyPosition: e.target.value })} />
                </div>
                <div>
                  <Label>Level</Label>
                  <Input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
                </div>
                <div>
                  <Label>Programme</Label>
                  <Input value={form.programme} onChange={(e) => setForm({ ...form, programme: e.target.value })} />
                </div>
                <div>
                  <Label>Hall/Hostel</Label>
                  <Input value={form.hallHostel} onChange={(e) => setForm({ ...form, hallHostel: e.target.value })} />
                </div>
                <div>
                  <Label>Room No.</Label>
                  <Input value={form.roomNo} onChange={(e) => setForm({ ...form, roomNo: e.target.value })} />
                </div>
                <div>
                  <Label>Student ID</Label>
                  <Input value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} />
                </div>
                <div>
                  <Label>Voter ID</Label>
                  <Input value={form.voterId} onChange={(e) => setForm({ ...form, voterId: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Party Membership Number</Label>
                  <Input value={form.partyMembershipNo} onChange={(e) => setForm({ ...form, partyMembershipNo: e.target.value })} />
                </div>
                <div>
                  <Label>Phone No.</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Password</Label>
                  <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
              </div>

              <div className="rounded-md border border-neutral-200 p-4 text-sm leading-relaxed bg-neutral-50">
                <blockquote>
                  "By appending your signature on this form you agree to abide by the rules and regulations of TEIN."
                </blockquote>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Signature</Label>
                  <Input
                    placeholder="Type full name as signature"
                    value={form.signature}
                    onChange={(e) => setForm({ ...form, signature: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={form.signatureDate}
                    onChange={(e) => setForm({ ...form, signatureDate: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Submit</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



