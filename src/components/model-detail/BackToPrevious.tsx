import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export type BackToPreviousProps = {
  to: string;
  /** Link label (default: catalog copy). */
  label?: string;
};

/** Ghost button + router link that navigates back to a parent list or hub. */
export function BackToPrevious({ to, label = "All models" }: BackToPreviousProps) {
  return (
    <Button asChild variant="ghost" size="sm" className="-ml-3">
      <Link to={to}>
        <ArrowLeft className="mr-1 h-icon-16 w-icon-16" aria-hidden />
        {label}
      </Link>
    </Button>
  );
}
