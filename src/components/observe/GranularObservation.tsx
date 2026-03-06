import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { SessionLogsList, generateMockSessions } from "@/components/SessionLogsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { endpoints, deployments, generateUsageData, generateLatencyData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Activity, Clock, Euro, Zap, Key, AlertTriangle, CalendarIcon, X, Layers } from "lucide-react";

// Get all unique deployed models across endpoints
const allDeployments = Object.values(deployments).flat();
const uniqueModels = [...new Set(allDeployments.map((d) => d.model))];

// Mock API keys per endpoint
const mockApiKeys: Record<string, { id: string; name: string; prefix: string }[]> = {
  "sp-1": [
    { id: "key-prod-1", name: "Production", prefix: "bdc_a3f8...x9k2" },
    { id: "key-def-1", name: "Default", prefix: "bdc_7m2q...p4w1" },
  ],
  "sp-2": [
    { id: "key-shadow-1", name: "Shadow Monitor", prefix: "bdc_k9p2...m3v7" },
    { id: "key-prod-2", name: "Production", prefix: "bdc_q4w8...j2n5" },
  ],
  "sp-3": [
    { id: "key-tenant-a", name: "Tenant A", prefix: "bdc_t1a0...r8k3" },
    { id: "key-tenant-b", name: "Tenant B", prefix: "bdc_t2b1...s5l9" },
    { id: "key-prod-3", name: "Production", prefix: "bdc_p7m3...v4x1" },
  ],
};

const generateKeyData = (keyId: string) => {
  const seed = keyId.length * 13 + keyId.charCodeAt(4);
  return {
    usage: Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      tokens: Math.round(5000 + Math.sin(i + seed) * 4000 + Math.random() * 3000),
      cost: Math.round((2 + Math.sin(i + seed) * 1.5 + Math.random() * 1) * 100) / 100,
    })),
    totalTokens: Math.round(80000 + seed * 2000 + Math.random() * 50000),
    totalRequests: Math.round(1500 + seed * 100 + Math.random() * 1000),
    avgLatency: Math.round(180 + (seed % 50) + Math.random() * 80),
    errorRate: Math.round((0.05 + Math.random() * 1.5) * 100) / 100,
  };
};

