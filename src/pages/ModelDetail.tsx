import { useParams, Link, useSearchParams } from "react-router-dom";
import { models } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import { ArrowLeft, ArrowRight, BarChart3, Zap, Leaf, Euro, Globe, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getModelProviderLogoSrc, getProviderInitials } from "@/lib/model-provider-logos";

const scoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 75) return "text-primary";
  if (score >= 60) return "text-warning";
  return "text-destructive";
};

const progressColor = (score: number) => {
  if (score >= 90) return "bg-success";
  if (score >= 75) return "bg-primary";
  if (score >= 60) return "bg-warning";
  return "bg-destructive";
};

const ModelDetail = () => {
  const { modelId } = useParams();
  const model = models.find((m) => m.id === modelId);
  const [expandedCap, setExpandedCap] = useState<string | null>(null);

  if (!model) {
    return (
      <div className="container py-8">
        <p>Model not found.</p>
        <Button asChild variant="ghost"><Link to="/cosmos">← Back to Model Cosmos</Link></Button>
      </div>
    );
  }

  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);

  return (
    <div className="container space-y-6 py-8">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/cosmos"><ArrowLeft className="h-4 w-4 mr-1" /> Model Cosmos</Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
            <Avatar className="h-full w-full rounded-md">
              {providerLogoSrc ? (
                <AvatarImage src={providerLogoSrc} alt="" className="h-full w-full object-contain" />
              ) : null}
              <AvatarFallback className="rounded-md text-label">{getProviderInitials(model.provider)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{model.name}</h1>
              <Badge variant="secondary">{model.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{model.provider} • v{model.version}</p>
            <p className="text-sm max-w-2xl">{model.description}</p>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link to={`/endpoints/new?model=${model.id}`}>
            Add to Endpoint <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Globe className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Domain</p>
              <p className="font-semibold text-sm">{model.domain}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Euro className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Input/1M</p>
              <p className="font-semibold text-sm">€{model.inputCostPer1M}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Euro className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Output/1M</p>
              <p className="font-semibold text-sm">€{model.outputCostPer1M}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Zap className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Speed</p>
              <p className="font-semibold text-sm">{model.tokensPerSecond} tok/s</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><MessageSquare className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Response</p>
              <p className="font-semibold text-sm">{model.avgResponseTokens} tok</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10"><Leaf className="h-4 w-4 text-success" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Sustainability</p>
              <Badge variant="success" className="text-xs mt-0.5">{model.sustainability}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths */}
      <div className="flex flex-wrap gap-2">
        {model.strengths.map((s) => (
          <Badge key={s} variant="secondary" className="text-sm">{s}</Badge>
        ))}
      </div>

      {/* Capabilities */}
      <Card>
        <CardHeader><CardTitle>Capabilities</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {model.capabilities.map((cap) => (
            <div key={cap.name} className="space-y-2">
              <button
                onClick={() => setExpandedCap(expandedCap === cap.name ? null : cap.name)}
                className="w-full flex items-center justify-between hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-medium text-sm w-32 text-left">{cap.name}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${progressColor(cap.score)}`}
                      style={{ width: `${cap.score}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold w-10 text-right ${scoreColor(cap.score)}`}>{cap.score}</span>
                </div>
                {expandedCap === cap.name ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
                )}
              </button>

              {expandedCap === cap.name && (
                <div className="ml-6 pl-4 border-l-2 border-border space-y-2 py-2">
                  {cap.subs.map((sub) => (
                    <div key={sub.name} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-36">{sub.name}</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${progressColor(sub.score)}`}
                          style={{ width: `${sub.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold w-8 text-right ${scoreColor(sub.score)}`}>{sub.score}</span>
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
          <div className="flex items-center justify-between">
            <CardTitle>Benchmarks</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">View Full Details</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Benchmark Details — {model.name}</DialogTitle>
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
                        <TableCell><Badge variant="outline" className="text-xs">{b.category}</Badge></TableCell>
                        <TableCell className="text-right font-mono">{b.score}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">{b.maxScore}</TableCell>
                        <TableCell className="text-right">
                          <span className={`font-bold ${scoreColor(b.score)}`}>
                            {((b.score / b.maxScore) * 100).toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-xs text-muted-foreground mt-2">
                  Scores are based on publicly available benchmark results and may vary with evaluation methodology.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {model.benchmarks.map((b) => (
              <div key={b.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{b.name}</span>
                  <span className={`text-xs font-bold ${scoreColor(b.score)}`}>{b.score}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${progressColor(b.score)}`}
                    style={{ width: `${(b.score / b.maxScore) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{b.category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelDetail;
