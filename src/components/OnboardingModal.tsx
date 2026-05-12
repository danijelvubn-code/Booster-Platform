import type { LucideIcon } from "lucide-react";
import { ArrowRight, BadgeCheck, BookOpen, Box, Globe2, Network, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mvpPath, postMvpPath } from "@/config/prototype-shell";

type OnboardingRowProps = {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  onNavigate: () => void;
};

function OnboardingRow({ to, icon: Icon, title, description, onNavigate }: OnboardingRowProps) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card py-2 pl-2 pr-3 shadow-xs",
        "transition-colors ease-standard hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <span className="flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary shadow-xs">
        <Icon className="h-icon-24 w-icon-24" aria-hidden />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block font-semibold text-body-sm leading-normal text-foreground">{title}</span>
        <span className="block text-body-sm leading-normal text-muted-foreground">{description}</span>
      </span>
      <span className="flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-md text-primary" aria-hidden>
        <ArrowRight className="h-icon-24 w-icon-24" />
      </span>
    </Link>
  );
}

const OnboardingModal = () => {
  const { user, dismissOnboarding, track } = useAuth();
  const isOpen = user?.isFirstLogin ?? false;

  const organizationPath = track === "mvp" ? mvpPath("/overview") : postMvpPath("/account");
  const endpointsPath = track === "mvp" ? mvpPath("/overview") : postMvpPath("/endpoints");
  const cosmosPath = track === "mvp" ? mvpPath("/cosmos") : postMvpPath("/cosmos");

  return (
    <Dialog open={isOpen} onOpenChange={(next) => !next && dismissOnboarding()}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="flex max-h-screen max-w-modal-lg flex-col gap-0 overflow-hidden bg-background p-0 shadow-lg sm:rounded-xl [&>button]:hidden"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8 pb-6">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-h2 font-bold leading-snug tracking-tight text-foreground">
              Welcome to the booster
            </DialogTitle>
            <DialogDescription className="text-body-sm leading-normal text-muted-foreground normal-case">
              Here&apos;s a quick overview to get you started.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <OnboardingRow
              to={organizationPath}
              icon={BookOpen}
              title="Organization"
              description="Your shared workspace where users collaborate and usage is managed"
              onNavigate={dismissOnboarding}
            />
            <OnboardingRow
              to={endpointsPath}
              icon={Network}
              title="Endpoints"
              description="Isolated workloads with stable API URL"
              onNavigate={dismissOnboarding}
            />
            <OnboardingRow
              to={cosmosPath}
              icon={Globe2}
              title="Model Cosmos"
              description="Browse and compare models before assigning them to endpoints"
              onNavigate={dismissOnboarding}
            />
            <OnboardingRow
              to={cosmosPath}
              icon={Box}
              title="Models"
              description="Model versions assigned to an endpoint"
              onNavigate={dismissOnboarding}
            />
          </div>

          <p className="text-body-sm leading-relaxed text-foreground">
            Browse available models in Model Cosmos — your model library. Each Inference Endpoint has one stable URL.
            The Default model serves all live traffic. Your input data and model responses are never used to train our models
            and will not be shared with other users or third parties.
          </p>

          <div className="flex gap-3 rounded-lg bg-muted px-4 py-3 text-foreground">
            <ShieldCheck className="mt-0.5 h-icon-16 w-icon-16 shrink-0 text-primary" aria-hidden />
            <p className="min-w-0 flex-1 text-body-sm leading-relaxed text-foreground">
              Your input data and model responses are never used to train our models and will not be shared with other users
              or third parties.
            </p>
            <BadgeCheck className="mt-0.5 h-icon-16 w-icon-16 shrink-0 text-success" aria-hidden />
          </div>
        </div>

        <div className="shrink-0 border-t border-border bg-background p-8 pt-6">
          <Button
            type="button"
            variant="default"
            size="lg"
            className="w-full rounded-lg bg-primary font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary"
            onClick={() => dismissOnboarding()}
          >
            Got it, let&apos;s go!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
