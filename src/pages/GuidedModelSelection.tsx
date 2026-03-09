import { useState, useMemo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { models } from "@/data/mockData";
import {
  getSavedUseCaseProfiles,
  saveUseCaseProfile,
  deleteUseCaseProfile,
  type SavedUseCaseProfile,
} from "@/data/savedUseCaseProfiles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  Target,
  Activity,
  Gauge,
  Shield,
  DollarSign,
  Sparkles,
  ExternalLink,
  GitCompareArrows,
  Plus,
  Info,
  Save,
  FolderOpen,
  Trash2,
  Clock,
  Pencil,
  X,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface WizardState {
  useCase: string;
  customUseCase: string;
  objective: string;
  monthlyVolume: string;
  trafficPattern: string;
  audience: string;
  maxLatency: string;
  ttftCritical: string;
  sensitiveData: boolean;
  dataTypes: string[];
  moderation: string;
  deploymentPref: string;
  costSensitivity: string;
  monthlyBudget: string;
}

const defaultState: WizardState = {
  useCase: "",
  customUseCase: "",
  objective: "",
  monthlyVolume: "",
  trafficPattern: "",
  audience: "",
  maxLatency: "",
  ttftCritical: "",
  sensitiveData: false,
  dataTypes: [],
  moderation: "",
  deploymentPref: "",
  costSensitivity: "",
  monthlyBudget: "",
};

const stepsMeta = [
  { title: "Use Case", icon: Target },
  { title: "Objective", icon: Sparkles },
  { title: "Performance", icon: Gauge },
  { title: "Guardrails", icon: Shield },
  { title: "Cost", icon: DollarSign },
  { title: "Results", icon: Check },
];

/* ── Option Card component ── */
const OptionCard = ({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full text-left p-3 rounded-lg border transition-all",
      selected
        ? "border-primary bg-primary/10 ring-1 ring-primary"
        : "border-border hover:border-primary/40 hover:bg-accent/50"
    )}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      {selected && <Check className="h-4 w-4 text-primary" />}
    </div>
    {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
  </button>
);

/* ── Multi-select chip ── */
const ChipToggle = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
      selected
        ? "border-primary bg-primary/10 text-primary"
        : "border-border text-muted-foreground hover:border-primary/40"
    )}
  >
    {label}
  </button>
);

/* ── Use cases ── */
const USE_CASES = [
  "Conversational Assistant",
  "Document Summarization",
  "Code Generation",
  "Structured Data Extraction",
  "RAG / Knowledge Assistant",
  "Customer Support Bot",
  "Content Generation",
  "Classification",
  "Translation",
  "Multimodal (Text + Image)",
];

const OBJECTIVES = [
  { label: "Lowest Cost", description: "Minimize token and infrastructure costs" },
  { label: "Highest Accuracy", description: "Best quality output regardless of cost" },
  { label: "Fastest Response Time", description: "Lowest latency for interactive UX" },
  { label: "Balanced Performance", description: "Good trade-off across all dimensions" },
  { label: "Compliance / Regulated Workloads", description: "Safety, audit, and regulatory focus" },
  { label: "Sustainability / Energy Efficient", description: "Lowest carbon footprint" },
];

const VOLUMES = ["< 1M tokens", "1M – 10M tokens", "10M – 50M tokens", "50M+"];
const TRAFFIC = ["Steady traffic", "Burst traffic", "Event-driven spikes", "Low-frequency usage"];
const AUDIENCE = ["Yes – customer-facing", "Internal users only", "Experimental / POC"];

const LATENCY = ["< 500ms", "< 1s", "< 2s", "Flexible"];
const TTFT = [
  { label: "Yes – interactive UI", description: "Critical for real-time user experience" },
  { label: "Moderate importance", description: "Nice to have but not a blocker" },
  { label: "Not critical", description: "Batch or async workloads" },
];

const DATA_TYPES = ["PII", "Financial", "Healthcare", "Confidential enterprise data"];
const MODERATION = ["Yes", "No"];
const DEPLOY_PREF = ["Protected environment required", "Standard environment acceptable"];

const COST_SENS = [
  { label: "Highly cost sensitive", description: "Budget is a primary constraint" },
  { label: "Moderate sensitivity", description: "Willing to pay for better quality" },
  { label: "Cost is secondary to quality", description: "Quality and compliance matter most" },
];

