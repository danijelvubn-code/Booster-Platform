import { tenant, endpoints } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Euro, LineChart as LineChartIcon, Plus } from "lucide-react";
import { EndpointOverviewCard } from "@/components/EndpointOverviewCard";
import OnboardingModal from "@/components/OnboardingModal";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

const billingMonthUpper = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date()).toUpperCase();

const tokenUsageData = [
  { day: "01 Mar", tokens: 42_000 },
  { day: "04 Mar", tokens: 68_000 },
  { day: "07 Mar", tokens: 55_000 },
  { day: "10 Mar", tokens: 91_000 },
  { day: "13 Mar", tokens: 78_000 },
  { day: "16 Mar", tokens: 112_000 },
  { day: "19 Mar", tokens: 118_000 },
];

const rpmData = [
  { time: "00:00", rpm: 28 },
  { time: "02:00", rpm: 22 },
  { time: "04:00", rpm: 18 },
  { time: "06:00", rpm: 34 },
  { time: "08:00", rpm: 52 },
  { time: "10:00", rpm: 76 },
  { time: "12:00", rpm: 92 },
  { time: "14:00", rpm: 84 },
  { time: "16:00", rpm: 98 },
  { time: "18:00", rpm: 70 },
  { time: "20:00", rpm: 52 },
  { time: "22:00", rpm: 38 },
  { time: "24:00", rpm: 32 },
];

/** 6 ticks, 5 equal vertical bands — horizontal grid lines align to these (matches Figma-style spacing). */
const TOKEN_CHART_DOMAIN_MAX = 125_000;
const tokenYTicks = [0, 25_000, 50_000, 75_000, 100_000, 125_000];

/** No tick at chart top — scale ends at 200 (removes former 250 line); even 40 RPM steps. */
const RPM_CHART_DOMAIN_MAX = 200;
const rpmYTicks = [0, 40, 80, 120, 160, 200];

const formatTokenYAxis = (v: number) => `${Math.round(v / 1000)}k`;
const formatRpmYAxis = (v: number) => String(Math.round(v));

const ChartTooltip = ({
  active,
  payload,
  label,
  valueSuffix,
}: TooltipProps<number, string> & { valueSuffix: string }) => {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value;
  if (v === undefined) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-caption text-muted-foreground">{label}</p>
      <p className="text-caption-strong text-foreground">
        {typeof v === "number" ? v.toLocaleString() : v} {valueSuffix}
      </p>
    </div>
  );
};

const overviewEndpoints = [...endpoints]
  .filter((e) => e.id !== "sp-default")
  .sort((a, b) => b.budgetUsed - a.budgetUsed)
  .slice(0, 4);

const Overview = () => {
  const tokenEuroApprox = Math.round(tenant.tokenCreditsUsed / 10);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-background">
      <OnboardingModal />

      <div className="container flex flex-col pt-6 pb-6">
        <div className="flex flex-col gap-4">
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link to="/account" className="block min-h-0">
            <Card className="h-full border border-border bg-card shadow-sm transition-colors hover:border-ring">
              <CardContent className="flex gap-3 p-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-accent shadow-xs">
                  <Euro className="h-icon-24 w-icon-24 text-primary" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-body-sm text-muted-foreground/75">
                    TOKENS PROCESSED — {billingMonthUpper}
                  </p>
                  <p className="text-h1 font-bold text-foreground">{tenant.tokenCreditsUsed.toLocaleString()}</p>
                  <p className="text-caption text-muted-foreground">≈ €{tokenEuroApprox.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/observe" className="block min-h-0">
            <Card className="h-full border border-border bg-card shadow-sm transition-colors hover:border-ring">
              <CardContent className="flex gap-3 p-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-accent shadow-xs">
                  <LineChartIcon className="h-icon-24 w-icon-24 text-primary" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-body-sm text-muted-foreground/75">
                    REQUESTS SERVED — {billingMonthUpper}
                  </p>
                  <p className="text-h1 font-bold text-foreground">{tenant.requestsServed.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="gap-1 space-y-0 p-6 pb-2">
              <CardTitle className="text-lg font-semibold leading-normal text-foreground">
                Total Tokens Processed
              </CardTitle>
              <p className="text-body-sm text-muted-foreground">
                The total number of tokens processed during the current billing month.
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
              <div className="h-chart-sm w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tokenUsageData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="overviewTokenArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(var(--info))" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="oklch(var(--info))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" className="stroke-border" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, TOKEN_CHART_DOMAIN_MAX]}
                      ticks={tokenYTicks}
                      tickFormatter={formatTokenYAxis}
                      allowDecimals={false}
                      className="text-muted-foreground"
                      width={40}
                    />
                    <Tooltip
                      content={<ChartTooltip valueSuffix="tokens" />}
                      cursor={{ stroke: "oklch(var(--border))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="tokens"
                      stroke="oklch(var(--info))"
                      strokeWidth={2}
                      fill="url(#overviewTokenArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="gap-1 space-y-0 p-6 pb-2">
              <CardTitle className="text-lg font-semibold leading-normal text-foreground">
                Requests per Minute — Today
              </CardTitle>
              <p className="text-body-sm text-muted-foreground">
                Average RPM across all endpoints (2-hour buckets)
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
              <div className="h-chart-sm w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rpmData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="overviewRpmArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(var(--success))" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="oklch(var(--success))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" className="stroke-border" vertical={false} />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, RPM_CHART_DOMAIN_MAX]}
                      ticks={rpmYTicks}
                      tickFormatter={formatRpmYAxis}
                      allowDecimals={false}
                      className="text-muted-foreground"
                      width={40}
                    />
                    <Tooltip
                      content={<ChartTooltip valueSuffix="req/min" />}
                      cursor={{ stroke: "oklch(var(--border))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rpm"
                      stroke="oklch(var(--success))"
                      strokeWidth={2}
                      fill="url(#overviewRpmArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>

        {/* Endpoints above average */}
        <section className="mt-10 flex flex-col gap-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-1">
              <h2 className="text-lg font-semibold text-foreground">Endpoints Above Average Usage</h2>
              <p className="text-body-sm text-muted-foreground">
                Endpoints consuming more tokens than their expected monthly average based on their budget.
              </p>
            </div>
            <Button className="shrink-0" asChild>
              <Link to="/endpoints/new">
                <Plus className="h-icon-16 w-icon-16" aria-hidden />
                Create Endpoint
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {overviewEndpoints.map((ep) => (
              <EndpointOverviewCard key={ep.id} ep={ep} variant="basic" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Overview;
