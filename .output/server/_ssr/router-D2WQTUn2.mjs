import { c as createRouter, a as createRootRouteWithContext, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { J as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { P as Provider, C as Content2, A as Arrow2, R as Root3, T as Trigger } from "../_libs/radix-ui__react-tooltip.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { e as extendTailwindMerge } from "../_libs/tailwind-merge.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createEnv } from "../_libs/t3-oss__env-core.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body",
            "body-strong",
            "body-sm",
            "body-sm-strong",
            "label",
            "caption",
            "caption-strong",
            "caption-mono",
            "code"
          ]
        }
      ]
    }
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipArrow = Arrow2;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-visible rounded-md border border-border bg-popover p-3 text-caption text-popover-foreground shadow-none drop-shadow-lg",
      "data-[side=top]:[&_.tooltip-arrow]:-mb-px data-[side=bottom]:[&_.tooltip-arrow]:-mt-px data-[side=left]:[&_.tooltip-arrow]:-mr-px data-[side=right]:[&_.tooltip-arrow]:-ml-px",
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipArrow,
        {
          "aria-hidden": true,
          className: "tooltip-arrow block fill-popover stroke-border",
          height: 6,
          strokeWidth: 1,
          width: 12
        }
      )
    ]
  }
));
TooltipContent.displayName = Content2.displayName;
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_DEV_SERVER": "false", "TSS_DEV_SSR_STYLES_BASEPATH": "/", "TSS_DEV_SSR_STYLES_ENABLED": "true", "TSS_INLINE_CSS_ENABLED": "false", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/", "VITE_API_URL": "http://localhost:8080" };
const env = createEnv({
  server: {
    SERVER_URL: string().url().optional()
  },
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",
  client: {
    VITE_APP_TITLE: string().min(1).optional(),
    VITE_API_URL: string().url()
  },
  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: __vite_import_meta_env__,
  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true
});
class APIError extends Error {
  constructor(message, status, statusText) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.name = "APIError";
  }
}
async function fetchAPI(endpoint, options) {
  const url = `${env.VITE_API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    // Important: automatically sends cookies
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
  if (response.status === 401) {
    window.location.href = `${env.VITE_API_URL}/auth/login`;
    return new Promise(() => {
    });
  }
  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(
      errorText || response.statusText,
      response.status,
      response.statusText
    );
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}
function TanStackQueryProvider({
  children
}) {
  const [queryClient] = reactExports.useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // Retry logic
          retry: (failureCount, error) => {
            if (error instanceof APIError && error.status === 401) {
              return false;
            }
            return failureCount < 3;
          },
          // Stale time: 30 seconds
          staleTime: 30 * 1e3,
          // Cache time: 5 minutes
          gcTime: 5 * 60 * 1e3
        },
        mutations: {
          // Optional: global error handler for mutations
          onError: (error) => {
            if (error instanceof APIError) {
              console.error("Mutation error:", error.message);
            }
          }
        }
      }
    })
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children });
}
const appCss = "/assets/styles-DkuMJusa.css";
const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'light';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Booster"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "font-sans antialiased wrap-anywhere selection:yellow-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TanStackQueryProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$d = () => import("./route-CYD2EhRT.mjs");
const Route$e = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const Route$d = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/overview" });
  }
});
const $$splitComponentImporter$c = () => import("./set-password-ftJoYvpw.mjs");
const Route$c = createFileRoute("/auth/set-password")({
  validateSearch: object({
    token: string()
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./overview-B2-Velwy.mjs");
const Route$b = createFileRoute("/app/overview")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./observe-bnAt4cA4.mjs");
const Route$a = createFileRoute("/app/observe")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./deploy-Drbf8klb.mjs");
const Route$9 = createFileRoute("/app/deploy")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./cosmos-DSWzp39f.mjs");
const Route$8 = createFileRoute("/app/cosmos")({
  validateSearch: (search) => ({
    hosting: search.hosting ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./account-C263jBD0.mjs");
const Route$7 = createFileRoute("/app/account")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./endpoints.deploy_endpoint-Bp40j9vZ.mjs");
const Route$6 = createFileRoute("/app/endpoints/deploy_endpoint")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./endpoints.create_endpoint-B-10RtqP.mjs");
const Route$5 = createFileRoute("/app/endpoints/create_endpoint")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./endpoints._endpointId-CQEMKsTY.mjs");
const Route$4 = createFileRoute("/app/endpoints/$endpointId")({
  validateSearch: (search) => ({
    returnTo: typeof search.returnTo === "string" && search.returnTo.startsWith("/app/") ? search.returnTo : "/app/overview",
    returnLabel: typeof search.returnLabel === "string" && search.returnLabel.trim() ? search.returnLabel.trim() : "Endpoints"
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./cosmos_.guided-C60tW0kn.mjs");
const Route$3 = createFileRoute("/app/cosmos_/guided")({
  validateSearch: (search) => ({
    resume: search.resume ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./cosmos_._modelId-DEqysPWj.mjs");
const Route$2 = createFileRoute("/app/cosmos_/$modelId")({
  validateSearch: (search) => ({
    returnTo: typeof search.returnTo === "string" && search.returnTo.startsWith("/app/") ? search.returnTo : "/app/cosmos",
    returnLabel: typeof search.returnLabel === "string" && search.returnLabel.trim() ? search.returnLabel.trim() : "Cosmos"
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./endpoints._endpointId.settings-CB7RDtR-.mjs");
const Route$1 = createFileRoute("/app/endpoints/$endpointId/settings")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./endpoints._endpointId.deploy-DSuky71I.mjs");
const Route = createFileRoute("/app/endpoints/$endpointId/deploy")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AppRouteRoute = Route$e.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const AuthSetPasswordRoute = Route$c.update({
  id: "/auth/set-password",
  path: "/auth/set-password",
  getParentRoute: () => Route$f
});
const AppOverviewRoute = Route$b.update({
  id: "/overview",
  path: "/overview",
  getParentRoute: () => AppRouteRoute
});
const AppObserveRoute = Route$a.update({
  id: "/observe",
  path: "/observe",
  getParentRoute: () => AppRouteRoute
});
const AppDeployRoute = Route$9.update({
  id: "/deploy",
  path: "/deploy",
  getParentRoute: () => AppRouteRoute
});
const AppCosmosRoute = Route$8.update({
  id: "/cosmos",
  path: "/cosmos",
  getParentRoute: () => AppRouteRoute
});
const AppAccountRoute = Route$7.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsDeploy_endpointRoute = Route$6.update({
  id: "/endpoints/deploy_endpoint",
  path: "/endpoints/deploy_endpoint",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsCreate_endpointRoute = Route$5.update({
  id: "/endpoints/create_endpoint",
  path: "/endpoints/create_endpoint",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsEndpointIdRoute = Route$4.update({
  id: "/endpoints/$endpointId",
  path: "/endpoints/$endpointId",
  getParentRoute: () => AppRouteRoute
});
const AppCosmosGuidedRoute = Route$3.update({
  id: "/cosmos_/guided",
  path: "/cosmos/guided",
  getParentRoute: () => AppRouteRoute
});
const AppCosmosModelIdRoute = Route$2.update({
  id: "/cosmos_/$modelId",
  path: "/cosmos/$modelId",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsEndpointIdSettingsRoute = Route$1.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppEndpointsEndpointIdRoute
});
const AppEndpointsEndpointIdDeployRoute = Route.update({
  id: "/deploy",
  path: "/deploy",
  getParentRoute: () => AppEndpointsEndpointIdRoute
});
const AppEndpointsEndpointIdRouteChildren = {
  AppEndpointsEndpointIdDeployRoute,
  AppEndpointsEndpointIdSettingsRoute
};
const AppEndpointsEndpointIdRouteWithChildren = AppEndpointsEndpointIdRoute._addFileChildren(
  AppEndpointsEndpointIdRouteChildren
);
const AppRouteRouteChildren = {
  AppAccountRoute,
  AppCosmosRoute,
  AppDeployRoute,
  AppObserveRoute,
  AppOverviewRoute,
  AppCosmosModelIdRoute,
  AppCosmosGuidedRoute,
  AppEndpointsEndpointIdRoute: AppEndpointsEndpointIdRouteWithChildren,
  AppEndpointsCreate_endpointRoute,
  AppEndpointsDeploy_endpointRoute
};
const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthSetPasswordRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    context: {
      auth: { isAuthenticated: false }
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$c as R,
  TooltipProvider as T,
  Tooltip as a,
  TooltipTrigger as b,
  cn as c,
  TooltipContent as d,
  Route$9 as e,
  Route$8 as f,
  fetchAPI as g,
  Route$6 as h,
  Route$5 as i,
  Route$4 as j,
  Route$3 as k,
  Route$2 as l,
  Route$1 as m,
  Route as n,
  router as r
};
