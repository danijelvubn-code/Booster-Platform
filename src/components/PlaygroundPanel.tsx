import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Play, Copy, RotateCcw, Clock, Zap, Euro, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlaygroundPanelProps {
  modelName: string;
  modelVersion?: string;
  provider?: string;
  costPer1MTokens?: number;
  showCreditNotice?: boolean;
}

const PlaygroundPanel = ({
  modelName,
  modelVersion,
  provider,
  costPer1MTokens = 3,
  showCreditNotice = false,
}: PlaygroundPanelProps) => {
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
          latency: 280 + Math.floor(Math.random() * 120),
          tokens: accumulated.split(/\s+/).length * 2,
          cost: ((accumulated.split(/\s+/).length * 2 / 1_000_000) * costPer1MTokens).toFixed(4),
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
    <div className="space-y-4">
      {/* Credit notice */}
      {showCreditNotice && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/60 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>Playground interactions consume credits from your account balance.</span>
        </div>
      )}

      {/* Model info bar */}
      <div className="flex items-center gap-2 text-sm">
        <Badge variant="outline" className="text-xs">{modelName}</Badge>
        {modelVersion && <span className="text-muted-foreground text-xs">v{modelVersion}</span>}
        {provider && <span className="text-muted-foreground text-xs">• {provider}</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Config */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
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
                <Slider value={temperature} onValueChange={setTemperature} min={0} max={2} step={0.1} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Max Tokens</Label>
                  <span className="text-xs text-muted-foreground font-mono">{maxTokens[0]}</span>
                </div>
                <Slider value={maxTokens} onValueChange={setMaxTokens} min={64} max={4096} step={64} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prompt & Response */}
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

export default PlaygroundPanel;
