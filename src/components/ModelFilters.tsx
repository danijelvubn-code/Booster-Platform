import { useState } from "react";
import { models } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Extract unique values from models
const allDomains = [...new Set(models.map((m) => m.domain))];
const tokPerSecRanges = [
  { label: "< 50 tok/s", min: 0, max: 50 },
  { label: "50–100 tok/s", min: 50, max: 100 },
  { label: "100+ tok/s", min: 100, max: Infinity },
];
const allSustainability = ["A", "B", "C", "D", "E"];
const allHostingTypes = ["Booster Powered"];
const contextLengthOptions = [
  { label: "32k+", value: 32000 },
  { label: "128k+", value: 128000 },
  { label: "200k+", value: 200000 },
  { label: "1M+", value: 1000000 },
];

// Build capability → sub-capability map
const capabilityMap: Record<string, string[]> = {};
models.forEach((m) => {
  m.capabilities.forEach((cap) => {
    if (!capabilityMap[cap.name]) capabilityMap[cap.name] = [];
    cap.subs.forEach((sub) => {
      if (!capabilityMap[cap.name].includes(sub.name)) {
        capabilityMap[cap.name].push(sub.name);
      }
    });
  });
});

const allCapabilities = Object.keys(capabilityMap).sort();

export interface ModelFilterState {
  domains: string[];
  latencyBands: string[];
  sustainability: string[];
  capabilities: string[];
  subCapabilities: string[];
  minCapScore: number;
  costRange: [number, number];
  hosting: string[];
  minContextLength: number;
  outputCostRange: [number, number];
}

export const defaultFilters: ModelFilterState = {
  domains: [],
  latencyBands: [],
  sustainability: [],
  capabilities: [],
  subCapabilities: [],
  minCapScore: 0,
  costRange: [0, 10],
  hosting: [],
  minContextLength: 0,
  outputCostRange: [0, 20],
};

export const isFiltersActive = (filters: ModelFilterState) => {
  return (
    filters.domains.length > 0 ||
    filters.latencyBands.length > 0 ||
    filters.sustainability.length > 0 ||
    filters.capabilities.length > 0 ||
    filters.subCapabilities.length > 0 ||
    filters.minCapScore > 0 ||
    filters.costRange[0] > 0 ||
    filters.costRange[1] < 10 ||
    filters.hosting.length > 0 ||
    filters.minContextLength > 0 ||
    filters.outputCostRange[0] > 0 ||
    filters.outputCostRange[1] < 20
  );
};

export const applyModelFilters = (
  modelList: typeof models,
  filters: ModelFilterState
) => {
  return modelList.filter((m) => {
    // Domain
    if (filters.domains.length > 0 && !filters.domains.includes(m.domain))
      return false;

    // Tokens per second
    if (filters.latencyBands.length > 0) {
      const matchesAny = filters.latencyBands.some((label) => {
        const range = tokPerSecRanges.find((r) => r.label === label);
        return range && m.tokensPerSecond >= range.min && m.tokensPerSecond < range.max;
      });
      if (!matchesAny) return false;
    }

    // Sustainability
    if (
      filters.sustainability.length > 0 &&
      !filters.sustainability.includes(m.sustainability)
    )
      return false;

    // Cost range (use input cost as baseline for filtering)
    if (
      m.inputCostPer1M < filters.costRange[0] ||
      m.inputCostPer1M > filters.costRange[1]
    )
      return false;

    // Capabilities - model must have at least one of the selected capabilities
    if (filters.capabilities.length > 0) {
      const modelCapNames = m.capabilities.map((c) => c.name);
      if (!filters.capabilities.some((c) => modelCapNames.includes(c)))
        return false;
    }

    // Sub-capabilities - model must have at least one of the selected sub-capabilities
    if (filters.subCapabilities.length > 0) {
      const modelSubNames = m.capabilities.flatMap((c) =>
        c.subs.map((s) => s.name)
      );
      if (!filters.subCapabilities.some((s) => modelSubNames.includes(s)))
        return false;
    }

    // Min capability score - at least one capability must meet the threshold
    if (filters.minCapScore > 0) {
      const hasQualifying = m.capabilities.some((c) => {
        // If specific capabilities are selected, only check those
        if (
          filters.capabilities.length > 0 &&
          !filters.capabilities.includes(c.name)
        )
          return false;
        return c.score >= filters.minCapScore;
      });
      if (!hasQualifying) return false;
    }

    // Hosting
    if (filters.hosting.length > 0 && !filters.hosting.includes(m.hosting))
      return false;

    // Context length
    if (filters.minContextLength > 0 && m.contextLength < filters.minContextLength)
      return false;

    // Output cost range
    if (
      m.outputCostPer1M < filters.outputCostRange[0] ||
      m.outputCostPer1M > filters.outputCostRange[1]
    )
      return false;

    return true;
  });
};

