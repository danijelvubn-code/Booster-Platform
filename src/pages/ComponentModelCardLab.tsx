import { Link } from "react-router-dom";

import { ModelCosmosCard } from "@/components/ModelCosmosCard";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { models } from "@/data/mockData";

const activeExample = models.find((m) => m.id === "m-9");
const deprecatedExample = models.find((m) => m.status === "Deprecated");

const ComponentModelCardLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="78/100"
      scalabilityScoreNote={
        <p>
          <code className="text-caption">ModelCosmosCard</code> composes the shared <code className="text-caption">Card</code>{" "}
          surface with provider <code className="text-caption">Avatar</code>, headline row, benchmark chips, and a{" "}
          <code className="text-caption">MetricsRow</code> for throughput, context, and pricing. Scores and copy are derived
          from <code className="text-caption">ModelRecord</code> helpers in <code className="text-caption">model-metrics</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Card: gap-4, p-4, hover:border-primary/40, transition + shadow on hover</li>
          <li>Avatar tile: bg-muted/50, h-14 w-14, rounded-md, p-2; inner avatar h-10 w-10</li>
          <li>Title stack: gap-0.75 between title row and subline; title row h-8, gap-3</li>
          <li>Metrics row: w-14 spacer column aligns with avatar width</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/cards">
              Card
            </Link>
            {" — "}root surface and padding.
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/avatars">
              Avatar
            </Link>
            {" — "}provider initials fallback.
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/sections/metrics">
              Metrics
            </Link>
            {" — "}
            <code className="text-caption">MetricsRow</code> / <code className="text-caption">MetricCell</code> row.
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/sections/energy-score">
              Energy score
            </Link>
            {" — "}
            <code className="text-caption">EnergyScorePill</code> beside overall %.
          </li>
        </ul>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-h2 text-foreground">Model card</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Cosmos grid tile: model identity, scores, sustainability pill, and compact metrics. Wrap in a link on the catalog
            page for navigation to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {activeExample ? <ModelCosmosCard model={activeExample} /> : null}
          {deprecatedExample ? <ModelCosmosCard model={deprecatedExample} /> : null}
        </div>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentModelCardLab;