/* ── Scoring engine ── */
function scoreModels(state: WizardState) {
  return models
    .map((m) => {
      let score = 50;
      const highlights: string[] = [];
      const tags: string[] = [];

      // Use case matching
      if (state.useCase === "Code Generation" && m.strengths.includes("Code Generation")) { score += 15; highlights.push("Purpose-built for code generation"); }
      if (state.useCase === "RAG / Knowledge Assistant" && m.strengths.includes("RAG")) { score += 15; highlights.push("Optimized for RAG workflows"); }
      if (state.useCase === "Document Summarization" && (m.strengths.includes("Long Context") || m.strengths.includes("Analysis"))) { score += 12; highlights.push("Strong summarization capability"); }
      if (state.useCase === "Customer Support Bot" && m.strengths.includes("Multilingual")) { score += 10; highlights.push("Multilingual support for diverse users"); }
      if (state.useCase === "Translation" && m.strengths.includes("Multilingual")) { score += 15; highlights.push("Excellent multilingual capabilities"); }
      if (state.useCase === "Multimodal (Text + Image)" && m.strengths.includes("Multimodal")) { score += 15; highlights.push("Native multimodal support"); }
      if (state.useCase === "Conversational Assistant") { score += 5; }
      if (state.useCase === "Classification" && m.strengths.includes("Speed")) { score += 8; }
      if (state.useCase === "Content Generation" && m.capabilities.some(c => c.name === "Language" && c.score >= 90)) { score += 10; highlights.push("High-quality language generation"); }

      // Objective
      if (state.objective === "Lowest Cost") {
        if (m.inputCostPer1M <= 1) { score += 15; tags.push("Cost Efficient"); }
        else if (m.inputCostPer1M <= 3) score += 8;
      }
      if (state.objective === "Highest Accuracy") {
        const mmlu = m.benchmarks.find(b => b.name === "MMLU");
        if (mmlu && mmlu.score >= 85) { score += 15; highlights.push("Top-tier benchmark accuracy"); tags.push("High Accuracy"); }
      }
      if (state.objective === "Fastest Response Time") {
        if (m.tokensPerSecond >= 100) { score += 15; highlights.push("Ultra-fast inference speed"); }
        else if (m.tokensPerSecond >= 50) score += 8;
      }
      if (state.objective === "Balanced Performance") { score += 8; }
      if (state.objective === "Compliance / Regulated Workloads") {
        const safety = m.benchmarks.find(b => b.name === "TruthfulQA");
        if (safety && safety.score >= 75) { score += 12; tags.push("Regulated Safe"); }
        if (m.strengths.includes("Safety")) { score += 10; highlights.push("Industry-leading safety features"); }
      }
      if (state.objective === "Sustainability / Energy Efficient") {
        if (m.sustainability === "A") { score += 15; tags.push("Eco-Friendly"); }
      }

      // Volume + performance matching
      if (state.monthlyVolume === "50M+" && m.tokensPerSecond >= 80) { score += 5; }
      if (state.audience === "Yes – customer-facing") { tags.push("Production Ready"); score += 3; }

      // Latency
      if (state.maxLatency === "< 500ms" && m.tokensPerSecond >= 100) { score += 8; highlights.push(`Meets <500ms latency requirement`); }
      else if (state.maxLatency === "< 1s" && m.tokensPerSecond >= 50) { score += 5; highlights.push("Meets <1s latency requirement"); }

      // Cost sensitivity
      if (state.costSensitivity === "Highly cost sensitive" && m.inputCostPer1M <= 1) { score += 10; tags.push("Budget Friendly"); }
      if (state.costSensitivity === "Cost is secondary to quality") {
        const mmlu = m.benchmarks.find(b => b.name === "MMLU");
        if (mmlu && mmlu.score >= 85) score += 5;
      }

      // Compliance
      if (state.sensitiveData && m.hosting === "Booster Powered") { score += 5; highlights.push("Self-hosted for data sovereignty"); }
      if (state.deploymentPref === "Protected environment required" && m.hosting === "Booster Powered") { score += 8; tags.push("Regulated Safe"); }

      // Clamp
      score = Math.min(99, Math.max(10, score));

      return {
        model: m,
        score,
        highlights: highlights.slice(0, 3),
        tags: [...new Set(tags)].slice(0, 3),
      };
    })
    .sort((a, b) => b.score - a.score);
}

