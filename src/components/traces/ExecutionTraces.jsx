import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Code,
  Layers,
  ArrowRight,
  Terminal,
  Cpu,
  Brain,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import { RECENT_EXECUTION_TRACES, PRESET_SCENARIOS } from '../../data/mockData';

export default function ExecutionTraces({ onNavigate, onSelectScenario }) {
  const [selectedTraceId, setSelectedTraceId] = useState('tr-9842b');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const currentTrace = RECENT_EXECUTION_TRACES.find(t => t.traceId === selectedTraceId) || RECENT_EXECUTION_TRACES[0];
  const scenario = PRESET_SCENARIOS[currentTrace.scenarioId] || PRESET_SCENARIOS.scenarioA;

  const filteredTraces = RECENT_EXECUTION_TRACES.filter(t => {
    const matchesFilter = filterStatus === 'ALL' || t.status === filterStatus;
    const matchesSearch = t.query.toLowerCase().includes(searchTerm.toLowerCase()) || t.traceId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              AI Observability
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Deep Waterfall Spans & Step Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Execution Traces
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Granular span-by-span chronological flame-graphs for every query routed through RAG-TITAN, tracking token latency, model decision reasoning, and evidence validation gates.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {['ALL', 'OPTIMAL', 'ADAPTED', 'FALLBACK', 'BYPASS'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
                filterStatus === status
                  ? 'bg-[#00D9FF]/20 text-[#00D9FF] border-[#00D9FF]/40'
                  : 'bg-[#111A2E] text-[#94A3B8] border-[#EAF2FF]/10 hover:text-[#EAF2FF]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracing Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Trace List (5 cols) */}
        <div className="lg:col-span-5 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter trace ID or query..."
              className="w-full bg-[#080D1A] border border-[#EAF2FF]/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#EAF2FF] focus:outline-none focus:border-[#00D9FF] font-mono"
            />
          </div>

          {/* Trace Rows */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTraces.map((trace) => {
              const isSelected = selectedTraceId === trace.traceId;
              const statusColors = {
                OPTIMAL: 'text-[#35D6A0] bg-[#35D6A0]/15 border-[#35D6A0]/30',
                ADAPTED: 'text-[#FFB454] bg-[#FFB454]/15 border-[#FFB454]/30',
                FALLBACK: 'text-[#FF647C] bg-[#FF647C]/15 border-[#FF647C]/30',
                BYPASS: 'text-[#386BFF] bg-[#386BFF]/15 border-[#386BFF]/30'
              };

              return (
                <div
                  key={trace.traceId}
                  onClick={() => setSelectedTraceId(trace.traceId)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_15px_-4px_rgba(0,217,255,0.4)]'
                      : 'bg-[#17233A]/50 border-[#EAF2FF]/5 hover:border-[#00D9FF]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#00D9FF]">
                      {trace.traceId}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-bold ${statusColors[trace.status]}`}>
                      {trace.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#EAF2FF] line-clamp-1 mb-2 font-sans">
                    "{trace.query}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] border-t border-[#EAF2FF]/10 pt-2">
                    <span className="text-[#9666FF] font-bold">{trace.strategy}</span>
                    <span>{trace.latencyMs}ms • {(trace.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Waterfall Flame-Graph & Deep Span Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          {/* Trace Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAF2FF]/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-extrabold text-[#00D9FF]">
                  {currentTrace.traceId}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  • {currentTrace.timestamp}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#EAF2FF] mt-1 font-sans">
                "{currentTrace.query}"
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentTrace.scenarioId && onSelectScenario) {
                    onSelectScenario(currentTrace.scenarioId);
                    onNavigate('playground');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-[#00D9FF]/20 hover:bg-[#00D9FF]/30 text-[#00D9FF] border border-[#00D9FF]/40 text-xs font-mono font-bold flex items-center gap-1.5"
              >
                <span>Replay in Playground</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Chronological Waterfall Latency Timeline */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] font-semibold block mb-3">
              Waterfall Execution Timeline ({scenario.pipelineTrace.length} Spans • Total {currentTrace.latencyMs}ms)
            </span>

            <div className="space-y-2.5">
              {scenario.pipelineTrace.map((span, index) => {
                const percent = Math.min(100, Math.max(8, (span.timeMs / currentTrace.latencyMs) * 100));
                return (
                  <div key={index} className="p-2.5 rounded-xl bg-[#17233A] border border-[#EAF2FF]/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#94A3B8] font-bold">0{index + 1}</span>
                        <span className="font-semibold text-[#EAF2FF]">{span.step}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#94A3B8]">{span.timeMs}ms</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          span.status === 'completed'
                            ? 'bg-[#35D6A0]/15 text-[#35D6A0]'
                            : 'bg-[#FFB454]/15 text-[#FFB454]'
                        }`}>
                          {span.status}
                        </span>
                      </div>
                    </div>

                    {/* Latency Bar */}
                    <div className="w-full bg-[#0B1220] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9666FF]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[#94A3B8] font-sans">
                      {span.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trace Metadata Drawer */}
          <div className="p-4 rounded-xl bg-[#080D1A] border border-[#EAF2FF]/10 text-xs font-mono space-y-2">
            <span className="text-[10px] uppercase text-[#00D9FF] font-bold tracking-wider block">
              Telemetry Context Metadata
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Router Model:</span>
                <span className="text-[#EAF2FF]">gemma3:4b</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Generator:</span>
                <span className="text-[#EAF2FF]">llama3.3:70b</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Total Tokens:</span>
                <span className="text-[#35D6A0] font-bold">{currentTrace.tokens} tok</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Confidence:</span>
                <span className="text-[#00D9FF] font-bold">{(currentTrace.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
