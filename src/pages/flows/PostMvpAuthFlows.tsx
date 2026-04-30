import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, KeyRound, LogIn, UserPlus, Zap } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

/**
 * Hub for post-MVP (marketable) auth flows. Independent from `MvpAuthFlows` and `src/pages/mvp/*`.
 */
const PostMvpAuthFlows = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const goLoginFlow = () => {
    navigate("/login");
  };

  const goSkipLogin = () => {
    login("user@booster.com", "Booster123#");
    navigate("/overview");
  };

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
          <h1 className="mt-6 text-h1 text-foreground">Post MVP</h1>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Full product — richer authentication, onboarding, and test shortcuts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={goLoginFlow}
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
                  <CardTitle className="text-h3 text-foreground">Login flow</CardTitle>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    Standard post-MVP screen — email, password, and verification where applicable
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>

          <button
            type="button"
            onClick={goSkipLogin}
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
                  <CardTitle className="text-h3 text-foreground">Skip login</CardTitle>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    Jump straight into the platform with a test account for local exploration
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => navigate("/first-time-user")}
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
                <UserPlus className="h-icon-24 w-icon-24 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-h3 text-foreground">First-time scenarios</CardTitle>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    Invitation, password setup, and status screens for the full product
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
                    Request and confirm flows; use back links to return to post-MVP login
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

export default PostMvpAuthFlows;
