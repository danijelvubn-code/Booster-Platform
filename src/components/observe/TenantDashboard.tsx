import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { endpoints, deployments } from "@/data/mockData";

// Latency data per endpoint
const latencyData = endpoints
  .filter((ep) => ep.id !== "sp-default")
  .map((ep) => {
    const deps = deployments[ep.id] || [];
    const defaultDep = deps.find((d) => d.mode === "Default");
    const currentP95 = defaultDep ? Math.round(defaultDep.latencyP50 * 1.8 + Math.random() * 80) : 0;
    return { endpoint: ep.name, currentP95 };
  });

const TenantDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Section: Response Times */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Response Times</h2>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Current P95 Latency by Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latencyData.map((d) => (
                <div key={d.endpoint} className="flex items-center gap-4">
                  <span className="text-sm w-44 truncate">{d.endpoint}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min((d.currentP95 / 1000) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-20 text-right">{d.currentP95}ms</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TenantDashboard;
