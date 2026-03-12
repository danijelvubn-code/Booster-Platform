import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { models, endpoints, deployments } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import UseCaseSelect from "@/components/UseCaseSelect";
import { ArrowLeft, Check, Globe2, Server, Info, Lock } from "lucide-react";

type DeploymentType = "platform" | "external" | "opensource" | null;
type ProvisioningType = "dedicated" | "proxied" | null;

const profileLabels: Record<string, string> = {
  "best-effort": "Best Effort",
  premium: "Premium",
  enterprise: "Enterprise",
};

const DeployWizard = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const modelId = params.get("model");
  const endpointParam = params.get("space") || "";
  const model = models.find((m) => m.id === modelId);

  const [deploymentType, setDeploymentType] = useState<DeploymentType>(model ? (model.hosting === "Booster Powered" ? "opensource" : "external") : null);
  const [provisioningType, setProvisioningType] = useState<ProvisioningType>(model ? (model.hosting === "Booster Powered" ? null : "proxied") : null);
  const [selectedModelId, setSelectedModelId] = useState(modelId || "");
  const [selectedModelVersion, setSelectedModelVersion] = useState(model?.version || "");
  const [modelVersions, setModelVersions] = useState<Record<string, string>>({});
  const selectedModel = selectedModelId ? models.find((m) => m.id === selectedModelId) : undefined;

  const [config, setConfig] = useState({
    endpoint: endpointParam,
    name: model ? `${model.name.toLowerCase().replace(/\s+/g, "-")}-v1` : "",
    purpose: "" as string,
    useCases: [] as string[],
    shadowOptimization: true,
    confidentialCompute: false,
    region: "EU-West",
    tokenCap: "500000",
    softAlert: "60",
    hardStop: "90",
    targetLatency: "500",
    maxErrorRate: "1",
    externalEndpoint: "",
    externalApiKey: "",
    externalProvider: "",
  });

  const updateConfig = (key: string, value: string | boolean) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const selectedEndpoint = endpoints.find((e) => e.id === config.endpoint);

  const handleDeploy = () => {
    const targetEndpoint = config.endpoint;
    const displayModel = selectedModel?.name || config.externalProvider || "Custom Model";
    const newDep = {
      id: `dep-${Date.now()}`,
      name: config.name,
      model: displayModel,
      version: selectedModel?.version || "latest",
      mode: "Default" as "Default" | "Shadow" | "Inactive",
      budgetUsed: 0,
      slaStatus: "OK" as const,
      region: config.region,
      confidentialCompute: config.confidentialCompute,
      latencyP50: 0,
      costPer1MTokens: selectedModel?.inputCostPer1M || 3,
    };
    if (!deployments[targetEndpoint]) {
      deployments[targetEndpoint] = [];
    }
    deployments[targetEndpoint].push(newDep);
    toast({
      title: "Model Added",
      description: `"${config.name}" has been added to ${endpoints.find(s => s.id === targetEndpoint)?.name || "the endpoint"}.`,
    });
    navigate(`/endpoints/${targetEndpoint}`);
  };

  // Model picker (skip deployment type selection — all models are Booster Powered)
  if (!selectedModel) {
    const allModels = models;
    return (
      <div className="container py-8 max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" className="-ml-3" onClick={() => {
          const epId = params.get("space");
          if (epId) navigate(`/endpoints/${epId}`);
          else navigate("/endpoints");
        }}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div>
          <h1 className="text-2xl font-bold">Select Model</h1>
          <p className="text-muted-foreground text-sm mt-1">Pick a model, then choose how it should be hosted.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {allModels.map((m) => (
            <Card
              key={m.id}
              className={`cursor-pointer hover:border-primary/40 transition-colors ${selectedModelId === m.id ? "border-primary" : ""}`}
              onClick={() => {
                setSelectedModelId(m.id);
                setSelectedModelVersion(modelVersions[m.id] || m.version);
                updateConfig("name", `${m.name.toLowerCase().replace(/\s+/g, "-")}-v1`);
              }}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.provider} • {m.tokensPerSecond} tok/s</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs text-muted-foreground">
                      <p>€{m.inputCostPer1M}/1M in</p>
                      <p>€{m.outputCostPer1M}/1M out</p>
                    </div>
                  </div>
                </div>
                {m.availableVersions && m.availableVersions.length > 1 && (
                  <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                    <Label className="text-xs text-muted-foreground shrink-0">Version</Label>
                    <Select value={modelVersions[m.id] || m.version} onValueChange={(v) => { setModelVersions((prev) => ({ ...prev, [m.id]: v })); if (selectedModelId === m.id) setSelectedModelVersion(v); }}>
                      <SelectTrigger className="h-7 text-xs w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {m.availableVersions.map((v) => (
                          <SelectItem key={v} value={v} className="text-xs">
                            v{v}{v === m.version ? " (latest)" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Or <Link to="/cosmos" className="text-primary hover:underline">browse the full Model Cosmos</Link> for detailed comparisons.
        </p>
      </div>
    );
  }

  // Open Source: choose hosting mode
  if (selectedModel && provisioningType === null) {
    return (
      <div className="container py-8 max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" className="-ml-3" onClick={() => { setSelectedModelId(""); }}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Change Model
        </Button>

        <div>
          <h1 className="text-2xl font-bold">How should {selectedModel.name} be hosted?</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {selectedModel.provider} • v{selectedModelVersion || selectedModel.version}
            <Badge variant="outline" className="ml-2 text-xs">Booster Powered</Badge>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:border-primary/40 transition-colors group"
            onClick={() => setProvisioningType("proxied")}
          >
            <CardContent className="p-6 space-y-3">
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Platform Managed</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The platform hosts and manages this model for you on a shared instance. No infrastructure to manage — ready to use instantly.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-xs">Managed</Badge>
                <Badge variant="secondary" className="text-xs">Shared instance</Badge>
                <Badge variant="secondary" className="text-xs">Instant availability</Badge>
                <Badge variant="secondary" className="text-xs">No infra overhead</Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary/40 transition-colors group"
            onClick={() => setProvisioningType("dedicated")}
          >
            <CardContent className="p-6 space-y-3">
              <div className="h-11 w-11 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <Server className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dedicated Instance</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Provision an exclusive compute instance. Full control with isolated resources.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-xs">Exclusive</Badge>
                <Badge variant="secondary" className="text-xs">Full control</Badge>
                <Badge variant="secondary" className="text-xs">Isolated compute</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Single deployment screen (no advanced toggle)
  const content = (
    <div className="container py-8 max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => {
        if (deploymentType === "opensource" && provisioningType) {
          setProvisioningType(null);
        } else {
          setSelectedModelId("");
        }
      }}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Add {selectedModel?.name || "Model"} to Inference Endpoint</h1>
        <p className="text-muted-foreground text-sm mt-1">{selectedModel?.provider} • v{selectedModel?.version}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Target Inference Endpoint</Label>
            <Select value={config.endpoint} onValueChange={(v) => updateConfig("endpoint", v)}>
              <SelectTrigger><SelectValue placeholder="Select inference endpoint" /></SelectTrigger>
              <SelectContent>{endpoints.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Deployment Name</Label>
            <Input value={config.name} onChange={(e) => updateConfig("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Use Case <span className="text-destructive">*</span></Label>
            <UseCaseSelect
              value={config.useCases}
              onChange={(v) => setConfig((prev) => ({ ...prev, useCases: v }))}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-1">
              <Label>Enable Shadow Optimization</Label>
              <p className="text-xs text-muted-foreground max-w-sm">
                Allow Booster to deploy optimized models in shadow mode to analyze your traffic patterns and recommend a better-suited model.
              </p>
            </div>
            <Switch
              checked={config.shadowOptimization}
              onCheckedChange={(v) => updateConfig("shadowOptimization", v)}
            />
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4 text-sm space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Info className="h-4 w-4 text-primary" />
                <p className="font-semibold">Inherited from Endpoint Profile</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                The following defaults are applied based on the performance profile
                {selectedEndpoint ? (
                  <> configured on <strong>{selectedEndpoint.name}</strong> (<span className="capitalize">{profileLabels[selectedEndpoint.performanceProfile] || selectedEndpoint.performanceProfile}</span>)</>
                ) : (
                  <> of the selected endpoint</>
                )}. You can change these at the endpoint level.
              </p>
              {selectedEndpoint ? (
                <>
                  <p className="text-muted-foreground">• Performance Profile: <strong className="text-foreground capitalize">{profileLabels[selectedEndpoint.performanceProfile] || selectedEndpoint.performanceProfile}</strong></p>
                  <p className="text-muted-foreground">• Token Budget: <strong className="text-foreground">{(selectedEndpoint.tokenBudget / 1_000_000).toFixed(1)}M tokens/mo</strong></p>
                  <p className="text-muted-foreground">• Location: EU-West</p>
                  <p className="text-muted-foreground">• Confidential compute: Off</p>
                  {provisioningType === "dedicated" && (
                    <p className="text-muted-foreground">• Instance: Dedicated (exclusive)</p>
                  )}
                  {provisioningType === "proxied" && deploymentType === "opensource" && (
                    <p className="text-muted-foreground">• Instance: Platform Managed</p>
                  )}
                  <p className="text-muted-foreground">• Projected cost: ~€{((selectedEndpoint.tokenBudget / 1_000_000) * (selectedModel?.inputCostPer1M || 3) * 0.6).toFixed(0)} – €{((selectedEndpoint.tokenBudget / 1_000_000) * (selectedModel?.outputCostPer1M || 15)).toFixed(0)}/mo</p>
                </>
              ) : (
                <p className="text-muted-foreground italic">Select a target endpoint above to see inherited defaults.</p>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            You can adjust all settings after deployment from the endpoint configuration.
          </p>

          <div className="flex items-start gap-2 rounded-md border border-border bg-muted/50 p-3">
            <Lock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Your input data and model responses are never used to train our models and will not be shared with other users or third parties.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => {
          if (deploymentType === "opensource" && provisioningType) {
            setProvisioningType(null);
          } else {
            setSelectedModelId("");
          }
        }}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button onClick={handleDeploy} disabled={!config.endpoint || !config.name.trim() || config.useCases.length === 0}>
          Add to Endpoint <Check className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );

  // Wrap with playground dialog
  return (
    <>
      {content}

      {/* Platform Model Try Playground Dialog */}
      <Dialog open={!!tryModelId} onOpenChange={(open) => !open && setTryModelId(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Try Model — {tryModel?.name}</DialogTitle>
            <DialogDescription>{tryModel?.provider} • v{tryModel?.version}</DialogDescription>
          </DialogHeader>
          <PlaygroundPanel
            modelName={tryModel?.name || ""}
            modelVersion={tryModel?.version}
            provider={tryModel?.provider}
            costPer1MTokens={tryModel?.inputCostPer1M || 3}
            showCreditNotice
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeployWizard;
