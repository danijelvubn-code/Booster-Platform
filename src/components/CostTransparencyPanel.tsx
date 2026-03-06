import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { models } from "@/data/mockData";
import { DollarSign, Leaf } from "lucide-react";

interface CostTransparencyPanelProps {
  modelId: string;
  monthlyBudget: string;
  guardrailsEnabled: number;
}

const CostTransparencyPanel = ({
  modelId,
  monthlyBudget,
  guardrailsEnabled,
}: CostTransparencyPanelProps) => {
  const model = models.find((m) => m.id === modelId);
  const budget = parseInt(monthlyBudget) || 0;

  const avgCostPer1K = model
    ? ((model.inputCostPer1M + model.outputCostPer1M) / 2) / 1000
    : 0;

  const estimatedMonthlyCost = (budget / 1000) * avgCostPer1K;

  return (
    <Card className="sticky top-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          Cost Estimate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {model ? (
          <>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">{model.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Input / 1M tokens</span>
              <span className="font-medium">${model.inputCostPer1M}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Output / 1M tokens</span>
              <span className="font-medium">${model.outputCostPer1M}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg response tokens</span>
              <span className="font-medium">{model.avgResponseTokens?.toLocaleString() ?? "—"}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Standardized benchmark across a generic request set.</p>
            <Separator />
          </>
        ) : (
          <p className="text-xs text-muted-foreground italic">Select a model to see cost details.</p>
        )}

        {budget > 0 && model ? (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Est. cost (token budget)</span>
            <span className="font-semibold text-primary">~${estimatedMonthlyCost.toFixed(0)}</span>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">Set a token budget to see estimated cost.</p>
        )}

        {model && (
          <>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5 text-success" />
                <span className="text-muted-foreground">Sustainability</span>
              </div>
              <span className={`font-semibold ${model.sustainability === "A" ? "text-success" : "text-warning"}`}>
                {model.sustainability}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {model.sustainability === "A"
                ? "Low carbon footprint — energy-efficient inference."
                : "Moderate carbon footprint — consider greener alternatives."}
            </p>
          </>
        )}

        {guardrailsEnabled > 0 && (
          <>
            <Separator />
            <p className="text-xs text-muted-foreground">
              {guardrailsEnabled} guardrail{guardrailsEnabled > 1 ? "s" : ""} enabled — adds ~10–50ms latency overhead per request.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CostTransparencyPanel;
