import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { postMvpPath } from "@/config/prototype-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, UserCog, Building2, Shield, AlertTriangle, Coins, BarChart3, TrendingUp, TrendingDown, Package } from "lucide-react";

// --- Mock Token Pools (purchased from third-party providers) ---
const mockTokenPools = [
  { id: "cp-1", provider: "OpenAI", model: "GPT-4o", totalTokens: 5_000_000, usedTokens: 3_420_000, costPerMillion: 5_000, purchaseDate: "2025-01-15", expiryDate: "2025-07-15" },
  { id: "cp-2", provider: "OpenAI", model: "GPT-4o Mini", totalTokens: 20_000_000, usedTokens: 12_800_000, costPerMillion: 300, purchaseDate: "2025-01-10", expiryDate: "2025-07-10" },
  { id: "cp-3", provider: "Anthropic", model: "Claude 3.5 Sonnet", totalTokens: 8_000_000, usedTokens: 4_150_000, costPerMillion: 3_000, purchaseDate: "2025-02-01", expiryDate: "2025-08-01" },
  { id: "cp-4", provider: "Mistral AI", model: "Mistral Large", totalTokens: 15_000_000, usedTokens: 6_300_000, costPerMillion: 2_000, purchaseDate: "2024-12-20", expiryDate: "2025-06-20" },
  { id: "cp-5", provider: "Mistral AI", model: "Codestral", totalTokens: 10_000_000, usedTokens: 7_900_000, costPerMillion: 1_000, purchaseDate: "2025-01-05", expiryDate: "2025-07-05" },
  { id: "cp-6", provider: "Google", model: "Gemini 1.5 Pro", totalTokens: 4_000_000, usedTokens: 1_200_000, costPerMillion: 3_500, purchaseDate: "2025-02-10", expiryDate: "2025-08-10" },
];

// --- Mock per-tenant usage breakdown ---
const mockTenantUsage = [
  { tenantId: "t-1", tenantName: "The Space Dreams", provider: "OpenAI", model: "GPT-4o", tokensUsed: 1_200_000, cost: 6_000, trend: 12 },
  { tenantId: "t-1", tenantName: "The Space Dreams", provider: "Anthropic", model: "Claude 3.5 Sonnet", tokensUsed: 420_000, cost: 1_260, trend: -5 },
  { tenantId: "t-2", tenantName: "Acme Corp", provider: "OpenAI", model: "GPT-4o Mini", tokensUsed: 5_600_000, cost: 1_680, trend: 8 },
  { tenantId: "t-2", tenantName: "Acme Corp", provider: "OpenAI", model: "GPT-4o", tokensUsed: 890_000, cost: 4_450, trend: 3 },
  { tenantId: "t-3", tenantName: "NovaTech Labs", provider: "Mistral AI", model: "Codestral", tokensUsed: 4_500_000, cost: 4_500, trend: 22 },
  { tenantId: "t-3", tenantName: "NovaTech Labs", provider: "Anthropic", model: "Claude 3.5 Sonnet", tokensUsed: 2_100_000, cost: 6_300, trend: -2 },
  { tenantId: "t-3", tenantName: "NovaTech Labs", provider: "Mistral AI", model: "Mistral Large", tokensUsed: 1_800_000, cost: 3_600, trend: 15 },
  { tenantId: "t-4", tenantName: "FinServ AI", provider: "OpenAI", model: "GPT-4o Mini", tokensUsed: 120_000, cost: 36, trend: -10 },
  { tenantId: "t-5", tenantName: "HealthBridge", provider: "Google", model: "Gemini 1.5 Pro", tokensUsed: 800_000, cost: 2_800, trend: 18 },
  { tenantId: "t-5", tenantName: "HealthBridge", provider: "OpenAI", model: "GPT-4o", tokensUsed: 650_000, cost: 3_250, trend: 5 },
];

const mockTenants = [
  { id: "t-1", name: "The Space Dreams", plan: "Enterprise", endpoints: 4, tokensUsed: 1_620_000, owner: "Bob Martinez", email: "bob@spacedreams.ai" },
  { id: "t-2", name: "Acme Corp", plan: "Growth", endpoints: 2, tokensUsed: 890_000, owner: "Alice Johnson", email: "alice@acme.com" },
  { id: "t-3", name: "NovaTech Labs", plan: "Enterprise", endpoints: 6, tokensUsed: 3_200_000, owner: "Carlos Rivera", email: "carlos@novatech.io" },
  { id: "t-4", name: "FinServ AI", plan: "Starter", endpoints: 1, tokensUsed: 120_000, owner: "Diana Chen", email: "diana@finservai.com" },
  { id: "t-5", name: "HealthBridge", plan: "Growth", endpoints: 3, tokensUsed: 1_450_000, owner: "Ethan Park", email: "ethan@healthbridge.co" },
];

const fmt = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
};

