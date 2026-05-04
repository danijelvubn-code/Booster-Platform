import { Link, useNavigate } from "react-router-dom";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mvpPath } from "@/config/prototype-shell";
import { AlertCircle, CheckCircle2, ChevronLeft, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ScenarioState = "setup-password" | "link-expired" | "invitation-used";

const scenarios: Array<{
  state: ScenarioState;
  title: string;
  description: string;
  icon: typeof Zap;
}> = [
  {
    state: "setup-password",
    title: "Setup Password",
    description: "User completes initial password setup (MVP)",
    icon: Zap,
  },
  {
    state: "link-expired",
    title: "Link Expired",
    description: "User encounters an expired invitation link (MVP)",
    icon: AlertCircle,
  },
  {
    state: "invitation-used",
    title: "Invitation Already Used",
    description: "User tries to use a previously claimed invitation (MVP)",
    icon: CheckCircle2,
  },
];

/**
 * MVP-only first-time scenario picker. Does not import `pages/FirstTimeUser.tsx` — edit independently.
 */
const MvpFirstTimeUser = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-component-labs">
        <div className="mb-8">
          <Link
            to="/flows/mvp"
            className="inline-flex items-center gap-1 text-body-sm text-muted-foreground transition-colors ease-standard hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          >
            <ChevronLeft className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
            Back to MVP
          </Link>
          <h1 className="mt-6 text-h1 text-foreground">MVP · First-time flows</h1>
          <p className="mt-2 text-body-sm text-muted-foreground">Select a status scenario to test the MVP experience</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {scenarios.map(({ state, title, description, icon: Icon }) => (
            <button
              key={state}
              type="button"
              onClick={() => navigate(mvpPath(`/get-started?state=${state}`))}
              className={cn(
                "text-left transition-colors ease-standard",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
              )}
            >
              <Card
                className={cn(
                  "h-full cursor-pointer border-border bg-card shadow-sm",
                  "hover:border-ring hover:bg-accent/30",
                )}
              >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6">
                  <Icon className="h-icon-24 w-icon-24 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0 space-y-1">
                    <CardTitle className="text-h3 text-foreground">{title}</CardTitle>
                    <CardDescription className="text-body-sm text-muted-foreground">{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MvpFirstTimeUser;
