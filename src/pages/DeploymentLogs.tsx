import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { endpoints } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, Key, Timer, CalendarIcon, X } from "lucide-react";
import { SessionLogsList, generateMockSessions } from "@/components/SessionLogsList";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const PRESET_DURATIONS = [
  { label: "All Time", value: "all" },
  { label: "Last 5 min", value: "5" },
  { label: "Last 15 min", value: "15" },
  { label: "Last 30 min", value: "30" },
  { label: "Last 1 hour", value: "60" },
  { label: "Last 6 hours", value: "360" },
  { label: "Last 24 hours", value: "1440" },
  { label: "Custom (minutes)", value: "custom" },
  { label: "Date & Time Range", value: "daterange" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

const DeploymentLogs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const endpointId = searchParams.get("space") || "";

  const ep = endpoints.find((s) => s.id === endpointId);
  const allSessions = generateMockSessions(endpointId);

  // Collect unique key names
  const uniqueKeys = useMemo(() => [...new Set(allSessions.map((s) => s.apiKey))], [allSessions]);

  const [durationPreset, setDurationPreset] = useState("all");
  const [customMinutes, setCustomMinutes] = useState("");
  const [keyFilter, setKeyFilter] = useState("all");
  const [minProcessingTime, setMinProcessingTime] = useState("");
  const [maxProcessingTime, setMaxProcessingTime] = useState("");

  // Date range state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startHour, setStartHour] = useState("08");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("09");
  const [endMinute, setEndMinute] = useState("00");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  // Validate end time is within 1 hour of start time
  const timeRangeError = useMemo(() => {
    if (durationPreset !== "daterange" || !selectedDate) return null;
    const startMins = parseInt(startHour) * 60 + parseInt(startMinute);
    const endMins = parseInt(endHour) * 60 + parseInt(endMinute);
    if (endMins <= startMins) return "End time must be after start time";
    if (endMins - startMins > 60) return "Interval cannot exceed 1 hour";
    return null;
  }, [durationPreset, selectedDate, startHour, startMinute, endHour, endMinute]);

  const filteredSessions = useMemo(() => {
    let result = allSessions;

    // Duration / date-range filter
    if (durationPreset === "daterange" && selectedDate && !timeRangeError) {
      const startDate = new Date(selectedDate);
      startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setHours(parseInt(endHour), parseInt(endMinute), 59, 999);
      result = result.filter((s) => {
        const t = new Date(s.timestamp);
        return t >= startDate && t <= endDate;
      });
    } else if (durationPreset !== "all" && durationPreset !== "daterange") {
      const minutes = durationPreset === "custom"
        ? parseInt(customMinutes, 10)
        : parseInt(durationPreset, 10);
      if (minutes && !isNaN(minutes)) {
        const cutoff = new Date(Date.now() - minutes * 60 * 1000);
        result = result.filter((s) => new Date(s.timestamp) >= cutoff);
      }
    }

    // Key filter
    if (keyFilter !== "all") {
      result = result.filter((s) => s.apiKey === keyFilter);
    }

    // Processing time filter
    const minPt = parseInt(minProcessingTime, 10);
    const maxPt = parseInt(maxProcessingTime, 10);
    if (!isNaN(minPt)) result = result.filter((s) => s.processingTimeMs >= minPt);
    if (!isNaN(maxPt)) result = result.filter((s) => s.processingTimeMs <= maxPt);

    return result;
  }, [allSessions, durationPreset, customMinutes, keyFilter, minProcessingTime, maxProcessingTime, selectedDate, startHour, startMinute, endHour, endMinute, timeRangeError]);

  const hasActiveFilters = durationPreset !== "all" || keyFilter !== "all" || minProcessingTime || maxProcessingTime;

  const resetFilters = () => {
    setDurationPreset("all");
    setCustomMinutes("");
    setKeyFilter("all");
    setMinProcessingTime("");
    setMaxProcessingTime("");
    setSelectedDate(undefined);
    setStartHour("08");
    setStartMinute("00");
    setEndHour("09");
    setEndMinute("00");
  };

  return (
    <div className="container py-8 space-y-6">
      <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Endpoint
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Request Logs</h1>
          {ep && (
            <p className="text-sm text-muted-foreground mt-1">{ep.name}</p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Duration filter */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Duration:</span>
          </div>
          <Select value={durationPreset} onValueChange={(v) => { setDurationPreset(v); if (v !== "custom") setCustomMinutes(""); }}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRESET_DURATIONS.map((d) => (
                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {durationPreset === "custom" && (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                placeholder="e.g. 45"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="w-28 h-9"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          )}

          {/* Key filter */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Key className="h-3.5 w-3.5" />
          </div>
          <Select value={keyFilter} onValueChange={setKeyFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Keys" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Keys</SelectItem>
              {uniqueKeys.map((k) => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Processing time filter */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Timer className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              min={0}
              placeholder="Min ms"
              value={minProcessingTime}
              onChange={(e) => setMinProcessingTime(e.target.value)}
              className="w-24 h-9"
            />
            <span className="text-xs text-muted-foreground">–</span>
            <Input
              type="number"
              min={0}
              placeholder="Max ms"
              value={maxProcessingTime}
              onChange={(e) => setMaxProcessingTime(e.target.value)}
              className="w-24 h-9"
            />
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground" onClick={resetFilters}>
              <X className="h-3 w-3 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Date & time range row */}
        {durationPreset === "daterange" && (
          <div className="flex items-end gap-3 flex-wrap p-3 rounded-lg border border-border bg-muted/30">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Date</Label>
              <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-40 justify-start text-left font-normal text-sm", !selectedDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                    {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => { setSelectedDate(d); setDatePopoverOpen(false); }}
                    disabled={(d) => d > new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Start Time</Label>
              <div className="flex items-center gap-1">
                <Select value={startHour} onValueChange={setStartHour}>
                  <SelectTrigger className="w-[68px] h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{HOURS.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                </Select>
                <span className="text-muted-foreground font-medium">:</span>
                <Select value={startMinute} onValueChange={setStartMinute}>
                  <SelectTrigger className="w-[68px] h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{MINUTES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">End Time</Label>
              <div className="flex items-center gap-1">
                <Select value={endHour} onValueChange={setEndHour}>
                  <SelectTrigger className="w-[68px] h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{HOURS.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                </Select>
                <span className="text-muted-foreground font-medium">:</span>
                <Select value={endMinute} onValueChange={setEndMinute}>
                  <SelectTrigger className="w-[68px] h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{MINUTES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            {timeRangeError && (
              <span className="text-xs text-destructive self-center">{timeRangeError}</span>
            )}
          </div>
        )}

        {/* Result count */}
        {hasActiveFilters && (
          <span className="text-xs text-muted-foreground">
            Showing {filteredSessions.length} of {allSessions.length} logs
          </span>
        )}
      </div>

      <SessionLogsList sessions={filteredSessions} />
    </div>
  );
};

export default DeploymentLogs;
