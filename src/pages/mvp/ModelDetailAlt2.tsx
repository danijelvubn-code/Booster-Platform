/**
 * MVP — Model detail alternative (2).
 *
 * Separate route module (`/mvp/cosmos/:modelId/alt2`); middle column on MVP Cosmos links here.
 * Implementation: renders alternative (1) so the UI cannot drift — fork by copying markup from
 * `ModelDetailAlt.tsx` into this file when you want alt2 to diverge.
 *
 * Siblings: `ModelDetail.tsx` (default), `ModelDetailAlt.tsx` (`/alt`)
 */
import MvpModelDetailAlt from "./ModelDetailAlt";

export default function MvpModelDetailAlt2() {
  return <MvpModelDetailAlt endpointFlowPath="/mvp/cosmos/:modelId/alt2/endpoints/new" />;
}
