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
    "mtime": "2026-05-27T12:54:05.264Z",
    "size": 474,
    "path": "../public/manifest.json"
  },
  "/brand/booster-logo-black.svg": {
    "type": "image/svg+xml",
    "etag": '"1794-ve+UEm+WVrrFBdCu+SleyG6JRZo"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 6036,
    "path": "../public/brand/booster-logo-black.svg"
  },
  "/brand/booster-logo-white.svg": {
    "type": "image/svg+xml",
    "etag": '"17e7-Hr3iqGxhlmLG9SxrxBQIDYeIwJY"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 6119,
    "path": "../public/brand/booster-logo-white.svg"
  },
  "/brand/booster-mark.svg": {
    "type": "image/svg+xml",
    "etag": '"210-fO0Iou6k0GyEmo+zCJwI9JXNQaY"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 528,
    "path": "../public/brand/booster-mark.svg"
  },
  "/assets/AppSideSheet-CIG4SXtA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2f-BeENvksPBt+D33Jyd6DVNhySnrc"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 3887,
    "path": "../public/assets/AppSideSheet-CIG4SXtA.js"
  },
  "/assets/BackButton-Dwn2RZZR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e5-dEOweIGmwJHq0E1ZeSK8or30P74"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 485,
    "path": "../public/assets/BackButton-Dwn2RZZR.js"
  },
  "/assets/BoosterLogo-XX6LEgiQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"307-f3REJIRa+/gaUbvs7zb4xFda4As"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 775,
    "path": "../public/assets/BoosterLogo-XX6LEgiQ.js"
  },
  "/assets/Combination-DC2xUgPZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"40aa-2vKQGHA1tZqxrILQrYWANiToHRQ"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 16554,
    "path": "../public/assets/Combination-DC2xUgPZ.js"
  },
  "/assets/EndpointStatusBadge-Cu3CyJKr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"219-Uu0pRsJcOUyw/XCmdDy2LIGfbCM"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 537,
    "path": "../public/assets/EndpointStatusBadge-Cu3CyJKr.js"
  },
  "/tanstack-circle-logo.png": {
    "type": "image/png",
    "etag": '"40cab-HZ1KcYPs7tRjLe4Sd4g6CwKW+W8"',
    "mtime": "2026-05-27T12:54:05.265Z",
    "size": 265387,
    "path": "../public/tanstack-circle-logo.png"
  },
  "/assets/EnergyScorePill-CfRVxxFi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"64e-z0GrGVw6gsRABF0o3pOij0Ts5JI"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 1614,
    "path": "../public/assets/EnergyScorePill-CfRVxxFi.js"
  },
  "/assets/ModelLifecycleAlert-CK4lhZdB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c1a-GlFG41+byyaicSO1mCE8Ed6nHaE"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 3098,
    "path": "../public/assets/ModelLifecycleAlert-CK4lhZdB.js"
  },
  "/login-cover.webp": {
    "type": "image/webp",
    "etag": '"5db38-2On4Xy24JcjW9k2rvl8U84bWhvA"',
    "mtime": "2026-05-27T12:54:05.265Z",
    "size": 383800,
    "path": "../public/login-cover.webp"
  },
  "/assets/ModelCosmosCard-A8cEcw2a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1da6-3XsnDnzfPXnpDRIRqbxoSo3SgdQ"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 7590,
    "path": "../public/assets/ModelCosmosCard-A8cEcw2a.js"
  },
  "/assets/PageHeader-DPk7mn7f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"662-aGvNUP7QI/yZLXUjSz7Wh9UHYck"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 1634,
    "path": "../public/assets/PageHeader-DPk7mn7f.js"
  },
  "/assets/TokenUsageSection-Blk-sKMT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6b8-p72sk+l8/wN6D4BDiUHAbv0Snv8"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 1720,
    "path": "../public/assets/TokenUsageSection-Blk-sKMT.js"
  },
  "/assets/WizardStepper-DmQ8eSem.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c45-LaWcW+IZkKszZ8c83lVEyTHb8mw"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 7237,
    "path": "../public/assets/WizardStepper-DmQ8eSem.js"
  },
  "/assets/accordion-CgCwQf0r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9c-WPGBpLq+EGfh1TUxCuN0PEKPyq4"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 7580,
    "path": "../public/assets/accordion-CgCwQf0r.js"
  },
  "/assets/account-DG2LKJqJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8e1-daWqmU1yH9R0mkNsbF4CkX7DRUQ"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 2273,
    "path": "../public/assets/account-DG2LKJqJ.js"
  },
  "/assets/activity-uZltSXWy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ec-uUkcMfI37AQOkvkJZ5cg6c/6VsI"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 236,
    "path": "../public/assets/activity-uZltSXWy.js"
  },
  "/assets/arrow-left-CLZmPDZG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-NQJ00bxbecGQb8Sp6yYZQKNyyHs"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 167,
    "path": "../public/assets/arrow-left-CLZmPDZG.js"
  },
  "/assets/PageContainer-Dxg27yWO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"122-zOIN+lqjLjyuRN1zH+KFUmHMDmk"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 290,
    "path": "../public/assets/PageContainer-Dxg27yWO.js"
  },
  "/assets/SelectedFilterChips-BRrFLGRi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5cd6-me0Ssrl7y03Ff1/IZhwlZBOeMSY"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 23766,
    "path": "../public/assets/SelectedFilterChips-BRrFLGRi.js"
  },
  "/assets/arrow-right-DTXlHnw8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-AVPEw+585iuHxZW+qYmNsblPl+w"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 167,
    "path": "../public/assets/arrow-right-DTXlHnw8.js"
  },
  "/assets/badge-Cazw_rz_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e03-RSGfkewaNJLRKvRVpKSyUX44tZs"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 3587,
    "path": "../public/assets/badge-Cazw_rz_.js"
  },
  "/assets/box-CiHhXkhU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"244-vpTmnXs2It4xs3RM7lSzrcBT0RY"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 580,
    "path": "../public/assets/box-CiHhXkhU.js"
  },
  "/assets/button-CBZ9N6dj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15e8-TjGVHlhfrk0/PeVglgCkX38VSUk"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 5608,
    "path": "../public/assets/button-CBZ9N6dj.js"
  },
  "/assets/card-ZBjafBN2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3db-aUTrNi6Jr9ZqY5b/6XFQb86url4"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 987,
    "path": "../public/assets/card-ZBjafBN2.js"
  },
  "/assets/catalog-filter-meta-DkFKBtn-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f8e-8f6zZp+mlBsXUYtHynnZqDX0vsY"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 3982,
    "path": "../public/assets/catalog-filter-meta-DkFKBtn-.js"
  },
  "/assets/check-CS6lDJxH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"79-NM9Ylt6bhf1UFbnxH1NlGHMrmck"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 121,
    "path": "../public/assets/check-CS6lDJxH.js"
  },
  "/assets/chevron-down-wSwd7D1t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82-mDaNYUo52HOarpQkZ9cNqZLKlV8"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 130,
    "path": "../public/assets/chevron-down-wSwd7D1t.js"
  },
  "/assets/circle-check-Bg0DOY_9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"af-c+PhbDEQXRNb+9TfZE163BqE1aA"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 175,
    "path": "../public/assets/circle-check-Bg0DOY_9.js"
  },
  "/assets/cosmos-BNi1jl_k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1027d-8JkQjdU2RipEejUNFA2jTx8xI3s"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 66173,
    "path": "../public/assets/cosmos-BNi1jl_k.js"
  },
  "/assets/cosmos_._modelId-B2hGbX27.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae77-5JZKMFcYtWwb5nTNFWved1/CFfc"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 44663,
    "path": "../public/assets/cosmos_._modelId-B2hGbX27.js"
  },
  "/assets/cosmos_.guided-CVUzMBPy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4ae1-XYnR9E/js7GMK2ULRMqz1vTYQ30"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 19169,
    "path": "../public/assets/cosmos_.guided-CVUzMBPy.js"
  },
  "/assets/deploy-0ELzvgOC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"deb-ReZn85yyMoPRaK6C6zUXjWpVM5Y"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 3563,
    "path": "../public/assets/deploy-0ELzvgOC.js"
  },
  "/assets/dialog-BTHD6jPn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"885-YR1n7DVyVYNEj1aYpK6caZ5ge+Y"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 2181,
    "path": "../public/assets/dialog-BTHD6jPn.js"
  },
  "/assets/endpoint-status-C_SJSNGR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"163-5SieA2rhQa1i5kiFgnj73QXtQQM"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 355,
    "path": "../public/assets/endpoint-status-C_SJSNGR.js"
  },
  "/assets/endpoints._endpointId-Bt5tU6n0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3479-Ep46KlO5xtrPuOu5gm+nbEC/oHU"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 13433,
    "path": "../public/assets/endpoints._endpointId-Bt5tU6n0.js"
  },
  "/assets/dropdown-menu-B4zlVxK2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5636-mjc+rQNlbCbpRm84Msz+RdCWaJo"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 22070,
    "path": "../public/assets/dropdown-menu-B4zlVxK2.js"
  },
  "/assets/endpoints._endpointId.deploy--zwxrs6U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e07-qPwqhbcqv8FBesaXdJXgPCqWZlE"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 7687,
    "path": "../public/assets/endpoints._endpointId.deploy--zwxrs6U.js"
  },
  "/assets/endpoints._endpointId.settings-CnDFuOTi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5199-n2K94ysTLGq2vXpQ//mPSVwtUEQ"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 20889,
    "path": "../public/assets/endpoints._endpointId.settings-CnDFuOTi.js"
  },
  "/assets/endpoints.create_endpoint-DH4Xtwb3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4681-xr8VhPciySIlQlHyVwJHRGi4z9k"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 18049,
    "path": "../public/assets/endpoints.create_endpoint-DH4Xtwb3.js"
  },
  "/assets/endpoints.deploy_endpoint-CbSpPUqD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1eb6-LpxGm5kNCh/5p4H1BOUSy4RZWQM"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 7862,
    "path": "../public/assets/endpoints.deploy_endpoint-CbSpPUqD.js"
  },
  "/assets/external-link-C947kXbs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-rRU2R+l+xc7cmEMW94ea0z3+ZAs"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 253,
    "path": "../public/assets/external-link-C947kXbs.js"
  },
  "/assets/eye-Dezhzd6o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd-TvmJS0qa0V8lw7426zNODwiSW3M"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 253,
    "path": "../public/assets/eye-Dezhzd6o.js"
  },
  "/assets/formatters-UwuQ4hmu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a7-yPB6CjMvavPQKuY7N4fa9zGGcMg"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 167,
    "path": "../public/assets/formatters-UwuQ4hmu.js"
  },
  "/assets/icon-box-BpcEjdt8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3c5-rJ/NFZOAFbJ32oFlDA+nk7qVSgU"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 965,
    "path": "../public/assets/icon-box-BpcEjdt8.js"
  },
  "/assets/index-BUFmaN1n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-zEr4JJemMd4xXKuyp0fOPIN7zyg"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 232,
    "path": "../public/assets/index-BUFmaN1n.js"
  },
  "/assets/index-BiMcF0KM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d9e-53vqlFneNAbJ7D0lqdNkxYGw2fY"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 3486,
    "path": "../public/assets/index-BiMcF0KM.js"
  },
  "/assets/index-XYMvmE8F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"194d-Ah33OqqMrC3mgMxsPCEDYn/hE6E"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 6477,
    "path": "../public/assets/index-XYMvmE8F.js"
  },
  "/assets/index-CX-oLEH7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a44-IjCl3gDpUlJgsUU5jfu27k7yuyI"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 2628,
    "path": "../public/assets/index-CX-oLEH7.js"
  },
  "/assets/input-_ZplF8FS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c10-zvajeUp14JkWc0rhKJkj0Lzej2Q"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 7184,
    "path": "../public/assets/input-_ZplF8FS.js"
  },
  "/assets/log-in-CWKVG1LT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e9-Zc8hneMmcc8ofGnzLGS10FdnAeQ"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 233,
    "path": "../public/assets/log-in-CWKVG1LT.js"
  },
  "/assets/log-out-DqZAs0-C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-dOtOSVu9ADCUMQFze0dyyX0Y5UI"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 232,
    "path": "../public/assets/log-out-DqZAs0-C.js"
  },
  "/assets/model-hosting-providers-ZJpuxcRO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3dc-REBEonLuiiWbfcfiL1Y/WorpY68"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 988,
    "path": "../public/assets/model-hosting-providers-ZJpuxcRO.js"
  },
  "/assets/model-lifecycle-C2nwEBns.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"637-mYfQRw27fs+pdu2nvQ9DVT1kME8"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 1591,
    "path": "../public/assets/model-lifecycle-C2nwEBns.js"
  },
  "/assets/model-provider-logos-B7IXm7zr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ba1-qrj6FAWzghDvYZk4/hS/ZSoCHGY"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 2977,
    "path": "../public/assets/model-provider-logos-B7IXm7zr.js"
  },
  "/assets/modelPerformanceBenchmark-XtlQFS0F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6e06-qCzV6jlAKSEkicrVMxhoQW4qksU"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 28166,
    "path": "../public/assets/modelPerformanceBenchmark-XtlQFS0F.js"
  },
  "/assets/observe-yRk2HZxU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"76-Upn5rCdGatbMCJPsoTAR2z/+0B4"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 118,
    "path": "../public/assets/observe-yRk2HZxU.js"
  },
  "/assets/plus-DsemnXSj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b-/xyAFLXtlibepqw78MjIcDn+6DA"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 155,
    "path": "../public/assets/plus-DsemnXSj.js"
  },
  "/assets/overview-qROEs6IP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2dbe-4LXT2dkpVlJGTimi6cjN2iP5FnA"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 11710,
    "path": "../public/assets/overview-qROEs6IP.js"
  },
  "/assets/popover-7nFYDh8j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a8f-xpPA/mOCcgdqmcdSKIj7smhfuFY"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 6799,
    "path": "../public/assets/popover-7nFYDh8j.js"
  },
  "/assets/progress-DhlKsTSp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e99-qjEETP+6mTwewpPiPL13Nhy4cNA"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 3737,
    "path": "../public/assets/progress-DhlKsTSp.js"
  },
  "/assets/public-asset-url-D8itN-Cq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3f-8ia8ybCxBv4nsIK9HyHbo4zfljY"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 63,
    "path": "../public/assets/public-asset-url-D8itN-Cq.js"
  },
  "/assets/rocket-CvRPT13D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c6-WV7Tyq8zSmvPikbiElHX2KHDyeY"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 454,
    "path": "../public/assets/rocket-CvRPT13D.js"
  },
  "/assets/route-LY8z1cOT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c3b-SGFncQ8vg7jNc0wCRWdFNSsIS74"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 7227,
    "path": "../public/assets/route-LY8z1cOT.js"
  },
  "/assets/search-DIKmxyX2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ab-jmKH3Cs7dHjQdoG1NYIZaVV2TmM"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 171,
    "path": "../public/assets/search-DIKmxyX2.js"
  },
  "/assets/separator-BGTtNWD5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"296-kLsXVa3hMuAS4ZhI0G+pM5D0t08"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 662,
    "path": "../public/assets/separator-BGTtNWD5.js"
  },
  "/assets/set-password-BjDvF_Q9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"130e-0doeTWh45FUauTpN+b533UNv7NM"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 4878,
    "path": "../public/assets/set-password-BjDvF_Q9.js"
  },
  "/assets/settings-DD63wGGh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a0-VqQmOAmREVaPz8EWkSMaRU7JlLE"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 672,
    "path": "../public/assets/settings-DD63wGGh.js"
  },
  "/assets/shield-check-D4teZSwB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13d-Mpw0Z3G6WfQTVp9zfNkYzGjDzos"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 317,
    "path": "../public/assets/shield-check-D4teZSwB.js"
  },
  "/assets/sonner-BRF8TE7m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8ed7-JSpGum/pz8/Jpm3RPtCZMBm/P0o"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 36567,
    "path": "../public/assets/sonner-BRF8TE7m.js"
  },
  "/assets/sparkles-CiHUJbRo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f0-qMpBHsO2Zu9uQ9+bi684+TSyo3s"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 496,
    "path": "../public/assets/sparkles-CiHUJbRo.js"
  },
  "/assets/index-eI382ovQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"89a52-yC4ZVYTEqrGEzRtHW+idgTJ7y/4"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 563794,
    "path": "../public/assets/index-eI382ovQ.js"
  },
  "/assets/styles-8ADKJ_d5.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"18a62-FwIz4Rs8oMjoaiVZuErrajkig/E"',
    "mtime": "2026-05-27T12:54:04.626Z",
    "size": 100962,
    "path": "../public/assets/styles-8ADKJ_d5.css"
  },
  "/assets/table-4eU7pSxe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c22-Y0rr2OjwKQB3r01iQfeYBlTRd7o"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 3106,
    "path": "../public/assets/table-4eU7pSxe.js"
  },
  "/assets/textarea-CqxD-Ocu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3f5-A3jQXxFMSluDq25615u0vgW5LGc"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 1013,
    "path": "../public/assets/textarea-CqxD-Ocu.js"
  },
  "/assets/trash-2-C7NrfQIO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14a-ahtGOupG2CHC7cE4eahWXpheVOg"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 330,
    "path": "../public/assets/trash-2-C7NrfQIO.js"
  },
  "/assets/use-auth-BG1yNZ7s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24d6-yQrI7AoI51mFZ65lSOGULx+xUDg"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 9430,
    "path": "../public/assets/use-auth-BG1yNZ7s.js"
  },
  "/assets/x-Dh9KkVk3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c-sOzFgYm8+wXGg3lUmXpNR4Oel4A"',
    "mtime": "2026-05-27T12:54:04.629Z",
    "size": 156,
    "path": "../public/assets/x-Dh9KkVk3.js"
  },
  "/assets/zap-DVmarkH1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"108-CYHSbITpgSS1bCX+RxcUeKcoh4o"',
    "mtime": "2026-05-27T12:54:04.628Z",
    "size": 264,
    "path": "../public/assets/zap-DVmarkH1.js"
  },
  "/logos/model-sources/deep-seek.svg": {
    "type": "image/svg+xml",
    "etag": '"e15-KAqTw8DnhOCYAJ2wmapaPeMz5jk"',
    "mtime": "2026-05-27T12:54:05.264Z",
    "size": 3605,
    "path": "../public/logos/model-sources/deep-seek.svg"
  },
  "/logos/model-sources/eurollm.svg": {
    "type": "image/svg+xml",
    "etag": '"20b-lMZkbHKu/02olbxGoxWcm1Evk+I"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 523,
    "path": "../public/logos/model-sources/eurollm.svg"
  },
  "/logos/model-sources/google.svg": {
    "type": "image/svg+xml",
    "etag": '"3178-Fwle3WgmQbGPOvpJ97lYuwzjqEo"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 12664,
    "path": "../public/logos/model-sources/google.svg"
  },
  "/logos/model-sources/alibaba.svg": {
    "type": "image/svg+xml",
    "etag": '"33a-QrfbIHQ/dwRY8cV6xB72HCOWibs"',
    "mtime": "2026-05-27T12:54:05.264Z",
    "size": 826,
    "path": "../public/logos/model-sources/alibaba.svg"
  },
  "/assets/useLocation-D00Wj2Bi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-V0tKRah1oGQ1BZzubleknoIC3Rg"',
    "mtime": "2026-05-27T12:54:04.627Z",
    "size": 260,
    "path": "../public/assets/useLocation-D00Wj2Bi.js"
  },
  "/logos/model-sources/meta.svg": {
    "type": "image/svg+xml",
    "etag": '"942-nvltZBGafiu8nZ7AeHg50DkGdno"',
    "mtime": "2026-05-27T12:54:05.264Z",
    "size": 2370,
    "path": "../public/logos/model-sources/meta.svg"
  },
  "/logos/model-sources/mistral.svg": {
    "type": "image/svg+xml",
    "etag": '"37f-8dbcZKZiQ1FP1O/0H4wAt+3ZVo8"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 895,
    "path": "../public/logos/model-sources/mistral.svg"
  },
  "/logos/model-sources/multiverse.svg": {
    "type": "image/svg+xml",
    "etag": '"2130-lUl4GimcpVIwcVkmiXtGTcFuMjo"',
    "mtime": "2026-05-27T12:54:05.264Z",
    "size": 8496,
    "path": "../public/logos/model-sources/multiverse.svg"
  },
  "/logos/model-sources/openai.svg": {
    "type": "image/svg+xml",
    "etag": '"af5-3BRMcSkU696PgmHD5XMYYby261U"',
    "mtime": "2026-05-27T12:54:05.263Z",
    "size": 2805,
    "path": "../public/logos/model-sources/openai.svg"
  },
  "/logos/model-sources/qwen.svg": {
    "type": "image/svg+xml",
    "etag": '"78e-1U+NNqlpxAGvy2eJzxSoJaKm+P4"',
    "mtime": "2026-05-27T12:54:05.263Z",
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
