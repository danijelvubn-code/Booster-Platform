import { c as createRouter, a as createRootRouteWithContext, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { J as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { P as Provider, C as Content2, A as Arrow2, R as Root3, T as Trigger } from "../_libs/radix-ui__react-tooltip.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { e as extendTailwindMerge } from "../_libs/tailwind-merge.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createEnv } from "../_libs/t3-oss__env-core.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body",
            "body-strong",
            "body-sm",
            "body-sm-strong",
            "label",
            "caption",
            "caption-strong",
            "caption-mono",
            "code"
          ]
        }
      ]
    }
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipArrow = Arrow2;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-visible rounded-md border border-border bg-popover p-3 text-caption text-popover-foreground shadow-none drop-shadow-lg",
      "data-[side=top]:[&_.tooltip-arrow]:-mb-px data-[side=bottom]:[&_.tooltip-arrow]:-mt-px data-[side=left]:[&_.tooltip-arrow]:-mr-px data-[side=right]:[&_.tooltip-arrow]:-ml-px",
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipArrow,
        {
          "aria-hidden": true,
          className: "tooltip-arrow block fill-popover stroke-border",
          height: 6,
          strokeWidth: 1,
          width: 12
        }
      )
    ]
  }
));
TooltipContent.displayName = Content2.displayName;
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_DEV_SERVER": "false", "TSS_DEV_SSR_STYLES_BASEPATH": "/", "TSS_DEV_SSR_STYLES_ENABLED": "true", "TSS_INLINE_CSS_ENABLED": "false", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/", "VITE_API_URL": "http://localhost:8080" };
const env = createEnv({
  server: {
    SERVER_URL: string().url().optional()
  },
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",
  client: {
    VITE_APP_TITLE: string().min(1).optional(),
    VITE_API_URL: string().url()
  },
  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: __vite_import_meta_env__,
  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true
});
class APIError extends Error {
  constructor(message, status, statusText) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.name = "APIError";
  }
}
async function fetchAPI(endpoint, options) {
  const url = `${env.VITE_API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    // Important: automatically sends cookies
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
  if (response.status === 401) {
    window.location.href = `${env.VITE_API_URL}/auth/login`;
    return new Promise(() => {
    });
  }
  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(
      errorText || response.statusText,
      response.status,
      response.statusText
    );
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}
function TanStackQueryProvider({
  children
}) {
  const [queryClient] = reactExports.useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // Retry logic
          retry: (failureCount, error) => {
            if (error instanceof APIError && error.status === 401) {
              return false;
            }
            return failureCount < 3;
          },
          // Stale time: 30 seconds
          staleTime: 30 * 1e3,
          // Cache time: 5 minutes
          gcTime: 5 * 60 * 1e3
        },
        mutations: {
          // Optional: global error handler for mutations
          onError: (error) => {
            if (error instanceof APIError) {
              console.error("Mutation error:", error.message);
            }
          }
        }
      }
    })
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children });
}
const appCss = "/assets/styles-FxSKIo26.css";
const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'light';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Booster"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "font-sans antialiased wrap-anywhere selection:yellow-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TanStackQueryProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$d = () => import("./route-z1QoYVIg.mjs");
const Route$e = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const Route$d = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/overview" });
  }
});
const $$splitComponentImporter$c = () => import("./set-password-CRmEsAjg.mjs");
const Route$c = createFileRoute("/auth/set-password")({
  validateSearch: object({
    token: string()
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./overview-D3E4-a2l.mjs");
const Route$b = createFileRoute("/app/overview")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./observe-bnAt4cA4.mjs");
const Route$a = createFileRoute("/app/observe")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./deploy-D5eOiGg8.mjs");
const Route$9 = createFileRoute("/app/deploy")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./cosmos-ClceDou-.mjs");
const Route$8 = createFileRoute("/app/cosmos")({
  validateSearch: (search) => ({
    hosting: search.hosting ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./account-I15oJ3Fr.mjs");
const Route$7 = createFileRoute("/app/account")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./endpoints.deploy_endpoint-C3TgpgSJ.mjs");
const Route$6 = createFileRoute("/app/endpoints/deploy_endpoint")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./endpoints.create_endpoint-D8_xFDW3.mjs");
const Route$5 = createFileRoute("/app/endpoints/create_endpoint")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./endpoints._endpointId-r0S3erAI.mjs");
const Route$4 = createFileRoute("/app/endpoints/$endpointId")({
  validateSearch: (search) => ({
    returnTo: typeof search.returnTo === "string" && search.returnTo.startsWith("/app/") ? search.returnTo : "/app/overview",
    returnLabel: typeof search.returnLabel === "string" && search.returnLabel.trim() ? search.returnLabel.trim() : "Endpoints"
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./cosmos_.guided-59beOSjG.mjs");
const Route$3 = createFileRoute("/app/cosmos_/guided")({
  validateSearch: (search) => ({
    resume: search.resume ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const CAPABILITY_INDEXES = {
  medical: {
    displayName: "Medical",
    description: "Aggregate for medical deployments combining clinical reasoning, clinical knowledge, summarization, and safety",
    version: 1,
    capabilities: {
      safety: { weight: 1 / 4 }
    },
    subcapabilities: {
      "reasoning.medical_clinical": { weight: 1 / 4 },
      "knowledge.medical_clinical": { weight: 1 / 4 },
      "summarization.short_context_summarization": { weight: 1 / 4 }
    }
  },
  financial: {
    displayName: "Financial",
    description: "Aggregate for financial deployments combining financial reasoning, financial knowledge, and safety",
    version: 1,
    capabilities: {
      safety: { weight: 1 / 3 }
    },
    subcapabilities: {
      "reasoning.financial_business": { weight: 1 / 3 },
      "knowledge.financial_business": { weight: 1 / 3 }
    }
  },
  ai_index: {
    displayName: "AI Index",
    description: "Broad aggregate across core capabilities for general AI readiness",
    version: 1,
    capabilities: {
      reasoning: { weight: 1 / 7 },
      knowledge: { weight: 1 / 7 },
      structured_output: { weight: 1 / 7 },
      tool_use: { weight: 1 / 7 },
      coding: { weight: 1 / 7 },
      safety: { weight: 1 / 7 },
      summarization: { weight: 1 / 7 }
    }
  }
};
const CAPABILITY_TAXONOMY = {
  reasoning: {
    displayName: "Reasoning",
    description: "Ability to apply logic, commonsense, and domain knowledge to solve problems",
    version: 1,
    subcapabilities: {
      general_commonsense: {
        displayName: "General / Commonsense",
        description: "Everyday reasoning and commonsense understanding",
        version: 1,
        weight: 1 / 5,
        benchmarks: { commonsenseqa: 1 }
      },
      stem: {
        displayName: "STEM",
        description: "Reasoning over science, technology, engineering, and mathematics problems",
        version: 1,
        weight: 1 / 5,
        benchmarks: {
          gsm8k: 2 / 5,
          arc_easy: 1 / 5,
          arc_challenge: 2 / 5
        }
      },
      medical_clinical: {
        displayName: "Medical / Clinical",
        description: "Clinical and medical reasoning ability",
        version: 1,
        weight: 1 / 5,
        benchmarks: { healthbench: 1 }
      },
      financial_business: {
        displayName: "Financial / Business",
        description: "Reasoning in finance, accounting, and business domains",
        version: 1,
        weight: 1 / 5,
        benchmarks: {
          mmlu_pro_professional_accounting: 1 / 2,
          mmlu_pro_economics: 1 / 2
        }
      },
      mathematical: {
        displayName: "Mathematical",
        description: "Mathematical problem solving and numerical reasoning",
        version: 1,
        weight: 1 / 5,
        benchmarks: { gsm8k: 1 }
      }
    }
  },
  knowledge: {
    displayName: "Knowledge",
    description: "Breadth and depth of factual knowledge across domains",
    version: 1,
    subcapabilities: {
      general: {
        displayName: "General",
        description: "Broad factual knowledge across academic and general domains",
        version: 1,
        weight: 1 / 6,
        benchmarks: { mmlu: 1 }
      },
      stem: {
        displayName: "STEM",
        description: "Factual knowledge in science, technology, engineering, and mathematics",
        version: 1,
        weight: 1 / 6,
        benchmarks: { mmlu_stem: 1 }
      },
      medical_clinical: {
        displayName: "Medical / Clinical",
        description: "Breadth of biomedical, clinical, and pharmacological knowledge",
        version: 1,
        weight: 1 / 6,
        benchmarks: {
          medqa: 2 / 5,
          mmlu_pro_health: 2 / 5,
          mmlu_high_school_biology: 1 / 45,
          mmlu_college_biology: 1 / 45,
          mmlu_college_medicine: 1 / 45,
          mmlu_professional_medicine: 1 / 45,
          mmlu_medical_genetics: 1 / 45,
          mmlu_virology: 1 / 45,
          mmlu_clinical_knowledge: 1 / 45,
          mmlu_nutrition: 1 / 45,
          mmlu_anatomy: 1 / 45
        }
      },
      financial_business: {
        displayName: "Financial / Business",
        description: "Knowledge in finance, business, and economics",
        version: 1,
        weight: 1 / 6,
        benchmarks: { mmlu_business_economics_accounting: 1 }
      },
      programming_cs: {
        displayName: "Programming & Computer Science",
        description: "Knowledge of computer science fundamentals and programming concepts",
        version: 1,
        weight: 1 / 6,
        benchmarks: { mmlu_computer_science: 1 }
      },
      law: {
        displayName: "Law",
        description: "Legal knowledge and regulatory understanding",
        version: 1,
        weight: 1 / 6,
        benchmarks: { air_bench: 1 }
      }
    }
  },
  structured_output: {
    displayName: "Structured Output",
    description: "Ability to produce well-formed, schema-compliant structured data",
    version: 1,
    subcapabilities: {
      json_validity: {
        displayName: "JSON Validity",
        description: "Produces syntactically valid JSON",
        version: 1,
        weight: 0.3,
        benchmarks: { json_schema_bench_validity: 1 }
      },
      schema_compliance: {
        displayName: "Schema Compliance",
        description: "Adheres to specified JSON schemas",
        version: 1,
        weight: 0.7,
        benchmarks: { json_schema_bench_compliance: 1 }
      }
    }
  },
  tool_use: {
    displayName: "Tool Use",
    description: "Ability to select and invoke external tools and APIs correctly",
    version: 1,
    subcapabilities: {
      tool_selection: {
        displayName: "Tool Selection",
        description: "Chooses the appropriate tool for a given task",
        version: 1,
        weight: 1 / 2,
        benchmarks: { bfcl: 1 }
      },
      tool_calling: {
        displayName: "Tool Calling",
        description: "Formats and executes tool calls correctly",
        version: 1,
        weight: 1 / 2,
        benchmarks: { bfcl: 1 }
      }
    }
  },
  coding: {
    displayName: "Coding",
    description: "Software engineering capabilities including understanding, generation, and debugging",
    version: 1,
    subcapabilities: {
      code_understanding: {
        displayName: "Code Understanding",
        description: "Comprehension of existing codebases and code semantics",
        version: 1,
        weight: 1 / 4,
        benchmarks: { swe_bench_verified: 1 }
      },
      code_generation: {
        displayName: "Code Generation",
        description: "Generating correct and functional code from specifications",
        version: 1,
        weight: 1 / 4,
        benchmarks: {
          swe_bench_verified: 1 / 2,
          humaneval: 1 / 2
        }
      },
      code_debugging: {
        displayName: "Code Debugging",
        description: "Identifying and fixing bugs in existing code",
        version: 1,
        weight: 1 / 4,
        benchmarks: { swe_bench_verified: 1 }
      },
      query_generation: {
        displayName: "Query Generation",
        description: "Generating database and graph queries from natural language",
        version: 1,
        weight: 1 / 4,
        benchmarks: { text_to_cypher: 1 }
      }
    }
  },
  safety: {
    displayName: "Safety",
    description: "Adherence to instructions, policies, and regulatory constraints",
    version: 1,
    subcapabilities: {
      instruction_following: {
        displayName: "Instruction Following",
        description: "Ability to follow explicit formatting and behavioral instructions",
        version: 1,
        weight: 1 / 2,
        benchmarks: { ifeval: 1 }
      },
      regulations_policies: {
        displayName: "Regulations / Policies",
        description: "Compliance with regulatory and policy constraints",
        version: 1,
        weight: 1 / 2,
        benchmarks: { air_bench: 1 }
      }
    }
  },
  summarization: {
    displayName: "Summarization",
    description: "Ability to distill content into concise and accurate summaries",
    version: 1,
    subcapabilities: {
      short_context_summarization: {
        displayName: "Short-context Summarization",
        description: "Summarization of short documents and passages",
        version: 1,
        weight: 1 / 2,
        benchmarks: { summeval: 1 }
      },
      long_context_summarization: {
        displayName: "Long-context Summarization",
        description: "Summarization of long documents and books",
        version: 1,
        weight: 1 / 2,
        benchmarks: { booksum: 1 }
      }
    }
  },
  classification: {
    displayName: "Classification",
    description: "Ability to categorize text into predefined classes",
    version: 1,
    subcapabilities: {
      intent_classification: {
        displayName: "Intent Classification",
        description: "Identifying user intent from natural language utterances",
        version: 1,
        weight: 1 / 4,
        benchmarks: { massive: 1 }
      },
      medical_intent_classification: {
        displayName: "Medical Intent Classification",
        description: "Identifying intent in medical and clinical contexts",
        version: 1,
        weight: 1 / 4,
        benchmarks: { clinc150: 1 }
      },
      topic_classification: {
        displayName: "Topic Classification",
        description: "Assigning topic labels to text documents",
        version: 1,
        weight: 1 / 4,
        benchmarks: { ag_news: 1 }
      },
      toxicity_classification: {
        displayName: "Toxicity Classification",
        description: "Detecting toxic and harmful content in text",
        version: 1,
        weight: 1 / 4,
        benchmarks: { jigsaw_toxic_comment: 1 }
      }
    }
  },
  document_understanding: {
    displayName: "Document Understanding",
    description: "Ability to parse, interpret, and reason over structured documents and images",
    version: 1,
    subcapabilities: {
      text_ocr: {
        displayName: "Text & OCR",
        description: "Optical character recognition and text extraction from document images",
        version: 1,
        weight: 1 / 3,
        benchmarks: {
          ocrbench_v2: 1 / 2,
          omnidocbench: 1 / 2
        }
      },
      layout_understanding: {
        displayName: "Layout Understanding",
        description: "Comprehension of document structure, tables, and visual layout",
        version: 1,
        weight: 1 / 3,
        benchmarks: {
          omnidocbench: 1 / 2,
          infovqa: 1 / 2
        }
      },
      document_vqa: {
        displayName: "Document VQA & Understanding",
        description: "Visual question answering over document images",
        version: 1,
        weight: 1 / 3,
        benchmarks: {
          docvqa: 1 / 4,
          mathvision: 1 / 4,
          mmmu: 1 / 4,
          mmmu_pro: 1 / 4
        }
      }
    }
  },
  visual_intelligence: {
    displayName: "Visual Intelligence",
    description: "Ability to perceive, interpret, and reason over visual content",
    version: 1,
    subcapabilities: {
      visual_perception: {
        displayName: "Visual Perception",
        description: "Low-level visual understanding of real-world scenes",
        version: 1,
        weight: 1 / 5,
        benchmarks: { realworldqa: 1 }
      },
      spatial_structural_reasoning: {
        displayName: "Spatial & Structural Reasoning",
        description: "Understanding of spatial relationships and structural patterns in images",
        version: 1,
        weight: 1 / 5,
        benchmarks: {
          mmiu: 1 / 2,
          zerobench: 1 / 2
        }
      },
      visual_understanding: {
        displayName: "Visual Understanding",
        description: "Semantic understanding of visual content across diverse domains",
        version: 1,
        weight: 1 / 5,
        benchmarks: {
          mmmu: 1 / 2,
          mmmu_pro: 1 / 2
        }
      },
      visual_qa: {
        displayName: "Visual Question Answering",
        description: "Answering open-ended questions about visual content",
        version: 1,
        weight: 1 / 5,
        benchmarks: {
          zerobench: 1 / 2,
          realworldqa: 1 / 2
        }
      },
      video_understanding: {
        displayName: "Video Understanding",
        description: "Temporal and semantic understanding of video content",
        version: 1,
        weight: 1 / 5,
        benchmarks: { videomme: 1 }
      }
    }
  },
  audio_understanding: {
    displayName: "Audio Understanding",
    description: "Ability to process and reason over audio and speech",
    version: 1,
    subcapabilities: {
      speech_linguistic_understanding: {
        displayName: "Speech & Linguistic Understanding",
        description: "Comprehension of spoken language and acoustic features",
        version: 1,
        weight: 1,
        benchmarks: { mmau: 1 }
      }
    }
  },
  multimodal_understanding: {
    displayName: "Multimodal Understanding",
    description: "Integrated reasoning across text, vision, audio, and other modalities",
    version: 1,
    subcapabilities: {
      multimodal_reasoning: {
        displayName: "Multimodal Reasoning",
        description: "Cross-modal reasoning combining multiple input types",
        version: 1,
        weight: 1,
        benchmarks: { omnibench: 1 }
      }
    }
  },
  multilingualism: {
    displayName: "Multilingualism",
    description: "Capability across natural and programming languages",
    version: 1,
    subcapabilities: {
      languages: {
        displayName: "Languages",
        description: "Performance across diverse natural languages",
        version: 1,
        weight: 1 / 2,
        benchmarks: { mmlu_prox: 1 }
      },
      programming_languages: {
        displayName: "Programming Languages",
        description: "Code generation and understanding across diverse programming languages",
        version: 1,
        weight: 1 / 2,
        benchmarks: { autocodebench: 1 }
      }
    }
  },
  embedding: {
    displayName: "Embedding",
    description: "Quality of text embedding representations for retrieval and semantic tasks",
    version: 1,
    subcapabilities: {
      embedding_retrieval: {
        displayName: "Embedding & Retrieval",
        description: "Effectiveness of embeddings for semantic similarity and retrieval tasks",
        version: 1,
        weight: 1,
        benchmarks: {
          mteb_europe_v1_sts: 1 / 3,
          mteb_code_v1_retrieval: 1 / 3,
          mteb_medical_v1_retrieval: 1 / 3
        }
      }
    }
  },
  reranking: {
    displayName: "Reranking",
    description: "Quality of reranking models for retrieval pipelines",
    version: 1,
    subcapabilities: {
      retrieval_ranking: {
        displayName: "Retrieval & Ranking",
        description: "Effectiveness of reranking for improving retrieval precision",
        version: 1,
        weight: 1,
        benchmarks: {
          mteb_code_v1_retrieval: 1 / 2,
          mteb_medical_v1_retrieval: 1 / 2
        }
      }
    }
  }
};
const BENCHMARK_TAXONOMY = {
  commonsenseqa: { displayName: "CommonsenseQA" },
  gsm8k: { displayName: "GSM8K" },
  arc_easy: { displayName: "ARC-Easy" },
  arc_challenge: { displayName: "ARC-Challenge" },
  healthbench: { displayName: "HealthBench" },
  mmlu_pro_professional_accounting: {
    displayName: "MMLU-Pro (Professional Accounting)"
  },
  mmlu_pro_economics: { displayName: "MMLU-Pro (Economics)" },
  mmlu: { displayName: "MMLU" },
  mmlu_stem: { displayName: "MMLU (STEM subsets)" },
  medqa: { displayName: "MedQA" },
  mmlu_pro_health: { displayName: "MMLU-Pro (Health)" },
  mmlu_high_school_biology: { displayName: "MMLU (High School Biology)" },
  mmlu_college_biology: { displayName: "MMLU (College Biology)" },
  mmlu_college_medicine: { displayName: "MMLU (College Medicine)" },
  mmlu_professional_medicine: { displayName: "MMLU (Professional Medicine)" },
  mmlu_medical_genetics: { displayName: "MMLU (Medical Genetics)" },
  mmlu_virology: { displayName: "MMLU (Virology)" },
  mmlu_clinical_knowledge: { displayName: "MMLU (Clinical Knowledge)" },
  mmlu_nutrition: { displayName: "MMLU (Nutrition)" },
  mmlu_anatomy: { displayName: "MMLU (Anatomy)" },
  mmlu_business_economics_accounting: {
    displayName: "MMLU (Business / Economics / Accounting subsets)"
  },
  mmlu_computer_science: { displayName: "MMLU (Computer Science)" },
  air_bench: { displayName: "AIR Bench" },
  json_schema_bench_validity: { displayName: "JSON Schema Bench (Validity)" },
  json_schema_bench_compliance: {
    displayName: "JSON Schema Bench (Schema Compliance)"
  },
  bfcl: { displayName: "BFCL" },
  swe_bench_verified: { displayName: "SWE-bench Verified" },
  humaneval: { displayName: "HumanEval" },
  text_to_cypher: { displayName: "Text-to-Cypher" },
  ifeval: { displayName: "IFEval" },
  summeval: { displayName: "SummEval" },
  booksum: { displayName: "BookSum" },
  massive: { displayName: "MASSIVE" },
  clinc150: { displayName: "CLINC150" },
  ag_news: { displayName: "AG News" },
  jigsaw_toxic_comment: { displayName: "Jigsaw Toxic Comment" },
  ocrbench_v2: { displayName: "OCRBench-v2" },
  omnidocbench: { displayName: "OmniDocBench" },
  infovqa: { displayName: "InfoVQA" },
  docvqa: { displayName: "DocVQA" },
  mathvision: { displayName: "MathVision" },
  mmmu: { displayName: "MMMU" },
  mmmu_pro: { displayName: "MMMU-Pro" },
  realworldqa: { displayName: "RealWorldQA" },
  mmiu: { displayName: "MMIU" },
  zerobench: { displayName: "ZeroBench" },
  videomme: { displayName: "VideoMME" },
  mmau: { displayName: "MMAU" },
  omnibench: { displayName: "OmniBench" },
  mmlu_prox: { displayName: "MMLU-prox" },
  autocodebench: { displayName: "AutoCodeBench" },
  mteb_europe_v1_sts: { displayName: "MTEB (Europe, v1) — STS" },
  mteb_code_v1_retrieval: { displayName: "MTEB (Code, v1) — Retrieval" },
  mteb_medical_v1_retrieval: { displayName: "MTEB (Medical, v1) — Retrieval" }
};
function getCodingScore(model) {
  const c = model.capabilities.find((x) => x.name === "Code");
  if (c) return c.score;
  const b = model.benchmarks.find((x) => x.name === "HumanEval");
  return b ? Math.round(b.score) : 0;
}
function getReasoningScore(model) {
  const c = model.capabilities.find((x) => x.name === "Reasoning");
  if (c) return c.score;
  const b = model.benchmarks.find((x) => x.name === "ARC-Challenge");
  return b ? Math.round(b.score) : 0;
}
function getMathScore(model) {
  const b = model.benchmarks.find((x) => x.name === "GSM8K");
  if (b) return Math.round(b.score);
  const c = model.capabilities.find((x) => x.name === "Reasoning");
  const sub = c?.subs.find((s) => s.name === "Mathematical");
  return sub ? Math.round(sub.score) : 0;
}
function getOverallModelScore(model) {
  const a = getCodingScore(model);
  const b = getReasoningScore(model);
  const c = getMathScore(model);
  if (a + b + c === 0) return 0;
  return Math.round((a + b + c) / 3);
}
function getModelParameterSizeLabel(model) {
  return model.parameterSize;
}
function parseParameterSizeToCount(label) {
  const m = label.match(/^(\d+(?:\.\d+)?)B$/i);
  if (!m) return 0;
  return Number.parseFloat(m[1]) * 1e9;
}
function getModelParameterCount(model) {
  return parseParameterSizeToCount(getModelParameterSizeLabel(model));
}
function getModelModalityLabel(model) {
  if (model.category === "Code") return "Code LLM";
  if (model.category === "Enterprise") return "Enterprise LLM";
  return "LLM";
}
function getModelCatalogBadge(model) {
  if (model.category === "Code") return "Code";
  return "Chat";
}
function modelHasVisionCapability(model) {
  return model.strengths.some((s) => {
    const l = s.toLowerCase();
    return l.includes("multimodal") || l.includes("vision") || l.includes("image");
  });
}
function modelIsQuantized(model) {
  return "quantization" in model && Boolean(model.quantization);
}
function getModelSubline(model) {
  const param = getModelParameterSizeLabel(model);
  const version = `v${model.version}`;
  const type = getModelModalityLabel(model);
  const parts = [version, param, type];
  if (modelIsQuantized(model)) parts.push("Quantized");
  return parts.join(" · ");
}
function formatEurPer1MForDisplay(eurPer1M) {
  return eurPer1M.toFixed(2);
}
function formatContextLength(ctx) {
  if (ctx >= 1e6) return `${(ctx / 1e6).toFixed(0)}M ctx`;
  if (ctx >= 1e3) return `${Math.round(ctx / 1e3)}k ctx`;
  return `${ctx} ctx`;
}
function formatContextWindowShort(ctx) {
  if (ctx >= 1e6) return `${(ctx / 1e6).toFixed(0)}M`;
  if (ctx >= 1e3) return `${Math.round(ctx / 1e3)}K`;
  return `${ctx}`;
}
const ENERGY_GRADE_FOREGROUND_CLASS = {
  A: "text-success",
  B: "text-[#65A30D]",
  C: "text-[#D3A532]",
  D: "text-warning",
  E: "text-destructive"
};
function overallScoreTextClass(score) {
  if (score <= 0) return "text-muted-foreground";
  if (score >= 90) return "text-success";
  return "text-foreground";
}
const GRADE_STYLES = {
  A: { box: "bg-success/7", icon: ENERGY_GRADE_FOREGROUND_CLASS.A },
  B: { box: "bg-[#65A30D]/7", icon: ENERGY_GRADE_FOREGROUND_CLASS.B },
  C: { box: "bg-[#D3A532]/7", icon: ENERGY_GRADE_FOREGROUND_CLASS.C },
  D: { box: "bg-warning/7", icon: ENERGY_GRADE_FOREGROUND_CLASS.D },
  E: { box: "bg-destructive/7", icon: ENERGY_GRADE_FOREGROUND_CLASS.E }
};
function getSustainabilityGradeStyles(grade) {
  return GRADE_STYLES[grade] ?? GRADE_STYLES.B;
}
const TAXONOMY_BENCHMARK_ANCHORS = {
  commonsenseqa: ["HellaSwag", "CommonsenseQA"],
  gsm8k: ["GSM8K"],
  arc_easy: ["ARC-Easy", "ARC-Challenge"],
  arc_challenge: ["ARC-Challenge"],
  healthbench: ["HealthBench", "TruthfulQA", "MMLU"],
  mmlu: ["MMLU"],
  mmlu_stem: ["MMLU"],
  medqa: ["MedQA", "MMLU"],
  mmlu_pro_health: ["MMLU"],
  mmlu_pro_professional_accounting: ["MMLU"],
  mmlu_pro_economics: ["MMLU"],
  mmlu_business_economics_accounting: ["MMLU"],
  mmlu_computer_science: ["MMLU"],
  mmlu_high_school_biology: ["MMLU"],
  mmlu_college_biology: ["MMLU"],
  mmlu_college_medicine: ["MMLU"],
  mmlu_professional_medicine: ["MMLU"],
  mmlu_medical_genetics: ["MMLU"],
  mmlu_virology: ["MMLU"],
  mmlu_clinical_knowledge: ["MMLU"],
  mmlu_nutrition: ["MMLU"],
  mmlu_anatomy: ["MMLU"],
  air_bench: ["TruthfulQA", "AIR Bench"],
  json_schema_bench_validity: ["MMLU", "HumanEval"],
  json_schema_bench_compliance: ["MMLU", "HumanEval"],
  bfcl: ["HumanEval", "MMLU"],
  swe_bench_verified: ["HumanEval", "MBPP"],
  humaneval: ["HumanEval"],
  text_to_cypher: ["HumanEval", "MMLU"],
  ifeval: ["IFEval", "TruthfulQA"],
  summeval: ["SummEval", "HellaSwag"],
  booksum: ["BookSum", "HellaSwag"],
  massive: ["HellaSwag", "MMLU"],
  clinc150: ["HellaSwag"],
  ag_news: ["HellaSwag"],
  jigsaw_toxic_comment: ["TruthfulQA"],
  ocrbench_v2: ["MMLU"],
  omnidocbench: ["MMLU"],
  infovqa: ["MMLU"],
  docvqa: ["MMLU"],
  mathvision: ["GSM8K", "MMLU"],
  mmmu: ["MMLU"],
  mmmu_pro: ["MMLU"],
  realworldqa: ["MMLU", "ARC-Challenge"],
  mmiu: ["MMLU"],
  zerobench: ["ARC-Challenge", "MMLU"],
  videomme: ["MMLU"],
  mmau: ["MMLU"],
  omnibench: ["MMLU"],
  mmlu_prox: ["MMLU"],
  autocodebench: ["HumanEval", "MBPP"],
  mteb_europe_v1_sts: ["MMLU", "HellaSwag"],
  mteb_code_v1_retrieval: ["HumanEval", "MMLU"],
  mteb_medical_v1_retrieval: ["MMLU", "MedQA"]
};
const REASONING_CORE = [
  "commonsenseqa",
  "arc_easy",
  "arc_challenge",
  "gsm8k"
];
const REASONING_CLINICAL = ["healthbench"];
const KNOWLEDGE_GENERAL = ["mmlu"];
const KNOWLEDGE_STEM = ["mmlu_stem"];
const KNOWLEDGE_MEDICAL = [
  "medqa",
  "mmlu_pro_health",
  "mmlu_high_school_biology",
  "mmlu_college_biology",
  "mmlu_college_medicine",
  "mmlu_professional_medicine",
  "mmlu_medical_genetics",
  "mmlu_virology",
  "mmlu_clinical_knowledge",
  "mmlu_nutrition",
  "mmlu_anatomy"
];
const KNOWLEDGE_MEDICAL_LITE = [
  "mmlu_pro_health",
  "mmlu_high_school_biology",
  "mmlu_clinical_knowledge"
];
const KNOWLEDGE_BUSINESS = [
  "mmlu_business_economics_accounting",
  "mmlu_pro_professional_accounting",
  "mmlu_pro_economics"
];
const KNOWLEDGE_CS = ["mmlu_computer_science"];
const KNOWLEDGE_LAW = ["air_bench"];
const STRUCTURED_OUTPUT = [
  "json_schema_bench_validity",
  "json_schema_bench_compliance"
];
const TOOL_USE = ["bfcl"];
const CODING = [
  "humaneval",
  "swe_bench_verified",
  "autocodebench",
  "text_to_cypher"
];
const CODING_LITE = ["humaneval", "swe_bench_verified"];
const SAFETY = ["ifeval", "air_bench"];
const SUMMARIZATION = ["summeval", "booksum"];
const SUMMARIZATION_LITE = ["summeval"];
const CLASSIFICATION = ["massive", "clinc150", "ag_news", "jigsaw_toxic_comment"];
const CLASSIFICATION_LITE = ["massive", "clinc150"];
const DOCUMENT = ["ocrbench_v2", "omnidocbench", "infovqa", "docvqa"];
const VISUAL = [
  "mathvision",
  "mmmu",
  "mmmu_pro",
  "realworldqa",
  "mmiu",
  "zerobench"
];
const VIDEO = ["videomme"];
const AUDIO = ["mmau"];
const MULTIMODAL = ["omnibench"];
const MULTILINGUAL = ["mmlu_prox"];
const EMBEDDING = [
  "mteb_europe_v1_sts",
  "mteb_code_v1_retrieval",
  "mteb_medical_v1_retrieval"
];
function ids(...groups) {
  return new Set(groups.flat());
}
const PROFILE_BENCHMARK_IDS = {
  general: ids(
    REASONING_CORE,
    KNOWLEDGE_GENERAL,
    KNOWLEDGE_STEM,
    KNOWLEDGE_MEDICAL_LITE,
    KNOWLEDGE_BUSINESS,
    KNOWLEDGE_CS,
    STRUCTURED_OUTPUT,
    TOOL_USE,
    CODING_LITE,
    SAFETY,
    SUMMARIZATION_LITE,
    CLASSIFICATION_LITE,
    MULTILINGUAL
  ),
  code: ids(
    REASONING_CORE,
    KNOWLEDGE_GENERAL,
    KNOWLEDGE_STEM,
    KNOWLEDGE_CS,
    CODING,
    TOOL_USE,
    ["mteb_code_v1_retrieval"]
  ),
  enterprise: ids(
    REASONING_CORE,
    REASONING_CLINICAL,
    KNOWLEDGE_GENERAL,
    KNOWLEDGE_STEM,
    KNOWLEDGE_MEDICAL,
    KNOWLEDGE_BUSINESS,
    KNOWLEDGE_CS,
    KNOWLEDGE_LAW,
    STRUCTURED_OUTPUT,
    TOOL_USE,
    CODING_LITE,
    SAFETY,
    SUMMARIZATION,
    CLASSIFICATION,
    MULTILINGUAL,
    EMBEDDING
  ),
  vision: ids(
    REASONING_CORE,
    KNOWLEDGE_GENERAL,
    KNOWLEDGE_STEM,
    KNOWLEDGE_MEDICAL_LITE,
    CODING_LITE,
    SAFETY,
    SUMMARIZATION_LITE,
    VISUAL,
    DOCUMENT,
    VIDEO,
    AUDIO,
    MULTIMODAL
  ),
  compact: ids(
    REASONING_CORE,
    KNOWLEDGE_GENERAL,
    KNOWLEDGE_STEM,
    CODING_LITE,
    SAFETY
  )
};
const modelScoreCache = /* @__PURE__ */ new Map();
function hashString(value) {
  let hash = 0;
  for (const char of value) {
    hash = hash * 31 + char.charCodeAt(0) | 0;
  }
  return Math.abs(hash);
}
function getBenchmarkProfile(model) {
  if (model.category === "Code") return "code";
  if (modelHasVisionCapability(model)) return "vision";
  if (model.category === "Enterprise") return "enterprise";
  if (model.parameterSize === "3B" || model.parameterSize === "7B") {
    return "compact";
  }
  if (model.parameterSize === "9B") return "compact";
  return "general";
}
function getCatalogAnchorScore(model, benchmarkId) {
  const anchors = TAXONOMY_BENCHMARK_ANCHORS[benchmarkId];
  if (!anchors) return null;
  for (const anchor of anchors) {
    const match = model.benchmarks.find((benchmark) => benchmark.name === anchor);
    if (match) return match.score;
  }
  return null;
}
function deriveTaxonomyScore(model, benchmarkId, anchorScore) {
  const hash = hashString(`${model.id}:${benchmarkId}`);
  const spread = hash % 21 - 10;
  const tierBoost = hash % 3 === 0 ? 2 : hash % 5 === 0 ? -3 : 0;
  const score = anchorScore + spread + tierBoost;
  return Math.round(Math.min(100, Math.max(0, score)) * 10) / 10;
}
function isBenchmarkEvaluated(model, benchmarkId, profile) {
  if (!(benchmarkId in BENCHMARK_TAXONOMY)) return false;
  if (!PROFILE_BENCHMARK_IDS[profile].has(benchmarkId)) return false;
  if (profile === "compact") {
    return hashString(`${model.id}:${benchmarkId}:eval`) % 4 !== 0;
  }
  return getCatalogAnchorScore(model, benchmarkId) != null;
}
function buildModelTaxonomyBenchmarkScores(model) {
  const profile = getBenchmarkProfile(model);
  const scores = {};
  for (const benchmarkId of Object.keys(BENCHMARK_TAXONOMY)) {
    if (!isBenchmarkEvaluated(model, benchmarkId, profile)) continue;
    const anchorScore = getCatalogAnchorScore(model, benchmarkId);
    if (anchorScore == null) continue;
    scores[benchmarkId] = deriveTaxonomyScore(model, benchmarkId, anchorScore);
  }
  return scores;
}
function getModelTaxonomyBenchmarkScores(model) {
  const cached = modelScoreCache.get(model.id);
  if (cached) return cached;
  const scores = buildModelTaxonomyBenchmarkScores(model);
  modelScoreCache.set(model.id, scores);
  return scores;
}
function getModelTaxonomyBenchmarkScore(model, benchmarkId) {
  return getModelTaxonomyBenchmarkScores(model)[benchmarkId] ?? null;
}
const $$splitComponentImporter$2 = () => import("./cosmos_._modelId-Dm9RJpPr.mjs");
const Route$2 = createFileRoute("/app/cosmos_/$modelId")({
  validateSearch: (search) => ({
    returnTo: typeof search.returnTo === "string" && search.returnTo.startsWith("/app/") ? search.returnTo : "/app/cosmos",
    returnLabel: typeof search.returnLabel === "string" && search.returnLabel.trim() ? search.returnLabel.trim() : "Cosmos"
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const endpoints = [
  {
    id: "sp-1",
    name: "Claims Processing",
    type: "Production",
    defaultDeployment: "mistral-large-claims-v2",
    description: "Process insurance claims with structured extraction, fraud signals, and routing summaries for adjusters.",
    budgetUsed: 127,
    status: "Running",
    monthlySpend: 14200,
    inputTokens: 284e4,
    outputTokens: 106e4,
    endpoint: "https://api.booster.ai/v1/endpoints/claims-processing",
    tokenBudget: 5e6,
    monthlyBudgetEur: 4200,
    performanceProfile: "premium"
  },
  {
    id: "sp-2",
    name: "Contract Analysis",
    type: "Production",
    defaultDeployment: "qwen-contracts",
    description: "Analyze legal contracts to identify key clauses, obligations, risks, and compliance requirements for legal review automation.",
    budgetUsed: 52,
    status: "Running",
    monthlySpend: 9800,
    inputTokens: 152e4,
    outputTokens: 34e4,
    endpoint: "https://api.booster.ai/v1/endpoints/contract-analysis",
    tokenBudget: 3e6,
    monthlyBudgetEur: 3100,
    performanceProfile: "enterprise"
  },
  {
    id: "sp-3",
    name: "Coding Copilot",
    type: "Demo",
    defaultDeployment: "codestral-v1",
    description: "Assist engineers with inline completions, refactors, and explanations inside your IDE workflows.",
    budgetUsed: 75,
    status: "Running",
    monthlySpend: 4200,
    inputTokens: 42e4,
    outputTokens: 255e3,
    endpoint: "https://api.booster.ai/v1/endpoints/coding-copilot",
    tokenBudget: 15e5,
    monthlyBudgetEur: 1800,
    performanceProfile: "best-effort"
  },
  {
    id: "sp-4",
    name: "Customer Support Bot",
    type: "POC",
    defaultDeployment: "mistral-large-support",
    description: "Resolve Tier‑1 tickets with grounded answers, handoffs, and macros aligned to your support playbook.",
    budgetUsed: 88,
    status: "Deploying",
    monthlySpend: 3e3,
    inputTokens: 58e4,
    outputTokens: 124e3,
    endpoint: "https://api.booster.ai/v1/endpoints/customer-support",
    tokenBudget: 8e5,
    monthlyBudgetEur: 900,
    performanceProfile: "best-effort"
  },
  {
    id: "sp-default",
    name: "Getting Started",
    type: "POC",
    defaultDeployment: "",
    description: "A starter inference endpoint for onboarding experiments before you deploy production workloads.",
    budgetUsed: 0,
    status: "Running",
    monthlySpend: 0,
    inputTokens: 0,
    outputTokens: 0,
    endpoint: "https://api.booster.ai/v1/endpoints/getting-started",
    tokenBudget: 5e5,
    monthlyBudgetEur: 500,
    performanceProfile: "best-effort"
  }
];
const deployments = {
  "sp-1": [
    {
      id: "dep-1",
      name: "mistral-large-claims-v2",
      model: "Mistral Large",
      version: "2024-11",
      mode: "Default",
      budgetUsed: 78,
      slaStatus: "OK",
      region: "EU-West",
      confidentialCompute: true,
      latencyP50: 320,
      costPer1MTokens: 2
    },
    {
      id: "dep-3",
      name: "deepseek-claims-shadow-2",
      model: "DeepSeek V3",
      version: "2024-12",
      mode: "Inactive",
      budgetUsed: 5,
      slaStatus: "OK",
      region: "EU-West",
      confidentialCompute: false,
      latencyP50: 190,
      costPer1MTokens: 0.27
    }
  ],
  "sp-2": [
    {
      id: "dep-4",
      name: "qwen-contracts",
      model: "Qwen 2.5 72B",
      version: "2024-09",
      mode: "Default",
      budgetUsed: 62,
      slaStatus: "OK",
      region: "US-East",
      confidentialCompute: true,
      latencyP50: 410,
      costPer1MTokens: 1.5
    },
    {
      id: "dep-5",
      name: "llama-70b-contracts-test",
      model: "Llama 3.1 70B",
      version: "2024-07",
      mode: "Inactive",
      budgetUsed: 0,
      slaStatus: "OK",
      region: "US-East",
      confidentialCompute: false,
      latencyP50: 520,
      costPer1MTokens: 0.9
    }
  ],
  "sp-3": [
    {
      id: "dep-6",
      name: "codestral-v1",
      model: "Codestral",
      version: "2024-05",
      mode: "Default",
      budgetUsed: 45,
      slaStatus: "OK",
      region: "EU-West",
      confidentialCompute: false,
      latencyP50: 150,
      costPer1MTokens: 1
    }
  ],
  "sp-4": [
    {
      id: "dep-7",
      name: "mistral-large-support",
      model: "Mistral Large",
      version: "2024-11",
      mode: "Default",
      budgetUsed: 88,
      slaStatus: "At Risk",
      region: "US-East",
      confidentialCompute: false,
      latencyP50: 680,
      costPer1MTokens: 2
    }
  ],
  "sp-default": []
};
const endpointRequestLogs = {
  "sp-1": [
    {
      id: "req_cpk9n2x8",
      timestamp: "2026-05-18T14:22:41.203Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 418,
      inputTokens: 1842,
      outputTokens: 612
    },
    {
      id: "req_cpk9mvd1",
      timestamp: "2026-05-18T14:21:09.881Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 392,
      inputTokens: 2104,
      outputTokens: 884
    },
    {
      id: "req_cpk9lfzq",
      timestamp: "2026-05-18T14:18:55.014Z",
      status: "rate_limited",
      httpStatus: 429,
      latencyMs: 12,
      inputTokens: 0,
      outputTokens: 0
    },
    {
      id: "req_cpk9k8hm",
      timestamp: "2026-05-18T14:15:02.667Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 511,
      inputTokens: 3420,
      outputTokens: 1208
    },
    {
      id: "req_cpk9j4bw",
      timestamp: "2026-05-18T14:12:33.119Z",
      status: "error",
      httpStatus: 502,
      latencyMs: 30120,
      inputTokens: 980,
      outputTokens: 0
    },
    {
      id: "req_cpk9hzr7",
      timestamp: "2026-05-18T14:09:18.442Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 445,
      inputTokens: 1256,
      outputTokens: 340
    },
    {
      id: "req_cpk9gw03",
      timestamp: "2026-05-18T14:07:02.110Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 403,
      inputTokens: 1920,
      outputTokens: 556
    },
    {
      id: "req_cpk9fv88",
      timestamp: "2026-05-18T14:04:51.772Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 467,
      inputTokens: 2008,
      outputTokens: 604
    },
    {
      id: "req_cpk9eu42",
      timestamp: "2026-05-18T14:02:19.005Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 521,
      inputTokens: 3102,
      outputTokens: 892
    },
    {
      id: "req_cpk9dt15",
      timestamp: "2026-05-18T13:59:44.330Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 389,
      inputTokens: 1412,
      outputTokens: 298
    },
    {
      id: "req_cpk9cs97",
      timestamp: "2026-05-18T13:57:08.901Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 442,
      inputTokens: 1678,
      outputTokens: 421
    },
    {
      id: "req_cpk9br61",
      timestamp: "2026-05-18T13:54:22.155Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 476,
      inputTokens: 2210,
      outputTokens: 702
    },
    {
      id: "req_cpk9aq33",
      timestamp: "2026-05-18T13:51:59.620Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 355,
      inputTokens: 998,
      outputTokens: 214
    },
    {
      id: "req_cpk99pp8",
      timestamp: "2026-05-18T13:49:33.088Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 498,
      inputTokens: 2884,
      outputTokens: 1020
    },
    {
      id: "req_cpk98nn6",
      timestamp: "2026-05-18T13:46:12.441Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 431,
      inputTokens: 1544,
      outputTokens: 388
    },
    {
      id: "req_cpk97mm4",
      timestamp: "2026-05-18T13:43:01.902Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 412,
      inputTokens: 1722,
      outputTokens: 465
    },
    {
      id: "req_cpk96ll2",
      timestamp: "2026-05-18T13:40:27.319Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 584,
      inputTokens: 3556,
      outputTokens: 1104
    },
    {
      id: "req_cpk95kk0",
      timestamp: "2026-05-18T13:37:55.760Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 369,
      inputTokens: 1288,
      outputTokens: 276
    },
    {
      id: "req_cpk94jj9",
      timestamp: "2026-05-18T13:35:18.204Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 453,
      inputTokens: 2064,
      outputTokens: 591
    },
    {
      id: "req_cpk93ii7",
      timestamp: "2026-05-18T13:32:44.551Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 527,
      inputTokens: 2998,
      outputTokens: 834
    },
    {
      id: "req_cpk92hh5",
      timestamp: "2026-05-18T13:29:09.887Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 401,
      inputTokens: 1876,
      outputTokens: 502
    }
  ],
  "sp-2": [
    {
      id: "req_cpkaa001",
      timestamp: "2026-05-18T13:58:02.100Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 672,
      inputTokens: 4800,
      outputTokens: 920
    },
    {
      id: "req_cpka9yy4",
      timestamp: "2026-05-18T13:55:44.555Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 589,
      inputTokens: 3100,
      outputTokens: 1440
    },
    {
      id: "req_cpka8zz2",
      timestamp: "2026-05-18T13:51:11.020Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 701,
      inputTokens: 5020,
      outputTokens: 780
    }
  ],
  "sp-3": [
    {
      id: "req_cpkb7aa3",
      timestamp: "2026-05-18T12:40:19.330Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 134,
      inputTokens: 312,
      outputTokens: 96
    },
    {
      id: "req_cpkb6bb1",
      timestamp: "2026-05-18T12:39:55.812Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 118,
      inputTokens: 288,
      outputTokens: 72
    }
  ],
  "sp-4": [
    {
      id: "req_cpkc5cc9",
      timestamp: "2026-05-18T11:22:08.900Z",
      status: "success",
      httpStatus: 200,
      latencyMs: 891,
      inputTokens: 2200,
      outputTokens: 412
    },
    {
      id: "req_cpkc4dd8",
      timestamp: "2026-05-18T11:19:41.211Z",
      status: "error",
      httpStatus: 504,
      latencyMs: 6e4,
      inputTokens: 1050,
      outputTokens: 0
    }
  ],
  "sp-default": []
};
const models = [
  {
    id: "m-3",
    name: "Mistral Large",
    provider: "Mistral AI",
    version: "2024-11",
    parameterSize: "123B",
    description: "Mistral's flagship model delivering strong multilingual performance at competitive pricing, optimized for speed and efficiency.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Multilingual", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 86,
        subs: [
          { name: "Logical Deduction", score: 87 },
          { name: "Mathematical", score: 83 },
          { name: "Causal Inference", score: 85 }
        ]
      },
      {
        name: "Language",
        score: 90,
        subs: [
          { name: "Summarization", score: 89 },
          { name: "Translation", score: 94 },
          { name: "Creative Writing", score: 85 }
        ]
      },
      {
        name: "Multilingual",
        score: 93,
        subs: [
          { name: "European Languages", score: 95 },
          { name: "Asian Languages", score: 88 },
          { name: "Code-switching", score: 91 }
        ]
      },
      {
        name: "Efficiency",
        score: 92,
        subs: [
          { name: "Throughput", score: 94 },
          { name: "Token Efficiency", score: 91 },
          { name: "Batch Processing", score: 90 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 81.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 73.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 83.7, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 88.1,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 89.4, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 68.9, maxScore: 100, category: "Safety" }
    ],
    popularity: "18.1k",
    inputCostPer1M: 0.89,
    outputCostPer1M: 1.2,
    contextLength: 128e3,
    addedDate: "2024-11-05",
    tokensPerSecond: 105,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 540,
    availableVersions: ["2024-11", "2024-07", "2024-02"],
    status: "Active"
  },
  {
    id: "m-5",
    name: "Codestral",
    provider: "Mistral AI",
    version: "2024-05",
    parameterSize: "22B",
    description: "Purpose-built for software engineering tasks — code generation, debugging, refactoring, and technical documentation.",
    domain: "Code & Engineering",
    strengths: ["Code Generation", "Debugging", "Explanation"],
    capabilities: [
      {
        name: "Code",
        score: 93,
        subs: [
          { name: "Generation", score: 95 },
          { name: "Debugging", score: 92 },
          { name: "Refactoring", score: 91 }
        ]
      },
      {
        name: "Language",
        score: 78,
        subs: [
          { name: "Technical Docs", score: 88 },
          { name: "Summarization", score: 75 },
          { name: "Creative Writing", score: 62 }
        ]
      },
      {
        name: "Reasoning",
        score: 84,
        subs: [
          { name: "Logical Deduction", score: 86 },
          { name: "Mathematical", score: 82 },
          { name: "Algorithmic", score: 88 }
        ]
      },
      {
        name: "Efficiency",
        score: 91,
        subs: [
          { name: "Throughput", score: 93 },
          { name: "Token Efficiency", score: 90 },
          { name: "Batch Processing", score: 89 }
        ]
      }
    ],
    benchmarks: [
      { name: "HumanEval", score: 92.4, maxScore: 100, category: "Code" },
      { name: "MBPP", score: 88.6, maxScore: 100, category: "Code" },
      { name: "DS-1000", score: 85.3, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 79.2, maxScore: 100, category: "Math" },
      { name: "MMLU", score: 72.1, maxScore: 100, category: "Knowledge" },
      {
        name: "ARC-Challenge",
        score: 81.5,
        maxScore: 100,
        category: "Reasoning"
      }
    ],
    popularity: "31.2k",
    inputCostPer1M: 1,
    outputCostPer1M: 3,
    contextLength: 32e3,
    addedDate: "2024-05-29",
    tokensPerSecond: 120,
    sustainability: "A",
    category: "Code",
    hosting: "Booster Powered",
    avgResponseTokens: 890,
    availableVersions: ["2024-05", "2024-01"],
    status: "Active"
  },
  {
    id: "m-7",
    name: "Llama 3.1 405B",
    provider: "Meta",
    version: "2024-07",
    parameterSize: "405B",
    description: "Meta's largest open-source model offering near-frontier performance with full customizability and self-hosting options.",
    domain: "General Purpose",
    strengths: ["Open Source", "Customizable", "Reasoning"],
    capabilities: [
      {
        name: "Reasoning",
        score: 89,
        subs: [
          { name: "Logical Deduction", score: 90 },
          { name: "Mathematical", score: 87 },
          { name: "Causal Inference", score: 88 }
        ]
      },
      {
        name: "Language",
        score: 88,
        subs: [
          { name: "Summarization", score: 90 },
          { name: "Translation", score: 85 },
          { name: "Creative Writing", score: 87 }
        ]
      },
      {
        name: "Code",
        score: 86,
        subs: [
          { name: "Generation", score: 88 },
          { name: "Debugging", score: 84 },
          { name: "Explanation", score: 85 }
        ]
      },
      {
        name: "Customization",
        score: 95,
        subs: [
          { name: "Fine-tuning", score: 97 },
          { name: "Prompt Engineering", score: 93 },
          { name: "Domain Adaptation", score: 94 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 85.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 81.7, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 87.3, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 91.2,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 90.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 66.8, maxScore: 100, category: "Safety" }
    ],
    popularity: "5.1k",
    inputCostPer1M: 3,
    outputCostPer1M: 9,
    contextLength: 128e3,
    addedDate: "2024-07-23",
    tokensPerSecond: 28,
    sustainability: "B",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 620,
    availableVersions: ["2024-07", "2024-04"],
    status: "Sunsetting"
  },
  {
    id: "m-9",
    name: "Mistral Nemo",
    provider: "Mistral AI",
    version: "2024-07",
    parameterSize: "12B",
    description: "A compact 12B parameter model co-developed with NVIDIA, offering strong performance for its size with excellent efficiency.",
    domain: "General Purpose",
    strengths: ["Compact", "Efficient", "Cost Effective"],
    capabilities: [
      {
        name: "Reasoning",
        score: 78,
        subs: [
          { name: "Logical Deduction", score: 79 },
          { name: "Mathematical", score: 75 },
          { name: "Causal Inference", score: 77 }
        ]
      },
      {
        name: "Language",
        score: 82,
        subs: [
          { name: "Summarization", score: 84 },
          { name: "Translation", score: 80 },
          { name: "Creative Writing", score: 78 }
        ]
      },
      {
        name: "Efficiency",
        score: 96,
        subs: [
          { name: "Throughput", score: 98 },
          { name: "Token Efficiency", score: 95 },
          { name: "Batch Processing", score: 94 }
        ]
      },
      {
        name: "Multilingual",
        score: 85,
        subs: [
          { name: "European Languages", score: 88 },
          { name: "Asian Languages", score: 80 },
          { name: "Code-switching", score: 84 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 68, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 65.2, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 71.4, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 76.8,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 80.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 62.5, maxScore: 100, category: "Safety" }
    ],
    popularity: "14.7k",
    inputCostPer1M: 0.3,
    outputCostPer1M: 0.3,
    contextLength: 128e3,
    addedDate: "2024-07-18",
    tokensPerSecond: 185,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 380,
    availableVersions: ["2024-07"],
    status: "Active"
  },
  {
    id: "m-10",
    name: "Llama 3.1 70B",
    provider: "Meta",
    version: "2024-07",
    parameterSize: "70B",
    description: "Meta's mid-size open-source model balancing strong reasoning with fast inference, ideal for production workloads.",
    domain: "General Purpose",
    strengths: ["Balanced", "Open Source", "Fast"],
    capabilities: [
      {
        name: "Reasoning",
        score: 84,
        subs: [
          { name: "Logical Deduction", score: 85 },
          { name: "Mathematical", score: 82 },
          { name: "Causal Inference", score: 83 }
        ]
      },
      {
        name: "Language",
        score: 86,
        subs: [
          { name: "Summarization", score: 88 },
          { name: "Translation", score: 83 },
          { name: "Creative Writing", score: 84 }
        ]
      },
      {
        name: "Code",
        score: 82,
        subs: [
          { name: "Generation", score: 84 },
          { name: "Debugging", score: 80 },
          { name: "Explanation", score: 81 }
        ]
      },
      {
        name: "Efficiency",
        score: 90,
        subs: [
          { name: "Throughput", score: 92 },
          { name: "Token Efficiency", score: 89 },
          { name: "Batch Processing", score: 88 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 79.3, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 76.8, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 82.1, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 86.4,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 87.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 63.7, maxScore: 100, category: "Safety" }
    ],
    popularity: "22.3k",
    inputCostPer1M: 0.9,
    outputCostPer1M: 0.9,
    contextLength: 128e3,
    addedDate: "2024-07-23",
    tokensPerSecond: 72,
    sustainability: "A",
    category: "General",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 520,
    availableVersions: ["2024-07", "2024-04"],
    status: "Active"
  },
  {
    id: "m-11",
    name: "Qwen 2.5 72B",
    provider: "Alibaba",
    version: "2024-09",
    parameterSize: "72B",
    description: "Alibaba's powerful open-source model with exceptional multilingual and mathematical capabilities across 29+ languages.",
    domain: "General Purpose",
    strengths: ["Multilingual", "Mathematics", "Open Source"],
    capabilities: [
      {
        name: "Reasoning",
        score: 87,
        subs: [
          { name: "Logical Deduction", score: 88 },
          { name: "Mathematical", score: 91 },
          { name: "Causal Inference", score: 84 }
        ]
      },
      {
        name: "Language",
        score: 89,
        subs: [
          { name: "Summarization", score: 90 },
          { name: "Translation", score: 92 },
          { name: "Creative Writing", score: 83 }
        ]
      },
      {
        name: "Multilingual",
        score: 94,
        subs: [
          { name: "European Languages", score: 93 },
          { name: "Asian Languages", score: 97 },
          { name: "Code-switching", score: 90 }
        ]
      },
      {
        name: "Code",
        score: 85,
        subs: [
          { name: "Generation", score: 87 },
          { name: "Debugging", score: 83 },
          { name: "Explanation", score: 84 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 83.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 79.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 91.6, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 89.3,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 88.7, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 67.2, maxScore: 100, category: "Safety" }
    ],
    popularity: "8.9k",
    inputCostPer1M: 1.5,
    outputCostPer1M: 4,
    contextLength: 128e3,
    addedDate: "2024-09-19",
    tokensPerSecond: 65,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 590,
    availableVersions: ["2024-09", "2024-06"],
    status: "Beta"
  },
  {
    id: "m-12",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    version: "2024-12",
    parameterSize: "671B",
    description: "A highly efficient open-source model with mixture-of-experts architecture, delivering frontier-level reasoning at low cost.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Cost Efficient", "MoE Architecture"],
    capabilities: [
      {
        name: "Reasoning",
        score: 92,
        subs: [
          { name: "Logical Deduction", score: 93 },
          { name: "Mathematical", score: 94 },
          { name: "Causal Inference", score: 90 }
        ]
      },
      {
        name: "Language",
        score: 88,
        subs: [
          { name: "Summarization", score: 89 },
          { name: "Translation", score: 87 },
          { name: "Creative Writing", score: 86 }
        ]
      },
      {
        name: "Code",
        score: 90,
        subs: [
          { name: "Generation", score: 92 },
          { name: "Debugging", score: 89 },
          { name: "Explanation", score: 88 }
        ]
      },
      {
        name: "Efficiency",
        score: 94,
        subs: [
          { name: "Throughput", score: 95 },
          { name: "Token Efficiency", score: 96 },
          { name: "Batch Processing", score: 92 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 87.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 89.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 93.8, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 94.2,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 92.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 71.3, maxScore: 100, category: "Safety" }
    ],
    popularity: "15.6k",
    inputCostPer1M: 0.27,
    outputCostPer1M: 1.1,
    contextLength: 128e3,
    addedDate: "2024-12-26",
    tokensPerSecond: 95,
    sustainability: "A",
    category: "General",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 650,
    availableVersions: ["2024-12"],
    status: "Beta"
  },
  {
    id: "m-13",
    name: "Mixtral 8x22B",
    provider: "Mistral AI",
    version: "2024-04",
    parameterSize: "141B",
    description: "Mistral's sparse mixture-of-experts model offering excellent throughput and quality, ideal for high-volume enterprise workloads.",
    domain: "Enterprise & RAG",
    strengths: ["RAG", "Enterprise", "Throughput"],
    capabilities: [
      {
        name: "RAG",
        score: 91,
        subs: [
          { name: "Retrieval Accuracy", score: 93 },
          { name: "Citation Quality", score: 89 },
          { name: "Source Synthesis", score: 90 }
        ]
      },
      {
        name: "Language",
        score: 86,
        subs: [
          { name: "Summarization", score: 88 },
          { name: "Translation", score: 85 },
          { name: "Structured Extraction", score: 87 }
        ]
      },
      {
        name: "Efficiency",
        score: 93,
        subs: [
          { name: "Throughput", score: 95 },
          { name: "Token Efficiency", score: 92 },
          { name: "Batch Processing", score: 91 }
        ]
      },
      {
        name: "Reasoning",
        score: 83,
        subs: [
          { name: "Logical Deduction", score: 84 },
          { name: "Mathematical", score: 80 },
          { name: "Causal Inference", score: 83 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 77.8, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 70.6, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 76.3, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 85.9,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 86.4, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 65.8, maxScore: 100, category: "Safety" }
    ],
    popularity: "11.2k",
    inputCostPer1M: 2,
    outputCostPer1M: 6,
    contextLength: 65e3,
    addedDate: "2024-04-17",
    tokensPerSecond: 88,
    sustainability: "A",
    category: "Enterprise",
    hosting: "EUrouter",
    quantization: "INT4",
    avgResponseTokens: 560,
    availableVersions: ["2024-04"],
    status: "Deprecated"
  },
  {
    id: "m-14",
    name: "GPT-4o",
    provider: "OpenAI",
    version: "2024-08",
    parameterSize: "200B",
    description: "Flagship multimodal model with strong reasoning, vision, and tool use for production assistants.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Multilingual", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 91,
        subs: [
          { name: "Logical Deduction", score: 92 },
          { name: "Mathematical", score: 90 },
          { name: "Causal Inference", score: 90 }
        ]
      },
      {
        name: "Language",
        score: 92,
        subs: [
          { name: "Summarization", score: 91 },
          { name: "Translation", score: 90 },
          { name: "Creative Writing", score: 92 }
        ]
      },
      {
        name: "Code",
        score: 88,
        subs: [
          { name: "Generation", score: 90 },
          { name: "Debugging", score: 86 },
          { name: "Explanation", score: 87 }
        ]
      },
      {
        name: "Efficiency",
        score: 85,
        subs: [
          { name: "Throughput", score: 86 },
          { name: "Token Efficiency", score: 84 },
          { name: "Batch Processing", score: 84 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 88.7, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 90.2, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 93.1, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 92.8,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 89.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 72.4, maxScore: 100, category: "Safety" }
    ],
    popularity: "42.1k",
    inputCostPer1M: 4.5,
    outputCostPer1M: 13.5,
    contextLength: 128e3,
    addedDate: "2024-08-12",
    tokensPerSecond: 78,
    sustainability: "B",
    category: "General",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 480,
    availableVersions: ["2024-08"],
    status: "Active"
  },
  {
    id: "m-15",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    version: "2024-04",
    parameterSize: "175B",
    description: "Large-context workhorse for agents, retrieval, and long document workflows.",
    domain: "General Purpose",
    strengths: ["Long Context", "Analysis", "Tool Use"],
    capabilities: [
      {
        name: "Reasoning",
        score: 88,
        subs: [
          { name: "Logical Deduction", score: 89 },
          { name: "Mathematical", score: 86 },
          { name: "Causal Inference", score: 87 }
        ]
      },
      {
        name: "Language",
        score: 90,
        subs: [
          { name: "Summarization", score: 92 },
          { name: "Translation", score: 88 },
          { name: "Creative Writing", score: 89 }
        ]
      },
      {
        name: "Code",
        score: 86,
        subs: [
          { name: "Generation", score: 87 },
          { name: "Debugging", score: 85 },
          { name: "Explanation", score: 85 }
        ]
      },
      {
        name: "Efficiency",
        score: 82,
        subs: [
          { name: "Throughput", score: 83 },
          { name: "Token Efficiency", score: 81 },
          { name: "Batch Processing", score: 81 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 86.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 88, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 91.4, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 91,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 88, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 70.1, maxScore: 100, category: "Safety" }
    ],
    popularity: "36.8k",
    inputCostPer1M: 8,
    outputCostPer1M: 24,
    contextLength: 128e3,
    addedDate: "2024-04-09",
    tokensPerSecond: 55,
    sustainability: "C",
    category: "General",
    hosting: "EUrouter",
    quantization: "INT4",
    avgResponseTokens: 720,
    availableVersions: ["2024-04"],
    status: "Active"
  },
  {
    id: "m-16",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    version: "2024-05",
    parameterSize: "175B",
    description: "Long-context Gemini variant tuned for research, summarization, and multimodal understanding.",
    domain: "General Purpose",
    strengths: ["Long Context", "Analysis", "Multilingual"],
    capabilities: [
      {
        name: "Reasoning",
        score: 87,
        subs: [
          { name: "Logical Deduction", score: 88 },
          { name: "Mathematical", score: 86 },
          { name: "Causal Inference", score: 86 }
        ]
      },
      {
        name: "Language",
        score: 89,
        subs: [
          { name: "Summarization", score: 91 },
          { name: "Translation", score: 88 },
          { name: "Creative Writing", score: 87 }
        ]
      },
      {
        name: "Code",
        score: 84,
        subs: [
          { name: "Generation", score: 85 },
          { name: "Debugging", score: 82 },
          { name: "Explanation", score: 84 }
        ]
      },
      {
        name: "Multilingual",
        score: 90,
        subs: [
          { name: "European Languages", score: 89 },
          { name: "Asian Languages", score: 91 },
          { name: "Code-switching", score: 88 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 85.9, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 84.1, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 89, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 89.5,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 87.3, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 68.2, maxScore: 100, category: "Safety" }
    ],
    popularity: "19.4k",
    inputCostPer1M: 2.5,
    outputCostPer1M: 7.5,
    contextLength: 1e6,
    addedDate: "2024-05-14",
    tokensPerSecond: 48,
    sustainability: "B",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 890,
    availableVersions: ["2024-05"],
    status: "Active"
  },
  {
    id: "m-17",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    version: "2024-06",
    parameterSize: "8B",
    description: "Fast, cost-efficient Gemini for high-volume chat, classification, and extraction.",
    domain: "General Purpose",
    strengths: ["Speed", "Cost Efficient", "Throughput"],
    capabilities: [
      {
        name: "Reasoning",
        score: 80,
        subs: [
          { name: "Logical Deduction", score: 81 },
          { name: "Mathematical", score: 78 },
          { name: "Causal Inference", score: 80 }
        ]
      },
      {
        name: "Language",
        score: 85,
        subs: [
          { name: "Summarization", score: 86 },
          { name: "Translation", score: 84 },
          { name: "Creative Writing", score: 83 }
        ]
      },
      {
        name: "Code",
        score: 79,
        subs: [
          { name: "Generation", score: 80 },
          { name: "Debugging", score: 77 },
          { name: "Explanation", score: 79 }
        ]
      },
      {
        name: "Efficiency",
        score: 94,
        subs: [
          { name: "Throughput", score: 96 },
          { name: "Token Efficiency", score: 93 },
          { name: "Batch Processing", score: 92 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 78.9, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 77.2, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 81.5, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 83.6,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 84.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 65, maxScore: 100, category: "Safety" }
    ],
    popularity: "28.0k",
    inputCostPer1M: 0.35,
    outputCostPer1M: 1.05,
    contextLength: 1e6,
    addedDate: "2024-06-20",
    tokensPerSecond: 210,
    sustainability: "A",
    category: "General",
    hosting: "EUrouter",
    quantization: "INT4",
    avgResponseTokens: 340,
    availableVersions: ["2024-06"],
    status: "Active"
  },
  {
    id: "m-18",
    name: "Gemma 2 27B",
    provider: "Google",
    version: "2024-06",
    parameterSize: "27B",
    description: "Open-weights Gemma family model balancing quality and deployability on modest hardware.",
    domain: "General Purpose",
    strengths: ["Open Source", "Cost Efficient", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 82,
        subs: [
          { name: "Logical Deduction", score: 83 },
          { name: "Mathematical", score: 80 },
          { name: "Causal Inference", score: 82 }
        ]
      },
      {
        name: "Language",
        score: 84,
        subs: [
          { name: "Summarization", score: 85 },
          { name: "Translation", score: 83 },
          { name: "Creative Writing", score: 83 }
        ]
      },
      {
        name: "Code",
        score: 81,
        subs: [
          { name: "Generation", score: 82 },
          { name: "Debugging", score: 79 },
          { name: "Explanation", score: 81 }
        ]
      },
      {
        name: "Efficiency",
        score: 88,
        subs: [
          { name: "Throughput", score: 90 },
          { name: "Token Efficiency", score: 87 },
          { name: "Batch Processing", score: 86 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 75.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 75, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 80.6, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 84.4,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 85.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 64.3, maxScore: 100, category: "Safety" }
    ],
    popularity: "12.3k",
    inputCostPer1M: 0.2,
    outputCostPer1M: 0.2,
    contextLength: 8192,
    addedDate: "2024-06-27",
    tokensPerSecond: 145,
    sustainability: "A",
    category: "General",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 410,
    availableVersions: ["2024-06"],
    status: "Active"
  },
  {
    id: "m-19",
    name: "EuroLLM 9B",
    provider: "EuroLLM",
    version: "2024-10",
    parameterSize: "9B",
    description: "EU-centric open model emphasizing multilingual coverage across official EU languages.",
    domain: "General Purpose",
    strengths: ["Multilingual", "Cost Efficient", "Compliance"],
    capabilities: [
      {
        name: "Reasoning",
        score: 76,
        subs: [
          { name: "Logical Deduction", score: 77 },
          { name: "Mathematical", score: 73 },
          { name: "Causal Inference", score: 76 }
        ]
      },
      {
        name: "Language",
        score: 81,
        subs: [
          { name: "Summarization", score: 82 },
          { name: "Translation", score: 84 },
          { name: "Creative Writing", score: 78 }
        ]
      },
      {
        name: "Multilingual",
        score: 88,
        subs: [
          { name: "European Languages", score: 91 },
          { name: "Asian Languages", score: 72 },
          { name: "Code-switching", score: 85 }
        ]
      },
      {
        name: "Efficiency",
        score: 90,
        subs: [
          { name: "Throughput", score: 91 },
          { name: "Token Efficiency", score: 89 },
          { name: "Batch Processing", score: 89 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 70.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 68.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 74.2, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 78.1,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 79.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 61, maxScore: 100, category: "Safety" }
    ],
    popularity: "4.2k",
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.45,
    contextLength: 8192,
    addedDate: "2024-10-02",
    tokensPerSecond: 175,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    avgResponseTokens: 360,
    availableVersions: ["2024-10"],
    status: "Active"
  },
  {
    id: "m-20",
    name: "EuroLLM 70B",
    provider: "EuroLLM",
    version: "2024-10",
    parameterSize: "70B",
    description: "Larger EuroLLM variant for enterprise assistants requiring stronger reasoning and grounding.",
    domain: "Enterprise & RAG",
    strengths: ["RAG", "Enterprise", "Multilingual"],
    capabilities: [
      {
        name: "RAG",
        score: 86,
        subs: [
          { name: "Retrieval Accuracy", score: 87 },
          { name: "Citation Quality", score: 85 },
          { name: "Source Synthesis", score: 85 }
        ]
      },
      {
        name: "Reasoning",
        score: 83,
        subs: [
          { name: "Logical Deduction", score: 84 },
          { name: "Mathematical", score: 81 },
          { name: "Causal Inference", score: 83 }
        ]
      },
      {
        name: "Language",
        score: 85,
        subs: [
          { name: "Summarization", score: 86 },
          { name: "Translation", score: 87 },
          { name: "Structured Extraction", score: 84 }
        ]
      },
      {
        name: "Efficiency",
        score: 82,
        subs: [
          { name: "Throughput", score: 83 },
          { name: "Token Efficiency", score: 81 },
          { name: "Batch Processing", score: 81 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 78, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 74.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 82.8, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 85.2,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 84.9, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 66.5, maxScore: 100, category: "Safety" }
    ],
    popularity: "3.1k",
    inputCostPer1M: 1.1,
    outputCostPer1M: 3.3,
    contextLength: 32768,
    addedDate: "2024-10-15",
    tokensPerSecond: 62,
    sustainability: "B",
    category: "Enterprise",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 510,
    availableVersions: ["2024-10"],
    status: "Beta"
  },
  {
    id: "m-21",
    name: "Multiverse Core",
    provider: "Multiverse",
    version: "2024-09",
    parameterSize: "72B",
    description: "General frontier-class model from Multiverse AI for balanced quality and latency.",
    domain: "General Purpose",
    strengths: ["Balanced", "Speed", "Reasoning"],
    capabilities: [
      {
        name: "Reasoning",
        score: 88,
        subs: [
          { name: "Logical Deduction", score: 89 },
          { name: "Mathematical", score: 86 },
          { name: "Causal Inference", score: 88 }
        ]
      },
      {
        name: "Language",
        score: 87,
        subs: [
          { name: "Summarization", score: 88 },
          { name: "Translation", score: 86 },
          { name: "Creative Writing", score: 86 }
        ]
      },
      {
        name: "Code",
        score: 85,
        subs: [
          { name: "Generation", score: 86 },
          { name: "Debugging", score: 83 },
          { name: "Explanation", score: 85 }
        ]
      },
      {
        name: "Efficiency",
        score: 86,
        subs: [
          { name: "Throughput", score: 88 },
          { name: "Token Efficiency", score: 85 },
          { name: "Batch Processing", score: 84 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 84.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 85.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 88.7, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 88.9,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 87.5, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 69.8, maxScore: 100, category: "Safety" }
    ],
    popularity: "6.7k",
    inputCostPer1M: 2.2,
    outputCostPer1M: 6.6,
    contextLength: 128e3,
    addedDate: "2024-09-05",
    tokensPerSecond: 92,
    sustainability: "B",
    category: "General",
    hosting: "EUrouter",
    quantization: "INT4",
    avgResponseTokens: 470,
    availableVersions: ["2024-09"],
    status: "Active"
  },
  {
    id: "m-22",
    name: "Multiverse Edge",
    provider: "Multiverse",
    version: "2024-11",
    parameterSize: "7B",
    description: "Edge-optimized Multiverse model for low-latency assistants and mobile backends.",
    domain: "General Purpose",
    strengths: ["Speed", "Cost Efficient", "Throughput"],
    capabilities: [
      {
        name: "Reasoning",
        score: 78,
        subs: [
          { name: "Logical Deduction", score: 79 },
          { name: "Mathematical", score: 75 },
          { name: "Causal Inference", score: 78 }
        ]
      },
      {
        name: "Language",
        score: 80,
        subs: [
          { name: "Summarization", score: 81 },
          { name: "Translation", score: 79 },
          { name: "Creative Writing", score: 79 }
        ]
      },
      {
        name: "Code",
        score: 76,
        subs: [
          { name: "Generation", score: 77 },
          { name: "Debugging", score: 74 },
          { name: "Explanation", score: 76 }
        ]
      },
      {
        name: "Efficiency",
        score: 95,
        subs: [
          { name: "Throughput", score: 97 },
          { name: "Token Efficiency", score: 94 },
          { name: "Batch Processing", score: 93 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 72.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 72.8, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 77.5, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 80.2,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 82, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 63.4, maxScore: 100, category: "Safety" }
    ],
    popularity: "5.4k",
    inputCostPer1M: 0.45,
    outputCostPer1M: 1.35,
    contextLength: 32e3,
    addedDate: "2024-11-08",
    tokensPerSecond: 240,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    avgResponseTokens: 280,
    availableVersions: ["2024-11"],
    status: "Active"
  },
  {
    id: "m-23",
    name: "Mistral Small",
    provider: "Mistral AI",
    version: "2024-11",
    parameterSize: "22B",
    description: "Compact Mistral model for cost-sensitive workloads with solid multilingual coverage.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Multilingual", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 74,
        subs: [
          { name: "Logical Deduction", score: 75 },
          { name: "Mathematical", score: 71 },
          { name: "Causal Inference", score: 75 }
        ]
      },
      {
        name: "Language",
        score: 79,
        subs: [
          { name: "Summarization", score: 80 },
          { name: "Translation", score: 78 },
          { name: "Creative Writing", score: 78 }
        ]
      },
      {
        name: "Multilingual",
        score: 82,
        subs: [
          { name: "European Languages", score: 84 },
          { name: "Asian Languages", score: 76 },
          { name: "Code-switching", score: 81 }
        ]
      },
      {
        name: "Efficiency",
        score: 91,
        subs: [
          { name: "Throughput", score: 93 },
          { name: "Token Efficiency", score: 90 },
          { name: "Batch Processing", score: 89 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 69.8, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 70.1, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 76, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 79.5,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 81.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 62.8, maxScore: 100, category: "Safety" }
    ],
    popularity: "21.5k",
    inputCostPer1M: 0.18,
    outputCostPer1M: 0.55,
    contextLength: 32e3,
    addedDate: "2024-11-18",
    tokensPerSecond: 195,
    sustainability: "A",
    category: "General",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 320,
    availableVersions: ["2024-11"],
    status: "Active"
  },
  {
    id: "m-24",
    name: "Mixtral 8x7B",
    provider: "Mistral AI",
    version: "2023-12",
    parameterSize: "47B",
    description: "Classic sparse MoE model — strong quality per euro for batch and offline workloads.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Throughput", "Open Weights"],
    capabilities: [
      {
        name: "Reasoning",
        score: 79,
        subs: [
          { name: "Logical Deduction", score: 80 },
          { name: "Mathematical", score: 76 },
          { name: "Causal Inference", score: 79 }
        ]
      },
      {
        name: "Language",
        score: 81,
        subs: [
          { name: "Summarization", score: 82 },
          { name: "Translation", score: 80 },
          { name: "Creative Writing", score: 80 }
        ]
      },
      {
        name: "Code",
        score: 78,
        subs: [
          { name: "Generation", score: 79 },
          { name: "Debugging", score: 76 },
          { name: "Explanation", score: 78 }
        ]
      },
      {
        name: "Efficiency",
        score: 89,
        subs: [
          { name: "Throughput", score: 91 },
          { name: "Token Efficiency", score: 88 },
          { name: "Batch Processing", score: 87 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 70.6, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 74.8, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 74.4, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 81,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 83.3, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 61.5, maxScore: 100, category: "Safety" }
    ],
    popularity: "33.0k",
    inputCostPer1M: 0.24,
    outputCostPer1M: 0.24,
    contextLength: 32768,
    addedDate: "2023-12-11",
    tokensPerSecond: 125,
    sustainability: "B",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 440,
    availableVersions: ["2023-12"],
    status: "Sunsetting"
  },
  {
    id: "m-25",
    name: "Llama 3.2 3B",
    provider: "Meta",
    version: "2024-09",
    parameterSize: "3B",
    description: "Tiny Llama 3.2 for on-device and ultra-low-latency inference.",
    domain: "General Purpose",
    strengths: ["Speed", "Cost Efficient", "Open Source"],
    capabilities: [
      {
        name: "Reasoning",
        score: 68,
        subs: [
          { name: "Logical Deduction", score: 69 },
          { name: "Mathematical", score: 64 },
          { name: "Causal Inference", score: 68 }
        ]
      },
      {
        name: "Language",
        score: 72,
        subs: [
          { name: "Summarization", score: 73 },
          { name: "Translation", score: 70 },
          { name: "Creative Writing", score: 71 }
        ]
      },
      {
        name: "Code",
        score: 65,
        subs: [
          { name: "Generation", score: 66 },
          { name: "Debugging", score: 62 },
          { name: "Explanation", score: 65 }
        ]
      },
      {
        name: "Efficiency",
        score: 97,
        subs: [
          { name: "Throughput", score: 98 },
          { name: "Token Efficiency", score: 97 },
          { name: "Batch Processing", score: 95 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 63.4, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 62, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 66.8, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 71.2,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 74.5, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 58.1, maxScore: 100, category: "Safety" }
    ],
    popularity: "17.8k",
    inputCostPer1M: 0.05,
    outputCostPer1M: 0.15,
    contextLength: 128e3,
    addedDate: "2024-09-25",
    tokensPerSecond: 320,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    avgResponseTokens: 220,
    availableVersions: ["2024-09"],
    status: "Active"
  },
  {
    id: "m-26",
    name: "Llama 3.2 90B Vision",
    provider: "Meta",
    version: "2024-09",
    parameterSize: "90B",
    description: "Vision-capable Llama 3.2 for image+text assistants and document understanding.",
    domain: "General Purpose",
    strengths: ["Multimodal", "Reasoning", "Open Source"],
    capabilities: [
      {
        name: "Reasoning",
        score: 85,
        subs: [
          { name: "Logical Deduction", score: 86 },
          { name: "Mathematical", score: 83 },
          { name: "Causal Inference", score: 85 }
        ]
      },
      {
        name: "Language",
        score: 84,
        subs: [
          { name: "Summarization", score: 85 },
          { name: "Translation", score: 82 },
          { name: "Creative Writing", score: 83 }
        ]
      },
      {
        name: "Code",
        score: 80,
        subs: [
          { name: "Generation", score: 81 },
          { name: "Debugging", score: 78 },
          { name: "Explanation", score: 80 }
        ]
      },
      {
        name: "Efficiency",
        score: 78,
        subs: [
          { name: "Throughput", score: 79 },
          { name: "Token Efficiency", score: 77 },
          { name: "Batch Processing", score: 77 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 80.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 78.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 84.2, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 86,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 85.5, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 65.2, maxScore: 100, category: "Safety" }
    ],
    popularity: "9.9k",
    inputCostPer1M: 1.8,
    outputCostPer1M: 5.4,
    contextLength: 128e3,
    addedDate: "2024-09-25",
    tokensPerSecond: 58,
    sustainability: "B",
    category: "General",
    hosting: "Booster Powered",
    quantization: "INT8",
    avgResponseTokens: 540,
    availableVersions: ["2024-09"],
    status: "Active"
  },
  {
    id: "m-27",
    name: "Qwen 2 7B",
    provider: "Alibaba",
    version: "2024-06",
    parameterSize: "7B",
    description: "Efficient Qwen 2 checkpoint for extraction, chat, and edge deployment.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Multilingual", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 72,
        subs: [
          { name: "Logical Deduction", score: 73 },
          { name: "Mathematical", score: 70 },
          { name: "Causal Inference", score: 72 }
        ]
      },
      {
        name: "Language",
        score: 76,
        subs: [
          { name: "Summarization", score: 77 },
          { name: "Translation", score: 78 },
          { name: "Creative Writing", score: 74 }
        ]
      },
      {
        name: "Multilingual",
        score: 84,
        subs: [
          { name: "European Languages", score: 82 },
          { name: "Asian Languages", score: 88 },
          { name: "Code-switching", score: 80 }
        ]
      },
      {
        name: "Code",
        score: 73,
        subs: [
          { name: "Generation", score: 74 },
          { name: "Debugging", score: 71 },
          { name: "Explanation", score: 73 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 67.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 68.9, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 75.5, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 76.4,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 78.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 60.5, maxScore: 100, category: "Safety" }
    ],
    popularity: "11.1k",
    inputCostPer1M: 0.12,
    outputCostPer1M: 0.36,
    contextLength: 131072,
    addedDate: "2024-06-07",
    tokensPerSecond: 205,
    sustainability: "A",
    category: "General",
    hosting: "Booster Powered",
    avgResponseTokens: 300,
    availableVersions: ["2024-06"],
    status: "Active"
  },
  {
    id: "m-28",
    name: "Qwen 2.5 32B",
    provider: "Alibaba",
    version: "2024-09",
    parameterSize: "32B",
    description: "Mid-size Qwen 2.5 with strong math and code for agentic workflows.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Mathematics", "Code Generation"],
    capabilities: [
      {
        name: "Reasoning",
        score: 84,
        subs: [
          { name: "Logical Deduction", score: 85 },
          { name: "Mathematical", score: 87 },
          { name: "Causal Inference", score: 82 }
        ]
      },
      {
        name: "Language",
        score: 83,
        subs: [
          { name: "Summarization", score: 84 },
          { name: "Translation", score: 85 },
          { name: "Creative Writing", score: 80 }
        ]
      },
      {
        name: "Code",
        score: 86,
        subs: [
          { name: "Generation", score: 87 },
          { name: "Debugging", score: 84 },
          { name: "Explanation", score: 86 }
        ]
      },
      {
        name: "Multilingual",
        score: 90,
        subs: [
          { name: "European Languages", score: 88 },
          { name: "Asian Languages", score: 93 },
          { name: "Code-switching", score: 87 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 79.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 82.1, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 88.9, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 86.7,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 86.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 66, maxScore: 100, category: "Safety" }
    ],
    popularity: "14.4k",
    inputCostPer1M: 0.8,
    outputCostPer1M: 2.4,
    contextLength: 131072,
    addedDate: "2024-09-19",
    tokensPerSecond: 88,
    sustainability: "A",
    category: "General",
    hosting: "Scaleway",
    quantization: "INT8",
    avgResponseTokens: 450,
    availableVersions: ["2024-09"],
    status: "Active"
  },
  {
    id: "m-29",
    name: "DeepSeek Coder V2",
    provider: "DeepSeek",
    version: "2024-06",
    parameterSize: "236B",
    description: "Code-specialized DeepSeek model for IDE copilots and repo-scale assistance.",
    domain: "Code & Engineering",
    strengths: ["Code Generation", "Debugging", "Explanation"],
    capabilities: [
      {
        name: "Code",
        score: 92,
        subs: [
          { name: "Generation", score: 93 },
          { name: "Debugging", score: 91 },
          { name: "Refactoring", score: 91 }
        ]
      },
      {
        name: "Reasoning",
        score: 83,
        subs: [
          { name: "Logical Deduction", score: 84 },
          { name: "Mathematical", score: 82 },
          { name: "Algorithmic", score: 85 }
        ]
      },
      {
        name: "Language",
        score: 76,
        subs: [
          { name: "Technical Docs", score: 80 },
          { name: "Summarization", score: 74 },
          { name: "Creative Writing", score: 60 }
        ]
      },
      {
        name: "Efficiency",
        score: 87,
        subs: [
          { name: "Throughput", score: 89 },
          { name: "Token Efficiency", score: 86 },
          { name: "Batch Processing", score: 85 }
        ]
      }
    ],
    benchmarks: [
      { name: "HumanEval", score: 90.2, maxScore: 100, category: "Code" },
      { name: "MBPP", score: 86.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 81, maxScore: 100, category: "Math" },
      { name: "MMLU", score: 76.2, maxScore: 100, category: "Knowledge" },
      {
        name: "ARC-Challenge",
        score: 84.5,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "TruthfulQA", score: 64, maxScore: 100, category: "Safety" }
    ],
    popularity: "24.6k",
    inputCostPer1M: 0.35,
    outputCostPer1M: 1.05,
    contextLength: 163840,
    addedDate: "2024-06-17",
    tokensPerSecond: 72,
    sustainability: "B",
    category: "Code",
    hosting: "Booster Powered",
    avgResponseTokens: 760,
    availableVersions: ["2024-06"],
    status: "Active"
  },
  {
    id: "m-30",
    name: "DeepSeek Chat",
    provider: "DeepSeek",
    version: "2024-12",
    parameterSize: "671B",
    description: "General chat-optimized DeepSeek variant with strong reasoning and low API cost.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Cost Efficient", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 89,
        subs: [
          { name: "Logical Deduction", score: 90 },
          { name: "Mathematical", score: 88 },
          { name: "Causal Inference", score: 88 }
        ]
      },
      {
        name: "Language",
        score: 86,
        subs: [
          { name: "Summarization", score: 87 },
          { name: "Translation", score: 85 },
          { name: "Creative Writing", score: 85 }
        ]
      },
      {
        name: "Code",
        score: 84,
        subs: [
          { name: "Generation", score: 85 },
          { name: "Debugging", score: 82 },
          { name: "Explanation", score: 84 }
        ]
      },
      {
        name: "Efficiency",
        score: 91,
        subs: [
          { name: "Throughput", score: 92 },
          { name: "Token Efficiency", score: 90 },
          { name: "Batch Processing", score: 90 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 82.3, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 83.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 87.2, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 88.1,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 86.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 67.5, maxScore: 100, category: "Safety" }
    ],
    popularity: "18.2k",
    inputCostPer1M: 0.4,
    outputCostPer1M: 1.2,
    contextLength: 64e3,
    addedDate: "2024-12-01",
    tokensPerSecond: 110,
    sustainability: "A",
    category: "General",
    hosting: "EUrouter",
    quantization: "INT4",
    avgResponseTokens: 420,
    availableVersions: ["2024-12"],
    status: "Active"
  },
  {
    id: "m-31",
    name: "Mistral 7B Instruct",
    provider: "Mistral AI",
    version: "2023-09",
    parameterSize: "7B",
    description: "Foundational Mistral 7B instruct model — lightweight baseline for fine-tuning.",
    domain: "General Purpose",
    strengths: ["Open Weights", "Cost Efficient", "Speed"],
    capabilities: [
      {
        name: "Reasoning",
        score: 70,
        subs: [
          { name: "Logical Deduction", score: 71 },
          { name: "Mathematical", score: 66 },
          { name: "Causal Inference", score: 70 }
        ]
      },
      {
        name: "Language",
        score: 74,
        subs: [
          { name: "Summarization", score: 75 },
          { name: "Translation", score: 73 },
          { name: "Creative Writing", score: 73 }
        ]
      },
      {
        name: "Code",
        score: 68,
        subs: [
          { name: "Generation", score: 69 },
          { name: "Debugging", score: 65 },
          { name: "Explanation", score: 68 }
        ]
      },
      {
        name: "Efficiency",
        score: 93,
        subs: [
          { name: "Throughput", score: 94 },
          { name: "Token Efficiency", score: 92 },
          { name: "Batch Processing", score: 92 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 64.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 63.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 69.8, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 73.5,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 76, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 58.9, maxScore: 100, category: "Safety" }
    ],
    popularity: "40.5k",
    inputCostPer1M: 0.08,
    outputCostPer1M: 0.08,
    contextLength: 8192,
    addedDate: "2023-09-27",
    tokensPerSecond: 165,
    sustainability: "B",
    category: "General",
    hosting: "Booster Powered",
    avgResponseTokens: 350,
    availableVersions: ["2023-09"],
    status: "Sunsetting"
  },
  {
    id: "m-32",
    name: "o1-preview",
    provider: "OpenAI",
    version: "2024-12",
    parameterSize: "200B",
    description: "Reasoning-focused OpenAI model with extended chain-of-thought for hard math and planning.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Mathematics", "Analysis"],
    capabilities: [
      {
        name: "Reasoning",
        score: 94,
        subs: [
          { name: "Logical Deduction", score: 95 },
          { name: "Mathematical", score: 96 },
          { name: "Causal Inference", score: 93 }
        ]
      },
      {
        name: "Language",
        score: 86,
        subs: [
          { name: "Summarization", score: 87 },
          { name: "Translation", score: 84 },
          { name: "Creative Writing", score: 84 }
        ]
      },
      {
        name: "Code",
        score: 87,
        subs: [
          { name: "Generation", score: 88 },
          { name: "Debugging", score: 85 },
          { name: "Explanation", score: 87 }
        ]
      },
      {
        name: "Efficiency",
        score: 72,
        subs: [
          { name: "Throughput", score: 70 },
          { name: "Token Efficiency", score: 72 },
          { name: "Batch Processing", score: 73 }
        ]
      }
    ],
    benchmarks: [
      { name: "MMLU", score: 90.8, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 92.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 96.2, maxScore: 100, category: "Math" },
      {
        name: "ARC-Challenge",
        score: 94.8,
        maxScore: 100,
        category: "Reasoning"
      },
      { name: "HellaSwag", score: 88.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 74, maxScore: 100, category: "Safety" }
    ],
    popularity: "29.7k",
    inputCostPer1M: 12,
    outputCostPer1M: 36,
    contextLength: 128e3,
    addedDate: "2024-12-05",
    tokensPerSecond: 35,
    sustainability: "C",
    category: "General",
    hosting: "Booster Powered",
    avgResponseTokens: 2800,
    availableVersions: ["2024-12"],
    status: "Beta"
  }
];
const capabilityMap = {};
models.forEach((m) => {
  m.capabilities.forEach((cap) => {
    if (!capabilityMap[cap.name]) capabilityMap[cap.name] = [];
    cap.subs.forEach((sub) => {
      if (!capabilityMap[cap.name].includes(sub.name)) {
        capabilityMap[cap.name].push(sub.name);
      }
    });
  });
});
Object.keys(capabilityMap).sort();
const apiKeys = [
  {
    id: "key-default",
    name: "Default",
    isDefault: true,
    /** Default endpoint key can be copied anytime in UI (mock full secret). */
    fullKey: "bdc_7m2qdefaultmocksecret0123456789ab",
    prefix: "bdc...89ab",
    createdAt: "2025-02-01",
    lastUsed: "5 days ago",
    status: "active"
  },
  {
    id: "key-1",
    name: "Production",
    isDefault: false,
    prefix: "bdc...x9k2",
    createdAt: "2025-01-15",
    lastUsed: "2 hours ago",
    status: "active"
  }
];
const useCaseCategories = [
  {
    label: "Conversational Assistant",
    subtitle: "Chatbots & dialogue",
    keywords: ["Reasoning", "Multilingual", "Speed"]
  },
  {
    label: "Document Summarization",
    subtitle: "Long-form analysis",
    keywords: ["Long Context", "Analysis", "Safety"]
  },
  {
    label: "Code Generation",
    subtitle: "Dev tools & copilots",
    keywords: ["Code Generation", "Debugging"]
  },
  {
    label: "RAG / Knowledge Assistant",
    subtitle: "Enterprise search & retrieval",
    keywords: ["RAG", "Enterprise", "Long Context", "Grounding"]
  },
  {
    label: "Customer Support Bot",
    subtitle: "Multi-language support",
    keywords: ["Multilingual", "Speed", "Tool Use"]
  },
  {
    label: "Content Generation",
    subtitle: "Marketing & creative",
    keywords: ["Reasoning", "Analysis"]
  },
  {
    label: "Classification",
    subtitle: "Labeling & categorisation",
    keywords: ["Speed", "Cost Efficient"]
  },
  {
    label: "Translation",
    subtitle: "Cross-language tasks",
    keywords: ["Multilingual"]
  },
  {
    label: "Multimodal (Text + Image)",
    subtitle: "Vision & OCR",
    keywords: ["Multimodal", "Grounding"]
  },
  {
    label: "Structured Data Extraction",
    subtitle: "Parsing & formatting",
    keywords: ["RAG", "Grounding", "Tool Use"]
  }
];
const optimizationObjectives = [
  {
    label: "Lowest Cost",
    description: "Minimize token and infrastructure costs"
  },
  {
    label: "Highest Accuracy",
    description: "Best quality output regardless of cost"
  },
  {
    label: "Fastest Response Time",
    description: "Lowest latency for interactive UX"
  },
  {
    label: "Balanced Performance",
    description: "Good trade-off across all dimensions"
  },
  {
    label: "Compliance / Regulated Workloads",
    description: "Safety, audit, and regulatory focus"
  },
  {
    label: "Sustainability / Energy Efficient",
    description: "Lowest carbon footprint"
  }
];
function getRecommendedProvider(_modelId) {
  return {
    id: "recommended",
    provider: "Mistral AI",
    bestFor: "Best overall",
    context: "32K",
    contextTokens: 32e3,
    inputPer1M: 1,
    outputPer1M: 3,
    latencyMs: 620,
    tps: 120,
    quant: "FP16",
    certs: ["GDPR"],
    reason: "Recommended for this endpoint because it offers the best balance of cost, latency, throughput, and compliance for the selected model.",
    recommended: true
  };
}
function getProviderOptions(modelId) {
  const selectedModel = models.find((m) => m.id === modelId) ?? models[0];
  return [
    getRecommendedProvider(),
    {
      id: "scaleway",
      provider: "Scaleway",
      bestFor: "EU infrastructure",
      context: "128K",
      contextTokens: 128e3,
      inputPer1M: 2.8,
      outputPer1M: 8.4,
      latencyMs: 640,
      tps: 26.5,
      quant: "INT8",
      certs: ["GDPR"],
      reason: "Scaleway provides larger context and EU infrastructure, but has higher token cost and lower throughput than the recommended option."
    },
    {
      id: "nebius",
      provider: "Nebius",
      bestFor: "Lowest latency",
      context: "128K",
      contextTokens: 128e3,
      inputPer1M: 3.1,
      outputPer1M: 9.2,
      latencyMs: 590,
      tps: 29.4,
      quant: "FP16",
      certs: ["GDPR"],
      reason: "Nebius provides lower latency than the recommended option, but has higher token cost and lower throughput for this workload."
    },
    {
      id: "fireworks",
      provider: "Fireworks",
      bestFor: "Large context",
      context: "128K",
      contextTokens: 128e3,
      inputPer1M: 2.95,
      outputPer1M: 8.95,
      latencyMs: 610,
      tps: 27.8,
      quant: "Q8",
      certs: ["GDPR"],
      reason: "Fireworks supports larger context windows, but is more expensive and lower throughput than Booster's recommended provider for this endpoint."
    },
    {
      id: "model-provider-fallback",
      provider: selectedModel.provider,
      bestFor: "Model-native",
      context: formatContextWindowShort(selectedModel.contextLength),
      contextTokens: selectedModel.contextLength,
      inputPer1M: selectedModel.inputCostPer1M,
      outputPer1M: selectedModel.outputCostPer1M,
      latencyMs: 650,
      tps: Math.max(1, selectedModel.tokensPerSecond - 5),
      quant: "FP16",
      certs: ["GDPR"],
      reason: "Model-native hosting can simplify compatibility, but may not be the strongest cost-latency-throughput balance."
    }
  ].filter(
    (row, index, arr) => arr.findIndex((item) => item.provider === row.provider) === index
  );
}
const $$splitComponentImporter$1 = () => import("./endpoints._endpointId.settings-C7ZpsxEu.mjs");
const Route$1 = createFileRoute("/app/endpoints/$endpointId/settings")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./endpoints._endpointId.deploy-u885KRlT.mjs");
const Route = createFileRoute("/app/endpoints/$endpointId/deploy")({
  validateSearch: (search) => ({
    model: search.model ?? ""
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AppRouteRoute = Route$e.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const AuthSetPasswordRoute = Route$c.update({
  id: "/auth/set-password",
  path: "/auth/set-password",
  getParentRoute: () => Route$f
});
const AppOverviewRoute = Route$b.update({
  id: "/overview",
  path: "/overview",
  getParentRoute: () => AppRouteRoute
});
const AppObserveRoute = Route$a.update({
  id: "/observe",
  path: "/observe",
  getParentRoute: () => AppRouteRoute
});
const AppDeployRoute = Route$9.update({
  id: "/deploy",
  path: "/deploy",
  getParentRoute: () => AppRouteRoute
});
const AppCosmosRoute = Route$8.update({
  id: "/cosmos",
  path: "/cosmos",
  getParentRoute: () => AppRouteRoute
});
const AppAccountRoute = Route$7.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsDeploy_endpointRoute = Route$6.update({
  id: "/endpoints/deploy_endpoint",
  path: "/endpoints/deploy_endpoint",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsCreate_endpointRoute = Route$5.update({
  id: "/endpoints/create_endpoint",
  path: "/endpoints/create_endpoint",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsEndpointIdRoute = Route$4.update({
  id: "/endpoints/$endpointId",
  path: "/endpoints/$endpointId",
  getParentRoute: () => AppRouteRoute
});
const AppCosmosGuidedRoute = Route$3.update({
  id: "/cosmos_/guided",
  path: "/cosmos/guided",
  getParentRoute: () => AppRouteRoute
});
const AppCosmosModelIdRoute = Route$2.update({
  id: "/cosmos_/$modelId",
  path: "/cosmos/$modelId",
  getParentRoute: () => AppRouteRoute
});
const AppEndpointsEndpointIdSettingsRoute = Route$1.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppEndpointsEndpointIdRoute
});
const AppEndpointsEndpointIdDeployRoute = Route.update({
  id: "/deploy",
  path: "/deploy",
  getParentRoute: () => AppEndpointsEndpointIdRoute
});
const AppEndpointsEndpointIdRouteChildren = {
  AppEndpointsEndpointIdDeployRoute,
  AppEndpointsEndpointIdSettingsRoute
};
const AppEndpointsEndpointIdRouteWithChildren = AppEndpointsEndpointIdRoute._addFileChildren(
  AppEndpointsEndpointIdRouteChildren
);
const AppRouteRouteChildren = {
  AppAccountRoute,
  AppCosmosRoute,
  AppDeployRoute,
  AppObserveRoute,
  AppOverviewRoute,
  AppCosmosModelIdRoute,
  AppCosmosGuidedRoute,
  AppEndpointsEndpointIdRoute: AppEndpointsEndpointIdRouteWithChildren,
  AppEndpointsCreate_endpointRoute,
  AppEndpointsDeploy_endpointRoute
};
const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthSetPasswordRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    context: {
      auth: { isAuthenticated: false }
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  getModelSubline as A,
  formatContextLength as B,
  Route$4 as C,
  endpointRequestLogs as D,
  optimizationObjectives as E,
  useCaseCategories as F,
  Route$3 as G,
  CAPABILITY_TAXONOMY as H,
  CAPABILITY_INDEXES as I,
  BENCHMARK_TAXONOMY as J,
  getModelTaxonomyBenchmarkScore as K,
  Route$2 as L,
  apiKeys as M,
  Route$1 as N,
  Route as O,
  router as P,
  Route$c as R,
  TooltipProvider as T,
  Tooltip as a,
  TooltipTrigger as b,
  cn as c,
  TooltipContent as d,
  endpoints as e,
  Route$9 as f,
  modelHasVisionCapability as g,
  getOverallModelScore as h,
  getMathScore as i,
  getReasoningScore as j,
  getCodingScore as k,
  formatEurPer1MForDisplay as l,
  models as m,
  Route$8 as n,
  fetchAPI as o,
  Route$6 as p,
  getModelParameterSizeLabel as q,
  formatContextWindowShort as r,
  deployments as s,
  Route$5 as t,
  getProviderOptions as u,
  getModelModalityLabel as v,
  overallScoreTextClass as w,
  getModelParameterCount as x,
  getSustainabilityGradeStyles as y,
  getModelCatalogBadge as z
};
