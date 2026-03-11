import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { models } from "@/data/mockData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap, Leaf, BarChart3, ArrowRight, SlidersHorizontal, Server, Cloud, ExternalLink, FileDown, Play, X, Rocket, Sparkles, ChevronDown, AlertTriangle, Ban } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ModelFilters, {
  type ModelFilterState,
  defaultFilters,
  applyModelFilters,
  isFiltersActive,
} from "@/components/ModelFilters";

const useCaseFilters = [
  { label: "Conversational Assistant", subtitle: "Chatbots & dialogue", keywords: ["Reasoning", "Multilingual", "Speed"] },
  { label: "Document Summarization", subtitle: "Long-form analysis", keywords: ["Long Context", "Analysis", "Safety"] },
  { label: "Code Generation", subtitle: "Dev tools & copilots", keywords: ["Code Generation", "Debugging"] },
  { label: "RAG / Knowledge Assistant", subtitle: "Enterprise search & retrieval", keywords: ["RAG", "Enterprise", "Long Context", "Grounding"] },
  { label: "Customer Support Bot", subtitle: "Multi-language support", keywords: ["Multilingual", "Speed", "Tool Use"] },
  { label: "Content Generation", subtitle: "Marketing & creative", keywords: ["Reasoning", "Analysis"] },
  { label: "Classification", subtitle: "Labeling & categorisation", keywords: ["Speed", "Cost Efficient"] },
  { label: "Translation", subtitle: "Cross-language tasks", keywords: ["Multilingual"] },
  { label: "Multimodal (Text + Image)", subtitle: "Vision & OCR", keywords: ["Multimodal", "Grounding"] },
  { label: "Structured Data Extraction", subtitle: "Parsing & formatting", keywords: ["RAG", "Grounding", "Tool Use"] },
];

