import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { endpoints, deployments } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Key, Pencil } from "lucide-react";
import { ApiKeysDialog } from "@/components/ApiKeysDialog";
import { useAuth } from "@/contexts/AuthContext";
import { endpointEditPath, endpointsHubPath } from "@/lib/app-paths";

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-caption-strong uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-body-strong text-foreground">{value}</p>
    </div>
  );
}

const EndpointDetail = () => {
  const { endpointId } = useParams();
  const { track } = useAuth();
  const hubPath = endpointsHubPath(track);
  const editPath = endpointEditPath(endpointId ?? "", track);
  const ep = endpoints.find((s) => s.id === endpointId);
  const deps = deployments[endpointId || ""] || [];
  const [showApiKeys, setShowApiKeys] = useState(false);

  const defaultDep = deps.find((d) => d.mode === "Default") ?? deps[0];
  const deploymentName = defaultDep?.name ?? ep?.defaultDeployment ?? "—";
  const modelLabel =
    defaultDep !== undefined ? `${defaultDep.model} ${defaultDep.version}` : "—";

  if (!ep) {
    return (
      <div className="container py-8">
        <p className="text-body text-muted-foreground">Inference Endpoint not found.</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to={hubPath}>← Back to Inference Endpoints</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <Button asChild variant="ghost" size="sm" className="-ml-3 h-auto px-3 py-2 text-body-sm text-muted-foreground hover:text-foreground">
        <Link to={hubPath}>
          <ArrowLeft className="mr-2 h-4 w-4 shrink-0" aria-hidden />
          Inference Endpoints
        </Link>
      </Button>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{ep.name}</h1>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Edit inference endpoint"
            >
              <Link to={editPath}>
                <Pencil className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <p className="font-mono text-body-sm text-muted-foreground break-all">{ep.endpoint}</p>
          {ep.description ? (
            <p className="max-w-3xl text-body text-muted-foreground">{ep.description}</p>
          ) : null}
        </div>
        <div className="shrink-0">
          <Button type="button" variant="outline" onClick={() => setShowApiKeys(true)}>
            <Key className="mr-2 h-4 w-4" aria-hidden />
            API Keys
          </Button>
        </div>
      </div>

      <Card className="border border-border shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-h3">Model</CardTitle>
        </CardHeader>
        <CardContent className="pb-6 pt-2">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <DetailStat label="Name" value={deploymentName} />
            <DetailStat label="Model" value={modelLabel} />
            <DetailStat label="Token In" value={ep.inputTokens.toLocaleString()} />
            <DetailStat label="Token Out" value={ep.outputTokens.toLocaleString()} />
          </div>
        </CardContent>
      </Card>

      <ApiKeysDialog open={showApiKeys} onOpenChange={setShowApiKeys} spaceName={ep.name} spaceId={ep.id} />
    </div>
  );
};

export default EndpointDetail;
