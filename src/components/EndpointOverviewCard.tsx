import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Box, Link2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { endpoints } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { endpointDetailPath, endpointEditPath } from "@/lib/app-paths";

export type EndpointOverviewRecord = (typeof endpoints)[number];

export type EndpointOverviewCardVariant = "full" | "basic";

const endpointTypeBadgeProps = (type: string) => {
  if (type === "Production") return { variant: "success" as const, appearance: "ghost" as const };
  if (type === "POC") return { variant: "warning" as const, appearance: "ghost" as const };
  return { variant: "secondary" as const, appearance: "ghost" as const };
};

type EndpointOverviewCardProps = {
  ep: EndpointOverviewRecord;
  className?: string;
  /** `basic`: icon, name, URL, model line (phase 1). `full`: badges, tokens, budget bar (phase 2). */
  variant?: EndpointOverviewCardVariant;
};

function EndpointOverviewCardBasic({ ep, className }: { ep: EndpointOverviewRecord; className?: string }) {
  const { track } = useAuth();
  const detailHref = endpointDetailPath(ep.id, track);

  return (
    <Card
      className={cn(
        "border border-border bg-card shadow-xs transition duration-200 ease-standard hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="p-4">
        <Link
          to={detailHref}
          className="flex flex-col gap-3 text-left outline-none ring-offset-background focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex min-w-0 items-start gap-2">
            <Box className="mt-0.5 h-icon-20 w-icon-20 shrink-0 text-primary" aria-hidden />
            <span className="min-w-0 flex-1 truncate text-body-strong text-foreground">{ep.name}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1">
            <Link2 className="h-icon-16 w-icon-16 shrink-0 text-muted-foreground" aria-hidden />
            <p className="min-w-0 truncate text-body-sm text-muted-foreground">{ep.endpoint}</p>
          </div>
          <p className="text-body-sm">
            <span className="text-muted-foreground">Model:</span>{" "}
            <span className={ep.defaultDeployment ? "text-foreground/75" : "text-muted-foreground"}>
              {ep.defaultDeployment || "—"}
            </span>
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}

function EndpointOverviewCardFull({ ep, className }: { ep: EndpointOverviewRecord; className?: string }) {
  const { track } = useAuth();
  const detailHref = endpointDetailPath(ep.id, track);
  const editHref = endpointEditPath(ep.id, track);
  const typeProps = endpointTypeBadgeProps(ep.type);
  const progressValue = Math.min(ep.budgetUsed, 100);
  const overBudget = ep.budgetUsed > 100;

  return (
    <Card
      className={cn(
        "border border-border bg-card shadow-xs transition duration-200 ease-standard hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <Link
            to={detailHref}
            className="flex min-w-0 flex-1 flex-col gap-4 text-left outline-none ring-offset-background focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-body-strong text-foreground">{ep.name}</span>
                <Badge
                  variant={typeProps.variant}
                  appearance={typeProps.appearance}
                  size="24"
                  className="rounded-md border-0"
                >
                  {ep.type}
                </Badge>
              </div>
              <div className="flex min-w-0 items-start gap-1">
                <Link2 className="mt-0.5 h-icon-16 w-icon-16 shrink-0 text-muted-foreground" aria-hidden />
                <p className="truncate text-body-sm text-muted-foreground">{ep.endpoint}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                appearance="ghost"
                size="24"
                className="rounded-md"
                leadingIcon={<Box className="h-icon-16 w-icon-16 text-muted-foreground" aria-hidden />}
              >
                {ep.defaultDeployment}
              </Badge>
              <Badge variant="secondary" appearance="ghost" size="24" className="rounded-md">
                In: {ep.inputTokens.toLocaleString()}
              </Badge>
              <Badge variant="secondary" appearance="ghost" size="24" className="rounded-md">
                Out: {ep.outputTokens.toLocaleString()}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-body-sm">
                <span className="text-muted-foreground">
                  Budget: {ep.monthlyBudgetEur.toLocaleString()} € / month
                </span>
                <span
                  className={cn(
                    "text-body-sm-strong",
                    overBudget ? "text-destructive" : "text-foreground",
                  )}
                >
                  {ep.budgetUsed}% used
                </span>
              </div>
              <Progress value={progressValue} tone="ramp" />
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="relative z-10 shrink-0"
                aria-label={`Actions for ${ep.name}`}
              >
                <MoreHorizontal className="h-icon-16 w-icon-16" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to={detailHref}>View endpoint</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={editHref}>Edit endpoint</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Overview / portfolio endpoint tile. Use `variant="basic"` for phase 1 (compact identity + model line)
 * or `variant="full"` for phase 2 (environment badge, actions, token chips, budget bar).
 */
export function EndpointOverviewCard({
  ep,
  className,
  variant = "full",
}: EndpointOverviewCardProps) {
  if (variant === "basic") {
    return <EndpointOverviewCardBasic ep={ep} className={className} />;
  }
  return <EndpointOverviewCardFull ep={ep} className={className} />;
}

export { EndpointOverviewCardBasic, EndpointOverviewCardFull };
