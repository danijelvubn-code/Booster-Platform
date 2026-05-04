import { Link } from "react-router-dom";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { EndpointOverviewCard } from "@/components/EndpointOverviewCard";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { endpoints } from "@/data/mockData";

const basicShowcase = endpoints;

const fullHighUsage = [...endpoints]
  .filter((e) => e.id !== "sp-default")
  .sort((a, b) => b.budgetUsed - a.budgetUsed)
  .slice(0, 2);

const fullLowerUsage =
  [...endpoints]
    .filter((e) => e.id !== "sp-default" && e.defaultDeployment.length > 0)
    .sort((a, b) => a.budgetUsed - b.budgetUsed)[0] ?? endpoints[0];

const ComponentEndpointCardLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="76/100"
      scalabilityScoreNote={
        <p>
          <code className="text-caption">EndpointOverviewCard</code> has two variants:{" "}
          <code className="text-caption">variant=&quot;basic&quot;</code> (phase 1 — primary <code className="text-caption">Box</code> icon, name, URL,
          “Model:” line) and <code className="text-caption">variant=&quot;full&quot;</code> (phase 2 — type <code className="text-caption">Badge</code>,{" "}
          <code className="text-caption">DropdownMenu</code>, In/Out token chips, budget + <code className="text-caption">Progress</code>). Data:{" "}
          <code className="text-caption">endpoints</code> in <code className="text-caption">mockData</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Shared card chrome: border-border, shadow-xs, hover border + shadow</li>
          <li>Basic: gap-3 p-4; full: gap-4 p-4</li>
          <li>Full type badge: success (Production), warning (POC), secondary (Demo)</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("cards")}>
              Card
            </Link>
            {" — "}root surface.
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("badges")}>
              Badge
            </Link>
            {" — "}full variant only.
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("progress")}>
              Progress
            </Link>
            {" — "}full variant budget bar.
          </li>
        </ul>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-h2 text-foreground">Endpoint card</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">
            Overview uses the <span className="text-foreground/75">basic</span> variant; switch to <code className="text-caption">full</code> when you need
            metrics and actions on the same tile.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-h3 text-foreground">Basic</h2>
          <p className="text-caption text-muted-foreground">Icon, title, API URL, and model id — no budget or token stats.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {basicShowcase.map((ep) => (
              <EndpointOverviewCard key={ep.id} ep={ep} variant="basic" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-h3 text-foreground">Full</h2>
          <p className="text-caption text-muted-foreground">Environment badge, action menu, deployment + token badges, budget row.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fullHighUsage.map((ep) => (
              <EndpointOverviewCard key={ep.id} ep={ep} variant="full" />
            ))}
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-4">
            <EndpointOverviewCard ep={fullLowerUsage} variant="full" />
          </div>
        </div>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentEndpointCardLab;