const AdminConsole = () => {
  const { startImpersonation } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [usageSearch, setUsageSearch] = useState("");
  const [confirmTenant, setConfirmTenant] = useState<typeof mockTenants[0] | null>(null);

  const filteredUsage = mockTenantUsage.filter(
    (u) =>
      u.tenantName.toLowerCase().includes(usageSearch.toLowerCase()) ||
      u.model.toLowerCase().includes(usageSearch.toLowerCase())
  );

  const filtered = mockTenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.owner.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleImpersonate = () => {
    if (!confirmTenant) return;
    startImpersonation(confirmTenant.name, confirmTenant.owner, confirmTenant.email);
    setConfirmTenant(null);
    navigate(postMvpPath("/overview"));
  };

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <UserCog className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-sm text-muted-foreground">Search and impersonate tenant accounts for support</p>
        </div>
      </div>

      <Tabs defaultValue="tenants" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tenants" className="gap-1.5"><Building2 className="h-3.5 w-3.5" />Tenants</TabsTrigger>
          <TabsTrigger value="credits" className="gap-1.5"><Coins className="h-3.5 w-3.5" />Token Pools</TabsTrigger>
          <TabsTrigger value="usage" className="gap-1.5"><BarChart3 className="h-3.5 w-3.5" />Usage by Tenant</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning font-medium">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            All impersonation sessions are logged and audited. Only use for legitimate support purposes.
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Search Tenants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by tenant name, owner, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Endpoints</TableHead>
                    <TableHead className="text-right">Tokens Used</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No tenants found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {t.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">{t.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{t.owner}</p>
                            <p className="text-xs text-muted-foreground">{t.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{t.endpoints}</TableCell>
                        <TableCell className="text-right">{fmt(t.tokensUsed)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="warning" className="gap-1.5" onClick={() => setConfirmTenant(t)}>
                            <Shield className="h-3.5 w-3.5" />
                            Impersonate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Package className="h-4 w-4" /> Total Purchased
                </div>
                <p className="text-2xl font-bold">{fmt(mockTokenPools.reduce((s, p) => s + p.totalTokens, 0))}</p>
                <p className="text-xs text-muted-foreground mt-1">across {mockTokenPools.length} pools</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <BarChart3 className="h-4 w-4" /> Total Consumed
                </div>
                <p className="text-2xl font-bold">{fmt(mockTokenPools.reduce((s, p) => s + p.usedTokens, 0))}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((mockTokenPools.reduce((s, p) => s + p.usedTokens, 0) / mockTokenPools.reduce((s, p) => s + p.totalTokens, 0)) * 100)}% utilization
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Coins className="h-4 w-4" /> Total Spend
                </div>
                <p className="text-2xl font-bold">
                  €{fmt(mockTokenPools.reduce((s, p) => s + Math.round((p.totalTokens / 1_000_000) * p.costPerMillion), 0))}
                </p>
                <p className="text-xs text-muted-foreground mt-1">lifetime provider cost</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Token Pools from Providers</CardTitle>
              <CardDescription>Tokens purchased from third-party LLM providers and their consumption status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider / Model</TableHead>
                    <TableHead className="text-right">Purchased</TableHead>
                    <TableHead className="text-right">Used</TableHead>
                    <TableHead className="w-[180px]">Utilization</TableHead>
                    <TableHead className="text-right">Cost/M Tokens</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTokenPools.map((pool) => {
                    const pct = Math.round((pool.usedTokens / pool.totalTokens) * 100);
                    const color = pct > 85 ? "text-destructive" : pct > 60 ? "text-warning" : "text-success";
                    return (
                      <TableRow key={pool.id}>
                        <TableCell>
                          <p className="font-medium">{pool.model}</p>
                          <p className="text-xs text-muted-foreground">{pool.provider}</p>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">{fmt(pool.totalTokens)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{fmt(pool.usedTokens)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={pct} className="flex-1" />
                            <span className={`text-xs font-semibold ${color} w-10 text-right`}>{pct}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">€{pool.costPerMillion.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{pool.expiryDate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by tenant or model..."
              value={usageSearch}
              onChange={(e) => setUsageSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Token Usage Across Tenants</CardTitle>
              <CardDescription>Per-tenant, per-model consumption with month-over-month trend</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Provider / Model</TableHead>
                    <TableHead className="text-right">Tokens Used</TableHead>
                    <TableHead className="text-right">Cost ($)</TableHead>
                    <TableHead className="text-right">MoM Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsage.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No usage data found</TableCell>
                    </TableRow>
                  ) : (
                    filteredUsage.map((u, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {u.tenantName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{u.model}</p>
                          <p className="text-xs text-muted-foreground">{u.provider}</p>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">{fmt(u.tokensUsed)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">€{u.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className={`inline-flex items-center gap-1 text-xs font-semibold ${u.trend >= 0 ? "text-destructive" : "text-success"}`}>
                            {u.trend >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                            {u.trend >= 0 ? "+" : ""}{u.trend}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmTenant} onOpenChange={() => setConfirmTenant(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Start Impersonation Session
            </DialogTitle>
            <DialogDescription>
              You are about to impersonate a tenant account. All actions will be logged.
            </DialogDescription>
          </DialogHeader>
          {confirmTenant && (
            <div className="space-y-3 py-2">
              <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tenant</span>
                  <span className="font-medium">{confirmTenant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span>{confirmTenant.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge variant="secondary" className="text-xs">{confirmTenant.plan}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Endpoints</span>
                  <span>{confirmTenant.endpoints}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Production default switching will be disabled during impersonation.
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmTenant(null)}>Cancel</Button>
            <Button variant="warning" onClick={handleImpersonate}>
              <Shield className="h-4 w-4 mr-1" />
              Start Impersonation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminConsole;
