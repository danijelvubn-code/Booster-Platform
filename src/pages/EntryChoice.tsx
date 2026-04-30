import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { COMPONENT_LABS_DEFAULT_PATH } from "@/lib/component-labs";
import { ChevronRight } from "lucide-react";

/**
 * Pre-login control panel: MVP hub, post-MVP hub, or component labs (requires session).
 */
const EntryChoice = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDesignBlocksEnter = () => {
    login("user@booster.com", "Booster123#");
    navigate(COMPONENT_LABS_DEFAULT_PATH);
  };

  const enterChevron = <ChevronRight className="h-icon-16 w-icon-16" aria-hidden />;
  const onCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, onActivate: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="mb-10 w-full max-w-component-labs text-center">
        <h1 className="text-h1 text-foreground">Control Panel</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          Select MVP, post-MVP product, or design building blocks
        </p>
      </div>

      <div className="grid w-full max-w-component-labs grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          role="button"
          tabIndex={0}
          onClick={() => navigate("/flows/mvp")}
          onKeyDown={(event) => onCardKeyDown(event, () => navigate("/flows/mvp"))}
          className="group flex h-full cursor-pointer flex-col overflow-hidden border-border bg-card shadow-sm transition-colors transition-shadow duration-200 hover:border-foreground/20 hover:bg-muted/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <CardHeader className="gap-4 space-y-0">
            <div className="flex w-full justify-center">
              <img
                src="/first-time-user.svg"
                alt=""
                className="h-entry-choice-illustration w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-h3 text-foreground">MVP</CardTitle>
              <CardDescription className="text-body-sm text-muted-foreground">
                Lean auth: MVP login, first-time flows, and related screens (independent from post-MVP)
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col border-0 p-6 pt-0">
            <Button
              type="button"
              variant="outline"
              className="pointer-events-none w-full"
              trailingIcon={enterChevron}
              tabIndex={-1}
              aria-hidden
            >
              Enter
            </Button>
          </CardFooter>
        </Card>

        <Card
          role="button"
          tabIndex={0}
          onClick={() => navigate("/flows/post-mvp")}
          onKeyDown={(event) => onCardKeyDown(event, () => navigate("/flows/post-mvp"))}
          className="group flex h-full cursor-pointer flex-col overflow-hidden border-border bg-card shadow-sm transition-colors transition-shadow duration-200 hover:border-foreground/20 hover:bg-muted/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <CardHeader className="gap-4 space-y-0">
            <div className="flex w-full justify-center">
              <img
                src="/login-illustration.svg"
                alt=""
                className="h-entry-choice-illustration w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-h3 text-foreground">Post MVP</CardTitle>
              <CardDescription className="text-body-sm text-muted-foreground">
                Full product auth: login, first-time flows, reset password, and test shortcuts
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col border-0 p-6 pt-0">
            <Button
              type="button"
              variant="outline"
              className="pointer-events-none w-full"
              trailingIcon={enterChevron}
              tabIndex={-1}
              aria-hidden
            >
              Enter
            </Button>
          </CardFooter>
        </Card>

        <Card
          role="button"
          tabIndex={0}
          onClick={handleDesignBlocksEnter}
          onKeyDown={(event) => onCardKeyDown(event, handleDesignBlocksEnter)}
          className="group flex h-full cursor-pointer flex-col overflow-hidden border-border bg-card shadow-sm transition-colors transition-shadow duration-200 hover:border-foreground/20 hover:bg-muted/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
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
              className="pointer-events-none w-full"
              trailingIcon={enterChevron}
              tabIndex={-1}
              aria-hidden
            >
              Enter
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EntryChoice;
