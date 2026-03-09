import { deployments } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface LogLine {
  id: string;
  timestamp: string;
  processingTimeMs: number;
  inputTokens: number;
  outputTokens: number;
  apiKey: string;
}

export const generateMockSessions = (spaceId: string): LogLine[] => {
  const deps = deployments[spaceId] || [];
  if (deps.length === 0) return [];

  const keys = ["sk-***7f2a", "sk-***3e91", "sk-***9b44"];
  const logs: LogLine[] = [];

  deps.forEach((dep, di) => {
    const seed = dep.id.charCodeAt(dep.id.length - 1);
    const count = 6 + (seed % 5);
    for (let i = 0; i < count; i++) {
      const hour = 8 + ((seed + i * 3) % 14);
      const min = (seed * 7 + i * 13) % 60;
      const sec = (seed * 3 + i * 17) % 60;
      logs.push({
        id: `log-${dep.id}-${i}`,
        timestamp: `2025-02-16T${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}Z`,
        processingTimeMs: Math.round(120 + Math.sin(seed + i) * 80 + Math.random() * 200),
        inputTokens: Math.round(15 + Math.random() * 60),
        outputTokens: Math.round(40 + Math.random() * 250),
        apiKey: keys[(di + i) % keys.length],
      });
    }
  });

  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return logs;
};

interface SessionLogsListProps {
  sessions: LogLine[];
}

export function SessionLogsList({ sessions }: SessionLogsListProps) {
  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-sm">No logs available. Select an endpoint to view logs.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request Timestamp</TableHead>
              <TableHead className="text-right">Processing Time</TableHead>
              <TableHead className="text-right">Input Tokens</TableHead>
              <TableHead className="text-right">Output Tokens</TableHead>
              <TableHead>Key Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-sm">{log.processingTimeMs}ms</TableCell>
                <TableCell className="text-right text-sm">{log.inputTokens}</TableCell>
                <TableCell className="text-right text-sm">{log.outputTokens}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{log.apiKey}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
