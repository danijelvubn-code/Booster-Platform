import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  Flame,
  Cpu,
  AlertTriangle,
  ArrowUpRight,
  Shield,
} from "lucide-react";

// --- Mock Provider/Admin KPI data ---

// Net margin data
const marginByModel = [
  { model: "GPT-4o", revenue: 18200, cost: 14200, margin: 22 },
  { model: "Claude 3.5 Sonnet", revenue: 13500, cost: 9800, margin: 27 },
  { model: "Mistral Large", revenue: 5800, cost: 4200, margin: 28 },
  { model: "GPT-4o Mini", revenue: 1100, cost: 800, margin: 27 },
  { model: "Codestral", revenue: 4100, cost: 3000, margin: 27 },
];

const marginByTenant = [
  { tenant: "The Space Dreams", revenue: 38200, cost: 31200, margin: 18, isMoneyMaker: true },
  { tenant: "Acme Corp", revenue: 22500, cost: 16800, margin: 25, isMoneyMaker: true },
  { tenant: "NovaTech", revenue: 8900, cost: 9200, margin: -3, isMoneyMaker: false },
  { tenant: "GreenLeaf AI", revenue: 5600, cost: 4100, margin: 27, isMoneyMaker: true },
];

const totalRevenue = marginByTenant.reduce((s, t) => s + t.revenue, 0);
const totalCost = marginByTenant.reduce((s, t) => s + t.cost, 0);
const netMarginPct = Math.round(((totalRevenue - totalCost) / totalRevenue) * 100);

const marginTrend = Array.from({ length: 6 }, (_, i) => ({
  month: new Date(2025, 7 + i).toLocaleString("default", { month: "short" }),
  margin: Math.round(18 + Math.sin(i * 0.7) * 5 + i * 0.8),
}));

// Credit burn velocity
const burnBaseline = 4200; // credits/day rolling 7d avg
const burnCurrent = 5100;
const burnRatio = Math.round((burnCurrent / burnBaseline) * 100);
const burnAlert = burnRatio > 300;

const burnTrend = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  current: Math.round(burnBaseline / 24 + Math.sin(i * 0.4) * 80 + (i > 14 && i < 18 ? 120 : 0)),
  baseline: Math.round(burnBaseline / 24 + Math.sin(i * 0.3) * 30),
}));

// Inference efficiency
const efficiencyByModel = [
  { model: "GPT-4o", tokensPerDollar: 12400, trend: 2.1 },
  { model: "Claude 3.5 Sonnet", tokensPerDollar: 18200, trend: 3.5 },
  { model: "Mistral Large", tokensPerDollar: 42000, trend: -0.8 },
  { model: "GPT-4o Mini", tokensPerDollar: 156000, trend: 5.2 },
  { model: "Codestral", tokensPerDollar: 38000, trend: 1.2 },
];

const efficiencyTrend = Array.from({ length: 6 }, (_, i) => ({
  month: new Date(2025, 7 + i).toLocaleString("default", { month: "short" }),
  tokensPerDollar: Math.round(28000 + i * 2000 + Math.sin(i) * 5000),
}));

const fmt = (n: number) => (n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Section A: Business Health KPIs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Business Health KPIs</h2>
        </div>

        {/* Net Margin */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Booster Net Margin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Are we making money?</p>
              <div className="text-3xl font-bold text-primary">{netMarginPct}%</div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span className="font-mono">€{totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costs</span>
                  <span className="font-mono">€{totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-foreground">
                  <span>Net</span>
                  <span className="font-mono">€{(totalRevenue - totalCost).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Margin Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marginTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} width={36} />
                  <RechartsTooltip formatter={(v: number) => [`${v}%`, "Margin"]} />
                  <Line type="monotone" dataKey="margin" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Margin by Model + Tenant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Margin by Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {marginByModel.map((d) => (
                <div key={d.model} className="flex items-center gap-3">
                  <span className="text-sm w-40 truncate">{d.model}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${d.margin * 2}%` }} />
                  </div>
                  <span className="text-sm font-mono w-12 text-right">{d.margin}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Margin by Tenant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {marginByTenant.map((t) => (
                <div key={t.tenant} className="flex items-center gap-3">
                  <span className="text-sm w-36 truncate">{t.tenant}</span>
                  <Badge variant="outline" className={`text-[10px] ${t.isMoneyMaker ? "border-success/30 text-success" : "border-destructive/30 text-destructive"}`}>
                    {t.isMoneyMaker ? "Money Maker" : "Loss Leader"}
                  </Badge>
                  <span className={`text-sm font-mono ml-auto ${t.margin >= 0 ? "text-success" : "text-destructive"}`}>
                    {t.margin >= 0 ? "+" : ""}{t.margin}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section B: Infrastructure SLOs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Infrastructure SLOs</h2>
        </div>

        {/* Credit Burn Velocity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Flame className="h-4 w-4 text-warning" />
                Credit Burn Velocity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Is something draining resources abnormally?</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Rate</span>
                  <span className="font-mono font-semibold">{burnCurrent.toLocaleString()} cr/day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">7d Baseline</span>
                  <span className="font-mono">{burnBaseline.toLocaleString()} cr/day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ratio</span>
                  <span className={`font-mono font-semibold ${burnRatio > 300 ? "text-destructive" : burnRatio > 200 ? "text-warning" : "text-success"}`}>
                    {burnRatio}%
                  </span>
                </div>
              </div>
              {burnAlert && (
                <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-md p-2">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Spike exceeds 300% threshold</span>
                </div>
              )}
              {!burnAlert && (
                <Badge variant="outline" className="border-success/30 text-success text-xs">
                  Within normal range
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Burn Rate — Last 24h</CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={burnTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={36} />
                  <RechartsTooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="current" name="Current" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="baseline" name="7d Avg" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Inference Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                Inference Efficiency Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                Are we efficiently using GPU resources?
              </p>
              <div className="space-y-2">
                {efficiencyByModel.map((d) => (
                  <div key={d.model} className="flex items-center gap-3">
                    <span className="text-sm w-40 truncate">{d.model}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min((d.tokensPerDollar / 160000) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono w-16 text-right">{fmt(d.tokensPerDollar)}</span>
                    <span className={`text-xs flex items-center gap-0.5 w-12 ${d.trend >= 0 ? "text-success" : "text-destructive"}`}>
                      {d.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(d.trend)}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Tokens per €1 of infrastructure spend</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Efficiency Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmt(v)} width={40} />
                  <RechartsTooltip formatter={(v: number) => [fmt(v), "Tok/€"]} />
                  <Line type="monotone" dataKey="tokensPerDollar" name="Tok/€" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
