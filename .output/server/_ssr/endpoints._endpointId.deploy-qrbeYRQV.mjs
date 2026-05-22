import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Badge } from "./badge-TVJ2MtYX.mjs";
import { B as Button } from "./button-BoQ28Ykk.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CjswpSeu.mjs";
import { L as Label } from "./input-CTo6zooE.mjs";
import { t as toast } from "./sonner-C3D2Kk0w.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { J as Route, e as endpoints, m as models, c as cn, s as deployments } from "./router-dUByybLQ.mjs";
import { P as PageContainer } from "./PageContainer-Di6eNGHA.mjs";
import "../_libs/sonner.mjs";
import { q as ArrowLeft, o as Check } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
const switchRootVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)] data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform ease-standard data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        md: "h-5 w-5 data-[state=checked]:translate-x-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const Switch = reactExports.forwardRef(({ className, size = "md", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(switchRootVariants({ size }), className),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { className: switchThumbVariants({ size }) })
  }
));
Switch.displayName = Root.displayName;
function RouteComponent() {
  const confidentialSwitchId = reactExports.useId();
  const navigate = useNavigate();
  const {
    endpointId
  } = Route.useParams();
  const {
    model: preselectedModelId
  } = Route.useSearch();
  const endpoint = endpoints.find((e) => e.id === endpointId);
  const model = models.find((m) => m.id === preselectedModelId);
  const selectedModel = model;
  const [config, setConfig] = reactExports.useState({
    confidentialCompute: false,
    version: model?.version || "latest"
  });
  if (!endpoint) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "gap-4", className: "py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3 self-start", onClick: () => navigate({
        to: "/app/overview"
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        " Back to Endpoints"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Endpoint not found." })
    ] });
  }
  if (!model) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "gap-4", className: "py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3 self-start", onClick: () => navigate({
        to: "/app/endpoints/$endpointId",
        params: {
          endpointId
        },
        search: {
          returnTo: `/app/endpoints/${endpointId}/deploy`,
          returnLabel: "Deploy"
        }
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        " Back to Endpoint"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No model selected. Please select a model from the catalog first." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", className: "self-start px-0", onClick: () => navigate({
        to: "/app/cosmos",
        search: {
          hosting: ""
        }
      }), children: "Go to Model Catalog" })
    ] });
  }
  const handleDeploy = () => {
    if (!selectedModel || !endpoint) return;
    const regionLabel = endpoint.performanceProfile === "best-effort" ? "EU-West" : endpoint.performanceProfile === "premium" ? "EU-Central" : "EU-South";
    const newDeployment = {
      id: `dep-${Date.now()}`,
      name: `${selectedModel.name.toLowerCase().replace(/\s+/g, "-")}-${endpoint.name.toLowerCase().replace(/\s+/g, "-")}`,
      model: selectedModel.name,
      version: config.version,
      mode: "Shared",
      budgetUsed: 0,
      slaStatus: "OK",
      region: regionLabel,
      confidentialCompute: config.confidentialCompute,
      latencyP50: 0,
      costPer1MTokens: selectedModel.inputCostPer1M
    };
    if (!deployments[endpointId]) {
      deployments[endpointId] = [];
    }
    deployments[endpointId].push(newDeployment);
    if (deployments[endpointId].length === 1) {
      endpoint.defaultDeployment = selectedModel.name;
    }
    toast.success("Model Deployed", {
      description: `${selectedModel.name} has been deployed to "${endpoint.name}"`
    });
    navigate({
      to: "/app/endpoints/$endpointId",
      params: {
        endpointId
      },
      search: {
        returnTo: `/app/endpoints/${endpointId}/deploy?model=${encodeURIComponent(preselectedModelId)}`,
        returnLabel: "Deploy"
      }
    });
  };
  if (!selectedModel) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-6", className: "py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3 self-start", onClick: () => navigate({
      to: "/app/endpoints/$endpointId",
      params: {
        endpointId
      },
      search: {
        returnTo: `/app/endpoints/${endpointId}/deploy?model=${encodeURIComponent(preselectedModelId)}`,
        returnLabel: "Deploy"
      }
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      " Back to Endpoint"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold", children: [
        "Add ",
        selectedModel.name,
        " to Inference Endpoint"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-body-sm text-muted-foreground", children: [
        selectedModel.provider,
        " • v",
        selectedModel.version
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Endpoint" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: endpoint.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mt-1", children: endpoint.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Performance:" }),
              " ",
              endpoint.performanceProfile
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Budget:" }),
              " ",
              endpoint.budgetUsed,
              "% used"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Model" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: selectedModel.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedModel.provider })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Version:" }),
            " ",
            selectedModel.version
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Deployment Configuration" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: confidentialSwitchId, children: "Confidential Compute" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enable additional security and privacy protections for sensitive workloads" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: confidentialSwitchId, checked: config.confidentialCompute, onCheckedChange: (checked) => setConfig((prev) => ({
          ...prev,
          confidentialCompute: checked
        })) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleDeploy, size: "lg", children: [
      "Add to Endpoint ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-2 h-4 w-4" })
    ] }) })
  ] });
}
export {
  RouteComponent as component
};
