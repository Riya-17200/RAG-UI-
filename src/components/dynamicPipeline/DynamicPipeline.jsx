import React, { useState } from 'react';
import {
  GitBranch,
  Terminal,
  Brain,
  Gauge,
  Workflow,
  Search,
  Split,
  HelpCircle,
  AlertTriangle,
  ArrowUpDown,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  X,
  Play,
  Activity,
  Layers,
  Sparkles,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PIPELINE_NODES } from '../../data/architectureFlows';
import { PRESET_SCENARIOS } from '../../data/mockData';

export default function DynamicPipeline({ initialScenario = 'scenarioA', onNavigate }) {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState(initialScenario);
  const [inspectedNodeId, setInspectedNodeId] = useState('decision_engine');

  const scenario = PRESET_SCENARIOS[selectedScenarioKey] || PRESET_SCENARIOS.scenarioA;
  const inspectedNode = PIPELINE_NODES.find(n => n.id === inspectedNodeId) || PIPELINE_NODES[3];

  // Map active branches according to scenario
  const getActiveBranches = (key) => {
    switch (key) {
      case 'scenarioA':
        return ['query_input', 'query_classification', 'complexity_analysis', 'decision_engine', 'strategy_dense', 'reranking_eval', 'confidence_assessment', 'grounded_generator', 'final_response'];
      case 'scenarioB':
        return ['query_input', 'query_classification', 'complexity_analysis', 'decision_engine', 'strategy_multihop', 'reranking_eval', 'confidence_assessment', 'grounded_generator', 'final_response'];
      case 'scenarioC':
        return ['query_input', 'query_classification', 'complexity_analysis', 'decision_engine', 'strategy_refinement', 'reranking_eval', 'confidence_assessment', 'grounded_generator', 'final_response'];
      case 'scenarioD':
        return ['query_input', 'query_classification', 'complexity_analysis', 'decision_engine', 'strategy_crag', 'confidence_assessment', 'final_response'];
      default:
        return ['query_input', 'query_classification', 'complexity_analysis', 'decision_engine', 'strategy_dense', 'reranking_eval', 'confidence_assessment', 'grounded_generator', 'final_response'];
    }
  };

  const activeNodes = getActiveBranches(selectedScenarioKey);

  const iconMap = {
    Terminal,
    Brain,
    Gauge,
    Workflow,
    Search,
    Split,
    HelpCircle,
    AlertTriangle,
    ArrowUpDown,
    ShieldCheck,
    Cpu,
    CheckCircle2
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              Dynamic Visualizer
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Real-Time Node Activation & Conditional Branching
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Dynamic Pipeline Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Watch the pipeline rewrite its active execution path in response to query complexity, intent, and retrieved evidence confidence. Click any node for technical inspection.
          </p>
        </div>

        {/* Scenario Switcher for Live Pipeline Rewiring */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PRESET_SCENARIOS).map(([key, scn]) => {
            const isSelected = selectedScenarioKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedScenarioKey(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#17233A] border-[#00D9FF] text-[#EAF2FF] shadow-[0_0_15px_-3px_rgba(0,217,255,0.4)] font-bold'
                    : 'bg-[#111A2E] border-[#EAF2FF]/10 text-[#94A3B8] hover:text-[#EAF2FF]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: scn.color }}
                />
                <span>{scn.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Path Context Banner */}
      <div className="p-4 rounded-xl bg-[#111A2E] border border-[#EAF2FF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#00D9FF] font-bold">ACTIVE ROUTE:</span>
          <span className="text-[#EAF2FF]">"{scenario.query}"</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#94A3B8]">
          <span>Strategy: <strong className="text-[#9666FF]">{scenario.finalResponse.strategyUsed}</strong></span>
          <span>•</span>
          <span>Active Nodes: <strong className="text-[#35D6A0]">{activeNodes.length} / {PIPELINE_NODES.length}</strong></span>
        </div>
      </div>

      {/* Node-Based Pipeline Graph & Inspection Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-[#0B1220] border border-[#EAF2FF]/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl tech-grid-pattern">
          {/* Section: Stage 1 Ingestion & Analysis */}
          <div className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] font-semibold block mb-3">
              Phase 1: Ingestion & Query Profiling
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PIPELINE_NODES.slice(0, 3).map((node) => {
                const NodeIcon = iconMap[node.icon] || Brain;
                const isActive = activeNodes.includes(node.id);
                const isInspected = inspectedNodeId === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setInspectedNodeId(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                      isInspected
                        ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_20px_-4px_rgba(0,217,255,0.4)]'
                        : isActive
                        ? 'bg-[#111A2E] border-[#EAF2FF]/15 hover:border-[#00D9FF]/40'
                        : 'bg-[#080D1A]/50 border-transparent opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="p-1.5 rounded-lg text-xs"
                        style={{ backgroundColor: `${node.color}20`, color: node.color }}
                      >
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono text-[#94A3B8]">{node.latency}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#EAF2FF] mb-0.5">{node.label}</h4>
                    <span className="text-[10px] font-mono text-[#94A3B8]">{node.stage}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG Animated Connector Down */}
          <div className="flex justify-center my-3">
            <svg width="40" height="28" viewBox="0 0 40 28" className="overflow-visible">
              <line x1="20" y1="0" x2="20" y2="28" className="flow-dash-cyan" strokeWidth="2.5" />
              <polygon points="16,24 20,30 24,24" fill="#00D9FF" />
            </svg>
          </div>

          {/* DOMINANT ADAPTIVE DECISION ENGINE */}
          <div className="max-w-md mx-auto mb-6">
            {(() => {
              const node = PIPELINE_NODES[3]; // decision_engine
              const isInspected = inspectedNodeId === node.id;
              return (
                <div
                  onClick={() => setInspectedNodeId(node.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                    isInspected
                      ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_35px_-4px_rgba(0,217,255,0.5)]'
                      : 'bg-gradient-to-r from-[#17233A] via-[#111A2E] to-[#17233A] border-[#00D9FF] shadow-[0_0_20px_-4px_rgba(0,217,255,0.3)]'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00D9FF] text-[#080D1A] font-extrabold text-[9px] font-mono uppercase px-3 py-0.5 rounded-full">
                    ADAPTIVE ORCHESTRATOR
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF] flex items-center justify-center mx-auto mb-2 mt-1">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#EAF2FF]">
                    Adaptive Decision Engine
                  </h3>
                  <span className="text-[10px] font-mono text-[#00D9FF]">
                    Dynamic Strategy Evaluation • 8ms
                  </span>
                </div>
              );
            })()}
          </div>

          {/* SVG Animated Connector Down to Branches */}
          <div className="flex justify-center my-3">
            <svg width="40" height="28" viewBox="0 0 40 28" className="overflow-visible">
              <line x1="20" y1="0" x2="20" y2="28" className="flow-dash-violet" strokeWidth="2.5" />
              <polygon points="16,24 20,30 24,24" fill="#9666FF" />
            </svg>
          </div>

          {/* Branching Retrieval Nodes (Indices 4 to 8) */}
          <div className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] font-semibold block mb-3 text-center">
              Phase 2: Branching Strategy Execution
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PIPELINE_NODES.slice(5, 9).map((node) => {
                const NodeIcon = iconMap[node.icon] || Search;
                const isActive = activeNodes.includes(node.id);
                const isInspected = inspectedNodeId === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setInspectedNodeId(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isInspected
                        ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_20px_-4px_rgba(0,217,255,0.4)]'
                        : isActive
                        ? 'bg-[#17233A] border-2 border-[#35D6A0] shadow-[0_0_15px_-4px_rgba(53,214,160,0.3)]'
                        : 'bg-[#111A2E]/40 border-[#EAF2FF]/5 opacity-35'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="p-1.5 rounded-lg text-xs"
                        style={{ backgroundColor: `${node.color}20`, color: node.color }}
                      >
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      {isActive && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#35D6A0]/20 text-[#35D6A0]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-[#EAF2FF] mb-0.5">{node.label}</h4>
                    <span className="text-[10px] font-mono text-[#94A3B8]">{node.latency}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG Animated Connector Down to Post-Retrieval */}
          <div className="flex justify-center my-3">
            <svg width="40" height="28" viewBox="0 0 40 28" className="overflow-visible">
              <line x1="20" y1="0" x2="20" y2="28" className="flow-dash-green" strokeWidth="2.5" />
              <polygon points="16,24 20,30 24,24" fill="#35D6A0" />
            </svg>
          </div>

          {/* Section: Stage 3 Rerank, Evaluation & Synthesis */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] font-semibold block mb-3">
              Phase 3: Reranking, Confidence Assessment & Response
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {PIPELINE_NODES.slice(9, 13).map((node) => {
                const NodeIcon = iconMap[node.icon] || CheckCircle2;
                const isActive = activeNodes.includes(node.id);
                const isInspected = inspectedNodeId === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setInspectedNodeId(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isInspected
                        ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_20px_-4px_rgba(0,217,255,0.4)]'
                        : isActive
                        ? 'bg-[#111A2E] border-[#EAF2FF]/15 hover:border-[#00D9FF]/40'
                        : 'bg-[#080D1A]/50 border-transparent opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="p-1.5 rounded-lg text-xs"
                        style={{ backgroundColor: `${node.color}20`, color: node.color }}
                      >
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono text-[#94A3B8]">{node.latency}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#EAF2FF] mb-0.5">{node.label}</h4>
                    <span className="text-[10px] font-mono text-[#94A3B8]">{node.stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Node Inspection Drawer (4 cols) */}
        <div className="lg:col-span-4 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
              <h3 className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider">
                Node Inspector
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35D6A0]/20 text-[#35D6A0] font-bold">
              {inspectedNode.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-bold text-[#EAF2FF]">
                  {inspectedNode.label}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#9666FF] block">
                ID: {inspectedNode.id} • Category: {inspectedNode.category}
              </span>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed font-sans">
                {inspectedNode.role}
              </p>
            </div>

            <div className="p-3 bg-[#17233A] rounded-xl border border-[#EAF2FF]/10 space-y-2.5 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#94A3B8] block">Step Latency:</span>
                <span className="text-[#35D6A0] font-bold">{inspectedNode.latency}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">Expected Input:</span>
                <span className="text-[#EAF2FF] text-[11px]">{inspectedNode.inputs}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">Generated Output:</span>
                <span className="text-[#00D9FF] text-[11px]">{inspectedNode.outputs}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] block">Runtime Configuration:</span>
                <div className="p-1.5 rounded bg-[#0B1220] text-[#FFB454] text-[10px] overflow-x-auto">
                  {inspectedNode.config}
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('traces')}
                className="w-full py-2 rounded-xl bg-[#17233A] hover:bg-[#1f2f4e] border border-[#EAF2FF]/10 text-xs font-mono text-[#00D9FF] transition-all flex items-center justify-center gap-1.5 font-semibold"
              >
                <span>View Node Execution Trace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
