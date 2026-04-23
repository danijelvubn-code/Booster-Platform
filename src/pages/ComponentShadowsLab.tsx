import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";

/** Design-system shadow utilities from `tailwind.config.ts` → `theme.extend.boxShadow`. */
const SHADOW_SAMPLES = [
  { displayName: "2xs", utilityClass: "shadow-2xs", cssVar: "--shadow-2xs" },
  { displayName: "xs", utilityClass: "shadow-xs", cssVar: "--shadow-xs" },
  { displayName: "sm", utilityClass: "shadow-sm", cssVar: "--shadow-sm" },
  { displayName: "default", utilityClass: "shadow", cssVar: "--shadow" },
  { displayName: "md", utilityClass: "shadow-md", cssVar: "--shadow-md" },
  { displayName: "lg", utilityClass: "shadow-lg", cssVar: "--shadow-lg" },
  { displayName: "xl", utilityClass: "shadow-xl", cssVar: "--shadow-xl" },
  { displayName: "2xl", utilityClass: "shadow-2xl", cssVar: "--shadow-2xl" },
] as const;

const ComponentShadowsLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="95/100"
      scalabilityScoreNote={
        <p>
          Each card overrides the default <code className="text-caption">Card</code> shell shadow with a single tokenized{" "}
          <code className="text-caption">shadow-*</code> utility so elevation matches production variables in{" "}
          <code className="text-caption">index.css</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Eight tokens: 2xs, xs, sm, default (shadow), md, lg, xl, 2xl</li>
          <li>Grid: three columns from md breakpoint, gap-4</li>
          <li>Card: rounded-lg, border, bg-card; demo shadow replaces shadow-xs via className</li>
        </ul>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-h2 text-foreground">Shadows</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Elevation scale from the design system — each card uses the named shadow on its surface.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SHADOW_SAMPLES.map((item) => (
            <Card key={item.displayName} className={cn("overflow-hidden", item.utilityClass)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-body-sm-strong text-foreground">{item.displayName}</CardTitle>
                <p className="text-caption text-muted-foreground">
                  <code className="text-caption">{item.utilityClass}</code>
                  <span className="text-muted-foreground"> · </span>
                  <code className="text-caption">var({item.cssVar})</code>
                </p>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="rounded-md border border-border bg-muted/40 px-3 py-4">
                  <p className="text-caption text-muted-foreground">
                    Inner block for contrast — outer ring shows the card shadow.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentShadowsLab;
