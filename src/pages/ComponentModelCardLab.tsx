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
          <code className="text-caption">ModelCosmosCard</code> has three variants: <code className="text-caption">variant=&quot;basic&quot;</code> (phase
          1 — name, provider, description), <code className="text-caption">variant=&quot;full&quot;</code> (phase 2 — <code className="text-caption">Avatar</code>, energy
          score, benchmark row, and <code className="text-caption">MetricsRow</code>),           and <code className="text-caption">variant=&quot;catalog&quot;</code> (cosmos
          card: logo, name, labeled modalities vs endpoint, per-token in/out in <code className="text-caption">MetricCell</code> row). Scores
          in the full variant come from <code className="text-caption">model-metrics</code>.
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
            Post-MVP model cosmos uses <code className="text-caption">variant=&quot;catalog&quot;</code>. Use <code className="text-caption">variant=&quot;basic&quot;</code> in phase 1. Use <code className="text-caption">variant=&quot;full&quot;</code> for the detailed
            tile with metrics. Wrap the card in a <code className="text-caption">Link</code> for navigation to detail.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-h3 text-foreground">Basic</h2>
          <p className="text-caption text-muted-foreground">Name, provider, description — no avatar or metrics.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {activeExample ? <ModelCosmosCard model={activeExample} variant="basic" /> : null}
          {deprecatedExample ? <ModelCosmosCard model={deprecatedExample} variant="basic" /> : null}
        </div>

        <div className="space-y-2 pt-2">
          <h2 className="text-h3 text-foreground">Full</h2>
          <p className="text-caption text-muted-foreground">Avatar, scores, energy pill, and metrics row.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {activeExample ? <ModelCosmosCard model={activeExample} variant="full" /> : null}
          {deprecatedExample ? <ModelCosmosCard model={deprecatedExample} variant="full" /> : null}
        </div>

        <div className="space-y-2 pt-2">
          <h2 className="text-h3 text-foreground">Catalog</h2>
          <p className="text-caption text-muted-foreground">
            <span className="text-body-sm-strong">Modalities</span> (icon chips) vs <span className="text-body-sm-strong">Endpoint</span> (outline
            pill), left-aligned on the card surface; per-token in/out still uses <code className="text-caption">MetricCell</code> light boxes like the
            full card.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {activeExample ? <ModelCosmosCard model={activeExample} variant="catalog" /> : null}
          {deprecatedExample ? <ModelCosmosCard model={deprecatedExample} variant="catalog" /> : null}
        </div>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentModelCardLab;
