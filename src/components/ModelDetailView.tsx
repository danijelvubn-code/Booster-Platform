import { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Image as ImageLucide,
  Mic,
  Rocket,
  Type,
  Video,
} from "lucide-react";

import { getModelProviderLogoSrc, getProviderInitials } from "@/lib/model-provider-logos";
import type { ModelRecord } from "@/lib/model-metrics";
import {
  formatContextWindowShort,
  formatEurPer1MForDisplay,
  modelHasVisionCapability,
  overallScoreTextClass,
} from "@/lib/model-metrics";

/** Bar fill aligned with numeric rule: ≥90 green, otherwise neutral. */
const progressFillClass = (pct0to100: number) =>
  pct0to100 >= 90 ? "bg-success" : "bg-muted-foreground/40";

type Availability = "both" | "input" | "none";

function modalityRowsFor(model: ModelRecord): Array<{ key: string; label: string; availability: Availability }> {
  const vision = modelHasVisionCapability(model);
  return [
    { key: "text", label: "Text", availability: "both" },
    { key: "image", label: "Image", availability: vision ? "input" : "none" },
    { key: "audio", label: "Audio", availability: "none" },
    { key: "video", label: "Video", availability: "none" },
  ];
}

const defaultApiEndpoints: ReadonlyArray<{ name: string; supported: boolean }> = [
  { name: "Chat completions", supported: true },
  { name: "Chat completions (legacy)", supported: false },
  { name: "Embeddings", supported: false },
];

function modalityIcon(key: string) {
  switch (key) {
    case "text":
      return Type;
    case "image":
      return ImageLucide;
    case "audio":
      return Mic;
    case "video":
      return Video;
    default:
      return Type;
  }
}

function AvailabilityBadge({ mode }: { mode: Availability }) {
  if (mode === "both") {
    return (
      <Badge variant="success" size="20" className="shrink-0 font-normal">
        Input & output
      </Badge>
    );
  }
  if (mode === "input") {
    return (
      <Badge variant="muted" size="20" className="shrink-0 font-normal">
        Input
      </Badge>
    );
  }
  return <span className="text-muted-foreground tabular-nums">—</span>;
}

export type ModelDetailViewProps = {
  model: ModelRecord;
  cosmosListPath: string;
  endpointsNewPath: string;
};

