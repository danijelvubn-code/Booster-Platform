import { n as modelHasVisionCapability, g as getOverallModelScore, x as getMathScore, w as getReasoningScore, v as getCodingScore } from "./router-D-bBPX7r.mjs";
const PARAM_RE = /(\d+(?:\.\d+)?)\s*B\b/i;
function getParamBillions(model) {
  const m = model.name.match(PARAM_RE);
  return m ? Number.parseFloat(m[1]) : null;
}
function getCatalogModalities(model) {
  const out = ["text"];
  if (modelHasVisionCapability(model)) out.push("image");
  const blob = `${model.description} ${model.strengths.join(" ")}`.toLowerCase();
  if (blob.includes("audio") || blob.includes("speech") || blob.includes("tts") || blob.includes("whisper") || blob.includes("voice")) {
    out.push("audio");
  }
  if (blob.includes("video")) out.push("video");
  return out;
}
function getCatalogApiCapabilities(model) {
  const caps = /* @__PURE__ */ new Set(["Chat Completions"]);
  const p = model.provider;
  if (p === "OpenAI" || p === "Google" || p === "Mistral AI" || p === "Meta" || p === "Alibaba" || p === "DeepSeek") {
    caps.add("Responses");
  }
  if (p === "OpenAI" || model.name.includes("GPT")) {
    caps.add("Embeddings");
    caps.add("Classify");
    caps.add("Score");
    caps.add("Audio Transcriptions");
    caps.add("Audio Translations");
  }
  if (p === "Google" || model.name.toLowerCase().includes("gemini")) {
    caps.add("Embeddings");
    caps.add("Rerank");
    caps.add("Score");
  }
  if (p === "Mistral AI") {
    caps.add("Embeddings");
    caps.add("Rerank");
    caps.add("Classify");
  }
  if (p === "Meta" || model.name.includes("Llama")) {
    caps.add("Embeddings");
    caps.add("Chat Completions Legacy");
  }
  if (p === "Alibaba" || p === "DeepSeek") {
    caps.add("Embeddings");
  }
  return [...caps].sort();
}
function getCatalogFeatures(model) {
  const out = /* @__PURE__ */ new Set(["Streaming"]);
  const p = model.provider;
  if (p === "OpenAI" || p === "Google" || p === "Mistral AI" || p === "Meta" || p === "Alibaba" || p === "DeepSeek") {
    out.add("Tool Use");
  }
  if (p === "OpenAI" || model.name.toLowerCase().includes("gemini")) {
    out.add("Structured Outputs");
  }
  const reasoningCap = model.capabilities.find((c) => c.name === "Reasoning");
  if (reasoningCap && reasoningCap.score >= 85) {
    out.add("Reasoning");
  }
  if (p === "OpenAI" || p === "Mistral AI") {
    out.add("Stream Cancellation");
  }
  return [...out].sort();
}
function getCapabilityCategoryScore(model, category) {
  switch (category) {
    case "Coding": {
      const s = getCodingScore(model);
      return s > 0 ? s : null;
    }
    case "Agents": {
      const s = getReasoningScore(model);
      return s > 0 ? s : null;
    }
    case "Scientific Reasoning": {
      const s = getMathScore(model);
      return s > 0 ? s : null;
    }
    case "General": {
      const lang = model.capabilities.find((c) => c.name === "Language");
      if (lang) return lang.score;
      const overall = getOverallModelScore(model);
      return overall > 0 ? overall : null;
    }
    default:
      return null;
  }
}
const CAPABILITY_CATEGORY_MATCHERS = {
  Agents: /efficiency|agent|batch|throughput/i,
  Coding: /code|programming|debug/i,
  General: /language|multilingual|knowledge|custom/i,
  "Scientific Reasoning": /reasoning|math|logical|scientific/i
};
function getCapabilityCategoryRecords(model, category) {
  const matcher = CAPABILITY_CATEGORY_MATCHERS[category];
  return model.capabilities.filter((cap) => matcher.test(cap.name));
}
function getCapabilitySubcategoryNames(model, category) {
  return getCapabilityCategoryRecords(model, category).flatMap(
    (cap) => cap.subs.map((sub) => sub.name)
  );
}
function getCapabilitySubcategoryScore(model, category, subcategory) {
  for (const cap of getCapabilityCategoryRecords(model, category)) {
    const sub = cap.subs.find((item) => item.name === subcategory);
    if (sub) return sub.score;
  }
  return null;
}
function capabilitySubcategoryViableAtMinScore(catalog, category, subcategory, minScore) {
  if (minScore <= 0) return true;
  for (const m of catalog) {
    const catScore = getCapabilityCategoryScore(m, category);
    if (catScore == null || catScore < minScore) continue;
    const subScore = getCapabilitySubcategoryScore(m, category, subcategory);
    if (subScore != null && subScore >= minScore) return true;
  }
  return false;
}
function getLicenseCategory(model) {
  if (model.provider === "Meta" || model.name.toLowerCase().includes("llama")) {
    return "Open source";
  }
  if (model.status === "Beta") return "Research";
  return "Commercial";
}
function getModelOriginLabel(model) {
  return model.provider;
}
function getModelBaseFamily(model) {
  const n = model.name;
  if (/llama/i.test(n)) return "Llama family";
  if (/mistral/i.test(n)) return "Mistral family";
  if (/gemini/i.test(n)) return "Gemini family";
  if (/qwen/i.test(n)) return "Qwen family";
  if (/gpt/i.test(n)) return "GPT family";
  return null;
}
function getCatalogDataTypes(_model) {
  return ["bf16", "fp16"];
}
function getCatalogAccessFormats(_model) {
  return ["API", "Managed"];
}
function getCatalogQuantizations(model) {
  const out = ["None"];
  const quantization = "quantization" in model ? model.quantization : void 0;
  if (quantization === "INT8") out.push("int8");
  if (quantization === "INT4") out.push("int4");
  return out;
}
export {
  getCatalogApiCapabilities as a,
  getCatalogFeatures as b,
  getCapabilityCategoryScore as c,
  getCapabilitySubcategoryScore as d,
  getLicenseCategory as e,
  getCatalogDataTypes as f,
  getCatalogModalities as g,
  getCatalogAccessFormats as h,
  getCatalogQuantizations as i,
  getModelOriginLabel as j,
  getModelBaseFamily as k,
  getParamBillions as l,
  getCapabilitySubcategoryNames as m,
  capabilitySubcategoryViableAtMinScore as n
};
