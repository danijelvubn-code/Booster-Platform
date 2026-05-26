import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { B as Button } from "./button-DnRCyT-6.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
import { aC as LoaderCircle, X } from "../_libs/lucide-react.mjs";
const labelVariants = cva(
  "text-label text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--disabled-opacity)]"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = Root.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-control-md w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm text-foreground ring-offset-background transition-colors ease-standard file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground placeholder:text-foreground/50 enabled:hover:border-ring read-only:hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground/50 read-only:cursor-default read-only:bg-muted",
        className
      ),
      ref,
      ...props
    }
  )
);
Input.displayName = "Input";
const inputRootShellClass = cn(
  "group/input flex w-full items-stretch rounded-md border border-input bg-background text-foreground ring-offset-background transition-colors ease-standard",
  "hover:border-ring data-[field-disabled=true]:hover:border-input data-[field-readonly=true]:hover:border-input focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  "data-[invalid=true]:border-destructive data-[invalid=true]:focus-within:border-destructive data-[invalid=true]:focus-within:ring-destructive",
  "data-[success=true]:border-success/30 data-[success=true]:focus-within:border-success data-[success=true]:focus-within:ring-success/40",
  "data-[field-readonly=true]:focus-within:ring-0 data-[field-readonly=true]:focus-within:ring-offset-0 data-[field-readonly=true]:focus-within:border-input",
  "data-[field-readonly=true]:data-[invalid=true]:focus-within:border-destructive",
  "data-[field-readonly=true]:data-[success=true]:focus-within:border-success/30"
);
const inputRootSizeClass = {
  sm: "h-control-sm text-caption [&_input]:text-caption [&_textarea]:text-caption",
  md: "h-control-md text-body-sm [&_input]:text-body-sm [&_textarea]:text-body-sm",
  lg: "h-control-lg text-body-sm [&_input]:text-body-sm [&_textarea]:text-body-sm"
};
const InputRoot = reactExports.forwardRef(
  ({
    className,
    invalid,
    success,
    fieldDisabled,
    fieldReadOnly,
    size = "md",
    ...props
  }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-invalid": invalid ? "true" : void 0,
      "data-success": success ? "true" : void 0,
      "data-field-disabled": fieldDisabled ? "true" : void 0,
      "data-field-readonly": fieldReadOnly ? "true" : void 0,
      className: cn(inputRootShellClass, inputRootSizeClass[size], className),
      ...props
    }
  )
);
InputRoot.displayName = "InputRoot";
const InputPrefixAddon = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "flex shrink-0 items-center gap-2 self-stretch border-r border-border px-3 text-body-sm text-foreground/75 [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
InputPrefixAddon.displayName = "InputPrefixAddon";
const InputSegment = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "flex min-h-0 min-w-0 flex-1 items-center gap-2 self-stretch px-3",
      className
    ),
    ...props
  }
));
InputSegment.displayName = "InputSegment";
const InputLeadIcon = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "span",
  {
    className: cn(
      "inline-flex shrink-0 text-foreground/50 [&_svg]:h-icon-16 [&_svg]:w-icon-16",
      className
    ),
    ...props
  }
);
InputLeadIcon.displayName = "InputLeadIcon";
const InputTrailIcon = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "span",
  {
    className: cn(
      "inline-flex shrink-0 text-foreground/50 [&_svg]:h-icon-16 [&_svg]:w-icon-16",
      className
    ),
    ...props
  }
);
InputTrailIcon.displayName = "InputTrailIcon";
const InputLoadingIndicator = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "span",
  {
    className: cn("inline-flex shrink-0 text-foreground/50", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-icon-16 w-icon-16 animate-spin", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Loading" })
    ]
  }
);
InputLoadingIndicator.displayName = "InputLoadingIndicator";
const InputControl = reactExports.forwardRef(({ className, disabled, readOnly, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "input",
  {
    ref,
    disabled,
    readOnly,
    className: cn(
      "min-w-0 flex-1 bg-transparent py-2 text-body-sm text-foreground outline-none placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:text-foreground/50 read-only:cursor-default read-only:focus-visible:outline-none",
      className
    ),
    ...props
  }
));
InputControl.displayName = "InputControl";
const InputClearButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Button,
  {
    ref,
    type: "button",
    variant: "ghost",
    size: "icon-sm",
    className: cn("-mr-1 shrink-0", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-icon-16 w-icon-16", "aria-hidden": "true" })
  }
));
InputClearButton.displayName = "InputClearButton";
const InputSuffixAddon = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "flex shrink-0 items-center gap-2 self-stretch border-l border-border px-3 text-body-sm text-foreground/75 [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
InputSuffixAddon.displayName = "InputSuffixAddon";
function InputAddonText({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "whitespace-nowrap text-body-sm text-foreground/75",
        className
      ),
      ...props
    }
  );
}
InputAddonText.displayName = "InputAddonText";
const InputField = reactExports.forwardRef(
  ({
    id: idProp,
    label,
    required,
    helperText,
    errorMessage,
    prefixIcon,
    suffixIcon,
    leadingIcon,
    trailingIcon,
    prefixAddon,
    suffixAddon,
    prefixValue,
    suffixValue,
    action,
    loading,
    onClear,
    clearLabel = "Clear",
    containerClassName,
    rootClassName,
    inputClassName,
    className,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    "aria-invalid": ariaInvalid,
    ...props
  }, ref) => {
    const autoId = reactExports.useId();
    const id = idProp ?? `input-${autoId}`;
    const isInvalid = ariaInvalid === true || ariaInvalid === "true" || !!errorMessage;
    const isControlled = value !== void 0;
    const [uncontrolledValue, setUncontrolledValue] = reactExports.useState(() => {
      if (defaultValue === void 0 || defaultValue === null) return "";
      return String(defaultValue);
    });
    const localRef = reactExports.useRef(null);
    reactExports.useImperativeHandle(ref, () => localRef.current);
    const valueString = isControlled ? String(value ?? "") : uncontrolledValue;
    const showClear = !!onClear && valueString.length > 0 && !disabled && !readOnly && !loading;
    const lead = leadingIcon ?? prefixIcon;
    const trail = trailingIcon ?? suffixIcon;
    const leftAddon = prefixAddon ?? (prefixValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputAddonText, { children: prefixValue }) : null);
    const rightAddon = suffixAddon ?? (suffixValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputAddonText, { children: suffixValue }) : null) ?? action ?? null;
    const handleChange = (e) => {
      if (!isControlled) setUncontrolledValue(e.target.value);
      onChange?.(e);
    };
    const handleClear = () => {
      onClear?.();
      if (!isControlled && localRef.current) {
        localRef.current.value = "";
        setUncontrolledValue("");
      }
      localRef.current?.focus();
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full space-y-1", className), children: [
      label !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: id,
          className: cn(
            "inline-flex items-center gap-1",
            disabled && "text-foreground/50"
          ),
          children: [
            label,
            required && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-destructive", children: "*" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "(required)" })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        InputRoot,
        {
          invalid: isInvalid,
          fieldDisabled: disabled,
          fieldReadOnly: readOnly,
          className: cn(
            disabled && "cursor-not-allowed bg-muted",
            readOnly && "bg-muted",
            containerClassName,
            rootClassName
          ),
          children: [
            leftAddon && /* @__PURE__ */ jsxRuntimeExports.jsx(InputPrefixAddon, { children: leftAddon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InputSegment, { children: [
              lead && /* @__PURE__ */ jsxRuntimeExports.jsx(InputLeadIcon, { children: lead }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputControl,
                {
                  id,
                  ref: (node) => {
                    localRef.current = node;
                  },
                  className: inputClassName,
                  disabled,
                  readOnly,
                  "aria-invalid": isInvalid || void 0,
                  value: isControlled ? value : void 0,
                  defaultValue: isControlled ? void 0 : defaultValue,
                  onChange: handleChange,
                  "aria-busy": loading || void 0,
                  ...props
                }
              ),
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(InputLoadingIndicator, {}),
              showClear && /* @__PURE__ */ jsxRuntimeExports.jsx(InputClearButton, { "aria-label": clearLabel, onClick: handleClear }),
              trail && /* @__PURE__ */ jsxRuntimeExports.jsx(InputTrailIcon, { children: trail })
            ] }),
            rightAddon && /* @__PURE__ */ jsxRuntimeExports.jsx(InputSuffixAddon, { children: rightAddon })
          ]
        }
      ),
      isInvalid && errorMessage ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-destructive", children: errorMessage }) : helperText ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-foreground/75", children: helperText }) : null
    ] });
  }
);
InputField.displayName = "InputField";
export {
  Input as I,
  Label as L,
  InputField as a,
  InputRoot as b,
  InputSegment as c,
  InputControl as d,
  InputSuffixAddon as e
};
