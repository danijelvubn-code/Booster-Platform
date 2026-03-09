import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deployments, endpoints } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { SessionLogsList, generateMockSessions } from "@/components/SessionLogsList";

const DeploymentLogs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const endpointId = searchParams.get("space") || "";

  const ep = endpoints.find((s) => s.id === endpointId);
  const deps = deployments[endpointId] || [];
  const allSessions = generateMockSessions(endpointId);

  const [modelFilter, setModelFilter] = useState<string>("all");

  const filteredSessions = allSessions;

  return (
    <div className="container py-8 space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Endpoint
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Session Logs</h1>
          {ep && (
            <p className="text-sm text-muted-foreground mt-1">
              {ep.name}
            </p>
          )}
        </div>
      </div>

      <SessionLogsList sessions={filteredSessions} />
    </div>
  );
};

export default DeploymentLogs;
