import React from 'react';
import {
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
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

export default function Sidebar({
  activeView,
  onNavigate,
  isCollapsed,
  onToggleCollapse
}) {
  const navItems = [
    {
      id: 'overview',
      label: 'Adaptive Overview',
      icon: LayoutDashboard,
      badge: null,
      section: 'CORE INTELLIGENCE'
    },
    {
      id: 'playground',
      label: 'Adaptive Playground',
      icon: PlayCircle,
      badge: 'SIGNATURE',
      highlight: true,
      badgeColor: 'bg-[#00D9FF]/20 text-[#00D9FF] border-[#00D9FF]/30'
    },
    {
      id: 'query_intelligence',
      label: 'Query Intelligence',
      icon: Brain,
      badge: 'ANALYZER'
    },
    {
      id: 'strategy_engine',
      label: 'Strategy Engine',
      icon: Workflow,
      badge: 'DYNAMIC',
      highlight: true,
      badgeColor: 'bg-[#9666FF]/20 text-[#9666FF] border-[#9666FF]/30'
    },
    {
      id: 'dynamic_pipeline',
      label: 'Dynamic Pipeline',
      icon: GitBranch,
      badge: 'VISUALIZER',
      highlight: true,
      badgeColor: 'bg-[#00D9FF]/20 text-[#00D9FF] border-[#00D9FF]/30'
    },
    {
      id: 'knowledge_sources',
      label: 'Knowledge Sources',
      icon: Database,
      badge: '1,428 DOCS',
      section: 'SYSTEM & OBSERVABILITY'
    },
    {
      id: 'analytics',
      label: 'Retrieval Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'evaluation',
      label: 'Evaluation Lab',
      icon: Scale,
      badge: '+18.4%'
    },
    {
      id: 'models',
      label: 'Model Configuration',
      icon: Cpu,
      badge: null
    },
    {
      id: 'traces',
      label: 'Execution Traces',
      icon: Activity,
      badge: 'LIVE'
    },
    {
      id: 'api',
      label: 'API & Integration',
      icon: Code2,
      badge: 'v2.4',
      section: 'MANAGEMENT'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside
      className={`bg-[#0B1220] border-r border-[#EAF2FF]/10 flex flex-col transition-all duration-300 relative select-none z-20 ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand logo & toggle */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#EAF2FF]/10">
        <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D9FF] via-[#386BFF] to-[#9666FF] p-0.5 shadow-[0_0_20px_-3px_rgba(0,217,255,0.4)]">
            <div className="w-full h-full bg-[#080D1A] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00D9FF]" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-wider font-mono text-[#EAF2FF]">
                  RAG-TITAN
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                  ADAPTIVE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8] tracking-tight">
                Intelligence Engine v2.4
              </span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-[#17233A] text-[#94A3B8] hover:text-[#EAF2FF] transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation menu */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <React.Fragment key={item.id}>
              {/* Section Header */}
              {item.section && !isCollapsed && (
                <div className="px-3 pt-4 pb-1.5 text-[9px] font-mono uppercase tracking-wider text-[#94A3B8]/60 font-semibold">
                  {item.section}
                </div>
              )}

              <button
                onClick={() => onNavigate(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#17233A] to-[#111A2E] text-[#EAF2FF] border border-[#00D9FF]/40 shadow-[0_0_15px_-4px_rgba(0,217,255,0.25)] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#EAF2FF] hover:bg-[#111A2E] border border-transparent'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
                )}

                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#00D9FF]'
                      : 'text-[#94A3B8] group-hover:text-[#EAF2FF]'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                          item.badgeColor || 'bg-[#17233A] text-[#94A3B8] border-[#EAF2FF]/10'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Collapse button when collapsed */}
      {isCollapsed && (
        <div className="p-2 border-t border-[#EAF2FF]/10 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-[#17233A] text-[#94A3B8] hover:text-[#EAF2FF] transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom system telemetry card */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[#EAF2FF]/10 bg-[#080D1A]/50 m-2 rounded-xl border">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35D6A0]" />
              Index Storage
            </span>
            <span className="text-[#EAF2FF] font-semibold">348.2k vecs</span>
          </div>
          <div className="w-full bg-[#17233A] h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-[#00D9FF] to-[#9666FF] h-full rounded-full" style={{ width: '64%' }} />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]/80">
            <span>Uptime: 99.99%</span>
            <span className="text-[#00D9FF] font-semibold">HNSW Active</span>
          </div>
        </div>
      )}
    </aside>
  );
}
