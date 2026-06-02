import { o as formatContextWindowShort } from "./router-D-bBPX7r.mjs";
const HOSTING_PROVIDER_BOOSTER = "Booster Hosted";
const HOSTING_PROVIDER_SCALEWAY = "Scaleway";
const HOSTING_PROVIDER_EUROUTER = "EUrouter";
const HOSTING_PROVIDERS = /* @__PURE__ */ new Set([
  HOSTING_PROVIDER_BOOSTER,
  HOSTING_PROVIDER_SCALEWAY,
  HOSTING_PROVIDER_EUROUTER
]);
const HOSTING_PROVIDER_DETAILS = {
  [HOSTING_PROVIDER_BOOSTER]: {
    contextTokens: 0,
    inputPer1M: 0,
    outputPer1M: 0,
    latencyMs: 620,
    tps: 0,
    defaultQuant: "FP16",
    certs: ["GDPR"]
  },
  [HOSTING_PROVIDER_SCALEWAY]: {
    contextTokens: 128e3,
    inputPer1M: 2.8,
    outputPer1M: 8.4,
    latencyMs: 640,
    tps: 26.5,
    defaultQuant: "INT8",
    certs: ["GDPR"]
  },
  [HOSTING_PROVIDER_EUROUTER]: {
    contextTokens: 64e3,
    inputPer1M: 2.5,
    outputPer1M: 7.5,
    latencyMs: 680,
    tps: 24,
    defaultQuant: "INT4",
    certs: ["GDPR"]
  }
};
function getModelHostingProvider(model) {
  if (HOSTING_PROVIDERS.has(model.hosting)) {
    return model.hosting;
  }
  return HOSTING_PROVIDER_BOOSTER;
}
function modelQuantizationLabel(model) {
  if ("quantization" in model && model.quantization) {
    return model.quantization;
  }
  return HOSTING_PROVIDER_DETAILS[getModelHostingProvider(model)].defaultQuant;
}
function hostingProviderToCatalogRow(hostingProvider, model) {
  const template = HOSTING_PROVIDER_DETAILS[hostingProvider];
  const isBooster = hostingProvider === HOSTING_PROVIDER_BOOSTER;
  return {
    id: hostingProvider.toLowerCase().replace(/\s+/g, "-"),
    provider: hostingProvider === HOSTING_PROVIDER_BOOSTER ? "Booster" : hostingProvider,
    context: isBooster ? formatContextWindowShort(model.contextLength) : formatContextWindowShort(template.contextTokens),
    inputPer1M: isBooster ? model.inputCostPer1M : template.inputPer1M,
    outputPer1M: isBooster ? model.outputCostPer1M : template.outputPer1M,
    latencyMs: template.latencyMs,
    tps: isBooster ? model.tokensPerSecond : template.tps,
    quant: modelQuantizationLabel(model),
    certs: template.certs
  };
}
function getModelCatalogProviderRows(model) {
  return [hostingProviderToCatalogRow(getModelHostingProvider(model), model)];
}
export {
  HOSTING_PROVIDER_BOOSTER as H,
  getModelHostingProvider as a,
  HOSTING_PROVIDER_EUROUTER as b,
  HOSTING_PROVIDER_SCALEWAY as c,
  getModelCatalogProviderRows as g
};
