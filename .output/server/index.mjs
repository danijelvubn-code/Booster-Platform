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
    "mtime": "2026-05-18T07:42:21.675Z",
    "size": 474,
    "path": "../public/manifest.json"
  },
  "/brand/booster-logo-black.svg": {
    "type": "image/svg+xml",
    "etag": '"1794-ve+UEm+WVrrFBdCu+SleyG6JRZo"',
    "mtime": "2026-05-18T07:42:21.673Z",
    "size": 6036,
    "path": "../public/brand/booster-logo-black.svg"
  },
  "/brand/booster-logo-white.svg": {
    "type": "image/svg+xml",
    "etag": '"17e7-Hr3iqGxhlmLG9SxrxBQIDYeIwJY"',
    "mtime": "2026-05-18T07:42:21.673Z",
    "size": 6119,
    "path": "../public/brand/booster-logo-white.svg"
  },
  "/assets/BackButton-Cm-8Ve_c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d4-FObuLvoT5AB4mVf6nXtjA49kB0M"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 468,
    "path": "../public/assets/BackButton-Cm-8Ve_c.js"
  },
  "/brand/booster-mark.svg": {
    "type": "image/svg+xml",
    "etag": '"210-fO0Iou6k0GyEmo+zCJwI9JXNQaY"',
    "mtime": "2026-05-18T07:42:21.673Z",
    "size": 528,
    "path": "../public/brand/booster-mark.svg"
  },
  "/assets/BoosterLogo-BGB5K2hQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"307-yh78S+yZpVpOourVB+7GlZhcGME"',
    "mtime": "2026-05-18T07:42:21.160Z",
    "size": 775,
    "path": "../public/assets/BoosterLogo-BGB5K2hQ.js"
  },
  "/assets/AppSideSheet-XHLmoDB-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"717-j/vInHcwoQHJQrSSOLa1L3ZRCnI"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 1815,
    "path": "../public/assets/AppSideSheet-XHLmoDB-.js"
  },
  "/assets/CardGrid-lK7lLqQf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"156-iOEy1W5J7aL2CRcF317H+b6kXy8"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 342,
    "path": "../public/assets/CardGrid-lK7lLqQf.js"
  },
  "/assets/ModelCosmosCard-BPMHI8mb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f1c-FcUomkyR0r/UYs3tZlwqh5rpEp0"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 7964,
    "path": "../public/assets/ModelCosmosCard-BPMHI8mb.js"
  },
  "/assets/Combination-DbOTPppo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"41a5-TaEStskENid0o1szdhHLPspWnx0"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 16805,
    "path": "../public/assets/Combination-DbOTPppo.js"
  },
  "/assets/PageContainer-ClTrqUa9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"122-aayqRa/NgGNXN7p5GyOdqB45AEs"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 290,
    "path": "../public/assets/PageContainer-ClTrqUa9.js"
  },
  "/assets/PageHeader-D0U2mzLQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"662-0JPVNDSwGCq7avIFH/UYsrVt8kw"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 1634,
    "path": "../public/assets/PageHeader-D0U2mzLQ.js"
  },
  "/tanstack-circle-logo.png": {
    "type": "image/png",
    "etag": '"40cab-HZ1KcYPs7tRjLe4Sd4g6CwKW+W8"',
    "mtime": "2026-05-18T07:42:21.676Z",
    "size": 265387,
    "path": "../public/tanstack-circle-logo.png"
  },
  "/assets/account-CNZGYiY1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d69-TCso51HmLw9c2nv+HJbipTufGt0"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 3433,
    "path": "../public/assets/account-CNZGYiY1.js"
  },
  "/assets/arrow-left-DEI0Lna4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-FpBuxPJXt2EY+b9LENVBCjzNqic"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 167,
    "path": "../public/assets/arrow-left-DEI0Lna4.js"
  },
  "/assets/WizardStepper-CU5YOcCU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32be-Pf9nHcQbw7aWFFTPg32PCDAEu3A"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 12990,
    "path": "../public/assets/WizardStepper-CU5YOcCU.js"
  },
  "/assets/arrow-right-C2JTFTlD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-VscmseRnEn8Mg80jVIUKko4A4CU"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 167,
    "path": "../public/assets/arrow-right-C2JTFTlD.js"
  },
  "/assets/badge-check-ZwG1_RED.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"139-kd0g7CjWxKC5r1EPFODBw4V6ySQ"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 313,
    "path": "../public/assets/badge-check-ZwG1_RED.js"
  },
  "/assets/box-CM8EpfAe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"138-/Gm4PKSNbsu2LstXZ6oaqlo4jyc"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 312,
    "path": "../public/assets/box-CM8EpfAe.js"
  },
  "/assets/card-CwWxUCs0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3db-+PfbU0DN3WuinKJXssZAOj5+Trc"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 987,
    "path": "../public/assets/card-CwWxUCs0.js"
  },
  "/login-cover.webp": {
    "type": "image/webp",
    "etag": '"5db38-2On4Xy24JcjW9k2rvl8U84bWhvA"',
    "mtime": "2026-05-18T07:42:21.676Z",
    "size": 383800,
    "path": "../public/login-cover.webp"
  },
  "/assets/button-Dud_2D3N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15e8-BTxeHyQWeF9wDe6rS/0zshqoPeA"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 5608,
    "path": "../public/assets/button-Dud_2D3N.js"
  },
  "/assets/check-DFC_eVvw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"79-aR6RCFNbpNkHmhGEP7Tlecs5UOQ"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 121,
    "path": "../public/assets/check-DFC_eVvw.js"
  },
  "/assets/chevron-down-BFLEdbo6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82-HZTpcAb3TBIbGwlyVnhZh7kbopU"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 130,
    "path": "../public/assets/chevron-down-BFLEdbo6.js"
  },
  "/assets/circle-check-Dt9-lUb8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"af-hB4d4L2P8J5H2Gm27IAYXbwZfuY"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 175,
    "path": "../public/assets/circle-check-Dt9-lUb8.js"
  },
  "/assets/cosmos-DsgzU6cE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b614-wcIrtM9lrTJ7rIc7mHhtMzlsVSs"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 46612,
    "path": "../public/assets/cosmos-DsgzU6cE.js"
  },
  "/assets/cosmos_.guided-0Bvzhxgp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46f5-/o5bjU8J8G/hNhFA8RoLnb6sPbI"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 18165,
    "path": "../public/assets/cosmos_.guided-0Bvzhxgp.js"
  },
  "/assets/cosmos_._modelId-CkYdAiRR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a563-KPwzdqJwJ+rmj/BvTUkkgDJoxtI"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 42339,
    "path": "../public/assets/cosmos_._modelId-CkYdAiRR.js"
  },
  "/assets/deploy-CyjV4_Pz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dbb-V1I9ok1EP/4XDRDyANIKfoDUF5I"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 3515,
    "path": "../public/assets/deploy-CyjV4_Pz.js"
  },
  "/assets/dialog-fM1sVLgM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"885-k518f/oRS5tbcoTqlcyXP4OWbcU"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 2181,
    "path": "../public/assets/dialog-fM1sVLgM.js"
  },
  "/assets/endpoints._endpointId-BLFPdaT2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1794-Ub7ZwVbGFqfbt5O575Zh1zhuT5c"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 6036,
    "path": "../public/assets/endpoints._endpointId-BLFPdaT2.js"
  },
  "/assets/dropdown-menu-e2TtM4sS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6325-nKaFw1OIUk2UIM7PhXEZ3N+js7g"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 25381,
    "path": "../public/assets/dropdown-menu-e2TtM4sS.js"
  },
  "/assets/endpoints._endpointId.deploy-bp9DxgIS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ce2-C1f+KwJuqqpSwpREeQVcSg8GDtU"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 7394,
    "path": "../public/assets/endpoints._endpointId.deploy-bp9DxgIS.js"
  },
  "/assets/endpoints._endpointId.settings-Cp-ReB-C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a15-zNbdoyZRTAS4u2zi9AleM4rkaoU"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 10773,
    "path": "../public/assets/endpoints._endpointId.settings-Cp-ReB-C.js"
  },
  "/assets/endpoints.create_endpoint-CXkHKYET.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"35ad-pJJFLZe7WYcLmCIyMwp7ZgS47+c"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 13741,
    "path": "../public/assets/endpoints.create_endpoint-CXkHKYET.js"
  },
  "/assets/endpoints.deploy_endpoint-BfjwYXrR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2232-c5g0qlr2gTLHINU0myFCR93mLlI"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 8754,
    "path": "../public/assets/endpoints.deploy_endpoint-BfjwYXrR.js"
  },
  "/assets/external-link-D07lkPg5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-oiGXqXYWko90HhawW41OaG1nvfw"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 253,
    "path": "../public/assets/external-link-D07lkPg5.js"
  },
  "/assets/eye-DolNcA4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-ozoPxmcxg3kexc5edn3dUvydmB0"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 253,
    "path": "../public/assets/eye-DolNcA4b.js"
  },
  "/assets/formatters-UwuQ4hmu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-yPB6CjMvavPQKuY7N4fa9zGGcMg"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 167,
    "path": "../public/assets/formatters-UwuQ4hmu.js"
  },
  "/assets/icon-box-BTt1z8rT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c5-ij10/4uzFL7y+bMrAGTzUz2Zp48"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 965,
    "path": "../public/assets/icon-box-BTt1z8rT.js"
  },
  "/assets/index-CWD0VLyo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a44-Hf27LICmPROqawBHxssTwE3WeKI"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 2628,
    "path": "../public/assets/index-CWD0VLyo.js"
  },
  "/assets/index-Cgj9nwZR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1948-q9T1Q8h+gnBiaxYKZqiwLuArh9k"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 6472,
    "path": "../public/assets/index-Cgj9nwZR.js"
  },
  "/assets/index-DnuV_Pw4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-sN88tF39ZxnWpulZI1cdmz4Wmvw"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 232,
    "path": "../public/assets/index-DnuV_Pw4.js"
  },
  "/assets/index-CvayJLhy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"49f9-4j0/QQhmSR3v1oXFQfc0NWIx9xE"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 18937,
    "path": "../public/assets/index-CvayJLhy.js"
  },
  "/assets/input-DICNNmxs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1bec-r7HxlS5uJzIaZ2RSANExvZ5LWks"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 7148,
    "path": "../public/assets/input-DICNNmxs.js"
  },
  "/assets/model-provider-logos-MYE3nUm8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ba1-SSXdO5Byn/Q+hO0Y42oDE5qG2kg"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 2977,
    "path": "../public/assets/model-provider-logos-MYE3nUm8.js"
  },
  "/assets/observe-D032e72n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"76-sa4xCqC0VUjYbm1My8Mkv0nFKEk"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 118,
    "path": "../public/assets/observe-D032e72n.js"
  },
  "/assets/mockData-Dk2vHKRE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c76f-bKaJf/pzMH7g9MqBrSb31Eg3/5w"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 51055,
    "path": "../public/assets/mockData-Dk2vHKRE.js"
  },
  "/assets/overview-Dn1C5cxb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b7e-E48g/YPvrjgBUlddQm9UgkS3aoo"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 11134,
    "path": "../public/assets/overview-Dn1C5cxb.js"
  },
  "/assets/index-B58lZCG4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"78534-mTH32OaCkIHGCxjU4jkqG95zhHw"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 492852,
    "path": "../public/assets/index-B58lZCG4.js"
  },
  "/assets/plus-Dr2ZuEOv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b-zv8B78sT6f4FFpXfodrvhk0E3wI"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 155,
    "path": "../public/assets/plus-Dr2ZuEOv.js"
  },
  "/assets/progress-DpvsgBRn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e99-SE0y3kZfeMcBegXJUPaRY3Sv3P8"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 3737,
    "path": "../public/assets/progress-DpvsgBRn.js"
  },
  "/assets/popover-CgivSrPr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"19cc-eVM29tz6QjlWaa9jZqFQaa8UPZA"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 6604,
    "path": "../public/assets/popover-CgivSrPr.js"
  },
  "/assets/public-asset-url-D8itN-Cq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3f-8ia8ybCxBv4nsIK9HyHbo4zfljY"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 63,
    "path": "../public/assets/public-asset-url-D8itN-Cq.js"
  },
  "/assets/rocket-BsHoPPHH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c6-UQJYvhQwtUgeWyG4Tqst6M+S7a8"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 454,
    "path": "../public/assets/rocket-BsHoPPHH.js"
  },
  "/assets/route-CkxzUr8V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ff0-KwjgnqCyoeRpwex0A79PNt3s6ho"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 8176,
    "path": "../public/assets/route-CkxzUr8V.js"
  },
  "/assets/search-LVFRcD6i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ab-+pH1PHDgz4FxyQrYFyolJnEGqZg"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 171,
    "path": "../public/assets/search-LVFRcD6i.js"
  },
  "/assets/set-password-C4GjxL1t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"130e-RuFzTeytBEZnFo9BpYezmPh/VKE"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 4878,
    "path": "../public/assets/set-password-C4GjxL1t.js"
  },
  "/assets/select-B9g0BWtY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"583d-NsK3iRw7q4GgfDbSGLzl+psmpw8"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 22589,
    "path": "../public/assets/select-B9g0BWtY.js"
  },
  "/assets/settings-BVfoqds2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a0-C+i3xVq1MtC0ksGcgdPXskOprtg"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 672,
    "path": "../public/assets/settings-BVfoqds2.js"
  },
  "/assets/sheet-BUYo7859.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"abb-WiSLp1S/xUbYM5PQ6/OodUhVO6E"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 2747,
    "path": "../public/assets/sheet-BUYo7859.js"
  },
  "/assets/separator-LtXYWztH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5cb-OtbInLGJz3AVHppvrPxrK/NVhec"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 1483,
    "path": "../public/assets/separator-LtXYWztH.js"
  },
  "/assets/shield-check-CRmutPoI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-nH2dqE29I91+RM3P00t7qLabbxk"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 495,
    "path": "../public/assets/shield-check-CRmutPoI.js"
  },
  "/assets/table-Bp6VroH0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c22-KiCrzEMxwDhTxTR9sQ6dW1c/M3g"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 3106,
    "path": "../public/assets/table-Bp6VroH0.js"
  },
  "/assets/sparkles-Bhh6fZmZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f0-brCOaUbuCS0lz3TXqT4zw7ze4Mw"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 496,
    "path": "../public/assets/sparkles-Bhh6fZmZ.js"
  },
  "/assets/trash-2-DcJ0X_W2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14a-+xK6OeYG40zC2azqPpbe4/SkPfg"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 330,
    "path": "../public/assets/trash-2-DcJ0X_W2.js"
  },
  "/assets/use-auth-DKuhb7B0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24d6-oc489cN7kqHvyFHDZloMsJOgPR0"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 9430,
    "path": "../public/assets/use-auth-DKuhb7B0.js"
  },
  "/assets/useLocation-mvttvBk2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-g+nZG1PHUzrw5Cxe+DYcLJBXDV0"',
    "mtime": "2026-05-18T07:42:21.162Z",
    "size": 258,
    "path": "../public/assets/useLocation-mvttvBk2.js"
  },
  "/assets/x-CyecZIya.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c-JsBNnhXQ3cZOP3ZT7EdMyHpVkTw"',
    "mtime": "2026-05-18T07:42:21.163Z",
    "size": 156,
    "path": "../public/assets/x-CyecZIya.js"
  },
  "/assets/zap-DiMiV9mX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"108-FXB3NoM4SwKJS75dqOgAamHvByk"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 264,
    "path": "../public/assets/zap-DiMiV9mX.js"
  },
  "/logos/model-sources/alibaba.svg": {
    "type": "image/svg+xml",
    "etag": '"33a-QrfbIHQ/dwRY8cV6xB72HCOWibs"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 826,
    "path": "../public/logos/model-sources/alibaba.svg"
  },
  "/logos/model-sources/deep-seek.svg": {
    "type": "image/svg+xml",
    "etag": '"e15-KAqTw8DnhOCYAJ2wmapaPeMz5jk"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 3605,
    "path": "../public/logos/model-sources/deep-seek.svg"
  },
  "/assets/styles-DkuMJusa.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"15e83-sV+XE88WxxOY0O+fL8Hro3F7Vhk"',
    "mtime": "2026-05-18T07:42:21.161Z",
    "size": 89731,
    "path": "../public/assets/styles-DkuMJusa.css"
  },
  "/logos/model-sources/eurollm.svg": {
    "type": "image/svg+xml",
    "etag": '"20b-lMZkbHKu/02olbxGoxWcm1Evk+I"',
    "mtime": "2026-05-18T07:42:21.673Z",
    "size": 523,
    "path": "../public/logos/model-sources/eurollm.svg"
  },
  "/logos/model-sources/google.svg": {
    "type": "image/svg+xml",
    "etag": '"3178-Fwle3WgmQbGPOvpJ97lYuwzjqEo"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 12664,
    "path": "../public/logos/model-sources/google.svg"
  },
  "/logos/model-sources/meta.svg": {
    "type": "image/svg+xml",
    "etag": '"942-nvltZBGafiu8nZ7AeHg50DkGdno"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 2370,
    "path": "../public/logos/model-sources/meta.svg"
  },
  "/logos/model-sources/mistral.svg": {
    "type": "image/svg+xml",
    "etag": '"37f-8dbcZKZiQ1FP1O/0H4wAt+3ZVo8"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 895,
    "path": "../public/logos/model-sources/mistral.svg"
  },
  "/logos/model-sources/multiverse.svg": {
    "type": "image/svg+xml",
    "etag": '"2130-lUl4GimcpVIwcVkmiXtGTcFuMjo"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 8496,
    "path": "../public/logos/model-sources/multiverse.svg"
  },
  "/logos/model-sources/qwen.svg": {
    "type": "image/svg+xml",
    "etag": '"78e-1U+NNqlpxAGvy2eJzxSoJaKm+P4"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 1934,
    "path": "../public/logos/model-sources/qwen.svg"
  },
  "/logos/model-sources/openai.svg": {
    "type": "image/svg+xml",
    "etag": '"af5-3BRMcSkU696PgmHD5XMYYby261U"',
    "mtime": "2026-05-18T07:42:21.674Z",
    "size": 2805,
    "path": "../public/logos/model-sources/openai.svg"
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
