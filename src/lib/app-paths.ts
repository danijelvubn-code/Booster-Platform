import type { AppTrack } from "@/contexts/AuthContext";
import { mvpPath, postMvpPath } from "@/config/prototype-shell";

export function endpointDetailPath(endpointId: string, track: AppTrack): string {
  return track === "mvp" ? mvpPath(`/endpoints/${endpointId}`) : postMvpPath(`/endpoints/${endpointId}`);
}

export function endpointEditPath(endpointId: string, track: AppTrack): string {
  return track === "mvp" ? mvpPath(`/endpoints/${endpointId}/edit`) : postMvpPath(`/endpoints/${endpointId}/edit`);
}

/** List / hub used by endpoint detail “back” navigation */
export function endpointsHubPath(track: AppTrack): string {
  return track === "mvp" ? mvpPath("/overview") : postMvpPath("/endpoints");
}
