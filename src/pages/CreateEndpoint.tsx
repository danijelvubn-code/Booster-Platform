import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { endpoints, deployments, models } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Check, Globe, Lock, Info, Rocket, Search, X, Zap, Shield, ShieldOff, Coins, Settings2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import GuardrailsStep, { defaultGuardrailsState, GuardrailsReviewSection, countEnabledGuardrails, type GuardrailsState } from "@/components/GuardrailsStep";
import PerformanceProfileStep, { getProfileSpecs, type PerformanceProfile } from "@/components/PerformanceProfileStep";
import CostTransparencyPanel from "@/components/CostTransparencyPanel";
import UseCaseSelect from "@/components/UseCaseSelect";

/* ── Model Search Select ── */
const ModelSearchSelect = ({ value, onChange }: { value: string; onChange: (id: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return models.filter(
      (m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q)
    );
  }, [search]);

  const selected = models.find((m) => m.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
          <span className="truncate">
            {selected ? `${selected.name} — ${selected.provider}` : "Search and select a model…"}
          </span>
          <span className="flex items-center gap-1 shrink-0 ml-2">
            {selected && (
              <span
                role="button"
                className="rounded-full hover:bg-muted p-0.5"
                onClick={(e) => { e.stopPropagation(); onChange(""); }}
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            )}
            <Search className="h-4 w-4 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-50 bg-popover" align="start">
        <div className="p-2 border-b border-border">
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
                onClick={() => { onChange(m.id); setOpen(false); setSearch(""); }}
                className={`w-full text-left px-2 py-1.5 rounded-sm text-sm flex items-center justify-between hover:bg-accent ${value === m.id ? "bg-accent" : ""}`}
              >
                <span>{m.name} <span className="text-muted-foreground">— {m.provider}</span></span>
                {value === m.id && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            ))
          ) : (
            <p className="px-2 py-3 text-sm text-muted-foreground text-center">No models found.</p>
          )}
          {search === "" && filtered.length >= 3 && (
            <p className="px-2 py-1.5 text-xs text-muted-foreground text-center">
              Showing {filtered.length} of {models.length} models — use search to find more
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

type WizardMode = "simple" | "expert";
const simpleSteps = ["Basic Setup", "Review & Deploy"];
const expertSteps = ["Basic Setup", "Safety & Guardrails", "Budget & Usage Controls", "Review & Deploy"];

/* Simple mode defaults */
const SIMPLE_DEFAULTS = {
  performanceProfile: "best-effort" as PerformanceProfile,
  monthlyBudget: "1000000",
  alertThreshold: "80",
  hardCap: false,
  emailAlerts: true,
  perRequestTokenCap: "",
};

const CreateEndpoint = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const preselectedModelId = searchParams.get("model") || "";
  const preselectedModel = preselectedModelId ? models.find(m => m.id === preselectedModelId) : undefined;
  const [wizardMode, setWizardMode] = useState<WizardMode>("simple");
  const [deployMode, setDeployMode] = useState<"new" | "existing">("new");
  const [existingEndpointId, setExistingEndpointId] = useState("");
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState({
    name: "",
    targetSpace: "Production",
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
  const [useCase, setUseCase] = useState<string[]>([]);
  const [guardrails, setGuardrails] = useState<GuardrailsState>(defaultGuardrailsState);

  const steps = wizardMode === "simple" ? simpleSteps : expertSteps;
  const isReviewStep = step === steps.length - 1;

  const updateConfig = (key: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleModeSwitch = (mode: WizardMode) => {
    setWizardMode(mode);
    setStep(0);
    if (mode === "simple") {
      // Reset to simple defaults
      setConfig((prev) => ({ ...prev, ...SIMPLE_DEFAULTS }));
      setGuardrails(defaultGuardrailsState);
    }
  };

  const selectedModel = models.find((m) => m.id === config.modelId);

  const handleCreate = () => {
    const newEndpointId = `sp-${Date.now()}`;
    const endpointUrl = `https://api.booster.ai/v1/endpoints/${config.targetSpace.toLowerCase()}/${config.name.toLowerCase().replace(/\s+/g, "-")}`;
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
      performanceProfile: config.performanceProfile,
    });
    if (selectedModel) {
      const regionLabel = config.region === "scaleway-fr" ? "EU-West" : config.region === "scaleway-nl" ? "EU-West" : config.region === "scaleway-pl" ? "EU-Central" : "EU-South";
      deployments[newEndpointId] = [{
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
      }];
    } else {
      deployments[newEndpointId] = [];
    }
    toast({
      title: "Inference Endpoint Deployed",
      description: `"${config.name}" has been deployed successfully.`,
    });
    navigate(`/endpoints/${newEndpointId}`);
  };

  const canProceed = () => {
    if (step === 0) {
      if (deployMode === "existing") return !!existingEndpointId && !!config.modelId;
      return config.name.trim().length > 0;
    }
    return true;
  };

  const activeProfile = wizardMode === "simple" ? "best-effort" : config.performanceProfile;
  const profileSpecs = getProfileSpecs(activeProfile);
  const enabledGuardrailCount = countEnabledGuardrails(guardrails);

  const showCostPanel = wizardMode === "expert" && step >= 1 && step <= 2;

  const estimatedCost = () => {
    if (!selectedModel) return "—";
    const budget = parseInt(config.monthlyBudget) || 0;
    const avg = ((selectedModel.inputCostPer1M + selectedModel.outputCostPer1M) / 2) / 1000;
    return `~$${((budget / 1000) * avg).toFixed(0)}`;
  };

  return (
    <div className="container py-8 max-w-5xl space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate("/endpoints")}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Inference Endpoints
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deploy Inference Endpoint</h1>
          <p className="text-muted-foreground text-sm mt-1">Configure and deploy a model inference endpoint with safety and budget controls.</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1 bg-muted/50">
          <button
            onClick={() => handleModeSwitch("simple")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              wizardMode === "simple" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="h-3.5 w-3.5" /> Quick Deploy
          </button>
          <button
            onClick={() => handleModeSwitch("expert")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              wizardMode === "expert" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings2 className="h-3.5 w-3.5" /> Expert
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium transition-colors ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/20 text-primary cursor-pointer"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step && <Check className="h-3.5 w-3.5" />}
              <span className="whitespace-nowrap">{s}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`h-px w-6 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Main content with optional cost panel */}
      <div className={showCostPanel ? "grid grid-cols-1 lg:grid-cols-3 gap-6" : ""}>
        <div className={showCostPanel ? "lg:col-span-2" : ""}>
          <Card>
            <CardHeader>
              <CardTitle>{steps[step]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Step 0: Basic Setup */}
              {step === 0 && (
                 <>
                  {/* Deploy mode toggle */}
                  {preselectedModelId && (
                    <div className="space-y-2">
                      <Label>Deploy To</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={deployMode === "new" ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => setDeployMode("new")}
                        >
                          New Inference Endpoint
                        </Button>
                        <Button
                          variant={deployMode === "existing" ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => setDeployMode("existing")}
                        >
                          Existing Inference Endpoint
                        </Button>
                      </div>
                    </div>
                  )}

                  {deployMode === "existing" ? (
                    <>
                      <div className="space-y-2">
                        <Label>Select Inference Endpoint</Label>
                        <Select value={existingEndpointId} onValueChange={setExistingEndpointId}>
                          <SelectTrigger><SelectValue placeholder="Choose an inference endpoint…" /></SelectTrigger>
                          <SelectContent>
                            {endpoints.map((ep) => (
                              <SelectItem key={ep.id} value={ep.id}>
                                {ep.name} ({ep.type})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Model</Label>
                        <ModelSearchSelect value={config.modelId} onChange={(v) => {
                          const m = models.find((mod) => mod.id === v);
                          setConfig((prev) => ({ ...prev, modelId: v, modelVersion: m?.version || "" }));
                        }} />
                      </div>
                      {existingEndpointId && (
                        <div className="rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
                          Clicking "Next" will take you to the deployment wizard for the selected endpoint.
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Inference Endpoint Name</Label>
                        <Input
                          placeholder="e.g. Claims Processing"
                          value={config.name}
                          onChange={(e) => updateConfig("name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Environment</Label>
                        <Select value={config.targetSpace} onValueChange={(v) => updateConfig("targetSpace", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Production">Production</SelectItem>
                            <SelectItem value="POC">POC</SelectItem>
                            <SelectItem value="Demo">Demo</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {config.targetSpace === "Production"
                            ? "Full SLA and monitoring. For live workloads."
                            : config.targetSpace === "POC"
                            ? "Limited budget. For proof-of-concept testing."
                            : "Sandbox environment for demos and sales."}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Use Case</Label>
                        <UseCaseSelect value={useCase} onChange={setUseCase} />
                      </div>
                      <div className="space-y-2">
                        <Label>Model Selection <span className="text-muted-foreground font-normal">(optional — can be added later)</span></Label>
                        <ModelSearchSelect value={config.modelId} onChange={(v) => {
                          const m = models.find((mod) => mod.id === v);
                          updateConfig("modelId", v);
                          setConfig((prev) => ({ ...prev, modelId: v, modelVersion: m?.version || "" }));
                        }} />
                      </div>
                      {selectedModel && selectedModel.availableVersions && selectedModel.availableVersions.length > 1 && (
                        <div className="space-y-2">
                          <Label>Model Version</Label>
                          <Select value={config.modelVersion || selectedModel.version} onValueChange={(v) => updateConfig("modelVersion", v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {selectedModel.availableVersions.map((v) => (
                                <SelectItem key={v} value={v}>
                                  v{v}{v === selectedModel.version ? " (latest)" : ""}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}


              {/* Step 1: Guardrails (Expert only) */}
              {wizardMode === "expert" && step === 1 && (
                <GuardrailsStep state={guardrails} onChange={setGuardrails} />
              )}

              {/* Step 2: Budget & Usage Controls (Expert only) */}
              {wizardMode === "expert" && step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Monthly Token Budget</Label>
                    <Input
                      type="number"
                      value={config.monthlyBudget}
                      onChange={(e) => updateConfig("monthlyBudget", e.target.value)}
                    />
                    {selectedModel && (
                      <p className="text-xs text-muted-foreground">
                        Estimated cost: {estimatedCost()}/mo based on {selectedModel.name} pricing
                      </p>
                    )}
                   </div>
                </>
              )}

              {/* Review & Deploy (both modes) */}
              {isReviewStep && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {wizardMode === "simple"
                      ? "Your endpoint will be deployed with the following defaults. Switch to Expert mode to customize."
                      : "Review your configuration before deploying."}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inference Endpoint</p>
                        <p className="font-semibold">{config.name}</p>
                        <Badge variant="secondary">{config.targetSpace}</Badge>
                        {selectedModel && <p className="text-sm">{selectedModel.name}</p>}
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Infrastructure</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" /> {config.region}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget</p>
                        <p className="text-sm">{parseInt(config.monthlyBudget).toLocaleString()} tokens/mo</p>
                        <p className="text-xs text-muted-foreground">Alert at {config.alertThreshold}%</p>
                        <p className="text-xs text-muted-foreground">Hard stop: {config.hardCap ? "Yes" : "No"}</p>
                        {selectedModel && <p className="text-sm font-medium text-primary">Est. cost: {estimatedCost()}/mo</p>}
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Guardrails</p>
                        <div className="flex items-center gap-1.5">
                          <ShieldOff className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-sm">{enabledGuardrailCount === 0 ? "None enabled" : `${enabledGuardrailCount} enabled`}</p>
                        </div>
                        {enabledGuardrailCount > 0 && <GuardrailsReviewSection state={guardrails} />}
                      </CardContent>
                    </Card>
                  </div>

                  {wizardMode === "simple" && (
                    <div className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 p-3">
                      <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        Quick Deploy uses sensible defaults: <span className="font-medium text-foreground">Best Effort</span> performance, <span className="font-medium text-foreground">no guardrails</span>, and a <span className="font-medium text-foreground">1M token/mo</span> budget.{" "}
                        <button onClick={() => handleModeSwitch("expert")} className="text-primary hover:underline font-medium">Switch to Expert</button> to customize.
                      </p>
                    </div>
                  )}

                  <div className="flex items-start gap-2 rounded-md border border-border bg-muted/50 p-3 mt-2">
                    <Lock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Your input data and model responses are never used to train our models and will not be shared with other users or third parties.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cost Transparency Side Panel */}
        {showCostPanel && (
          <div className="lg:col-span-1">
            <CostTransparencyPanel
              modelId={config.modelId}
              monthlyBudget={config.monthlyBudget}
              guardrailsEnabled={enabledGuardrailCount}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => {
            if (step === 0 && deployMode === "existing" && existingEndpointId && config.modelId) {
              navigate(`/deploy?model=${config.modelId}&space=${existingEndpointId}`);
              return;
            }
            setStep(step + 1);
          }} disabled={!canProceed()}>
            {step === 0 && deployMode === "existing" ? "Continue to Deploy" : "Next"} <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleCreate} disabled={!config.name.trim()}>
            <Rocket className="h-4 w-4 mr-1" /> Deploy Inference Endpoint
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateEndpoint;
