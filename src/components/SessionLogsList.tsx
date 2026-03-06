import { useState } from "react";
import { deployments } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Clock,
  MessageSquare,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ConversationEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  tokens: number;
  latencyMs?: number;
  timestamp: string;
  feedback?: "up" | "down" | null;
}

interface Session {
  id: string;
  startedAt: string;
  duration: string;
  totalTokens: number;
  entries: ConversationEntry[];
  status: "completed" | "error" | "in_progress";
  apiKey: string;
  feedback?: "up" | "down" | null;
  modelName: string;
  deploymentId: string;
}

export const generateMockSessions = (spaceId: string): Session[] => {
  const deps = deployments[spaceId] || [];
  if (deps.length === 0) return [];

  const allSessions: Session[] = [];

  deps.forEach((dep) => {
    const seed = dep.id.charCodeAt(dep.id.length - 1);
    const sessions: Session[] = [
      {
        id: `sess-${seed}-001`,
        startedAt: "2025-02-16T09:12:34Z",
        duration: "2m 14s",
        totalTokens: 3420,
        status: "completed",
        apiKey: "sk-***7f2a",
        feedback: null,
        modelName: dep.model,
        deploymentId: dep.id,
        entries: [
          { id: `e1-${dep.id}`, role: "user", content: "Summarize the key clauses in this insurance contract regarding liability limits.", tokens: 28, timestamp: "09:12:34", feedback: null },
          { id: `e2-${dep.id}`, role: "assistant", content: "The contract contains three primary liability clauses:\n\n1. **General Liability Cap** — Total liability is capped at $2M per occurrence and $5M aggregate annually.\n2. **Professional Indemnity** — Coverage extends to errors and omissions with a $1M sub-limit.\n3. **Exclusion Clause (Section 14.3)** — Excludes intentional misconduct, criminal acts, and punitive damages.\n\nThe deductible is set at $50,000 per claim with a 30-day notice requirement.", tokens: 142, latencyMs: 320, timestamp: "09:12:35", feedback: null },
          { id: `e3-${dep.id}`, role: "user", content: "What's the difference between the aggregate and per-occurrence limits?", tokens: 18, timestamp: "09:12:52", feedback: null },
          { id: `e4-${dep.id}`, role: "assistant", content: "**Per-occurrence limit ($2M):** The maximum payout for any single claim or incident.\n\n**Aggregate limit ($5M):** The total maximum payout across all claims within the policy period (usually one year).\n\nIn practice, this means if you have three separate $2M claims in one year, the insurer would pay $2M + $2M + $1M = $5M (capped at aggregate), not $6M.", tokens: 108, latencyMs: 280, timestamp: "09:12:53", feedback: null },
        ],
      },
      {
        id: `sess-${seed}-002`,
        startedAt: "2025-02-16T08:45:11Z",
        duration: "45s",
        totalTokens: 890,
        status: "completed",
        apiKey: "sk-***3e91",
        feedback: "up",
        modelName: dep.model,
        deploymentId: dep.id,
        entries: [
          { id: `e5-${dep.id}`, role: "user", content: "Classify this claim: Water damage to basement due to pipe burst, estimated repair $12,000.", tokens: 22, timestamp: "08:45:11", feedback: null },
          { id: `e6-${dep.id}`, role: "assistant", content: "**Classification:** Property Damage — Water/Plumbing\n**Priority:** Medium\n**Estimated Coverage:** Covered under standard homeowner's policy (Section 7.2)\n**Recommended Action:** Assign to adjuster, request plumber's report and photos\n**Flag:** Check for pre-existing condition exclusion if pipes were >25 years old", tokens: 78, latencyMs: 190, timestamp: "08:45:12", feedback: "up" },
        ],
      },
      {
        id: `sess-${seed}-003`,
        startedAt: "2025-02-15T16:22:00Z",
        duration: "1m 08s",
        totalTokens: 1540,
        status: dep.mode === "Shadow" ? "error" : "completed",
        apiKey: "sk-***9b44",
        feedback: null,
        modelName: dep.model,
        deploymentId: dep.id,
        entries: [
          { id: `e7-${dep.id}`, role: "user", content: "Draft a denial letter for claim #CLM-2025-0892. Reason: pre-existing condition, policy exclusion 4.1.b.", tokens: 30, timestamp: "16:22:00", feedback: null },
          { id: `e8-${dep.id}`, role: "assistant", content: "**DRAFT — Claim Denial Notice**\n\nRe: Claim #CLM-2025-0892\n\nDear Policyholder,\n\nAfter thorough review of your claim submitted on [DATE], we regret to inform you that your claim has been denied.\n\n**Reason for Denial:** The reported damage falls under Policy Exclusion 4.1(b).\n\nSincerely,\n[Claims Department]", tokens: 198, latencyMs: 450, timestamp: "16:22:02", feedback: null },
        ],
      },
    ];
    allSessions.push(...sessions);
  });

  allSessions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  return allSessions;
};

