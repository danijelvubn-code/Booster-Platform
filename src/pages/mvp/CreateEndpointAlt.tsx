import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Lock,
  RefreshCcw,
  Rocket,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { deployments, endpoints, models } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  formatContextWindowShort,
  getOverallModelScore,
  getParamSizeLabel,
  modelHasVisionCapability,
} from "@/lib/model-metrics";
import { WizardStepper } from "@/components/WizardStepper";
import { PageHeader } from "@/components/layout";
import { mvpPath } from "@/config/prototype-shell";

type StepId = 0 | 1 | 2;
type DeploymentMode = "recommended" | "manual";
type Environment = "Production" | "Staging" | "Development";
type ProviderSort = "recommended" | "lowest-cost" | "lowest-latency" | "highest-throughput" | "largest-context";

type ProviderOption = {
  id: string;
  provider: string;
  bestFor: string;
  context: string;
  contextTokens: number;
  inputPer1M: number;
  outputPer1M: number;
  latencyMs: number;
  tps: number;
  quant: string;
  certs: string[];
  reason: string;
  recommended?: boolean;
};

const STEPS = ["Basic Setup", "Provider & Model", "Review & Deploy"] as const;

const ENDPOINT_WIZARD_STEPPER_ITEMS = [
  { id: "basic", label: "Basic" },
  { id: "provider", label: "Model Provider" },
  { id: "review", label: "Review & Deploy" },
] as const;
const USE_CASE_PRESETS = [
  "Code Generation",
  "Document Extraction",
  "Customer Support",
  "Internal Search",
  "Data Analysis",
  "Content Generation",
  "Other",
] as const;

const PROVIDER_SORT_LABELS: Record<ProviderSort, string> = {
  recommended: "Recommended",
  "lowest-cost": "Lowest cost",
  "lowest-latency": "Lowest latency",
  "highest-throughput": "Highest throughput",
  "largest-context": "Largest context",
};

function formatEurPer1M(value: number): string {
  return `€${value.toFixed(2)}`;
}

function getRecommendedProvider(modelId: string): ProviderOption {
  const _selectedModel = models.find((m) => m.id === modelId) ?? models[0];
  return {
    id: "recommended",
    provider: "Mistral AI",
    bestFor: "Best overall",
    context: "32K",
    contextTokens: 32000,
    inputPer1M: 1,
    outputPer1M: 3,
    latencyMs: 620,
    tps: 120,
    quant: "FP16",
    certs: ["GDPR"],
    reason:
      "Recommended for this endpoint because it offers the best balance of cost, latency, throughput, and compliance for the selected model.",
    recommended: true,
  };
}

function getProviderOptions(modelId: string): ProviderOption[] {
  const selectedModel = models.find((m) => m.id === modelId) ?? models[0];
  return [
    getRecommendedProvider(modelId),
    {
      id: "scaleway",
      provider: "Scaleway",
      bestFor: "EU infrastructure",
      context: "128K",
      contextTokens: 128000,
      inputPer1M: 2.8,
      outputPer1M: 8.4,
      latencyMs: 640,
      tps: 26.5,
      quant: "INT8",
      certs: ["GDPR"],
      reason:
        "Scaleway provides larger context and EU infrastructure, but has higher token cost and lower throughput than the recommended option.",
    },
    {
      id: "nebius",
      provider: "Nebius",
      bestFor: "Lowest latency",
      context: "128K",
      contextTokens: 128000,
      inputPer1M: 3.1,
      outputPer1M: 9.2,
      latencyMs: 590,
      tps: 29.4,
      quant: "FP16",
      certs: ["GDPR"],
      reason:
        "Nebius provides lower latency than the recommended option, but has higher token cost and lower throughput for this workload.",
    },
    {
      id: "fireworks",
      provider: "Fireworks",
      bestFor: "Large context",
      context: "128K",
      contextTokens: 128000,
      inputPer1M: 2.95,
      outputPer1M: 8.95,
      latencyMs: 610,
      tps: 27.8,
      quant: "Q8",
      certs: ["GDPR"],
      reason:
        "Fireworks supports larger context windows, but is more expensive and lower throughput than Booster's recommended provider for this endpoint.",
    },
    {
      id: "model-provider-fallback",
      provider: selectedModel.provider,
      bestFor: "Model-native",
      context: formatContextWindowShort(selectedModel.contextLength),
      contextTokens: selectedModel.contextLength,
      inputPer1M: selectedModel.inputCostPer1M,
      outputPer1M: selectedModel.outputCostPer1M,
      latencyMs: 650,
      tps: Math.max(1, selectedModel.tokensPerSecond - 5),
      quant: "FP16",
      certs: ["GDPR"],
      reason:
        "Model-native hosting can simplify compatibility, but may not be the strongest cost-latency-throughput balance.",
    },
  ].filter((row, index, arr) => arr.findIndex((item) => item.provider === row.provider) === index);
}

const ModelSearchSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = models.find((m) => m.id === value);
  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return models.filter(
      (m) => m.name.toLowerCase().includes(query) || m.provider.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="h-control-md w-full justify-between font-normal"
          disabled={disabled}
        >
          <span className="truncate">
            {selected ? `${selected.name} - ${selected.provider}` : "Search and select a model"}
          </span>
          <Search className="h-icon-16 w-icon-16 text-muted-foreground" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="border-b border-border p-2">
          <Input
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-control-sm"
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {filtered.length > 0 ? (
            filtered.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  onChange(model.id);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-accent",
                  value === model.id ? "bg-accent" : "bg-transparent",
                )}
              >
                <span className="text-body-sm">
                  {model.name} <span className="text-muted-foreground">- {model.provider}</span>
                </span>
                {value === model.id ? <Check className="h-icon-16 w-icon-16 text-primary" /> : null}
              </button>
            ))
          ) : (
            <p className="px-3 py-4 text-center text-body-sm text-muted-foreground">No models found.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function MvpCreateEndpointAlt() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const preselectedModelId = searchParams.get("model") || "";
  const defaultModelId = preselectedModelId && models.some((m) => m.id === preselectedModelId)
    ? preselectedModelId
    : models[0].id;

  const [step, setStep] = useState<StepId>(0);
  const [endpointName, setEndpointName] = useState("");
  const [environment, setEnvironment] = useState<Environment>("Production");
  const [useCase, setUseCase] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>("recommended");
  const [providerSort, setProviderSort] = useState<ProviderSort>("highest-throughput");
  const [selectedModelId, setSelectedModelId] = useState(defaultModelId);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("recommended");
  const [isDeploying, setIsDeploying] = useState(false);

  const selectedModel = useMemo(
    () => models.find((m) => m.id === selectedModelId) ?? models[0],
    [selectedModelId],
  );

  const providerOptions = useMemo(() => getProviderOptions(selectedModel.id), [selectedModel.id]);
  const recommendedProvider = useMemo(
    () => providerOptions.find((provider) => provider.recommended) ?? providerOptions[0],
    [providerOptions],
  );

  const selectedProvider = useMemo(
    () =>
      providerOptions.find((provider) => provider.id === selectedProviderId) ??
      recommendedProvider,
    [providerOptions, recommendedProvider, selectedProviderId],
  );

  const sortedProviders = useMemo(() => {
    const rows = [...providerOptions];
    switch (providerSort) {
      case "lowest-cost":
        rows.sort((a, b) => a.inputPer1M + a.outputPer1M - (b.inputPer1M + b.outputPer1M));
        return rows;
      case "lowest-latency":
        rows.sort((a, b) => a.latencyMs - b.latencyMs);
        return rows;
      case "highest-throughput":
        rows.sort((a, b) => b.tps - a.tps);
        return rows;
      case "largest-context":
        rows.sort((a, b) => b.contextTokens - a.contextTokens);
        return rows;
      case "recommended":
      default:
        rows.sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)));
        return rows;
    }
  }, [providerOptions, providerSort]);

  const canProceed = useMemo(() => {
    if (step === 0) {
      return endpointName.trim().length > 0 && useCase.trim().length > 0;
    }
    if (step === 1) {
      return Boolean(selectedModel) && Boolean(selectedProvider);
    }
    return true;
  }, [endpointName, selectedModel, selectedProvider, step, useCase]);

  const estimatedMonthlyCost = useMemo(() => {
    const averagePer1M = (selectedProvider.inputPer1M + selectedProvider.outputPer1M) / 2;
    return averagePer1M.toFixed(0);
  }, [selectedProvider.inputPer1M, selectedProvider.outputPer1M]);

  const selectedModelScore = Math.round(getOverallModelScore(selectedModel));
  const modelSizeTag = getParamSizeLabel(selectedModel.name) ?? "Model";
  const modelTags = [modelSizeTag, modelHasVisionCapability(selectedModel) ? "MULTIMODAL" : "TEXT", "API"];

  const handlePresetClick = (preset: string) => {
    setSelectedPreset((current) => (current === preset ? null : preset));
    if (!useCase.trim()) {
      setUseCase(`${preset} use case for enterprise inference endpoint.`);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    setSelectedProviderId("recommended");
    if (deploymentMode === "manual") {
      setDeploymentMode("recommended");
    }
  };

  const handleDeploymentModeChange = (mode: DeploymentMode) => {
    setDeploymentMode(mode);
    if (mode === "recommended") {
      setSelectedProviderId("recommended");
    }
  };

  const goToStep = (target: StepId) => {
    if (target < step) {
      setStep(target);
    }
  };

  const goNext = () => {
    if (!canProceed) return;
    setStep((current) => (current < 2 ? ((current + 1) as StepId) : current));
  };

  const goBack = () => {
    setStep((current) => (current > 0 ? ((current - 1) as StepId) : current));
  };

  const handleDeploy = () => {
    if (!canProceed || isDeploying) return;
    setIsDeploying(true);

    window.setTimeout(() => {
      const newEndpointId = `sp-${Date.now()}`;
      const slug = endpointName.trim().toLowerCase().replace(/\s+/g, "-");
      const endpointUrl = `https://api.booster.ai/v1/endpoints/${environment.toLowerCase()}/${slug}`;
      const endpointType = environment === "Production" ? "Production" : environment === "Staging" ? "POC" : "Demo";

      endpoints.push({
        id: newEndpointId,
        name: endpointName.trim(),
        type: endpointType,
        defaultDeployment: selectedModel.name,
        budgetUsed: 0,
        health: "OK",
        monthlySpend: 0,
        inputTokens: 0,
        outputTokens: 0,
        endpoint: endpointUrl,
        tokenBudget: 1_000_000,
        monthlyBudgetEur: Math.max(1, Math.round(Number(estimatedMonthlyCost))),
        performanceProfile: "best-effort",
      });

      deployments[newEndpointId] = [
        {
          id: `dep-${Date.now()}`,
          name: `${selectedModel.name.toLowerCase().replace(/\s+/g, "-")}-${slug}`,
          model: selectedModel.name,
          version: selectedModel.version,
          mode: "Shared",
          budgetUsed: 0,
          slaStatus: "OK",
          region: selectedProvider.provider === "Scaleway" ? "EU-West" : "EU-Central",
          confidentialCompute: false,
          latencyP50: selectedProvider.latencyMs,
          costPer1MTokens: selectedProvider.inputPer1M,
        },
      ];

      toast({
        title: "Endpoint deployed",
        description: `"${endpointName.trim()}" is live on ${selectedProvider.provider}.`,
      });
      navigate(mvpPath("/overview"));
    }, 900);
  };

  return (
    <div className="container max-w-6xl flex h-full min-h-0 flex-1 flex-col gap-4 overflow-hidden py-4">
      <PageHeader
        leading={
          <Button variant="ghost" size="sm" className="-ml-3 w-fit" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
          </Button>
        }
        titleSize="section"
        title="Deploy Inference Endpoint"
        description="Configure and deploy a model inference endpoint with safety and budget controls."
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-endpoint-deploy-wizard">
        <aside className="h-full min-w-0 lg:col-span-1">
          <Card className="flex h-full flex-col overflow-hidden p-0">
            <div className="flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-between gap-x-3 border-b border-border bg-success/7 px-4">
              <span className="min-w-0 flex-1 truncate text-body-sm-strong leading-tight text-foreground">{selectedModel.name}</span>
              <span className="shrink-0 text-h2 leading-none text-success tabular-nums">{selectedModelScore}</span>
            </div>
            <div className="space-y-4 border-b border-border p-4">
              <p className="text-body-sm text-muted-foreground">{selectedModel.description}</p>
              <div className="flex flex-wrap gap-2">
                {modelTags.map((tag) => (
                  <Badge key={tag} variant="outline" appearance="ghost" size="24">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-body-sm text-muted-foreground">Status</span>
                <Badge variant="success" size="20">Active</Badge>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-body-sm text-muted-foreground">Version</span>
                <span className="text-body-sm text-foreground">v{selectedModel.version}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-body-sm text-muted-foreground">Domain</span>
                <span className="text-body-sm text-foreground">{selectedModel.domain}</span>
              </div>
            </div>
            <div className="mt-auto border-t border-border p-3">
              <Button variant="outline" className="w-full" onClick={() => navigate(mvpPath("/cosmos"))}>
                <RefreshCcw className="mr-1 h-icon-16 w-icon-16" /> Swap Model
              </Button>
            </div>
          </Card>
        </aside>

        <section className="min-h-0 h-full min-w-0 lg:col-span-1">
          <Card className="flex h-full flex-col overflow-hidden p-0">
            <div className="flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-center border-b border-border px-4">
            <WizardStepper
              className="min-h-0 min-w-0"
              steps={[...ENDPOINT_WIZARD_STEPPER_ITEMS]}
              currentStep={step}
              onStepChange={(index) => goToStep(index as StepId)}
            />
            </div>

            {step === 0 ? (
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                <div className="space-y-1">
                  <h2 className="text-h3 text-foreground">Basic Setup</h2>
                  <p className="text-body-sm text-muted-foreground">
                    Define where the model will run and how it will be identified within your project.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint-name">
                    Inference Endpoint Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="endpoint-name"
                    value={endpointName}
                    onChange={(event) => setEndpointName(event.target.value)}
                    placeholder="Name your endpoint..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Use Case Preset</Label>
                  <div className="flex flex-wrap gap-2">
                    {USE_CASE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={cn(
                          "rounded-md border px-3 py-1.5 text-body-sm transition-colors",
                          selectedPreset === preset
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="use-case">Use Case Description</Label>
                  <Textarea
                    id="use-case"
                    size="lg"
                    required
                    placeholder="Describe your use case in a few sentences. For example: We need to process insurance claim documents and extract policy numbers, dates, and damage descriptions."
                    value={useCase}
                    onChange={(event) => setUseCase(event.target.value)}
                  />
                  <p className="text-caption text-muted-foreground">
                    Use case context helps Booster recommend the best model and provider.
                  </p>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-h3 text-foreground">Select deployment provider</h2>
                    <p className="text-body-sm text-muted-foreground">
                      Select the provider that best matches your cost, performance, context, and compliance requirements.
                    </p>
                  </div>
                  <Select
                    value={providerSort}
                    onValueChange={(value) => setProviderSort(value as ProviderSort)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PROVIDER_SORT_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto rounded-lg border border-border">
                  <Table size="md">
                    <TableHeader>
                      <TableRow className="h-14 hover:bg-transparent">
                        <TableHead className="w-10" />
                        <TableHead>Provider</TableHead>
                        <TableHead>Context</TableHead>
                        <TableHead className="text-right">In / 1M</TableHead>
                        <TableHead className="text-right">Out / 1M</TableHead>
                        <TableHead className="text-right">Latency</TableHead>
                        <TableHead className="text-right">TPS</TableHead>
                        <TableHead className="text-right">Quant.</TableHead>
                        <TableHead className="text-right">Certs</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProviders
                        .filter((provider) => provider.id !== "model-provider-fallback")
                        .map((provider) => {
                          const isSelected = selectedProvider.id === provider.id;
                          return (
                            <TableRow
                              key={provider.id}
                              className={cn(
                                "h-14 cursor-pointer",
                                isSelected ? "bg-primary/5" : "hover:bg-muted/50",
                              )}
                              onClick={() => setSelectedProviderId(provider.id)}
                            >
                              <TableCell>
                                <span
                                  className={cn(
                                    "flex h-icon-16 w-icon-16 items-center justify-center rounded-full border",
                                    isSelected ? "border-primary bg-primary" : "border-border bg-background",
                                  )}
                                >
                                  {isSelected ? <Check className="h-3 w-3 text-primary-foreground" /> : null}
                                </span>
                              </TableCell>
                              <TableCell className="text-body-sm text-foreground">{provider.provider}</TableCell>
                              <TableCell className="text-body-sm text-foreground">{provider.context}</TableCell>
                              <TableCell className="text-right text-body-sm text-foreground">
                                {formatEurPer1M(provider.inputPer1M)}
                              </TableCell>
                              <TableCell className="text-right text-body-sm text-foreground">
                                {formatEurPer1M(provider.outputPer1M)}
                              </TableCell>
                              <TableCell className="text-right text-body-sm text-foreground">
                                {provider.latencyMs}ms
                              </TableCell>
                              <TableCell className="text-right text-body-sm text-foreground">
                                {provider.tps.toFixed(1)}
                              </TableCell>
                              <TableCell className="text-right text-body-sm text-foreground">
                                {provider.quant}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge
                                  variant="success"
                                  appearance="ghost"
                                  size="24"
                                  className="font-normal"
                                  leadingIcon={<CheckCircle2 aria-hidden />}
                                >
                                  {provider.certs.join(", ")}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>

                <p className="text-center text-body-sm text-muted-foreground">
                  Provider choice affects cost, latency, throughput, and context window.
                </p>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                <div className="space-y-1">
                  <h2 className="text-h3 text-foreground">Review &amp; Deploy</h2>
                  <p className="text-body-sm text-muted-foreground">
                    Review your configuration before deploying. Default budget and safety settings can be changed later.
                  </p>
                </div>
                <Card className="bg-muted/20">
                  <CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
                    <CardTitle className="text-body-sm-strong">Basic</CardTitle>
                    <button type="button" onClick={() => setStep(0)} className="text-caption text-primary">
                      Edit
                    </button>
                  </CardHeader>
                  <CardContent className="grid gap-2 pt-0 text-body-sm md:grid-cols-endpoint-review-label">
                    <span className="text-muted-foreground">Endpoint name:</span>
                    <span className="text-foreground">{endpointName || selectedModel.domain}</span>
                    <span className="text-muted-foreground">Use Case:</span>
                    <span className="text-foreground">{useCase || "—"}</span>
                  </CardContent>
                </Card>

                <Card className="bg-muted/20">
                  <CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
                    <CardTitle className="text-body-sm-strong">Deployment provider</CardTitle>
                    <button type="button" onClick={() => setStep(1)} className="text-caption text-primary">
                      Edit
                    </button>
                  </CardHeader>
                  <CardContent className="grid gap-3 pt-0 text-body-sm md:grid-cols-2">
                    <div className="grid grid-cols-endpoint-review-label gap-y-1.5">
                      <span className="text-muted-foreground">Provider:</span>
                      <span className="text-foreground">{selectedProvider.provider.replace(" AI", "")}</span>
                      <span className="text-muted-foreground">Context:</span>
                      <span className="text-foreground">{selectedProvider.context}</span>
                      <span className="text-muted-foreground">Quant:</span>
                      <span className="text-foreground">{selectedProvider.quant}</span>
                      <span className="text-muted-foreground">Certs:</span>
                      <span className="text-foreground">{selectedProvider.certs.join(", ")}</span>
                    </div>
                    <div className="grid grid-cols-endpoint-review-label gap-y-1.5">
                      <span className="text-muted-foreground">Input:</span>
                      <span className="text-foreground">{formatEurPer1M(selectedProvider.inputPer1M)} / 1M</span>
                      <span className="text-muted-foreground">Output:</span>
                      <span className="text-foreground">{formatEurPer1M(selectedProvider.outputPer1M)} / 1M</span>
                      <span className="text-muted-foreground">Avg latency:</span>
                      <span className="text-foreground">{selectedProvider.latencyMs}ms</span>
                      <span className="text-muted-foreground">Tokens / second:</span>
                      <span className="text-foreground">{selectedProvider.tps.toFixed(1)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-body-sm-strong">Deployment provider</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 pt-0 text-body-sm md:grid-cols-2">
                    <div className="grid grid-cols-endpoint-review-label gap-y-1.5">
                      <span className="text-muted-foreground">Monthly budget:</span>
                      <span className="text-foreground">1,000,000 tokens/mo</span>
                      <span className="text-muted-foreground">Est. cost:</span>
                      <span className="text-foreground">~€{estimatedMonthlyCost}/mo</span>
                    </div>
                    <div className="grid grid-cols-endpoint-review-label gap-y-1.5">
                      <span className="text-muted-foreground">Alert:</span>
                      <span className="text-foreground">at 80%</span>
                      <span className="text-muted-foreground">Hard stop:</span>
                      <span className="text-foreground">No</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3">
                  <span className="mt-0.5 flex h-icon-16 w-icon-16 items-center justify-center rounded-full border border-border">
                    <Check className="h-3 w-3 text-muted-foreground" />
                  </span>
                  <p className="text-caption text-muted-foreground">
                    Your input data and model responses are never used to train models and will not be shared with other users or third parties.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="border-t border-border p-3">
              <div className="flex items-center justify-between gap-3">
                <Button variant="outline" onClick={goBack} disabled={step === 0 || isDeploying}>
                  <ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
                </Button>

                {step < 2 ? (
                  <Button onClick={goNext} disabled={!canProceed || isDeploying}>
                    Next <ArrowRight className="ml-1 h-icon-16 w-icon-16" />
                  </Button>
                ) : (
                  <Button onClick={handleDeploy} disabled={!canProceed || isDeploying}>
                    {isDeploying ? (
                      <>
                        <Activity className="mr-1 h-icon-16 w-icon-16" /> Deploying endpoint...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-1 h-icon-16 w-icon-16" /> Deploy inference endpoint
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