export function ModelDetailView({ model, cosmosListPath, endpointsNewPath }: ModelDetailViewProps) {
  const [expandedCap, setExpandedCap] = useState<string | null>(null);
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);

  /** Mock catalogue: one integrated provider row per model */
  const providerCount = 1;
  const activeProviderCount = model.status === "Deprecated" ? 0 : 1;

  const modalityRows = modalityRowsFor(model);
  const inPer1m = formatEurPer1MForDisplay(model.inputCostPer1M);
  const outPer1m = formatEurPer1MForDisplay(model.outputCostPer1M);
  const ctxShort = formatContextWindowShort(model.contextLength);

  return (
    <div className="container space-y-6 py-8">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to={cosmosListPath}>
          <ArrowLeft className="mr-1 h-icon-16 w-icon-16" aria-hidden />
          All models
        </Link>
      </Button>

      {/* Hero */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
            <Avatar className="h-full w-full rounded-md">
              {providerLogoSrc ? (
                <AvatarImage src={providerLogoSrc} alt="" className="h-full w-full object-contain" />
              ) : null}
              <AvatarFallback className="rounded-md text-label">{getProviderInitials(model.provider)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-h2 text-foreground">{model.name}</h1>
              <Badge variant="muted" size="20" className="font-normal">
                {model.version}
              </Badge>
              <Badge variant="muted" size="20" className="font-normal">
                {model.category}
              </Badge>
            </div>
            <p className="text-body-sm text-muted-foreground">
              by <span className="text-foreground">{model.provider}</span>
            </p>
            <p className="text-body-sm text-muted-foreground max-w-page-intro">{model.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 lg:justify-end">
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link to={`${endpointsNewPath}?model=${model.id}`}>
              <Rocket className="h-icon-16 w-icon-16" aria-hidden />
              Deploy now
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <p className="text-caption text-muted-foreground">Providers</p>
            <p className="text-h1 tabular-nums text-foreground">{providerCount}</p>
            <p className="text-caption text-muted-foreground">{activeProviderCount} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <p className="text-caption text-muted-foreground">Max context</p>
            <p className="text-h1 text-foreground">{ctxShort}</p>
            <p className="text-caption text-muted-foreground">tokens</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <p className="text-caption text-muted-foreground">Input price</p>
            <p className="text-display font-mono tabular-nums tracking-tight text-foreground">€{inPer1m}</p>
            <p className="text-caption text-muted-foreground">per 1M tokens</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <p className="text-caption text-muted-foreground">Output price</p>
            <p className="text-display font-mono tabular-nums tracking-tight text-foreground">€{outPer1m}</p>
            <p className="text-caption text-muted-foreground">per 1M tokens</p>
          </CardContent>
        </Card>
      </div>

      {/* Modalities + API */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-h3">Modalities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modalityRows.map((row) => {
              const Icon = modalityIcon(row.key);
              return (
                <div key={row.key} className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon className="h-icon-16 w-icon-16 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="text-body-sm text-foreground">{row.label}</span>
                  </div>
                  <AvailabilityBadge mode={row.availability} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-h3">API endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {defaultApiEndpoints.map((row) => (
              <div key={row.name} className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
                <span className="text-body-sm text-foreground">{row.name}</span>
                {row.supported ? (
                  <Badge variant="success" size="20" className="shrink-0 font-normal">
                    Supported
                  </Badge>
                ) : (
                  <Badge variant="muted" size="20" className="shrink-0 font-normal">
                    Not supported
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Providers table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3">Providers</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Provider</TableHead>
                <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Status</TableHead>
                <TableHead className="whitespace-nowrap text-caption-strong text-muted-foreground">Context</TableHead>
                <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                  Input / 1M
                </TableHead>
                <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                  Output / 1M
                </TableHead>
                <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">
                  Avg latency
                </TableHead>
                <TableHead className="text-right whitespace-nowrap text-caption-strong text-muted-foreground">TPS</TableHead>
                <TableHead className="text-center whitespace-nowrap text-caption-strong text-muted-foreground">Quant</TableHead>
                <TableHead className="text-center whitespace-nowrap text-caption-strong text-muted-foreground">Certs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted/50 relative h-icon-28 w-icon-28 shrink-0 overflow-hidden rounded-md">
                      <Avatar className="h-full w-full rounded-md">
                        {providerLogoSrc ? (
                          <AvatarImage src={providerLogoSrc} alt="" className="h-full w-full object-contain" />
                        ) : null}
                        <AvatarFallback className="rounded-md text-caption">{getProviderInitials(model.provider)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-body-sm-strong">{model.provider}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {model.status === "Deprecated" ? (
                    <span className="inline-flex items-center gap-2 text-caption text-muted-foreground">
                      <span className="bg-muted-foreground h-2 w-2 shrink-0 rounded-full" aria-hidden />
                      Inactive
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-caption-strong text-success">
                      <span className="bg-success h-2 w-2 shrink-0 rounded-full" aria-hidden />
                      Active
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-mono tabular-nums text-body-sm text-foreground">{ctxShort}</TableCell>
                <TableCell className="text-right font-mono tabular-nums text-body-sm">€{model.inputCostPer1M}</TableCell>
                <TableCell className="text-right font-mono tabular-nums text-body-sm">€{model.outputCostPer1M}</TableCell>
                <TableCell className="text-right font-mono tabular-nums text-body-sm text-muted-foreground">—</TableCell>
                <TableCell className="text-right font-mono tabular-nums text-body-sm">{model.tokensPerSecond.toFixed(1)}</TableCell>
                <TableCell className="text-center text-caption text-muted-foreground">—</TableCell>
                <TableCell className="text-center text-caption text-muted-foreground">—</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Capabilities (expandable) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3">Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {model.capabilities.map((cap) => (
            <div key={cap.name} className="space-y-2">
              <button
                type="button"
                onClick={() => setExpandedCap(expandedCap === cap.name ? null : cap.name)}
                className="-m-2 flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-1 items-center gap-3">
                  <span className="w-32 text-left text-label text-foreground">{cap.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${progressFillClass(cap.score)}`}
                      style={{ width: `${cap.score}%` }}
                    />
                  </div>
                  <span
                    className={`text-label w-10 text-right tabular-nums ${overallScoreTextClass(cap.score)}`}
                  >
                    {cap.score}
                  </span>
                </div>
                {expandedCap === cap.name ? (
                  <ChevronUp className="ml-2 h-icon-16 w-icon-16 shrink-0 text-muted-foreground" aria-hidden />
                ) : (
                  <ChevronDown className="ml-2 h-icon-16 w-icon-16 shrink-0 text-muted-foreground" aria-hidden />
                )}
              </button>

              {expandedCap === cap.name && (
                <div className="ml-6 space-y-2 border-l border-border py-2 pl-4">
                  {cap.subs.map((sub) => (
                    <div key={sub.name} className="flex items-center gap-3">
                      <span className="w-36 text-caption text-muted-foreground">{sub.name}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${progressFillClass(sub.score)}`}
                          style={{ width: `${sub.score}%` }}
                        />
                      </div>
                      <span
                        className={`w-8 text-right text-caption-strong tabular-nums ${overallScoreTextClass(sub.score)}`}
                      >
                        {sub.score}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Benchmarks */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-h3">Benchmarks</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Full details <ArrowRight className="ml-1 h-icon-16 w-icon-16" aria-hidden />
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
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Max</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {model.benchmarks.map((b) => (
                      <TableRow key={b.name}>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-caption">
                            {b.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">{b.score}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">{b.maxScore}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-medium ${overallScoreTextClass(
                              b.maxScore ? (b.score / b.maxScore) * 100 : 0,
                            )}`}
                          >
                            {((b.score / b.maxScore) * 100).toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-caption text-muted-foreground mt-2">
                  Scores reflect publicly reported benchmark results and may vary by evaluation setup.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {model.benchmarks.map((b) => {
              const benchmarkPct =
                b.maxScore && b.maxScore > 0 ? (b.score / b.maxScore) * 100 : 0;
              return (
              <div key={b.name} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-caption text-muted-foreground">{b.name}</span>
                  <span className={`text-caption-strong tabular-nums ${overallScoreTextClass(benchmarkPct)}`}>
                    {b.score}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${progressFillClass(benchmarkPct)}`}
                    style={{
                      width:
                        b.maxScore && b.maxScore > 0
                          ? `${(b.score / b.maxScore) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
                <span className="text-caption text-muted-foreground">{b.category}</span>
              </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
