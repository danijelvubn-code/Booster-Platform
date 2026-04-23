import * as React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import { cn } from "@/lib/utils";

type AreaChartDatum = Record<string, unknown>;

type AreaChartProps<TDatum extends AreaChartDatum> = {
  data: TDatum[];
  xKey: keyof TDatum & string;
  yKey: keyof TDatum & string;
  className?: string;
  valueFormatter?: (value: number) => string;
  labelFormatter?: (label: unknown) => React.ReactNode;
};

type AxisTickProps = {
  x?: number;
  y?: number;
  payload?: { value?: unknown };
  textAnchor?: "start" | "middle" | "end";
  verticalAnchor?: "start" | "middle" | "end";
};

function AxisTick({ x = 0, y = 0, payload, textAnchor, verticalAnchor }: AxisTickProps) {
  const value = payload?.value;
  if (value === undefined || value === null) return null;

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline={verticalAnchor === "start" ? "hanging" : verticalAnchor === "end" ? "alphabetic" : "central"}
      className="text-caption fill-muted-foreground"
    >
      {String(value)}
    </text>
  );
}

function DefaultAreaChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
  labelFormatter,
}: {
  active?: boolean;
  payload?: TooltipProps<number, string>["payload"];
  label?: unknown;
  valueFormatter?: (value: number) => string;
  labelFormatter?: (label: unknown) => React.ReactNode;
}) {
  if (!active || !payload?.length) return null;

  const value = payload[0]?.value;
  const numericValue = typeof value === "number" ? value : Number(value);
  const formattedValue = Number.isFinite(numericValue)
    ? valueFormatter
      ? valueFormatter(numericValue)
      : numericValue.toLocaleString()
    : "—";

  const formattedLabel = labelFormatter ? labelFormatter(label) : (label as React.ReactNode);

  return (
    <div className="rounded-lg border border-border/30 bg-card text-card-foreground shadow-xs p-3">
      <p className="text-caption text-muted-foreground">{formattedLabel}</p>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-info" aria-hidden="true" />
        <p className="text-body-sm-strong text-foreground">{formattedValue}</p>
      </div>
    </div>
  );
}

const AreaChart = <TDatum extends AreaChartDatum>({
  data,
  xKey,
  yKey,
  className,
  valueFormatter,
  labelFormatter,
}: AreaChartProps<TDatum>) => {
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <div className={cn("w-full h-chart-md", className)}>
      <ResponsiveContainer>
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id={`area-fill-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(var(--info) / 1)" stopOpacity="var(--alpha-30)" />
              <stop offset="100%" stopColor="oklch(var(--info) / 1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="oklch(var(--border) / var(--alpha-40))" />
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={<AxisTick />} />
          <YAxis axisLine={false} tickLine={false} tick={<AxisTick />} />
          <Tooltip
            cursor={{ stroke: "oklch(var(--border) / var(--alpha-40))" }}
            content={({ active, payload, label }) => (
              <DefaultAreaChartTooltip
                active={active}
                payload={payload}
                label={label}
                valueFormatter={valueFormatter}
                labelFormatter={labelFormatter}
              />
            )}
          />
          <Area
            type="monotone"
            dataKey={yKey}
            stroke="oklch(var(--info) / 1)"
            strokeWidth={2}
            fill={`url(#area-fill-${gradientId})`}
            fillOpacity={1}
            activeDot={{ r: 4, fill: "oklch(var(--info) / 1)" }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export { AreaChart };

