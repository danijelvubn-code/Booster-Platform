import { cn } from "@/lib/utils";
import { publicAssetUrl } from "@/lib/public-asset-url";

export type BoosterLogoVariant = "mark" | "lockup";
export type BoosterLogoTone = "on-dark" | "on-light";

export type BoosterLogoProps = {
  variant?: BoosterLogoVariant;
  /** Lockup wordmark contrast; ignored for `mark`. */
  tone?: BoosterLogoTone;
  /** Height preset (lockup width follows intrinsic aspect). */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Use when the logo sits inside a control that already has an accessible name (e.g. link `aria-label`). */
  presentation?: boolean;
  className?: string;
};

const LOCKUP_SRC: Record<BoosterLogoTone, string> = {
  "on-dark": publicAssetUrl("brand/booster-logo-white.svg"),
  "on-light": publicAssetUrl("brand/booster-logo-black.svg"),
};

const MARK_SRC = publicAssetUrl("brand/booster-mark.svg");

const markSizeClass = {
  xs: "h-icon-16 w-icon-16",
  sm: "h-icon-20 w-icon-20",
  md: "h-icon-24 w-icon-24",
  lg: "h-icon-28 w-icon-28",
  xl: "h-icon-60 w-icon-60",
} as const;

const lockupHeightClass = {
  xs: "h-icon-16",
  sm: "h-icon-20",
  md: "h-icon-24",
  lg: "h-icon-28",
  xl: "h-icon-60",
} as const;

/** Brand lockup or bolt mark from `public/brand/` (no separate wordmark text). */
export function BoosterLogo({
  variant = "lockup",
  tone = "on-light",
  size = "md",
  presentation = false,
  className,
}: BoosterLogoProps) {
  if (variant === "mark") {
    return (
      <img
        src={MARK_SRC}
        alt=""
        className={cn(markSizeClass[size], "shrink-0 object-contain", className)}
      />
    );
  }

  const alt = presentation ? "" : "Booster";
  return (
    <img
      src={LOCKUP_SRC[tone]}
      alt={alt}
      className={cn(
        lockupHeightClass[size],
        "w-auto max-w-full shrink-0 object-contain object-left",
        className,
      )}
    />
  );
}
