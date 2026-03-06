import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
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
  DollarSign,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { endpoints, deployments, tenant } from "@/data/mockData";

// --- Mock data for business KPIs ---

const savingsTrend = Array.from({ length: 6 }, (_, i) => {
  const month = new Date(2025, 7 + i);
  const marketCost = 8200 + Math.round(Math.sin(i * 0.9) * 1800 + Math.random() * 1000);
  const boosterCost = 5100 + Math.round(Math.sin(i * 0.7) * 1200 + Math.random() * 800);
  return {
    month: month.toLocaleString("default", { month: "short" }),
    marketCost,
    boosterCost,
    savings: marketCost - boosterCost,
  };
});

const totalMarket = savingsTrend.reduce((s, d) => s + d.marketCost, 0);
const totalBooster = savingsTrend.reduce((s, d) => s + d.boosterCost, 0);
const totalSavings = totalMarket - totalBooster;
const savingsPct = Math.round((totalSavings / totalMarket) * 100);

// Latency data per endpoint
const latencyData = endpoints
  .filter((ep) => ep.id !== "sp-default")
  .map((ep) => {
    const deps = deployments[ep.id] || [];
    const defaultDep = deps.find((d) => d.mode === "Default");
    const currentP95 = defaultDep ? Math.round(defaultDep.latencyP50 * 1.8 + Math.random() * 80) : 0;
    return { endpoint: ep.name, currentP95 };
  });

const TenantDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Section A: Business Value KPIs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Business Value KPIs</h2>
        </div>

        {/* Savings Realization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                Savings Realization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Is this platform paying for itself?
              </p>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-success">
                  €{(totalSavings / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <p className="text-xs text-muted-foreground">Total saved this period</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-success/30 text-success font-mono">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {savingsPct}% cost reduction
                </Badge>
              </div>
              <div className="pt-2 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Market estimate</span>
                  <span className="font-mono">€{(totalMarket / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Booster actual</span>
                  <span className="font-mono">€{(totalBooster / 100).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Savings Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `€${v}`} width={52} />
                  <RechartsTooltip formatter={(v: number) => [`€${v}`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="marketCost" name="Market Estimate" fill="hsl(var(--muted-foreground))" opacity={0.35} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="boosterCost" name="Booster Cost" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

      </section>

      {/* Section B: Response Times */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Response Times</h2>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Current P95 Latency by Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latencyData.map((d) => (
                <div key={d.endpoint} className="flex items-center gap-4">
                  <span className="text-sm w-44 truncate">{d.endpoint}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min((d.currentP95 / 1000) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-20 text-right">{d.currentP95}ms</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TenantDashboard;
