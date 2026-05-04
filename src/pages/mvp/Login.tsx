import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";

import { AuthFlowCardShell } from "@/components/AuthFlowCardShell";
import { useAuth } from "@/contexts/AuthContext";
import { clearPendingLogin } from "@/lib/pending-login";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InputControl, InputLeadIcon, InputRoot, InputSegment, Label } from "@/components/ui/input";
import { mvpPath, postMvpPath } from "@/config/prototype-shell";

const welcomeLogoLinkClass =
  "inline-flex items-center gap-2 rounded-md outline-none ring-offset-background transition-colors ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const VALID_LOGIN_EMAIL = "user@booster.com";
const VALID_LOGIN_PASSWORD = "Booster123#";
const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * MVP login screen — forked from `pages/Login.tsx`. Edit this file freely for the lean product;
 * the full app keeps using `Login.tsx` until you merge or align them.
 */
const LoginMvp = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@booster.com");
  const [password, setPassword] = useState("Booster123#");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const canSubmit = email.trim().length > 0 && password.length > 0;

  useEffect(() => {
    clearPendingLogin();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(mvpPath("/overview"), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_FORMAT_REGEX.test(normalizedEmail)) {
      setEmailError("Invalid email format.");
      setAuthError(null);
      return;
    }

    setEmailError(null);

    if (normalizedEmail !== VALID_LOGIN_EMAIL || password !== VALID_LOGIN_PASSWORD) {
      setAuthError("The email or password you entered doesn't match our records. Please double-check and try again.");
      return;
    }

    setAuthError(null);
    login(normalizedEmail, password, "mvp");
    navigate(mvpPath("/overview"), { replace: true });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col" data-testid="page-login-mvp">
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
            <Link to="/" className={welcomeLogoLinkClass} aria-label="Back to welcome">
              <Zap className="h-icon-16 w-icon-16 fill-primary text-primary" aria-hidden="true" />
              <span className="text-caption-strong uppercase tracking-widest text-foreground">booster</span>
            </Link>
          }
          bodyClassName="space-y-6"
          showFooter={false}
          body={
            <>
              <div className="space-y-2 text-center">
                <h1 className="text-h1 text-foreground">Welcome!</h1>
                <p className="text-body text-muted-foreground/75">Log in to continue</p>
              </div>

              <div className="space-y-6">
                {authError ? (
                  <Alert variant="destructive" density="compact">
                    <AlertDescription className="text-body-sm text-foreground/75">{authError}</AlertDescription>
                  </Alert>
                ) : null}

                <div className="space-y-1">
                  <Label htmlFor="email-mvp" className="text-label text-foreground">
                    Email
                  </Label>
                  <InputRoot invalid={!!emailError}>
                    <InputSegment>
                      <InputLeadIcon>
                        <Mail aria-hidden="true" />
                      </InputLeadIcon>
                      <InputControl
                        id="email-mvp"
                        type="email"
                        autoComplete="email"
                        placeholder="you@domain.com"
                        value={email}
                        aria-invalid={emailError ? "true" : undefined}
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

                <div className="space-y-1">
                  <Label htmlFor="password-mvp" className="text-label text-foreground">
                    Password
                  </Label>
                  <InputRoot>
                    <InputSegment>
                      <InputLeadIcon>
                        <Lock aria-hidden="true" />
                      </InputLeadIcon>
                      <InputControl
                        id="password-mvp"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (authError) setAuthError(null);
                        }}
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

                <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
                  Log In
                </Button>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => navigate(postMvpPath("/reset-password"))}
                    className="text-body-sm text-info transition-colors ease-standard hover:text-info/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Reset Password
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

export default LoginMvp;
