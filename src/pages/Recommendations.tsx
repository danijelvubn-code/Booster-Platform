import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recommendations } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Euro, Zap, Leaf, Shield, XCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const typeIcon: Record<string, typeof Euro> = {
  "Cost Optimization": Euro,
  "Performance Upgrade": Zap,
  Sustainability: Leaf,
  "Stability Improvement": Shield,
};

const typeColor: Record<string, string> = {
  "Cost Optimization": "bg-success/10 text-success",
  "Performance Upgrade": "bg-primary/10 text-primary",
  Sustainability: "bg-info/10 text-info",
  "Stability Improvement": "bg-warning/10 text-warning",
};

const Recommendations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ignoredIds, setIgnoredIds] = useState<Set<string>>(
    new Set(recommendations.filter((r) => r.status === "ignored").map((r) => r.id))
  );

  const ignoreRec = (id: string) => {
    setIgnoredIds((prev) => new Set(prev).add(id));
    toast({ title: "Recommendation ignored", description: "You can review ignored recommendations anytime." });
  };

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Recommendations</h1>
      <p className="text-muted-foreground">AI-powered optimization suggestions across your portfolio.</p>


      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = typeIcon[rec.type] || Zap;
          const isIgnored = ignoredIds.has(rec.id);
          return (
            <Card key={rec.id} className={`transition-colors ${isIgnored ? "opacity-60" : "hover:border-primary/20"}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${typeColor[rec.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{rec.title}</h3>
                      <Badge variant="secondary" className="text-xs">{rec.endpoint}</Badge>
                      {isIgnored && <Badge variant="outline" className="text-xs opacity-60">Ignored</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.explanation}</p>

                    <div className="flex gap-4 text-sm flex-wrap">
                      <span className={rec.costDelta < 0 ? "text-success" : "text-destructive"}>
                        Cost: {rec.costDelta > 0 ? "+" : ""}{rec.costDelta}%
                      </span>
                      <span className={rec.latencyDelta < 0 ? "text-success" : "text-destructive"}>
                        Latency: {rec.latencyDelta > 0 ? "+" : ""}{rec.latencyDelta}%
                      </span>
                      <span className={rec.accuracyDelta > 0 ? "text-success" : "text-warning"}>
                        Accuracy: {rec.accuracyDelta > 0 ? "+" : ""}{rec.accuracyDelta}%
                      </span>
                    </div>

                    {!isIgnored && (
                      <div className="flex gap-2 pt-2 flex-wrap">
                        <Button size="sm" onClick={() => navigate(`/deploy?model=${rec.recommendedModelId}`)}>Add to Endpoint</Button>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/cosmos/${rec.recommendedModelId}`)}>
                          <Sparkles className="h-3.5 w-3.5 mr-1" /> Analyse further
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => ignoreRec(rec.id)}
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1" /> Ignore
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
