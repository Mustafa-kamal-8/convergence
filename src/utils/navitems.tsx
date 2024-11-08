import { LucideIcon } from "lucide-react";

interface NavItemType {
  name: string;
  link?: string;
  icon?: LucideIcon;
}

export const navItems: NavItemType[] = [
  {
    name: "Scheme",
    link: "/scheme",
  },
  {
    name: "Target",
    link: "/target",
  },
  {
    name: "Course",
    link: "/course",
  },
  {
    name: "TP",
    link: "/tp",
  },
  {
    name: "TC",
    link: "/tc",
  },
  {
    name: "Batch",
    link: "/batch",
  },
  {
    name: "Candidate",
    link: "/candidate",
  },
  {
    name: "Assesment",
    link: "/assesment",
  },
  {
    name: "Placement",
    link: "/placement",
  },
  {
    name: "Assessor",
    link: "/assessor",
  },
  {
    name: "Trainer",
    link: "/trainer",
  },
  {
    name: "Invoice",
    link: "/invoice",
  },
];
