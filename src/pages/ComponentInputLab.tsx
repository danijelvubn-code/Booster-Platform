import { useEffect, useId, useMemo, useRef, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Link2,
  Mail,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  Type,
  UserPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputAddonText,
  InputClearButton,
  InputControl,
  InputLeadIcon,
  InputLoadingIndicator,
  InputPrefixAddon,
  InputRoot,
  type InputRootSize,
  InputSegment,
  InputSuffixAddon,
  InputTrailIcon,
  Label,
} from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type PrefixOption = "none" | "icon" | "text" | "select";
type FieldTypeOption = "text" | "email" | "password" | "number" | "search" | "url";
type DecorationOption =
  | "none"
  | "lead-icon"
  | "trail-icon"
  | "both-icons"
  | "clearable"
  | "loading"
  | "password-toggle";
type SuffixOption =
  | "none"
  | "icon-button"
  | "text-button"
  | "primary-button"
  | "value-label"
  | "dropdown"
  | "action-menu";
type VisualStateOption =
  | "default"
  | "hover"
  | "focus"
  | "filled"
  | "error"
  | "success"
  | "disabled"
  | "readonly";
type LabelHelpOption = "no-label" | "label" | "helper" | "error-message";

const SAMPLE_BY_TYPE: Record<FieldTypeOption, string> = {
  text: "Acme Corporation",
  email: "hello@example.com",
  password: "hunter2",
  number: "128",
  search: "latency budget",
  url: "api.example.com",
};

const compactSelectTrigger = cn(
  "h-control-md w-auto min-w-0 border-0 bg-transparent px-2 py-0 shadow-none",
  "focus:ring-0 focus:ring-offset-0",
);

function sampleValueFor(fieldType: FieldTypeOption, prefix: PrefixOption): string {
  if (fieldType === "url" && prefix === "text") return "v1/users";
  if (fieldType === "text" && (prefix === "select" || prefix === "text")) return "555 0100";
  return SAMPLE_BY_TYPE[fieldType];
}

