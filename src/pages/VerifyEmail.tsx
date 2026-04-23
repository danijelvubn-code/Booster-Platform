import { useEffect, useState } from "react";
import { ChevronLeft, Zap } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthFlowCardShell } from "@/components/AuthFlowCardShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { clearPendingLogin, getPendingLogin } from "@/lib/pending-login";

const welcomeLogoLinkClass =
  "inline-flex items-center gap-2 rounded-md outline-none ring-offset-background transition-colors ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type LocationState = {
  email?: string;
};

const VerifyEmail = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [code, setCode] = useState("");

  const emailFromState = state?.email?.trim();
  const displayEmail = emailFromState || getPendingLogin()?.email || "";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overview", { replace: true });
      return;
    }
    if (!getPendingLogin()) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const canVerify = code.length === 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canVerify) return;

    const creds = getPendingLogin();
    if (!creds) {
      navigate("/login", { replace: true });
      return;
    }

    login(creds.email, creds.password);
    clearPendingLogin();
    navigate("/overview", { replace: true });
  };

  const handleResend = () => {
    toast({
      title: "Code sent",
      description: "We sent a new verification code to your email.",
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col" data-testid="page-verify-email">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img alt="" className="h-full w-full object-cover" src="/lovable-uploads/datacenter-login-bg.png" />
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
          onSubmit={handleSubmit}
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
              <Link to="/login" className="absolute left-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-1 text-body-sm text-info text-info-hover-dim"
                >
                  <ChevronLeft className="h-icon-16 w-icon-16" aria-hidden="true" />
                  Log in
                </Button>
              </Link>
              <Link to="/" className={welcomeLogoLinkClass} aria-label="Back to welcome">
                <Zap className="h-icon-16 w-icon-16 fill-primary text-primary" aria-hidden="true" />
                <span className="text-caption-strong uppercase tracking-widest text-foreground">booster</span>
              </Link>
              <div className="invisible pointer-events-none absolute right-0" aria-hidden="true">
                <span className="text-body-sm text-info">Reset Password</span>
              </div>
            </div>
          }
          bodyClassName="space-y-6"
          showFooter={false}
          body={
            <>
              <div className="space-y-2 text-center">
                <h1 className="text-h1 text-foreground">Enter verification code</h1>
                <p className="text-body text-muted-foreground/75">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-foreground">{displayEmail || "your email"}</span>. Enter it below to
                  continue.
                  <br />
                  Code expires in 10 minutes.
                </p>
              </div>

              <div className="flex w-full flex-col items-center justify-start gap-2">
                <Label htmlFor="verification-code" className="text-label w-full text-center text-foreground">
                  Verification Code
                </Label>
                <InputOTP
                  id="verification-code"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={code}
                  onChange={setCode}
                  pushPasswordManagerStrategy="none"
                  containerClassName="flex flex-row items-center justify-center gap-2"
                  autoFocus
                  inputMode="numeric"
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup className="gap-0">
                    <InputOTPSlot index={0} className="h-control-lg w-control-lg" />
                    <InputOTPSlot index={1} className="h-control-lg w-control-lg" />
                    <InputOTPSlot index={2} className="h-control-lg w-control-lg" />
                  </InputOTPGroup>
                  <InputOTPSeparator variant="dash" />
                  <InputOTPGroup className="gap-0">
                    <InputOTPSlot index={3} className="h-control-lg w-control-lg" />
                    <InputOTPSlot index={4} className="h-control-lg w-control-lg" />
                    <InputOTPSlot index={5} className="h-control-lg w-control-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="space-y-6">
                <Button type="submit" size="lg" className="w-full" disabled={!canVerify}>
                  Verify & Log in
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                  <span className="text-body-sm text-muted-foreground">Didn’t receive the code?</span>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-body-sm font-semibold text-info underline underline-offset-4 transition-colors ease-standard hover:text-info/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
