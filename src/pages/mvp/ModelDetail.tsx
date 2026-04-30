/**
 * MVP — Model detail (default).
 *
 * This file only: `ModelDetail.tsx`. Not imported from alternative pages.
 * Route: `/mvp/cosmos/:modelId`
 * Alternatives: `ModelDetailAlt.tsx` (`/alt`), `ModelDetailAlt2.tsx` (`/alt2`)
 */
import { Link, useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Brain,
  Code2,
  Database,
  Eye,
  Globe,
  Languages,
  type LucideIcon,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";

import { EnergyScorePill } from "@/components/EnergyScorePill";
import { getModelProviderLogoSrc, getProviderInitials } from "@/lib/model-provider-logos";
import {
  formatContextWindowShort,
  formatEurPer1MForDisplay,
  getOverallModelScore,
  getParamSizeLabel,
  modelHasVisionCapability,
  overallScoreTextClass,
  type ModelRecord,
} from "@/lib/model-metrics";
import { models } from "@/data/mockData";
import { cn } from "@/lib/utils";

/** Public benchmark frameworks recognised in the MVP detail view. */
const PUBLIC_BENCHMARKS = new Set<string>([
  "MMLU",
  "MLU",
  "HumanEval",
  "MBPP",
  "DS-1000",
  "GSM8K",
  "ARC-Challenge",
  "HellaSwag",
  "TruthfulQA",
]);

type DisplayBenchmark = {
  name: string;
  score: number;
  /** When the benchmark is proprietary to Booster, methodology stays hidden. */
  proprietary: boolean;
  /** Public benchmarks include a category; proprietary entries omit it. */
  category?: string;
  maxScore?: number;
};

function buildBenchmarkRows(model: ModelRecord): DisplayBenchmark[] {
  const composite = getOverallModelScore(model);
  const proprietary: DisplayBenchmark = {
    name: "Booster",
    score: composite,
    proprietary: true,
  };
  const publicRows: DisplayBenchmark[] = model.benchmarks.map((b) => ({
    name: b.name,
    score: b.score,
    proprietary: !PUBLIC_BENCHMARKS.has(b.name),
    category: b.category,
    maxScore: b.maxScore,
  }));
  return composite > 0 ? [proprietary, ...publicRows] : publicRows;
}

/** Static score visualisation backed by the shared Progress component. */
function ScoreTrack({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <Progress
      value={pct}
      size="dense"
      className="bg-muted"
      indicatorClassName="bg-muted-foreground/75"
      aria-hidden
    />
  );
}

/** Maps a capability label to a lucide icon used in the detail panel header rows. */
function getCapabilityIcon(name: string): LucideIcon {
  const key = name.toLowerCase();
  if (key.includes("reason")) return Brain;
  if (key.includes("multilingual")) return Globe;
  if (key.includes("language")) return Languages;
  if (key.includes("vision")) return Eye;
  if (key.includes("code")) return Code2;
  if (key.includes("efficien")) return Zap;
  if (key.includes("rag")) return Database;
  if (key.includes("custom")) return Sliders;
  return Sparkles;
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="text-body-sm text-muted-foreground">{label}</span>
      <span className="text-body-sm text-foreground">{value}</span>
    </div>
  );
}

