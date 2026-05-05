import { useEffect, useMemo, useState } from "react";
import { models } from "@/data/mockData";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Plus, ChevronDown, ArrowDownUp } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ModelCosmosCard } from "@/components/ModelCosmosCard";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOverallModelScore } from "@/lib/model-metrics";
import { mvpPath } from "@/config/prototype-shell";
import { Badge } from "@/components/ui/badge";
import ModelFilters, {
  type ModelFilterState,
  defaultFilters,
  applyModelFilters,
  isFiltersActive,
} from "@/components/ModelFilters";
import { PageHeader } from "@/components/layout";

const COSMOS_PAGE_SIZE = 16;

const COSMOS_SORT_OPTIONS = [
  { value: "best-match", label: "Best match" },
  { value: "benchmark-desc", label: "Highest benchmark score" },
  { value: "efficiency-desc", label: "Highest efficiency" },
  { value: "cost-asc", label: "Lowest cost" },
  { value: "speed-desc", label: "Fastest" },
  { value: "context-desc", label: "Largest context window" },
  { value: "name-asc", label: "Alphabetical" },
] as const;

type CosmosSortOption = (typeof COSMOS_SORT_OPTIONS)[number]["value"];

const modelCatalogOrder = new Map(models.map((m, i) => [m.id, i]));

function efficiencyRank(sustainability: string | undefined): number {
  const g = (sustainability ?? "B").toUpperCase().charAt(0);
  const idx = "ABCDE".indexOf(g);
  return idx >= 0 ? 5 - idx : 0;
}

