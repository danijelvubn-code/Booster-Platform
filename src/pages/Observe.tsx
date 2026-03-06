import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, ShieldCheck, Layers, Lock } from "lucide-react";
import TenantDashboard from "@/components/observe/TenantDashboard";
import AdminDashboard from "@/components/observe/AdminDashboard";
import GranularObservation from "@/components/observe/GranularObservation";
import { Card, CardContent } from "@/components/ui/card";

const Observe = () => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin ?? false;
  const [view, setView] = useState("tenant");

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Observability & Performance Intelligence</h1>
        <p className="text-muted-foreground mt-1">
          {isAdmin
            ? "Platform-wide insights across business health, tenant value, and raw telemetry."
            : "Business value metrics, SLO compliance, and granular telemetry for your endpoints."}
        </p>
      </div>

      <Tabs value={view} onValueChange={setView}>
        <TabsList>
          <TabsTrigger value="tenant" className="gap-1.5">
            <BarChart3 className="h-4 w-4" />
            Business Value
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-1.5" disabled={!isAdmin}>
            <ShieldCheck className="h-4 w-4" />
            Platform Health
            {!isAdmin && <Lock className="h-3 w-3 ml-1 opacity-50" />}
          </TabsTrigger>
          <TabsTrigger value="granular" className="gap-1.5">
            <Layers className="h-4 w-4" />
            Granular Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tenant" className="mt-6">
          <TenantDashboard />
        </TabsContent>

        <TabsContent value="admin" className="mt-6">
          {isAdmin ? (
            <AdminDashboard />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Admin access required to view platform health metrics.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="granular" className="mt-6">
          <GranularObservation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Observe;
