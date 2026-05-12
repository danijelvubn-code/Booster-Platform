import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import OnboardingModal from "@/components/OnboardingModal";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { EndpointOverviewCard } from "@/components/EndpointOverviewCard";
import { mvpPath } from "@/config/prototype-shell";
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
      <OnboardingModal />

      <div className="container flex flex-col pt-6 pb-6">
        <section className="flex flex-col gap-3">
          <PageHeader
            titleSize="overview"
            breakAt="md"
            introClassName="max-w-3xl"
            title="Inference Endpoints"
            description="Manage inference endpoints and choose the preferred model for each use case."
            actions={
              <Button className="shrink-0" asChild>
                <Link to={mvpPath("/endpoints/new")}>
                  <Plus className="h-icon-16 w-icon-16" aria-hidden />
                  Create Endpoint
                </Link>
              </Button>
            }
          />

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
