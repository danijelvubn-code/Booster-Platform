import type { LucideIcon } from "lucide-react";
import { BarChart3, Eye, LayoutDashboard, Sparkles, Wand2 } from "lucide-react";

export type PrimaryNavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  alsoActive: string[];
  tooltip: string;
};

/** Top header primary links (Endpoints list lives under Overview / in-app flows, not here). */
export const primaryNavItems: PrimaryNavItem[] = [
  { label: "Overview", path: "/overview", icon: LayoutDashboard, alsoActive: [], tooltip: "" },
  {
    label: "Cosmos",
    path: "/cosmos",
    icon: Sparkles,
    alsoActive: [],
    tooltip: "Your model library — browse, compare & deploy models",
  },
  { label: "Observe", path: "/observe", icon: Eye, alsoActive: [], tooltip: "" },
  {
    label: "Metrics",
    path: "/metrics",
    icon: BarChart3,
    alsoActive: [],
    tooltip: "Detailed platform metrics and trends",
  },
  { label: "Optimize", path: "/recommendations", icon: Wand2, alsoActive: [], tooltip: "" },
];
