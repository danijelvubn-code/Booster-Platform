/**
 * MVP — Model detail alternative (1).
 *
 * This file only: `ModelDetailAlt.tsx`. Not the default page and not alternative 2.
 * Route: `/mvp/cosmos/:modelId/alt`
 * Siblings: `ModelDetail.tsx` (default), `ModelDetailAlt2.tsx` (`/alt2` — reuses this page for identical UI until forked)
 */
import { Link, useParams } from "react-router-dom";

import { mvpPath } from "@/config/prototype-shell";

import { SectionHeader } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Check,
  CheckCircle2,
  Code2,
  Database,
  Eye,
  Globe,
  Languages,
  type LucideIcon,
  Sliders,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

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

type BenchmarkMethodologyRow = {
  category: string;
  evaluation: string;
  field: string;
  questions: string;
  repeats: string;
  responseType: string;
  scoring: string;
  weighting: string;
  toolUsage: boolean;
};

const BENCHMARK_METHODOLOGY_ROWS: BenchmarkMethodologyRow[] = [
  {
    category: "Agents (25%)",
    evaluation: "GDPval-AA",
    field: "Real World Knowledge Work",
    questions: "220 tasks",
    repeats: "1",
    responseType: "Agentic task completion with file outputs",
    scoring: "Pairwise comparison (ELO), frozen and scaled clamp((ELO-500)/2000)",
    weighting: "16.7%",
    toolUsage: true,
  },
  {
    category: "Agents (25%)",
    evaluation: "Tau2-Bench Telecom",
    field: "Agentic Workflows",
    questions: "114",
    repeats: "3",
    responseType: "Dual control agent-user simulation",
    scoring: "World state evaluation, pass@1",
    weighting: "8.3%",
    toolUsage: true,
  },
  {
    category: "Coding (25%)",
    evaluation: "Terminal-Bench Hard",
    field: "Agentic Workflows",
    questions: "44",
    repeats: "3",
    responseType: "Terminal-based task execution",
    scoring: "Test suite pass/fail, pass@1",
    weighting: "16.7%",
    toolUsage: false,
  },
  {
    category: "Coding (25%)",
    evaluation: "SciCode",
    field: "Code Generation",
    questions: "288 subproblems (test set)",
    repeats: "3",
    responseType: "Python code (must pass all unit tests)",
    scoring: "Code execution, pass@1, subproblem scoring with scientist-annotated background prompts",
    weighting: "8.3%",
    toolUsage: false,
  },
  {
    category: "General (25%)",
    evaluation: "AA-LCR",
    field: "Long Context Reasoning",
    questions: "100",
    repeats: "3",
    responseType: "Open answer",
    scoring: "Equality checker LLM, pass@1",
    weighting: "6.25%",
    toolUsage: false,
  },
  {
    category: "General (25%)",
    evaluation: "AA-Omniscience",
    field: "Knowledge and Hallucination",
    questions: "6,000",
    repeats: "1",
    responseType: "Open answer",
    scoring: "50% accuracy + 50% (1 - hallucination rate)",
    weighting: "12.5%",
    toolUsage: false,
  },
  {
    category: "General (25%)",
    evaluation: "IFBench",
    field: "Instruction Following",
    questions: "294",
    repeats: "5",
    responseType: "Open answer",
    scoring: "Extraction and rule-driven assessment, pass@1",
    weighting: "6.25%",
    toolUsage: false,
  },
  {
    category: "Scientific Reasoning (25%)",
    evaluation: "HLE (Humanity's Last Exam)",
    field: "Reasoning and Knowledge",
    questions: "2,158",
    repeats: "1",
    responseType: "Open answer",
    scoring: "Equality checker LLM, pass@1",
    weighting: "12.5%",
    toolUsage: false,
  },
  {
    category: "Scientific Reasoning (25%)",
    evaluation: "GPQA Diamond",
    field: "Scientific Reasoning",
    questions: "198",
    repeats: "5",
    responseType: "Multiple choice (4 options)",
    scoring: "Regex extraction, pass@1",
    weighting: "6.25%",
    toolUsage: false,
  },
  {
    category: "Scientific Reasoning (25%)",
    evaluation: "CritP",
    field: "Physics Reasoning",
    questions: "70",
    repeats: "5",
    responseType: "Python functions, symbolic expressions, numerical answers",
    scoring: "Official grading server, pass@1",
    weighting: "6.25%",
    toolUsage: false,
  },
];

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

