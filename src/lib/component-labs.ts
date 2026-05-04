import { DESIGN_SYSTEM_LABS_ROOT, dsLabPath } from "@/config/prototype-shell";

export { DESIGN_SYSTEM_LABS_ROOT };

/**
 * Component lab routes and labels (single source of truth for nav + App routes).
 * Paths are full paths for NavLink / navigate (under `/booster/design-system/dev/components/...`).
 */
export const COMPONENT_LAB_LINKS = [
  { label: "Accordion", path: dsLabPath("accordion") },
  { label: "Alert Dialog", path: dsLabPath("alert-dialog") },
  { label: "Alerts", path: dsLabPath("alerts") },
  { label: "Aspect Ratio", path: dsLabPath("aspect-ratio") },
  { label: "Avatars", path: dsLabPath("avatars") },
  { label: "Badges", path: dsLabPath("badges") },
  { label: "Breadcrumbs", path: dsLabPath("breadcrumbs") },
  { label: "Buttons", path: dsLabPath("buttons") },
  { label: "Calendar", path: dsLabPath("calendar") },
  { label: "Cards", path: dsLabPath("cards") },
  { label: "Carousel", path: dsLabPath("carousel") },
  { label: "Checkbox", path: dsLabPath("checkbox") },
  { label: "Collapsible", path: dsLabPath("collapsible") },
  { label: "Command", path: dsLabPath("command") },
  { label: "Context Menu", path: dsLabPath("context-menu") },
  { label: "Dialog", path: dsLabPath("dialog") },
  { label: "Dropdown Menu", path: dsLabPath("dropdown-menu") },
  { label: "Drawer", path: dsLabPath("drawer") },
  { label: "Hover Card", path: dsLabPath("hover-card") },
  { label: "Input", path: dsLabPath("input") },
  { label: "Input OTP", path: dsLabPath("input-otp") },
  { label: "Line Chart", path: dsLabPath("line-chart") },
  { label: "Menu Bar", path: dsLabPath("menubar") },
  { label: "Pagination", path: dsLabPath("pagination") },
  { label: "Popover", path: dsLabPath("popover") },
  { label: "Progress", path: dsLabPath("progress") },
  { label: "Radio Group", path: dsLabPath("radio-group") },
  { label: "Resizable", path: dsLabPath("resizable") },
  { label: "Scroll Area", path: dsLabPath("scroll-area") },
  { label: "Select", path: dsLabPath("select") },
  { label: "Separator", path: dsLabPath("separator") },
  { label: "Sheet", path: dsLabPath("sheet") },
  { label: "Sidebar", path: dsLabPath("sidebar") },
  { label: "Skeleton", path: dsLabPath("skeleton") },
  { label: "Slider", path: dsLabPath("slider") },
  { label: "Sonner", path: dsLabPath("sonner") },
  { label: "Switch", path: dsLabPath("switch") },
  { label: "Table", path: dsLabPath("table") },
  { label: "Tabs", path: dsLabPath("tabs") },
  { label: "Textarea", path: dsLabPath("textarea") },
  { label: "Toast", path: dsLabPath("toast") },
  { label: "Toaster", path: dsLabPath("toaster") },
  { label: "Toggle", path: dsLabPath("toggle") },
  { label: "Toggle Group", path: dsLabPath("toggle-group") },
  { label: "Tooltip", path: dsLabPath("tooltip") },
] as const;

/**
 * Platform-specific building blocks — "Sections" tab (not shadcn primitives).
 */
export const SECTION_LAB_LINKS = [
  { label: "App header", path: dsLabPath("sections/app-header") },
  { label: "Energy score", path: dsLabPath("sections/energy-score") },
  { label: "Endpoint card", path: dsLabPath("sections/endpoint-card") },
  { label: "Metrics", path: dsLabPath("sections/metrics") },
  { label: "Model card", path: dsLabPath("sections/model-card") },
  { label: "Stepper", path: dsLabPath("sections/stepper") },
  { label: "Shadows", path: dsLabPath("sections/shadows") },
] as const;

/** Default lab when visiting the design-system components index. */
export const COMPONENT_LABS_DEFAULT_PATH = dsLabPath("accordion");

/** Default lab when switching to the Sections tab. */
export const SECTION_LABS_DEFAULT_PATH = dsLabPath("sections/metrics");
