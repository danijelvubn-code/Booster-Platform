import { Link } from "react-router-dom";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import AppHeader from "@/components/AppHeader";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";

const ComponentAppHeaderLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="82/100"
      scalabilityScoreNote={
        <p>
          <code className="text-caption">AppHeader</code> renders the product chrome (logo • primary nav • user menu).
          Live in <code className="text-caption">AppLayout</code>; previewed here with{" "}
          <code className="text-caption">position=&quot;static&quot;</code> so it does not stick over surrounding lab
          content. Source: <code className="text-caption">src/components/AppHeader.tsx</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Surface: bg-card, border-b border-border</li>
          <li>Row: h-14, px-6, gap-4</li>
          <li>Active link: bg-primary/10 text-primary; idle: text-muted-foreground</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("dropdown-menu")}>
              Dropdown Menu
            </Link>
            {" — "}user menu (account, help, components, admin, sign out).
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("tooltip")}>
              Tooltip
            </Link>
            {" — "}wraps nav items that declare a <code className="text-caption">tooltip</code>.
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("buttons")}>
              Button
            </Link>
            {" — "}user-menu trigger uses <code className="text-caption">variant=&quot;ghost&quot;</code>.
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            Primary links source: <code className="text-caption">primaryNavItems</code> in <code className="text-caption">src/lib/app-nav.ts</code>.
          </li>
          <li>Active state: matches <code className="text-caption">pathname</code> with <code className="text-caption">startsWith</code>.</li>
        </ul>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-h2 text-foreground">Header navigation</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">
            The product header rendered exactly as it appears at the top of <code className="text-caption">AppLayout</code>.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-h3 text-foreground">Default</h2>
          <p className="text-caption text-muted-foreground">
            Logo, centered primary nav, and user dropdown. The active state reflects the current route.
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm">
            <AppHeader position="static" />
            <div className="p-6 text-caption text-muted-foreground">
              Surrounding page content sits below the header. In the live shell the header is sticky.
            </div>
          </div>
        </section>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentAppHeaderLab;
