import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { deployments, endpoints } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, Copy, RotateCcw, Clock, Zap, Euro, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const allDeployments = Object.entries(deployments).flatMap(([endpointId, deps]) =>
  deps.map((d) => ({ ...d, endpointId, endpointName: endpoints.find((s) => s.id === endpointId)?.name || endpointId }))
);

const Playground = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const depId = params.get("deployment");
  const endpointId = params.get("space");

  const selectedDep = allDeployments.find((d) => d.id === depId);
  const [activeDep, setActiveDep] = useState(selectedDep?.id || allDeployments[0]?.id || "");
  const currentDep = allDeployments.find((d) => d.id === activeDep);

  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant.");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([512]);
  const [response, setResponse] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<{ latency: number; tokens: number; cost: string } | null>(null);
  const { toast } = useToast();

  const handleRun = () => {
    if (!prompt.trim()) return;
    setIsRunning(true);
    setResponse("");
    setMetrics(null);

    // Simulate a streaming response
    const words = [
      "Based on the input provided, ",
      "I can help you with that. ",
      "Here's a detailed analysis:\n\n",
      "1. The data indicates strong performance across all metrics. ",
      "2. Token usage remains within the allocated budget. ",
      "3. Latency is well within acceptable SLA thresholds.\n\n",
      "Overall, the deployment is performing optimally ",
      "and no immediate action is required. ",
      "Let me know if you need further details.",
    ];

    let i = 0;
    let accumulated = "";
    const interval = setInterval(() => {
      if (i < words.length) {
        accumulated += words[i];
        setResponse(accumulated);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setMetrics({
          latency: currentDep ? currentDep.latencyP50 + Math.floor(Math.random() * 80) : 300,
          tokens: accumulated.split(/\s+/).length * 2,
          cost: ((accumulated.split(/\s+/).length * 2 / 1_000_000) * (currentDep?.costPer1MTokens || 3)).toFixed(4),
        });
      }
    }, 150);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    toast({ title: "Copied", description: "Response copied to clipboard." });
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
    setMetrics(null);
  };

  return (
    <div className="container py-8 space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Playground</h1>
          <p className="text-muted-foreground text-sm mt-1">Test your deployed models interactively</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Config Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Deployment</Label>
                <Select value={activeDep} onValueChange={setActiveDep}>
                  <SelectTrigger><SelectValue placeholder="Select deployment" /></SelectTrigger>
                  <SelectContent>
                    {allDeployments.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name} <span className="text-muted-foreground">({d.endpointName})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentDep && (
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">{currentDep.model}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">{currentDep.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{currentDep.region}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mode</span>
                    <Badge variant="outline" className="text-xs">{currentDep.mode}</Badge>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>System Prompt</Label>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={3}
                  className="text-xs"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Temperature</Label>
                  <span className="text-xs text-muted-foreground font-mono">{temperature[0]}</span>
                </div>
                <Slider
                  size="dense"
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={2}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Max Tokens</Label>
                  <span className="text-xs text-muted-foreground font-mono">{maxTokens[0]}</span>
                </div>
                <Slider
                  size="dense"
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                  min={64}
                  max={4096}
                  step={64}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Prompt & Response */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Prompt</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleReset} disabled={isRunning}>
                    <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
                  </Button>
                  <Button size="sm" onClick={handleRun} disabled={isRunning || !prompt.trim()}>
                    {isRunning ? (
                      <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Running...</>
                    ) : (
                      <><Play className="h-3.5 w-3.5 mr-1" /> Run</>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your test prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                disabled={isRunning}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Response</CardTitle>
                {response && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {response ? (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
                  {response}
                  {isRunning && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Response will appear here after running a prompt.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Latency</p>
                    <p className="text-lg font-bold">{metrics.latency}ms</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tokens</p>
                    <p className="text-lg font-bold">{metrics.tokens}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Euro className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Cost</p>
                    <p className="text-lg font-bold">€{metrics.cost}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;
