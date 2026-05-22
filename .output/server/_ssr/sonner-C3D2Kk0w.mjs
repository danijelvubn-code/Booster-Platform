import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast$1, T as Toaster$1 } from "../_libs/sonner.mjs";
function getInitialMode() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "auto")
    return stored;
  return "light";
}
function applyThemeMode(mode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "auto" ? prefersDark ? "dark" : "light" : mode;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }
  document.documentElement.style.colorScheme = resolved;
}
function useTheme() {
  const [mode, setMode] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);
  reactExports.useEffect(() => {
    if (mode !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);
  function setTheme(nextMode) {
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem("theme", nextMode);
  }
  return { mode, setTheme };
}
const DEFAULT_TOAST_DURATION_MS = 5e3;
function applyToastDurationDefaults(data) {
  if (data?.duration !== void 0) {
    return data;
  }
  if (data === void 0) {
    return { duration: DEFAULT_TOAST_DURATION_MS };
  }
  const hasInteractiveControl = data.action !== void 0 || data.cancel !== void 0;
  return {
    ...data,
    duration: hasInteractiveControl ? Infinity : DEFAULT_TOAST_DURATION_MS
  };
}
function scheduleWallClockDismiss(id, options) {
  const ms = options?.duration;
  if (ms === void 0 || ms === Infinity || !Number.isFinite(ms) || ms <= 0) {
    return;
  }
  window.setTimeout(() => {
    toast$1.dismiss(id);
  }, ms);
}
const toast = Object.assign(
  (message, data) => {
    const merged = applyToastDurationDefaults(data);
    const id = toast$1(message, merged);
    scheduleWallClockDismiss(id, merged);
    return id;
  },
  {
    success: (message, data) => {
      const merged = applyToastDurationDefaults(data);
      const id = toast$1.success(message, merged);
      scheduleWallClockDismiss(id, merged);
      return id;
    },
    error: (message, data) => {
      const merged = applyToastDurationDefaults(data);
      const id = toast$1.error(message, merged);
      scheduleWallClockDismiss(id, merged);
      return id;
    },
    info: (message, data) => {
      const merged = applyToastDurationDefaults(data);
      const id = toast$1.info(message, merged);
      scheduleWallClockDismiss(id, merged);
      return id;
    },
    warning: (message, data) => {
      const merged = applyToastDurationDefaults(data);
      const id = toast$1.warning(message, merged);
      scheduleWallClockDismiss(id, merged);
      return id;
    },
    message: (message, data) => {
      const merged = applyToastDurationDefaults(data);
      const id = toast$1.message(message, merged);
      scheduleWallClockDismiss(id, merged);
      return id;
    },
    loading: (message, data) => toast$1.loading(message, applyToastDurationDefaults(data)),
    custom: (render, data) => {
      const merged = applyToastDurationDefaults(data);
      const id = toast$1.custom(render, merged);
      scheduleWallClockDismiss(id, merged);
      return id;
    },
    promise: toast$1.promise,
    dismiss: toast$1.dismiss,
    getHistory: toast$1.getHistory,
    getToasts: toast$1.getToasts
  }
);
const defaultToastClassNames = {
  toast: "group toast relative overflow-hidden border border-border bg-background text-foreground shadow-lg",
  /** Above the ::before tint (icon / content / actions are not inside one wrapper). */
  content: "relative z-10",
  icon: "relative z-10",
  title: "font-medium text-foreground",
  description: "text-muted-foreground",
  actionButton: "relative z-10 bg-primary text-primary-foreground",
  cancelButton: "relative z-10 bg-muted text-muted-foreground",
  closeButton: "relative z-10 border-border bg-background text-muted-foreground",
  /**
   * Solid `bg-background` below + 7% semantic tint (`/7` → --alpha-7) via ::before.
   * Use `before:` not `after:` — Sonner reserves ::after for stacked-toast spacing.
   */
  success: "border-success/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-success/7 [&_svg]:text-success",
  error: "border-destructive/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-destructive/7 [&_svg]:text-destructive",
  warning: "border-warning/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-warning/7 [&_svg]:text-warning",
  info: "border-info/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-info/7 [&_svg]:text-info",
  loading: "border-border before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-muted/7"
};
const Toaster = ({ toastOptions, duration, ...props }) => {
  const { mode } = useTheme();
  const resolvedDuration = duration ?? toastOptions?.duration ?? DEFAULT_TOAST_DURATION_MS;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      position: "top-right",
      duration: resolvedDuration,
      theme: mode === "auto" ? "system" : mode,
      className: "toaster group",
      toastOptions: {
        ...toastOptions,
        duration: toastOptions?.duration ?? DEFAULT_TOAST_DURATION_MS,
        classNames: {
          ...defaultToastClassNames,
          ...toastOptions?.classNames
        }
      },
      ...props
    }
  );
};
export {
  Toaster as T,
  toast as t,
  useTheme as u
};
