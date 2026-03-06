import { useState } from "react";
import { endpoints } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Shield, Plus, MoreVertical, Pencil, Trash2, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fmt = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
};

const barColor = (pct: number) => {
  if (pct < 60) return "bg-success";
  if (pct < 85) return "bg-warning";
  return "bg-destructive";
};

const Endpoints = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [, forceRender] = useState(0);

  const endpointToDelete = endpoints.find((s) => s.id === deleteTarget);

  const handleDelete = () => {
    if (!deleteTarget) return;
    const name = endpointToDelete?.name;
    const idx = endpoints.findIndex((s) => s.id === deleteTarget);
    if (idx !== -1) endpoints.splice(idx, 1);
    setDeleteTarget(null);
    forceRender((n) => n + 1);
    toast({ title: "Endpoint Deleted", description: `"${name}" has been removed.` });
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Endpoints</h1>
          <p className="text-muted-foreground">Manage your isolated project endpoints and their deployments.</p>
        </div>
        <Button asChild>
          <Link to="/endpoints/new"><Plus className="h-4 w-4 mr-1" /> Deploy Endpoint</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {endpoints.map((ep) => (
          <Card key={ep.id} className="hover:border-primary/40 transition-colors h-full relative group">
            <div className="absolute top-3 right-3 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/endpoints/${ep.id}/edit`)}>
                    <Pencil className="h-4 w-4 mr-2" /> Edit Endpoint
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setDeleteTarget(ep.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete Endpoint
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to={`/endpoints/${ep.id}`} className="block">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between pr-8">
                  <CardTitle className="text-lg">{ep.name}</CardTitle>
                  <Badge variant="secondary">{ep.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-mono text-muted-foreground truncate">{ep.endpoint}</p>
                <div className="flex items-center gap-1.5 text-sm">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span>Default: {ep.defaultDeployment}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      Budget: {fmt(ep.tokenBudget)} tokens
                    </span>
                    <span className="font-medium">{ep.budgetUsed}% used</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${barColor(ep.budgetUsed)}`}
                      style={{ width: `${ep.budgetUsed}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Badge variant="outline" className={ep.health === "OK" ? "border-success/30 text-success" : "border-warning/30 text-warning"}>
                    SLA: {ep.health}
                  </Badge>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Endpoint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{endpointToDelete?.name}"? This will remove all deployments and data associated with this endpoint. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Endpoints;
