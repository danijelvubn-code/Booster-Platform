import { ArrowDown, ArrowUp, Calendar, Mail, Zap } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";

const ACCOUNT_START_ISO = "2026-02-12";

/** Mock usage aligned with MVP account overview visuals (prototype). */
const TOKEN_USAGE = {
  inputTokens: 5_360_000,
  outputTokens: 1_780_000,
};

function formatCompactTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatMediumDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${isoDate}T12:00:00`),
  );
}

const SUPPORT_EMAIL = "support@booster.x";

/**
 * MVP Account — simplified tenant overview (plan, start date, token usage, support).
 */
const MvpAccount = () => {
  const { user } = useAuth();
  const tenantName = user?.tenant ?? "The Space Dreams";
  const accountStartLabel = formatMediumDate(ACCOUNT_START_ISO);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-background">
      <div className="container flex flex-col py-8 pb-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <PageHeader title={tenantName} titleSize="display" />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-border shadow-xs">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-icon-20 w-icon-20 text-primary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-body-sm text-muted-foreground">Plan</p>
                  <p className="text-body-sm font-semibold text-foreground">Pay Per Use</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-xs">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-icon-20 w-icon-20 text-primary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-body-sm text-muted-foreground">Account Start</p>
                  <p className="text-body-sm font-semibold text-foreground">{accountStartLabel}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-h2 text-foreground">Token Usage</h2>
              <p className="mt-1 text-body-sm text-muted-foreground">
                Total consumption since {accountStartLabel}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card className="border-border shadow-xs">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-lg bg-info/12">
                    <ArrowDown className="h-icon-20 w-icon-20 text-info" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-sm text-muted-foreground">Input Tokens</p>
                    <p className="text-body-sm font-semibold text-foreground">
                      {formatCompactTokens(TOKEN_USAGE.inputTokens)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-xs">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-lg bg-success/12">
                    <ArrowUp className="h-icon-20 w-icon-20 text-success" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-sm text-muted-foreground">Output Tokens</p>
                    <p className="text-body-sm font-semibold text-foreground">
                      {formatCompactTokens(TOKEN_USAGE.outputTokens)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="border-border shadow-xs">
            <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:items-center">
                <Mail className="mt-0.5 h-icon-20 w-icon-20 shrink-0 text-muted-foreground sm:mt-0" aria-hidden />
                <div>
                  <p className="text-body-sm font-medium text-foreground">Need help?</p>
                  <p className="text-body-sm text-muted-foreground">Contact {SUPPORT_EMAIL}</p>
                </div>
              </div>
              <Button variant="outline" size="default" className="w-full shrink-0 sm:w-auto" asChild>
                <a href={`mailto:${SUPPORT_EMAIL}`}>Email Support</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MvpAccount;
