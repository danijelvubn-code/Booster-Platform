import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as endpoints, t as apiKeys, B as Badge } from "./mockData-CaVm0p_Q.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-DD7MC06r.mjs";
import { I as Input } from "./input-BIbIoEB2.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CU-CH7G3.mjs";
import { B as BackButton } from "./BackButton-BsTv_cee.mjs";
import { P as PageContainer } from "./PageContainer-DlMGeh4_.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-D8-7PCfA.mjs";
import { m as Route$1, c as cn } from "./router-D2WQTUn2.mjs";
import { K as Settings, ao as Key, j as ShieldCheck, ap as Users, aq as Bell, ar as CreditCard, _ as ExternalLink, X, q as Check, J as Copy, P as Plus, m as Ellipsis, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
const generateMockKey = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "bdc_";
  for (let i = 0; i < 32; i++)
    key += chars[Math.floor(Math.random() * chars.length)];
  return key;
};
function ApiKeysPanel({ spaceName }) {
  const keyNameId = reactExports.useId();
  const [keys, setKeys] = reactExports.useState(apiKeys);
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const [newKeyName, setNewKeyName] = reactExports.useState("");
  const [justCreatedKey, setJustCreatedKey] = reactExports.useState(null);
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const handleCreate = () => {
    if (!newKeyName.trim()) return;
    const fullKey = generateMockKey();
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      prefix: `${fullKey.slice(0, 6)}...${fullKey.slice(-4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      lastUsed: null,
      status: "active"
    };
    setKeys((prev) => [newKey, ...prev]);
    setJustCreatedKey(fullKey);
    setNewKeyName("");
    setIsCreating(false);
    toast.success("API key created", {
      description: `"${newKey.name}" is ready to use. Copy it now - it won't be shown again.`
    });
  };
  const handleToggleStatus = (id) => {
    const key = keys.find((k) => k.id === id);
    const newStatus = key?.status === "active" ? "disabled" : "active";
    setKeys(
      (prev) => prev.map(
        (k) => k.id !== id ? k : { ...k, status: newStatus }
      )
    );
    toast.success(newStatus === "disabled" ? "Key disabled" : "Key enabled", {
      description: newStatus === "disabled" ? "This key can no longer be used for requests." : "This key is now active again."
    });
  };
  const handleDelete = (id) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.success("Key deleted");
  };
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2e3);
  };
  const activeKeys = keys.filter((k) => k.status === "active");
  const disabledKeys = keys.filter((k) => k.status === "disabled");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-h3 text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-icon-20 w-icon-20 text-primary", "aria-hidden": true }),
        "API Keys"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
        "Manage API keys for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: spaceName }),
        ". Keys are scoped to the endpoint and apply to all models within it.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://docs.booster.cloud/api-keys",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-1 text-primary hover:underline",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
              " Learn how to use API keys"
            ]
          }
        )
      ] })
    ] }),
    justCreatedKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "absolute right-2 top-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground",
          onClick: () => setJustCreatedKey(null),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm-strong text-primary", children: "New key created - copy it now" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 select-all break-all rounded bg-muted px-3 py-2 font-mono text-caption", children: justCreatedKey }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "shrink-0",
            onClick: () => handleCopy("new", justCreatedKey),
            children: copiedId === "new" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "This key will not be shown again after you dismiss this banner." })
    ] }),
    isCreating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-lg border border-dashed border-primary/30 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: keyNameId, className: "text-body-sm-strong", children: "Key name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: keyNameId,
          placeholder: "e.g. Backend Service, Analytics Pipeline",
          value: newKeyName,
          onChange: (e) => setNewKeyName(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleCreate(),
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "This name will appear in usage reports to help you identify traffic sources." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => {
              setIsCreating(false);
              setNewKeyName("");
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleCreate, disabled: !newKeyName.trim(), children: "Generate Key" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => setIsCreating(true),
        className: "w-full border-dashed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-icon-16 w-icon-16" }),
          " Create New Key"
        ]
      }
    ),
    activeKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-caption font-medium text-muted-foreground", children: [
        "Active keys (",
        activeKeys.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Last used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: activeKeys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm-strong", children: k.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", className: "text-[10px]", children: "active" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-caption text-muted-foreground", children: k.prefix }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-caption text-muted-foreground", children: k.createdAt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-caption text-muted-foreground", children: k.lastUsed || "Never" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-7 w-7 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => handleToggleStatus(k.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "mr-2 h-4 w-4" }),
                    " Disable"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: "text-destructive focus:text-destructive",
                  onClick: () => handleDelete(k.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                    " Delete"
                  ]
                }
              )
            ] })
          ] }) })
        ] }, k.id)) })
      ] }) })
    ] }),
    disabledKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-caption font-medium text-muted-foreground", children: [
        "Disabled keys (",
        disabledKeys.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: disabledKeys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm", children: k.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "border-muted-foreground/30 text-[10px] text-muted-foreground",
              children: "disabled"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-caption text-muted-foreground", children: k.prefix }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-caption text-muted-foreground", children: k.createdAt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-7 px-2 text-xs",
            onClick: () => handleToggleStatus(k.id),
            children: "Enable"
          }
        ) })
      ] }, k.id)) }) }) })
    ] })
  ] });
}
const SETTINGS_NAV = [{
  id: "general",
  label: "General",
  icon: Settings,
  enabled: true
}, {
  id: "api-keys",
  label: "API Keys",
  icon: Key,
  enabled: true
}, {
  id: "guardrails",
  label: "Guardrails",
  icon: ShieldCheck,
  enabled: false
}, {
  id: "team-members",
  label: "Team Members",
  icon: Users,
  enabled: false
}, {
  id: "notifications",
  label: "Notifications",
  icon: Bell,
  enabled: false
}, {
  id: "budget-usage",
  label: "Budget & Usage",
  icon: CreditCard,
  enabled: false
}];
function SettingsNav({
  activeSection,
  onSectionChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "w-full shrink-0 space-y-1 lg:w-64", "aria-label": "Endpoint settings", children: SETTINGS_NAV.map((item) => {
    const Icon = item.icon;
    const isActive = item.id === activeSection;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
      if (item.enabled) onSectionChange(item.id);
    }, disabled: !item.enabled, className: cn("flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-body-sm transition-colors [&_svg]:text-current disabled:opacity-100", isActive ? "border border-primary/20 bg-primary/10 text-primary shadow-xs" : item.enabled ? "text-hierarchy-secondary hover:bg-primary/8 hover:text-primary" : "cursor-not-allowed text-hierarchy-disabled"), "aria-current": isActive ? "page" : void 0, "aria-disabled": !item.enabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-16 w-icon-16 shrink-0", "aria-hidden": true }),
      item.label
    ] }, item.id);
  }) });
}
function GeneralSettingsPreview({
  endpointName,
  endpointUrl
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-h3", children: "General" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Review endpoint identity and runtime protection settings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "endpoint-name", className: "text-body-sm-strong", children: "Inference Endpoint Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "endpoint-name", value: endpointName, readOnly: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "endpoint-url", className: "text-body-sm-strong", children: "Endpoint URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "endpoint-url", value: endpointUrl, readOnly: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", children: "Save Changes" }) })
  ] });
}
function RouteComponent() {
  const {
    endpointId
  } = Route$1.useParams();
  const endpoint = endpoints.find((s) => s.id === endpointId);
  const [activeSection, setActiveSection] = reactExports.useState("general");
  if (!endpoint) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground", children: "Inference Endpoint not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/overview", children: "← Back to Inference Endpoints" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-8", className: "max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { to: `/app/endpoints/${endpoint.id}`, label: `Back to ${endpoint.name}`, className: "ml-0 self-start" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8 lg:flex-row lg:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNav, { activeSection, onSectionChange: setActiveSection }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-6", children: [
        activeSection === "general" ? /* @__PURE__ */ jsxRuntimeExports.jsx(GeneralSettingsPreview, { endpointName: endpoint.name, endpointUrl: endpoint.endpoint }) : null,
        activeSection === "api-keys" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeysPanel, { spaceName: endpoint.name }) }) }) : null
      ] })
    ] })
  ] });
}
export {
  RouteComponent as component
};
