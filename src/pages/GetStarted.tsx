import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff, Zap } from "lucide-react";

import { AuthFlowCardShell } from "@/components/AuthFlowCardShell";
import { Button } from "@/components/ui/button";
import { InputControl, InputRoot, InputSegment, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Placeholder copy until org/user come from invite context. */
const PLACEHOLDER_ORG = "[Company Name]";
const PLACEHOLDER_USER = "[user@email.com]";

const welcomeLogoLinkClass =
  "inline-flex items-center gap-2 rounded-md outline-none ring-offset-background transition-colors ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type FirstTimeState = "setup-password" | "link-expired" | "invitation-used";

function usePasswordRules(password: string) {
  return useMemo(() => {
    const hasLength = password.length >= 10;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    return { hasLength, hasNumber, hasUpper, hasSpecial, allMet: hasLength && hasNumber && hasUpper && hasSpecial };
  }, [password]);
}

type RequirementRowProps = {
  met: boolean;
  label: string;
  testId: string;
};

function RequirementRow({ met, label, testId }: RequirementRowProps) {
  return (
    <div className="flex items-center gap-1" data-testid={testId}>
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
          met ? "text-success" : "text-muted-foreground/50",
        )}
        aria-hidden="true"
      >
        <CheckCircle2 className="h-icon-16 w-icon-16" />
      </span>
      <span className="text-caption text-muted-foreground">{label}</span>
    </div>
  );
}

/**
 * First-time flow: set password (matches Figma “Auth Flow Card — Set Password”).
 */
