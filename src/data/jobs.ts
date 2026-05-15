export type JobType = "Full-time" | "Part-time";
export type Shift = "Day" | "Night" | "Weekend" | "Evening";

export type Job = {
  id: string;
  title: string;
  location: string;
  type: JobType;
  shifts: Shift[];
  blurb: string;
};

export const jobs: Job[] = [
  {
    id: "security-officer",
    title: "Security Officer",
    location: "Multiple locations (GTA)",
    type: "Full-time",
    shifts: ["Day", "Night", "Weekend"],
    blurb: "Uniformed presence for commercial, residential, and retail programs. Strong customer service mindset required.",
  },
  {
    id: "mobile-patrol",
    title: "Mobile Patrol Officer",
    location: "Greater Toronto Area",
    type: "Full-time",
    shifts: ["Night", "Evening"],
    blurb: "Route-based patrols, incident response, and detailed reporting. Valid driver's license required.",
  },
  {
    id: "site-supervisor",
    title: "Site Supervisor",
    location: "Toronto",
    type: "Full-time",
    shifts: ["Day", "Evening"],
    blurb: "Lead on-site standards, coach officers, and partner with clients on continuous improvement.",
  },
  {
    id: "account-manager",
    title: "Account Manager",
    location: "Toronto (hybrid)",
    type: "Full-time",
    shifts: ["Day"],
    blurb: "Client relationships, service audits, and program design for growing accounts.",
  },
  {
    id: "receptionist-admin",
    title: "Receptionist / Admin",
    location: "18 Wynford Drive, Toronto",
    type: "Part-time",
    shifts: ["Day"],
    blurb: "Front-desk professionalism, scheduling support, and coordination with operations.",
  },
];
