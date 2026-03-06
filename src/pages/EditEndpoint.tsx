import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { endpoints, models } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GuardrailsStep, { defaultGuardrailsState, countEnabledGuardrails, type GuardrailsState } from "@/components/GuardrailsStep";
import PerformanceProfileStep, { getProfileSpecs, type PerformanceProfile } from "@/components/PerformanceProfileStep";
import CostTransparencyPanel from "@/components/CostTransparencyPanel";

const EditEndpoint = () => {
  const { endpointId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const ep = endpoints.find((s) => s.id === endpointId);

  const [config, setConfig] = useState({
    name: ep?.name || "",
    targetSpace: ep?.type || "Production",
    modelId: "",
    region: "scaleway-fr",
    confidentialCompute: false,
    performanceProfile: "best-effort" as PerformanceProfile,
    monthlyBudget: "5000000",
    alertThreshold: "80",
    hardCap: true,
    emailAlerts: true,
  });
  const [guardrails, setGuardrails] = useState<GuardrailsState>(defaultGuardrailsState);

  if (!ep) {
    return (
      <div className="container py-8">
        <p>Endpoint not found.</p>
        <Button variant="ghost" onClick={() => navigate("/endpoints")}>← Back to Endpoints</Button>
      </div>
    );
  }

  const updateConfig = (key: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const selectedModel = models.find((m) => m.id === config.modelId);
  const profileSpecs = getProfileSpecs(config.performanceProfile);
  const enabledGuardrailCount = countEnabledGuardrails(guardrails);

  const handleSave = () => {
    ep.name = config.name;
    ep.type = config.targetSpace as "Production" | "POC" | "Demo";
    toast({ title: "Endpoint Updated", description: `"${config.name}" has been saved.` });
    navigate(`/endpoints/${endpointId}`);
  };

  return (
    <div className="container py-8 max-w-5xl space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate(`/endpoints/${endpointId}`)}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Endpoint
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Edit Endpoint</h1>
        <p className="text-muted-foreground text-sm mt-1">Update the configuration for {ep.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Setup */}
          <Card>
            <CardHeader><CardTitle>Basic Setup</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Endpoint Name</Label>
                <Input value={config.name} onChange={(e) => updateConfig("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Target Space</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground">
                  {config.targetSpace}
                </div>
                <p className="text-xs text-muted-foreground">Target space cannot be changed after creation.</p>
              </div>
              <div className="space-y-2">
                <Label>Region</Label>
                <Select value={config.region} onValueChange={(v) => updateConfig("region", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scaleway-fr">Scaleway — France</SelectItem>
                    <SelectItem value="scaleway-nl">Scaleway — Netherlands</SelectItem>
                    <SelectItem value="scaleway-pl">Scaleway — Poland</SelectItem>
                    <SelectItem value="oxigen-es">Oxigen — Spain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Confidential Compute</Label>
                  <p className="text-xs text-muted-foreground">Isolated execution environment (Dedicated Instance only)</p>
                </div>
                <Switch checked={config.confidentialCompute} disabled />
              </div>
              <p className="text-xs text-muted-foreground -mt-2">Cannot be changed after creation.</p>
            </CardContent>
          </Card>

          {/* Performance Profile */}
          <Card>
            <CardHeader><CardTitle>Performance Profile</CardTitle></CardHeader>
            <CardContent>
              <PerformanceProfileStep
                value={config.performanceProfile}
                onChange={(v) => updateConfig("performanceProfile", v)}
              />
            </CardContent>
          </Card>

          {/* Safety & Guardrails */}
          <Card>
            <CardHeader><CardTitle>Safety & Guardrails</CardTitle></CardHeader>
            <CardContent>
              <GuardrailsStep state={guardrails} onChange={setGuardrails} />
            </CardContent>
          </Card>

          {/* Budget & Usage Controls */}
          <Card>
            <CardHeader><CardTitle>Budget & Usage Controls</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Monthly Token Budget</Label>
                <Input
                  type="number"
                  value={config.monthlyBudget}
                  onChange={(e) => updateConfig("monthlyBudget", e.target.value)}
                />
                {selectedModel && (
                  <p className="text-xs text-muted-foreground">
                    Estimated cost based on {selectedModel.name} pricing
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hard Limit Enforcement</Label>
                  <p className="text-xs text-muted-foreground">When monthly token budget is reached, new requests are stopped.</p>
                </div>
                <Switch
                  checked={config.hardCap}
                  onCheckedChange={(v) => updateConfig("hardCap", v)}
                />
              </div>
              <div className="space-y-2">
                <Label>Soft Limit Threshold (%)</Label>
                <Input
                  type="number"
                  value={config.alertThreshold}
                  onChange={(e) => updateConfig("alertThreshold", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Dashboard alert at this usage level. No traffic impact.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive alerts when thresholds are crossed</p>
                </div>
                <Switch
                  checked={config.emailAlerts}
                  onCheckedChange={(v) => updateConfig("emailAlerts", v)}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Throughput Safety Guard</Label>
                <div className="rounded-md border border-border bg-muted/50 p-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">RPM Limit</span>
                    <span className="font-medium">{profileSpecs.specs.find(s => s.label === "RPM")?.value}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TPM Limit</span>
                    <span className="font-medium">{profileSpecs.specs.find(s => s.label === "TPM")?.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    System-enforced based on selected profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Transparency Side Panel */}
        <div className="lg:col-span-1">
          <CostTransparencyPanel
            modelId={config.modelId}
            performanceProfile={config.performanceProfile}
            monthlyBudget={config.monthlyBudget}
            guardrailsEnabled={enabledGuardrailCount}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(`/endpoints/${endpointId}`)}>Cancel</Button>
        <Button onClick={handleSave} disabled={!config.name.trim()}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditEndpoint;