const ComponentInputLab = () => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [prefix, setPrefix] = useState<PrefixOption>("none");
  const [fieldType, setFieldType] = useState<FieldTypeOption>("text");
  const [decoration, setDecoration] = useState<DecorationOption>("none");
  const [suffix, setSuffix] = useState<SuffixOption>("none");
  const [visualState, setVisualState] = useState<VisualStateOption>("default");
  const [labelHelp, setLabelHelp] = useState<LabelHelpOption>("no-label");
  const [size, setSize] = useState<InputRootSize>("md");

  const [country, setCountry] = useState("+387");
  const [currency, setCurrency] = useState("USD");
  const [protocol, setProtocol] = useState("https://");
  const [suffixSelect, setSuffixSelect] = useState("copy");
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const decorationOptions: { value: DecorationOption; label: string }[] = useMemo(() => {
    const base: { value: DecorationOption; label: string }[] = [
      { value: "none", label: "No icon" },
      { value: "lead-icon", label: "Leading icon" },
      { value: "trail-icon", label: "Trailing icon" },
      { value: "both-icons", label: "Both icons" },
      { value: "clearable", label: "Clearable" },
      { value: "loading", label: "Loading" },
    ];
    if (fieldType === "password") {
      base.push({ value: "password-toggle", label: "Password toggle" });
    }
    return base;
  }, [fieldType]);

  useEffect(() => {
    if (!decorationOptions.some((o) => o.value === decoration)) {
      setDecoration("none");
    }
  }, [decorationOptions, decoration]);

  useEffect(() => {
    if (visualState === "default") {
      setValue("");
      return;
    }
    setValue(sampleValueFor(fieldType, prefix));
  }, [visualState, fieldType, prefix]);

  useEffect(() => {
    if (visualState !== "focus") return;
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [visualState, fieldType]);

  const inputType =
    fieldType === "password" && decoration === "password-toggle" && showPassword
      ? "text"
      : fieldType === "password"
        ? "password"
        : fieldType === "email"
          ? "email"
          : fieldType === "number"
            ? "number"
            : fieldType === "search"
              ? "search"
              : fieldType === "url"
                ? "url"
                : "text";

  const phoneStylePrefix = fieldType === "text" && (prefix === "select" || prefix === "text");

  const invalid = visualState === "error" || labelHelp === "error-message";
  const success = visualState === "success" && !invalid;
  const disabled = visualState === "disabled";
  const readOnly = visualState === "readonly";

  const showErrorMsg = labelHelp === "error-message" || visualState === "error";
  const showHelper = labelHelp === "helper" && !showErrorMsg;

  const simulatedShellClass = visualState === "hover" ? "border-ring" : "";

  const iconSizeClass = size === "lg" ? "[&_svg]:h-icon-20 [&_svg]:w-icon-20" : "[&_svg]:h-icon-16 [&_svg]:w-icon-16";

  const leadDecoration =
    decoration === "lead-icon" || decoration === "both-icons"
      ? fieldType === "search"
        ? (
            <InputLeadIcon>
              <Search className={cn(iconSizeClass)} aria-hidden />
            </InputLeadIcon>
          )
        : fieldType === "email"
          ? (
              <InputLeadIcon>
                <Mail className={cn(iconSizeClass)} aria-hidden />
              </InputLeadIcon>
            )
          : fieldType === "url"
            ? (
                <InputLeadIcon>
                  <Link2 className={cn(iconSizeClass)} aria-hidden />
                </InputLeadIcon>
              )
            : (
                <InputLeadIcon>
                  <Type className={cn(iconSizeClass)} aria-hidden />
                </InputLeadIcon>
              )
      : null;

  const trailDecoration =
    decoration === "trail-icon" || decoration === "both-icons"
      ? (
          <InputTrailIcon>
            <Sparkles className={cn(iconSizeClass)} aria-hidden />
          </InputTrailIcon>
        )
      : null;

  const showLoader = decoration === "loading";

  const showClear =
    decoration === "clearable" && value.length > 0 && !disabled && !readOnly && !showLoader;

  const passwordToggleInSegment = fieldType === "password" && decoration === "password-toggle";

  const prefixNode = useMemo(() => {
    switch (prefix) {
      case "none":
        return null;
      case "icon":
        return (
          <InputPrefixAddon className={cn("pl-3", iconSizeClass)}>
            <Globe className="text-foreground/50" aria-hidden />
          </InputPrefixAddon>
        );
      case "text":
        return (
          <InputPrefixAddon>
            <InputAddonText>
              {fieldType === "url" ? protocol : fieldType === "text" ? country : currency}
            </InputAddonText>
          </InputPrefixAddon>
        );
      case "select":
        return (
          <InputPrefixAddon className="min-w-0 gap-1 pr-2 pl-2">
            <Select
              value={fieldType === "url" ? protocol : fieldType === "text" ? country : currency}
              onValueChange={fieldType === "url" ? setProtocol : fieldType === "text" ? setCountry : setCurrency}
            >
              <SelectTrigger className={cn(compactSelectTrigger, size === "sm" && "h-control-sm", size === "lg" && "h-control-lg")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fieldType === "text" ? (
                  <>
                    <SelectItem value="+387">+387</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </>
                ) : fieldType === "url" ? (
                  <>
                    <SelectItem value="https://">https://</SelectItem>
                    <SelectItem value="http://">http://</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </InputPrefixAddon>
        );
      default:
        return null;
    }
  }, [prefix, fieldType, country, protocol, currency, iconSizeClass, size]);

  const suffixNode = useMemo(() => {
    switch (suffix) {
      case "none":
        return null;
      case "icon-button":
        return (
          <InputSuffixAddon className="gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Copy"
              disabled={disabled}
              onClick={() => navigator.clipboard.writeText(value)}
            >
              <Copy className="h-icon-16 w-icon-16" aria-hidden />
            </Button>
          </InputSuffixAddon>
        );
      case "text-button":
        return (
          <InputSuffixAddon
            className={cn(
              "items-center gap-0 border-l-0 px-0",
              size === "sm" && "pt-0 pr-0 pb-0 pl-2",
              size === "md" && "pt-0.5 pr-0.5 pb-0.5 pl-2",
              size === "lg" && "pt-1.5 pr-1.5 pb-1.5 pl-2",
            )}
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "shrink-0",
                size === "sm" && "rounded-l-none border-t-0 border-r-0 border-b-0",
                size === "md" && "rounded-[6px]",
              )}
              disabled={disabled}
            >
              <UserPlus className="h-icon-16 w-icon-16" aria-hidden />
              Invite
            </Button>
          </InputSuffixAddon>
        );
      case "primary-button":
        return (
          <InputSuffixAddon
            className={cn(
              "items-center gap-0 border-l-0 px-0",
              size === "sm" && "pt-0 pr-0 pb-0 pl-2",
              size === "md" && "pt-0.5 pr-0.5 pb-0.5 pl-2",
              size === "lg" && "pt-1.5 pr-1.5 pb-1.5 pl-2",
            )}
          >
            <Button
              type="button"
              size="sm"
              className={cn(
                "shrink-0",
                size === "sm" && "rounded-l-none border-t-0 border-r-0 border-b-0",
                size === "md" && "rounded-[6px]",
              )}
              disabled={disabled}
            >
              <Send className="h-icon-16 w-icon-16" aria-hidden />
              Send
            </Button>
          </InputSuffixAddon>
        );
      case "value-label":
        return (
          <InputSuffixAddon>
            <InputAddonText>{fieldType === "number" ? "ms" : fieldType === "search" ? "in models" : "kg"}</InputAddonText>
          </InputSuffixAddon>
        );
      case "dropdown":
        return (
          <InputSuffixAddon className="min-w-0 gap-1 pr-2 pl-2">
            <Select value={suffixSelect} onValueChange={setSuffixSelect}>
              <SelectTrigger
                className={cn(compactSelectTrigger, size === "sm" && "h-control-sm", size === "lg" && "h-control-lg")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copy">Copy</SelectItem>
                <SelectItem value="add">Add</SelectItem>
                <SelectItem value="invite">Invite</SelectItem>
              </SelectContent>
            </Select>
          </InputSuffixAddon>
        );
      case "action-menu":
        return (
          <InputSuffixAddon
            className={cn(
              "items-center gap-0 border-l-0 px-0",
              size === "sm" && "pt-0 pr-0 pb-0 pl-2",
              size === "md" && "pt-0.5 pr-0.5 pb-0.5 pl-2",
              size === "lg" && "pt-1.5 pr-1.5 pb-1.5 pl-2",
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="More actions"
                  disabled={disabled}
                  className={cn(
                    "shrink-0",
                    size === "sm" && "rounded-l-none border-t-0 border-r-0 border-b-0",
                    size === "md" && "rounded-[6px]",
                  )}
                >
                  <MoreHorizontal className="h-icon-16 w-icon-16" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Add</DropdownMenuItem>
                <DropdownMenuItem>Invite</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputSuffixAddon>
        );
      default:
        return null;
    }
  }, [suffix, fieldType, suffixSelect, value, disabled, size]);

  const labelText = "Field label";

  const rootClassName = cn(
    simulatedShellClass,
    invalid && "border-destructive ring-destructive focus-within:border-destructive focus-within:ring-destructive",
    visualState === "success" && !invalid && "border-success/30",
  );

  const preview = (
    <div className="w-full max-w-xl space-y-1">
      {labelHelp !== "no-label" && (
        <Label
          htmlFor={`${id}-control`}
          className={cn(disabled && "text-foreground/50", showErrorMsg && invalid && "text-destructive")}
        >
          {labelText}
        </Label>
      )}

      <InputRoot
        invalid={invalid}
        success={success && !invalid}
        size={size}
        fieldDisabled={disabled}
        fieldReadOnly={readOnly}
        className={rootClassName}
      >
        {prefixNode}

        <InputSegment>
          {leadDecoration}
          <InputControl
            ref={inputRef}
            id={`${id}-control`}
            type={inputType}
            inputMode={
              phoneStylePrefix
                ? "tel"
                : fieldType === "number"
                  ? "numeric"
                  : fieldType === "email"
                    ? "email"
                    : undefined
            }
            autoComplete={fieldType === "password" ? "current-password" : undefined}
            disabled={disabled}
            readOnly={readOnly || showLoader}
            aria-invalid={invalid || undefined}
            aria-busy={showLoader || undefined}
            placeholder="…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {showLoader && <InputLoadingIndicator />}
          {showClear && (
            <InputClearButton aria-label="Clear" onClick={() => setValue("")} />
          )}
          {trailDecoration}
          {passwordToggleInSegment && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="-mr-1 shrink-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={disabled}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff className="h-icon-16 w-icon-16" /> : <Eye className="h-icon-16 w-icon-16" />}
            </Button>
          )}
        </InputSegment>

        {suffixNode}
      </InputRoot>

      {showHelper && labelHelp === "helper" && (
        <p className="text-caption text-foreground/75">Helper text explains what belongs in this field.</p>
      )}
      {showErrorMsg && (
        <p className="text-caption text-destructive">
          {visualState === "error" ? "This field has an error." : "Error message under the field."}
        </p>
      )}
    </div>
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="86/100"
      scalabilityScoreNote={
        <p>
          Input is a full stack: Radix Label (CVA), standalone Input, modular InputRoot with size variants and
          invalid/success/disabled/readonly data attributes, segmented addons, and InputField composition. Control heights,
          borders, rings, and typography map to design tokens; success and error paths use fractional ring/border utilities.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Label: text-label, peer-disabled opacity token</li>
          <li>Input (standalone): h-control-md, border-input, bg-background, text-body-sm, ring-ring, disabled bg-muted, aria-invalid destructive</li>
          <li>InputRoot: shell border/hover/focus-within ring, data-invalid and data-success states, h-control-sm/md/lg + text scale per size</li>
          <li>InputPrefixAddon / InputSuffixAddon: border-border dividers, px-3, text-body-sm, icon h-icon-16</li>
          <li>InputSegment: flex min-w-0 flex-1, px-3; InputControl: transparent field, placeholder opacity</li>
          <li>InputLeadIcon / InputTrailIcon: text-foreground/50; helper/error lines: text-caption</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("buttons")}>
              Button
            </Link>
            {" — "}
            <span className="text-muted-foreground">InputClearButton wraps the ghost icon-sm control.</span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>InputRoot success styling: border-success/30, focus ring success/40 — fractional utilities</li>
          <li>Lucide Loader2 and X in InputLoadingIndicator and InputClearButton</li>
          <li>InputField: layout spacing and optional label/error/helper stack — additional surface beyond atoms</li>
          <li>Lab preview: Select, DropdownMenu, and custom classNames — not part of input.tsx defaults</li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to={postMvpPath("/overview")}>
            <ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Input</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Use the five filters to configure the field. Only one preview is shown. Optional row controls label, helper,
          error copy, and size.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Configure preview</CardTitle>
          <CardDescription>
            Row 1 — Prefix, Field type, Decoration, Suffix, State. Row 2 — Label / help, Size.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <p className="text-caption text-foreground/75">1 · Prefix (leading addon)</p>
              <Select value={prefix} onValueChange={(v) => setPrefix(v as PrefixOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="icon">Icon</SelectItem>
                  <SelectItem value="text">Text (static)</SelectItem>
                  <SelectItem value="select">Dropdown / Select</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <p className="text-caption text-foreground/75">2 · Input (core) — type</p>
              <Select value={fieldType} onValueChange={(v) => setFieldType(v as FieldTypeOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <p className="text-caption text-foreground/75">3 · Input (core) — decoration</p>
              <Select value={decoration} onValueChange={(v) => setDecoration(v as DecorationOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {decorationOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <p className="text-caption text-foreground/75">4 · Suffix (trailing addon)</p>
              <Select value={suffix} onValueChange={(v) => setSuffix(v as SuffixOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="icon-button">Icon button</SelectItem>
                  <SelectItem value="text-button">Text button</SelectItem>
                  <SelectItem value="primary-button">Button (primary)</SelectItem>
                  <SelectItem value="value-label">Value label</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                  <SelectItem value="action-menu">Action menu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <p className="text-caption text-foreground/75">5 · State</p>
              <Select value={visualState} onValueChange={(v) => setVisualState(v as VisualStateOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="hover">Hover (simulated)</SelectItem>
                  <SelectItem value="focus">Focus</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="readonly">Read-only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-caption text-foreground/75">Optional · Label / help</p>
              <Select value={labelHelp} onValueChange={(v) => setLabelHelp(v as LabelHelpOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-label">No label</SelectItem>
                  <SelectItem value="label">Label</SelectItem>
                  <SelectItem value="helper">Label + helper text</SelectItem>
                  <SelectItem value="error-message">Label + error message</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <p className="text-caption text-foreground/75">Optional · Size</p>
              <Select value={size} onValueChange={(v) => setSize(v as InputRootSize)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preview (single field)</CardTitle>
          <CardDescription>
            Phone numbers: use <span className="text-foreground">Text</span> core type with prefix (country code select or
            static text). Multiline copy uses the separate Textarea component. Prefix also covers currency and protocol.
            Suffix covers actions, units, menus, and status.
          </CardDescription>
        </CardHeader>
        <CardContent>{preview}</CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentInputLab;