const Cosmos = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const endpointParam = params.get("space") || "";
  const hostingParam = params.get("hosting") || "";
  const [search, setSearch] = useState("");
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<ModelFilterState>(() => ({
    ...defaultFilters,
    ...(hostingParam ? { hosting: [hostingParam] } : {}),
  }));
  const [showFilters, setShowFilters] = useState(false);
  const [showAllUseCases, setShowAllUseCases] = useState(false);

  const filtered = applyModelFilters(
    models.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.provider.toLowerCase().includes(search.toLowerCase());
      const activeFilter = useCaseFilters.find((f) => f.label === activeUseCase);
      const matchUseCase = !activeFilter || m.strengths.some((s) => activeFilter.keywords.includes(s));
      return matchSearch && matchUseCase;
    }),
    filters
  );

  const hasActiveFilters = isFiltersActive(filters);

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Model Cosmos</h1>
          <p className="text-muted-foreground mt-1">Browse and deploy AI models</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/cosmos/guided">
            <Button variant="default" size="sm">
              <Sparkles className="h-4 w-4 mr-1" />
              Find Model for My Use Case
            </Button>
          </Link>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                ✓
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Use Case Quick Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-sm text-muted-foreground mr-1">Quick Filter:</span>
        {(showAllUseCases ? useCaseFilters : useCaseFilters.slice(0, 5)).map((uc) => (
          <Tooltip key={uc.label}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveUseCase(activeUseCase === uc.label ? null : uc.label)}
                className={cn(
                  "gap-1.5 h-7 text-xs",
                  activeUseCase === uc.label ? "border-primary text-primary" : ""
                )}
              >
                <span>{uc.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {uc.subtitle} — filters by: {uc.keywords.join(", ")}
            </TooltipContent>
          </Tooltip>
        ))}
        {useCaseFilters.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={() => setShowAllUseCases(!showAllUseCases)}
          >
            {showAllUseCases ? "Show less" : `+${useCaseFilters.length - 5} more`}
          </Button>
        )}
        {activeUseCase && (
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveUseCase(null)}>Clear</Button>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search models..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Main content with optional filter sidebar */}
      <div className="flex gap-6">
        {showFilters && (
          <div className="w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <ModelFilters filters={filters} onChange={setFilters} />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex-1">
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">{filtered.length} model{filtered.length !== 1 ? "s" : ""} found</span>
            </div>
          )}
          <div className={`grid gap-4 ${showFilters ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
            {filtered.map((model) => (
              <Link key={model.id} to={`/cosmos/${model.id}`}>
              <Card className="hover:border-primary/30 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {model.status === "Beta" && (
                        <Badge variant="outline" className="text-[10px] border-info/30 text-info">Beta</Badge>
                      )}
                      {model.status === "Active" && (
                        <Badge variant="outline" className="text-[10px] border-success/30 text-success">Active</Badge>
                      )}
                      {model.status === "Sunsetting" && (
                        <Badge variant="outline" className="text-[10px] border-warning/30 text-warning">
                          <AlertTriangle className="h-2.5 w-2.5 mr-0.5" /> Sunsetting
                        </Badge>
                      )}
                      {model.status === "Deprecated" && (
                        <Badge variant="outline" className="text-[10px] border-destructive/30 text-destructive opacity-70">
                          <Ban className="h-2.5 w-2.5 mr-0.5" /> Deprecated
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{model.provider}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">v{model.version}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{(model.contextLength / 1000).toFixed(0)}k ctx</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">Added {new Date(model.addedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                  </div>
                </CardHeader>
                <CardContent className={`space-y-3 ${model.status === "Deprecated" ? "opacity-50" : ""}`}>
                  {model.status === "Beta" && (
                    <div className="flex items-center gap-1.5 text-[11px] text-info bg-info/5 border border-info/20 rounded-md px-2 py-1.5">
                      <Sparkles className="h-3 w-3 shrink-0" />
                      <span>Testing phase — no SLAs attached. Performance may vary.</span>
                    </div>
                  )}
                  {model.status === "Sunsetting" && (
                    <div className="flex items-center gap-1.5 text-[11px] text-warning bg-warning/5 border border-warning/20 rounded-md px-2 py-1.5">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>This model is sunsetting. Consider migrating to an alternative.</span>
                    </div>
                  )}
                  {model.status === "Deprecated" && (
                    <div className="flex items-center gap-1.5 text-[11px] text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-2 py-1.5">
                      <Ban className="h-3 w-3 shrink-0" />
                      <span>Deprecated — no new deployments allowed.</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {model.strengths.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3.5 w-3.5 text-primary" />
                      <span>{model.domain}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      <span>{model.tokensPerSecond} tok/s</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">In:</span> €{model.inputCostPer1M}/1M <span className="text-muted-foreground">Out:</span> €{model.outputCostPer1M}/1M
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="h-3.5 w-3.5 text-success" />
                      <span>{model.sustainability}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-xs gap-1.5 ${model.status === "Deprecated" ? "opacity-30 cursor-not-allowed" : model.status === "Sunsetting" ? "border-warning/30 text-warning hover:text-warning" : "hover:border-primary/40 hover:text-primary"}`}
                      disabled={model.status === "Deprecated"}
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); if (model.status !== "Deprecated") navigate(`/endpoints/new?model=${model.id}`); }}
                    >
                      {model.status === "Deprecated" ? <Ban className="h-3.5 w-3.5" /> : <Rocket className="h-3.5 w-3.5" />}
                      {model.status === "Deprecated"
                        ? "Deprecated"
                        : model.status === "Sunsetting"
                        ? "Create Endpoint (Sunsetting)"
                        : model.status === "Beta"
                        ? "Create Endpoint (Beta)"
                        : "Create Inference Endpoint"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No models match your filters</p>
              <p className="text-sm mt-1">Try adjusting your filter criteria</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => setFilters({ ...defaultFilters })}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Deploy Endpoint Dialog */}
    </div>
  );
};

export default Cosmos;
