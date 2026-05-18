import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as models, e as endpoints, B as Badge } from "./mockData-CaVm0p_Q.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { C as Card, a as CardContent } from "./card-D8-7PCfA.mjs";
import { e as Route$9 } from "./router-D2WQTUn2.mjs";
import { n as ArrowLeft, P as Plus, R as Rocket } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
function RouteComponent() {
  const navigate = useNavigate();
  const {
    model: modelId
  } = Route$9.useSearch();
  const model = models.find((m) => m.id === modelId);
  const [selectedEndpointId, setSelectedEndpointId] = reactExports.useState("");
  if (!model) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3", onClick: () => navigate({
        to: "/app/cosmos",
        search: {
          hosting: ""
        }
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        " Back to Model Catalog"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Model not found. Please select a model from the catalog." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", onClick: () => navigate({
        to: "/app/cosmos",
        search: {
          hosting: ""
        }
      }), children: "Go to Model Catalog" })
    ] });
  }
  const handleDeploy = () => {
    if (selectedEndpointId) {
      navigate({
        to: "/app/endpoints/$endpointId/deploy",
        params: {
          endpointId: selectedEndpointId
        },
        search: {
          model: modelId,
          returnTo: `/app/deploy?model=${encodeURIComponent(modelId)}`,
          returnLabel: "Deploy"
        }
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container space-y-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3", onClick: () => navigate({
      to: "/app/cosmos/$modelId",
      params: {
        modelId
      },
      search: {
        returnTo: `/app/deploy?model=${encodeURIComponent(modelId)}`,
        returnLabel: "Deploy"
      }
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      " Back to Model"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold", children: [
        "Deploy ",
        model.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-body-sm text-muted-foreground", children: "Select an endpoint to deploy this model to, or create a new one." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Your Endpoints" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/endpoints/create_endpoint", search: {
        model: ""
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " Create New Endpoint"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: endpoints.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "col-span-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No endpoints available. Create your first endpoint to deploy models." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/endpoints/create_endpoint", search: {
        model: ""
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " Create Endpoint"
      ] }) })
    ] }) }) : endpoints.map((endpoint) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `cursor-pointer transition-colors hover:border-primary ${selectedEndpointId === endpoint.id ? "border-primary bg-primary/5" : ""}`, onClick: () => setSelectedEndpointId(endpoint.id), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: endpoint.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: endpoint.type })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Default:" }),
          " ",
          endpoint.defaultDeployment
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Health:" }),
          " ",
          endpoint.health
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Budget:" }),
          " ",
          endpoint.budgetUsed,
          "%"
        ] })
      ] })
    ] }) }, endpoint.id)) }),
    selectedEndpointId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleDeploy, size: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "mr-2 h-4 w-4" }),
      " Deploy to Selected Endpoint"
    ] }) })
  ] });
}
export {
  RouteComponent as component
};
