const ENDPOINT_STATUS_LABELS = {
  Deploying: "Deploying",
  Running: "Running"
};
function resolveEndpointStatus(endpoint) {
  if (endpoint.status === "Deploying" || endpoint.status === "Running") {
    return endpoint.status;
  }
  if (endpoint.health === "OK") return "Running";
  if (endpoint.health === "At Risk") return "Deploying";
  return "Running";
}
function getEndpointStatusLabel(status) {
  return ENDPOINT_STATUS_LABELS[status];
}
function getEndpointStatusBadgeVariant(status) {
  switch (status) {
    case "Deploying":
      return "info";
    case "Running":
      return "success";
    default:
      return "info";
  }
}
function getEndpointStatusDotClassName(status) {
  switch (status) {
    case "Deploying":
      return "bg-info";
    case "Running":
      return "bg-success";
    default:
      return "bg-info";
  }
}
export {
  getEndpointStatusLabel as a,
  getEndpointStatusBadgeVariant as b,
  getEndpointStatusDotClassName as g,
  resolveEndpointStatus as r
};
