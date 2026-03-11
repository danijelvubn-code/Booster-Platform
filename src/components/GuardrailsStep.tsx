import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type GuardrailAction = "log" | "block" | "mask" | "rewrite";

interface GuardrailConfig {
  enabled: boolean;
  action: GuardrailAction;
}

interface PrivacyEntity {
  id: string;
  label: string;
  checked: boolean;
}

export interface GuardrailsState {
  toxicity: GuardrailConfig;
  promptInjection: GuardrailConfig;
  gibberish: GuardrailConfig;
  language: GuardrailConfig;
  invisibleText: GuardrailConfig;
  privacy: GuardrailConfig;
  secrets: GuardrailConfig;
  privacyEntities: PrivacyEntity[];
}

export const defaultGuardrailsState: GuardrailsState = {
  toxicity: { enabled: false, action: "log" },
  promptInjection: { enabled: false, action: "log" },
  gibberish: { enabled: false, action: "log" },
  language: { enabled: false, action: "log" },
  invisibleText: { enabled: false, action: "log" },
  privacy: { enabled: false, action: "mask" },
  secrets: { enabled: false, action: "log" },
  privacyEntities: [
    { id: "email", label: "EMAIL ADDRESS", checked: true },
    { id: "phone", label: "PHONE NUMBER", checked: false },
    { id: "location", label: "LOCATION", checked: false },
    { id: "iban", label: "IBAN CODE", checked: false },
    { id: "person", label: "PERSON", checked: false },
    { id: "credit_card", label: "CREDIT CARD", checked: false },
    { id: "ip_address", label: "IP ADDRESS", checked: false },
  ],
};

interface GuardrailsStepProps {
  state: GuardrailsState;
  onChange: (state: GuardrailsState) => void;
}

type ActionOption = { value: GuardrailAction; label: string };

