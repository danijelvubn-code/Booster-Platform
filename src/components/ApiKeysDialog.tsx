import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, Plus, Copy, MoreHorizontal, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "disabled";
}

interface ApiKeysDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spaceName: string;
  spaceId: string;
}

const generateMockKey = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "bdc_";
  for (let i = 0; i < 32; i++) key += chars[Math.floor(Math.random() * chars.length)];
  return key;
};

const initialKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production",
    prefix: "bdc_a3f8...x9k2",
    createdAt: "2025-01-15",
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: "key-2",
    name: "Default",
    prefix: "bdc_7m2q...p4w1",
    createdAt: "2025-02-01",
    lastUsed: "5 days ago",
    status: "active",
  },
];

export function ApiKeysDialog({ open, onOpenChange, spaceName }: ApiKeysDialogProps) {
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  
  const [justCreatedKey, setJustCreatedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newKeyName.trim()) return;
    const fullKey = generateMockKey();
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      prefix: `${fullKey.slice(0, 6)}...${fullKey.slice(-4)}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: null,
      status: "active",
    };
    setKeys((prev) => [newKey, ...prev]);
    setJustCreatedKey(fullKey);
    setNewKeyName("");
    setIsCreating(false);
    toast({ title: "API key created", description: `"${newKey.name}" is ready to use. Copy it now — it won't be shown again.` });
  };

  const handleToggleStatus = (id: string) => {
    setKeys((prev) => prev.map((k) => {
      if (k.id !== id) return k;
      const newStatus = k.status === "active" ? "disabled" : "active";
      return { ...k, status: newStatus as ApiKey["status"] };
    }));
    const key = keys.find((k) => k.id === id);
    const newStatus = key?.status === "active" ? "disabled" : "active";
    toast({ title: newStatus === "disabled" ? "Key disabled" : "Key enabled", description: newStatus === "disabled" ? "This key can no longer be used for requests." : "This key is now active again." });
  };

  const handleDelete = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast({ title: "Key deleted" });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeKeys = keys.filter((k) => k.status === "active");
  const disabledKeys = keys.filter((k) => k.status === "disabled");

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setJustCreatedKey(null); setIsCreating(false); } }}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" /> API Keys
          </DialogTitle>
          <DialogDescription>
            Manage API keys for <span className="font-semibold text-foreground">{spaceName}</span>. Keys are scoped to the space and apply to all models within it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Just-created key banner */}
          {justCreatedKey && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2 relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setJustCreatedKey(null)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
              <p className="text-sm font-medium text-primary">New key created — copy it now</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-3 py-2 text-xs font-mono select-all break-all">
                  {justCreatedKey}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0"
                  onClick={() => handleCopy("new", justCreatedKey)}
                >
                  {copiedId === "new" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">This key will not be shown again after you dismiss this banner.</p>
            </div>
          )}

          {/* Create new key */}
          {isCreating ? (
            <div className="rounded-lg border border-dashed border-primary/30 p-4 space-y-3">
              <Label htmlFor="key-name" className="text-sm">Key name</Label>
              <Input
                id="key-name"
                placeholder="e.g. Backend Service, Analytics Pipeline"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                autoFocus
              />
              <p className="text-[11px] text-muted-foreground">This name will appear in usage reports to help you identify traffic sources.</p>
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="ghost" onClick={() => { setIsCreating(false); setNewKeyName(""); }}>Cancel</Button>
                <Button size="sm" onClick={handleCreate} disabled={!newKeyName.trim()}>Generate Key</Button>
              </div>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsCreating(true)} className="w-full border-dashed">
              <Plus className="h-4 w-4 mr-1" /> Create New Key
            </Button>
          )}

          {/* Active keys table */}
          {activeKeys.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Active keys ({activeKeys.length})</p>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last used</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeKeys.map((k) => (
                      <TableRow key={k.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{k.name}</span>
                            <Badge variant="outline" className="text-[10px] border-success/30 text-success">active</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <code className="text-xs font-mono text-muted-foreground">
                              {k.prefix}
                            </code>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleCopy(k.id, k.prefix)}>
                              {copiedId === k.id ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleCopy(k.id, k.prefix)}>
                              {copiedId === k.id ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{k.createdAt}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{k.lastUsed || "Never"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleToggleStatus(k.id)}>
                                <Key className="h-4 w-4 mr-2" /> Disable
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(k.id)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Disabled keys */}
          {disabledKeys.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Disabled keys ({disabledKeys.length})</p>
              <div className="rounded-lg border border-dashed">
                <Table>
                  <TableBody>
                    {disabledKeys.map((k) => (
                      <TableRow key={k.id} className="opacity-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{k.name}</span>
                            <Badge variant="outline" className="text-[10px] border-muted-foreground/30 text-muted-foreground">disabled</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">{k.prefix}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{k.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => handleToggleStatus(k.id)}>
                              Enable
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => handleDelete(k.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
