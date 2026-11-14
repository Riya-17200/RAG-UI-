# RAG-TITAN — Adaptive RAG Intelligence Platform

An enterprise-grade, production-grade interface for **RAG-TITAN: Adaptive Retrieval-Augmented Generation Intelligence Engine**.

> **"RAG-TITAN does not follow one fixed retrieval path. It intelligently adapts its retrieval behavior based on the query and the quality of the results."**

---

## Key Features

1. **Adaptive Overview Dashboard**:
   - Executive metrics tracking queries analyzed, dynamic strategy selections, retrieval accuracy, average latency (ms), confidence scores, and fallback triggers.
   - Central visual pipeline showing the **Adaptive Decision Engine** as the focal point branching across dynamic paths.

2. **Adaptive Playground (Signature Page)**:
   - Real-time query execution across 4 signature scenarios:
     - **Scenario A**: Simple Factual Query (Lightweight Dense Path)
     - **Scenario B**: Complex Multi-Part Query (Adaptive Multi-Hop & Decomposition)
     - **Scenario C**: Ambiguous Query (Query Disambiguation & Refinement)
     - **Scenario D**: Low-Confidence Retrieval (Corrective RAG / CRAG Fallback)
   - Step-by-step 8-stage stepper demonstrating classification, complexity analysis, strategy selection, retrieval, evidence checking, and answer synthesis.
   - Interactive citations linking directly to verified chunks.
   - Technical explainability card explaining *why* the engine selected the route.

3. **Query Intelligence Center**:
   - Deep semantic profiling: intent distribution, complexity meter, ambiguity entropy gauge, 768d vector projection preview, multi-hop sub-queries, and extracted entities with salience.

4. **Adaptive Retrieval Strategy Engine**:
   - In-depth specifications for all 5 retrieval strategies:
     - Direct Generation (Bypass)
     - Lightweight Dense Retrieval
     - Adaptive Multi-Hop & Decomposition
     - Query Disambiguation & Refinement
     - Corrective RAG (CRAG) & Fallback
   - Interactive Strategy Decision Tree simulator with conditional logic paths.

5. **Dynamic Pipeline Visualizer**:
   - Interactive node-based diagram that dynamically changes and rewires active paths based on selected queries.
   - Expandable Node Inspector for step latency, inputs, outputs, and runtime parameters.

6. **Retrieval Analytics & Observability**:
   - Confidence gauges, relevance distribution histogram, stage latency waterfall, and execution telemetry.

7. **Adaptive Evaluation Lab**:
   - Empirical benchmark matrix comparing Adaptive RAG vs Fixed Naive RAG vs Fixed Hybrid RAG.

8. **Knowledge Sources & Model Config**:
   - Management of indexed documents, chunk explorer, router/generator LLM selectors, and embedder settings.

9. **Developer SDK & REST API**:
   - Python, TypeScript, and cURL snippets for `/v1/query/adaptive`.

---

## Midnight Intelligence Color System

| Role | Color | Hex |
|---|---|---|
| Main Background | Midnight Black | `#080D1A` |
| Sidebar | Deep Obsidian | `#0B1220` |
| Cards | Intelligence Slate | `#111A2E` |
| Elevated Panels | High-Elevation Surface | `#17233A` |
| Electric Cyan | Dynamic Query Flow | `#00D9FF` |
| Electric Blue | Search & Vector Ops | `#386BFF` |
| AI Violet | Reasoning & Routing | `#9666FF` |
| Success | High Confidence | `#35D6A0` |
| Warning | Uncertainty & Refine | `#FFB454` |
| Error | CRAG Fallback | `#FF647C` |
| Primary Text | Frost White | `#EAF2FF` |
| Secondary Text | Slate Muted | `#94A3B8` |

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Riya-17200/RAG-UI-.git
cd RAG-UI-

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```
