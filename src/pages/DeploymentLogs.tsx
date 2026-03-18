import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { deployments, endpoints } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock } from "lucide-react";
import { SessionLogsList, generateMockSessions } from "@/components/SessionLogsList";
import { Input } from "@/components/ui/input";

const PRESET_DURATIONS = [
  { label: "All Time", value: "all" },
  { label: "Last 5 min", value: "5" },
  { label: "Last 15 min", value: "15" },
  { label: "Last 30 min", value: "30" },
  { label: "Last 1 hour", value: "60" },
  { label: "Last 6 hours", value: "360" },
  { label: "Last 24 hours", value: "1440" },
  { label: "Custom (minutes)", value: "custom" },
];

const DeploymentLogs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const endpointId = searchParams.get("space") || "";

  const ep = endpoints.find((s) => s.id === endpointId);
  const allSessions = generateMockSessions(endpointId);

  const [durationPreset, setDurationPreset] = useState("all");
  const [customMinutes, setCustomMinutes] = useState("");

  const filteredSessions = useMemo(() => {
    const minutes = durationPreset === "custom"
      ? parseInt(customMinutes, 10)
      : durationPreset === "all"
        ? null
        : parseInt(durationPreset, 10);

    if (!minutes || isNaN(minutes)) return allSessions;

    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return allSessions.filter((s) => new Date(s.timestamp) >= cutoff);
  }, [allSessions, durationPreset, customMinutes]);

  return (
    <div className="container py-8 space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Endpoint
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Request Logs</h1>
          {ep && (
            <p className="text-sm text-muted-foreground mt-1">
              {ep.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Duration:</span>
        </div>
        <Select value={durationPreset} onValueChange={(v) => { setDurationPreset(v); if (v !== "custom") setCustomMinutes(""); }}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRESET_DURATIONS.map((d) => (
              <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {durationPreset === "custom" && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              placeholder="e.g. 45"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="w-28 h-9"
            />
            <span className="text-sm text-muted-foreground">minutes</span>
          </div>
        )}
        {durationPreset !== "all" && (
          <span className="text-xs text-muted-foreground">
            Showing {filteredSessions.length} of {allSessions.length} logs
          </span>
        )}
      </div>

      <SessionLogsList sessions={filteredSessions} />
    </div>
  );
};

export default DeploymentLogs;
