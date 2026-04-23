import { Card } from "@/components/ui/card";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { MetricCell, MetricsRow } from "@/components/metrics";
import { Cpu, Zap } from "lucide-react";

const ComponentMetricsLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="80/100"
      scalabilityScoreNote={
        <p>
          <code className="text-caption">MetricsRow</code> arranges one or more <code className="text-caption">MetricCell</code>{" "}
          primitives: optional <code className="text-caption">icon</code> + <code className="text-caption">label</code>, or <code
            className="text-caption"
          >label</code> only. Each cell is a single surface using <code className="text-caption">bg-background</code> (no
          border) on <code className="text-caption">Card</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Row: grid grid-cols-3 gap-2, flex-1, min-w-0</li>
          <li>Cell: bg-background, rounded-sm, p-2, centered, no border</li>
          <li>Default: icon 16 in 20px touch target + text-body-sm text-muted-foreground</li>
        </ul>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-h2 text-foreground">Metrics</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Use on model cards and anywhere you need a compact three-up metric row.
          </p>
        </div>

        <Card className="p-4">
          <p className="text-label text-foreground mb-3">On card surface (typical)</p>
          <MetricsRow>
            <MetricCell icon={Zap} label="105 tok/s" />
            <MetricCell icon={Cpu} label="128k ctx" />
            <MetricCell label="€2 → €6 / 1M" />
          </MetricsRow>
        </Card>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentMetricsLab;
