import { useParams, Link, useNavigate } from "react-router-dom";
import { endpoints, deployments } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  ArrowLeft, Shield, Play, Eye, Key, XCircle, ArrowUpCircle, Globe, Lock, MoreHorizontal, Plus, Pencil, Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ApiKeysDialog } from "@/components/ApiKeysDialog";

const modeBadge = (mode: string) => {
  const styles: Record<string, string> = {
    Default: "bg-primary/10 text-primary border-primary/30",
    Shadow: "bg-info/10 text-info border-info/30",
    Inactive: "bg-muted text-muted-foreground border-border opacity-60",
    Shared: "bg-info/10 text-info border-info/30",
  };
  return <Badge variant="outline" className={styles[mode] || ""}>{mode}</Badge>;
};

const EndpointDetail = () => {
  const { endpointId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isImpersonating, logImpersonationAction } = useAuth();
  const ep = endpoints.find((s) => s.id === endpointId);
  const deps = deployments[endpointId || ""] || [];
  const [promoteTarget, setPromoteTarget] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [, forceUpdate] = useState(0);

  if (!ep) {
    return (
      <div className="container py-8">
        <p>Inference Endpoint not found.</p>
        <Button asChild variant="ghost"><Link to="/endpoints">← Back to Inference Endpoints</Link></Button>
      </div>
    );
  }

  const candidateDep = deps.find((d) => d.id === promoteTarget);
  const currentDefault = deps.find((d) => d.mode === "Default");
  const currentShadow = deps.find((d) => d.mode === "Shadow");

  return (
    <div className="container py-8 space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/endpoints"><ArrowLeft className="h-4 w-4 mr-1" /> Inference Endpoints</Link>
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{ep.name}</h1>
            <Badge variant="secondary">{ep.type}</Badge>
            <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
              <Link to={`/endpoints/${endpointId}/edit`}><Pencil className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1 font-mono">{ep.endpoint}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to={`/logs?space=${endpointId}`}><Eye className="h-4 w-4 mr-1" /> View Logs</Link>
          </Button>
          <Button variant="outline" onClick={() => setShowApiKeys(true)}>
            <Key className="h-4 w-4 mr-1" /> API Keys
          </Button>
          <Button asChild>
            <Link to={`/deploy?space=${endpointId}`}>
              <Plus className="h-4 w-4 mr-1" /> Add Model
            </Link>
          </Button>
        </div>
      </div>


      {/* Deployment Table */}
      <Card>
        <CardHeader><CardTitle>Models</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Model</TableHead>
                
                <TableHead>Budget</TableHead>
                
                
                
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deps.map((dep) => (
                <TableRow key={dep.id}>
                  <TableCell className="font-medium">{dep.name}</TableCell>
                  <TableCell>{dep.model} <span className="text-muted-foreground text-xs">{dep.version}</span></TableCell>
                  
                  <TableCell>
                    <span className={dep.budgetUsed >= 85 ? "text-destructive" : dep.budgetUsed >= 60 ? "text-warning" : "text-success"}>
                      {dep.budgetUsed}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {dep.mode === "Inactive" && !isImpersonating && (
                          <>
                            <DropdownMenuItem onClick={() => { setPromoteTarget(dep.id); setConfirmed(false); }}>
                              <ArrowUpCircle className="h-4 w-4 mr-2" /> Promote to Default
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => toast({ title: "Removed", description: `${dep.name} has been removed from this endpoint.` })}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </DropdownMenuItem>
                          </>
                        )}
                        {dep.mode !== "Default" && dep.mode !== "Inactive" && isImpersonating && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              disabled
                              className="opacity-50"
                              onClick={() => toast({ title: "Restricted", description: "Production default switching is disabled during impersonation.", variant: "destructive" })}
                            >
                              <ArrowUpCircle className="h-4 w-4 mr-2" /> Promote to Default
                              <Badge variant="outline" className="ml-2 text-[9px] border-destructive/30 text-destructive">Restricted</Badge>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => toast({ title: "Disassociated", description: `${dep.name} has been disassociated from this endpoint.` })}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Disassociate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Safe Default Switching Modal */}
      <Dialog open={!!promoteTarget} onOpenChange={() => setPromoteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote to Default</DialogTitle>
            <DialogDescription>
              This will route 100% of live traffic to this deployment.
            </DialogDescription>
          </DialogHeader>
          {candidateDep && currentDefault && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-muted">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Current Default</p>
                    <p className="font-semibold">{currentDefault.model}</p>
                    <p className="text-xs text-muted-foreground">€{currentDefault.costPer1MTokens}/1M • {currentDefault.latencyP50}ms p50</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/30">
                  <CardContent className="p-4">
                    <p className="text-xs text-primary mb-1">Candidate</p>
                    <p className="font-semibold">{candidateDep.model}</p>
                    <p className="text-xs text-muted-foreground">€{candidateDep.costPer1MTokens}/1M • {candidateDep.latencyP50}ms p50</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                <p>Cost delta: <strong>{candidateDep.costPer1MTokens < currentDefault.costPer1MTokens ? "↓" : "↑"} {Math.abs(Math.round((1 - candidateDep.costPer1MTokens / currentDefault.costPer1MTokens) * 100))}%</strong></p>
                <p>Latency delta: <strong>{candidateDep.latencyP50 < currentDefault.latencyP50 ? "↓" : "↑"} {Math.abs(candidateDep.latencyP50 - currentDefault.latencyP50)}ms</strong></p>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="confirm-promote"
                  checked={confirmed}
                  onCheckedChange={(v) => setConfirmed(!!v)}
                />
                <label htmlFor="confirm-promote" className="text-sm leading-tight cursor-pointer">
                  I understand this will impact live production traffic.
                </label>
              </div>

              <Button disabled={!confirmed} className="w-full" onClick={() => setPromoteTarget(null)}>
                Promote to Default
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* API Keys Dialog */}
      <ApiKeysDialog
        open={showApiKeys}
        onOpenChange={setShowApiKeys}
        spaceName={ep.name}
        spaceId={ep.id}
      />
    </div>
  );
};

export default EndpointDetail;
