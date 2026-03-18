import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  CreditCard, Calendar, AlertTriangle, Download, Bell, Mail, Shield, Zap,
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
  billingCycleStart: "Jan 1",
  billingCycleEnd: "Jan 31",
  cycleUsage: 1_120_000,
  costPerMillionTokens: 3.5,
  alertTokenThreshold: 2_000_000,
};

// ── Helpers ────────────────────────────────────────────────────
const fmt = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
};

const fmtEur = (tokens: number) => {
  const cost = (tokens / 1_000_000) * account.costPerMillionTokens;
  return `€${cost.toFixed(2)}`;
};

// ── Component ──────────────────────────────────────────────────
const Account = () => {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [alertTokens, setAlertTokens] = useState(account.alertTokenThreshold);
  const [emailNotif, setEmailNotif] = useState(true);

  const alertTriggered = account.cycleUsage >= alertTokens;
  const nearExpiry = account.daysRemaining <= 14;

  return (
    <div className="container py-8 space-y-8 max-w-4xl">
      {/* ─── 1. Account Overview ─────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{account.tenantName}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Plan", value: "Pay Per Use", icon: Zap },
            { label: "Account Start", value: account.planStart, icon: Calendar },
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

      {/* ─── 2. Current Billing Cycle Usage ───────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-primary" />
            Current Billing Cycle
          </CardTitle>
          <CardDescription>
            {account.billingCycleStart} – {account.billingCycleEnd} · Pay per use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Tokens Used</p>
              <p className="text-xl font-bold">{fmt(account.cycleUsage)} tokens</p>
              <p className="text-xs text-muted-foreground mt-0.5">{fmtEur(account.cycleUsage)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cost Per Million Tokens</p>
              <p className="text-xl font-bold">€{account.costPerMillionTokens.toFixed(2)}</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Download Usage Details
          </Button>
        </CardContent>
      </Card>

      {/* ─── 3. Usage Alerts ──────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <p className="text-muted-foreground">Alert When Usage Reaches</p>
            <p className="font-semibold">{fmt(alertTokens)} tokens ({fmtEur(alertTokens)})</p>
          </div>

          {alertTriggered && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive font-medium">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              You have crossed your usage alert threshold of {fmt(alertTokens)} tokens.
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
            <DialogDescription>Get notified when your usage hits a specific token count.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="alert-tokens">Alert Threshold (tokens)</Label>
              <Input
                id="alert-tokens"
                type="number"
                min={100_000}
                step={100_000}
                value={alertTokens}
                onChange={(e) => setAlertTokens(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Estimated cost at threshold: {fmtEur(alertTokens)}
              </p>
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

      {/* ─── 4. Support ────────────────────────────────────────── */}
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
