import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sliders,
  ChevronRight,
  Brain,
  Workflow,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Split,
  HelpCircle,
  Hash,
  Eye,
  Copy,
  Check,
  ExternalLink,
  Code
} from 'lucide-react';
import GaugeChart from '../common/GaugeChart';
import { PRESET_SCENARIOS, STRATEGY_DEFINITIONS } from '../../data/mockData';
import { ragEngine } from '../../services/adaptiveEngine';

export default function AdaptivePlayground({ initialScenario = 'scenarioA' }) {
  const [currentScenarioKey, setCurrentScenarioKey] = useState(initialScenario);
  const [queryInput, setQueryInput] = useState(PRESET_SCENARIOS[initialScenario]?.query || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(7); // 0 to 7
  const [executionResult, setExecutionResult] = useState(null);
  const [selectedChunkId, setSelectedChunkId] = useState(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  // Configuration options
  const [strategyOverride, setStrategyOverride] = useState('auto');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.70);
  const [topK, setTopK] = useState(4);
  const [executionMode, setExecutionMode] = useState('animated'); // 'animated' | 'instant'
  const [showConfig, setShowConfig] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  // Load preset scenario
  const handleSelectScenario = (key) => {
    setCurrentScenarioKey(key);
    const scenario = PRESET_SCENARIOS[key];
    if (scenario) {
      setQueryInput(scenario.query);
      runQueryExecution(scenario.query, strategyOverride === 'auto' ? null : strategyOverride, key);
    }
  };

  // Run query execution
  const runQueryExecution = (queryText, stratOverride, scenarioKey) => {
    setIsProcessing(true);
    setSelectedChunkId(null);

    if (executionMode === 'instant') {
      const res = ragEngine.executeRetrieval(queryText, stratOverride, {
        topK,
        confidenceThreshold
      });
      setExecutionResult(res);
      setActiveStepIndex(7);
      setIsProcessing(false);
      return;
    }

    // Animated stepper mode
    setActiveStepIndex(0);
    const stepDelays = [180, 220, 240, 260, 300, 250, 280, 200];
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < 8) {
        setActiveStepIndex(currentStep);
      } else {
        clearInterval(interval);
        const res = ragEngine.executeRetrieval(queryText, stratOverride, {
          topK,
          confidenceThreshold
        });
        setExecutionResult(res);
        setIsProcessing(false);
      }
    }, 220);
  };

  // Initialize on mount
  useEffect(() => {
    if (initialScenario && PRESET_SCENARIOS[initialScenario]) {
      handleSelectScenario(initialScenario);
    }
  }, [initialScenario]);

  // Handle manual submit
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!queryInput.trim() || isProcessing) return;
    runQueryExecution(queryInput, strategyOverride === 'auto' ? null : strategyOverride);
  };

  // Copy answer to clipboard
  const handleCopyAnswer = () => {
    if (!executionResult?.finalResponse?.answer) return;
    navigator.clipboard.writeText(executionResult.finalResponse.answer);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  const stepsMeta = [
    { id: 1, title: 'Query Classification', category: 'Intent Detection', icon: Brain, color: '#9666FF' },
    { id: 2, title: 'Complexity Analysis', category: 'Entropy Meter', icon: Sliders, color: '#9666FF' },
    { id: 3, title: 'Intent Identification', category: 'Entity Salience', icon: Hash, color: '#9666FF' },
    { id: 4, title: 'Confidence Estimation', category: 'Predictive Gate', icon: ShieldCheck, color: '#00D9FF' },
    { id: 5, title: 'Strategy Selection', category: 'Dynamic Router', icon: Workflow, color: '#00D9FF' },
    { id: 6, title: 'Retrieval Execution', category: 'Vector Search', icon: Search, color: '#386BFF' },
    { id: 7, title: 'Result Evaluation', category: 'Evidence Checker', icon: CheckCircle2, color: '#FFB454' },
    { id: 8, title: 'Strategy Adjustment', category: 'Grounding & Output', icon: Sparkles, color: '#35D6A0' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Header & Scenario Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              Signature Sandbox
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Live Dynamic Routing & Explainability Lab
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Adaptive Playground
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Test custom queries or test scenarios to witness how RAG-TITAN dynamically profiles queries, picks the optimal retrieval path, checks evidence confidence, and applies self-corrective fallbacks.
          </p>
        </div>

        {/* 4 Interactive Example Scenarios */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PRESET_SCENARIOS).map(([key, scn]) => {
            const isSelected = currentScenarioKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectScenario(key)}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#17233A] border-[#00D9FF] text-[#EAF2FF] shadow-[0_0_15px_-3px_rgba(0,217,255,0.4)] font-bold'
                    : 'bg-[#111A2E] border-[#EAF2FF]/10 text-[#94A3B8] hover:text-[#EAF2FF] hover:border-[#EAF2FF]/20'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: scn.color }}
                />
                <span className="font-semibold">{scn.badge}:</span>
                <span className="hidden sm:inline text-[11px] truncate max-w-[130px]">
                  {scn.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Panel Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT PANEL: Query Input (3.5 cols) ================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-4 sm:p-5 shadow-xl relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Query Input Console
              </span>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
                  showConfig
                    ? 'bg-[#00D9FF]/20 border-[#00D9FF]/40 text-[#00D9FF]'
                    : 'bg-[#17233A] border-[#EAF2FF]/10 text-[#94A3B8] hover:text-[#EAF2FF]'
                }`}
                title="Tuning Parameters"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="text-[10px]">Config</span>
              </button>
            </div>

            {/* Query Textarea */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={4}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Enter a complex, ambiguous, or atomic question to test adaptive routing..."
                  className="w-full bg-[#080D1A] border border-[#EAF2FF]/15 rounded-xl p-3 text-xs sm:text-sm text-[#EAF2FF] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all resize-none font-sans"
                />
                <div className="absolute right-2.5 bottom-2.5 text-[10px] font-mono text-[#94A3B8]">
                  {queryInput.length} chars
                </div>
              </div>

              {/* Advanced Query Configuration Drawer */}
              {showConfig && (
                <div className="p-3 bg-[#17233A] border border-[#EAF2FF]/10 rounded-xl space-y-3 text-xs font-mono">
                  <div>
                    <label className="text-[11px] text-[#94A3B8] block mb-1">Strategy Selection Mode</label>
                    <select
                      value={strategyOverride}
                      onChange={(e) => setStrategyOverride(e.target.value)}
                      className="w-full bg-[#0B1220] border border-[#EAF2FF]/15 rounded-lg px-2.5 py-1.5 text-xs text-[#EAF2FF] focus:outline-none focus:border-[#00D9FF]"
                    >
                      <option value="auto">Autonomous Dynamic Route (Recommended)</option>
                      <option value="lightweight_dense">Force: Lightweight Dense</option>
                      <option value="multihop_decomposition">Force: Multi-Hop Decomposition</option>
                      <option value="disambiguation_refine">Force: Disambiguation Refiner</option>
                      <option value="corrective_crag">Force: Corrective RAG (CRAG)</option>
                      <option value="direct_bypass">Force: Direct Bypass</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#94A3B8] mb-1">
                        <span>Confidence Gate:</span>
                        <span className="text-[#00D9FF] font-bold">{confidenceThreshold}</span>
                      </div>
                      <input
                        type="range"
                        min="0.4"
                        max="0.9"
                        step="0.05"
                        value={confidenceThreshold}
                        onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                        className="w-full accent-[#00D9FF] cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-[#94A3B8] mb-1">
                        <span>Top-K Chunks:</span>
                        <span className="text-[#9666FF] font-bold">{topK}</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        step="1"
                        value={topK}
                        onChange={(e) => setTopK(parseInt(e.target.value))}
                        className="w-full accent-[#9666FF] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#EAF2FF]/10 text-[11px]">
                    <span className="text-[#94A3B8]">Execution Mode:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setExecutionMode('animated')}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          executionMode === 'animated'
                            ? 'bg-[#00D9FF]/20 text-[#00D9FF] font-bold border border-[#00D9FF]/40'
                            : 'text-[#94A3B8]'
                        }`}
                      >
                        Step-by-Step
                      </button>
                      <button
                        type="button"
                        onClick={() => setExecutionMode('instant')}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          executionMode === 'instant'
                            ? 'bg-[#00D9FF]/20 text-[#00D9FF] font-bold border border-[#00D9FF]/40'
                            : 'text-[#94A3B8]'
                        }`}
                      >
                        Instant
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Query Action Button */}
              <button
                type="submit"
                disabled={isProcessing || !queryInput.trim()}
                className={`w-full py-3 rounded-xl font-mono text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isProcessing
                    ? 'bg-[#17233A] text-[#94A3B8] cursor-not-allowed border border-[#EAF2FF]/10'
                    : 'bg-gradient-to-r from-[#00D9FF] via-[#386BFF] to-[#9666FF] text-[#080D1A] hover:shadow-[0_0_25px_-3px_rgba(0,217,255,0.5)] transform hover:-translate-y-0.5'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-[#00D9FF]" />
                    <span>Executing Adaptive Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-[#080D1A]" />
                    <span>Process Query with Adaptive RAG</span>
                  </>
                )}
              </button>
            </form>

            {/* Scenario Quick Selector Suggestions */}
            <div className="mt-5 pt-4 border-t border-[#EAF2FF]/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#94A3B8] font-semibold tracking-wider block">
                Suggested Scenario Queries:
              </span>
              <div className="space-y-1.5">
                {Object.entries(PRESET_SCENARIOS).map(([key, scn]) => (
                  <button
                    key={key}
                    onClick={() => handleSelectScenario(key)}
                    className={`w-full text-left p-2 rounded-lg text-[11px] font-mono transition-colors flex items-start gap-2 border ${
                      currentScenarioKey === key
                        ? 'bg-[#17233A] text-[#EAF2FF] border-[#00D9FF]/40'
                        : 'bg-[#0B1220]/70 text-[#94A3B8] hover:text-[#EAF2FF] border-transparent'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: scn.color }}
                    />
                    <div className="flex-1 truncate">
                      <span className="font-bold text-[#EAF2FF] mr-1">{scn.badge}:</span>
                      <span>"{scn.query}"</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CENTER PANEL: Adaptive Intelligence (4.5 cols) ================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#EAF2FF]/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9666FF] animate-pulse" />
                <h3 className="text-xs font-mono uppercase text-[#9666FF] font-bold tracking-wider">
                  Adaptive Intelligence Stages
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8]">
                {isProcessing ? 'Processing live...' : 'Execution complete'}
              </span>
            </div>

            {/* Step-by-Step Adaptive Execution Stepper */}
            <div className="space-y-2.5">
              {stepsMeta.map((step, idx) => {
                const StepIcon = step.icon;
                const isPassed = activeStepIndex >= idx;
                const isCurrent = activeStepIndex === idx && isProcessing;

                return (
                  <div
                    key={step.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_15px_-4px_rgba(0,217,255,0.3)]'
                        : isPassed
                        ? 'bg-[#17233A]/60 border-[#EAF2FF]/10'
                        : 'bg-[#080D1A]/40 border-transparent opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                          style={{
                            backgroundColor: isPassed ? `${step.color}25` : '#17233A',
                            color: isPassed ? step.color : '#94A3B8'
                          }}
                        >
                          {isPassed && !isCurrent ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#EAF2FF] block leading-tight">
                            {step.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#94A3B8]">
                            {step.category}
                          </span>
                        </div>
                      </div>

                      {/* State badge */}
                      {isPassed && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#35D6A0]/10 text-[#35D6A0] border border-[#35D6A0]/20 font-semibold">
                          DONE
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40 font-bold animate-pulse">
                          RUNNING
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why the Engine Picked This Strategy — Technical Explainability Card */}
            {executionResult && (
              <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-br from-[#17233A] to-[#111A2E] border-2 border-[#9666FF]/40 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-[#9666FF]/20 text-[#9666FF]">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-[#9666FF] uppercase tracking-wider">
                    Explainability Engine • WHY THIS ROUTE?
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#0B1220]/80 font-mono text-[11px] text-[#EAF2FF] border border-[#EAF2FF]/5 leading-relaxed">
                    {executionResult.analysis?.strategyReason || executionResult.analysis?.reason}
                  </div>

                  {/* Feature Attribution Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                    <div className="p-1.5 rounded bg-[#111A2E] border border-[#EAF2FF]/5">
                      <span className="text-[#94A3B8] block">Complexity:</span>
                      <span className="text-[#00D9FF] font-bold text-xs">
                        {executionResult.analysis?.complexity || 2.4} / 10
                      </span>
                    </div>
                    <div className="p-1.5 rounded bg-[#111A2E] border border-[#EAF2FF]/5">
                      <span className="text-[#94A3B8] block">Ambiguity Entropy:</span>
                      <span className="text-[#FFB454] font-bold text-xs">
                        {executionResult.analysis?.ambiguity || 0.12}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT PANEL: Execution Results (4 cols) ================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-4 sm:p-5 shadow-xl">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[#EAF2FF]/10 pb-3">
              <span className="text-xs font-mono uppercase text-[#35D6A0] font-bold tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Execution Results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="p-1 rounded text-[#94A3B8] hover:text-[#00D9FF] text-xs font-mono flex items-center gap-1"
                  title="Toggle Raw JSON"
                >
                  <Code className="w-3 h-3" />
                  <span className="text-[10px]">JSON</span>
                </button>
                <button
                  onClick={handleCopyAnswer}
                  className="p-1 rounded text-[#94A3B8] hover:text-[#00D9FF] text-xs font-mono flex items-center gap-1"
                  title="Copy Answer"
                >
                  {copiedAnswer ? <Check className="w-3 h-3 text-[#35D6A0]" /> : <Copy className="w-3 h-3" />}
                  <span className="text-[10px]">{copiedAnswer ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Selected Strategy Pill & Latency */}
            {executionResult && (
              <div className="mb-4 p-3 rounded-xl bg-[#17233A] border border-[#EAF2FF]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Selected Strategy</span>
                  <span className="text-xs font-bold font-mono text-[#00D9FF]">
                    {executionResult.strategyUsed}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#94A3B8] block">Latency</span>
                  <span className="text-xs font-bold font-mono text-[#35D6A0]">
                    {executionResult.finalResponse?.latencyMs || 114}ms
                  </span>
                </div>
              </div>
            )}

            {/* Raw JSON or Formatted View */}
            {showRawJson && executionResult ? (
              <div className="max-h-96 overflow-y-auto bg-[#080D1A] rounded-xl p-3 border border-[#EAF2FF]/10 font-mono text-[10px] text-[#00D9FF]">
                <pre>{JSON.stringify(executionResult, null, 2)}</pre>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Synthesized Final Grounded Answer */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#94A3B8] tracking-wider block mb-1.5 font-semibold">
                    Verified Grounded Answer:
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#EAF2FF]/10 text-xs text-[#EAF2FF] leading-relaxed whitespace-pre-line font-sans shadow-inner">
                    {executionResult?.finalResponse?.answer || (
                      <span className="text-[#94A3B8] italic">
                        Select a scenario or submit a query to view verified grounded synthesis.
                      </span>
                    )}
                  </div>
                </div>

                {/* Retrieved Document Chunks with Clickable Citations */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#94A3B8] tracking-wider font-semibold">
                      Retrieved Evidence Chunks ({executionResult?.retrievedChunks?.length || 0}):
                    </span>
                    <span className="text-[10px] font-mono text-[#00D9FF]">
                      Click to highlight
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {executionResult?.retrievedChunks?.map((chunk) => {
                      const isSelected = selectedChunkId === chunk.id;
                      return (
                        <div
                          key={chunk.id}
                          onClick={() => setSelectedChunkId(isSelected ? null : chunk.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_15px_-4px_rgba(0,217,255,0.4)]'
                              : 'bg-[#17233A]/60 border-[#EAF2FF]/10 hover:border-[#00D9FF]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-mono font-bold text-[#00D9FF] flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              [{chunk.id}]
                            </span>
                            <div className="flex items-center gap-1.5 font-mono text-[10px]">
                              <span className="text-[#35D6A0] font-bold">
                                Score: {(chunk.score * 100).toFixed(1)}%
                              </span>
                              <span className={`px-1.5 py-0.2 rounded font-bold ${
                                chunk.relevance === 'HIGH'
                                  ? 'bg-[#35D6A0]/20 text-[#35D6A0]'
                                  : chunk.relevance === 'PARTIAL'
                                  ? 'bg-[#FFB454]/20 text-[#FFB454]'
                                  : 'bg-[#FF647C]/20 text-[#FF647C]'
                              }`}>
                                {chunk.relevance}
                              </span>
                            </div>
                          </div>

                          <div className="text-[10px] font-mono text-[#94A3B8] mb-1">
                            {chunk.docName} • Page {chunk.page || 1} • {Array.isArray(chunk.section) ? chunk.section.join(' > ') : chunk.section}
                          </div>

                          <p className="text-[11px] text-[#EAF2FF]/90 line-clamp-3 font-sans">
                            "{chunk.text}"
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Confidence & Telemetry Breakdown */}
                {executionResult && (
                  <div className="p-3 bg-[#17233A]/70 rounded-xl border border-[#EAF2FF]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GaugeChart
                        value={executionResult.confidence || 0.94}
                        size={64}
                        strokeWidth={6}
                        accent={executionResult.isConfidencePassed ? 'green' : 'orange'}
                        displayFormat="percent"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#EAF2FF] block">
                          Grounding Confidence
                        </span>
                        <span className="text-[10px] font-mono text-[#94A3B8]">
                          {executionResult.isConfidencePassed ? 'Above 0.70 threshold' : 'Below threshold (Fallback active)'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[10px] text-[#94A3B8]">
                      <div>Tokens: {executionResult.finalResponse?.totalTokens || 184}</div>
                      <div className="text-[#35D6A0]">Verified 100%</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
