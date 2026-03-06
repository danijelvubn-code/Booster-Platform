

# Endpoint Deployment Redesign: Profile-Driven + Guardrails + Budget Controls

## Overview
Rebuild the Create Endpoint wizard from the current 4-step flow into a new 6-step profile-driven deployment experience with performance profiles, enhanced guardrails, token-based budget controls, a cost transparency panel, and a comprehensive review step.

## Step-by-Step Changes

### 1. Update Step Definitions
Change from `["Endpoint Details", "Security & Guardrails", "Budget & Alerts", "Review"]` to:
- **Step 1**: Basic Deployment Setup
- **Step 2**: Performance Profile
- **Step 3**: Safety & Guardrails
- **Step 4**: Budget & Usage Controls
- **Step 5**: Cost Transparency (side panel, shown alongside Step 4)
- **Step 6**: Review & Deploy

Since Step 5 (Cost Transparency) works best as a side panel alongside the budget step, we'll implement it as a persistent sidebar on Steps 2-4 rather than a separate step, resulting in a 5-step wizard: Basic Setup, Performance Profile, Guardrails, Budget & Usage Controls, Review & Deploy.

### 2. Step 1 -- Basic Deployment Setup
Replace the current Step 0 with:
- **Endpoint Name** (text input)
- **Target Space** dropdown: POC / Demo / Production (rename from "Type")
- **Model Selection** dropdown populated from `models` array in mockData
- **Region** dropdown (moved here from current Step 1)
- **Confidential Compute** toggle (moved here from current Step 1)
- Remove: Use Case multi-select, API spec info box, generated endpoint URL (move URL to review)

### 3. Step 2 -- Performance Profile Selection (NEW)
Create a new `PerformanceProfileStep` component with three selectable cards:

| | Best Effort | Premium | Enterprise |
|---|---|---|---|
| Label | Cost Optimized | Production Ready | Mission Critical |
| TPM | up to 50K | up to 250K | 500K+ |
| RPM | up to 100 | up to 500 | 1000+ |
| p95 Latency | 1.5-3s | less than 900ms | less than 500ms |
| TTFT | less than 1.2s | less than 500ms | less than 250ms |
| Autoscaling | Reactive | Proactive + reactive | Predictive + pre-warmed |
| SLA | None | 99.5% | 99.9%+ |

System notice below: "Performance settings such as concurrency, scaling policy, and rate limits are automatically configured based on your selected profile."

### 4. Step 3 -- Safety & Guardrails (Enhanced)
Update the existing `GuardrailsStep` component:
- Add **"Rewrite"** as an action option for Toxicity (in addition to Log/Block)
- Add section title "Safety & Guardrails" and description
- Add system notice at the bottom: "Guardrails may slightly impact latency depending on selected performance profile."
- Add tooltip text noting 10-50ms latency overhead per guardrail
- Remove data retention field (it was in old Step 1)
- Keep existing guardrail rows: Toxicity, Prompt Injection, Gibberish, Language, Invisible Text, Secrets
- Keep Privacy Management section with entity checkboxes

### 5. Step 4 -- Budget & Usage Controls (Enhanced)
Expand the current budget step to include:
- **Monthly Token Budget** with estimated cost preview based on selected model
- **Soft Limit Threshold** (alert at % usage, default 80%) -- email notification + dashboard alert, no traffic impact
- **Hard Limit Enforcement** toggle with description of behavior
- **Per-Request Token Cap** (optional input for max tokens per request)
- **Throughput Safety Guard** -- read-only display showing profile-based RPM/TPM limits with note "System-enforced based on selected profile. Not configurable in Beta."

### 6. Cost Transparency Side Panel
Add a dynamic side panel (or card) visible on Steps 2-4 showing:
- Cost per 1K tokens (from selected model)
- Estimated monthly cost based on token budget
- Profile infrastructure cost tier (Best Effort: Lowest / Premium: Moderate / Enterprise: Dedicated premium)
- Guardrail overhead note

This will be implemented as a sticky card on the right side using a two-column layout on larger steps.

### 7. Step 5 -- Review & Deploy
Enhanced review showing all new fields:
- Model, Target Space, Profile (with SLA level)
- Region, Confidential Compute
- Guardrails summary (enabled count and actions)
- Monthly token budget, hard stop status
- Per-request token cap
- Estimated cost range
- CTA button: "Deploy Endpoint"

## Technical Details

### Files to Create
- `src/components/PerformanceProfileStep.tsx` -- Profile selection cards with specs grid
- `src/components/CostTransparencyPanel.tsx` -- Dynamic cost sidebar

### Files to Modify
- `src/pages/CreateEndpoint.tsx` -- Major rewrite of step flow, state, and layout
- `src/components/GuardrailsStep.tsx` -- Add "Rewrite" action for Toxicity, add latency notice and tooltips

### State Changes in CreateEndpoint
Add to config state:
- `model: ""` (selected model ID)
- `performanceProfile: "best-effort" | "premium" | "enterprise"`
- `perRequestTokenCap: ""` (optional)

Remove from config state:
- `useCases`, `apiSpec`, `outputFormat`, `dataRetention`, `trainingExclusion`

Rename:
- `type` stays but label changes to "Target Space"
- `hardCap` stays
- `alertThreshold` stays
- `monthlyBudget` stays
- `emailAlerts` stays

### Layout Approach
For steps 2-4, use a responsive two-column layout (`grid grid-cols-1 lg:grid-cols-3`) with main content in 2 columns and the Cost Transparency panel in 1 column. This keeps cost visibility persistent without requiring a separate step.