interface ModelFiltersProps {
  filters: ModelFilterState;
  onChange: (filters: ModelFilterState) => void;
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold hover:text-primary transition-colors">
        {title}
        {open ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const CheckboxItem = ({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center gap-2">
    <Checkbox
      id={label}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="h-3.5 w-3.5"
    />
    <Label
      htmlFor={label}
      className="text-xs cursor-pointer font-normal leading-none"
    >
      {label}
    </Label>
  </div>
);

const toggleItem = (arr: string[], item: string) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

const ModelFilters = ({ filters, onChange }: ModelFiltersProps) => {
  const activeCount =
    filters.domains.length +
    filters.latencyBands.length +
    filters.sustainability.length +
    filters.capabilities.length +
    filters.subCapabilities.length +
    filters.hosting.length +
    (filters.minCapScore > 0 ? 1 : 0) +
    (filters.costRange[0] > 0 || filters.costRange[1] < 10 ? 1 : 0) +
    (filters.minContextLength > 0 ? 1 : 0) +
    (filters.outputCostRange[0] > 0 || filters.outputCostRange[1] < 20 ? 1 : 0);

  // Get relevant sub-capabilities based on selected capabilities
  const relevantSubs =
    filters.capabilities.length > 0
      ? filters.capabilities.flatMap((c) => capabilityMap[c] || [])
      : Object.values(capabilityMap).flat();
  const uniqueSubs = [...new Set(relevantSubs)].sort();

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Filters</span>
          {activeCount > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs px-2"
            onClick={() => onChange({ ...defaultFilters })}
          >
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-1 pr-3">
          {/* Hosting filter removed — all models are Booster Powered */}


          {/* Domain */}
          <FilterSection title="Domain">
            {allDomains.map((d) => (
              <CheckboxItem
                key={d}
                label={d}
                checked={filters.domains.includes(d)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    domains: toggleItem(filters.domains, d),
                  })
                }
              />
            ))}
          </FilterSection>

          <Separator />

          {/* Capabilities */}
          <FilterSection title="Capabilities">
            {allCapabilities.map((c) => (
              <CheckboxItem
                key={c}
                label={c}
                checked={filters.capabilities.includes(c)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    capabilities: toggleItem(filters.capabilities, c),
                    // Clear sub-capabilities that are no longer relevant
                    subCapabilities: filters.subCapabilities.filter((s) => {
                      const newCaps = toggleItem(filters.capabilities, c);
                      if (newCaps.length === 0) return true;
                      return newCaps.some(
                        (cap) => capabilityMap[cap]?.includes(s)
                      );
                    }),
                  })
                }
              />
            ))}
          </FilterSection>

          <Separator />

          {/* Sub-Capabilities */}
          <FilterSection title="Sub-Capabilities" defaultOpen={false}>
            {uniqueSubs.map((s) => (
              <CheckboxItem
                key={s}
                label={s}
                checked={filters.subCapabilities.includes(s)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    subCapabilities: toggleItem(filters.subCapabilities, s),
                  })
                }
              />
            ))}
          </FilterSection>

          <Separator />

          {/* Min Capability Score */}
          <FilterSection title="Min Capability Score">
            <div className="space-y-3 pt-1">
              <Slider
                value={[filters.minCapScore]}
                onValueChange={([v]) =>
                  onChange({ ...filters, minCapScore: v })
                }
                min={0}
                max={100}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Any</span>
                <span className="font-semibold text-foreground">
                  {filters.minCapScore > 0 ? `≥ ${filters.minCapScore}` : "Any"}
                </span>
                <span>100</span>
              </div>
            </div>
          </FilterSection>

          <Separator />

          {/* Cost Range */}
          <FilterSection title="Cost per 1M Tokens">
            <div className="space-y-3 pt-1">
              <Slider
                value={[filters.costRange[0], filters.costRange[1]]}
                onValueChange={([min, max]) =>
                  onChange({
                    ...filters,
                    costRange: [min, max],
                  })
                }
                min={0}
                max={10}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>€{filters.costRange[0].toFixed(1)}</span>
                <span>€{filters.costRange[1].toFixed(1)}</span>
              </div>
            </div>
          </FilterSection>

          <Separator />

          {/* Output Cost Range */}
          <FilterSection title="Output Cost per 1M Tokens" defaultOpen={false}>
            <div className="space-y-3 pt-1">
              <Slider
                value={[filters.outputCostRange[0], filters.outputCostRange[1]]}
                onValueChange={([min, max]) =>
                  onChange({
                    ...filters,
                    outputCostRange: [min, max],
                  })
                }
                min={0}
                max={20}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>€{filters.outputCostRange[0].toFixed(1)}</span>
                <span>€{filters.outputCostRange[1].toFixed(1)}</span>
              </div>
            </div>
          </FilterSection>

          <Separator />

          {/* Context Length */}
          <FilterSection title="Min Context Length" defaultOpen={false}>
            {contextLengthOptions.map((opt) => (
              <CheckboxItem
                key={opt.value}
                label={opt.label}
                checked={filters.minContextLength === opt.value}
                onCheckedChange={(checked) =>
                  onChange({
                    ...filters,
                    minContextLength: checked ? opt.value : 0,
                  })
                }
              />
            ))}
          </FilterSection>

          <Separator />

          {/* Speed (tok/s) */}
          <FilterSection title="Speed (tok/s)">
            {tokPerSecRanges.map((r) => (
              <CheckboxItem
                key={r.label}
                label={r.label}
                checked={filters.latencyBands.includes(r.label)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    latencyBands: toggleItem(filters.latencyBands, r.label),
                  })
                }
              />
            ))}
          </FilterSection>

          <Separator />

          {/* Sustainability */}
          <FilterSection title="Sustainability Rating">
            {allSustainability.map((s) => (
              <CheckboxItem
                key={s}
                label={s}
                checked={filters.sustainability.includes(s)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    sustainability: toggleItem(filters.sustainability, s),
                  })
                }
              />
            ))}
          </FilterSection>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModelFilters;