const MvpModelDetail = () => {
  const { modelId } = useParams();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return (
      <div className="container py-8">
        <p className="text-body-sm text-muted-foreground">Model not found.</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to="/mvp/cosmos">All models</Link>
        </Button>
      </div>
    );
  }

  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
  const grade = (model.sustainability ?? "B").toUpperCase().charAt(0);
  const ctxShort = formatContextWindowShort(model.contextLength);
  const inPer1m = formatEurPer1MForDisplay(model.inputCostPer1M);
  const outPer1m = formatEurPer1MForDisplay(model.outputCostPer1M);
  const qualityScore = getOverallModelScore(model);
  const paramLabel = getParamSizeLabel(model.name) ?? getParamSizeLabel(model.description);
  const isMultimodal = modelHasVisionCapability(model);

  const heroTags = [
    paramLabel,
    isMultimodal ? "MULTIMODAL" : "TEXT",
    "API",
    model.hosting === "Booster Powered" ? "MANAGED" : model.hosting?.toUpperCase(),
  ].filter((t): t is string => Boolean(t));

  const benchmarkRows = buildBenchmarkRows(model);

  return (
    <div className="container space-y-6 py-8">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/mvp/cosmos">
          <ArrowLeft className="mr-1 h-icon-16 w-icon-16" aria-hidden />
          Model Cosmos
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-y-6 gap-x-10 lg:grid-cols-[25rem_1fr]">
        {/* Left summary column */}
        <aside className="space-y-4">
          {/* Identity card */}
          <Card className="bg-primary/4 border-primary/20">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="bg-card relative h-icon-32 w-icon-32 shrink-0 overflow-hidden rounded-md">
                  <Avatar className="h-full w-full rounded-md">
                    {providerLogoSrc ? (
                      <AvatarImage
                        src={providerLogoSrc}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    ) : null}
                    <AvatarFallback className="rounded-md text-caption-strong">
                      {getProviderInitials(model.provider)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h1 className="text-h2 truncate text-foreground">{model.name}</h1>
              </div>

              {heroTags.length > 0 ? (
                <p className="text-caption-strong text-muted-foreground">
                  {heroTags.map((tag, i) => (
                    <span key={tag}>
                      {i > 0 ? <span className="px-2">·</span> : null}
                      {tag}
                    </span>
                  ))}
                </p>
              ) : null}

              <p className="text-body-sm text-muted-foreground">{model.description}</p>

              <div className="flex flex-wrap items-center gap-2">
                {model.status === "Active" ? (
                  <Badge variant="success" size="20" className="font-normal">
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant={model.status === "Deprecated" ? "destructive" : "warning"}
                    size="20"
                    className="font-normal"
                  >
                    {model.status}
                  </Badge>
                )}
                <span className="text-body-sm text-muted-foreground">v{model.version}</span>
                <span className="text-body-sm text-foreground">{model.domain}</span>
              </div>

              {model.strengths.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {model.strengths.map((s) => (
                    <Badge
                      key={s}
                      variant="muted"
                      appearance="ghost"
                      size="20"
                      className="font-normal"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <Button asChild variant="default" size="default" className="w-full">
                <Link to={`/mvp/endpoints/new?model=${model.id}`}>Add to Endpoint</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quality score + stats list */}
          <Card className="overflow-hidden p-0">
            <div className="bg-success/10 flex items-center justify-between px-4 py-3">
              <span className="text-caption text-muted-foreground tracking-wider uppercase">
                Quality Score
              </span>
              <span className={cn("text-display tabular-nums", overallScoreTextClass(qualityScore))}>
                {qualityScore}
              </span>
            </div>
            <Separator />
            <div className="divide-y divide-border">
              <StatRow label="Domain" value={model.domain} />
              <StatRow label="Input / 1M" value={`€${inPer1m}`} />
              <StatRow label="Output / 1M" value={`€${outPer1m}`} />
              <StatRow label="Speed" value={`${model.tokensPerSecond} tok/s`} />
              <StatRow label="Avg response" value={`${model.avgResponseTokens} tok`} />
              <StatRow
                label="Sustainability"
                value={
                  <span className="inline-flex items-center gap-2">
                    <EnergyScorePill grade={grade} />
                    Grade {grade}
                  </span>
                }
              />
              <StatRow label="Max context" value={`${ctxShort} tokens`} />
            </div>
          </Card>

          {/* Best used for */}
          {model.strengths.length > 0 ? (
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-caption text-muted-foreground tracking-wider uppercase">
                  Best used for
                </p>
                <ul className="text-body-sm space-y-1.5 pl-5 text-foreground [list-style:disc]">
                  {model.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
        </aside>

        {/* Right column: capabilities + benchmarks */}
        <div className="space-y-8">
          {/* Capabilities */}
          <section className="space-y-4">
            <div className="flex items-end justify-end gap-4">
              <div className="space-y-1">
                <h2 className="text-h3 text-foreground">Capabilities</h2>
                <p className="text-body-sm text-muted-foreground">
                  Capability scores reflect the latest internal evaluation. Energy efficiency
                  reflects energy consumption observed during those evaluations.
                </p>
              </div>
              <CapabilitiesDetailDialog model={model} />
            </div>

            <div className="ml-20 mt-4 space-y-1 py-4">
              <ScoreHeader />
              <div className="divide-y divide-border">
                {model.capabilities.map((cap) => (
                  <div
                    key={cap.name}
                    className="grid grid-cols-[8rem_1fr_3rem] items-center gap-4 py-5"
                  >
                    <span className="text-body-sm text-foreground">{cap.name}</span>
                    <ScoreTrack value={cap.score} />
                    <span className="text-body-sm text-foreground text-right tabular-nums">
                      {cap.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Separator />

          {/* Benchmarks */}
          <section className="space-y-4">
            <div className="flex items-end justify-end gap-4 pb-4">
              <div className="space-y-1">
                <h2 className="text-h3 text-foreground">Benchmarks</h2>
                <p className="text-body-sm text-muted-foreground">
                  Public benchmark frameworks show source category and score. Proprietary Booster
                  benchmarks display the resulting score only — internal methodology stays private.
                </p>
              </div>
              <BenchmarksDetailDialog model={model} rows={benchmarkRows} />
            </div>

            <div className="ml-20 space-y-1">
              <ScoreHeader />
              <div className="divide-y divide-border">
                {benchmarkRows.map((b) => {
                  const max = b.maxScore ?? 100;
                  const pct = (b.score / max) * 100;
                  return (
                    <div
                      key={`${b.name}-${b.proprietary ? "prop" : "pub"}`}
                      className="grid grid-cols-[8rem_1fr_3rem] items-center gap-4 py-3"
                    >
                      <div className="flex flex-col">
                        <span className="text-body-sm text-foreground">{b.name}</span>
                        {b.proprietary ? (
                          <span className="text-caption text-muted-foreground">Proprietary</span>
                        ) : b.category ? (
                          <span className="text-caption text-muted-foreground">{b.category}</span>
                        ) : null}
                      </div>
                      <ScoreTrack value={pct} />
                      <span className="text-body-sm text-foreground text-right tabular-nums">
                        {b.score.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

function ScoreHeader() {
  return (
    <div className="grid grid-cols-[8rem_1fr_3rem] items-center gap-4 border-b border-border pb-2">
      <span className="text-caption text-muted-foreground tracking-wider uppercase">
        Capability
      </span>
      <span className="text-caption text-muted-foreground tracking-wider uppercase">Score</span>
      <span className="text-caption text-muted-foreground tracking-wider uppercase text-right">
        %
      </span>
    </div>
  );
}

function CapabilitiesDetailDialog({ model }: { model: ModelRecord }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Detailed View
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        // Width is an intentional, user-approved exception — no matching token in the modal/panel scale.
        className="inset-y-4 right-4 flex h-auto w-[520px] flex-col gap-0 overflow-hidden rounded-xl border border-border p-0 shadow-xl sm:max-w-[520px]"
        aria-describedby={undefined}
      >
        <SheetHeader className="h-[60px] flex-row items-center justify-start border-b border-border px-5 py-0 space-y-0">
          <SheetTitle>Capability Details</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-8">
            {model.capabilities.map((cap, i) => {
              const Icon = getCapabilityIcon(cap.name);
              return (
                <div key={cap.name} className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-icon-24 w-icon-24 text-foreground/75" aria-hidden />
                      <span className="text-body-strong text-foreground">{cap.name}</span>
                    </div>
                    <span
                      className={cn(
                        "text-body-strong text-right tabular-nums",
                        overallScoreTextClass(cap.score),
                      )}
                    >
                      {cap.score.toFixed(1)}
                    </span>
                  </div>

                  {cap.subs.length > 0 ? (
                    <div className="space-y-3 pl-10">
                      {cap.subs.map((sub) => (
                        <div
                          key={sub.name}
                          className="grid grid-cols-[12.5rem_1fr_2.5rem] items-center gap-3"
                        >
                          <span className="text-body-sm text-foreground">{sub.name}</span>
                          <Progress
                            value={Math.max(0, Math.min(100, sub.score))}
                            size="dense"
                            className="bg-muted"
                            indicatorClassName="bg-muted-foreground/75"
                            aria-hidden
                          />
                          <span
                            className={cn(
                              "text-body-sm-strong text-right tabular-nums",
                              overallScoreTextClass(sub.score),
                            )}
                          >
                            {sub.score.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {i < model.capabilities.length - 1 ? <Separator /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function BenchmarksDetailDialog({
  model,
  rows,
}: {
  model: ModelRecord;
  rows: DisplayBenchmark[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Detailed View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-modal-lg">
        <DialogHeader>
          <DialogTitle>Benchmark details — {model.name}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Benchmark</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Max</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((b) => (
              <TableRow key={`${b.name}-${b.proprietary ? "prop" : "pub"}`}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell>
                  {b.proprietary ? (
                    <Badge variant="muted" size="20" className="font-normal">
                      Booster proprietary
                    </Badge>
                  ) : (
                    <Badge variant="outline" size="20" className="font-normal">
                      {b.category ?? "Public"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {b.score.toFixed(1)}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                  {b.proprietary ? "—" : (b.maxScore ?? "—")}
                </TableCell>
                <TableCell className="text-right">
                  {b.proprietary || !b.maxScore ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    <span
                      className={cn(
                        "font-medium",
                        overallScoreTextClass((b.score / b.maxScore) * 100),
                      )}
                    >
                      {((b.score / b.maxScore) * 100).toFixed(1)}%
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-caption text-muted-foreground mt-2">
          Public scores follow the published evaluation methodology of each framework. Proprietary
          scores are derived from Booster internal evaluation pipelines.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default MvpModelDetail;
