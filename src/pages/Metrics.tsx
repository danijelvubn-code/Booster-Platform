import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Metrics = () => {
  return (
    <div className="container space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Metrics</h1>
        <p className="mt-1 text-muted-foreground">
          Deep observability across usage, latency, errors, and business impact.
        </p>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Requests</CardTitle>
          </CardHeader>
          <CardContent>Coming soon</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latency</CardTitle>
          </CardHeader>
          <CardContent>Coming soon</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rate</CardTitle>
          </CardHeader>
          <CardContent>Coming soon</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost</CardTitle>
          </CardHeader>
          <CardContent>Coming soon</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Metrics;
