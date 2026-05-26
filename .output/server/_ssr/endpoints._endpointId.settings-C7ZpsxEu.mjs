import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Badge } from "./badge-Dnm4IJqH.mjs";
import { B as Button } from "./button-DnRCyT-6.mjs";
import { I as Input, b as InputRoot, c as InputSegment, d as InputControl, e as InputSuffixAddon } from "./input-BOqlbEZE.mjs";
import { S as Separator } from "./separator-2L_hbZwB.mjs";
import { t as toast } from "./sonner-C3D2Kk0w.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DCzV_UUZ.mjs";
import { N as Route$1, e as endpoints, c as cn, s as deployments, M as apiKeys } from "./router-D-lR6Urn.mjs";
import { B as BackButton } from "./BackButton-vcAob74P.mjs";
import { P as PageContainer } from "./PageContainer-B9Tci9E7.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-TFsw_QGS.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-JbPCLLnM.mjs";
import "../_libs/sonner.mjs";
import { Q as Settings, aw as Key, j as ShieldCheck, ax as Users, ay as Bell, az as CreditCard, o as Check, O as Copy, a0 as ExternalLink, P as Plus, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const apiKeysTableCol = {
  name: "min-w-0",
  key: "w-[140px] min-w-[140px] max-w-[140px]",
  created: "w-[140px] min-w-[140px] max-w-[140px]",
  lastUsed: "w-[140px] min-w-[140px] max-w-[140px]",
  actions: "w-[104px] min-w-[104px] max-w-[104px] whitespace-nowrap text-right"
};
function apiKeyMaskedPreview(key) {
  const secret = key.fullKey;
  if (secret) {
    if (secret.length <= 7) return secret;
    return `${secret.slice(0, 3)}...${secret.slice(-4)}`;
  }
  const p = key.prefix;
  const parts = p.split("...");
  if (parts.length === 2 && parts[0] !== void 0 && parts[1] !== void 0) {
    const head = parts[0];
    const tail = parts[1];
    return `${head.slice(0, 3)}...${tail.slice(-4)}`;
  }
  if (p.length <= 7) return p;
  return `${p.slice(0, 3)}...${p.slice(-4)}`;
}
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
      prefix: `${fullKey.slice(0, 3)}...${fullKey.slice(-4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      lastUsed: null,
      status: "active",
      isDefault: false
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
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2e3);
  };
  const defaultKey = keys.find((k) => k.isDefault);
  const customKeys = keys.filter((k) => !k.isDefault);
  const activeCustomKeys = customKeys.filter((k) => k.status === "active");
  const disabledCustomKeys = customKeys.filter((k) => k.status === "disabled");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "aria-labelledby": "api-keys-panel-heading",
        className: "px-6 pb-5 pt-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "api-keys-panel-heading", className: "text-h3 text-foreground", children: "API Keys" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-[620px] text-body-sm text-muted-foreground", children: [
              "Manage API keys for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: spaceName }),
              ". Keys are scoped to the endpoint and apply to all models within it."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "shrink-0 self-start",
              asChild: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "https://docs.booster.cloud/api-keys",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2",
                  children: [
                    "Learn more",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-icon-16 w-icon-16 shrink-0", "aria-hidden": true })
                  ]
                }
              )
            }
          )
        ] })
      }
    ),
    defaultKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "w-full shrink-0", decorative: true }) : null,
    defaultKey && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-labelledby": "default-api-key-heading", className: "px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-lg border bg-muted/30 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "default-api-key-heading", className: "text-base font-semibold text-foreground", children: "Default API key" }),
        defaultKey.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", size: "24", children: "active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            size: "24",
            className: "border-muted-foreground/30 text-muted-foreground",
            children: "disabled"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[620px] text-body-sm text-hierarchy-secondary", children: "Automatically created with this endpoint for quick setup and testing. For production use, create dedicated keys so access can be managed, rotated, and disabled safely." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "code",
          {
            className: cn(
              "min-w-0 max-w-full truncate rounded-md border bg-white px-3 py-2 font-mono text-caption",
              defaultKey.status === "disabled" ? "border-dashed text-muted-foreground" : "text-foreground"
            ),
            children: apiKeyMaskedPreview(defaultKey)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => handleCopy(
                defaultKey.id,
                defaultKey.fullKey ?? defaultKey.prefix
              ),
              children: [
                copiedId === defaultKey.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-3.5 w-3.5", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-1 h-3.5 w-3.5", "aria-hidden": true }),
                "Copy key"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => handleToggleStatus(defaultKey.id),
              children: defaultKey.status === "active" ? "Disable" : "Enable"
            }
          )
        ] })
      ] })
    ] }) }),
    defaultKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "w-full shrink-0", decorative: true }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "aria-labelledby": "custom-api-keys-heading",
        className: cn(
          "space-y-4 px-6 pb-6",
          defaultKey ? "pt-6" : "pt-0"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "custom-api-keys-heading", className: "text-base font-semibold text-foreground", children: "Custom API keys" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-[620px] text-body-sm text-muted-foreground", children: "Create dedicated keys for production apps, staging environments, services, or team-specific access." })
            ] }),
            !isCreating && !justCreatedKey && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "default",
                className: "shrink-0 self-start",
                onClick: () => setIsCreating(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-icon-16 w-icon-16", "aria-hidden": true }),
                  " Create new key"
                ]
              }
            )
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
          ] }) : null,
          justCreatedKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-3 rounded-lg border border-warning/30 bg-warning/4 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "absolute right-2 top-2 h-6 w-6 p-0 text-hierarchy-secondary hover:text-foreground",
                onClick: () => setJustCreatedKey(null),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5", "aria-hidden": true })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pr-8 text-body-sm-strong text-warning", children: "New API key created" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-hierarchy-secondary", children: "Copy this key now. For security, it will not be shown again after you dismiss this message." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "min-w-0 flex-1 select-all break-all rounded border border-border bg-white px-3 py-2 font-mono text-caption text-foreground", children: justCreatedKey }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "shrink-0",
                  onClick: () => handleCopy("new", justCreatedKey),
                  children: [
                    copiedId === "new" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-3.5 w-3.5", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-1 h-3.5 w-3.5", "aria-hidden": true }),
                    "Copy key"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-hierarchy-secondary", children: "Store this key somewhere safe. To create another key, dismiss this message first." })
          ] }),
          activeCustomKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-caption font-medium text-muted-foreground", children: [
              "Active keys (",
              activeCustomKeys.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { className: "table-fixed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.name, children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.key, children: "Key" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.created, children: "Created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.lastUsed, children: "Last used" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.actions, children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: activeCustomKeys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: apiKeysTableCol.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm-strong", children: k.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", className: "text-[10px]", children: "active" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: apiKeysTableCol.key, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block truncate font-mono text-caption text-muted-foreground", children: apiKeyMaskedPreview(k) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TableCell,
                  {
                    className: cn(
                      "text-caption text-muted-foreground",
                      apiKeysTableCol.created
                    ),
                    children: k.createdAt
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TableCell,
                  {
                    className: cn(
                      "text-caption text-muted-foreground",
                      apiKeysTableCol.lastUsed
                    ),
                    children: k.lastUsed || "Never"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: apiKeysTableCol.actions, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-3 text-xs",
                    onClick: () => handleToggleStatus(k.id),
                    children: "Disable"
                  }
                ) })
              ] }, k.id)) })
            ] }) })
          ] }),
          disabledCustomKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-caption font-medium text-muted-foreground", children: [
              "Disabled keys (",
              disabledCustomKeys.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { className: "table-fixed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.name, children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.key, children: "Key" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.created, children: "Created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.lastUsed, children: "Last used" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: apiKeysTableCol.actions, children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: disabledCustomKeys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: apiKeysTableCol.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: apiKeysTableCol.key, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block truncate font-mono text-caption text-muted-foreground", children: apiKeyMaskedPreview(k) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TableCell,
                  {
                    className: cn(
                      "text-caption text-muted-foreground",
                      apiKeysTableCol.created
                    ),
                    children: k.createdAt
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TableCell,
                  {
                    className: cn(
                      "text-caption text-muted-foreground",
                      apiKeysTableCol.lastUsed
                    ),
                    children: k.lastUsed || "Never"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: apiKeysTableCol.actions, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-3 text-xs",
                    onClick: () => handleToggleStatus(k.id),
                    children: "Enable"
                  }
                ) })
              ] }, k.id)) })
            ] }) })
          ] })
        ]
      }
    )
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
function DeleteEndpointDialog({
  endpoint,
  open,
  onOpenChange,
  showActiveUsageWarning,
  onAfterEndpointDeleted
}) {
  const confirmInputId = `${endpoint.id}-delete-confirm`;
  const [confirmText, setConfirmText] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (open) setConfirmText("");
  }, [open]);
  const confirmationName = endpoint.name;
  const nameMatches = confirmText === confirmationName;
  const handlePermanentDelete = () => {
    if (!nameMatches) return;
    if (endpoint.id === "sp-default") {
      toast.error("Endpoint could not be deleted", {
        description: "This endpoint still has active dependencies. Remove connected API keys, traffic rules, or policies before deleting it."
      });
      onOpenChange(false);
      return;
    }
    const idx = endpoints.findIndex((e) => e.id === endpoint.id);
    if (idx !== -1) endpoints.splice(idx, 1);
    delete deployments[endpoint.id];
    onOpenChange(false);
    toast.success("Endpoint deleted", {
      description: `${confirmationName} has been permanently deleted. Its endpoint URL is no longer active.`
    });
    onAfterEndpointDeleted();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg gap-0 overflow-hidden p-0 sm:rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "space-y-2 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-h3", children: "Delete endpoint?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-hierarchy-secondary", children: [
          "You are about to permanently delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: confirmationName }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-hierarchy-secondary", children: "Applications using this endpoint URL will stop working immediately. This cannot be undone." }),
        showActiveUsageWarning ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-destructive/25 bg-destructive/7 px-3 py-2 text-body-sm text-foreground", children: "This endpoint has active API usage. Deleting it may break connected applications." }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium text-hierarchy-secondary", children: "This action will:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc space-y-1 pl-5 text-body-sm text-hierarchy-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Remove the endpoint configuration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Disable the endpoint URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Revoke or invalidate endpoint-specific API access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Stop routing traffic through this endpoint" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Keep historical usage/logs only if your retention policy allows it" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: confirmInputId, className: "text-body-sm font-medium text-foreground", children: "To confirm, type the endpoint name below:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: confirmInputId, value: confirmText, onChange: (e) => setConfirmText(e.target.value), placeholder: `Type "${confirmationName}"`, autoComplete: "off", "aria-invalid": confirmText.length > 0 && !nameMatches })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", disabled: !nameMatches, onClick: handlePermanentDelete, children: "Delete endpoint permanently" })
    ] })
  ] }) });
}
function GeneralSettingsPreview({
  endpoint,
  nameDraft,
  savedEndpointName,
  onNameChange,
  endpointUrl,
  onSave,
  onAfterEndpointDeleted
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [urlCopied, setUrlCopied] = reactExports.useState(false);
  const copyUrlTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setUrlCopied(false);
  }, [endpointUrl]);
  reactExports.useEffect(() => () => {
    if (copyUrlTimerRef.current !== null) {
      window.clearTimeout(copyUrlTimerRef.current);
    }
  }, []);
  const handleCopyEndpointUrl = () => {
    void navigator.clipboard.writeText(endpointUrl).then(() => {
      toast.success("Endpoint URL copied");
      setUrlCopied(true);
      if (copyUrlTimerRef.current !== null) {
        window.clearTimeout(copyUrlTimerRef.current);
      }
      copyUrlTimerRef.current = window.setTimeout(() => {
        setUrlCopied(false);
        copyUrlTimerRef.current = null;
      }, 2e3);
    }, () => toast.error("Could not copy endpoint URL."));
  };
  const deploymentCount = deployments[endpoint.id]?.length ?? 0;
  const showActiveUsageWarning = endpoint.type === "Production" || deploymentCount > 0 || endpoint.inputTokens > 0 || endpoint.monthlySpend > 0;
  const hasUnsavedChanges = nameDraft.trim() !== savedEndpointName.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-h3", children: "General" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Review endpoint identity and runtime protection settings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "endpoint-name", className: "text-body-sm-strong", children: "Inference Endpoint Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "endpoint-name", value: nameDraft, onChange: (e) => onNameChange(e.target.value), autoComplete: "off" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "endpoint-url", className: "text-body-sm-strong", children: "Endpoint URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(InputRoot, { fieldDisabled: true, className: "cursor-not-allowed bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputSegment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputControl, { id: "endpoint-url", value: endpointUrl, readOnly: true, disabled: true, "aria-readonly": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputSuffixAddon, { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", className: cn("-mr-1 shrink-0 text-foreground/75 hover:text-foreground", urlCopied && "text-success hover:bg-transparent hover:text-success"), "aria-label": urlCopied ? "Endpoint URL copied" : "Copy endpoint URL", onClick: handleCopyEndpointUrl, children: urlCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4", "aria-hidden": true }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: onSave, disabled: !hasUnsavedChanges, children: "Save Changes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-t border-border bg-destructive/4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-h3 text-destructive", children: "Danger Zone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm-strong text-foreground", children: "Delete endpoint" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-body-sm text-hierarchy-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Permanently delete this endpoint and disable its API URL. Any application using this endpoint will stop working immediately." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Historical usage and logs may remain available based on your organization's retention policy." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", className: "self-start", onClick: () => setDeleteDialogOpen(true), children: "Delete endpoint" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteEndpointDialog, { endpoint, open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, showActiveUsageWarning, onAfterEndpointDeleted })
  ] });
}
function RouteComponent() {
  const navigate = useNavigate();
  const {
    endpointId
  } = Route$1.useParams();
  const endpoint = endpoints.find((s) => s.id === endpointId);
  const [activeSection, setActiveSection] = reactExports.useState("general");
  const [nameDraft, setNameDraft] = reactExports.useState(endpoint?.name ?? "");
  const [savedEndpointName, setSavedEndpointName] = reactExports.useState(endpoint?.name ?? "");
  reactExports.useEffect(() => {
    if (!endpoint) return;
    setNameDraft(endpoint.name);
    setSavedEndpointName(endpoint.name);
  }, [endpoint]);
  if (!endpoint) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "gap-4", className: "py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground", children: "Inference Endpoint not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4 self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/overview", children: "← Back to Inference Endpoints" }) })
    ] });
  }
  const handleSaveGeneral = () => {
    const trimmed = nameDraft.trim();
    if (!trimmed) {
      toast.error("Could not save settings", {
        description: "Inference endpoint name cannot be empty."
      });
      return;
    }
    const baseline = savedEndpointName.trim();
    if (trimmed === baseline) {
      return;
    }
    endpoint.name = trimmed;
    setSavedEndpointName(trimmed);
    setNameDraft(trimmed);
    toast.success("Settings saved", {
      description: "Endpoint name has been updated."
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-8", className: "max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { to: `/app/endpoints/${endpoint.id}`, label: `Back to ${nameDraft}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8 lg:flex-row lg:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNav, { activeSection, onSectionChange: setActiveSection }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-6", children: [
        activeSection === "general" ? /* @__PURE__ */ jsxRuntimeExports.jsx(GeneralSettingsPreview, { endpoint, nameDraft, savedEndpointName, onNameChange: setNameDraft, endpointUrl: endpoint.endpoint, onSave: handleSaveGeneral, onAfterEndpointDeleted: () => navigate({
          to: "/app/overview",
          replace: true
        }) }) : null,
        activeSection === "api-keys" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeysPanel, { spaceName: endpoint.name }) }) }) : null
      ] })
    ] })
  ] });
}
export {
  RouteComponent as component
};
