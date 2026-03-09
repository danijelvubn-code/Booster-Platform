import { useAuth } from "@/contexts/AuthContext";
import { tenant, endpoints, recommendations } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Euro, Activity, TrendingDown, Lightbulb, ArrowRight, Rocket, Shield,
} from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// Mock data for charts
const tokenUsageData = [
  { day: "Jan 1", tokens: 42000 },
  { day: "Jan 5", tokens: 68000 },
  { day: "Jan 9", tokens: 55000 },
  { day: "Jan 13", tokens: 91000 },
  { day: "Jan 17", tokens: 78000 },
  { day: "Jan 21", tokens: 120000 },
  { day: "Jan 25", tokens: 105000 },
  { day: "Jan 29", tokens: 135000 },
  { day: "Feb 2", tokens: 98000 },
  { day: "Feb 6", tokens: 142000 },
  { day: "Feb 10", tokens: 118000 },
  { day: "Feb 14", tokens: 156000 },
];

const rpmData = [
  { time: "00:00", rpm: 12 },
  { time: "02:00", rpm: 5 },
  { time: "04:00", rpm: 3 },
  { time: "06:00", rpm: 8 },
  { time: "08:00", rpm: 32 },
  { time: "10:00", rpm: 58 },
  { time: "12:00", rpm: 72 },
  { time: "14:00", rpm: 65 },
  { time: "16:00", rpm: 81 },
  { time: "18:00", rpm: 54 },
  { time: "20:00", rpm: 38 },
  { time: "22:00", rpm: 22 },
];

const budgetHeatColor = (pct: number) => {
  if (pct < 60) return "text-success bg-success/10 border-success/20";
  if (pct < 85) return "text-warning bg-warning/10 border-warning/20";
  return "text-destructive bg-destructive/10 border-destructive/20";
};

const healthBadge = (h: string) => {
  if (h === "OK") return <Badge variant="outline" className="border-success/30 text-success bg-success/10">SLA OK</Badge>;
  if (h === "At Risk") return <Badge variant="outline" className="border-warning/30 text-warning bg-warning/10">At Risk</Badge>;
  return <Badge variant="destructive">Breach</Badge>;
};

const Overview = () => {
  const { user } = useAuth();
  const budgetPct = Math.round((tenant.monthlySpend / tenant.monthlyBudget) * 100);

  return (
    <div className="container py-8 space-y-8">
      <OnboardingModal />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
            <Badge className="bg-primary/10 text-primary border border-primary/20 gap-1">
              <Rocket className="h-3 w-3" />
              {tenant.accountType}
            </Badge>
          </div>
        </div>
      </div>

      {/* Portfolio Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Tokens Processed — Billing Month", value: `${tenant.tokenCreditsUsed.toLocaleString()}`, subValue: `≈ €${(tenant.tokenCreditsUsed / 10).toLocaleString()}`, icon: Euro, href: "/account" },
          { label: "Requests Served — Billing Month", value: "48,320", subValue: undefined, icon: Activity, href: "/observe" },
          
          
        ].map((item) => (
          <Link key={item.label} to={item.href}>
            <Card className="hover:border-primary/30 transition-colors cursor-pointer h-full">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                  {item.subValue && <p className="text-xs text-muted-foreground/70">{item.subValue}</p>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Usage Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Daily Token Usage — Billing Month</CardTitle>
            <p className="text-xs text-muted-foreground">Token consumption per day across all endpoints</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={tokenUsageData}>
                <defs>
                  <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                  formatter={(value: number) => [`${value.toLocaleString()} tokens`, "Usage"]}
                />
                <Area type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" fill="url(#tokenGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Requests per Minute — Today</CardTitle>
            <p className="text-xs text-muted-foreground">Average RPM across all endpoints (2-hour buckets)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={rpmData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                  formatter={(value: number) => [`${value} req/min`, "RPM"]}
                />
                <Bar dataKey="rpm" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Inference Endpoint Portfolio</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/observe">
              Go to Observe <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {endpoints.map((ep) => (
            <Link key={ep.id} to={`/endpoints/${ep.id}`}>
              <Card className="hover:border-primary/40 transition-colors cursor-pointer h-full border-l-4" style={{ borderLeftColor: `hsl(43 80% 55%)` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    {healthBadge(ep.health)}
                  </div>
                  <CardTitle className="text-lg mt-2">{ep.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Shield className="h-3.5 w-3.5" />
                    {ep.defaultDeployment}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    <div>↗ {ep.inputTokens.toLocaleString()} input</div>
                    <div>↙ {ep.outputTokens.toLocaleString()} output</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
