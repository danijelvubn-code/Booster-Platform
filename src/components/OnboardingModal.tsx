import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

const OnboardingModal = () => {
  const { user, dismissOnboarding } = useAuth();
  const isOpen = user?.isFirstLogin ?? false;

  return (
    <Dialog open={isOpen} onOpenChange={() => dismissOnboarding()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-primary fill-primary" />
            How Booster Works
          </DialogTitle>
          <DialogDescription>
            Understand the Booster architecture in 30 seconds
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Visual diagram */}
          <div className="bg-muted rounded-lg p-6 space-y-3">
            {[
              { label: "Tenant", desc: "Your organization account", color: "bg-primary text-primary-foreground" },
              { label: "Inference Endpoints", desc: "Isolated projects with API endpoint URLs", color: "bg-primary/80 text-primary-foreground" },
              { label: "Model Cosmos", desc: "Your model library — browse, compare & deploy", color: "bg-primary/60 text-primary-foreground" },
              { label: "Models", desc: "Versioned model instances in an inference endpoint", color: "bg-primary/50 text-primary-foreground" },
              { label: "Default", desc: "Serves 100% of live traffic", color: "bg-primary/40 text-primary-foreground" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold ${step.color}`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.desc}</div>
                </div>
                {i < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Browse available models in <strong>Model Cosmos</strong> — your model library. 
            Each <strong>Inference Endpoint</strong> has one stable URL. The <strong>Default</strong> model 
            serves all live traffic. Your input data and model responses are <strong>never</strong> used 
            to train our models and will not be shared with other users or third parties.
          </p>
        </div>

        <Button onClick={dismissOnboarding} className="w-full">
          Got it, let's go!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
