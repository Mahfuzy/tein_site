export type Executive = {
  role: string;
  name: string;
  image?: string; // path under /public/executives/
};

export const executives: Executive[] = [
  { role: "President", name: "Ngmenyele Charles", image: "/executives/president.jpg" },
  { role: "Vice President", name: "Seidu Abdul-Rahman", image: "/executives/vice.jpg" },
  { role: "Secretary", name: "Dery Charles Anateraazie", image: "/executives/secretary.jpg" },
  { role: "Deputy Secretary", name: "Desmond Yeboah", image: "/executives/deputy-secretary.jpg" },
  { role: "Financial Officer", name: "Yaw Suguruman Emmanuel", image: "/executives/finance.jpg" },
  { role: "Deputy Financial Officer", name: "Mohammed Alhassan", image: "/executives/deputy-finance.jpg" },
  { role: "Organizer", name: "Kipo Umar Bawindmgaa", image: "/executives/organizer.jpg" },
  { role: "Deputy Organizer", name: "Ngnabiba Magaah Enoch", image: "/executives/deputy-organizer.jpg" },
  { role: "Women’s Commissioner", name: "Musah Niamatu", image: "/executives/women.jpg" },
  { role: "First Deputy Women Organizer", name: "Agongo Francisca Yineboremah", image: "/executives/deputy-women-1.jpg" },
  { role: "Second Deputy Women Organizer", name: "Abdulai Nafisah", image: "/executives/deputy-women-2.jpg" },
  { role: "Research Coordinator", name: "Luwal Eric", image: "/executives/research.jpg" },
  { role: "Communications Officer", name: "Iddrisu Abubakari", image: "/executives/communications.jpg" },
  { role: "Deputy Communications Officer", name: "Alhassan Ibrahim", image: "/executives/deputy-communications.jpg" },
  { role: "Treasurer", name: "Kpetizie Boorobaa Evans", image: "/executives/treasurer.jpg" },
  { role: "Deputy Treasurer", name: "Yidana Magalin", image: "/executives/deputy-treasurer.jpg" },
  { role: "ITEC", name: "Selorm Dodoo", image: "/executives/itec.jpg" },
];


