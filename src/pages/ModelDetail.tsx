import { useParams, Link } from "react-router-dom";

import { ModelDetailView } from "@/components/ModelDetailView";
import { Button } from "@/components/ui/button";
import { models } from "@/data/mockData";
import { postMvpPath } from "@/config/prototype-shell";

const ModelDetail = () => {
  const { modelId } = useParams();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return (
      <div className="container py-8">
        <p className="text-body-sm text-muted-foreground">Model not found.</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to={postMvpPath("/cosmos")}>All models</Link>
        </Button>
      </div>
    );
  }

  return <ModelDetailView model={model} cosmosListPath={postMvpPath("/cosmos")} endpointsNewPath={postMvpPath("/endpoints/new")} />;
};

export default ModelDetail;
