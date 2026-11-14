import React, { useState } from 'react';
import {
  Search,
  Activity,
  Bell,
  ChevronDown,
  Sparkles,
  Command,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Terminal,
  Zap
} from 'lucide-react';

export default function Header({
  activeView,
  onNavigate,
  onOpenCommandPalette
}) {
  const [workspace, setWorkspace] = useState('Production Core [rag-titan-prod-01]');
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const workspaces = [
    { id: 'prod', name: 'Production Core [rag-titan-prod-01]', env: 'PROD', qps: '1,420 QPS' },
    { id: 'eval', name: 'Staging Lab [rag-titan-eval-02]', env: 'STAGE', qps: '480 QPS' },
    { id: 'exp', name: 'Research Sandbox [rag-titan-exp-03]', env: 'DEV', qps: '85 QPS' }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Strategy Auto-Routing Activated',
      desc: 'Query #tr-9842b routed to Multi-Hop Decomposition (Confidence: 0.912).',
      time: '3m ago',
      type: 'info',
      icon: Zap,
      color: 'text-[#00D9FF]'
    },
    {
      id: 2,
      title: 'Corrective CRAG Fallback Triggered',
      desc: 'Evidence score 0.41 < 0.70 threshold. Query Rewriter activated.',
      time: '18m ago',
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-[#FFB454]'
    },
    {
      id: 3,
      title: 'Benchmark Run Complete',
      desc: 'Adaptive RAG achieved +18.4% Context Recall over Fixed Naive Baseline.',
      time: '42m ago',
      type: 'success',
      icon: CheckCircle2,
      color: 'text-[#35D6A0]'
    }
  ];

  return (
    <header className="h-16 bg-[#0B1220] border-b border-[#EAF2FF]/10 px-5 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Workspace & Breadcrumb */}
      <div className="flex items-center gap-4">
        {/* Workspace selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#111A2E] hover:bg-[#17233A] border border-[#EAF2FF]/10 text-xs font-mono transition-all text-[#EAF2FF]"
          >
            <div className="w-2 h-2 rounded-full bg-[#35D6A0] animate-pulse" />
            <span className="font-semibold text-xs text-[#EAF2FF] max-w-[210px] truncate">{workspace}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>

          {showWorkspaceMenu && (
            <div className="absolute left-0 mt-2 w-72 bg-[#111A2E] border border-[#EAF2FF]/15 rounded-xl shadow-2xl p-1.5 z-50">
              <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-[#94A3B8] tracking-wider border-b border-[#EAF2FF]/10 mb-1">
                Active Cluster Instances
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setWorkspace(ws.name);
                    setShowWorkspaceMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                    workspace === ws.name
                      ? 'bg-[#00D9FF]/15 text-[#00D9FF] font-semibold border border-[#00D9FF]/30'
                      : 'text-[#EAF2FF] hover:bg-[#17233A]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="truncate">{ws.name}</span>
                    <span className="text-[10px] text-[#94A3B8]">{ws.qps}</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    ws.env === 'PROD' ? 'bg-[#35D6A0]/20 text-[#35D6A0]' : 'bg-[#9666FF]/20 text-[#9666FF]'
                  }`}>
                    {ws.env}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-px bg-[#EAF2FF]/10" />

        {/* Global Search / Command Bar */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#111A2E]/80 hover:bg-[#111A2E] border border-[#EAF2FF]/10 hover:border-[#00D9FF]/40 text-xs text-[#94A3B8] transition-all group w-64 md:w-80"
        >
          <Search className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00D9FF] transition-colors" />
          <span className="truncate">Search queries, strategies, chunks...</span>
          <div className="ml-auto flex items-center gap-1 font-mono text-[10px] bg-[#17233A] px-1.5 py-0.5 rounded border border-[#EAF2FF]/10 text-[#94A3B8]">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Engine Status, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Engine Status Capsule */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#111A2E] border border-[#00D9FF]/20 shadow-[0_0_15px_-4px_rgba(0,217,255,0.2)]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-[#00D9FF]">ADAPTIVE ENGINE</span>
          </div>
          <div className="h-3 w-px bg-[#EAF2FF]/15" />
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#EAF2FF]">
            <Activity className="w-3 h-3 text-[#35D6A0]" />
            <span>142ms</span>
          </div>
          <div className="h-3 w-px bg-[#EAF2FF]/15" />
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#9666FF]/20 text-[#9666FF] border border-[#9666FF]/30 font-medium">
            DYNAMIC AUTO-ROUTE
          </span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-[#111A2E] hover:bg-[#17233A] border border-[#EAF2FF]/10 text-[#94A3B8] hover:text-[#EAF2FF] transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D9FF] ring-2 ring-[#0B1220]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-84 bg-[#111A2E] border border-[#EAF2FF]/15 rounded-xl shadow-2xl p-2 z-50">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#EAF2FF]/10 mb-1">
                <span className="text-xs font-semibold text-[#EAF2FF]">System Telemetry & Alerts</span>
                <span className="text-[10px] font-mono bg-[#00D9FF]/20 text-[#00D9FF] px-2 py-0.5 rounded-full font-bold">
                  3 NEW
                </span>
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => {
                  const NIcon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-lg bg-[#17233A]/60 hover:bg-[#17233A] border border-[#EAF2FF]/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1 rounded-md bg-[#111A2E] ${n.color}`}>
                          <NIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#EAF2FF] truncate">{n.title}</span>
                            <span className="text-[10px] font-mono text-[#94A3B8]">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-snug">{n.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-2 mt-1 border-t border-[#EAF2FF]/10 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('traces');
                  }}
                  className="text-[11px] font-mono text-[#00D9FF] hover:underline"
                >
                  View Full Execution Traces →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Capsule */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg bg-[#111A2E] hover:bg-[#17233A] border border-[#EAF2FF]/10 transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-[#386BFF] to-[#9666FF] flex items-center justify-center text-xs font-bold font-mono text-white shadow-sm">
              EV
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#EAF2FF] leading-tight">Dr. Elena Vance</span>
              <span className="text-[10px] font-mono text-[#00D9FF] leading-none">Lead Retrieval Scientist</span>
            </div>
            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#111A2E] border border-[#EAF2FF]/15 rounded-xl shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-[#EAF2FF]/10 mb-1">
                <p className="text-xs font-semibold text-[#EAF2FF]">Dr. Elena Vance</p>
                <p className="text-[10px] text-[#94A3B8] font-mono">elena.vance@rag-titan.ai</p>
                <span className="inline-block mt-1 text-[9px] font-mono bg-[#9666FF]/20 text-[#9666FF] px-2 py-0.5 rounded border border-[#9666FF]/30 font-bold">
                  ORG ADMIN • RESEARCH TIER
                </span>
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => { setShowProfileMenu(false); onNavigate('models'); }}
                  className="w-full text-left px-3 py-2 text-xs text-[#EAF2FF] hover:bg-[#17233A] rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>Model Routing Config</span>
                </button>
                <button
                  onClick={() => { setShowProfileMenu(false); onNavigate('api'); }}
                  className="w-full text-left px-3 py-2 text-xs text-[#EAF2FF] hover:bg-[#17233A] rounded-lg transition-colors flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#9666FF]" />
                  <span>Developer API Keys</span>
                </button>
                <button
                  onClick={() => { setShowProfileMenu(false); onNavigate('settings'); }}
                  className="w-full text-left px-3 py-2 text-xs text-[#EAF2FF] hover:bg-[#17233A] rounded-lg transition-colors flex items-center gap-2 border-t border-[#EAF2FF]/5 mt-1 pt-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>System Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
