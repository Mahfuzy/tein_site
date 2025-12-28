"use client";

import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/context/AppContext";

type ProfileField = [keyof User, string];

const fields: ProfileField[] = [
  ["institution", "Institution"],
  ["surname", "Surname"],
  ["firstName", "First Name"],
  ["otherNames", "Other Names"],
  ["gender", "Gender"],
  ["dob", "Date of Birth"],
  ["constituency", "Constituency"],
  ["homeTown", "Home Town/Branch"],
  ["region", "Region"],
  ["partyPosition", "Party Position"],
  ["level", "Level"],
  ["programme", "Programme"],
  ["hallHostel", "Hall/Hostel"],
  ["roomNo", "Room No."],
  ["studentId", "Student ID"],
  ["voterId", "Voter ID"],
  ["partyMembershipNo", "Party Membership No."],
  ["phone", "Phone No."],
  ["email", "Email"],
];

export default function ProfilePage() {
  const { authUser } = useApp();

  if (!authUser) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Card>
          <CardContent className="py-8 text-center text-neutral-500">
            Please log in to view your profile.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* User Avatar and Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Member Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Passport Photo */}
            <div className="shrink-0">
              {authUser.passportPhoto ? (
                <img
                  src={authUser.passportPhoto}
                  alt="Passport Photo"
                  className="w-32 h-32 object-cover rounded-lg ring-2 ring-[var(--ndc-red-primary)]"
                />
              ) : (
                <div className="w-32 h-32 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-4xl font-bold">
                  {authUser.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-bold">{authUser.name}</h2>
              <div className="text-sm space-y-1">
                <p><span className="text-neutral-500">Member ID:</span> <span className="font-medium">{authUser.memberId}</span></p>
                <p><span className="text-neutral-500">Role:</span> <span className="font-medium">{authUser.role}</span></p>
                <p><span className="text-neutral-500">Status:</span> <span className={`font-medium ${authUser.status === 'Active' ? 'text-green-600' : authUser.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{authUser.status}</span></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Member Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(([key, label]) => {
              const value = authUser[key];
              return (
                <div key={key} className="text-sm">
                  <div className="text-neutral-500">{label}</div>
                  <div className="font-medium">{value || "—"}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Signature Section */}
      {authUser.signature && (
        <Card>
          <CardHeader>
            <CardTitle>Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <img
                src={authUser.signature}
                alt="Signature"
                className="max-h-24 border rounded bg-white p-2"
              />
              {authUser.signatureDate && (
                <p className="text-sm text-neutral-500">
                  Signed on: {authUser.signatureDate}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
