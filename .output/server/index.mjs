globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/manifest.json": {
    "type": "application/json",
    "etag": '"1da-bmBkMuBWhZJJ8brh6t3VXJf3Ka0"',
    "mtime": "2026-05-26T14:01:16.039Z",
    "size": 474,
    "path": "../public/manifest.json"
  },
  "/brand/booster-logo-white.svg": {
    "type": "image/svg+xml",
    "etag": '"17e7-Hr3iqGxhlmLG9SxrxBQIDYeIwJY"',
    "mtime": "2026-05-26T14:01:16.037Z",
    "size": 6119,
    "path": "../public/brand/booster-logo-white.svg"
  },
  "/brand/booster-logo-black.svg": {
    "type": "image/svg+xml",
    "etag": '"1794-ve+UEm+WVrrFBdCu+SleyG6JRZo"',
    "mtime": "2026-05-26T14:01:16.037Z",
    "size": 6036,
    "path": "../public/brand/booster-logo-black.svg"
  },
  "/brand/booster-mark.svg": {
    "type": "image/svg+xml",
    "etag": '"210-fO0Iou6k0GyEmo+zCJwI9JXNQaY"',
    "mtime": "2026-05-26T14:01:16.037Z",
    "size": 528,
    "path": "../public/brand/booster-mark.svg"
  },
  "/assets/BackButton-DmsAFvOY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e5-5fD+bmV4IZ+iat7Plpm+fpAyZ30"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 485,
    "path": "../public/assets/BackButton-DmsAFvOY.js"
  },
  "/assets/BoosterLogo-DOKQsrfL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"307-oO2sq05k/o5wmOVPIB9DRVuWMiI"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 775,
    "path": "../public/assets/BoosterLogo-DOKQsrfL.js"
  },
  "/login-cover.webp": {
    "type": "image/webp",
    "etag": '"5db38-2On4Xy24JcjW9k2rvl8U84bWhvA"',
    "mtime": "2026-05-26T14:01:16.040Z",
    "size": 383800,
    "path": "../public/login-cover.webp"
  },
  "/assets/AppSideSheet-BuyD-o-V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2f-ddsJd3rp2yLAsa/xCw1lXQQsdcU"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 3887,
    "path": "../public/assets/AppSideSheet-BuyD-o-V.js"
  },
  "/assets/Combination-CZ2Y7iAI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"41a5-1cbGs8oahRCt78HNIuaE5guzvdY"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 16805,
    "path": "../public/assets/Combination-CZ2Y7iAI.js"
  },
  "/assets/ModelLifecycleAlert-X_R6QByS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bfe-Bh4phPwAsFdPiys+FEQG7Z6HIFk"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 3070,
    "path": "../public/assets/ModelLifecycleAlert-X_R6QByS.js"
  },
  "/assets/CardGrid-yEQ9WvwK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"156-Hn6Tn85OckrB60j13TlHWYuJSHw"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 342,
    "path": "../public/assets/CardGrid-yEQ9WvwK.js"
  },
  "/assets/PageHeader-pt4l9QpF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"662-oTuQ9kzMDGRu4xQqOkQAfoLYBU0"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 1634,
    "path": "../public/assets/PageHeader-pt4l9QpF.js"
  },
  "/assets/PageContainer-BhcHLnad.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"122-WW4vZIlaSzmTqa0rG0hIq5KAw30"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 290,
    "path": "../public/assets/PageContainer-BhcHLnad.js"
  },
  "/tanstack-circle-logo.png": {
    "type": "image/png",
    "etag": '"40cab-HZ1KcYPs7tRjLe4Sd4g6CwKW+W8"',
    "mtime": "2026-05-26T14:01:16.040Z",
    "size": 265387,
    "path": "../public/tanstack-circle-logo.png"
  },
  "/assets/EndpointStatusBadge-COPW3JGB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"292-mRv07JjlSwjVe2OBzCFfjYf8uRc"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 658,
    "path": "../public/assets/EndpointStatusBadge-COPW3JGB.js"
  },
  "/assets/WizardStepper-Cq7tW1JH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1faf-u837nr3bfKAtVl6YhsUa+nbc0yM"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 8111,
    "path": "../public/assets/WizardStepper-Cq7tW1JH.js"
  },
  "/assets/accordion-DXZhw6ix.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9c-Q/Iuyvd5S7Ct0Gj/zrHGrXuSLEI"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 7580,
    "path": "../public/assets/accordion-DXZhw6ix.js"
  },
  "/assets/account-C2YSucBB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d69-+7+afd5F2xPZW/tpILgF8unq37w"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 3433,
    "path": "../public/assets/account-C2YSucBB.js"
  },
  "/assets/activity-CGKhhib8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ec-iEm9vvE2nTP4q0OnSOvf3xpDZ60"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 236,
    "path": "../public/assets/activity-CGKhhib8.js"
  },
  "/assets/arrow-left-BHYjxfCl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-gZ3g4wa7ya/Dy/bddctVp+x+ckQ"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 167,
    "path": "../public/assets/arrow-left-BHYjxfCl.js"
  },
  "/assets/ModelCosmosCard-CQ_w7NAE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f77-ooG42qAzorN5HobLSlBxuU4uK7w"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 8055,
    "path": "../public/assets/ModelCosmosCard-CQ_w7NAE.js"
  },
  "/assets/arrow-right-BFrPTKXi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-vlD5hlVEjr9whgtPdpUd3JMRLNg"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 167,
    "path": "../public/assets/arrow-right-BFrPTKXi.js"
  },
  "/assets/box-D7BbLGgV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"244-s0zsxNsSZh1x1kSWm0iSZdifVmk"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 580,
    "path": "../public/assets/box-D7BbLGgV.js"
  },
  "/assets/badge-CFo4s-7w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e03-xD6GiXTALQ0SA/cU2fqw4AfMeNc"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 3587,
    "path": "../public/assets/badge-CFo4s-7w.js"
  },
  "/assets/button-CK-wdZDI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15e8-A+y5mpflt7lUGubyx3N2nManPjQ"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 5608,
    "path": "../public/assets/button-CK-wdZDI.js"
  },
  "/assets/card-B4EWG2Lr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3db-QnKOzjxMtl8pUf4bQHUcFf67SSg"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 987,
    "path": "../public/assets/card-B4EWG2Lr.js"
  },
  "/assets/check-Uz4l8PmN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"79-dY66FCwergZ1sh22eN+yiWMFuJI"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 121,
    "path": "../public/assets/check-Uz4l8PmN.js"
  },
  "/assets/circle-check-55ZUebkQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"af-iBxWMuRn+kdV33o6jolqlSFOIT4"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 175,
    "path": "../public/assets/circle-check-55ZUebkQ.js"
  },
  "/assets/chevron-down-BdiFVu4B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82-GhO9tNny758nqHf6c9QYBTR762c"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 130,
    "path": "../public/assets/chevron-down-BdiFVu4B.js"
  },
  "/assets/cosmos_._modelId-CqEvf8wB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a45f-OW5FrQ/3nMbPiEZkgbfSzU7frNI"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 42079,
    "path": "../public/assets/cosmos_._modelId-CqEvf8wB.js"
  },
  "/assets/cosmos-DeFXt8GP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1650f-GymRUNQI7rfEcRO4+T1HHiFI8AE"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 91407,
    "path": "../public/assets/cosmos-DeFXt8GP.js"
  },
  "/assets/cosmos_.guided-DxRGhcKX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4ae3-RGP+v5aauRTAusBu2y2dYnCfkPY"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 19171,
    "path": "../public/assets/cosmos_.guided-DxRGhcKX.js"
  },
  "/assets/deploy-CaxNqwag.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"deb-qNqNm8pOKD38Nty2inBy4HVAE4Q"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 3563,
    "path": "../public/assets/deploy-CaxNqwag.js"
  },
  "/assets/dialog-SVkJ4ft2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"885-Hu0jBURN2HmN1Wo+VCQcyS+vDOE"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 2181,
    "path": "../public/assets/dialog-SVkJ4ft2.js"
  },
  "/assets/dropdown-menu-CU3MqvmI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5636-FGfPWGGdi7EuOrwREvSUC/N6JfA"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 22070,
    "path": "../public/assets/dropdown-menu-CU3MqvmI.js"
  },
  "/assets/endpoint-status-gPcWQ30c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1dc-C7rxDL9MiecOfCMUlqRNGXGPP90"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 476,
    "path": "../public/assets/endpoint-status-gPcWQ30c.js"
  },
  "/assets/endpoints._endpointId-Dlg4qkoj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2886-j9OGNzD//6LxzRaJ5h/pYB1ZdqE"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 10374,
    "path": "../public/assets/endpoints._endpointId-Dlg4qkoj.js"
  },
  "/assets/endpoints._endpointId.deploy-C-6SRo-z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e07-xwpxsL64fe2b4+kUiTAnPwqnlQc"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 7687,
    "path": "../public/assets/endpoints._endpointId.deploy-C-6SRo-z.js"
  },
  "/assets/endpoints._endpointId.settings-sTWc3gwd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4dec-lzqbW2xAFCfSmbqmx1P7E0nv/1g"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 19948,
    "path": "../public/assets/endpoints._endpointId.settings-sTWc3gwd.js"
  },
  "/assets/endpoints.create_endpoint-DI7ZKKw9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31aa-c92GgXeovrvummrImmJx0DaRJHg"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 12714,
    "path": "../public/assets/endpoints.create_endpoint-DI7ZKKw9.js"
  },
  "/assets/endpoints.deploy_endpoint-D94GAvwl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e42-gYClgPTfMmKXtlPO7Qa79XCffxw"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 7746,
    "path": "../public/assets/endpoints.deploy_endpoint-D94GAvwl.js"
  },
  "/assets/external-link-CWur4EX7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-Etnx9tHq9zhGBlluKNf8ZdfT25o"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 253,
    "path": "../public/assets/external-link-CWur4EX7.js"
  },
  "/assets/eye-8BijbHPP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-cA3Q/gQ3xvhoYeDk5X1IScbX1Ts"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 253,
    "path": "../public/assets/eye-8BijbHPP.js"
  },
  "/assets/formatters-UwuQ4hmu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-yPB6CjMvavPQKuY7N4fa9zGGcMg"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 167,
    "path": "../public/assets/formatters-UwuQ4hmu.js"
  },
  "/assets/icon-box-Byj_mUJS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c5-3iA65Mm+U9beiFC3hBnB4yXcTJw"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 965,
    "path": "../public/assets/icon-box-Byj_mUJS.js"
  },
  "/assets/index-BINJ9gX-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-xgGWP3/yImADn9SoWaqVsZjH33s"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 232,
    "path": "../public/assets/index-BINJ9gX-.js"
  },
  "/assets/index-CYLRlmUt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d99-i7Wl1nCX/svTdZE5EIbKa2GlW7s"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 3481,
    "path": "../public/assets/index-CYLRlmUt.js"
  },
  "/assets/index-DD6ZXL06.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a44-RhyN3z7hondGLzToOwruCZGqaQw"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 2628,
    "path": "../public/assets/index-DD6ZXL06.js"
  },
  "/assets/index-k9X8Uq-4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"194d-O2PgmSMqpUagddN0SIhBaeWb4p8"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 6477,
    "path": "../public/assets/index-k9X8Uq-4.js"
  },
  "/assets/index--MyyVpbD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"897e3-yF+bf1JsYQILnht+eCTVuzRzt5g"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 563171,
    "path": "../public/assets/index--MyyVpbD.js"
  },
  "/assets/input-DqJxND_i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c10-LNNOqTIbIIIb7xj1l5dkqNAJc0E"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 7184,
    "path": "../public/assets/input-DqJxND_i.js"
  },
  "/assets/model-lifecycle-5MGJifgs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"637-dHpP760e7IqGiFC/42RlbkgDXIU"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 1591,
    "path": "../public/assets/model-lifecycle-5MGJifgs.js"
  },
  "/assets/model-provider-logos-C2Obxu6T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ba1-WecLPvApM8xgWpywxRnVkmDvZnc"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 2977,
    "path": "../public/assets/model-provider-logos-C2Obxu6T.js"
  },
  "/assets/modelPerformanceBenchmark-CLCUbwJk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6e06-f/A0zE38rouUG0LerMSgvMOMnS8"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 28166,
    "path": "../public/assets/modelPerformanceBenchmark-CLCUbwJk.js"
  },
  "/assets/model-hosting-providers-D5-VE1rE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a3-x2fgNAaaIi/99Nw9klxG25lAXSc"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 931,
    "path": "../public/assets/model-hosting-providers-D5-VE1rE.js"
  },
  "/assets/overview-Dfu3MA5w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d50-UiXUb9XqFcap00ePRPsQ7I9WQXU"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 11600,
    "path": "../public/assets/overview-Dfu3MA5w.js"
  },
  "/assets/observe-Ch5b2dZ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"76-6XpqSMIOEdMmIyBwawG7cXWzASc"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 118,
    "path": "../public/assets/observe-Ch5b2dZ6.js"
  },
  "/assets/pagination-window-C-iLRDaA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11d-/3jhn6QikPcCtBQA7flPuuR1314"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 285,
    "path": "../public/assets/pagination-window-C-iLRDaA.js"
  },
  "/assets/plus-ByFGZ6Pw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b-UeT2YL9hShObSXI3kMCWG5Jn7Eg"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 155,
    "path": "../public/assets/plus-ByFGZ6Pw.js"
  },
  "/assets/popover-g180SJ1_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a8f-vi3YXBjqj2AhjT95dSJo+OKdccw"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 6799,
    "path": "../public/assets/popover-g180SJ1_.js"
  },
  "/assets/progress-ZRW6TV_E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e99-jD83cE/FaoqxoU5RRIVa2KwBwGE"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 3737,
    "path": "../public/assets/progress-ZRW6TV_E.js"
  },
  "/assets/public-asset-url-D8itN-Cq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3f-8ia8ybCxBv4nsIK9HyHbo4zfljY"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 63,
    "path": "../public/assets/public-asset-url-D8itN-Cq.js"
  },
  "/assets/rocket-BqcyACn6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c6-sjNp7ifAKAt7/JbN9aIu9MiALIY"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 454,
    "path": "../public/assets/rocket-BqcyACn6.js"
  },
  "/assets/route-C-cBOPQb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cc2-SvG0HpeIkbnfmrH0bWXNhiKjesA"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 7362,
    "path": "../public/assets/route-C-cBOPQb.js"
  },
  "/assets/search-DGEg4-HS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ab-8vKxvwD+4q1k5V68thtHKWFNX0M"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 171,
    "path": "../public/assets/search-DGEg4-HS.js"
  },
  "/assets/set-password-iBK-w3wU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"130e-mzXUGD79fmVTy0+18YGe3BNKcNc"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 4878,
    "path": "../public/assets/set-password-iBK-w3wU.js"
  },
  "/assets/separator-Bb8XpPTM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"296-6IoxzJs0FK+6I0nfICAOWPjix7A"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 662,
    "path": "../public/assets/separator-Bb8XpPTM.js"
  },
  "/assets/settings-CqL0K0S7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a0-yz/WArgq6A/v8MQQDcB4jAWQaUQ"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 672,
    "path": "../public/assets/settings-CqL0K0S7.js"
  },
  "/assets/shield-check-CKwTsa57.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13d-32UlSu6cG5ZRdb1T+77PcAaVjIM"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 317,
    "path": "../public/assets/shield-check-CKwTsa57.js"
  },
  "/assets/sparkles-BRo8iUwf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f0-xSZN8JMMhGmnGh7DSTZh1SSs/IU"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 496,
    "path": "../public/assets/sparkles-BRo8iUwf.js"
  },
  "/assets/sonner-Czw0QwZt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8ed7-8nUP8T4n+8X5GExugc6CAocMmcY"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 36567,
    "path": "../public/assets/sonner-Czw0QwZt.js"
  },
  "/assets/styles-FxSKIo26.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"17f5a-CCUMgKkmS30lPN1zZW9Zzj/wAKE"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 98138,
    "path": "../public/assets/styles-FxSKIo26.css"
  },
  "/assets/table-DkPsP5b0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c22-AjO8K8YdaZOHbHKq88F/i34i3zQ"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 3106,
    "path": "../public/assets/table-DkPsP5b0.js"
  },
  "/assets/trash-2-Bnr3IFa_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14a-QrlHZxdE/Xb+8qx/DDKA/ZKUdGk"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 330,
    "path": "../public/assets/trash-2-Bnr3IFa_.js"
  },
  "/assets/use-auth-SFCcBo0O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24cb-azIT7K6s4rO9Dfpcr+PLj7sXOoc"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 9419,
    "path": "../public/assets/use-auth-SFCcBo0O.js"
  },
  "/assets/useLocation-CK5Sb1dr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-J0c2OJhfkDN8ODG7W2cNcY3r5ME"',
    "mtime": "2026-05-26T14:01:15.438Z",
    "size": 260,
    "path": "../public/assets/useLocation-CK5Sb1dr.js"
  },
  "/assets/video-0eM5N83v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"33e-YM8DazL1J7x5BMBTE4eafJzCxH4"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 830,
    "path": "../public/assets/video-0eM5N83v.js"
  },
  "/assets/zap-M0l-a2AV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"108-3VjKCZC2yTGvlx61lLXaLbWSiRQ"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 264,
    "path": "../public/assets/zap-M0l-a2AV.js"
  },
  "/logos/model-sources/alibaba.svg": {
    "type": "image/svg+xml",
    "etag": '"33a-QrfbIHQ/dwRY8cV6xB72HCOWibs"',
    "mtime": "2026-05-26T14:01:16.037Z",
    "size": 826,
    "path": "../public/logos/model-sources/alibaba.svg"
  },
  "/assets/x-rbr9oxtl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c-LRj9HGXqazDs5NQsuybD5vWtnQE"',
    "mtime": "2026-05-26T14:01:15.439Z",
    "size": 156,
    "path": "../public/assets/x-rbr9oxtl.js"
  },
  "/logos/model-sources/deep-seek.svg": {
    "type": "image/svg+xml",
    "etag": '"e15-KAqTw8DnhOCYAJ2wmapaPeMz5jk"',
    "mtime": "2026-05-26T14:01:16.038Z",
    "size": 3605,
    "path": "../public/logos/model-sources/deep-seek.svg"
  },
  "/logos/model-sources/eurollm.svg": {
    "type": "image/svg+xml",
    "etag": '"20b-lMZkbHKu/02olbxGoxWcm1Evk+I"',
    "mtime": "2026-05-26T14:01:16.038Z",
    "size": 523,
    "path": "../public/logos/model-sources/eurollm.svg"
  },
  "/logos/model-sources/google.svg": {
    "type": "image/svg+xml",
    "etag": '"3178-Fwle3WgmQbGPOvpJ97lYuwzjqEo"',
    "mtime": "2026-05-26T14:01:16.039Z",
    "size": 12664,
    "path": "../public/logos/model-sources/google.svg"
  },
  "/logos/model-sources/meta.svg": {
    "type": "image/svg+xml",
    "etag": '"942-nvltZBGafiu8nZ7AeHg50DkGdno"',
    "mtime": "2026-05-26T14:01:16.038Z",
    "size": 2370,
    "path": "../public/logos/model-sources/meta.svg"
  },
  "/logos/model-sources/mistral.svg": {
    "type": "image/svg+xml",
    "etag": '"37f-8dbcZKZiQ1FP1O/0H4wAt+3ZVo8"',
    "mtime": "2026-05-26T14:01:16.038Z",
    "size": 895,
    "path": "../public/logos/model-sources/mistral.svg"
  },
  "/logos/model-sources/multiverse.svg": {
    "type": "image/svg+xml",
    "etag": '"2130-lUl4GimcpVIwcVkmiXtGTcFuMjo"',
    "mtime": "2026-05-26T14:01:16.038Z",
    "size": 8496,
    "path": "../public/logos/model-sources/multiverse.svg"
  },
  "/logos/model-sources/openai.svg": {
    "type": "image/svg+xml",
    "etag": '"af5-3BRMcSkU696PgmHD5XMYYby261U"',
    "mtime": "2026-05-26T14:01:16.039Z",
    "size": 2805,
    "path": "../public/logos/model-sources/openai.svg"
  },
  "/logos/model-sources/qwen.svg": {
    "type": "image/svg+xml",
    "etag": '"78e-1U+NNqlpxAGvy2eJzxSoJaKm+P4"',
    "mtime": "2026-05-26T14:01:16.038Z",
    "size": 1934,
    "path": "../public/logos/model-sources/qwen.svg"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _uDfO1g = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_VItEEI = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_VItEEI };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_uDfO1g)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
