import { Link } from "react-router-dom";

import { EnergyScorePill } from "@/components/EnergyScorePill";
import { Card } from "@/components/ui/card";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";

const demoGrades = ["A", "B", "C", "D", "E"] as const;

const ComponentEnergyScoreLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="82/100"
      scalabilityScoreNote={
        <p>
          <code className="text-caption">EnergyScorePill</code> shows a letter grade next to a leaf icon. Colors come from{" "}
          <code className="text-caption">getSustainabilityGradeStyles</code> in <code className="text-caption">model-metrics</code>{" "}
          (aligned with model <code className="text-caption">sustainability</code> data). Grades <code className="text-caption">A</code>–
          <code className="text-caption">E</code>: A/D/E use semantic tokens at <code className="text-caption">/7</code>; B/C use fixed hex at{" "}
          <code className="text-caption">/7</code> (product exception). Unknown letters fall back to grade{" "}
          <code className="text-caption">B</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Shell: border-border, h-7, rounded-md, p-0.5</li>
          <li>Icon segment: px-2 py-1, rounded-bl-md rounded-tl-md; A/D/E semantic + /7; B/C hex #65A30D / #D3A532 + /7</li>
          <li>Letter: w-6, text-body-sm text-muted-foreground, leading-none</li>
          <li>Icon: Leaf from lucide-react, h-icon-16 w-icon-16</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/sections/model-card">
              Model card
            </Link>
            {" — "}typical placement beside overall score.
          </li>
        </ul>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-h2 text-foreground">Energy score</h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            Compact energy / sustainability grade for catalog tiles. Hover the pill to read the <code className="text-caption">Energy</code>{" "}
            label via native <code className="text-caption">title</code>.
          </p>
        </div>

        <Card className="p-4">
          <p className="text-label text-foreground mb-3">Grades</p>
          <div className="flex flex-wrap items-center gap-4">
            {demoGrades.map((grade) => (
              <div key={grade} className="flex flex-col items-center gap-2">
                <EnergyScorePill grade={grade} />
                <span className="text-caption text-muted-foreground">Grade {grade}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentEnergyScoreLab;