const GuardrailRow = ({
  label,
  config,
  onChange,
  tooltip,
  actions,
  children,
}: {
  label: string;
  config: GuardrailConfig;
  onChange: (c: GuardrailConfig) => void;
  tooltip: string;
  actions: ActionOption[];
  children?: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 min-w-[160px]">
        <span className="text-sm font-medium">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-[260px] text-xs">
              <p>{tooltip}</p>
              <p className="mt-1 text-muted-foreground">Adds ~10–50ms latency overhead.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-4">
        <Switch
          checked={config.enabled}
          onCheckedChange={(v) => onChange({ ...config, enabled: v })}
        />
        <Select
          value={config.action}
          onValueChange={(v) => onChange({ ...config, action: v as GuardrailAction })}
          disabled={!config.enabled}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {actions.map((a) => (
              <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    {config.enabled && children && <div className="pl-1">{children}</div>}
  </div>
);

const defaultActions: ActionOption[] = [
  { value: "log", label: "Log" },
  { value: "block", label: "Block" },
];

const toxicityActions: ActionOption[] = [
  { value: "log", label: "Log" },
  { value: "block", label: "Block" },
  { value: "rewrite", label: "Rewrite" },
];

const privacyActions: ActionOption[] = [
  { value: "log", label: "Log" },
  { value: "mask", label: "Mask" },
];

const GuardrailsStep = ({ state, onChange }: GuardrailsStepProps) => {
  const update = <K extends keyof GuardrailsState>(key: K, value: GuardrailsState[K]) => {
    onChange({ ...state, [key]: value });
  };

  const togglePrivacyEntity = (id: string) => {
    update(
      "privacyEntities",
      state.privacyEntities.map((e) => (e.id === id ? { ...e, checked: !e.checked } : e))
    );
  };

  return (
    <div className="space-y-1">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Safety & Guardrails</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure safety, content filtering, adversarial prompt protection, and privacy controls for this endpoint.
        </p>
      </div>

      <GuardrailRow
        label="Toxicity"
        config={state.toxicity}
        onChange={(c) => update("toxicity", c)}
        tooltip="Detect and act on toxic, harmful, or offensive content. Log records the event, Block rejects the request, Rewrite sanitizes content before model invocation."
        actions={toxicityActions}
      />
      <Separator />
      <GuardrailRow
        label="Prompt Injection"
        config={state.promptInjection}
        onChange={(c) => update("promptInjection", c)}
        tooltip="Detect malicious system prompt override attempts. Block prevents model execution."
        actions={defaultActions}
      />
      <Separator />
      <GuardrailRow
        label="Gibberish"
        config={state.gibberish}
        onChange={(c) => update("gibberish", c)}
        tooltip="Prevent nonsensical or malformed inputs from reaching the model. Helps reduce abuse and cost waste."
        actions={defaultActions}
      />
      <Separator />
      <GuardrailRow
        label="Language"
        config={state.language}
        onChange={(c) => update("language", c)}
        tooltip="Detect unsupported languages. Useful for regulated or region-specific deployments."
        actions={defaultActions}
      />
      <Separator />
      <GuardrailRow
        label="Invisible Text"
        config={state.invisibleText}
        onChange={(c) => update("invisibleText", c)}
        tooltip="Detect hidden Unicode characters. Prevents adversarial attacks using zero-width characters."
        actions={defaultActions}
      />
      <Separator />
      <GuardrailRow
        label="Secrets"
        config={state.secrets}
        onChange={(c) => update("secrets", c)}
        tooltip="Detect API keys, tokens, and credentials in input. Protects against data leakage."
        actions={defaultActions}
      />

      <Separator className="my-4" />

      <div className="mb-3">
        <h4 className="text-sm font-semibold">Privacy & Data Protection</h4>
      </div>
      <GuardrailRow
        label="Privacy management"
        config={state.privacy}
        onChange={(c) => update("privacy", c)}
        tooltip="Detect and handle personally identifiable information (PII). Log records detection, Mask replaces sensitive data before model invocation."
        actions={privacyActions}
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-1">
          {state.privacyEntities.map((entity) => (
            <div key={entity.id} className="flex items-center gap-2">
              <Checkbox
                id={`guardrail-${entity.id}`}
                checked={entity.checked}
                onCheckedChange={() => togglePrivacyEntity(entity.id)}
              />
              <Label
                htmlFor={`guardrail-${entity.id}`}
                className="text-xs font-medium cursor-pointer"
              >
                {entity.label}
              </Label>
            </div>
          ))}
        </div>
      </GuardrailRow>

      <Separator className="my-4" />

      <div className="mb-3">
        <h4 className="text-sm font-semibold">Observability & Debugging</h4>
      </div>
      <div className="rounded-md border border-border p-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Advanced Debugging</span>
          </div>
          <Switch
            checked={state.advancedDebugging}
            onCheckedChange={(v) => update("advancedDebugging", v)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          When enabled, all prompts and model responses will be visible on the Booster platform for debugging and inspection purposes.
        </p>
        {state.advancedDebugging && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              By enabling this, you consent to Booster storing and displaying full prompt and response content for this endpoint. This data is used solely for debugging and is never shared with third parties or used for training.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-md border border-border bg-muted/50 p-3 flex items-start gap-2 mt-4">
        <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Guardrails may slightly impact latency depending on selected performance profile.
        </p>
      </div>
    </div>
  );
};

export const GuardrailsReviewSection = ({ state }: { state: GuardrailsState }) => {
  const items = [
    { label: "Toxicity", c: state.toxicity },
    { label: "Prompt Injection", c: state.promptInjection },
    { label: "Gibberish", c: state.gibberish },
    { label: "Language", c: state.language },
    { label: "Invisible Text", c: state.invisibleText },
    { label: "Secrets", c: state.secrets },
    { label: "Privacy", c: state.privacy },
  ];

  return (
    <div className="space-y-2">
      {items.map(({ label, c }) => (
        <div key={label}>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            {c.enabled ? (
              <Badge variant="secondary" className="text-xs capitalize">{c.action}</Badge>
            ) : (
              <Badge variant="outline" className="text-xs text-muted-foreground">Off</Badge>
            )}
          </div>
          {label === "Privacy" && state.privacy.enabled && (
            <div className="text-sm">
              <span className="text-muted-foreground pl-4">
                └ Entities: {state.privacyEntities.filter((e) => e.checked).map((e) => e.label).join(", ") || "None"}
              </span>
            </div>
          )}
        </div>
      ))}
      <Separator />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Advanced Debugging</span>
        <Badge variant={state.advancedDebugging ? "secondary" : "outline"} className="text-xs">
          {state.advancedDebugging ? "Enabled" : "Off"}
        </Badge>
      </div>
    </div>
  );
};

export const countEnabledGuardrails = (state: GuardrailsState): number => {
  const guards = [state.toxicity, state.promptInjection, state.gibberish, state.language, state.invisibleText, state.secrets, state.privacy];
  return guards.filter((g) => g.enabled).length;
};

export default GuardrailsStep;
