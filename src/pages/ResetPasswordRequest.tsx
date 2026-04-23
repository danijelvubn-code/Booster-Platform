import { useEffect, useState } from "react";
import { ChevronLeft, Loader2, Mail, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { AuthFlowCardShell } from "@/components/AuthFlowCardShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InputControl, InputLeadIcon, InputRoot, InputSegment, Label } from "@/components/ui/input";

const welcomeLogoLinkClass =
  "inline-flex items-center gap-2 rounded-md outline-none ring-offset-background transition-colors ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESET_ALLOWED_EMAILS = ["user@booster.com"];
const RESET_EMAIL_SENT_ILLUSTRATION = "http://localhost:3845/assets/f88e0fd2549f7ae0858918df68ddd89eccdb89d7.svg";
const RESEND_COOLDOWN_SECONDS = 30;

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showEmailSentStep, setShowEmailSentStep] = useState(false);
  const [showResendStep, setShowResendStep] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendNonce, setResendNonce] = useState(0);

  const normalizedEmail = email.trim().toLowerCase();
  const isEmailValid = EMAIL_FORMAT_REGEX.test(normalizedEmail);
  const canSubmit = isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      return;
    }

    setEmailError(null);

    if (!RESET_ALLOWED_EMAILS.includes(normalizedEmail)) {
      setAuthError("The email you entered doesn't match our records. Please double-check and try again.");
      return;
    }

    setAuthError(null);
    setSubmittedEmail(normalizedEmail);
    setShowEmailSentStep(true);
    setShowResendStep(false);
  };

  useEffect(() => {
    if (!showResendStep) return;
    setResendCountdown(RESEND_COOLDOWN_SECONDS);
    const id = window.setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [showResendStep, resendNonce]);

  const handleResendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resendCountdown > 0) return;
    setResendNonce((n) => n + 1);
    // Hook up resend API when available.
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    if (showResendStep) {
      handleResendSubmit(e);
      return;
    }
    if (showEmailSentStep) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col" data-testid="page-reset-password-request">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          alt=""
          className="h-full w-full object-cover"
          src="/lovable-uploads/datacenter-login-bg.png"
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-overlay-scrim" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center lg:flex-row lg:items-stretch">
        <div className="relative hidden min-h-0 flex-1 flex-col items-center justify-center px-6 py-12 lg:flex lg:w-[55%]">
          <Link to="/" className={welcomeLogoLinkClass}>
            <div className="flex items-center justify-center gap-3">
              <Zap className="h-icon-40 w-icon-40 fill-primary text-primary" aria-hidden="true" />
              <span className="text-display font-semibold tracking-tight text-primary-foreground">booster</span>
            </div>
          </Link>
        </div>

        <AuthFlowCardShell
          onSubmit={handleFormSubmit}
          beforeCard={
            <div className="mb-6 flex justify-center lg:hidden">
              <Link to="/" className={welcomeLogoLinkClass}>
                <Zap className="h-icon-28 w-icon-28 fill-primary text-primary" aria-hidden="true" />
                <span className="text-h2 font-bold text-primary-foreground">booster</span>
              </Link>
            </div>
          }
          header={
            <div className="relative flex w-full items-center justify-center">
              {showResendStep ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 h-6 px-1 text-body-sm text-info text-info-hover-dim"
                  onClick={() => setShowResendStep(false)}
                >
                  <ChevronLeft className="h-icon-16 w-icon-16" aria-hidden="true" />
                  Back
                </Button>
              ) : (
                <Link to="/login" className="absolute left-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1 text-body-sm text-info text-info-hover-dim"
                  >
                    <ChevronLeft className="h-icon-16 w-icon-16" aria-hidden="true" />
                    Back
                  </Button>
                </Link>
              )}
              <Link to="/" className={welcomeLogoLinkClass} aria-label="Back to welcome">
                <Zap className="h-icon-16 w-icon-16 fill-primary text-primary" aria-hidden="true" />
                <span className="text-caption-strong uppercase tracking-widest text-foreground">booster</span>
              </Link>
            </div>
          }
          bodyClassName="space-y-6"
          showFooter={false}
          body={
            showEmailSentStep && showResendStep ? (
              <>
                <div className="space-y-2 text-center">
                  <h1 className="text-h1 text-foreground">Do you need us to resend the link?</h1>
                  <p className="text-body text-muted-foreground/75">
                    Please, allow 30 seconds for the email to arrive before requesting another link.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={resendCountdown > 0}
                  aria-busy={resendCountdown > 0}
                >
                  {resendCountdown > 0 ? (
                    <>
                      <Loader2 className="h-icon-16 w-icon-16 shrink-0 animate-spin" aria-hidden="true" />
                      Resend Link ({resendCountdown}s)
                    </>
                  ) : (
                    "Resend Link"
                  )}
                </Button>

                <p className="text-center text-body-sm text-muted-foreground/75">
                  Need assistance?
                  <br />
                  <a
                    href="#"
                    className="font-semibold text-info underline underline-offset-4 transition-colors ease-standard hover:text-info/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Contact our support team
                  </a>
                </p>
              </>
            ) : showEmailSentStep ? (
              <>
                <div className="mx-auto w-full max-w-xs">
                  <img src={RESET_EMAIL_SENT_ILLUSTRATION} alt="" className="h-auto w-full" aria-hidden="true" />
                </div>

                <div className="space-y-2 text-center">
                  <h1 className="text-h1 text-foreground">Check your inbox</h1>
                  <p className="text-body text-muted-foreground/75">
                    If <span className="text-body-strong text-foreground/75">{submittedEmail}</span> corresponds to an
                    existing account, we&apos;ve sent a password reset link. Check your inbox and spam folder.
                  </p>
                </div>

                <Button type="button" size="lg" className="w-full" asChild>
                  <Link to="/login">Back to Log In</Link>
                </Button>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="text-body-sm text-info underline underline-offset-4 transition-colors ease-standard hover:text-info/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    onClick={() => setShowResendStep(true)}
                  >
                    Didn&apos;t receive the email?
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2 text-center">
                  <h1 className="text-h1 text-foreground">Reset your password</h1>
                  <p className="text-body text-muted-foreground/75">
                    Enter the email that you used when you signed up to recover your password. You will receive a
                    password reset link.
                  </p>
                </div>

                <div className="space-y-6">
                  {authError ? (
                    <Alert variant="destructive" density="compact">
                      <AlertDescription className="text-body-sm text-foreground/75">{authError}</AlertDescription>
                    </Alert>
                  ) : null}

                  <div className="space-y-1">
                    <Label htmlFor="reset-email" className="text-label text-foreground">
                      Email
                    </Label>
                    <InputRoot size="lg" invalid={!!emailError}>
                      <InputSegment>
                        <InputLeadIcon>
                          <Mail aria-hidden="true" />
                        </InputLeadIcon>
                        <InputControl
                          id="reset-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@domain.com"
                          value={email}
                          aria-invalid={emailError ? "true" : undefined}
                          onBlur={() => {
                            if (email.trim().length > 0 && !EMAIL_FORMAT_REGEX.test(email.trim().toLowerCase())) {
                              setEmailError("Invalid email format.");
                            } else {
                              setEmailError(null);
                            }
                          }}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(null);
                            if (authError) setAuthError(null);
                          }}
                        />
                      </InputSegment>
                    </InputRoot>
                    {emailError ? <p className="text-caption text-destructive">{emailError}</p> : null}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
                    Send Link
                  </Button>
                </div>
              </>
            )
          }
        />
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
