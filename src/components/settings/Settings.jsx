import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Database,
  Lock,
  Moon
} from 'lucide-react';

export default function Settings() {
  const [telemetryEnabled, setTelemetryEnabled] = useState(true);
  const [cragAutoFallback, setCragAutoFallback] = useState(true);
  const [cacheTtlHours, setCacheTtlHours] = useState(72);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              System Configuration
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Cluster Defaults & Guardrail Policies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Settings & Governance
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Configure default confidence gates, Redis semantic cache invalidation timers, PII sanitization policies, and Midnight Intelligence UI theme parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#386BFF] text-[#080D1A] font-bold text-xs uppercase tracking-wider font-mono hover:shadow-[0_0_20px_-2px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-[#080D1A]" /> : <Sliders className="w-4 h-4 text-[#080D1A]" />}
          <span>{saved ? 'Settings Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-5">
        {/* Guardrail Defaults */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider">
            Autonomous Guardrails & Fallbacks
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-[#EAF2FF]/10">
            <div>
              <span className="text-xs font-bold text-[#EAF2FF] block">
                Automatic CRAG Fallback on Low Confidence
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                Triggers query rewriting and safety guardrails if retrieval score &lt; 0.70.
              </span>
            </div>
            <input
              type="checkbox"
              checked={cragAutoFallback}
              onChange={(e) => setCragAutoFallback(e.target.checked)}
              className="w-4 h-4 accent-[#00D9FF] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-xs font-bold text-[#EAF2FF] block">
                Fine-Grained Span Telemetry
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                Record flamegraphs for all micro-operations including intent classification and vector distance.
              </span>
            </div>
            <input
              type="checkbox"
              checked={telemetryEnabled}
              onChange={(e) => setTelemetryEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#00D9FF] cursor-pointer"
            />
          </div>
        </div>

        {/* Semantic Cache */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#9666FF] font-bold tracking-wider">
            Semantic Cache & Invalidation Policies
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#EAF2FF] block">
                Redis Query Cache TTL (Hours)
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                Questions with embedding cosine similarity &ge; 0.98 return cached responses within this TTL.
              </span>
            </div>
            <input
              type="number"
              value={cacheTtlHours}
              onChange={(e) => setCacheTtlHours(parseInt(e.target.value) || 24)}
              className="w-20 bg-[#080D1A] border border-[#EAF2FF]/15 rounded-lg px-2.5 py-1 text-xs font-mono text-[#EAF2FF] focus:outline-none focus:border-[#9666FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
