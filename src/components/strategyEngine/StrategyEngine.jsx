import React, { useState } from 'react';
import {
  Workflow,
  GitBranch,
  Search,
  Split,
  HelpCircle,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Layers,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { STRATEGY_DEFINITIONS } from '../../data/mockData';
import { DECISION_TREE_NODES } from '../../data/architectureFlows';

export default function StrategyEngine({ onNavigate, onSelectScenario }) {
  const [selectedStrategyId, setSelectedStrategyId] = useState('lightweight_dense');
  const [activeDecisionNode, setActiveDecisionNode] = useState('dt_root');
  const [simulatedPath, setSimulatedPath] = useState(['dt_root', 'dt_complexity_check', 'dt_ambiguity_check', 'dt_dense']);

  const activeStrategy = STRATEGY_DEFINITIONS.find(s => s.id === selectedStrategyId) || STRATEGY_DEFINITIONS[1];

  // Simulator helper: simulate clicking on a decision branch
  const simulateScenarioDecision = (scenario) => {
    if (scenario === 'direct') {
      setSelectedStrategyId('direct_bypass');
      setSimulatedPath(['dt_root', 'dt_bypass']);
    } else if (scenario === 'complex') {
      setSelectedStrategyId('multihop_decomposition');
      setSimulatedPath(['dt_root', 'dt_complexity_check', 'dt_multihop']);
    } else if (scenario === 'ambiguous') {
      setSelectedStrategyId('disambiguation_refine');
      setSimulatedPath(['dt_root', 'dt_complexity_check', 'dt_ambiguity_check', 'dt_refine']);
    } else if (scenario === 'low_confidence') {
      setSelectedStrategyId('corrective_crag');
      setSimulatedPath(['dt_root', 'dt_complexity_check', 'dt_ambiguity_check', 'dt_dense', 'dt_confidence_check', 'dt_crag']);
    } else {
      setSelectedStrategyId('lightweight_dense');
      setSimulatedPath(['dt_root', 'dt_complexity_check', 'dt_ambiguity_check', 'dt_dense', 'dt_confidence_check', 'dt_generate']);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9666FF] px-2.5 py-0.5 rounded-full bg-[#9666FF]/10 border border-[#9666FF]/20 font-bold">
              Signature Technical Architecture
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Dynamic Strategy Selection vs Fixed RAG Pipelines
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Adaptive Retrieval Strategy Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            RAG-TITAN dynamically determines retrieval behavior for each incoming query. Below is the active decision matrix and conditional rule trees powering autonomous strategy switching.
          </p>
        </div>

        {/* Quick Playground Button */}
        <button
          onClick={() => onNavigate('playground')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#386BFF] text-[#080D1A] font-bold text-xs uppercase tracking-wider font-mono hover:shadow-[0_0_20px_-2px_rgba(0,217,255,0.4)] transition-all"
        >
          <PlayCircle className="w-4 h-4 fill-[#080D1A]" />
          <span>Test in Playground</span>
        </button>
      </div>

      {/* Interactive Strategy Selector Cards (5 Strategies) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {STRATEGY_DEFINITIONS.map((strat) => {
          const isSelected = selectedStrategyId === strat.id;
          return (
            <div
              key={strat.id}
              onClick={() => setSelectedStrategyId(strat.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#17233A] border-2 shadow-xl scale-[1.02]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 hover:border-[#EAF2FF]/30'
              }`}
              style={{
                borderColor: isSelected ? strat.color : undefined,
                boxShadow: isSelected ? `0 0 25px -4px ${strat.color}40` : undefined
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: `${strat.color}20`,
                      color: strat.color,
                      borderColor: `${strat.color}40`
                    }}
                  >
                    {strat.badge}
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8] font-bold">
                    {strat.frequency}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#EAF2FF] mb-1">
                  {strat.name}
                </h3>
                <p className="text-[11px] text-[#94A3B8] line-clamp-2">
                  {strat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#EAF2FF]/10 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>{strat.avgLatency}</span>
                <span className="text-[#35D6A0] font-bold">{strat.accuracy}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Technical Strategy Specification Panel */}
      <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAF2FF]/10 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: `${activeStrategy.color}20`, color: activeStrategy.color }}
            >
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#EAF2FF]">
                  {activeStrategy.name}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35D6A0]/15 text-[#35D6A0] font-bold border border-[#35D6A0]/30">
                  {activeStrategy.status}
                </span>
              </div>
              <span className="text-xs font-mono text-[#94A3B8]">
                Routing Code: {activeStrategy.code} • Category: {activeStrategy.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-[#94A3B8] block text-[10px]">Avg Latency</span>
              <span className="text-[#00D9FF] font-bold text-sm">{activeStrategy.avgLatency}</span>
            </div>
            <div className="h-6 w-px bg-[#EAF2FF]/10" />
            <div>
              <span className="text-[#94A3B8] block text-[10px]">Precision</span>
              <span className="text-[#35D6A0] font-bold text-sm">{activeStrategy.accuracy}</span>
            </div>
            <div className="h-6 w-px bg-[#EAF2FF]/10" />
            <div>
              <span className="text-[#94A3B8] block text-[10px]">LLM Overhead</span>
              <span className="text-[#9666FF] font-bold text-sm">{activeStrategy.llmCalls}</span>
            </div>
          </div>
        </div>

        {/* 3 Technical Detail Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Selection Conditions */}
          <div className="bg-[#17233A] rounded-xl p-4 border border-[#EAF2FF]/10">
            <span className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider block mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Dynamic Selection Rules
            </span>
            <ul className="space-y-2 text-xs text-[#EAF2FF]">
              {activeStrategy.selectionConditions.map((cond, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00D9FF] font-bold font-mono mt-0.5">&bull;</span>
                  <span className="text-[#94A3B8] leading-relaxed">{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Retrieval Behavior */}
          <div className="bg-[#17233A] rounded-xl p-4 border border-[#EAF2FF]/10">
            <span className="text-xs font-mono uppercase text-[#9666FF] font-bold tracking-wider block mb-3 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              Retrieval Execution Engine
            </span>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
              {activeStrategy.retrievalBehavior}
            </p>
            <div className="p-2 rounded-lg bg-[#0B1220] font-mono text-[10px] text-[#00D9FF] border border-[#EAF2FF]/5">
              Cost Rating: {activeStrategy.costRating}
            </div>
          </div>

          {/* 3. Input & Output Schema */}
          <div className="bg-[#17233A] rounded-xl p-4 border border-[#EAF2FF]/10">
            <span className="text-xs font-mono uppercase text-[#35D6A0] font-bold tracking-wider block mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Contract Payload Schema
            </span>
            <div className="space-y-2 font-mono text-[11px]">
              <div>
                <span className="text-[10px] text-[#94A3B8] block">Input:</span>
                <span className="text-[#EAF2FF]">{activeStrategy.input}</span>
              </div>
              <div className="pt-2 border-t border-[#EAF2FF]/10">
                <span className="text-[10px] text-[#94A3B8] block">Output:</span>
                <span className="text-[#35D6A0]">{activeStrategy.output}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNATURE SECTION: STRATEGY DECISION TREE WITH ANIMATED FLOW */}
      <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#EAF2FF]/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <h2 className="text-lg font-bold text-[#EAF2FF] tracking-tight">
                Interactive Strategy Decision Tree
              </h2>
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Click any scenario simulator button to observe live conditional branching, alternative paths, and fallback evaluations.
            </p>
          </div>

          {/* Quick Scenario Path Simulator Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-[#94A3B8] text-[11px] mr-1">Simulate Path:</span>
            <button
              onClick={() => simulateScenarioDecision('direct')}
              className="px-2.5 py-1 rounded-lg bg-[#386BFF]/20 hover:bg-[#386BFF]/30 text-[#386BFF] border border-[#386BFF]/40 text-[11px]"
            >
              Direct
            </button>
            <button
              onClick={() => simulateScenarioDecision('dense')}
              className="px-2.5 py-1 rounded-lg bg-[#00D9FF]/20 hover:bg-[#00D9FF]/30 text-[#00D9FF] border border-[#00D9FF]/40 text-[11px]"
            >
              Dense
            </button>
            <button
              onClick={() => simulateScenarioDecision('complex')}
              className="px-2.5 py-1 rounded-lg bg-[#9666FF]/20 hover:bg-[#9666FF]/30 text-[#9666FF] border border-[#9666FF]/40 text-[11px]"
            >
              Multi-Hop
            </button>
            <button
              onClick={() => simulateScenarioDecision('ambiguous')}
              className="px-2.5 py-1 rounded-lg bg-[#FFB454]/20 hover:bg-[#FFB454]/30 text-[#FFB454] border border-[#FFB454]/40 text-[11px]"
            >
              Disambiguate
            </button>
            <button
              onClick={() => simulateScenarioDecision('low_confidence')}
              className="px-2.5 py-1 rounded-lg bg-[#FF647C]/20 hover:bg-[#FF647C]/30 text-[#FF647C] border border-[#FF647C]/40 text-[11px]"
            >
              CRAG Fallback
            </button>
          </div>
        </div>

        {/* Visual Decision Tree Node Network */}
        <div className="space-y-6">
          {/* Root Condition */}
          <div className="flex flex-col items-center">
            <div
              className={`max-w-md w-full p-4 rounded-xl border text-center transition-all ${
                simulatedPath.includes('dt_root')
                  ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_20px_-4px_rgba(0,217,255,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-60'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-bold block mb-1">
                Root Condition Gate
              </span>
              <span className="text-xs font-bold text-[#EAF2FF] block mb-1 font-mono">
                is_conversational_or_meta(query)?
              </span>
              <p className="text-[11px] text-[#94A3B8]">
                Checks if query is greeting/chit-chat without domain knowledge need.
              </p>
            </div>

            {/* Split Lines */}
            <div className="w-full max-w-lg flex items-center justify-between text-xs font-mono my-2 text-[#94A3B8]">
              <span className="text-[#386BFF] font-bold">YES &rarr;</span>
              <span className="text-[#9666FF] font-bold">&larr; NO (Informational)</span>
            </div>
          </div>

          {/* Level 2: Bypass vs Complexity Evaluation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Direct Bypass Outcome */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simulatedPath.includes('dt_bypass')
                  ? 'bg-[#17233A] border-[#386BFF] shadow-[0_0_20px_-4px_rgba(56,107,255,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#386BFF] font-bold block mb-1">
                Strategy Outcome
              </span>
              <h4 className="text-sm font-bold text-[#EAF2FF] mb-1">
                Direct Generation (Bypass)
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Bypasses vector search completely. 38ms instant completion.
              </p>
            </div>

            {/* Complexity Gate */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simulatedPath.includes('dt_complexity_check')
                  ? 'bg-[#17233A] border-[#9666FF] shadow-[0_0_20px_-4px_rgba(150,102,255,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#9666FF] font-bold block mb-1">
                Complexity Condition Gate
              </span>
              <span className="text-xs font-bold text-[#EAF2FF] block mb-1 font-mono">
                complexity &ge; 6.5 || entities &ge; 3?
              </span>
              <p className="text-xs text-[#94A3B8]">
                Multi-faceted comparative question requiring decomposition.
              </p>
            </div>
          </div>

          {/* Level 3: Multi-Hop vs Ambiguity Check */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Multi-Hop Outcome */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simulatedPath.includes('dt_multihop')
                  ? 'bg-[#17233A] border-[#9666FF] shadow-[0_0_20px_-4px_rgba(150,102,255,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#9666FF] font-bold block mb-1">
                Strategy Outcome
              </span>
              <h4 className="text-sm font-bold text-[#EAF2FF] mb-1">
                Adaptive Multi-Hop & Decomposition
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Generates 3 parallel sub-queries and aggregates multi-document contexts.
              </p>
            </div>

            {/* Ambiguity Gate */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simulatedPath.includes('dt_ambiguity_check')
                  ? 'bg-[#17233A] border-[#FFB454] shadow-[0_0_20px_-4px_rgba(255,180,84,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#FFB454] font-bold block mb-1">
                Ambiguity Entropy Gate
              </span>
              <span className="text-xs font-bold text-[#EAF2FF] block mb-1 font-mono">
                ambiguity_entropy &gt; 0.60?
              </span>
              <p className="text-xs text-[#94A3B8]">
                Evaluates conflicting cluster matches across system layers.
              </p>
            </div>
          </div>

          {/* Level 4: Disambiguation vs Lightweight Dense -> Confidence Check */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Disambiguation Outcome */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simulatedPath.includes('dt_refine')
                  ? 'bg-[#17233A] border-[#FFB454] shadow-[0_0_20px_-4px_rgba(255,180,84,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#FFB454] font-bold block mb-1">
                Strategy Outcome
              </span>
              <h4 className="text-sm font-bold text-[#EAF2FF] mb-1">
                Query Disambiguation & Refinement
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Expands underspecified queries across candidate architectural scopes.
              </p>
            </div>

            {/* Dense Path */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simulatedPath.includes('dt_dense')
                  ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_20px_-4px_rgba(0,217,255,0.4)]'
                  : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-bold block mb-1">
                Strategy Outcome
              </span>
              <h4 className="text-sm font-bold text-[#EAF2FF] mb-1">
                Lightweight Dense Retrieval
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Single-pass HNSW vector lookup with lexical cross-reranking.
              </p>
            </div>
          </div>

          {/* Post-Retrieval Confidence Gate: CRAG Fallback vs Grounded Generation */}
          <div className="max-w-2xl mx-auto border-t border-[#EAF2FF]/10 pt-5 text-center">
            <span className="text-[10px] font-mono uppercase text-[#FF647C] font-bold block mb-2">
              Post-Retrieval Self-Reflection & Evidence Gate
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border text-left transition-all ${
                  simulatedPath.includes('dt_crag')
                    ? 'bg-[#17233A] border-[#FF647C] shadow-[0_0_20px_-4px_rgba(255,100,124,0.4)]'
                    : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#FF647C] font-bold text-xs mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Score &lt; 0.70 &rarr; CRAG Fallback</span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">
                  Triggers query rewriting, secondary hybrid search, or transparent refusal to stop hallucinations.
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border text-left transition-all ${
                  simulatedPath.includes('dt_generate')
                    ? 'bg-[#17233A] border-[#35D6A0] shadow-[0_0_20px_-4px_rgba(53,214,160,0.4)]'
                    : 'bg-[#111A2E] border-[#EAF2FF]/10 opacity-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#35D6A0] font-bold text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Score &ge; 0.70 &rarr; Grounded Generation</span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">
                  Generates verified response with cited chunk references and high audit transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
