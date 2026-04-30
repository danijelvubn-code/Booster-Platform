import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Matches `theme.extend.height` in tailwind.config.ts so `h-control-sm` merges with `h-6`, etc. */
const designSystemHeightKeys = [
  "icon-16",
  "icon-20",
  "icon-24",
  "icon-28",
  "icon-32",
  "icon-40",
  "icon-72",
  "icon-container-104",
  "scroll-area",
  "avatar",
  "chart-sm",
  "chart-md",
  "control-sm",
  "control-md",
  "control-lg",
  "components-dropdown",
] as const;

/** Matches `theme.extend.width` in tailwind.config.ts so `w-control-sm` merges with `w-6`, etc. */
const designSystemWidthKeys = [
  "modal-auth",
  "icon-16",
  "icon-20",
  "icon-24",
  "icon-28",
  "icon-32",
  "icon-40",
  "icon-72",
  "icon-container-104",
  "scroll-area",
  "avatar",
  "control-sm",
  "control-md",
  "control-lg",
  "component-labs-audit",
] as const;

/** Matches `theme.extend.maxWidth` so `max-w-modal-sm` merges with `max-w-[520px]`, etc. */
const designSystemMaxWidthKeys = [
  "modal-sm",
  "modal-md",
  "modal-lg",
  "modal-auth",
  "component-labs",
  "component-labs-row",
  "page-intro",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
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
            "code",
          ],
        },
      ],
      h: [{ h: [...designSystemHeightKeys] }],
      w: [{ w: [...designSystemWidthKeys] }],
      "max-w": [{ "max-w": [...designSystemMaxWidthKeys] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
