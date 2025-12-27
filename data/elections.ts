export const positions = [
  "President",
  "Vice President",
  "Secretary",
  "Deputy Secretary",
  "Organizer",
  "Treasurer",
  "Finance Officer",
  "Communications Officer",
  "Women's Commissioner",
  "ITEC",
] as const;

export interface Candidate {
  id: string;
  name: string;
  position: typeof positions[number];
  manifesto: string;
  image?: string;
}

export const candidates: Candidate[] = [
  // Deputy Secretary
  {
    id: "exec_001",
    name: "Desmond Yeboah",
    position: "Deputy Secretary",
    manifesto: "Responsible and reliable leadership that ensures efficient documentation and transparent communication within TEIN STU.",
    image: "/candidates/desmond-yeboah.jpg"
  },

  // Finance Officer
  {
    id: "exec_002",
    name: "Yaw Suguruman Emmanuel",
    position: "Finance Officer",
    manifesto: "Ensuring financial transparency and prudent management of TEIN's resources with integrity and accountability.",
    image: "/candidates/yaw-suguruman.jpg"
  },

  // Executive Members (Update names and positions as needed)
  {
    id: "exec_003",
    name: "Executive Member 1",
    position: "President",
    manifesto: "To strengthen TEIN's presence on campus and advocate for student welfare through inclusive policies and active engagement with the NDC.",
    image: "/candidates/executive-1.jpg"
  },
  {
    id: "exec_004",
    name: "Executive Member 2",
    position: "Vice President",
    manifesto: "Supporting the President's vision while ensuring effective communication and coordination across all TEIN activities.",
    image: "/candidates/executive-2.jpg"
  },
  {
    id: "exec_005",
    name: "Executive Member 3",
    position: "Secretary",
    manifesto: "Ensuring efficient record-keeping, transparent documentation, and seamless communication within TEIN.",
    image: "/candidates/executive-3.jpg"
  },

  // Additional candidates for other positions
  {
    id: "cand_006",
    name: "Kofi Agyeman",
    position: "President",
    manifesto: "Championing progressive ideas and creating platforms for meaningful dialogue between students and party leadership."
  },
  {
    id: "cand_007",
    name: "Yaw Boateng",
    position: "Vice President",
    manifesto: "Fostering strong relationships with other student bodies and ensuring TEIN's voice is heard in university governance."
  },
  {
    id: "cand_008",
    name: "Efua Darko",
    position: "Vice President",
    manifesto: "Driving innovation in our operations and creating opportunities for members to develop leadership skills."
  },
  {
    id: "cand_009",
    name: "Akosua Frimpong",
    position: "Secretary",
    manifesto: "Digitizing TEIN's administrative processes and maintaining accurate, accessible records for all members."
  },
  {
    id: "cand_010",
    name: "Kwabena Osei",
    position: "Organizer",
    manifesto: "Mobilizing members for impactful events and ensuring every activity reflects TEIN's values and objectives."
  },
  {
    id: "cand_011",
    name: "Adjoa Mensah",
    position: "Organizer",
    manifesto: "Creating engaging programs that bring members together and strengthen our bonds as a political movement."
  },
  { id: "cand_012", name: "Samuel Adjei", position: "Treasurer", manifesto: "Ensuring financial transparency and prudent management of TEIN's resources." },
  { id: "cand_013", name: "Joyce Ankrah", position: "Treasurer", manifesto: "Implementing modern financial systems to track and optimize our budget." },
  { id: "cand_014", name: "Isaac Appiah", position: "Communications Officer", manifesto: "Amplifying TEIN's message through strategic use of social media and traditional channels." },
  { id: "cand_015", name: "Comfort Amoah", position: "Communications Officer", manifesto: "Building TEIN's brand and ensuring our achievements reach every corner of campus." },
  { id: "cand_016", name: "Grace Agyei", position: "Women's Commissioner", manifesto: "Championing gender equality and empowering female members in TEIN and beyond." },
  { id: "cand_017", name: "Blessing Asiedu", position: "Women's Commissioner", manifesto: "Creating safe spaces and opportunities for women to lead and thrive in politics." },
  { id: "cand_018", name: "Daniel Opoku", position: "ITEC", manifesto: "Leveraging technology to modernize TEIN's operations and enhance member experience." },
  { id: "cand_019", name: "Eric Boakye", position: "ITEC", manifesto: "Building digital infrastructure to connect members and streamline communication." },
];
