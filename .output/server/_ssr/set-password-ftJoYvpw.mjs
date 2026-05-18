import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BoosterLogo } from "./BoosterLogo-m5XAPojx.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { I as Input } from "./input-BIbIoEB2.mjs";
import { R as Route$c, c as cn } from "./router-D2WQTUn2.mjs";
import { d as ChevronLeft, e as Lock, f as EyeOff, g as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "./public-asset-url-539yhzQl.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const rules = [{
  label: "At least 10 characters",
  test: (p) => p.length >= 10
}, {
  label: "Contains at least one number",
  test: (p) => /\d/.test(p)
}, {
  label: "Contains at least one uppercase letter",
  test: (p) => /[A-Z]/.test(p)
}, {
  label: "Contains at least special character",
  test: (p) => /[^A-Za-z0-9]/.test(p)
}];
function SetPasswordPage() {
  const {
    token
  } = Route$c.useSearch();
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const ruleResults = rules.map((r) => r.test(password));
  const allRulesPassed = ruleResults.every(Boolean);
  const isValid = allRulesPassed && password === confirm && password.length > 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      password,
      token
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen flex overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { autoPlay: true, loop: true, muted: true, playsInline: true, poster: "/login-cover.webp", className: "absolute inset-0 size-full object-cover", children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: "/login-cover.webm", type: "video/webm" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/login-cover.webp", alt: "", className: "absolute inset-0 object-cover size-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex flex-1 items-center justify-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BoosterLogo, { variant: "lockup", tone: "on-dark", size: "xl" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-160 shrink-0 p-10 relative flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-card rounded-3xl flex flex-col items-center px-10 pt-10 pb-6 gap-6", style: {
      boxShadow: "0px 25px 60px -15px rgba(16,24,40,0.20), 0px 25px 60px -15px rgba(16,24,40,0.12)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1 text-sm font-semibold text-info hover:underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }),
          "Back"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BoosterLogo, { variant: "lockup", size: "xs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BoosterLogo, { variant: "lockup", size: "xs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-6 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold leading-[1.3] text-foreground", children: "Chose a new password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-secondary-foreground tracking-wide", children: "Passwords must be at least 10 characters long and include a mix of letters, numbers, and symbols. Avoid common or previously used passwords." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter new password...", className: "h-12 pl-10 pr-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "confirm", type: showConfirm ? "text" : "password", value: confirm, onChange: (e) => setConfirm(e.target.value), placeholder: "Re-enter new password...", className: "h-12 pl-10 pr-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirm((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-lg px-4 py-3 flex flex-col gap-1", children: rules.map((rule, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: cn("size-4 shrink-0", ruleResults[i] ? "text-success" : "text-muted-foreground") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm", ruleResults[i] ? "text-success" : "text-accent-foreground"), children: rule.label })
          ] }, rule.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: !isValid, children: "Submit" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SetPasswordPage as component
};
