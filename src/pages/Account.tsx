import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  CreditCard, Calendar, AlertTriangle, Download, Bell, ArrowRight, Mail, Shield, Gauge, Zap,
} from "lucide-react";

// ── Mock account data ──────────────────────────────────────────
const account = {
  tenantName: "The Space Dreams",
  planName: "Booster Beta",
  planType: "Shared Tenant Beta",
  status: "Active" as const,
  planStart: "Jan 1, 2026",
  planEnd: "Mar 31, 2026",
  daysRemaining: 42,
  totalTokens: 5_000_000,
  tokensUsed: 2_850_000,
  billingCycleStart: "Jan 1",
  billingCycleEnd: "Jan 31",
  cycleUsage: 1_120_000,
  cycleEstRemaining: 880_000,
  alertThreshold: 80,
  hardCap: true,
  performanceProfile: "Premium" as const,
  rpmLimit: 500,
  tpmLimit: 250_000,
};

const usageByEndpoint = [
  { endpoint: "POC – Claims Assistant", tokens: 1_200_000, pct: 42 },
  { endpoint: "Production – Claims Assistant", tokens: 1_100_000, pct: 38 },
  { endpoint: "Demo – Sales Copilot", tokens: 550_000, pct: 20 },
];

// ── Helpers ────────────────────────────────────────────────────
const fmt = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
};

const tokensPct = Math.round((account.tokensUsed / account.totalTokens) * 100);

const barColor = (pct: number) => {
  if (pct < 60) return "bg-success";
  if (pct < 85) return "bg-warning";
  return "bg-destructive";
};

const barTextColor = (pct: number) => {
  if (pct < 60) return "text-success";
  if (pct < 85) return "text-warning";
  return "text-destructive";
};

// ── Component ──────────────────────────────────────────────────
const Account = () => {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [alertPct, setAlertPct] = useState(account.alertThreshold);
  const [emailNotif, setEmailNotif] = useState(true);
  const [hardCap, setHardCap] = useState(account.hardCap);

  const nearExpiry = account.daysRemaining <= 14;
  const alertTriggered = tokensPct >= account.alertThreshold;

  return (
    <div className="container py-8 space-y-8 max-w-4xl">
      {/* ─── 1. Account Overview ─────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{account.tenantName}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Plan Start", value: account.planStart, icon: Calendar },
            { label: "Plan End", value: account.planEnd, icon: Calendar },
            { label: "Days Remaining", value: `${account.daysRemaining} days`, icon: Shield },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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


        {nearExpiry && (
          <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning font-medium">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Your beta access expires soon.
          </div>
        )}
      </section>

      {/* ─── 2. Tokens & Usage ───────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-primary" />
            Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Total Allocated</p>
              <p className="text-xl font-bold">{fmt(account.totalTokens)} tokens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Used</p>
              <p className="text-xl font-bold">{fmt(account.tokensUsed)} tokens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-xl font-bold">{fmt(account.totalTokens - account.tokensUsed)} tokens</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Usage</span>
              <span className={`font-semibold ${barTextColor(tokensPct)}`}>{tokensPct}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor(tokensPct)}`}
                style={{ width: `${tokensPct}%` }}
              />
            </div>
          </div>

          {tokensPct >= 60 && (
            <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-4 py-2.5 text-sm text-warning font-medium">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              Warning: You have used {tokensPct}% of your allocation.
            </div>
          )}
        </CardContent>
      </Card>

      {/* ─── 3. Current Billing Cycle ─────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Billing Cycle</CardTitle>
          <CardDescription>
            {account.billingCycleStart} – {account.billingCycleEnd}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Usage This Cycle</p>
              <p className="text-lg font-bold">{fmt(account.cycleUsage)} tokens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Remaining</p>
              <p className="text-lg font-bold">{fmt(account.cycleEstRemaining)} tokens</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </CardContent>
      </Card>

      {/* ─── 4. Usage Breakdown ────────────────────────────────── */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg">Usage by Inference Endpoint</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/observe" className="gap-1">
              View detailed analytics <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inference Endpoint</TableHead>
                <TableHead className="text-right">Tokens Used</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageByEndpoint.map((row) => (
                <TableRow key={row.endpoint}>
                  <TableCell className="font-medium">{row.endpoint}</TableCell>
                  <TableCell className="text-right">{fmt(row.tokens)}</TableCell>
                  <TableCell className="text-right">{row.pct}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ─── 5. Budget Alerts ──────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Alert Threshold</p>
              <p className="font-semibold">{alertPct}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Hard Cap</p>
              <p className="font-semibold">{hardCap ? "Enabled" : "Disabled"}</p>
            </div>
          </div>

          {alertTriggered && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive font-medium">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              You have crossed your usage alert threshold.
            </div>
          )}

          <Button variant="outline" size="sm" onClick={() => setAlertsOpen(true)}>
            Manage Alerts
          </Button>
        </CardContent>
      </Card>

      {/* Manage Alerts Modal */}
      <Dialog open={alertsOpen} onOpenChange={setAlertsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Alerts</DialogTitle>
            <DialogDescription>Configure your usage alert preferences.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="alert-pct">Alert Threshold (%)</Label>
              <Input
                id="alert-pct"
                type="number"
                min={10}
                max={100}
                value={alertPct}
                onChange={(e) => setAlertPct(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="hard-cap">Hard Cap</Label>
                <p className="text-xs text-muted-foreground">Block all requests once the token limit is reached</p>
              </div>
              <Switch
                id="hard-cap"
                checked={hardCap}
                onCheckedChange={setHardCap}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <Switch
                id="email-notif"
                checked={emailNotif}
                onCheckedChange={setEmailNotif}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAlertsOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── 6. Support ────────────────────────────────────────── */}
      <Card>
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-sm text-muted-foreground">Contact support@booster.x</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:support@booster.x">Email Support</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
