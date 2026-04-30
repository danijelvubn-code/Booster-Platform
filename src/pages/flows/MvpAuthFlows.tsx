import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, KeyRound, LogIn, Zap } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Hub for all pre-auth MVP routes. Edit this page and `src/pages/mvp/*` without affecting Post-MVP flows.
 */
const MvpAuthFlows = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-component-labs">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-body-sm text-muted-foreground transition-colors ease-standard hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          >
            <ChevronLeft className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
            Back to Control Panel
          </Link>
          <h1 className="mt-6 text-h1 text-foreground">MVP</h1>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Lean product — authentication and first-time flows for the MVP experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/mvp/login")}
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
                <LogIn className="h-icon-24 w-icon-24 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-h3 text-foreground">MVP login</CardTitle>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    Email and password screen for the MVP shell
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => navigate("/mvp/first-time-user")}
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
                <Zap className="h-icon-24 w-icon-24 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-h3 text-foreground">First-time scenarios (MVP)</CardTitle>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    Invitation and password setup flows for MVP
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => navigate("/reset-password")}
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
                <KeyRound className="h-icon-24 w-icon-24 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-h3 text-foreground">Reset password</CardTitle>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    Shared reset flow; return to MVP login from the confirmation screen when testing MVP
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MvpAuthFlows;