function sortCosmosModels(list: typeof models, option: CosmosSortOption): typeof models {
  const out = [...list];
  const byCatalog = (a: (typeof models)[number], b: (typeof models)[number]) =>
    (modelCatalogOrder.get(a.id) ?? 0) - (modelCatalogOrder.get(b.id) ?? 0);

  switch (option) {
    case "best-match":
      out.sort(byCatalog);
      break;
    case "benchmark-desc":
      out.sort(
        (a, b) =>
          getOverallModelScore(b) - getOverallModelScore(a) || byCatalog(a, b),
      );
      break;
    case "efficiency-desc":
      out.sort(
        (a, b) =>
          efficiencyRank(b.sustainability) - efficiencyRank(a.sustainability) || byCatalog(a, b),
      );
      break;
    case "cost-asc":
      out.sort((a, b) => a.inputCostPer1M - b.inputCostPer1M || byCatalog(a, b));
      break;
    case "speed-desc":
      out.sort((a, b) => b.tokensPerSecond - a.tokensPerSecond || byCatalog(a, b));
      break;
    case "context-desc":
      out.sort((a, b) => b.contextLength - a.contextLength || byCatalog(a, b));
      break;
    case "name-asc":
      out.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return out;
}

function CosmosSortDropdown({
  sortOption,
  onSortChange,
  align,
}: {
  sortOption: CosmosSortOption;
  onSortChange: (v: CosmosSortOption) => void;
  align: "start" | "end";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0" aria-label="Sort models">
          <ArrowDownUp className="h-icon-16 w-icon-16" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-64">
        <DropdownMenuLabel className="text-body-sm font-semibold text-foreground">Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortOption} onValueChange={(v) => onSortChange(v as CosmosSortOption)}>
          {COSMOS_SORT_OPTIONS.map((opt) => (
            <DropdownMenuRadioItem key={opt.value} value={opt.value} className="cursor-pointer">
              {opt.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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

/** MVP Model Cosmos — fork of `pages/Cosmos.tsx`; internal links stay under `/mvp/...`. */
const MvpCosmos = () => {
  const [params] = useSearchParams();
  const hostingParam = params.get("hosting") || "";
  const [search, setSearch] = useState("");
  const [activeUseCases, setActiveUseCases] = useState<string[]>([]);
  const [filters, setFilters] = useState<ModelFilterState>(() => ({
    ...defaultFilters,
    ...(hostingParam ? { hosting: [hostingParam] } : {}),
  }));
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<CosmosSortOption>("best-match");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      applyModelFilters(
        models.filter((m) => {
          const matchSearch =
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.provider.toLowerCase().includes(search.toLowerCase());
          const matchUseCase =
            activeUseCases.length === 0 ||
            activeUseCases.some((label) => {
              const f = useCaseFilters.find((u) => u.label === label);
              return f ? m.strengths.some((s) => f.keywords.includes(s)) : false;
            });
          return matchSearch && matchUseCase;
        }),
        filters,
      ),
    [search, activeUseCases, filters],
  );

  const sortedFiltered = useMemo(() => sortCosmosModels(filtered, sortOption), [filtered, sortOption]);

  const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / COSMOS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * COSMOS_PAGE_SIZE;
  const paginatedModels = sortedFiltered.slice(pageStart, pageStart + COSMOS_PAGE_SIZE);

  const filterResetKey = useMemo(
    () => JSON.stringify({ search, activeUseCases, hostingParam, filters, sortOption }),
    [search, activeUseCases, hostingParam, filters, sortOption],
  );

  const quickFilterCount = activeUseCases.length;

  useEffect(() => {
    setPage(1);
  }, [filterResetKey]);

  const hasActiveFilters = isFiltersActive(filters);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="container space-y-6 py-8">
      <PageHeader
        title="Model Cosmos"
        description="Explore models designed for different tasks and performance needs. Assign to endpoints and switch anytime without disruption."
        descriptionMaxWidthPageIntro
        actions={
          <Link to={mvpPath("/endpoints/new")}>
            <Button>
              <Plus className="h-icon-16 w-icon-16" aria-hidden />
              Create Endpoint
            </Button>
          </Link>
        }
      />

      {/* Search + filters (left) · Quick filter + guided (right) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-0 w-full max-w-md flex-1 sm:w-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-icon-16 w-icon-16 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="relative shrink-0"
            aria-label={showFilters ? "Hide filters" : "Show filters"}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className="h-icon-16 w-icon-16" aria-hidden />
            {hasActiveFilters && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px]">
                ✓
              </span>
            )}
          </Button>
          <CosmosSortDropdown sortOption={sortOption} onSortChange={setSortOption} align="start" />
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-0 max-w-full justify-between gap-2 sm:max-w-xs">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">Quick filter</span>
                  {quickFilterCount > 0 ? (
                    <Badge variant="secondary" appearance="pill" size="20" className="shrink-0 tabular-nums">
                      {quickFilterCount}
                    </Badge>
                  ) : null}
                </span>
                <ChevronDown className="h-icon-16 w-icon-16 shrink-0 opacity-50" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex max-h-components-dropdown w-80 flex-col overflow-hidden p-0"
            >
              <div className="shrink-0 space-y-1 border-b border-border px-3 py-2">
                <DropdownMenuLabel className="p-0 text-body-sm font-semibold text-foreground">
                  Use case quick filters
                </DropdownMenuLabel>
                <p className="text-caption text-muted-foreground">
                  {quickFilterCount === 0
                    ? "Select one or more — models matching any selection are shown."
                    : `${quickFilterCount} selected — models matching any selected use case are shown.`}
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1">
                {useCaseFilters.map((uc) => (
                  <DropdownMenuCheckboxItem
                    key={uc.label}
                    className="cursor-pointer items-start py-2 pl-8 pr-3"
                    checked={activeUseCases.includes(uc.label)}
                    onCheckedChange={(checked) => {
                      setActiveUseCases((prev) =>
                        checked
                          ? prev.includes(uc.label)
                            ? prev
                            : [...prev, uc.label]
                          : prev.filter((l) => l !== uc.label),
                      );
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-body-sm font-medium">{uc.label}</span>
                      <span className="text-caption font-normal text-muted-foreground">
                        {uc.subtitle} — {uc.keywords.join(", ")}
                      </span>
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              <div className="shrink-0 border-t border-border bg-popover p-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={quickFilterCount === 0}
                  onClick={() => setActiveUseCases([])}
                >
                  Clear all quick filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

        <div className="flex-1 min-w-0">
          {filtered.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-body-sm text-muted-foreground">
                {hasActiveFilters ? `${filtered.length} model${filtered.length !== 1 ? "s" : ""} found` : `${filtered.length} models`}
              </span>
              {filtered.length > COSMOS_PAGE_SIZE && (
                <span className="text-caption text-muted-foreground">
                  Showing {pageStart + 1}–{Math.min(pageStart + COSMOS_PAGE_SIZE, filtered.length)} of {filtered.length}
                </span>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {paginatedModels.map((model) => {
              // Alternative 2 route is explicit and consistent for every card.
              const detailPath = mvpPath(`/cosmos/${model.id}/alt2`);
              return (
                <Link key={model.id} to={detailPath} className="block h-full min-w-0">
                  <ModelCosmosCard model={model} variant="basic" />
                </Link>
              );
            })}
          </div>
          {filtered.length > COSMOS_PAGE_SIZE && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-body-sm text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
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
    </div>
  </div>
  );
};

export default MvpCosmos;