type MvpModelDetailAltProps = {
  endpointFlowPath?: string;
};

const MvpModelDetailAlt = ({ endpointFlowPath = mvpPath("/endpoints/new") }: MvpModelDetailAltProps) => {
  const { modelId } = useParams();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return (
      <div className="container py-8">
        <p className="text-body-sm text-muted-foreground">Model not found.</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to={mvpPath("/cosmos")}>All models</Link>
        </Button>
      </div>
    );
  }

  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
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
  const providerRows = [
    {
      provider: model.provider,
      status: model.status === "Deprecated" ? "Inactive" : "Active",
      context: ctxShort,
      inputPer1M: `€${inPer1m}`,
      outputPer1M: `€${outPer1m}`,
      avgLatency: "620ms",
      tps: model.tokensPerSecond.toFixed(1),
      quant: "FP16",
      cert: "GDPR",
    },
    {
      provider: "Scaleway",
      status: "Active",
      context: "128K",
      inputPer1M: "€2.80",
      outputPer1M: "€8.40",
      avgLatency: "640ms",
      tps: "26.5",
      quant: "INT8",
      cert: "GDPR",
    },
    {
      provider: "Nebius",
      status: "Active",
      context: "128K",
      inputPer1M: "€3.10",
      outputPer1M: "€9.20",
      avgLatency: "590ms",
      tps: "29.4",
      quant: "FP16",
      cert: "GDPR",
    },
    {
      provider: "Fireworks",
      status: "Active",
      context: "128K",
      inputPer1M: "€2.95",
      outputPer1M: "€8.95",
      avgLatency: "610ms",
      tps: "27.8",
      quant: "Q8",
      cert: "GDPR",
    },
  ] as const;

  const benchmarkRows = buildBenchmarkRows(model);

  const publicRows = benchmarkRows.filter((b) => !b.proprietary);
  const publicAvg = publicRows.length
    ? publicRows.reduce((sum, b) => sum + (b.score / (b.maxScore ?? 100)) * 100, 0) /
      publicRows.length
    : 0;
  const publicCategories = Array.from(
    new Set(publicRows.map((b) => b.category).filter((c): c is string => Boolean(c))),
  );
  const publicDescription = publicRows.length
    ? `Average across ${publicRows.length} public framework${publicRows.length === 1 ? "" : "s"}${
        publicCategories.length > 0 ? ` covering ${publicCategories.join(", ").toLowerCase()}` : ""
      }.`
    : "No public benchmarks reported for this model.";

  const statusBadge =
    model.status === "Active" ? (
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
    );

  return (
    <div className="container space-y-6 py-8">
      {/* Minimal page header — breadcrumb only; identity lives in the sticky left card */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={mvpPath("/cosmos")}>Model Cosmos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{model.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main two-column content — sticky left summary + scrollable right detail */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-[17.5rem_1fr] lg:items-start">
        {/* Sticky left card — identity + primary CTA + light metadata + best-used-for */}
        <aside className="lg:sticky lg:top-4 lg:z-10 lg:self-start">
          <Card className="flex flex-col overflow-hidden p-0">
            {/* Tinted header — avatar, name, overall score */}
            <div
              className={cn(
                "flex items-center gap-3 border-b border-border px-4 py-4",
                qualityScore > 0 ? "bg-success/7" : "bg-muted",
              )}
            >
              <div className="bg-card relative h-icon-40 w-icon-40 shrink-0 overflow-hidden rounded-md">
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
              <h1 className="text-h3 min-w-0 flex-1 truncate text-foreground">{model.name}</h1>
              {qualityScore > 0 ? (
                <span
                  className={cn(
                    "text-h2 shrink-0 tabular-nums",
                    overallScoreTextClass(qualityScore),
                  )}
                >
                  {qualityScore}
                </span>
              ) : null}
            </div>

            {/* Body — description + tags */}
            <div className="space-y-5 border-b border-border p-4">
              <p className="text-body-sm text-muted-foreground">{model.description}</p>

              {heroTags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {heroTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      appearance="ghost"
                      size="28"
                      className="font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Metadata — divided rows */}
            <div className="divide-y divide-border">
              <StatRow label="Status" value={statusBadge} />
              <StatRow label="Version" value={`v${model.version}`} />
              <StatRow label="Domain" value={model.domain} />
            </div>

            {model.strengths.length > 0 ? (
              <div className="space-y-2 border-t border-border p-4">
                <p className="text-caption text-muted-foreground tracking-wider uppercase">
                  Best used for
                </p>
                <ul className="text-body-sm space-y-1.5 pl-5 text-foreground [list-style:disc]">
                  {model.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="border-t border-border p-3">
              <Button asChild variant="default" size="default" className="w-full">
                <Link to={`${endpointFlowPath.replace(":modelId", model.id)}?model=${model.id}`}>
                  Create Inference Endpoint
                </Link>
              </Button>
            </div>
          </Card>
        </aside>

        {/* Right column — Capabilities, Providers, Benchmarks (single card surface) */}
        <Card className="min-w-0 space-y-12 p-6">
          {/* Capabilities — 2×2 grid */}
          <section className="space-y-3">
            <SectionHeader
              title="Capabilities"
              description="Capability scores reflect the latest internal evaluation. Energy efficiency reflects energy consumption observed during those evaluations."
              action={<CapabilitiesDetailDialog model={model} />}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {model.capabilities.slice(0, 4).map((cap) => (
                <CapabilityCard key={cap.name} cap={cap} />
              ))}
            </div>
          </section>

          {/* Providers — pricing and throughput by provider for this model */}
          <section className="space-y-3">
            <SectionHeader title="Providers" />
            <Card className="overflow-hidden p-0">
              <Table size="md">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">
                      Provider
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">
                      Context
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                      Input / 1M
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                      Output / 1M
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                      Avg latency
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                      TPS
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap text-caption-strong text-muted-foreground">
                      Quant
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap text-caption-strong text-muted-foreground">
                      Certs
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providerRows.map((row, index) => (
                    <TableRow key={`${row.provider}-${index}`}>
                      <TableCell>
                        {row.status === "Active" ? (
                          <span className="inline-flex items-center gap-2 text-body-sm-strong text-foreground">
                            <span className="bg-success h-2 w-2 shrink-0 rounded-full" aria-hidden />
                            {row.provider}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-body-sm-strong text-foreground">
                            <span className="bg-muted-foreground h-2 w-2 shrink-0 rounded-full" aria-hidden />
                            {row.provider}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-mono tabular-nums text-body-sm text-foreground">
                        {row.context}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
                        {row.inputPer1M}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
                        {row.outputPer1M}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
                        {row.avgLatency}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
                        {row.tps}
                      </TableCell>
                      <TableCell className="text-center text-caption text-muted-foreground">
                        {row.quant}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="success"
                          appearance="ghost"
                          size="24"
                          className="font-normal"
                          leadingIcon={<CheckCircle2 aria-hidden />}
                        >
                          {row.cert}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Benchmarks — Detailed View lives on each tile so it deep-links to the right tab. */}
          <section className="space-y-3">
            <SectionHeader
              title="Benchmarks"
              description="Booster's proprietary score side by side with public benchmark frameworks."
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <BenchmarkTile
                label="Booster Score"
                score={qualityScore}
                empty={qualityScore <= 0}
                description="Booster's internal fit evaluation combining capability scores, real-world traces, and energy efficiency. Methodology stays private."
                chips={["Proprietary methodology"]}
                footer={
                  <BenchmarksDetailSheet model={model} rows={benchmarkRows} defaultTab="booster">
                    <Button variant="outline" size="sm">
                      View detail
                    </Button>
                  </BenchmarksDetailSheet>
                }
              />
              <BenchmarkTile
                label="Public Benchmark Average"
                score={publicAvg}
                empty={publicRows.length === 0}
                description={publicDescription}
                chips={publicCategories}
                footer={
                  <BenchmarksDetailSheet model={model} rows={benchmarkRows} defaultTab="public">
                    <Button variant="outline" size="sm">
                      View detail
                    </Button>
                  </BenchmarksDetailSheet>
                }
              />
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
};

/** Compact capability row — icon + name on the left, score right-aligned (per Figma). */
function CapabilityCard({ cap }: { cap: { name: string; score: number } }) {
  const Icon = getCapabilityIcon(cap.name);
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-0 px-4 py-4">
        <Icon className="h-icon-24 w-icon-24 shrink-0 text-foreground/75" aria-hidden />
        <span className="text-body-sm flex-1 truncate text-muted-foreground">{cap.name}</span>
        <span
          className={cn(
            "text-h3 shrink-0 tabular-nums",
            overallScoreTextClass(cap.score),
          )}
        >
          {Math.round(cap.score)}
        </span>
      </CardContent>
    </Card>
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

/** Aggregate info tile for the Benchmarks section. The shared detail Sheet trigger lives at the section header. */
function BenchmarkTile({
  label,
  score,
  description,
  chips,
  empty,
  footer,
}: {
  label: string;
  score: number;
  description: string;
  chips: string[];
  empty?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <Card className="p-0">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="space-y-1">
          <p className="text-caption text-muted-foreground tracking-wider uppercase">{label}</p>
          <span
            className={cn(
              "text-h2 tabular-nums",
              empty ? "text-muted-foreground" : overallScoreTextClass(score),
            )}
          >
            {empty ? "—" : score.toFixed(1)}
          </span>
        </div>
        <p className="min-h-benchmark-tile-description text-body-sm text-muted-foreground">
          {description}
        </p>
        {chips.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <Badge
                key={c}
                variant="muted"
                appearance="ghost"
                size="24"
                className="font-normal"
              >
                {c}
              </Badge>
            ))}
          </div>
        ) : null}
        {footer ? <div className="mt-auto pt-2">{footer}</div> : null}
      </CardContent>
    </Card>
  );
}

/** Shared right-side Sheet with two tabs so the user can flip between Booster and Public without reopening. */
function BenchmarksDetailSheet({
  model,
  rows,
  defaultTab = "booster",
  children,
}: {
  model: ModelRecord;
  rows: DisplayBenchmark[];
  defaultTab?: "booster" | "public";
  children: React.ReactNode;
}) {
  const proprietaryRows = rows.filter((b) => b.proprietary);
  const publicRows = rows.filter((b) => !b.proprietary);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="inset-y-4 left-4 right-4 flex h-auto w-auto flex-col gap-0 overflow-hidden rounded-xl border border-border p-0 shadow-xl lg:left-auto lg:w-modal-benchmark-details lg:max-w-modal-benchmark-details"
        aria-describedby={undefined}
      >
        <SheetHeader className="h-[60px] flex-row items-center justify-start border-b border-border px-5 py-0 space-y-0">
          <SheetTitle>Benchmark details — {model.name}</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue={defaultTab} className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <TabsList>
              <TabsTrigger value="booster">Booster methodology</TabsTrigger>
              <TabsTrigger value="public">Public benchmarks</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="booster"
            className="mt-0 flex-1 overflow-y-auto px-5 py-4 data-[state=inactive]:hidden"
          >
            <div className="space-y-4">
              <p className="text-body-sm text-muted-foreground">
                Booster Fit Score is an internal composite that combines capability evaluations,
                real-world endpoint traces, and energy efficiency. Exact weighting and inputs
                stay proprietary.
              </p>
              {proprietaryRows.length > 0 ? (
                <div className="rounded-md border border-border">
                  <div className="divide-y divide-border">
                    {proprietaryRows.map((b) => (
                      <div
                        key={b.name}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <span className="text-body-sm-strong text-foreground">{b.name}</span>
                        <span
                          className={cn(
                            "text-body-strong tabular-nums",
                            overallScoreTextClass(b.score),
                          )}
                        >
                          {b.score.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-body-sm text-muted-foreground">
                  No proprietary score reported for this model yet.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="public"
            className="mt-0 flex-1 overflow-y-auto px-5 py-4 data-[state=inactive]:hidden"
          >
            {publicRows.length > 0 ? (
              <div className="space-y-4">
                <Card className="overflow-hidden p-0">
                  <Table size="md">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">
                          Benchmark
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">
                          Field
                        </TableHead>
                        <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                          Score
                        </TableHead>
                        <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                          Normalized
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {publicRows.map((b) => {
                        const max = b.maxScore ?? 100;
                        const pct = (b.score / max) * 100;
                        return (
                          <TableRow key={b.name}>
                            <TableCell>
                              <span className="text-body-sm-strong text-foreground">{b.name}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-body-sm text-muted-foreground">{b.category ?? "General"}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-body-sm-strong tabular-nums text-foreground">
                                {b.score.toFixed(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span
                                className={cn(
                                  "text-body-sm-strong tabular-nums",
                                  overallScoreTextClass(pct),
                                )}
                              >
                                {pct.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-body-strong text-foreground">Evaluation methodology matrix</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Full benchmark stack used to build the public signal, organized by category weighting and scoring method.
                  </p>
                </div>

                <Card className="p-0">
                  <Table
                    size="md"
                    containerClassName="overflow-visible"
                  >
                    <TableHeader className="sticky top-0 z-20 bg-card [&_th]:border-b [&_th]:border-border [&_th]:bg-card [&_tr]:bg-card">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Category</TableHead>
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Evaluation</TableHead>
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Field</TableHead>
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Questions</TableHead>
                        <TableHead className="text-center whitespace-nowrap text-caption-strong text-muted-foreground">Repeats</TableHead>
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Output</TableHead>
                        <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Scoring</TableHead>
                        <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                          Weight
                        </TableHead>
                        <TableHead className="text-center whitespace-nowrap text-caption-strong text-muted-foreground">
                          Tools
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {BENCHMARK_METHODOLOGY_ROWS.map((row, index) => {
                        const previous = BENCHMARK_METHODOLOGY_ROWS[index - 1];
                        const showCategory = !previous || previous.category !== row.category;
                        return (
                          <TableRow key={`${row.evaluation}-${index}`}>
                            <TableCell>
                              {showCategory ? (
                                <span className="text-body-sm-strong text-foreground">{row.category}</span>
                              ) : (
                                <span className="text-body-sm text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <span className="text-body-sm-strong text-foreground">{row.evaluation}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-body-sm text-foreground">{row.field}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-body-sm text-foreground">{row.questions}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-body-sm tabular-nums text-foreground">{row.repeats}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-body-sm text-foreground">{row.responseType}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-body-sm text-foreground">{row.scoring}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-body-sm-strong tabular-nums text-foreground">{row.weighting}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              {row.toolUsage ? (
                                <Badge
                                  variant="success"
                                  appearance="ghost"
                                  size="20"
                                  className="font-normal"
                                  leadingIcon={<Check aria-hidden />}
                                >
                                  Yes
                                </Badge>
                              ) : (
                                <Badge
                                  variant="muted"
                                  appearance="ghost"
                                  size="20"
                                  className="font-normal"
                                  leadingIcon={<X aria-hidden />}
                                >
                                  No
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>

                <p className="text-caption text-muted-foreground">
                  Public scores follow each benchmark&apos;s published methodology. Tool usage indicates whether external tools are allowed during evaluation.
                </p>
              </div>
            ) : (
              <p className="text-body-sm text-muted-foreground">
                No public benchmarks reported for this model.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

export default MvpModelDetailAlt;
