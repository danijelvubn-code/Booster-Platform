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
    "mtime": "2026-05-21T08:05:44.532Z",
    "size": 474,
    "path": "../public/manifest.json"
  },
  "/brand/booster-logo-black.svg": {
    "type": "image/svg+xml",
    "etag": '"1794-ve+UEm+WVrrFBdCu+SleyG6JRZo"',
    "mtime": "2026-05-21T08:05:44.530Z",
    "size": 6036,
    "path": "../public/brand/booster-logo-black.svg"
  },
  "/brand/booster-mark.svg": {
    "type": "image/svg+xml",
    "etag": '"210-fO0Iou6k0GyEmo+zCJwI9JXNQaY"',
    "mtime": "2026-05-21T08:05:44.530Z",
    "size": 528,
    "path": "../public/brand/booster-mark.svg"
  },
  "/brand/booster-logo-white.svg": {
    "type": "image/svg+xml",
    "etag": '"17e7-Hr3iqGxhlmLG9SxrxBQIDYeIwJY"',
    "mtime": "2026-05-21T08:05:44.530Z",
    "size": 6119,
    "path": "../public/brand/booster-logo-white.svg"
  },
  "/assets/AppSideSheet-DPttMOug.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111a-JrwjsuHBgD2GWX9cEdcGiUJk+9E"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 4378,
    "path": "../public/assets/AppSideSheet-DPttMOug.js"
  },
  "/login-cover.webp": {
    "type": "image/webp",
    "etag": '"5db38-2On4Xy24JcjW9k2rvl8U84bWhvA"',
    "mtime": "2026-05-21T08:05:44.533Z",
    "size": 383800,
    "path": "../public/login-cover.webp"
  },
  "/assets/BackButton-B4mPwaXm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e5-DqGEAAGJ3leO02q9dzgj33gRf4A"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 485,
    "path": "../public/assets/BackButton-B4mPwaXm.js"
  },
  "/assets/BoosterLogo-BvweN6nE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"307-q7JG86Ec1NHabje8aY2GlzTRHic"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 775,
    "path": "../public/assets/BoosterLogo-BvweN6nE.js"
  },
  "/assets/CardGrid-Bmspn0uv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"156-vg8gWudEdMsSMYOc5+p4fBklCkQ"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 342,
    "path": "../public/assets/CardGrid-Bmspn0uv.js"
  },
  "/tanstack-circle-logo.png": {
    "type": "image/png",
    "etag": '"40cab-HZ1KcYPs7tRjLe4Sd4g6CwKW+W8"',
    "mtime": "2026-05-21T08:05:44.532Z",
    "size": 265387,
    "path": "../public/tanstack-circle-logo.png"
  },
  "/assets/Combination-CfY_XTsW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"41a5-w2UUVAqNyoJzuzfss/Zn6O2tTvY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 16805,
    "path": "../public/assets/Combination-CfY_XTsW.js"
  },
  "/assets/ModelCosmosCard-CGlbhw8h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d33-RNpKXTa3Xy1O1qqLCQoCrBbrUjo"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 7475,
    "path": "../public/assets/ModelCosmosCard-CGlbhw8h.js"
  },
  "/assets/PageContainer-CcfvdSzV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"122-rxsbIU9XZaXGDGZUObTUBy8/UE8"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 290,
    "path": "../public/assets/PageContainer-CcfvdSzV.js"
  },
  "/assets/PageHeader-CKIWLBwp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"662-WVfiGbXHeHqgzQoa8a/m2bF7oyg"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 1634,
    "path": "../public/assets/PageHeader-CKIWLBwp.js"
  },
  "/assets/WizardStepper-BP9qCP9M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32bb-aIXjpGaYXzBbAIQ+eCQi3/acZls"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 12987,
    "path": "../public/assets/WizardStepper-BP9qCP9M.js"
  },
  "/assets/accordion-DKxcuFpK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20ce-MVrLsl4teAd8ITYdnRlfIoNrN2c"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 8398,
    "path": "../public/assets/accordion-DKxcuFpK.js"
  },
  "/assets/account-C3ELPki2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e12-B+F72I5xpX9zNEd9szFx84AQnbo"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 3602,
    "path": "../public/assets/account-C3ELPki2.js"
  },
  "/assets/arrow-left-CpO7NBY-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-oBFm45Fzl9zruUptlJlBaNyR640"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 167,
    "path": "../public/assets/arrow-left-CpO7NBY-.js"
  },
  "/assets/arrow-right-i7j1ejWv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-Kf+2AraEB3AFvrK6w0d3ZTgz2sM"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 167,
    "path": "../public/assets/arrow-right-i7j1ejWv.js"
  },
  "/assets/badge-B6ym9mpX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e1d-EzVrhdTX2J/yr2cFeuW1vHgxHzY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 3613,
    "path": "../public/assets/badge-B6ym9mpX.js"
  },
  "/assets/box-D-94lS95.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"138-7dc3F42Ti7sfQPhykvP9W/SNsmg"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 312,
    "path": "../public/assets/box-D-94lS95.js"
  },
  "/assets/badge-check-BW5vKXlB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"139-GJwgNVcB7Dxz/XiQBwJzvMGXzYg"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 313,
    "path": "../public/assets/badge-check-BW5vKXlB.js"
  },
  "/assets/button-DWowYaXA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15e8-Ypx0jBSE4jB3LnF1MXr9/1Aubeo"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 5608,
    "path": "../public/assets/button-DWowYaXA.js"
  },
  "/assets/card-pUr6e8ff.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3db-uP5LO8eiLzXy62m09UP6ajk1mAQ"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 987,
    "path": "../public/assets/card-pUr6e8ff.js"
  },
  "/assets/check-DLAVPbRV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"79-t/6cYDmaVO2Ik0tTikinZSNk3VA"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 121,
    "path": "../public/assets/check-DLAVPbRV.js"
  },
  "/assets/chevron-down-Bserh218.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82-QKIUODdKmQ3gDLIxiar3WUBo9cY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 130,
    "path": "../public/assets/chevron-down-Bserh218.js"
  },
  "/assets/circle-check-DQwjgMec.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"af-TJaoKue8CY+A54JQt3g0wUD6j2I"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 175,
    "path": "../public/assets/circle-check-DQwjgMec.js"
  },
  "/assets/cosmos_._modelId-CCVpYyxr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f86-ASdeDZK3Jqq4rVR/HQ/QWFrs9L8"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 36742,
    "path": "../public/assets/cosmos_._modelId-CCVpYyxr.js"
  },
  "/assets/cosmos-DF0wCGQN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e00-Zcj79R6jzDQ34gwHiWzCYte5whE"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 69120,
    "path": "../public/assets/cosmos-DF0wCGQN.js"
  },
  "/assets/cosmos_.guided-DtpEVDFV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"46f5-nBppZjI26NrFe3Kxy6VcHLYz0fM"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 18165,
    "path": "../public/assets/cosmos_.guided-DtpEVDFV.js"
  },
  "/assets/deploy-cbEOV4Vt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"db8-vFb5gsnoFnFzu+4sOixtAWtKTKA"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 3512,
    "path": "../public/assets/deploy-cbEOV4Vt.js"
  },
  "/assets/dialog-Dy8DQ0L4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"885-Vqsw9gF/JyDY7UwpXHqOYsRICqA"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 2181,
    "path": "../public/assets/dialog-Dy8DQ0L4.js"
  },
  "/assets/dropdown-menu-i26WZ-TN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6324-Dbq2nIDWLJTpVQFPDyNAqLc4kZE"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 25380,
    "path": "../public/assets/dropdown-menu-i26WZ-TN.js"
  },
  "/assets/endpoints._endpointId-CPbFWj37.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2822-nbiRUmc8qZUQNtjVsvGsjZdp/+U"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 10274,
    "path": "../public/assets/endpoints._endpointId-CPbFWj37.js"
  },
  "/assets/endpoints._endpointId.deploy-Bq7S0tkX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d35-1s3zlzEzcqsjS5X8L6fwIki29lU"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 7477,
    "path": "../public/assets/endpoints._endpointId.deploy-Bq7S0tkX.js"
  },
  "/assets/endpoints._endpointId.settings-e0U38NRP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4dec-6yrCeO4pagEldM705I5ABlNP7JQ"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 19948,
    "path": "../public/assets/endpoints._endpointId.settings-e0U38NRP.js"
  },
  "/assets/endpoints.create_endpoint-AwSaOOaZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3568-HOa2wMAFHhHzr700kbPmORJB+yc"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 13672,
    "path": "../public/assets/endpoints.create_endpoint-AwSaOOaZ.js"
  },
  "/assets/endpoints.deploy_endpoint-DkjRPcEr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2239-XIiEgztYakgidTncVIyZdw9LaLY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 8761,
    "path": "../public/assets/endpoints.deploy_endpoint-DkjRPcEr.js"
  },
  "/assets/eye-BnyNUf1z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-rmCprNKGYX6N9Jmk5hooUiMEHBc"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 253,
    "path": "../public/assets/eye-BnyNUf1z.js"
  },
  "/assets/formatters-UwuQ4hmu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-yPB6CjMvavPQKuY7N4fa9zGGcMg"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 167,
    "path": "../public/assets/formatters-UwuQ4hmu.js"
  },
  "/assets/external-link-DkcaulQ2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-spGGVARt9I0j+rPRQHgLVpGrIqs"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 253,
    "path": "../public/assets/external-link-DkcaulQ2.js"
  },
  "/assets/icon-box-DgMjZTIB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c5-kggplyBRsFkmieCJ+Drza0tHS8c"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 965,
    "path": "../public/assets/icon-box-DgMjZTIB.js"
  },
  "/assets/index-BbGliiVj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"194d-5VhnlI18dqq/mawo61/z8rzvHvE"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 6477,
    "path": "../public/assets/index-BbGliiVj.js"
  },
  "/assets/index-DoZl4q09.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-/xbm8HDkeqe6bcX/Rlft0ZO+T4E"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 232,
    "path": "../public/assets/index-DoZl4q09.js"
  },
  "/assets/index-vmZfZFgD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a44-i8z/EjsP3F3TFRAVN9On2cx74zM"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 2628,
    "path": "../public/assets/index-vmZfZFgD.js"
  },
  "/assets/input-BiReqs_B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c10-zIaqoTa6b4Dvfixo/s9VKKqUaKM"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 7184,
    "path": "../public/assets/input-BiReqs_B.js"
  },
  "/assets/model-provider-logos-D_LDDPVO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ba1-oouyLNI/dFYTFfiLXmZG47imeok"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 2977,
    "path": "../public/assets/model-provider-logos-D_LDDPVO.js"
  },
  "/assets/observe-Dp5u60j-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"76-7OssWd+1M7TyHwdaYN6w9CV3JVE"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 118,
    "path": "../public/assets/observe-Dp5u60j-.js"
  },
  "/assets/overview-CtppO4uu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c1c-U1EIzmpyG+CSqxRkTLGyJAaPD7w"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 11292,
    "path": "../public/assets/overview-CtppO4uu.js"
  },
  "/assets/index-DOwHLRfg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"84eb2-OMfloyQ0iijLgRWXD+z8ZuB9wUE"',
    "mtime": "2026-05-21T08:05:43.897Z",
    "size": 544434,
    "path": "../public/assets/index-DOwHLRfg.js"
  },
  "/assets/plus-BCg4CmLu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b-WWPpnBVUi+D5QMnFc3DU9OMSXQY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 155,
    "path": "../public/assets/plus-BCg4CmLu.js"
  },
  "/assets/pagination-window-C-iLRDaA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11d-/3jhn6QikPcCtBQA7flPuuR1314"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 285,
    "path": "../public/assets/pagination-window-C-iLRDaA.js"
  },
  "/assets/progress-CWMoMwOf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e99-SY31W3hYYunpGTVfLr4jOy7hgaY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 3737,
    "path": "../public/assets/progress-CWMoMwOf.js"
  },
  "/assets/popover-Dsp8GvVD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a8a-Ti7h7iiAlurhw1eWgbJW/CfXX/g"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 6794,
    "path": "../public/assets/popover-Dsp8GvVD.js"
  },
  "/assets/public-asset-url-D8itN-Cq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3f-8ia8ybCxBv4nsIK9HyHbo4zfljY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 63,
    "path": "../public/assets/public-asset-url-D8itN-Cq.js"
  },
  "/assets/rocket-BXcp1EMq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c6-pagdLrTNE4hz1kENOA5LqXcxLtk"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 454,
    "path": "../public/assets/rocket-BXcp1EMq.js"
  },
  "/assets/route-p60IJV9a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ca6-iB0l/UjUPebdrgWH7b6s5B2rnJI"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 7334,
    "path": "../public/assets/route-p60IJV9a.js"
  },
  "/assets/search-fDUkXjXG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ab-6ZWdOUDxnM1YZuNkKKmFQvYOYa0"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 171,
    "path": "../public/assets/search-fDUkXjXG.js"
  },
  "/assets/select-CViD21Go.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"583f-6QM0wjVMsNpMNZhcE4rOrzlQwaA"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 22591,
    "path": "../public/assets/select-CViD21Go.js"
  },
  "/assets/separator-YkxStLEC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"296-qiz3VvO+Kss62EzYfFjdXmiPRI0"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 662,
    "path": "../public/assets/separator-YkxStLEC.js"
  },
  "/assets/set-password-D7tX7Itr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"130e-535okVHciGv3Hi+m5pXIeFzYkj4"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 4878,
    "path": "../public/assets/set-password-D7tX7Itr.js"
  },
  "/assets/shield-check-BqHo2zLs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13d-QKdvbPVtO21mnwtPOAWebSSLo+c"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 317,
    "path": "../public/assets/shield-check-BqHo2zLs.js"
  },
  "/assets/settings-BA0spleV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a0-BbDuF9b39X9r4m1D2s80SwXd0HM"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 672,
    "path": "../public/assets/settings-BA0spleV.js"
  },
  "/assets/sonner-x-fBMPw3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8ed7-71V8TGtygijsGIcGkfdflKgp8LY"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 36567,
    "path": "../public/assets/sonner-x-fBMPw3.js"
  },
  "/assets/sparkles-BoEeIfpR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f0-H6Jv0EIBnsQ4kvjLKJ/nNNTe31g"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 496,
    "path": "../public/assets/sparkles-BoEeIfpR.js"
  },
  "/assets/table-CrnbzThu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c22-v4k2H/W8ZIC1wQZwukrU0a6xFoU"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 3106,
    "path": "../public/assets/table-CrnbzThu.js"
  },
  "/assets/trash-2-B5KmUxpI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14a-AV/8Gybd0NwIc6S26h9JqsMRhDc"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 330,
    "path": "../public/assets/trash-2-B5KmUxpI.js"
  },
  "/assets/use-auth-CKuhtzyO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24d8-QalFe6+5VYDs5rFgkZ9/qMI1hn4"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 9432,
    "path": "../public/assets/use-auth-CKuhtzyO.js"
  },
  "/assets/useLocation-B9P8i9CM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-dvaJErZLIHGd+vXSL/16S3k5ZpA"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 260,
    "path": "../public/assets/useLocation-B9P8i9CM.js"
  },
  "/assets/x-BvxcJRmh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c-nouQfH+CTCHF+A8v9/0izIL8wD8"',
    "mtime": "2026-05-21T08:05:43.896Z",
    "size": 156,
    "path": "../public/assets/x-BvxcJRmh.js"
  },
  "/assets/styles-pokB3tFa.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"16a86-ZFUfCc1Hdc3VqnoGZhC2/O7qmP0"',
    "mtime": "2026-05-21T08:05:43.895Z",
    "size": 92806,
    "path": "../public/assets/styles-pokB3tFa.css"
  },
  "/logos/model-sources/alibaba.svg": {
    "type": "image/svg+xml",
    "etag": '"33a-QrfbIHQ/dwRY8cV6xB72HCOWibs"',
    "mtime": "2026-05-21T08:05:44.530Z",
    "size": 826,
    "path": "../public/logos/model-sources/alibaba.svg"
  },
  "/logos/model-sources/deep-seek.svg": {
    "type": "image/svg+xml",
    "etag": '"e15-KAqTw8DnhOCYAJ2wmapaPeMz5jk"',
    "mtime": "2026-05-21T08:05:44.530Z",
    "size": 3605,
    "path": "../public/logos/model-sources/deep-seek.svg"
  },
  "/logos/model-sources/eurollm.svg": {
    "type": "image/svg+xml",
    "etag": '"20b-lMZkbHKu/02olbxGoxWcm1Evk+I"',
    "mtime": "2026-05-21T08:05:44.531Z",
    "size": 523,
    "path": "../public/logos/model-sources/eurollm.svg"
  },
  "/logos/model-sources/google.svg": {
    "type": "image/svg+xml",
    "etag": '"3178-Fwle3WgmQbGPOvpJ97lYuwzjqEo"',
    "mtime": "2026-05-21T08:05:44.531Z",
    "size": 12664,
    "path": "../public/logos/model-sources/google.svg"
  },
  "/logos/model-sources/meta.svg": {
    "type": "image/svg+xml",
    "etag": '"942-nvltZBGafiu8nZ7AeHg50DkGdno"',
    "mtime": "2026-05-21T08:05:44.531Z",
    "size": 2370,
    "path": "../public/logos/model-sources/meta.svg"
  },
  "/logos/model-sources/mistral.svg": {
    "type": "image/svg+xml",
    "etag": '"37f-8dbcZKZiQ1FP1O/0H4wAt+3ZVo8"',
    "mtime": "2026-05-21T08:05:44.531Z",
    "size": 895,
    "path": "../public/logos/model-sources/mistral.svg"
  },
  "/logos/model-sources/multiverse.svg": {
    "type": "image/svg+xml",
    "etag": '"2130-lUl4GimcpVIwcVkmiXtGTcFuMjo"',
    "mtime": "2026-05-21T08:05:44.531Z",
    "size": 8496,
    "path": "../public/logos/model-sources/multiverse.svg"
  },
  "/logos/model-sources/openai.svg": {
    "type": "image/svg+xml",
    "etag": '"af5-3BRMcSkU696PgmHD5XMYYby261U"',
    "mtime": "2026-05-21T08:05:44.531Z",
    "size": 2805,
    "path": "../public/logos/model-sources/openai.svg"
  },
  "/logos/model-sources/qwen.svg": {
    "type": "image/svg+xml",
    "etag": '"78e-1U+NNqlpxAGvy2eJzxSoJaKm+P4"',
    "mtime": "2026-05-21T08:05:44.531Z",
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
