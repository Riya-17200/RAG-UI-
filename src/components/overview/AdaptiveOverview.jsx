import React, { useState } from 'react';
import {
  Brain,
  Workflow,
  Search,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  Split,
  HelpCircle,
  AlertTriangle,
  PlayCircle,
  GitBranch,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import MetricsCard from '../common/MetricsCard';
import GaugeChart from '../common/GaugeChart';
import { SYSTEM_STATS, STRATEGY_DEFINITIONS, RECENT_EXECUTION_TRACES } from '../../data/mockData';

export default function AdaptiveOverview({ onNavigate, onSelectScenario }) {
  const [hoveredStrategy, setHoveredStrategy] = useState(null);

  const strategies = [
    {
      id: 'direct_bypass',
      name: 'Direct Bypass',
      type: 'Zero-Retrieval',
      color: '#386BFF',
      ratio: '14.2%',
      latency: '38ms',
      icon: Zap,
      desc: 'Bypasses vector search for conversational or greeting turns.'
    },
    {
      id: 'lightweight_dense',
      name: 'Lightweight Dense',
      type: 'Single-Pass',
      color: '#00D9FF',
      ratio: '48.6%',
      latency: '114ms',
      icon: Search,
      desc: 'Single-pass fast vector lookup for atomic factual queries.'
    },
    {
      id: 'multihop_decomposition',
      name: 'Multi-Hop Decomposition',
      type: 'Parallel Multi-Step',
      color: '#9666FF',
      ratio: '22.3%',
      latency: '318ms',
      icon: Split,
      desc: 'Decomposes complex queries into parallel sub-searches.'
    },
    {
      id: 'disambiguation_refine',
      name: 'Disambiguation Refiner',
      type: 'Semantic Clarification',
      color: '#FFB454',
      ratio: '11.1%',
      latency: '242ms',
      icon: HelpCircle,
      desc: 'Detects ambiguous queries and reformulates architectural scopes.'
    },
    {
      id: 'corrective_crag',
      name: 'Corrective CRAG Fallback',
      type: 'Self-Corrective',
      color: '#FF647C',
      ratio: '3.8%',
      latency: '388ms',
      icon: AlertTriangle,
      desc: 'Self-reflecting confidence gate triggers rewrite or safe refusal.'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAF2FF]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              Autonomous Retrieval Architecture
            </span>
            <span className="text-[10px] font-mono text-[#94A3B8]">
              Cluster: us-east-2 • Real-Time Dynamic Routing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#EAF2FF] tracking-tight">
            Adaptive RAG Intelligence
          </h1>
          <p className="text-base text-[#94A3B8] mt-1.5 max-w-2xl font-normal leading-relaxed">
            An intelligent retrieval engine that adapts its strategy to every query — dynamically routing between fast single-pass search, multi-hop decomposition, disambiguation, and self-corrective fallbacks.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('playground')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#386BFF] text-[#080D1A] font-bold text-xs uppercase tracking-wider font-mono hover:shadow-[0_0_25px_-2px_rgba(0,217,255,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <PlayCircle className="w-4 h-4 fill-[#080D1A]" />
            <span>Launch Adaptive Playground</span>
          </button>
          <button
            onClick={() => onNavigate('strategy_engine')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111A2E] hover:bg-[#17233A] border border-[#EAF2FF]/15 text-[#EAF2FF] font-semibold text-xs font-mono transition-all"
          >
            <Workflow className="w-4 h-4 text-[#9666FF]" />
            <span>Strategy Engine</span>
          </button>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricsCard
          title="Queries Analyzed"
          value={SYSTEM_STATS.totalQueriesAnalyzed}
          subtitle="Cumulative runtime queries"
          trend="+14.2%"
          trendPositive={true}
          icon={Brain}
          accent="cyan"
          isMeasured={true}
        />
        <MetricsCard
          title="Strategy Selections"
          value={SYSTEM_STATS.adaptiveStrategySelections}
          subtitle="Autonomous dynamic routes"
          trend="+2.1%"
          trendPositive={true}
          icon={GitBranch}
          accent="violet"
          isMeasured={true}
        />
        <MetricsCard
          title="Retrieval Success"
          value={SYSTEM_STATS.retrievalSuccessRate}
          subtitle="Evidence precision rate"
          trend="+0.8%"
          trendPositive={true}
          icon={CheckCircle2}
          accent="green"
          isMeasured={true}
        />
        <MetricsCard
          title="Avg Latency"
          value={`${SYSTEM_STATS.avgRetrievalLatencyMs}`}
          unit="ms"
          subtitle="P95: 285ms"
          trend="-24ms"
          trendPositive={true}
          icon={Activity}
          accent="blue"
          isMeasured={true}
        />
        <MetricsCard
          title="Confidence Score"
          value={SYSTEM_STATS.compositeConfidenceScore}
          subtitle="Grounded evidence score"
          trend="+0.04"
          trendPositive={true}
          icon={ShieldCheck}
          accent="green"
          isMeasured={true}
        />
        <MetricsCard
          title="Fallback Activations"
          value={SYSTEM_STATS.fallbackActivations}
          subtitle="CRAG safety guardrails"
          trend="-1.2%"
          trendPositive={true}
          icon={AlertTriangle}
          accent="orange"
          isMeasured={true}
        />
      </div>

      {/* Central Visual Showcase: ADAPTIVE INTELLIGENCE VISUALIZATION */}
      <div className="relative bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
        {/* Background glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#00D9FF]/10 via-[#9666FF]/10 to-[#386BFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 border-b border-[#EAF2FF]/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
              <h2 className="text-lg font-bold text-[#EAF2FF] tracking-tight">
                Adaptive Intelligence Pipeline Architecture
              </h2>
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Visualizing dynamic query analysis, the dominant central decision engine, and branching retrieval strategies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#94A3B8] bg-[#17233A] px-2.5 py-1 rounded-lg border border-[#EAF2FF]/10">
              Active Strategy Engine: <strong className="text-[#00D9FF]">v2.4 Dynamic</strong>
            </span>
            <button
              onClick={() => onNavigate('dynamic_pipeline')}
              className="text-xs font-mono text-[#00D9FF] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Interactive Visualizer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* The Pipeline Visual Flow Diagram */}
        <div className="relative flex flex-col items-center">
          {/* Top Stages: User Query -> Understanding -> Complexity & Intent */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Step 1: User Query */}
            <div className="bg-[#17233A] border border-[#00D9FF]/30 rounded-xl p-4 flex items-center gap-3 shadow-md relative group hover:border-[#00D9FF] transition-all">
              <div className="p-2.5 rounded-lg bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/20">
                <Brain className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-[#00D9FF] font-semibold tracking-wider uppercase">Stage 01 • INGESTION</div>
                <div className="text-sm font-bold text-[#EAF2FF]">USER QUERY</div>
                <div className="text-[11px] text-[#94A3B8] truncate">Sanitizes & tokenizes prompt</div>
              </div>
            </div>

            {/* Step 2: Query Understanding */}
            <div className="bg-[#17233A] border border-[#9666FF]/30 rounded-xl p-4 flex items-center gap-3 shadow-md relative group hover:border-[#9666FF] transition-all">
              <div className="p-2.5 rounded-lg bg-[#9666FF]/15 text-[#9666FF] border border-[#9666FF]/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-[#9666FF] font-semibold tracking-wider uppercase">Stage 02 • PARSING</div>
                <div className="text-sm font-bold text-[#EAF2FF]">QUERY UNDERSTANDING</div>
                <div className="text-[11px] text-[#94A3B8] truncate">Intent classification & semantics</div>
              </div>
            </div>

            {/* Step 3: Complexity & Intent Analysis */}
            <div className="bg-[#17233A] border border-[#9666FF]/30 rounded-xl p-4 flex items-center gap-3 shadow-md relative group hover:border-[#9666FF] transition-all">
              <div className="p-2.5 rounded-lg bg-[#9666FF]/15 text-[#9666FF] border border-[#9666FF]/20">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-[#9666FF] font-semibold tracking-wider uppercase">Stage 03 • PROFILING</div>
                <div className="text-sm font-bold text-[#EAF2FF]">COMPLEXITY & INTENT</div>
                <div className="text-[11px] text-[#94A3B8] truncate">Entropy & multi-aspect scoring</div>
              </div>
            </div>
          </div>

          {/* SVG Animated Connector Down to Decision Engine */}
          <div className="flex justify-center mb-2">
            <svg width="40" height="32" viewBox="0 0 40 32" className="overflow-visible">
              <line x1="20" y1="0" x2="20" y2="32" className="flow-dash-cyan" strokeWidth="2.5" />
              <polygon points="16,28 20,34 24,28" fill="#00D9FF" />
            </svg>
          </div>

          {/* DOMINANT CENTRAL DECISION ENGINE */}
          <div className="w-full max-w-2xl relative mb-6">
            <div className="relative bg-gradient-to-r from-[#17233A] via-[#111A2E] to-[#17233A] border-2 border-[#00D9FF] rounded-2xl p-6 shadow-[0_0_40px_-5px_rgba(0,217,255,0.4)] text-center group">
              {/* Outer Pulsing Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00D9FF] text-[#080D1A] font-extrabold text-[10px] font-mono uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-[#080D1A]" />
                <span>ADAPTIVE DECISION ENGINE • BRAIN OF RAG-TITAN</span>
              </div>

              <div className="flex flex-col items-center mt-2">
                <div className="w-14 h-14 rounded-2xl bg-[#00D9FF]/20 border border-[#00D9FF] flex items-center justify-center text-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.4)] mb-3">
                  <Workflow className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-[#EAF2FF] tracking-tight">
                  Dynamic Decision & Routing Matrix
                </h3>
                <p className="text-xs text-[#94A3B8] max-w-lg mt-1 font-mono">
                  Evaluates Complexity Score $\ge$ 6.5, Ambiguity Entropy, Entity Depth, and Confidence Gates to branch execution paths.
                </p>

                {/* Routing Rules Indicator Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <span className="text-[10px] font-mono bg-[#111A2E] px-2.5 py-1 rounded-md border border-[#00D9FF]/30 text-[#00D9FF]">
                    IF complexity &le; 3 &rarr; Dense Single-Pass
                  </span>
                  <span className="text-[10px] font-mono bg-[#111A2E] px-2.5 py-1 rounded-md border border-[#9666FF]/30 text-[#9666FF]">
                    IF multi-part &rarr; Decomposition Multi-Hop
                  </span>
                  <span className="text-[10px] font-mono bg-[#111A2E] px-2.5 py-1 rounded-md border border-[#FFB454]/30 text-[#FFB454]">
                    IF ambiguity &gt; 0.6 &rarr; Disambiguation
                  </span>
                  <span className="text-[10px] font-mono bg-[#111A2E] px-2.5 py-1 rounded-md border border-[#FF647C]/30 text-[#FF647C]">
                    IF confidence &lt; 0.7 &rarr; CRAG Fallback
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Animated Connector Down to Branching Strategies */}
          <div className="flex justify-center mb-2">
            <svg width="40" height="32" viewBox="0 0 40 32" className="overflow-visible">
              <line x1="20" y1="0" x2="20" y2="32" className="flow-dash-violet" strokeWidth="2.5" />
              <polygon points="16,28 20,34 24,28" fill="#9666FF" />
            </svg>
          </div>

          {/* DYNAMIC RETRIEVAL STRATEGY BRANCHES (5 Branch Paths) */}
          <div className="w-full">
            <div className="text-center mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                &darr; DYNAMIC STRATEGY BRANCHING PATHS &darr;
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {strategies.map((strat) => {
                const SIcon = strat.icon;
                const isHovered = hoveredStrategy === strat.id;

                return (
                  <div
                    key={strat.id}
                    onMouseEnter={() => setHoveredStrategy(strat.id)}
                    onMouseLeave={() => setHoveredStrategy(null)}
                    onClick={() => onNavigate('strategy_engine')}
                    className={`bg-[#17233A]/80 border rounded-xl p-3.5 transition-all cursor-pointer relative group flex flex-col justify-between ${
                      isHovered ? 'scale-105 z-10 shadow-xl' : 'hover:border-opacity-60'
                    }`}
                    style={{
                      borderColor: strat.color,
                      boxShadow: isHovered ? `0 0 25px -4px ${strat.color}50` : 'none'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="p-1.5 rounded-lg text-xs"
                          style={{ backgroundColor: `${strat.color}20`, color: strat.color }}
                        >
                          <SIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#EAF2FF]">
                          {strat.ratio}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#EAF2FF] mb-1">
                        {strat.name}
                      </h4>
                      <p className="text-[10px] text-[#94A3B8] leading-snug">
                        {strat.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#EAF2FF]/10 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                      <span>Latency: {strat.latency}</span>
                      <span className="text-[#00D9FF] font-semibold group-hover:underline">Inspect &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG Animated Connector Down to Evaluation & Final Response */}
          <div className="flex justify-center my-3">
            <svg width="40" height="32" viewBox="0 0 40 32" className="overflow-visible">
              <line x1="20" y1="0" x2="20" y2="32" className="flow-dash-green" strokeWidth="2.5" />
              <polygon points="16,28 20,34 24,28" fill="#35D6A0" />
            </svg>
          </div>

          {/* Bottom Stages: Retrieval & Eval -> Confidence Gate -> Final Response */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 5: Retrieval & Evaluation */}
            <div className="bg-[#17233A] border border-[#386BFF]/30 rounded-xl p-4 flex items-center gap-3 shadow-md relative group hover:border-[#386BFF] transition-all">
              <div className="p-2.5 rounded-lg bg-[#386BFF]/15 text-[#386BFF] border border-[#386BFF]/20">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-[#386BFF] font-semibold tracking-wider uppercase">Stage 05 • SEARCH</div>
                <div className="text-sm font-bold text-[#EAF2FF]">RETRIEVAL & EVAL</div>
                <div className="text-[11px] text-[#94A3B8] truncate">Dense/hybrid index execution & rerank</div>
              </div>
            </div>

            {/* Step 6: Confidence Assessment Gate */}
            <div className="bg-[#17233A] border border-[#FFB454]/40 rounded-xl p-4 flex items-center gap-3 shadow-md relative group hover:border-[#FFB454] transition-all">
              <div className="p-2.5 rounded-lg bg-[#FFB454]/15 text-[#FFB454] border border-[#FFB454]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-[#FFB454] font-semibold tracking-wider uppercase">Stage 06 • GATE</div>
                <div className="text-sm font-bold text-[#EAF2FF]">CONFIDENCE CHECK</div>
                <div className="text-[11px] text-[#94A3B8] truncate">Evidence check &ge; 0.70 threshold</div>
              </div>
            </div>

            {/* Step 7: Final Grounded Response */}
            <div className="bg-[#17233A] border border-[#35D6A0]/40 rounded-xl p-4 flex items-center gap-3 shadow-md relative group hover:border-[#35D6A0] transition-all">
              <div className="p-2.5 rounded-lg bg-[#35D6A0]/15 text-[#35D6A0] border border-[#35D6A0]/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-[#35D6A0] font-semibold tracking-wider uppercase">Stage 07 • VERIFIED</div>
                <div className="text-sm font-bold text-[#EAF2FF]">FINAL RESPONSE</div>
                <div className="text-[11px] text-[#94A3B8] truncate">Cited answer with audit trace</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Lower Section: Strategy Distribution & Recent Adaptive Executions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Execution Breakdown */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#EAF2FF] uppercase font-mono tracking-wider">
                Strategy Routing Distribution
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35D6A0]/15 text-[#35D6A0] border border-[#35D6A0]/30 font-bold">
                MEASURED
              </span>
            </div>

            <div className="space-y-3.5">
              {strategies.map((strat) => (
                <div key={strat.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#EAF2FF] flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: strat.color }} />
                      {strat.name}
                    </span>
                    <span className="text-[#94A3B8] font-bold">{strat.ratio}</span>
                  </div>
                  <div className="w-full bg-[#17233A] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: strat.ratio,
                        backgroundColor: strat.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#EAF2FF]/10 text-xs font-mono text-[#94A3B8] flex items-center justify-between">
            <span>Dynamic Route Efficiency:</span>
            <span className="text-[#35D6A0] font-bold">+38% vs Fixed Pipeline</span>
          </div>
        </div>

        {/* Live Execution Telemetry Feed */}
        <div className="lg:col-span-2 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <h3 className="text-sm font-bold text-[#EAF2FF] uppercase font-mono tracking-wider">
                Recent Adaptive Executions
              </h3>
            </div>
            <button
              onClick={() => onNavigate('traces')}
              className="text-xs font-mono text-[#00D9FF] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All Traces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {RECENT_EXECUTION_TRACES.slice(0, 4).map((trace) => {
              const statusColors = {
                OPTIMAL: 'bg-[#35D6A0]/15 text-[#35D6A0] border-[#35D6A0]/30',
                ADAPTED: 'bg-[#FFB454]/15 text-[#FFB454] border-[#FFB454]/30',
                FALLBACK: 'bg-[#FF647C]/15 text-[#FF647C] border-[#FF647C]/30',
                BYPASS: 'bg-[#386BFF]/15 text-[#386BFF] border-[#386BFF]/30'
              };

              return (
                <div
                  key={trace.traceId}
                  onClick={() => {
                    if (trace.scenarioId && onSelectScenario) {
                      onSelectScenario(trace.scenarioId);
                      onNavigate('playground');
                    }
                  }}
                  className="p-3 rounded-xl bg-[#17233A]/60 hover:bg-[#17233A] border border-[#EAF2FF]/5 hover:border-[#00D9FF]/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-[#94A3B8]">{trace.traceId}</span>
                      <span className="text-[10px] font-mono text-[#94A3B8]">• {trace.timestamp.split(' ')[1]}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.2 rounded border font-bold ${statusColors[trace.status] || ''}`}>
                        {trace.status}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-[#EAF2FF] group-hover:text-[#00D9FF] transition-colors truncate">
                      "{trace.query}"
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 text-xs font-mono">
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] font-semibold text-[#9666FF]">{trace.strategy}</div>
                      <div className="text-[10px] text-[#94A3B8]">Conf: {(trace.confidence * 100).toFixed(0)}% • {trace.latencyMs}ms</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D9FF] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
