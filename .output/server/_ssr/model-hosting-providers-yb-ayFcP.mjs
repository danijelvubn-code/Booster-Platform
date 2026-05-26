const HOSTING_PROVIDER_BOOSTER = "Booster Powered";
const HOSTING_PROVIDER_SCALEWAY = "Scaleway";
const HOSTING_PROVIDER_EUROUTER = "EUrouter";
const HOSTING_PROVIDERS = /* @__PURE__ */ new Set([
  HOSTING_PROVIDER_BOOSTER,
  HOSTING_PROVIDER_SCALEWAY,
  HOSTING_PROVIDER_EUROUTER
]);
function getModelHostingProvider(model) {
  if (HOSTING_PROVIDERS.has(model.hosting)) {
    return model.hosting;
  }
  return HOSTING_PROVIDER_BOOSTER;
}
export {
  HOSTING_PROVIDER_BOOSTER as H,
  getModelHostingProvider as g
};
