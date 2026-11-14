import React, { useState } from 'react';
import {
  Brain,
  Gauge,
  Sliders,
  Sparkles,
  GitBranch,
  Split,
  Search,
  Hash,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Filter,
  Activity,
  CheckCircle2
} from 'lucide-react';
import GaugeChart from '../common/GaugeChart';
import { PRESET_SCENARIOS } from '../../data/mockData';

export default function QueryIntelligence({ activeScenarioKey = 'scenarioB', onSelectScenario }) {
  const [selectedKey, setSelectedKey] = useState(activeScenarioKey);
  const scenario = PRESET_SCENARIOS[selectedKey] || PRESET_SCENARIOS.scenarioB;
  const analysis = scenario.classification;

  // Mock embedding vector projection (first 16 dimensions)
  const vectorDimensions = [
    0.142, -0.084, 0.491, -0.218, 0.076, 0.312, -0.512, 0.189,
    -0.034, 0.278, 0.612, -0.198, 0.405, -0.321, 0.089, 0.145
  ];

  const transformations = [
    {
      stage: 'RAW INGESTION',
      text: scenario.query,
      time: 'T+0ms',
      action: 'PII scrubbing, unicode normalization, tokenization',
      status: 'Cleaned'
    },
    {
      stage: 'LEXICAL EXPANSION',
      text: scenario.query.replace('policy', 'policy guidelines regulations').replace('stipend', 'stipend allowance grant reimbursement'),
      time: 'T+6ms',
      action: 'Synonym enrichment & acronym expansion via domain thesaurus',
      status: 'Expanded'
    },
    {
      stage: 'SUB-QUERY DECOMPOSITION',
      text: analysis.decomposed
        ? `${analysis.subQueries?.length || 3} parallel sub-facets generated for concurrent multi-index execution`
        : 'Atomic single-pass query confirmed. Zero decomposition required.',
      time: 'T+14ms',
      action: analysis.decomposed ? 'LLM Planner split query into targeted domain sub-queries' : 'Fast-path bypass',
      status: 'Targeted'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9666FF] px-2.5 py-0.5 rounded-full bg-[#9666FF]/10 border border-[#9666FF]/20 font-bold">
              Cognitive Profiling
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Semantic Entropy, Intent & Multi-Aspect Decomposition
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Query Intelligence Center
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Inspect how RAG-TITAN parses, extracts entities, measures structural complexity, evaluates ambiguity, and decomposes multi-aspect queries before any retrieval operation begins.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PRESET_SCENARIOS).map(([key, scn]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedKey(key);
                if (onSelectScenario) onSelectScenario(key);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                selectedKey === key
                  ? 'bg-[#17233A] border-[#9666FF] text-[#EAF2FF] shadow-[0_0_15px_-3px_rgba(150,102,255,0.4)] font-bold'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 text-[#94A3B8] hover:text-[#EAF2FF]'
              }`}
            >
              {scn.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Query Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17233A] via-[#111A2E] to-[#17233A] border border-[#00D9FF]/30 shadow-lg">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#00D9FF] font-semibold block mb-1">
          Currently Profiled Query ({scenario.badge}):
        </span>
        <div className="text-base sm:text-lg font-semibold text-[#EAF2FF] font-sans">
          "{scenario.query}"
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-[#94A3B8] border-t border-[#EAF2FF]/10 pt-3">
          <span>Domain: <strong className="text-[#9666FF]">{analysis.domain}</strong></span>
          <span>•</span>
          <span>Detected Intent: <strong className="text-[#00D9FF]">{analysis.intent}</strong></span>
          <span>•</span>
          <span>Length: <strong className="text-[#EAF2FF]">{scenario.query.length} chars</strong></span>
        </div>
      </div>

      {/* Primary Analytics Grid: Complexity Meter, Ambiguity Entropy, Intent Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Complexity Meter */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between mb-3 border-b border-[#EAF2FF]/10 pb-2">
            <span className="text-xs font-mono uppercase text-[#9666FF] font-bold tracking-wider flex items-center gap-1.5">
              <Gauge className="w-4 h-4" />
              Complexity Level
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#9666FF]/20 text-[#9666FF] font-bold">
              {analysis.complexity >= 6.5 ? 'HIGH' : analysis.complexity >= 4.0 ? 'MEDIUM' : 'LOW'}
            </span>
          </div>

          <div className="my-2">
            <GaugeChart
              value={analysis.complexity}
              max={10.0}
              size={130}
              strokeWidth={12}
              accent={analysis.complexity >= 6.5 ? 'violet' : 'cyan'}
              displayFormat="score"
              label="Complexity Score"
              sublabel="Scale 0 to 10"
            />
          </div>

          <p className="text-xs text-[#94A3B8] mt-2 font-mono leading-relaxed">
            {analysis.complexity >= 6.5
              ? 'Multi-hop synthesis mandated. Single-pass retrieval would cause context truncation.'
              : 'Atomic factual query structure. Eligible for single-pass high-speed retrieval.'}
          </p>
        </div>

        {/* Ambiguity Entropy */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between mb-3 border-b border-[#EAF2FF]/10 pb-2">
            <span className="text-xs font-mono uppercase text-[#FFB454] font-bold tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              Ambiguity Entropy
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFB454]/20 text-[#FFB454] font-bold">
              {analysis.ambiguity > 0.6 ? 'AMBIGUOUS' : 'FOCUSED'}
            </span>
          </div>

          <div className="my-2">
            <GaugeChart
              value={analysis.ambiguity}
              max={1.0}
              size={130}
              strokeWidth={12}
              accent={analysis.ambiguity > 0.6 ? 'orange' : 'green'}
              displayFormat="decimal"
              label="Entropy Index"
              sublabel="Threshold: 0.60"
            />
          </div>

          <p className="text-xs text-[#94A3B8] mt-2 font-mono leading-relaxed">
            {analysis.ambiguity > 0.6
              ? 'Query contains multiple conflicting semantic clusters. Triggers Disambiguation Refiner.'
              : 'Specific entity references detected. Zero semantic overlap conflicts.'}
          </p>
        </div>

        {/* Intent Confidence */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between mb-3 border-b border-[#EAF2FF]/10 pb-2">
            <span className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Intent Probability
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF] font-bold">
              VERIFIED
            </span>
          </div>

          <div className="my-2">
            <GaugeChart
              value={analysis.intentConfidence}
              max={1.0}
              size={130}
              strokeWidth={12}
              accent="cyan"
              displayFormat="percent"
              label="Classifier Cert"
              sublabel="gemma3:4b-router"
            />
          </div>

          <p className="text-xs text-[#94A3B8] mt-2 font-mono leading-relaxed">
            Classified as: <strong className="text-[#EAF2FF]">{analysis.intent}</strong> with {Math.round(analysis.intentConfidence * 100)}% probabilistic certainty.
          </p>
        </div>
      </div>

      {/* Query Decomposition & Extracted Entities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Query Decomposition or Semantic Clustering (7 cols) */}
        <div className="lg:col-span-7 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-[#EAF2FF]/10 pb-3">
            <div className="flex items-center gap-2">
              <Split className="w-4 h-4 text-[#9666FF]" />
              <h3 className="text-xs font-mono uppercase text-[#9666FF] font-bold tracking-wider">
                {analysis.decomposed ? 'Multi-Hop Query Decomposition Plan' : 'Query Structure & Scope'}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#9666FF]/20 text-[#9666FF] font-bold">
              {analysis.decomposed ? '3 SUB-QUERIES' : 'ATOMIC SCOPE'}
            </span>
          </div>

          {analysis.decomposed ? (
            <div className="space-y-3">
              <p className="text-xs text-[#94A3B8]">
                The Adaptive Planner parsed the user question into 3 independent parallel sub-queries to execute multi-vector index lookups:
              </p>
              {analysis.subQueries?.map((sq, index) => (
                <div
                  key={sq.id}
                  className="p-3 rounded-xl bg-[#17233A] border border-[#EAF2FF]/10 flex items-center justify-between gap-3 group hover:border-[#9666FF]/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-[#9666FF]/20 text-[#9666FF] font-mono text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[#EAF2FF] block">
                        "{sq.text}"
                      </span>
                      <span className="text-[10px] font-mono text-[#94A3B8]">
                        Domain Scope: <strong className="text-[#00D9FF]">{sq.domain}</strong>
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-[#111A2E] text-[#35D6A0] px-2 py-0.5 rounded border border-[#EAF2FF]/10">
                    PARALLEL
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#17233A]/60 border border-[#EAF2FF]/10 text-xs text-[#94A3B8] space-y-2">
              <div className="flex items-center gap-2 text-[#35D6A0] font-mono font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Single-Hop Integrity Verified</span>
              </div>
              <p>
                This query targets an atomic entity requirement without cross-document joins. The engine retains it as a unified embedding vector to maximize search speed (sub-120ms execution).
              </p>
            </div>
          )}

          {/* Semantic Embedding Vector Preview */}
          <div className="mt-5 pt-4 border-t border-[#EAF2FF]/10">
            <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-semibold tracking-wider block mb-2">
              Semantic Embedding Vector Preview (768d nomic-embed-text):
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono text-[10px]">
              {vectorDimensions.map((val, idx) => (
                <div
                  key={idx}
                  className={`p-1.5 rounded text-center border ${
                    val > 0
                      ? 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/20'
                      : 'bg-[#9666FF]/10 text-[#9666FF] border-[#9666FF]/20'
                  }`}
                >
                  <span className="text-[8px] text-[#94A3B8] block">d{idx}</span>
                  <span>{val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Extracted Entities & Salience (5 cols) */}
        <div className="lg:col-span-5 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-[#EAF2FF]/10 pb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#00D9FF]" />
              <h3 className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider">
                Extracted Entities & Salience
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#94A3B8]">
              {analysis.entities?.length || 0} IDENTIFIED
            </span>
          </div>

          <div className="space-y-2.5">
            {analysis.entities?.map((ent, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#17233A] border border-[#EAF2FF]/10 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#EAF2FF] block">
                    {ent.text}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0B1220] text-[#00D9FF] border border-[#00D9FF]/30 font-semibold">
                    {ent.type}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-[#94A3B8] block">Salience</span>
                  <span className="text-xs font-bold text-[#35D6A0]">
                    {(ent.salience * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Transformation Timeline */}
          <div className="mt-5 pt-4 border-t border-[#EAF2FF]/10">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8] font-semibold tracking-wider block mb-2.5">
              Query Transformation Timeline:
            </span>
            <div className="space-y-3">
              {transformations.map((trans, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="font-bold text-[#00D9FF]">{trans.stage}</span>
                      <span className="text-[#94A3B8]">{trans.time}</span>
                    </div>
                    <p className="text-[11px] text-[#EAF2FF] mt-0.5 truncate font-sans">
                      {trans.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