/* ── Main Component ── */
const GuidedModelSelection = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(() => {
    const resumeId = params.get("resume");
    if (resumeId) {
      const p = getSavedUseCaseProfiles().find((pr) => pr.id === resumeId);
      if (p) return p.lastStep;
    }
    return 0;
  });
  const [state, setState] = useState<WizardState>(() => {
    const resumeId = params.get("resume");
    if (resumeId) {
      const p = getSavedUseCaseProfiles().find((pr) => pr.id === resumeId);
      if (p) return { ...p.state };
    }
    return defaultState;
  });
  const [useCaseSearch, setUseCaseSearch] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveAndExit, setSaveAndExit] = useState(false);
  const [showLoadPopover, setShowLoadPopover] = useState(false);
  const [loadedProfileId, setLoadedProfileId] = useState<string | null>(params.get("resume"));

  const update = <K extends keyof WizardState>(key: K, value: WizardState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const toggleDataType = (dt: string) =>
    update(
      "dataTypes",
      state.dataTypes.includes(dt)
        ? state.dataTypes.filter((d) => d !== dt)
        : [...state.dataTypes, dt]
    );

  const filteredUseCases = useMemo(() => {
    const q = useCaseSearch.toLowerCase();
    return USE_CASES.filter((uc) => uc.toLowerCase().includes(q));
  }, [useCaseSearch]);

  const results = useMemo(() => scoreModels(state), [state]);

  const canProceed = () => {
    switch (step) {
      case 0: return state.useCase.length > 0;
      case 1: return state.objective.length > 0;
      default: return true;
    }
  };

  const handleSave = (exitAfter: boolean) => {
    setSaveAndExit(exitAfter);
    setSaveName(
      loadedProfileId
        ? getSavedUseCaseProfiles().find((p) => p.id === loadedProfileId)?.name || ""
        : state.useCase
          ? `${state.useCase} profile`
          : ""
    );
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    if (!saveName.trim()) return;
    // If updating existing, delete old first
    if (loadedProfileId) deleteUseCaseProfile(loadedProfileId);
    const saved = saveUseCaseProfile(saveName.trim(), state, step);
    setLoadedProfileId(saved.id);
    setShowSaveDialog(false);
    toast({
      title: "Profile saved",
      description: `"${saveName.trim()}" has been saved. You can resume anytime.`,
    });
    if (saveAndExit) navigate("/cosmos");
  };

  const loadProfile = (profile: SavedUseCaseProfile) => {
    setState({ ...profile.state });
    setStep(profile.lastStep);
    // Platform profiles are loaded as a copy — don't track as "loaded" so save creates a new one
    setLoadedProfileId(profile.platform ? null : profile.id);
    setShowLoadPopover(false);
    toast({ title: profile.platform ? "Template loaded" : "Profile loaded", description: profile.platform ? `Started from "${profile.name}" template — save to create your own copy.` : `Resumed "${profile.name}"` });
  };

  const handleDeleteProfile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteUseCaseProfile(id);
    if (loadedProfileId === id) setLoadedProfileId(null);
    toast({ title: "Profile deleted" });
  };

  const savedProfiles = getSavedUseCaseProfiles();

  const progress = ((step + 1) / stepsMeta.length) * 100;

  return (
    <div className="container py-8 max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate("/cosmos")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Model Cosmos
        </Button>
      </div>


      <div>
        <h1 className="text-2xl font-bold">Guided Model Selection</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Answer a few questions and we'll recommend the best-fit models for your use case.
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {step + 1} of {stepsMeta.length}: {stepsMeta[step].title}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
        <div className="flex gap-1">
          {stepsMeta.map((s, i) => {
            const Icon = s.icon;
            return (
              <Tooltip key={s.title}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={cn(
                      "flex-1 h-1 rounded-full transition-colors",
                      i === step
                        ? "bg-primary"
                        : i < step
                        ? "bg-primary/40 cursor-pointer"
                        : "bg-muted"
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">{s.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Screen 1: What Are You Building? */}
          {step === 0 && (
            <>
              <div>
                <h2 className="text-lg font-semibold">What are you building?</h2>
                <p className="text-sm text-muted-foreground">
                  Help us understand your primary use case so we can recommend the best-fit models.
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search use cases…"
                  value={useCaseSearch}
                  onChange={(e) => setUseCaseSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="grid gap-2">
                {filteredUseCases.map((uc) => (
                  <OptionCard
                    key={uc}
                    label={uc}
                    selected={state.useCase === uc}
                    onClick={() => update("useCase", uc)}
                  />
                ))}
                <OptionCard
                  label="Other"
                  description="Describe your custom use case"
                  selected={state.useCase === "Other"}
                  onClick={() => update("useCase", "Other")}
                />
              </div>
              {state.useCase === "Other" && (
                <Input
                  placeholder="Describe your use case…"
                  value={state.customUseCase}
                  onChange={(e) => update("customUseCase", e.target.value)}
                  className="mt-2"
                />
              )}
            </>
          )}

          {/* Screen 2: Primary Objective */}
          {step === 1 && (
            <>
              <div>
                <h2 className="text-lg font-semibold">What matters most for this deployment?</h2>
                <p className="text-sm text-muted-foreground">
                  Select your top priority. We will optimize recommendations accordingly.
                </p>
              </div>
              <div className="grid gap-2">
                {OBJECTIVES.map((obj) => (
                  <OptionCard
                    key={obj.label}
                    label={obj.label}
                    description={obj.description}
                    selected={state.objective === obj.label}
                    onClick={() => update("objective", obj.label)}
                  />
                ))}
              </div>
            </>
          )}


          {/* Screen 3: Performance Expectations */}
          {step === 2 && (
            <>
              <div>
                <h2 className="text-lg font-semibold">Performance Expectations</h2>
                <p className="text-sm text-muted-foreground">
                  Performance constraints filter out incompatible models.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Maximum acceptable P95 latency</p>
                  <div className="grid grid-cols-2 gap-2">
                    {LATENCY.map((l) => (
                      <OptionCard key={l} label={l} selected={state.maxLatency === l} onClick={() => update("maxLatency", l)} />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Is low TTFT critical?</p>
                  <div className="grid gap-2">
                    {TTFT.map((t) => (
                      <OptionCard key={t.label} label={t.label} description={t.description} selected={state.ttftCritical === t.label} onClick={() => update("ttftCritical", t.label)} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Screen 4: Guardrails & Compliance */}
          {step === 3 && (
            <>
              <div>
                <h2 className="text-lg font-semibold">Compliance & Safety Requirements</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Does this workload involve sensitive data?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <OptionCard label="Yes" selected={state.sensitiveData === true} onClick={() => update("sensitiveData", true)} />
                    <OptionCard label="No" selected={state.sensitiveData === false} onClick={() => update("sensitiveData", false)} />
                  </div>
                </div>

                {state.sensitiveData && (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Select data types</p>
                      <div className="flex flex-wrap gap-2">
                        {DATA_TYPES.map((dt) => (
                          <ChipToggle key={dt} label={dt} selected={state.dataTypes.includes(dt)} onClick={() => toggleDataType(dt)} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Do you require moderation?</p>
                  <div className="grid gap-2">
                    {MODERATION.map((mod) => (
                      <OptionCard key={mod} label={mod} selected={state.moderation === mod} onClick={() => update("moderation", mod)} />
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

          {/* Screen 6: Cost Sensitivity */}
          {step === 5 && (
            <>
              <div>
                <h2 className="text-lg font-semibold">Budget Sensitivity</h2>
                <p className="text-sm text-muted-foreground">How sensitive is this workload to cost?</p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  {COST_SENS.map((cs) => (
                    <OptionCard key={cs.label} label={cs.label} description={cs.description} selected={state.costSensitivity === cs.label} onClick={() => update("costSensitivity", cs.label)} />
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Monthly budget range <span className="text-muted-foreground font-normal">(optional)</span></p>
                  <Input
                    type="text"
                    placeholder="e.g. $500 – $2,000"
                    value={state.monthlyBudget}
                    onChange={(e) => update("monthlyBudget", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Screen 7: Results */}
          {step === 6 && (
            <>
              <div>
                <h2 className="text-lg font-semibold">Recommended Models for Your Use Case</h2>
                <p className="text-sm text-muted-foreground">
                  Based on your inputs, here are the best-fit models ranked by suitability.
                </p>
              </div>

              {/* Summary chips */}
              <div className="flex flex-wrap gap-2">
                {state.useCase && <Badge variant="secondary">{state.useCase}</Badge>}
                {state.objective && <Badge variant="outline">{state.objective}</Badge>}
                {state.monthlyVolume && <Badge variant="outline">{state.monthlyVolume}</Badge>}
                {state.maxLatency && <Badge variant="outline">P95: {state.maxLatency}</Badge>}
                {state.costSensitivity && <Badge variant="outline">{state.costSensitivity}</Badge>}
              </div>

              <div className="space-y-4">
                {results.map(({ model: m, score, highlights, tags }, idx) => {
                  const avgCost = ((m.inputCostPer1M + m.outputCostPer1M) / 2).toFixed(2);
                  const qualityScore = m.benchmarks.reduce((a, b) => a + b.score, 0) / m.benchmarks.length;

                  return (
                    <Card
                      key={m.id}
                      className={cn(
                        "transition-all",
                        idx === 0 && "border-primary/40 shadow-sm"
                      )}
                    >
                      <CardContent className="p-4 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {idx === 0 && (
                                <Badge className="bg-primary text-primary-foreground text-[10px]">
                                  Best Match
                                </Badge>
                              )}
                              <h3 className="font-semibold">{m.name}</h3>
                              <span className="text-xs text-muted-foreground">{m.provider}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Best for: {m.description.split(".")[0]}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-primary">{score}%</span>
                            <p className="text-[10px] text-muted-foreground">Match</p>
                          </div>
                        </div>

                        {/* Highlights */}
                        {highlights.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Key Highlights</p>
                            <ul className="space-y-0.5">
                              {highlights.map((h) => (
                                <li key={h} className="flex items-center gap-1.5 text-xs">
                                  <Check className="h-3 w-3 text-success shrink-0" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Performance Summary */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-muted/50 rounded-md p-2">
                            <p className="text-[10px] text-muted-foreground">Est. P95 Latency</p>
                            <p className="text-sm font-semibold">~{Math.round(1000 / m.tokensPerSecond * 100)}ms</p>
                          </div>
                          <div className="bg-muted/50 rounded-md p-2">
                            <p className="text-[10px] text-muted-foreground">Cost per 1K tokens</p>
                            <p className="text-sm font-semibold">€{(parseFloat(avgCost) / 1000).toFixed(4)}</p>
                          </div>
                          <div className="bg-muted/50 rounded-md p-2">
                            <p className="text-[10px] text-muted-foreground">Quality Score</p>
                            <p className="text-sm font-semibold">{qualityScore.toFixed(1)}</p>
                          </div>
                        </div>

                        {/* Tags */}
                        {tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                            ))}
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px]",
                                m.hosting === "Booster Powered"
                                  ? "border-yellow-500/30 text-yellow-600 dark:text-yellow-400"
                                  : "border-info/30 text-info"
                              )}
                            >
                              {m.hosting}
                            </Badge>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-1">
                          <Link to={`/cosmos?compare=${m.id}`}>
                            <Button variant="outline" size="sm">
                              <GitCompareArrows className="h-3.5 w-3.5 mr-1" /> Compare
                            </Button>
                          </Link>
                          <Link to={`/cosmos/${m.id}`}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Details
                            </Button>
                          </Link>
                          <Link to={`/deploy?model=${m.id}`}>
                            <Button size="sm">
                              <Plus className="h-3.5 w-3.5 mr-1" /> Add to Endpoint
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        {step < stepsMeta.length - 1 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => navigate("/cosmos")}>
            Back to Model Cosmos
          </Button>
        )}
      </div>

      {/* Save dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{loadedProfileId ? "Update Profile" : "Save Use-Case Profile"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              {saveAndExit
                ? "Save your progress and return to Model Cosmos. You can resume anytime."
                : "Save your current selections. You can continue editing or load this profile later."}
            </p>
            <Input
              placeholder="Profile name…"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmSave()}
              autoFocus
            />
            <div className="flex flex-wrap gap-1.5">
              {state.useCase && <Badge variant="secondary" className="text-[10px]">{state.useCase}</Badge>}
              {state.objective && <Badge variant="outline" className="text-[10px]">{state.objective}</Badge>}
              <Badge variant="outline" className="text-[10px]">Step {step + 1}/{stepsMeta.length}</Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button onClick={confirmSave} disabled={!saveName.trim()}>
              <Save className="h-4 w-4 mr-1" />
              {saveAndExit ? "Save & Exit" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuidedModelSelection;