const statusColor: Record<string, string> = {
  completed: "border-success/30 text-success",
  error: "border-destructive/30 text-destructive",
  in_progress: "border-warning/30 text-warning",
};

interface SessionLogsListProps {
  sessions: Session[];
}

export function SessionLogsList({ sessions }: SessionLogsListProps) {
  const { toast } = useToast();
  const [openSessions, setOpenSessions] = useState<Set<string>>(new Set());
  const [openEntries, setOpenEntries] = useState<Set<string>>(new Set());
  const [feedbacks, setFeedbacks] = useState<Record<string, "up" | "down" | null>>({});
  const [feedbackComments, setFeedbackComments] = useState<Record<string, string>>({});
  const [commentOpen, setCommentOpen] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const toggleSession = (id: string) => {
    setOpenSessions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleEntry = (id: string) => {
    setOpenEntries((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const setFeedbackFn = (id: string, value: "up" | "down") => {
    const isToggleOff = feedbacks[id] === value;
    setFeedbacks((prev) => ({ ...prev, [id]: isToggleOff ? null : value }));
    if (isToggleOff) {
      setCommentOpen((prev) => { const n = new Set(prev); n.delete(id); return n; });
    } else {
      setCommentOpen((prev) => new Set(prev).add(id));
    }
  };

  const submitComment = (id: string) => {
    const comment = feedbackComments[id]?.trim();
    toast({
      title: "Feedback submitted",
      description: comment ? `"${comment.slice(0, 60)}${comment.length > 60 ? "…" : ""}"` : "Rating recorded",
    });
    setCommentOpen((prev) => { const n = new Set(prev); n.delete(id); return n; });
  };

  const copyContent = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const getFeedback = (id: string, defaultFb?: "up" | "down" | null) => {
    return feedbacks[id] !== undefined ? feedbacks[id] : defaultFb ?? null;
  };

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-sm">No session logs available. Select a space to view logs.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: sessions.length },
          { label: "Total Tokens", value: sessions.reduce((a, s) => a + s.totalTokens, 0).toLocaleString() },
          { label: "Errors", value: sessions.filter((s) => s.status === "error").length },
          { label: "Avg Duration", value: "2m 25s" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Session list */}
      {sessions.map((session) => (
        <Card key={session.id} className="overflow-hidden">
          <Collapsible open={openSessions.has(session.id)} onOpenChange={() => toggleSession(session.id)}>
            <CollapsibleTrigger asChild>
              <button className="w-full text-left p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                {openSessions.has(session.id) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-medium">{session.id}</span>
                    <Badge variant="outline" className={statusColor[session.status]}>
                      {session.status}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{session.modelName}</Badge>
                    {getFeedback(session.id, session.feedback) === "up" && (
                      <Badge variant="outline" className="border-success/30 text-success text-xs">👍</Badge>
                    )}
                    {getFeedback(session.id, session.feedback) === "down" && (
                      <Badge variant="outline" className="border-destructive/30 text-destructive text-xs">👎</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(session.startedAt).toLocaleString()}</span>
                    <span>{session.duration}</span>
                    <span>{session.totalTokens.toLocaleString()} tokens</span>
                    <span className="font-mono">{session.apiKey}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {session.entries.length} messages</span>
                  </div>
                </div>
                {/* Session-level feedback */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-7 w-7 p-0 ${getFeedback(session.id, session.feedback) === "up" ? "text-success bg-success/10" : "text-muted-foreground"}`}
                    onClick={() => setFeedbackFn(session.id, "up")}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-7 w-7 p-0 ${getFeedback(session.id, session.feedback) === "down" ? "text-destructive bg-destructive/10" : "text-muted-foreground"}`}
                    onClick={() => setFeedbackFn(session.id, "down")}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </button>
            </CollapsibleTrigger>

            {/* Session-level comment box */}
            {commentOpen.has(session.id) && getFeedback(session.id, session.feedback) !== null && (
              <div className="px-4 pb-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Textarea
                  placeholder="Add details about your feedback (optional)…"
                  className="text-xs min-h-[60px] resize-none"
                  value={feedbackComments[session.id] || ""}
                  onChange={(e) => setFeedbackComments((p) => ({ ...p, [session.id]: e.target.value }))}
                  maxLength={500}
                />
                <Button size="sm" variant="secondary" className="h-8 px-3 shrink-0 self-end" onClick={() => submitComment(session.id)}>
                  <Send className="h-3.5 w-3.5 mr-1" /> Submit
                </Button>
              </div>
            )}

            <CollapsibleContent>
              <div className="border-t border-border">
                {session.entries.map((entry) => {
                  const isAssistant = entry.role === "assistant";
                  const entryFb = getFeedback(entry.id, entry.feedback);

                  return (
                    <div key={entry.id} className={`border-b border-border last:border-b-0 ${isAssistant ? "bg-muted/20" : ""}`}>
                      <Collapsible open={openEntries.has(entry.id)} onOpenChange={() => toggleEntry(entry.id)}>
                        <CollapsibleTrigger asChild>
                          <button className="w-full text-left px-6 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                            {openEntries.has(entry.id) ? (
                              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            )}
                            <Badge variant={isAssistant ? "default" : "secondary"} className="text-xs shrink-0 mt-0.5">
                              {entry.role}
                            </Badge>
                            <p className="text-sm flex-1 truncate">{entry.content.split("\n")[0]}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                              <span>{entry.tokens} tok</span>
                              {entry.latencyMs && <span>{entry.latencyMs}ms</span>}
                              <span>{entry.timestamp}</span>
                            </div>
                          </button>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="px-6 pb-4 pl-16 space-y-3">
                            <div className="relative">
                              <pre className="text-sm whitespace-pre-wrap bg-background border border-border rounded-lg p-4 font-mono leading-relaxed max-h-80 overflow-auto">
                                {entry.content}
                              </pre>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2 h-7 w-7 p-0"
                                onClick={(e) => { e.stopPropagation(); copyContent(entry.content, entry.id); }}
                              >
                                {copied === entry.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                              </Button>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Tokens: {entry.tokens}</span>
                              {entry.latencyMs && <span>Latency: {entry.latencyMs}ms</span>}
                              <span>Time: {entry.timestamp}</span>
                            </div>

                            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Rate this {entry.role === "assistant" ? "response" : "input"}:</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`h-7 px-2 gap-1 text-xs ${entryFb === "up" ? "text-success bg-success/10" : "text-muted-foreground"}`}
                                  onClick={() => setFeedbackFn(entry.id, "up")}
                                >
                                  <ThumbsUp className="h-3 w-3" /> Good
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`h-7 px-2 gap-1 text-xs ${entryFb === "down" ? "text-destructive bg-destructive/10" : "text-muted-foreground"}`}
                                  onClick={() => setFeedbackFn(entry.id, "down")}
                                >
                                  <ThumbsDown className="h-3 w-3" /> Poor
                                </Button>
                              </div>
                              {commentOpen.has(entry.id) && entryFb !== null && (
                                <div className="flex gap-2">
                                  <Textarea
                                    placeholder="What was good or bad about this? (optional)…"
                                    className="text-xs min-h-[56px] resize-none"
                                    value={feedbackComments[entry.id] || ""}
                                    onChange={(e) => setFeedbackComments((p) => ({ ...p, [entry.id]: e.target.value }))}
                                    maxLength={500}
                                  />
                                  <Button size="sm" variant="secondary" className="h-8 px-3 shrink-0 self-end" onClick={() => submitComment(entry.id)}>
                                    <Send className="h-3 w-3 mr-1" /> Submit
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}
