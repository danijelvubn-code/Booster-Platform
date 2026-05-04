import { Outlet } from "react-router-dom";

import AppHeader from "@/components/AppHeader";
import { IS_MVP_BUILD, mvpPath } from "@/config/prototype-shell";

/**
 * MVP shell. Uses the shared `AppHeader` (same nav + user menu as Post MVP) with an `MVP` badge
 * next to the logo. Anything page-level for MVP lives under `src/pages/mvp/*`.
 */
const MvpAppLayout = () => {
  return (
    <div className="mvp-shell flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <AppHeader
        badge="MVP"
        logoHref={mvpPath("/overview")}
        navPathPrefix={IS_MVP_BUILD ? "" : "/mvp"}
        excludeNavPaths={["/metrics"]}
        comingSoonPaths={["/observe", "/recommendations"]}
      />

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MvpAppLayout;
