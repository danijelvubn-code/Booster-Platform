import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EndpointOverviewCard } from "@/components/EndpointOverviewCard";
import { endpoints } from "@/data/mockData";

const overviewEndpoints = [...endpoints]
  .filter((e) => e.id !== "sp-default")
  .sort((a, b) => b.budgetUsed - a.budgetUsed)
  .slice(0, 4);

/**
 * MVP overview — leaner than post-MVP: no KPI tiles or charts, just the endpoints list.
 * Edit independently from `pages/Overview.tsx`.
 */
const MvpOverview = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-background">
      <div className="container flex flex-col pt-6 pb-6">
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-1">
              <h2 className="text-lg font-semibold text-foreground">Endpoints Above Average Usage</h2>
              <p className="text-body-sm text-muted-foreground">
                Endpoints consuming more tokens than their expected monthly average based on their budget.
              </p>
            </div>
            <Button className="shrink-0" asChild>
              <Link to="/mvp/endpoints/new">
                <Plus className="h-icon-16 w-icon-16" aria-hidden />
                Create Endpoint
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {overviewEndpoints.map((ep) => (
              <EndpointOverviewCard key={ep.id} ep={ep} variant="basic" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MvpOverview;
