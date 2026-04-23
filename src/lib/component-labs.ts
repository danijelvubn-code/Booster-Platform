/**
 * Component lab routes and labels (single source of truth for nav + App routes).
 * Paths are full paths for NavLink / navigate.
 */
export const COMPONENT_LAB_LINKS = [
  { label: "Accordion", path: "/dev/components/accordion" },
  { label: "Alert Dialog", path: "/dev/components/alert-dialog" },
  { label: "Alerts", path: "/dev/components/alerts" },
  { label: "Aspect Ratio", path: "/dev/components/aspect-ratio" },
  { label: "Avatars", path: "/dev/components/avatars" },
  { label: "Badges", path: "/dev/components/badges" },
  { label: "Breadcrumbs", path: "/dev/components/breadcrumbs" },
  { label: "Buttons", path: "/dev/components/buttons" },
  { label: "Calendar", path: "/dev/components/calendar" },
  { label: "Cards", path: "/dev/components/cards" },
  { label: "Carousel", path: "/dev/components/carousel" },
  { label: "Checkbox", path: "/dev/components/checkbox" },
  { label: "Collapsible", path: "/dev/components/collapsible" },
  { label: "Command", path: "/dev/components/command" },
  { label: "Context Menu", path: "/dev/components/context-menu" },
  { label: "Dialog", path: "/dev/components/dialog" },
  { label: "Dropdown Menu", path: "/dev/components/dropdown-menu" },
  { label: "Drawer", path: "/dev/components/drawer" },
  { label: "Hover Card", path: "/dev/components/hover-card" },
  { label: "Input", path: "/dev/components/input" },
  { label: "Input OTP", path: "/dev/components/input-otp" },
  { label: "Line Chart", path: "/dev/components/line-chart" },
  { label: "Menu Bar", path: "/dev/components/menubar" },
  { label: "Pagination", path: "/dev/components/pagination" },
  { label: "Popover", path: "/dev/components/popover" },
  { label: "Progress", path: "/dev/components/progress" },
  { label: "Radio Group", path: "/dev/components/radio-group" },
  { label: "Resizable", path: "/dev/components/resizable" },
  { label: "Scroll Area", path: "/dev/components/scroll-area" },
  { label: "Select", path: "/dev/components/select" },
  { label: "Separator", path: "/dev/components/separator" },
  { label: "Sheet", path: "/dev/components/sheet" },
  { label: "Sidebar", path: "/dev/components/sidebar" },
  { label: "Skeleton", path: "/dev/components/skeleton" },
  { label: "Slider", path: "/dev/components/slider" },
  { label: "Sonner", path: "/dev/components/sonner" },
  { label: "Switch", path: "/dev/components/switch" },
  { label: "Table", path: "/dev/components/table" },
  { label: "Tabs", path: "/dev/components/tabs" },
  { label: "Textarea", path: "/dev/components/textarea" },
  { label: "Toast", path: "/dev/components/toast" },
  { label: "Toaster", path: "/dev/components/toaster" },
  { label: "Toggle", path: "/dev/components/toggle" },
  { label: "Toggle Group", path: "/dev/components/toggle-group" },
  { label: "Tooltip", path: "/dev/components/tooltip" },
] as const;

/**
 * Platform-specific building blocks — "Sections" tab (not shadcn primitives).
 * Add new entries here and register matching routes under `/dev/components/sections/…`.
 */
export const SECTION_LAB_LINKS = [
  { label: "Energy score", path: "/dev/components/sections/energy-score" },
  { label: "Metrics", path: "/dev/components/sections/metrics" },
  { label: "Model card", path: "/dev/components/sections/model-card" },
  { label: "Shadows", path: "/dev/components/sections/shadows" },
] as const;

/** Default lab when visiting `/dev/components` (Components tab). */
export const COMPONENT_LABS_DEFAULT_PATH = "/dev/components/accordion" as const;

/** Default lab when switching to the Sections tab. */
export const SECTION_LABS_DEFAULT_PATH = "/dev/components/sections/metrics" as const;
