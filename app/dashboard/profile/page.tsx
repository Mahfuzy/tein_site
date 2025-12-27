import { profile } from "@/data/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fields: Array<[keyof typeof profile, string]> = [
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
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Member Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(([key, label]) => (
              <div key={key} className="text-sm">
                <div className="text-neutral-500">{label}</div>
                <div className="font-medium">{profile[key]}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


