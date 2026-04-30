import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Info, Lock, Rocket, Search, X } from "lucide-react";

import { endpoints, deployments, models } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { defaultGuardrailsState, countEnabledGuardrails, type GuardrailsState } from "@/components/GuardrailsStep";
import { type PerformanceProfile } from "@/components/PerformanceProfileStep";

const ModelSearchSelect = ({ value, onChange }: { value: string; onChange: (id: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return models.filter((m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q));
  }, [search]);

  const selected = models.find((m) => m.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="h-control-md w-full justify-between font-normal">
          <span className="truncate">
            {selected ? `${selected.name} — ${selected.provider}` : "Search and select a model…"}
          </span>
          <span className="ml-2 flex shrink-0 items-center gap-1">
            {selected && (
              <span
                role="button"
                className="rounded-full p-0.5 hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            )}
            <Search className="h-4 w-4 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] z-50 bg-popover p-0" align="start">
        <div className="border-b border-border p-2">
          <Input
            placeholder="Search models…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
            autoFocus
          />
        </div>
        <div className="max-h-56 overflow-y-auto p-1">
          {filtered.length > 0 ? (
            filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onChange(m.id);
                  setOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent ${value === m.id ? "bg-accent" : ""}`}
              >
                <span>
                  {m.name} <span className="text-muted-foreground">— {m.provider}</span>
                </span>
                {value === m.id && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            ))
          ) : (
            <p className="px-2 py-3 text-center text-sm text-muted-foreground">No models found.</p>
          )}
          {search === "" && filtered.length >= 3 && (
            <p className="px-2 py-1.5 text-center text-xs text-muted-foreground">
              Showing {filtered.length} of {models.length} models — use search to find more
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const STEPS = ["Basic Setup", "Review & Deploy"] as const;
const HOSTING_PROVIDERS = ["Openchip", "Scaleway", "Booster EU"] as const;
const USE_CASE_PLACEHOLDER =
  "Describe your use case in a few sentences, e.g., 'We need to process insurance claims documents and extract key information like policy numbers, dates, and damage amounts for automated underwriting.'";

/**
 * MVP create-endpoint wizard. Mirrors `pages/CreateEndpoint.tsx` but stays inside the MVP track:
 * back button uses browser history; success navigates to `/mvp/overview`.
 * Edit independently from the post-MVP version.
 */
const MvpCreateEndpoint = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const preselectedModelId = searchParams.get("model") || "";
  const preselectedModel = preselectedModelId ? models.find((m) => m.id === preselectedModelId) : undefined;
  const [step, setStep] = useState(0);
  const [useCaseDescription, setUseCaseDescription] = useState("");
  const [config, setConfig] = useState({
    name: "",
    targetSpace: "Production",
    hostingProvider: "Openchip" as (typeof HOSTING_PROVIDERS)[number],
    modelId: preselectedModelId,
    modelVersion: preselectedModel?.version || "",
    region: "scaleway-fr",
    confidentialCompute: false,
    performanceProfile: "best-effort" as PerformanceProfile,
    monthlyBudget: "1000000",
    alertThreshold: "80",
    hardCap: false,
    emailAlerts: true,
    perRequestTokenCap: "",
  });
  const [guardrails] = useState<GuardrailsState>(defaultGuardrailsState);

  const isReviewStep = step === STEPS.length - 1;
  const selectedModel = models.find((m) => m.id === config.modelId);
  const enabledGuardrailCount = countEnabledGuardrails(guardrails);

  const updateConfig = (key: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = () => {
    const newEndpointId = `sp-${Date.now()}`;
    const endpointUrl = `https://api.booster.ai/v1/endpoints/${config.targetSpace.toLowerCase()}/${config.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    endpoints.push({
      id: newEndpointId,
      name: config.name,
      type: config.targetSpace as "Production" | "POC" | "Demo",
      defaultDeployment: selectedModel?.name ?? "—",
      budgetUsed: 0,
      health: "OK",
      monthlySpend: 0,
      inputTokens: 0,
      outputTokens: 0,
      endpoint: endpointUrl,
      tokenBudget: parseInt(config.monthlyBudget) || 1_000_000,
      monthlyBudgetEur: Math.max(0, Math.round((parseInt(config.monthlyBudget) || 1_000_000) / 1000)),
      performanceProfile: config.performanceProfile,
    });
    if (selectedModel) {
      const regionLabel =
        config.region === "scaleway-fr"
          ? "EU-West"
          : config.region === "scaleway-nl"
            ? "EU-West"
            : config.region === "scaleway-pl"
              ? "EU-Central"
              : "EU-South";
      deployments[newEndpointId] = [
        {
          id: `dep-${Date.now()}`,
          name: `${selectedModel.name.toLowerCase().replace(/\s+/g, "-")}-${config.name.toLowerCase().replace(/\s+/g, "-")}`,
          model: selectedModel.name,
          version: config.modelVersion || selectedModel.version,
          mode: "Shared",
          budgetUsed: 0,
          slaStatus: "OK",
          region: regionLabel,
          confidentialCompute: config.confidentialCompute,
          latencyP50: 0,
          costPer1MTokens: selectedModel.inputCostPer1M,
        },
      ];
    } else {
      deployments[newEndpointId] = [];
    }
    toast({
      title: "Inference Endpoint Deployed",
      description: `"${config.name}" has been deployed successfully.`,
    });
    navigate("/mvp/overview");
  };

  const estimatedCost = () => {
    if (!selectedModel) return "—";
    const budget = parseInt(config.monthlyBudget) || 0;
    const avg = (selectedModel.inputCostPer1M + selectedModel.outputCostPer1M) / 2 / 1000;
    return `~$${((budget / 1000) * avg).toFixed(0)}`;
  };

  const canProceed = () => {
    if (step === 0) {
      return config.name.trim().length > 0 && useCaseDescription.trim().length > 0;
    }
    return true;
  };

  return (
    <div className="container space-y-6 py-8">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Create Inference Endpoint</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Configure and deploy a model inference endpoint with safety and budget controls.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (i < step) setStep(i);
              }}
              className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                    ? "cursor-pointer bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step && <Check className="h-3.5 w-3.5" />}
              <span className="whitespace-nowrap">{s}</span>
            </button>
            {i < STEPS.length - 1 && <div className={`h-px w-6 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="endpoint-name">Inference Endpoint Name</Label>
                <Input
                  id="endpoint-name"
                  placeholder="e.g. Claims Processing"
                  value={config.name}
                  onChange={(e) => updateConfig("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="use-case">
                  Use case <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="use-case"
                  size="lg"
                  required
                  placeholder={USE_CASE_PLACEHOLDER}
                  value={useCaseDescription}
                  onChange={(e) => setUseCaseDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select
                  value={config.hostingProvider}
                  onValueChange={(v) => updateConfig("hostingProvider", v as (typeof HOSTING_PROVIDERS)[number])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HOSTING_PROVIDERS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Model selection{" "}
                  <span className="font-normal text-muted-foreground">(optional — can be added later)</span>
                </Label>
                <ModelSearchSelect
                  value={config.modelId}
                  onChange={(v) => {
                    const m = models.find((mod) => mod.id === v);
                    setConfig((prev) => ({ ...prev, modelId: v, modelVersion: m?.version || "" }));
                  }}
                />
              </div>
              {selectedModel && selectedModel.availableVersions && selectedModel.availableVersions.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Label>Booster variant</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-xs">
                        This is the serving profile of the model optimised and hosted by Booster.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={config.modelVersion || selectedModel.version}
                    onValueChange={(v) => updateConfig("modelVersion", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedModel.availableVersions.map((v) => (
                        <SelectItem key={v} value={v}>
                          v{v}
                          {v === selectedModel.version ? " (latest)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          {isReviewStep && (
            <div className="space-y-4">
              <p className="text-body-sm text-muted-foreground">
                Review your configuration before deploying. Default budget and performance settings apply; you can change
                them in the product later.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-muted/50">
                  <CardContent className="space-y-2 p-4">
                    <p className="text-caption font-semibold uppercase tracking-wider text-muted-foreground">
                      Inference endpoint
                    </p>
                    <p className="font-semibold">{config.name || "—"}</p>
                    <Badge variant="secondary">{config.targetSpace}</Badge>
                    <p className="text-body-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Provider:</span> {config.hostingProvider}
                    </p>
                    {useCaseDescription && (
                      <p className="line-clamp-4 text-body-sm text-foreground/90">{useCaseDescription}</p>
                    )}
                    {selectedModel && <p className="text-body-sm">{selectedModel.name}</p>}
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="space-y-2 p-4">
                    <p className="text-caption font-semibold uppercase tracking-wider text-muted-foreground">Budget</p>
                    <p className="text-body-sm">{parseInt(config.monthlyBudget, 10).toLocaleString()} tokens/mo</p>
                    <p className="text-xs text-muted-foreground">Alert at {config.alertThreshold}%</p>
                    <p className="text-xs text-muted-foreground">Hard stop: {config.hardCap ? "Yes" : "No"}</p>
                    {selectedModel && (
                      <p className="text-sm font-medium text-primary">Est. cost: {estimatedCost()}/mo</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Guardrails: {enabledGuardrailCount === 0 ? "None enabled" : `${enabledGuardrailCount} enabled`}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-2 flex items-start gap-2 rounded-md border border-border bg-muted/50 p-3">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your input data and model responses are never used to train our models and will not be shared with
                  other users or third parties.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
            Next <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleCreate} disabled={!config.name.trim() || !useCaseDescription.trim()}>
            <Rocket className="mr-1 h-4 w-4" /> Deploy inference endpoint
          </Button>
        )}
      </div>
    </div>
  );
};

export default MvpCreateEndpoint;
