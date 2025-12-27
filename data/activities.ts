export type Activity = {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  image?: string; // path under /public/activities/
};

export const activities: Activity[] = [
  {
    id: "1",
    title: "General Meeting",
    date: "2025-11-15",
    description: "All members meeting to discuss semester agenda and projects.",
    status: "Upcoming",
    image: "/activities/general-meeting-1.jpg",
  },
  {
    id: "2",
    title: "Freshers' Welcome",
    date: "2025-10-01",
    description: "Orientation and welcome event for new members and freshers.",
    status: "Completed",
    image: "/activities/freshers-welcome-1.jpg",
  },
  {
    id: "3",
    title: "Community Outreach",
    date: "2025-12-05",
    description: "Volunteer outreach at local community centers.",
    status: "Upcoming",
    image: "/activities/student-engagement.jpg",
  },
  {
    id: "4",
    title: "Student Leadership Summit",
    date: "2025-09-20",
    description: "Annual summit bringing together TEIN leaders from across Ghana.",
    status: "Completed",
    image: "/activities/general-meeting-2.jpg",
  },
  {
    id: "5",
    title: "Freshers Integration Program",
    date: "2025-09-15",
    description: "Extended integration activities for new TEIN members.",
    status: "Completed",
    image: "/activities/freshers-welcome-2.jpg",
  },
];
