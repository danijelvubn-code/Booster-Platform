import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { COMPONENT_LABS_DEFAULT_PATH } from "@/lib/component-labs";
import { ChevronRight } from "lucide-react";

/**
 * Pre-login control panel: first-time flows, login, or component labs (requires session).
 */
const EntryChoice = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signInRoute, setSignInRoute] = useState<"login-flow" | "skip-login">("login-flow");

  const handleSignInConfirm = () => {
    setLoginOpen(false);
    if (signInRoute === "login-flow") {
      navigate("/login");
      return;
    }
    login("user@booster.com", "Booster123#");
    navigate("/overview");
  };

  const handleDesignBlocksEnter = () => {
    login("user@booster.com", "Booster123#");
    navigate(COMPONENT_LABS_DEFAULT_PATH);
  };

  const enterChevron = <ChevronRight className="h-icon-16 w-icon-16" aria-hidden />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="mb-10 w-full max-w-component-labs text-center">
        <h1 className="text-h1 text-foreground">Control Panel</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          Select a testing scenario or exploration area
        </p>
      </div>

      <div className="grid w-full max-w-component-labs grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="flex h-full flex-col overflow-hidden border-border bg-card shadow-sm">
          <CardHeader className="gap-4 space-y-0">
            <div className="flex w-full justify-center">
              <img
                src="/first-time-user.svg"
                alt=""
                className="h-entry-choice-illustration w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-h3 text-foreground">First Time User</CardTitle>
              <CardDescription className="text-body-sm text-muted-foreground">
                Test onboarding flows and user setup scenarios
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col border-0 p-6 pt-0">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              trailingIcon={enterChevron}
              onClick={() => navigate("/first-time-user")}
            >
              Enter
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex h-full flex-col overflow-hidden border-border bg-card shadow-sm">
          <CardHeader className="gap-4 space-y-0">
            <div className="flex w-full justify-center">
              <img
                src="/login-illustration.svg"
                alt=""
                className="h-entry-choice-illustration w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-h3 text-foreground">Login</CardTitle>
              <CardDescription className="text-body-sm text-muted-foreground">
                Test authentication methods and login flows
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col border-0 p-6 pt-0">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              trailingIcon={enterChevron}
              onClick={() => setLoginOpen(true)}
            >
              Enter
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex h-full flex-col overflow-hidden border-border bg-card shadow-sm">
          <CardHeader className="gap-4 space-y-0">
            <div className="flex w-full justify-center">
              <img
                src="/design-building-blocks-illustration.svg"
                alt=""
                className="h-entry-choice-illustration w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-h3 text-foreground">Design Building Blocks</CardTitle>
              <CardDescription className="text-body-sm text-muted-foreground">
                Explore brand, components, and modules
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col border-0 p-6 pt-0">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              trailingIcon={enterChevron}
              onClick={handleDesignBlocksEnter}
            >
              Enter
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="gap-4 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-h3">Log in</DialogTitle>
            <DialogDescription className="text-body-sm">
              Choose standard login flow or skip login for testing and go directly into the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={signInRoute} onValueChange={(value: "login-flow" | "skip-login") => setSignInRoute(value)}>
              <SelectTrigger aria-label="Select log in flow">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="login-flow">Login Flow</SelectItem>
                <SelectItem value="skip-login">Skip Login</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setLoginOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSignInConfirm}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EntryChoice;
