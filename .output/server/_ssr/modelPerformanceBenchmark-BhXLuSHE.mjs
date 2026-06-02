import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as Sheet, a as SheetTrigger, A as AppSideSheetContent } from "./AppSideSheet-BDD1rKsl.mjs";
import { r as reactDomExports } from "../_libs/react-dom.mjs";
import { c as cn } from "./router-D-bBPX7r.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-KQ13lSDj.mjs";
import { B as Badge } from "./badge-bkIpVg5q.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DwSOW1EH.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { ar as Table2, as as ChartLine, a7 as FileText, $ as Clock, at as Gauge, D as Activity, Z as Zap, aq as Leaf, au as MessageCircleQuestionMark, av as ScrollText } from "../_libs/lucide-react.mjs";
const CHART_WIDTH = 1e3;
const LABEL_COLUMN_WIDTH = 156;
const Y_AXIS_WIDTH = 56;
const PLOT_LEFT = LABEL_COLUMN_WIDTH + Y_AXIS_WIDTH;
const PLOT_RIGHT = 28;
const PANEL_HEIGHT = 126;
const PANEL_VERTICAL_PADDING = 24;
const PANEL_SECTION_HEIGHT = PANEL_HEIGHT + PANEL_VERTICAL_PADDING * 2;
const PANEL_GAP = 0;
const TOP_BAND_HEIGHT = 0;
const X_AXIS_HEIGHT = 42;
const PLOT_TOP = TOP_BAND_HEIGHT;
const PANEL_COUNT = 3;
const TOTAL_HEIGHT = PLOT_TOP + PANEL_COUNT * PANEL_SECTION_HEIGHT + (PANEL_COUNT - 1) * PANEL_GAP + X_AXIS_HEIGHT;
function formatMetric$1(value, fractionDigits) {
  return value.toLocaleString(void 0, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });
}
function oklchWithAlpha(color, alpha) {
  return color.replace(/\)$/, ` / ${alpha})`);
}
const GRID_LINE_COLOR = oklchWithAlpha("oklch(var(--foreground))", 0.12);
const PANEL_FILL_COLOR = "white";
const SECTION_DIVIDER_COLOR = oklchWithAlpha("oklch(var(--border))", 0.7);
const TITLE_COLOR = "oklch(var(--foreground) / var(--foreground-alpha-primary))";
const PRIMARY_COLOR = "oklch(var(--primary))";
const INFO_COLOR = "oklch(var(--info))";
const SUCCESS_COLOR = "oklch(var(--success))";
const WARNING_COLOR = "oklch(var(--warning))";
const DESTRUCTIVE_COLOR = "oklch(var(--destructive))";
const WORKLOAD_CHART_LEGEND_ITEMS = [
  {
    id: "ttft",
    label: "Time to first token",
    color: PRIMARY_COLOR
  },
  {
    id: "e2e",
    label: "End-to-end latency",
    color: INFO_COLOR,
    dashed: true
  },
  {
    id: "streaming",
    label: "Streaming speed",
    color: SUCCESS_COLOR
  },
  {
    id: "energy",
    label: "Energy / req",
    color: WARNING_COLOR
  },
  {
    id: "carbon",
    label: "Carbon / req",
    color: DESTRUCTIVE_COLOR
  }
];
function WorkloadMeasurementsChartLegend({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-body-sm text-muted-foreground",
        className
      ),
      children: WORKLOAD_CHART_LEGEND_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "h-0 w-7 rounded-full border-t-2",
            style: {
              borderColor: item.color,
              borderTopStyle: item.dashed ? "dashed" : "solid"
            },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
      ] }, item.id))
    }
  );
}
function computeEndToEndLatencySeconds$1(measurement, workload) {
  return measurement.ttft_ms / 1e3 + workload.output_tokens.mean / measurement.tokens_per_user_per_s;
}
function buildLinePath(points) {
  if (points.length === 0) return "";
  return points.map(
    (point, index) => index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
  ).join(" ");
}
function buildYTicks(minValue, maxValue, plotTop, plotHeight, tickCount, formatTick) {
  const range = maxValue - minValue || maxValue || 1;
  return Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1);
    const value = maxValue - ratio * range;
    return {
      y: plotTop + plotHeight * ratio,
      label: formatTick(value)
    };
  });
}
function scalePoints(measurements, getValue, xPositions, plotTop, plotHeight, minValue, maxValue) {
  const range = maxValue - minValue || maxValue || 1;
  return measurements.map((measurement, index) => {
    const value = getValue(measurement);
    return {
      x: xPositions[index] ?? PLOT_LEFT,
      y: plotTop + plotHeight - (value - minValue) / range * plotHeight,
      concurrency: measurement.concurrency,
      value
    };
  });
}
function WorkloadMeasurementsChart({
  workload,
  className,
  embedded = false
}) {
  const svgRef = reactExports.useRef(null);
  const clipId = `workload-chart-${workload.id}`;
  const [hoveredConcurrency, setHoveredConcurrency] = reactExports.useState(null);
  const [tooltipPosition, setTooltipPosition] = reactExports.useState(null);
  const chart = reactExports.useMemo(() => {
    const plotWidth = CHART_WIDTH - PLOT_LEFT - PLOT_RIGHT;
    const xStep = workload.measurements.length > 1 ? plotWidth / (workload.measurements.length - 1) : plotWidth;
    const xPositions = workload.measurements.map(
      (_, index) => PLOT_LEFT + index * xStep
    );
    const xLabels = workload.measurements.map((measurement, index) => ({
      concurrency: measurement.concurrency,
      x: xPositions[index] ?? PLOT_LEFT
    }));
    const hitBandWidth = workload.measurements.length > 1 ? xStep * 0.88 : plotWidth;
    const plotBottom = PLOT_TOP + PANEL_COUNT * PANEL_SECTION_HEIGHT + (PANEL_COUNT - 1) * PANEL_GAP - PANEL_VERTICAL_PADDING;
    const panelLayouts = Array.from({ length: PANEL_COUNT }, (_, index) => ({
      sectionTop: PLOT_TOP + index * (PANEL_SECTION_HEIGHT + PANEL_GAP),
      sectionHeight: PANEL_SECTION_HEIGHT,
      plotTop: PLOT_TOP + index * (PANEL_SECTION_HEIGHT + PANEL_GAP) + PANEL_VERTICAL_PADDING,
      plotHeight: PANEL_HEIGHT
    }));
    const responsivenessLayout = panelLayouts[0];
    const ttftValues = workload.measurements.map(
      (measurement) => measurement.ttft_ms / 1e3
    );
    const e2eValues = workload.measurements.map(
      (measurement) => computeEndToEndLatencySeconds$1(measurement, workload)
    );
    const responsivenessMin = 0;
    const responsivenessMax = Math.max(...ttftValues, ...e2eValues, 0.1);
    const responsivenessTicks = buildYTicks(
      responsivenessMin,
      responsivenessMax,
      responsivenessLayout.plotTop,
      responsivenessLayout.plotHeight,
      4,
      (value) => formatMetric$1(value, value >= 10 ? 0 : 1)
    );
    const ttftPoints = scalePoints(
      workload.measurements,
      (measurement) => measurement.ttft_ms / 1e3,
      xPositions,
      responsivenessLayout.plotTop,
      responsivenessLayout.plotHeight,
      responsivenessMin,
      responsivenessMax
    );
    const e2ePoints = scalePoints(
      workload.measurements,
      (measurement) => computeEndToEndLatencySeconds$1(measurement, workload),
      xPositions,
      responsivenessLayout.plotTop,
      responsivenessLayout.plotHeight,
      responsivenessMin,
      responsivenessMax
    );
    const interactivityLayout = panelLayouts[1];
    const interactivityValues = workload.measurements.map(
      (measurement) => measurement.tokens_per_user_per_s
    );
    const interactivityMin = 0;
    const interactivityMax = Math.max(...interactivityValues, 1);
    const interactivityTicks = buildYTicks(
      interactivityMin,
      interactivityMax,
      interactivityLayout.plotTop,
      interactivityLayout.plotHeight,
      4,
      (value) => formatMetric$1(value, 0)
    );
    const interactivityPoints = scalePoints(
      workload.measurements,
      (measurement) => measurement.tokens_per_user_per_s,
      xPositions,
      interactivityLayout.plotTop,
      interactivityLayout.plotHeight,
      interactivityMin,
      interactivityMax
    );
    const efficiencyLayout = panelLayouts[2];
    const energyValues = workload.measurements.map(
      (measurement) => measurement.kjoules_per_req
    );
    const carbonValues = workload.measurements.map(
      (measurement) => measurement.kgC02_per_req
    );
    const efficiencyMin = Math.min(...energyValues, ...carbonValues, 0);
    const efficiencyMax = Math.max(
      ...energyValues,
      ...carbonValues,
      efficiencyMin + 1e-4
    );
    const efficiencyTicks = buildYTicks(
      efficiencyMin,
      efficiencyMax,
      efficiencyLayout.plotTop,
      efficiencyLayout.plotHeight,
      4,
      (value) => formatMetric$1(value, 2)
    );
    const energyPoints = scalePoints(
      workload.measurements,
      (measurement) => measurement.kjoules_per_req,
      xPositions,
      efficiencyLayout.plotTop,
      efficiencyLayout.plotHeight,
      efficiencyMin,
      efficiencyMax
    );
    const carbonPoints = scalePoints(
      workload.measurements,
      (measurement) => measurement.kgC02_per_req,
      xPositions,
      efficiencyLayout.plotTop,
      efficiencyLayout.plotHeight,
      efficiencyMin,
      efficiencyMax
    );
    const panels = [
      {
        id: "responsiveness",
        title: "Responsiveness",
        subtitle: "Lower is better",
        titleColor: TITLE_COLOR,
        yAxisLabel: "Time (s)",
        sectionTop: responsivenessLayout.sectionTop,
        sectionHeight: responsivenessLayout.sectionHeight,
        plotTop: responsivenessLayout.plotTop,
        plotHeight: responsivenessLayout.plotHeight,
        yTicks: responsivenessTicks,
        series: [
          {
            id: "ttft",
            label: "Time to first token",
            color: PRIMARY_COLOR,
            decimals: 1,
            points: ttftPoints,
            path: buildLinePath(ttftPoints)
          },
          {
            id: "e2e",
            label: "End-to-end latency",
            color: INFO_COLOR,
            dashed: true,
            decimals: 1,
            points: e2ePoints,
            path: buildLinePath(e2ePoints)
          }
        ]
      },
      {
        id: "interactivity",
        title: "Interactivity",
        subtitle: "Higher is better",
        titleColor: TITLE_COLOR,
        yAxisLabel: "tok/s/user",
        sectionTop: interactivityLayout.sectionTop,
        sectionHeight: interactivityLayout.sectionHeight,
        plotTop: interactivityLayout.plotTop,
        plotHeight: interactivityLayout.plotHeight,
        yTicks: interactivityTicks,
        series: [
          {
            id: "streaming",
            label: "Streaming speed",
            color: SUCCESS_COLOR,
            decimals: 1,
            points: interactivityPoints,
            path: buildLinePath(interactivityPoints)
          }
        ]
      },
      {
        id: "efficiency",
        title: "Efficiency impact",
        subtitle: "Lower is better",
        titleColor: TITLE_COLOR,
        yAxisLabel: "Per request",
        sectionTop: efficiencyLayout.sectionTop,
        sectionHeight: efficiencyLayout.sectionHeight,
        plotTop: efficiencyLayout.plotTop,
        plotHeight: efficiencyLayout.plotHeight,
        yTicks: efficiencyTicks,
        series: [
          {
            id: "energy",
            label: "Energy / req",
            color: WARNING_COLOR,
            decimals: 3,
            points: energyPoints,
            path: buildLinePath(energyPoints)
          },
          {
            id: "carbon",
            label: "Carbon / req",
            color: DESTRUCTIVE_COLOR,
            decimals: 3,
            points: carbonPoints,
            path: buildLinePath(carbonPoints)
          }
        ]
      }
    ];
    return {
      panels,
      xLabels,
      xPositions,
      plotWidth,
      plotBottom,
      hitBandWidth
    };
  }, [workload]);
  const updateTooltipPosition = (anchorX) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const tooltipWidth = 248;
    const tooltipHalfWidth = tooltipWidth / 2;
    const viewportPadding = 12;
    const projectedX = rect.left + anchorX / CHART_WIDTH * rect.width;
    setTooltipPosition({
      x: Math.min(
        Math.max(projectedX, tooltipHalfWidth + viewportPadding),
        window.innerWidth - tooltipHalfWidth - viewportPadding
      ),
      y: rect.top + rect.height * 0.42
    });
  };
  const clearConcurrencyTooltip = () => {
    setHoveredConcurrency(null);
    setTooltipPosition(null);
  };
  const showConcurrencyTooltip = (measurementIndex, anchorX) => {
    const measurement = workload.measurements[measurementIndex];
    if (!measurement) return;
    const values = chart.panels.flatMap(
      (panel) => panel.series.map((series) => ({
        label: series.label,
        color: series.color,
        decimals: series.decimals,
        value: series.points[measurementIndex]?.value ?? 0
      }))
    );
    setHoveredConcurrency({
      concurrency: measurement.concurrency,
      anchorX,
      measurementIndex,
      values
    });
    updateTooltipPosition(anchorX);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "bg-white",
        embedded ? "rounded-none border-0" : "space-y-4 rounded-lg border border-border p-4",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "relative w-full overflow-x-auto overflow-y-visible bg-white",
            embedded ? "pb-4" : "rounded-xl p-2 sm:p-3"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                ref: svgRef,
                viewBox: `0 0 ${CHART_WIDTH} ${TOTAL_HEIGHT}`,
                className: "aspect-[1000/564] min-w-[46rem] w-full overflow-visible",
                role: "img",
                "aria-label": `Performance metrics by concurrency for ${workload.name}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Performance metrics by concurrency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: `${clipId}-plot`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: PLOT_LEFT,
                      y: PLOT_TOP,
                      width: chart.plotWidth,
                      height: chart.plotBottom - PLOT_TOP
                    }
                  ) }) }),
                  chart.panels.map((panel) => /* @__PURE__ */ jsxRuntimeExports.jsx("g", { pointerEvents: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: 0,
                      y: panel.sectionTop,
                      width: CHART_WIDTH,
                      height: panel.sectionHeight,
                      fill: PANEL_FILL_COLOR
                    }
                  ) }, `panel-background-${panel.id}`)),
                  chart.panels.slice(0, -1).map((panel) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: 0,
                      x2: CHART_WIDTH,
                      y1: panel.sectionTop + panel.sectionHeight,
                      y2: panel.sectionTop + panel.sectionHeight,
                      stroke: SECTION_DIVIDER_COLOR,
                      strokeWidth: 1,
                      pointerEvents: "none"
                    },
                    `section-divider-${panel.id}`
                  )),
                  chart.panels.map((panel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: 16,
                        y: panel.sectionTop + 24,
                        className: "text-[14px] font-semibold",
                        fill: panel.titleColor,
                        children: panel.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: 16,
                        y: panel.sectionTop + 42,
                        className: "fill-muted-foreground text-[12px]",
                        children: panel.subtitle
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: 16,
                        y: panel.sectionTop + 62,
                        className: "fill-muted-foreground text-[12px] font-medium",
                        children: panel.yAxisLabel
                      }
                    ),
                    panel.yTicks.map((tick) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: PLOT_LEFT,
                          x2: CHART_WIDTH - PLOT_RIGHT,
                          y1: tick.y,
                          y2: tick.y,
                          stroke: GRID_LINE_COLOR,
                          strokeWidth: 1,
                          pointerEvents: "none"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: PLOT_LEFT - 8,
                          y: tick.y + 4,
                          textAnchor: "end",
                          className: "fill-muted-foreground text-[12px] font-medium tabular-nums",
                          children: tick.label
                        }
                      )
                    ] }, `${panel.id}-${tick.y}`))
                  ] }, panel.id)),
                  chart.xLabels.map((label, index) => {
                    const isActive = hoveredConcurrency?.measurementIndex === index;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "g",
                      {
                        pointerEvents: "none",
                        children: chart.panels.map((panel) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "line",
                          {
                            x1: label.x,
                            x2: label.x,
                            y1: panel.plotTop,
                            y2: panel.plotTop + panel.plotHeight,
                            stroke: isActive ? PRIMARY_COLOR : GRID_LINE_COLOR,
                            strokeWidth: isActive ? 1.5 : 1,
                            strokeOpacity: isActive ? 0.5 : 1,
                            strokeDasharray: isActive ? void 0 : "4 4"
                          },
                          `${label.concurrency}-${panel.id}`
                        ))
                      },
                      `vgrid-${label.concurrency}`
                    );
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: `url(#${clipId}-plot)`, children: chart.panels.flatMap(
                    (panel) => panel.series.map((series) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: series.path,
                        fill: "none",
                        stroke: series.color,
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: series.dashed ? "6 4" : void 0,
                        className: "pointer-events-none"
                      },
                      `${panel.id}-${series.id}`
                    ))
                  ) }),
                  chart.xLabels.map((label, index) => (
                    // biome-ignore lint/a11y/noStaticElementInteractions: invisible SVG columns for chart hover tooltips.
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: label.x - chart.hitBandWidth / 2,
                        y: PLOT_TOP,
                        width: chart.hitBandWidth,
                        height: chart.plotBottom - PLOT_TOP,
                        fill: "transparent",
                        className: "cursor-pointer",
                        onMouseEnter: () => showConcurrencyTooltip(index, label.x),
                        onMouseLeave: clearConcurrencyTooltip
                      },
                      `hit-${label.concurrency}`
                    )
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      x: 16,
                      y: TOTAL_HEIGHT - 12,
                      className: "fill-muted-foreground text-[12px] font-medium",
                      children: "Concurrent requests"
                    }
                  ),
                  chart.xLabels.map((label, index) => {
                    const isActive = hoveredConcurrency?.measurementIndex === index;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: label.x,
                        y: TOTAL_HEIGHT - 12,
                        textAnchor: "middle",
                        className: cn(
                          "text-[12px] tabular-nums transition-colors",
                          isActive ? "fill-foreground font-semibold" : "fill-muted-foreground font-medium"
                        ),
                        children: label.concurrency
                      },
                      label.concurrency
                    );
                  })
                ]
              }
            ),
            hoveredConcurrency && tooltipPosition ? reactDomExports.createPortal(
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "pointer-events-none fixed z-50 w-[15.5rem] rounded-lg border border-border/80 bg-popover px-3.5 py-2.5 text-popover-foreground shadow-lg",
                  style: {
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                    transform: "translate(-50%, -50%)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-caption-strong text-foreground", children: [
                      "Concurrency ",
                      hoveredConcurrency.concurrency
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-2.5 space-y-2 text-caption text-muted-foreground", children: hoveredConcurrency.values.map((metricValue) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between gap-3",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "flex min-w-0 items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "h-2 w-2 shrink-0 rounded-full ring-2 ring-background",
                                style: { backgroundColor: metricValue.color },
                                "aria-hidden": true
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: metricValue.label })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "shrink-0 font-mono tabular-nums text-foreground", children: formatMetric$1(metricValue.value, metricValue.decimals) })
                        ]
                      },
                      metricValue.label
                    )) })
                  ]
                }
              ),
              document.body
            ) : null
          ]
        }
      )
    }
  );
}
const TabsSizeContext = reactExports.createContext("md");
const useTabsSize = () => reactExports.useContext(TabsSizeContext);
const tabsListVariants = cva(
  "inline-flex w-fit max-w-full shrink-0 justify-start gap-1 bg-primary/7 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-control-sm items-stretch rounded-md p-0.5",
        md: "h-control-md items-stretch rounded-md p-0.5",
        lg: "h-control-lg items-center rounded-lg p-1"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-muted-foreground ring-offset-background transition-all ease-standard data-[state=inactive]:hover:bg-primary/12 data-[state=inactive]:hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:[&_svg]:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0 [&_svg]:text-current",
  {
    variants: {
      size: {
        sm: "h-full min-h-0 rounded-sm px-2 text-caption font-medium",
        md: "h-full min-h-0 rounded-sm px-3 text-label",
        lg: "rounded-md px-4 py-2 text-body-sm"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const tabsContentVariants = cva(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "mt-2",
        md: "mt-2",
        lg: "mt-3"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const Tabs = reactExports.forwardRef(({ size = "md", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsSizeContext.Provider, { value: size, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { ref, ...props }) }));
Tabs.displayName = Root2.displayName;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTabsSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      ref,
      className: cn(tabsListVariants({ size }), className),
      ...props
    }
  );
});
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTabsSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      ref,
      className: cn(tabsTriggerVariants({ size }), className),
      ...props
    }
  );
});
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTabsSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      ref,
      className: cn(tabsContentVariants({ size }), className),
      ...props
    }
  );
});
TabsContent.displayName = Content.displayName;
const WORKLOAD_ICONS = {
  document_summarization: FileText,
  document_summarization_long: ScrollText,
  fixed_synth_bmark: Gauge,
  q_and_a: MessageCircleQuestionMark
};
const WORKLOAD_ICON_TONES = {
  document_summarization: "border-primary/12 bg-primary/4 text-primary",
  document_summarization_long: "border-info/12 bg-info/4 text-info",
  fixed_synth_bmark: "border-success/12 bg-success/4 text-success",
  q_and_a: "border-warning/12 bg-warning/4 text-warning"
};
function WorkloadIcon({ workloadId }) {
  const Icon = WORKLOAD_ICONS[workloadId] ?? FileText;
  const iconClassName = WORKLOAD_ICON_TONES[workloadId] ?? "border-primary/12 bg-primary/4 text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-md border",
        iconClassName
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-20 w-icon-20", "aria-hidden": true })
    }
  );
}
function formatMetric(value, fractionDigits) {
  return value.toLocaleString(void 0, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });
}
function formatTokenStats(stats) {
  return `${formatMetric(stats.min, 0)} / ${formatMetric(stats.mean, 1)} / ${formatMetric(stats.max, 0)}`;
}
function getBenchmarkMeasurements(benchmark) {
  return benchmark.performance.flatMap(
    ({ workload }) => workload.measurements.map((measurement) => ({
      workload,
      measurement
    }))
  );
}
function findBestMeasurement(measurements, getValue, isBetter) {
  return measurements.reduce(
    (best, current) => {
      if (!best) return current;
      const currentValue = getValue(current);
      const bestValue = getValue(best);
      return isBetter(currentValue, bestValue) ? current : best;
    },
    null
  );
}
function computeEndToEndLatencySeconds({
  workload,
  measurement
}) {
  return measurement.ttft_ms / 1e3 + workload.output_tokens.mean / measurement.tokens_per_user_per_s;
}
function PerformanceKpiCard({
  label,
  value,
  unit,
  workload,
  icon: Icon,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-white px-3 py-3 shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "flex h-icon-32 w-icon-32 shrink-0 items-center justify-center rounded-md border",
          tone.iconClassName
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-16 w-icon-16", "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: cn(
            "truncate text-body-sm font-medium",
            tone.labelClassName
          ),
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex min-w-0 items-baseline gap-1 whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-h3 font-bold tabular-nums text-foreground", children: value }),
        unit ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-body-sm text-muted-foreground", children: unit }) : null
      ] }),
      workload ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-caption text-muted-foreground", children: workload }) : null
    ] })
  ] }) });
}
function PerformanceKpiStrip({
  benchmark
}) {
  const measurements = getBenchmarkMeasurements(benchmark);
  const fastestTtft = findBestMeasurement(
    measurements,
    ({ measurement }) => measurement.ttft_ms,
    (value, bestValue) => value < bestValue
  );
  const fastestEndToEnd = findBestMeasurement(
    measurements,
    computeEndToEndLatencySeconds,
    (value, bestValue) => value < bestValue
  );
  const peakStreamingSpeed = findBestMeasurement(
    measurements,
    ({ measurement }) => measurement.tokens_per_user_per_s,
    (value, bestValue) => value > bestValue
  );
  const bestEnergy = findBestMeasurement(
    measurements,
    ({ measurement }) => measurement.kjoules_per_req,
    (value, bestValue) => value < bestValue
  );
  const bestCarbon = findBestMeasurement(
    measurements,
    ({ measurement }) => measurement.kgC02_per_req,
    (value, bestValue) => value < bestValue
  );
  const kpis = [
    {
      label: "First token",
      value: fastestTtft ? formatMetric(
        fastestTtft.measurement.ttft_ms,
        fastestTtft.measurement.ttft_ms >= 100 ? 0 : 1
      ) : "—",
      unit: fastestTtft ? "ms" : void 0,
      workload: fastestTtft?.workload.name,
      icon: Clock,
      tone: {
        labelClassName: "text-primary",
        iconClassName: "border-primary/12 bg-primary/4 text-primary"
      }
    },
    {
      label: "E2E latency",
      value: fastestEndToEnd ? formatMetric(computeEndToEndLatencySeconds(fastestEndToEnd), 1) : "—",
      unit: fastestEndToEnd ? "s" : void 0,
      workload: fastestEndToEnd?.workload.name,
      icon: Gauge,
      tone: {
        labelClassName: "text-info",
        iconClassName: "border-info/12 bg-info/4 text-info"
      }
    },
    {
      label: "Stream speed",
      value: peakStreamingSpeed ? formatMetric(
        peakStreamingSpeed.measurement.tokens_per_user_per_s,
        peakStreamingSpeed.measurement.tokens_per_user_per_s >= 100 ? 0 : 1
      ) : "—",
      unit: peakStreamingSpeed ? "tok/s/user" : void 0,
      workload: peakStreamingSpeed?.workload.name,
      icon: Activity,
      tone: {
        labelClassName: "text-success",
        iconClassName: "border-success/12 bg-success/4 text-success"
      }
    },
    {
      label: "Energy / req",
      value: bestEnergy ? formatMetric(bestEnergy.measurement.kjoules_per_req * 1e3, 2) : "—",
      unit: bestEnergy ? "J" : void 0,
      workload: bestEnergy?.workload.name,
      icon: Zap,
      tone: {
        labelClassName: "text-warning",
        iconClassName: "border-warning/12 bg-warning/4 text-warning"
      }
    },
    {
      label: "Carbon / req",
      value: bestCarbon ? formatMetric(bestCarbon.measurement.kgC02_per_req * 1e3, 2) : "—",
      unit: bestCarbon ? "gCO₂e" : void 0,
      workload: bestCarbon?.workload.name,
      icon: Leaf,
      tone: {
        labelClassName: "text-destructive",
        iconClassName: "border-destructive/12 bg-destructive/4 text-destructive"
      }
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: kpis.map(({ label, value, unit, workload, icon, tone }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    PerformanceKpiCard,
    {
      label,
      value,
      unit,
      workload,
      icon,
      tone
    },
    label
  )) });
}
function MetadataRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "shrink-0 text-caption text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "min-w-0 break-all text-body-sm text-foreground", children: value })
  ] });
}
function PerformanceBenchmarkMetadataContent({
  benchmark
}) {
  const { metadata } = benchmark;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: metadata.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Experiment", value: metadata.experiment_id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Deployment", value: metadata.deployment_id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Model", value: metadata.model }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Hardware", value: metadata.hardware }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Provider", value: metadata.provider }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Image", value: metadata.image }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataRow, { label: "Timestamp", value: metadata.timestamp })
    ] })
  ] });
}
function PerformanceBenchmarkViewTabs({
  view,
  onViewChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tabs,
    {
      value: view,
      onValueChange: (value) => onViewChange(value),
      size: "sm",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "table", className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table2, { "aria-hidden": true }),
          "Table view"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "chart", className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { "aria-hidden": true }),
          "Chart view"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "details", className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { "aria-hidden": true }),
          "Experiment details"
        ] })
      ] })
    }
  );
}
function WorkloadMeasurementsPanel({
  workload,
  showTableView
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Input tokens (min / mean / max)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono tabular-nums text-body-sm text-foreground", children: formatTokenStats(workload.input_tokens) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Output tokens (min / mean / max)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono tabular-nums text-body-sm text-foreground", children: formatTokenStats(workload.output_tokens) })
      ] })
    ] }),
    showTableView ? /* @__PURE__ */ jsxRuntimeExports.jsx(WorkloadMeasurementsTable, { workload }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkloadMeasurementsChart,
      {
        workload,
        embedded: true,
        className: "rounded-none border-0"
      }
    )
  ] });
}
function WorkloadMeasurementsTable({
  workload
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border-t border-border bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { size: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-caption-strong text-muted-foreground", children: "Concurrency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right text-caption-strong text-muted-foreground", children: "TTFT (ms)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right text-caption-strong text-muted-foreground", children: "Tokens / user / s" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right text-caption-strong text-muted-foreground", children: "Tokens / s" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right text-caption-strong text-muted-foreground", children: "kJ / req" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right text-caption-strong text-muted-foreground", children: "kgCO₂ / req" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: workload.measurements.map((measurement) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono tabular-nums text-body-sm text-foreground", children: measurement.concurrency }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono tabular-nums text-body-sm text-foreground", children: formatMetric(measurement.ttft_ms, 1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono tabular-nums text-body-sm text-foreground", children: formatMetric(measurement.tokens_per_user_per_s, 1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono tabular-nums text-body-sm text-foreground", children: formatMetric(measurement.tokens_per_s, 1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono tabular-nums text-body-sm text-foreground", children: formatMetric(measurement.kjoules_per_req, 3) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono tabular-nums text-body-sm text-foreground", children: formatMetric(measurement.kgC02_per_req, 3) })
    ] }, measurement.concurrency)) })
  ] }) });
}
function WorkloadDetailsContent({
  benchmark,
  showTableView
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-strong text-foreground", children: "Workloads" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "muted",
          appearance: "ghost",
          size: "24",
          className: "font-normal",
          children: [
            benchmark.performance.length,
            " profiles"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Accordion,
      {
        type: "multiple",
        defaultValue: [benchmark.performance[0]?.workload.id],
        className: "flex flex-col gap-3",
        children: benchmark.performance.map(({ workload }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AccordionItem,
          {
            value: workload.id,
            className: "overflow-hidden rounded-lg border border-border border-b-border bg-white shadow-xs last:border-b-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AccordionTrigger,
                {
                  className: cn(
                    "px-4 py-4 hover:bg-transparent hover:no-underline group-hover:bg-transparent",
                    "data-[state=open]:border-b data-[state=open]:border-border"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(WorkloadIcon, { workloadId: workload.id }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm-strong text-foreground", children: workload.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caption text-muted-foreground", children: workload.distribution })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "bg-transparent px-0 pb-0 pt-0 group-hover:bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                WorkloadMeasurementsPanel,
                {
                  workload,
                  showTableView
                }
              ) })
            ]
          },
          workload.id
        ))
      }
    )
  ] });
}
function PerformanceBenchmarkDetailsSheet({
  benchmark,
  view,
  onViewChange,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppSideSheetContent,
      {
        title: "Performance details",
        description: "Detailed benchmark workload measurements for this model.",
        maxWidth: "xxl",
        toolbar: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PerformanceBenchmarkViewTabs,
          {
            view,
            onViewChange
          }
        ) }),
        footer: view === "chart" ? /* @__PURE__ */ jsxRuntimeExports.jsx(WorkloadMeasurementsChartLegend, {}) : void 0,
        children: view === "details" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceBenchmarkMetadataContent, { benchmark }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          WorkloadDetailsContent,
          {
            benchmark,
            showTableView: view === "table"
          }
        )
      }
    )
  ] });
}
function ModelPerformanceBenchmarkSection({
  benchmark
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceKpiStrip, { benchmark }) });
}
const QWEN35_27B_PERFORMANCE_BENCHMARK = {
  schema_version: 1,
  metadata: {
    experiment_id: "2026_04_22_1st_characterization",
    description: "Auto-generated performance benchmark YAML from full_results_dataframe.json for deployment qwen3.5-27b-azure-h100-1x-fp8-mtp.",
    timestamp: "2026-04-22T08:19:03Z",
    provider: "Booster-hosted",
    model: "Qwen/Qwen3.5-27B-FP8",
    hardware: "azure-h100-1x",
    deployment_id: "qwen3.5-27b-azure-h100-1x-fp8-mtp",
    kserve_manifest: "examplemanifest.yaml",
    image: "vllm/vllm-openai:v0.18.0"
  },
  performance: [
    {
      workload: {
        id: "document_summarization",
        name: "Document Summarization",
        token_dataset: "spec_bench",
        distribution: "doc_summarization-longbook_sum_p95_32k",
        input_tokens: { min: 10484, mean: 15418.9, max: 27378 },
        output_tokens: { min: 295, mean: 1062.55, max: 2124 },
        measurements: [
          {
            concurrency: 1,
            ttft_ms: 1358.868887,
            tokens_per_user_per_s: 149.618233,
            tokens_per_s: 149.618233,
            kjoules_per_req: 3.775889,
            kgC02_per_req: 0.209981
          },
          {
            concurrency: 2,
            ttft_ms: 1657.047742,
            tokens_per_user_per_s: 110.634455,
            tokens_per_s: 221.26891,
            kjoules_per_req: 2.188181,
            kgC02_per_req: 0.121687
          },
          {
            concurrency: 5,
            ttft_ms: 1954.140931,
            tokens_per_user_per_s: 68.673732,
            tokens_per_s: 343.368662,
            kjoules_per_req: 1.523187,
            kgC02_per_req: 0.084706
          },
          {
            concurrency: 20,
            ttft_ms: 4714.59368,
            tokens_per_user_per_s: 19.677095,
            tokens_per_s: 393.541905,
            kjoules_per_req: 1.308923,
            kgC02_per_req: 0.072791
          },
          {
            concurrency: 100,
            ttft_ms: 316820.128081,
            tokens_per_user_per_s: 2.68459,
            tokens_per_s: 268.459019,
            kjoules_per_req: 1.828692,
            kgC02_per_req: 0.101696
          }
        ]
      }
    },
    {
      workload: {
        id: "document_summarization_long",
        name: "Document Summarization Long",
        token_dataset: "spec_bench",
        distribution: "doc_summarization-longbook_sum_p95_128k",
        input_tokens: { min: 30198, mean: 57596.255, max: 190567 },
        output_tokens: { min: 165, mean: 1077.065, max: 2903 },
        measurements: [
          {
            concurrency: 1,
            ttft_ms: 5670.615723,
            tokens_per_user_per_s: 90.36934,
            tokens_per_s: 90.36934,
            kjoules_per_req: 6.360851,
            kgC02_per_req: 0.353734
          },
          {
            concurrency: 2,
            ttft_ms: 7204.604781,
            tokens_per_user_per_s: 52.150851,
            tokens_per_s: 104.301702,
            kjoules_per_req: 4.841708,
            kgC02_per_req: 0.269253
          },
          {
            concurrency: 5,
            ttft_ms: 8294.789087,
            tokens_per_user_per_s: 27.311752,
            tokens_per_s: 136.558758,
            kjoules_per_req: 3.891803,
            kgC02_per_req: 0.216427
          },
          {
            concurrency: 20,
            ttft_ms: 244652.596852,
            tokens_per_user_per_s: 2.196397,
            tokens_per_s: 43.927934,
            kjoules_per_req: 10.479794,
            kgC02_per_req: 0.582793
          }
        ]
      }
    },
    {
      workload: {
        id: "fixed_synth_bmark",
        name: "Fixed Synth Bmark",
        token_dataset: "spec_bench",
        distribution: "synth-8k1k_fixed",
        input_tokens: { min: 8192, mean: 8192, max: 8192 },
        output_tokens: { min: 1024, mean: 1024, max: 1024 },
        measurements: [
          {
            concurrency: 1,
            ttft_ms: 726.003388,
            tokens_per_user_per_s: 143.074317,
            tokens_per_s: 143.074317,
            kjoules_per_req: 3.119963,
            kgC02_per_req: 0.173505
          },
          {
            concurrency: 2,
            ttft_ms: 922.390621,
            tokens_per_user_per_s: 119.016462,
            tokens_per_s: 238.032923,
            kjoules_per_req: 1.935776,
            kgC02_per_req: 0.107651
          },
          {
            concurrency: 5,
            ttft_ms: 1182.162087,
            tokens_per_user_per_s: 86.809918,
            tokens_per_s: 434.04959,
            kjoules_per_req: 1.122145,
            kgC02_per_req: 0.062404
          },
          {
            concurrency: 20,
            ttft_ms: 2123.279531,
            tokens_per_user_per_s: 36.192739,
            tokens_per_s: 723.85478,
            kjoules_per_req: 0.670921,
            kgC02_per_req: 0.037311
          },
          {
            concurrency: 100,
            ttft_ms: 75566.86606,
            tokens_per_user_per_s: 7.941675,
            tokens_per_s: 794.167459,
            kjoules_per_req: 0.610995,
            kgC02_per_req: 0.033978
          }
        ]
      }
    },
    {
      workload: {
        id: "q_and_a",
        name: "Q And A",
        token_dataset: "spec_bench",
        distribution: "QnA-QnA_multiround",
        input_tokens: { min: 47, mean: 432.1, max: 1144 },
        output_tokens: { min: 19, mean: 268.55, max: 744 },
        measurements: [
          {
            concurrency: 1,
            ttft_ms: 66.110115,
            tokens_per_user_per_s: 149.329934,
            tokens_per_s: 149.329934,
            kjoules_per_req: 1.060198,
            kgC02_per_req: 0.058959
          },
          {
            concurrency: 2,
            ttft_ms: 97.207815,
            tokens_per_user_per_s: 133.218539,
            tokens_per_s: 266.437078,
            kjoules_per_req: 0.407209,
            kgC02_per_req: 0.022645
          },
          {
            concurrency: 5,
            ttft_ms: 117.247547,
            tokens_per_user_per_s: 114.001088,
            tokens_per_s: 570.00544,
            kjoules_per_req: 0.231549,
            kgC02_per_req: 0.012877
          },
          {
            concurrency: 20,
            ttft_ms: 255.37201,
            tokens_per_user_per_s: 63.687348,
            tokens_per_s: 1273.746961,
            kjoules_per_req: 0.08583,
            kgC02_per_req: 4773e-6
          },
          {
            concurrency: 100,
            ttft_ms: 3072.783876,
            tokens_per_user_per_s: 20.250581,
            tokens_per_s: 2025.058143,
            kjoules_per_req: 0.073411,
            kgC02_per_req: 4082e-6
          }
        ]
      }
    }
  ]
};
const MODEL_PERFORMANCE_BENCHMARKS = {
  "m-11": QWEN35_27B_PERFORMANCE_BENCHMARK
};
function getModelPerformanceBenchmark(model) {
  return MODEL_PERFORMANCE_BENCHMARKS[model.id] ?? (model.hosting === "Booster Hosted" ? QWEN35_27B_PERFORMANCE_BENCHMARK : null);
}
export {
  ModelPerformanceBenchmarkSection as M,
  PerformanceBenchmarkDetailsSheet as P,
  QWEN35_27B_PERFORMANCE_BENCHMARK as Q,
  getModelPerformanceBenchmark as g
};
