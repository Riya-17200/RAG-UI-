import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  PlayCircle,
  Brain,
  Workflow,
  GitBranch,
  Database,
  BarChart3,
  Scale,
  Cpu,
  Activity,
  Code2,
  Settings,
  X,
  ArrowRight
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onNavigate, onSelectScenario }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // toggle trigger in parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { title: 'Adaptive Overview', subtitle: 'Global metrics & central decision engine', icon: LayoutDashboard, view: 'overview' },
    { title: 'Adaptive Playground', subtitle: 'Run queries across 4 adaptive scenarios', icon: PlayCircle, view: 'playground' },
    { title: 'Scenario A: Simple Factual Query', subtitle: 'Lightweight dense single-pass path', icon: PlayCircle, view: 'playground', scenario: 'scenarioA' },
    { title: 'Scenario B: Complex Multi-Part Query', subtitle: 'Multi-hop decomposition & parallel search', icon: PlayCircle, view: 'playground', scenario: 'scenarioB' },
    { title: 'Scenario C: Ambiguous Query', subtitle: 'Disambiguation & clarification refiner', icon: PlayCircle, view: 'playground', scenario: 'scenarioC' },
    { title: 'Scenario D: Low-Confidence Retrieval', subtitle: 'Corrective RAG (CRAG) fallback path', icon: PlayCircle, view: 'playground', scenario: 'scenarioD' },
    { title: 'Query Intelligence', subtitle: 'Intent classification & entropy meter', icon: Brain, view: 'query_intelligence' },
    { title: 'Strategy Engine', subtitle: 'Conditional rule tree & dynamic strategies', icon: Workflow, view: 'strategy_engine' },
    { title: 'Dynamic Pipeline Visualizer', subtitle: 'Interactive node-based active path diagram', icon: GitBranch, view: 'dynamic_pipeline' },
    { title: 'Retrieval Analytics', subtitle: 'Quality metrics & latency telemetry', icon: BarChart3, view: 'analytics' },
    { title: 'Evaluation Lab', subtitle: 'Adaptive vs Naive empirical benchmarks', icon: Scale, view: 'evaluation' },
    { title: 'Knowledge Sources', subtitle: '1,428 indexed enterprise documents', icon: Database, view: 'knowledge_sources' },
    { title: 'Execution Traces', subtitle: 'Full span flamegraphs and waterfall traces', icon: Activity, view: 'traces' }
  ];

  const filtered = actions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#111A2E] border border-[#00D9FF]/40 w-full max-w-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#EAF2FF]/10 bg-[#0B1220]">
          <Search className="w-4 h-4 text-[#00D9FF]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, scenario, or navigate..."
            className="flex-1 bg-transparent text-sm text-[#EAF2FF] placeholder-[#94A3B8] focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#17233A] text-[#94A3B8] hover:text-[#EAF2FF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Items List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (item.scenario && onSelectScenario) {
                    onSelectScenario(item.scenario);
                  }
                  onNavigate(item.view);
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#17233A] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0B1220] text-[#00D9FF] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#EAF2FF] block leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00D9FF] group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
