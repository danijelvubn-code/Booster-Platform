import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root, I as Image, F as Fallback } from "../_libs/radix-ui__react-avatar.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
import { p as publicAssetUrl } from "./public-asset-url-539yhzQl.mjs";
const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn(
      "relative flex h-avatar w-avatar shrink-0 overflow-hidden rounded-full [&>*]:size-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = Root.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Image,
  {
    ref,
    className: cn(
      "block size-full max-h-full max-w-full object-cover",
      className
    ),
    ...props
  }
));
AvatarImage.displayName = Image.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn(
      "flex size-full items-center justify-center rounded-full bg-transparent text-muted-foreground text-label",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;
const MODEL_PROVIDER_LOGO_BY_PROVIDER = {
  "Mistral AI": publicAssetUrl("logos/model-sources/mistral.svg"),
  Meta: publicAssetUrl("logos/model-sources/meta.svg"),
  Alibaba: publicAssetUrl("logos/model-sources/alibaba.svg"),
  DeepSeek: publicAssetUrl("logos/model-sources/deep-seek.svg"),
  Google: publicAssetUrl("logos/model-sources/google.svg"),
  OpenAI: publicAssetUrl("logos/model-sources/openai.svg"),
  EuroLLM: publicAssetUrl("logos/model-sources/eurollm.svg"),
  Multiverse: publicAssetUrl("logos/model-sources/multiverse.svg")
};
function getProviderInitials(provider) {
  const parts = provider.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return (first + second).toUpperCase();
  }
  return provider.slice(0, 2).toUpperCase();
}
function getModelProviderLogoSrc(provider, modelName) {
  const p = provider.trim();
  if (p === "Alibaba" && modelName != null && /qwen/i.test(modelName)) {
    return publicAssetUrl("logos/model-sources/qwen.svg");
  }
  return MODEL_PROVIDER_LOGO_BY_PROVIDER[p];
}
export {
  Avatar as A,
  getProviderInitials as a,
  AvatarImage as b,
  AvatarFallback as c,
  getModelProviderLogoSrc as g
};