const GetStarted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessStep, setShowSuccessStep] = useState(false);

  const rules = usePasswordRules(password);
  const confirmTooLong = confirm.length > password.length;
  const confirmPrefixMismatch = confirm.length > 0 && !password.startsWith(confirm);
  const confirmHasError = confirm.length > 0 && (confirmTooLong || confirmPrefixMismatch);
  const passwordsMatch = password.length > 0 && password === confirm;
  const canSubmit = rules.allMet && passwordsMatch;
  const isMvpFlow = location.pathname.startsWith("/mvp/");
  const loginHref = isMvpFlow ? "/mvp/login" : "/login";
  const welcomeHref = isMvpFlow ? "/flows/mvp" : "/flows/post-mvp";

  const stateParam = new URLSearchParams(location.search).get("state");
  const firstTimeState: FirstTimeState =
    stateParam === "link-expired" || stateParam === "invitation-used" ? stateParam : "setup-password";
  const isStatusScreen = firstTimeState !== "setup-password";
  const statusConfig =
    firstTimeState === "link-expired"
      ? {
          title: "This invitation link has expired.",
          description:
            "This invitation link has expired or is invalid.\nContact support to request a new invitation.",
          cta: "Contact support",
          onClick: () => {
            window.location.href = "mailto:support@booster.ai";
          },
          testId: "button-contact-support",
        }
      : {
          title: "Invitation already used",
          description: "This account has already been activated.",
          cta: "Go to Login",
          onClick: () => navigate(loginHref),
          testId: "button-go-to-login-from-invitation-used",
        };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStatusScreen) return;
    if (!canSubmit) return;
    setShowSuccessStep(true);
  };

  const handleSuccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(loginHref);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col" data-testid="page-password-setup">
      {/* Full-page background (behind all content) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          alt=""
          className="h-full w-full object-cover"
          src="/lovable-uploads/datacenter-login-bg.png"
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-overlay-scrim" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center lg:flex-row lg:items-stretch">
        {/* Left — hero branding; logo links to welcome */}
        <div className="relative hidden min-h-0 flex-1 flex-col items-center justify-center px-6 py-12 lg:flex lg:w-[55%]">
          <Link to={welcomeHref} className={welcomeLogoLinkClass}>
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex items-center justify-center gap-3">
                <Zap className="h-icon-40 w-icon-40 fill-primary text-primary" aria-hidden="true" />
                <span className="text-display font-semibold tracking-tight text-primary-foreground">booster</span>
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-caption-strong uppercase tracking-widest text-primary">
                Beta Version
              </span>
            </div>
          </Link>
        </div>

        {/* Right — shared auth shell with switchable header/body/footer slots */}
        <AuthFlowCardShell
          onSubmit={isStatusScreen ? undefined : showSuccessStep ? handleSuccessSubmit : handleSubmit}
          beforeCard={
            <div className="mb-6 flex justify-center lg:hidden">
              <Link to={welcomeHref} className={welcomeLogoLinkClass}>
                <Zap className="h-icon-28 w-icon-28 fill-primary text-primary" aria-hidden="true" />
                <span className="text-h2 font-bold text-primary-foreground">booster</span>
              </Link>
            </div>
          }
          header={
            <Link to={welcomeHref} className={welcomeLogoLinkClass} aria-label="Back to welcome">
              <Zap className="h-icon-16 w-icon-16 fill-primary text-primary" aria-hidden="true" />
              <span className="text-h3 font-semibold text-foreground">booster</span>
            </Link>
          }
          bodyClassName={showSuccessStep || isStatusScreen ? "space-y-6" : undefined}
          showFooter={!showSuccessStep && !isStatusScreen}
          body={
            showSuccessStep ? (
              <>
                <div className="mx-auto flex h-icon-container-104 w-icon-container-104 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-icon-72 w-icon-72 text-success" strokeWidth={1.2} aria-hidden="true" />
                </div>

                <div className="space-y-2 text-center">
                  <h1 className="text-h1 text-foreground">Account activated successfully</h1>
                  <div className="space-y-1 text-muted-foreground/75">
                    <p className="text-body">Your password has been set.</p>
                    <p className="text-body">
                      You can now log in using your email address as your user ID.
                    </p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-go-to-login">
                  Go to Log In
                </Button>
              </>
            ) : isStatusScreen ? (
              <>
                <div className="space-y-2 text-center">
                  <h1 className="text-h1 text-foreground">{statusConfig.title}</h1>
                  <p className="text-body text-muted-foreground/75 whitespace-pre-line">{statusConfig.description}</p>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={statusConfig.onClick}
                  data-testid={statusConfig.testId}
                >
                  {statusConfig.cta}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2 text-center">
                  <h1 className="text-h1 text-foreground">Set your password</h1>
                  <p className="text-body text-muted-foreground/75">Create your password to activate your account.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="min-w-0 flex-1 text-body text-muted-foreground/50">Organization:</span>
                    <span className="text-body-strong text-foreground/75">{PLACEHOLDER_ORG}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="min-w-0 flex-1 text-body text-muted-foreground/50">User ID:</span>
                    <span className="whitespace-nowrap text-body-strong text-foreground/75">{PLACEHOLDER_USER}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <Label htmlFor="set-password" className="text-label text-foreground">
                        Password
                      </Label>
                      <InputRoot>
                        <InputSegment>
                          <InputControl
                            id="set-password"
                            data-testid="input-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="-mr-1 shrink-0"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-icon-16 w-icon-16" aria-hidden="true" />
                            ) : (
                              <Eye className="h-icon-16 w-icon-16" aria-hidden="true" />
                            )}
                          </Button>
                        </InputSegment>
                      </InputRoot>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="confirm-password" className="text-label text-foreground">
                        Confirm password
                      </Label>
                      <InputRoot invalid={confirmHasError}>
                        <InputSegment>
                          <InputControl
                            id="confirm-password"
                            data-testid="input-confirm-password"
                            type={showConfirm ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Confirm password..."
                            value={confirm}
                            aria-invalid={confirmHasError || undefined}
                            onChange={(e) => setConfirm(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="-mr-1 shrink-0"
                            onClick={() => setShowConfirm((v) => !v)}
                            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                          >
                            {showConfirm ? (
                              <EyeOff className="h-icon-16 w-icon-16" aria-hidden="true" />
                            ) : (
                              <Eye className="h-icon-16 w-icon-16" aria-hidden="true" />
                            )}
                          </Button>
                        </InputSegment>
                      </InputRoot>
                      {confirmHasError ? <p className="text-caption text-destructive">Passwords do not match.</p> : null}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-xl bg-secondary-foreground/4 px-4 py-3">
                    <RequirementRow
                      met={rules.hasLength}
                      label="At least 10 characters"
                      testId="requirement-length"
                    />
                    <RequirementRow
                      met={rules.hasNumber}
                      label="Contains at least one number"
                      testId="requirement-number"
                    />
                    <RequirementRow
                      met={rules.hasUpper}
                      label="Contains at least one uppercase letter"
                      testId="requirement-uppercase"
                    />
                    <RequirementRow
                      met={rules.hasSpecial}
                      label="Contains at least one special character"
                      testId="requirement-special"
                    />
                  </div>
                </div>
              </>
            )
          }
          footer={
            !showSuccessStep && !isStatusScreen ? (
              <>
                <p className="text-body-sm text-muted-foreground">
                  By creating an account, you agree to the{" "}
                  <a
                    href="#"
                    className="text-primary underline underline-offset-4 transition-colors ease-standard hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Booster TOS
                  </a>{" "}
                  &{" "}
                  <a
                    href="#"
                    className="text-primary underline underline-offset-4 transition-colors ease-standard hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!canSubmit}
                  data-testid="button-submit-set-password"
                >
                  Set Password & Continue
                </Button>
              </>
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default GetStarted;
