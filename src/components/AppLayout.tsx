import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import { IS_POST_MVP_BUILD, postMvpPath } from "@/config/prototype-shell";

const AppLayout = () => {
  const navigate = useNavigate();
  const { isImpersonating, impersonatedTenant, stopImpersonation } = useAuth();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Impersonation banner */}
      {isImpersonating && (
        <div className="bg-destructive text-destructive-foreground flex items-center justify-center gap-3 py-2 text-body-sm font-medium tracking-wide">
          <span>⚠ ADMIN IMPERSONATION MODE — Acting as <strong>{impersonatedTenant}</strong> • All actions logged as Service Provider</span>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 text-xs px-3 bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
            onClick={() => {
              stopImpersonation();
              navigate(postMvpPath("/admin"));
            }}
          >
            Exit Impersonation
          </Button>
        </div>
      )}

      <AppHeader logoHref={postMvpPath("/overview")} navPathPrefix={IS_POST_MVP_BUILD ? "" : "/post-mvp"} />

      {/* Impersonation watermark */}
      {isImpersonating && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center opacity-4">
          <span className="text-9xl font-black -rotate-12 text-destructive select-none">
            IMPERSONATION
          </span>
        </div>
      )}

      {/* Main Content — relative so routes (e.g. component labs) can fill with absolute inset-0 */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
