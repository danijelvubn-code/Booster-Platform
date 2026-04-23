import { Link } from "react-router-dom";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

const ComponentToastLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="84/100"
      scalabilityScoreNote={
        <p>
          Radix Toast primitives with CVA on the root: default border/background, semantic variants with /30 borders and
          /12 fills (success, warning, info, destructive group), swipe motion hooks, and open/close animations. ToastTitle
          and ToastDescription use body-strong and muted text; ToastAction mirrors input-adjacent control styling;
          ToastClose uses ring tokens and h-icon-16 X. Queueing and toast() live in use-toast; Toaster in toaster.tsx mounts
          Provider, maps queued toasts, and renders ToastViewport. Sonner is a separate host (see Sonner lab).
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>ToastViewport: fixed stacking, z-50, responsive bottom-right on sm+, md:max-w-modal-md</li>
          <li>Toast root: rounded-md border p-6 pr-8 shadow-lg, variant surfaces</li>
          <li>ToastTitle: text-body-sm-strong text-foreground; ToastDescription: text-body-sm text-muted-foreground</li>
          <li>ToastAction: h-control-sm, border-input, text-label, hover accent; destructive group overrides</li>
          <li>ToastClose: absolute corner, ring on focus, X h-icon-16</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix swipe CSS variables and translate utilities on the toast root</li>
          <li>Lab triggers use Button; Toaster is mounted in app shell, not this page</li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to="/overview">
            <ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Toast</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Ephemeral notices from <span className="text-foreground">@radix-ui/react-toast</span>, rendered by the root{" "}
          <span className="text-foreground">Toaster</span> and triggered with <span className="text-foreground">toast()</span> from{" "}
          <span className="text-foreground">useToast</span>. For the Sonner-based host, see the Sonner lab.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basics</CardTitle>
          <CardDescription>Title only, or title with description.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => toast({ title: "Something happened." })}>
            Title only
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: "Deployment scheduled",
                description: "We will notify you when the rollout finishes.",
              })
            }
          >
            Title + description
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Semantic variants</CardTitle>
          <CardDescription>
            Surfaces use semantic border and 12% alpha fills (same idea as Alert). Destructive keeps the{" "}
            <span className="text-foreground">destructive</span> group for action and close affordances.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                variant: "success",
                title: "Saved",
                description: "Your endpoint configuration is up to date.",
              })
            }
          >
            Success
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                variant: "warning",
                title: "Quota warning",
                description: "You are approaching the monthly spend cap.",
              })
            }
          >
            Warning
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                variant: "info",
                title: "Maintenance window",
                description: "Regional failover drills start at 02:00 UTC.",
              })
            }
          >
            Info
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                variant: "destructive",
                title: "Request failed",
                description: "We could not reach the billing service. Try again.",
              })
            }
          >
            Destructive
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">With action</CardTitle>
          <CardDescription>
            <span className="text-foreground">ToastAction</span> requires <span className="text-foreground">altText</span> for
            accessibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: "File removed",
                description: "It can be restored from trash for 30 days.",
                action: <ToastAction altText="Undo remove">Undo</ToastAction>,
              })
            }
          >
            Default + undo
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                variant: "destructive",
                title: "Payment declined",
                description: "Update your card to continue.",
                action: <ToastAction altText="Open billing">Billing</ToastAction>,
              })
            }
          >
            Destructive + action
          </Button>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentToastLab;