const generateModelData = (model: string) => {
  const seed = model.length * 7;
  return {
    usage: Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      tokens: Math.round(20000 + Math.sin(i + seed) * 15000 + Math.random() * 10000),
      cost: Math.round((8 + Math.sin(i + seed) * 5 + Math.random() * 4) * 100) / 100,
    })),
    latency: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, "0")}:00`,
      p50: Math.round(150 + seed * 2 + Math.sin(i) * 40 + Math.random() * 30),
      p95: Math.round(300 + seed * 3 + Math.sin(i) * 80 + Math.random() * 60),
      p99: Math.round(500 + seed * 4 + Math.sin(i) * 120 + Math.random() * 100),
    })),
    totalTokens: Math.round(400000 + seed * 20000 + Math.random() * 200000),
    avgLatency: Math.round(200 + seed * 2 + Math.random() * 100),
    totalRequests: Math.round(8000 + seed * 500 + Math.random() * 5000),
    errorRate: Math.round((0.1 + Math.random() * 2) * 100) / 100,
  };
};

const generateErrorRateData = (seed: number) =>
  Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    errorRate: Math.max(0, Math.round((0.2 + Math.sin(i * 0.8 + seed) * 0.8 + Math.random() * 0.5) * 100) / 100),
  }));

const usageData = generateUsageData();
const latencyData = generateLatencyData();

const GranularObservation = () => {
  const [endpointFilter, setEndpointFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [keyFilter, setKeyFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("usage");

  const [dateFrom, setDateFrom] = useState<Date>(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState<Date>(endOfMonth(new Date()));
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const rangedUsageData = useMemo(() => {
    const days = eachDayOfInterval({ start: dateFrom, end: dateTo });
    return days.map((day, i) => ({
      date: format(day, "MMM d"),
      tokens: Math.floor(40000 + Math.sin(i * 0.7) * 20000 + Math.random() * 10000),
      cost: Math.round((800 + Math.sin(i * 0.5) * 300 + Math.random() * 200) * 100) / 100,
    }));
  }, [dateFrom, dateTo]);

  const availableModels = useMemo(() => {
    if (endpointFilter === "all") return uniqueModels;
    const epDeps = deployments[endpointFilter] || [];
    return [...new Set(epDeps.map((d) => d.model))];
  }, [endpointFilter]);

  const availableKeys = useMemo(() => {
    if (endpointFilter === "all") return [];
    return mockApiKeys[endpointFilter] || [];
  }, [endpointFilter]);

  const modelData = useMemo(() => {
    if (modelFilter === "all") return null;
    return generateModelData(modelFilter);
  }, [modelFilter]);

  const keyData = useMemo(() => {
    if (keyFilter === "all") return null;
    return generateKeyData(keyFilter);
  }, [keyFilter]);

  const modelDeployments = useMemo(() => {
    if (modelFilter === "all") return [];
    return allDeployments.filter((d) => {
      const matchModel = d.model === modelFilter;
      const matchEndpoint = endpointFilter === "all" || Object.entries(deployments).some(
        ([epId, deps]) => epId === endpointFilter && deps.some((dep) => dep.id === d.id)
      );
      return matchModel && matchEndpoint;
    });
  }, [modelFilter, endpointFilter]);

  const keyBreakdownData = useMemo(() => {
    if (endpointFilter === "all") return [];
    const keys = mockApiKeys[endpointFilter] || [];
    return keys.map((k) => {
      const data = generateKeyData(k.id);
      return { ...k, ...data };
    });
  }, [endpointFilter]);

  const activeUsageData = keyData?.usage || modelData?.usage || rangedUsageData;
  const activeLatencyData = modelData?.latency || latencyData;
  const activeErrorRateData = useMemo(
    () => generateErrorRateData(modelFilter !== "all" ? modelFilter.length * 3 : keyFilter !== "all" ? keyFilter.length * 5 : 5),
    [modelFilter, keyFilter]
  );
  const activeLabel = keyFilter !== "all"
    ? `${availableKeys.find((k) => k.id === keyFilter)?.name || "Key"}`
    : modelFilter !== "all" ? modelFilter : "";

  const isCurrentCycle =
    format(dateFrom, "yyyy-MM-dd") === format(startOfMonth(new Date()), "yyyy-MM-dd") &&
    format(dateTo, "yyyy-MM-dd") === format(endOfMonth(new Date()), "yyyy-MM-dd");

  // Metric hierarchy breadcrumb
  const hierarchyLevel = keyFilter !== "all" ? "Key / API" : modelFilter !== "all" ? "Model" : endpointFilter !== "all" ? "Endpoint" : "Tenant / Account";

  return (
    <div className="space-y-6">
      {/* Hierarchy indicator */}
      <div className="flex items-center gap-2 flex-wrap">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Metric Level:</span>
        {["Tenant / Account", "Endpoint", "Key / API", "Model"].map((level) => (
          <Badge
            key={level}
            variant={level === hierarchyLevel ? "default" : "outline"}
            className={`text-[10px] ${level === hierarchyLevel ? "" : "opacity-40"}`}
          >
            {level}
          </Badge>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Select value={endpointFilter} onValueChange={(v) => { setEndpointFilter(v); setModelFilter("all"); setKeyFilter("all"); }}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Endpoint" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Endpoints</SelectItem>
            {endpoints.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={keyFilter} onValueChange={setKeyFilter} disabled={endpointFilter === "all"}>
          <SelectTrigger className="w-56">
            <div className="flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder={endpointFilter === "all" ? "Select endpoint first" : "API Key"} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Keys</SelectItem>
            {availableKeys.map((k) => (
              <SelectItem key={k.id} value={k.id}>
                {k.name} <span className="text-muted-foreground ml-1">({k.prefix})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={modelFilter} onValueChange={setModelFilter} disabled={endpointFilter === "all"}>
          <SelectTrigger className="w-52"><SelectValue placeholder={endpointFilter === "all" ? "Select endpoint first" : "Model"} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            {availableModels.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>

        {(activeTab === "usage" || activeTab === "logs") && (
          <div className="flex items-center gap-2">
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-36 justify-start text-left font-normal text-sm", !dateFrom && "text-muted-foreground")}>
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  {format(dateFrom, "MMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateFrom} onSelect={(d) => { if (d) { setDateFrom(d); setFromOpen(false); } }} disabled={(d) => d > dateTo || d > new Date()} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            <span className="text-muted-foreground text-xs">to</span>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-36 justify-start text-left font-normal text-sm", !dateTo && "text-muted-foreground")}>
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  {format(dateTo, "MMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateTo} onSelect={(d) => { if (d) { setDateTo(d); setToOpen(false); } }} disabled={(d) => d < dateFrom || d > new Date()} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            {!isCurrentCycle && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground" onClick={() => { setDateFrom(startOfMonth(new Date())); setDateTo(endOfMonth(new Date())); }}>
                <X className="h-3 w-3 mr-1" /> Reset
              </Button>
            )}
          </div>
        )}

        {(endpointFilter !== "all" || modelFilter !== "all" || keyFilter !== "all") && (
          <Badge variant="secondary" className="self-center text-xs">
            Viewing:{" "}
            {[
              keyFilter !== "all" && `Key: ${availableKeys.find((k) => k.id === keyFilter)?.name || "Key"}`,
              modelFilter !== "all" && `Model: ${modelFilter}`,
              endpointFilter !== "all" && `Endpoint: ${endpoints.find((s) => s.id === endpointFilter)?.name}`,
            ].filter(Boolean).join(" · ")}
          </Badge>
        )}
      </div>

      {/* Key-level stat cards */}
      {keyFilter !== "all" && keyData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Tokens (billing month)", value: `${(keyData.totalTokens / 1000).toFixed(0)}k`, icon: Activity },
            { label: "Avg Latency", value: `${keyData.avgLatency}ms`, icon: Clock },
            { label: "Total Requests", value: keyData.totalRequests.toLocaleString(), icon: Zap },
            { label: "Error Rate", value: `${keyData.errorRate}%`, icon: AlertTriangle },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Model-level stat cards */}
      {modelFilter !== "all" && keyFilter === "all" && modelData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Tokens (billing month)", value: `${(modelData.totalTokens / 1000).toFixed(0)}k`, icon: Activity },
            { label: "Avg Speed", value: `${Math.round(1000 / modelData.avgLatency * 50)} tok/s`, icon: Clock },
            { label: "Total Requests", value: modelData.totalRequests.toLocaleString(), icon: Zap },
            { label: "Error Rate", value: `${modelData.errorRate}%`, icon: AlertTriangle },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Model deployments list */}
      {modelFilter !== "all" && keyFilter === "all" && modelDeployments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Active deployments:</span>
          {modelDeployments.map((dep) => (
            <Badge key={dep.id} variant="outline" className="text-xs">
              {dep.name} <span className="text-muted-foreground ml-1">({dep.mode})</span>
            </Badge>
          ))}
        </div>
      )}

      {/* Per-key usage breakdown table */}
      {endpointFilter !== "all" && keyFilter === "all" && keyBreakdownData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              Usage by API Key
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key Name</TableHead>
                  <TableHead className="text-right">Tokens (billing month)</TableHead>
                  <TableHead className="text-right">Cost (€)</TableHead>
                  <TableHead className="text-right">Requests</TableHead>
                  <TableHead className="text-right">Avg Latency</TableHead>
                  <TableHead className="text-right">Error Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keyBreakdownData.map((row) => (
                  <TableRow key={row.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setKeyFilter(row.id)}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{row.name}</span>
                        <code className="text-[10px] text-muted-foreground">{row.prefix}</code>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm">{(row.totalTokens / 1000).toFixed(0)}k</TableCell>
                    <TableCell className="text-right text-sm">€{row.usage.reduce((sum: number, d: { cost: number }) => sum + d.cost, 0).toFixed(2)}</TableCell>
                    <TableCell className="text-right text-sm">{row.totalRequests.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">{row.avgLatency}ms</TableCell>
                    <TableCell className="text-right text-sm">
                      <span className={row.errorRate === 0 ? "text-success" : "text-destructive"}>{row.errorRate}%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-sm">Token Usage — {format(dateFrom, "MMM d")} to {format(dateTo, "MMM d, yyyy")}{activeLabel ? ` · ${activeLabel}` : ""}</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeUsageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Cost Over Time — {format(dateFrom, "MMM d")} to {format(dateTo, "MMM d, yyyy")}{activeLabel ? ` · ${activeLabel}` : ""}</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeUsageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-sm">Latency Distribution — Last 24h{activeLabel ? ` · ${activeLabel}` : ""}</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeLatencyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}ms`} width={48} />
                    <Tooltip formatter={(v: number) => [`${v}ms`]} />
                    <Line type="monotone" dataKey="p50" stroke="hsl(var(--success))" strokeWidth={2} dot={false} name="p50" />
                    <Line type="monotone" dataKey="p95" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="p95" />
                    <Line type="monotone" dataKey="p99" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} name="p99" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Error Rate — Last 24h{activeLabel ? ` · ${activeLabel}` : ""}</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeErrorRateData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} width={40} domain={[0, 'auto']} />
                    <Tooltip formatter={(v: number) => [`${v}%`, "Error Rate"]} />
                    <Bar dataKey="errorRate" radius={[2, 2, 0, 0]} fill="hsl(var(--destructive))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {endpoints.map((ep) => (
              <Card key={ep.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{ep.name}</p>
                    <Badge variant="outline" className={
                      ep.budgetUsed >= 85 ? "border-destructive/30 text-destructive" :
                      ep.budgetUsed >= 60 ? "border-warning/30 text-warning" :
                      "border-success/30 text-success"
                    }>
                      {ep.budgetUsed}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        ep.budgetUsed >= 85 ? "bg-destructive" :
                        ep.budgetUsed >= 60 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ width: `${ep.budgetUsed}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-muted-foreground">
                      {Math.round(ep.tokenBudget * ep.budgetUsed / 100).toLocaleString()} / {ep.tokenBudget.toLocaleString()} tokens
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {Math.round(ep.tokenBudget * ep.budgetUsed / 100 / 1000).toLocaleString()} / {(ep.tokenBudget / 1000).toLocaleString()} cr
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          {endpointFilter !== "all" ? (
            <SessionLogsList sessions={
              (() => {
                const allSessions = generateMockSessions(endpointFilter);
                if (modelFilter === "all") return allSessions;
                return allSessions.filter((s) => s.modelName === modelFilter);
              })()
            } />
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm">Select an endpoint to view session logs.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GranularObservation;
