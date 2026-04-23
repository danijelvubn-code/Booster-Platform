import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import { cn } from "@/lib/utils";

type LineChartDatum = Record<string, unknown>;

type LineChartProps<TDatum extends LineChartDatum> = {
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

function DefaultLineChartTooltip({
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-caption text-muted-foreground">{formattedLabel}</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-info" aria-hidden="true" />
            <p className="text-body-sm-strong text-foreground">{formattedValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const LineChart = <TDatum extends LineChartDatum>({
  data,
  xKey,
  yKey,
  className,
  valueFormatter,
  labelFormatter,
}: LineChartProps<TDatum>) => {
  return (
    <div className={cn("w-full h-chart-md", className)}>
      <ResponsiveContainer>
        <RechartsLineChart data={data}>
          <CartesianGrid stroke="oklch(var(--border) / var(--alpha-40))" />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={<AxisTick />}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={<AxisTick />}
          />
          <Tooltip
            cursor={{ stroke: "oklch(var(--border) / var(--alpha-40))" }}
            content={({ active, payload, label }) => (
              <DefaultLineChartTooltip
                active={active}
                payload={payload}
                label={label}
                valueFormatter={valueFormatter}
                labelFormatter={labelFormatter}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="oklch(var(--info) / 1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "oklch(var(--info) / 1)" }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { LineChart };

