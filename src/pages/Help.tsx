import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Box, Layers, Shield, Sparkles } from "lucide-react";

const Help = () => (
  <div className="container space-y-6 py-8">
    <h1 className="text-3xl font-bold tracking-tight">Help</h1>
    <p className="text-muted-foreground">Learn how Booster works and get the most out of the platform.</p>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary fill-primary" />
          How Booster Routing Works
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Booster uses a simple hierarchy to manage AI model deployments across your organization.
        </p>

        <div className="bg-muted rounded-lg p-6 space-y-4">
          {[
            { icon: Shield, label: "Tenant", desc: "Your organization. One tenant per account with isolated data and billing." },
            { icon: Box, label: "Inference Endpoints", desc: "Isolated project environments, each with a stable API endpoint URL." },
            { icon: Sparkles, label: "Model Cosmos", desc: "Your model library. Browse, compare, and deploy models from a curated catalog." },
            { icon: Layers, label: "Models", desc: "Versioned model instances within an Inference Endpoint. Can be Default, Shadow, Test, or Inactive." },
            { icon: Zap, label: "Default Model", desc: "The active model serving 100% of live traffic for an Endpoint." },
          ].map((item, i) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              {i < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground mt-2 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Key Concepts</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Model Cosmos (Model Library):</strong> Browse, compare benchmarks, and deploy models from a curated catalog directly into your Endpoints.</li>
            <li><strong>Model-agnostic endpoints:</strong> Your application always calls the Endpoint URL. Booster routes to the Default model automatically.</li>
            <li><strong>Endpoint-level API keys:</strong> Keys are scoped to the Endpoint. A default key is auto-generated when an endpoint is created.</li>
            <li><strong>Shadow mode:</strong> Mirror live traffic to a candidate model for evaluation without affecting users.</li>
            <li><strong>Safe switching:</strong> Promote a model to Default with full impact analysis and confirmation.</li>
            <li><strong>Budget controls:</strong> Set per-endpoint and per-model token caps with soft and hard thresholds.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Help;
