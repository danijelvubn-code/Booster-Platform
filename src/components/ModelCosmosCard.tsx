import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnergyScorePill } from "@/components/EnergyScorePill";
import { MetricCell, MetricsRow } from "@/components/metrics";
import { cn } from "@/lib/utils";
import {
  formatContextLength,
  getCodingScore,
  getMathScore,
  getModelSubline,
  getReasoningScore,
  getOverallModelScore,
  overallScoreTextClass,
  type ModelRecord,
} from "@/lib/model-metrics";
import { getModelProviderLogoSrc, getProviderInitials } from "@/lib/model-provider-logos";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Cpu, Zap } from "lucide-react";

type ModelCosmosCardProps = {
  model: ModelRecord;
  className?: string;
};

export function ModelCosmosCard({ model, className }: ModelCosmosCardProps) {
  const coding = getCodingScore(model);
  const reasoning = getReasoningScore(model);
  const math = getMathScore(model);
  const overall = getOverallModelScore(model);
  const subline = getModelSubline(model);
  const scoreClass = overallScoreTextClass(overall);
  const grade = (model.sustainability ?? "B").toUpperCase().charAt(0);

  const isDeprecated = model.status === "Deprecated";
  const statusSuffix = model.status === "Active" ? "" : ` · ${model.status}`;
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);

  return (
    <Card
      className={cn(
        "hover:border-primary/40 hover:shadow-md flex h-full flex-col gap-4 p-4 transition duration-200 ease-standard",
        isDeprecated && "opacity-50",
        className,
      )}
    >
      <div className="flex gap-3">
        <div className="bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
          <Avatar className="h-full w-full rounded-md">
            {providerLogoSrc ? (
              <AvatarImage src={providerLogoSrc} alt="" className="h-full w-full object-contain" />
            ) : null}
            <AvatarFallback className="rounded-md text-label">{getProviderInitials(model.provider)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.75">
          <div className="flex h-8 min-w-0 items-center gap-3">
            <p className="min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground/75">
              {model.name}
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <EnergyScorePill grade={grade} />
              <Tooltip delayDuration={800}>
                <TooltipTrigger asChild>
                  <p
                    className={cn(
                      "min-w-9 shrink-0 cursor-default text-left text-lg font-semibold leading-tight",
                      scoreClass,
                    )}
                  >
                    {overall > 0 ? `${overall}%` : "—"}
                  </p>
                </TooltipTrigger>
                <TooltipContent side="top">Aggregated benchmark score</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <p className="text-body-sm text-muted-foreground">
            {subline}
            {statusSuffix}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-14 shrink-0" aria-hidden />
        <div className="text-body-sm text-muted-foreground flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <span className="text-body-sm-strong text-foreground/75 whitespace-nowrap">Coding {coding}%</span>
          <span className="bg-border h-4 w-px shrink-0" aria-hidden />
          <span className="whitespace-nowrap">Reasoning {reasoning}%</span>
          <span className="bg-border h-4 w-px shrink-0" aria-hidden />
          <span className="whitespace-nowrap">Math {math}%</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-14 shrink-0" aria-hidden />
        <MetricsRow>
          <MetricCell icon={Zap} label={`${model.tokensPerSecond} tok/s`} />
          <MetricCell icon={Cpu} label={formatContextLength(model.contextLength)} />
          <MetricCell
            label={`€${model.inputCostPer1M} → €${model.outputCostPer1M} / 1M`}
          />
        </MetricsRow>
      </div>
    </Card>
  );
}
