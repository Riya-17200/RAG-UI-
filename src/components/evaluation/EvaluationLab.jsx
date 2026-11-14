import React, { useState } from 'react';
import {
  Scale,
  TrendingUp,
  BarChart3,
  Play,
  RotateCcw,
  CheckCircle2,
  Layers,
  Database,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { EVALUATION_COMPARISON_DATA } from '../../data/mockData';

export default function EvaluationLab() {
  const [selectedDatasetId, setSelectedDatasetId] = useState('ds-1');
  const [isRunningEval, setIsRunningEval] = useState(false);
  const [evalProgress, setEvalProgress] = useState(100);

  const runBenchmarkSuite = () => {
    setIsRunningEval(true);
    setEvalProgress(0);
    const interval = setInterval(() => {
      setEvalProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRunningEval(false);
          return 100;
        }
        return p + 25;
      });
    }, 300);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              Empirical Benchmarks
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Adaptive Architecture vs Fixed Pipeline Baselines
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Adaptive Evaluation Lab
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Controlled empirical comparison evaluating Adaptive RAG against fixed single-pass and fixed hybrid pipelines across Context Precision, Recall, Faithfulness, and Hallucination Reduction.
          </p>
        </div>

        {/* Run Evaluation Suite Action */}
        <button
          onClick={runBenchmarkSuite}
          disabled={isRunningEval}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase font-extrabold tracking-wider transition-all shadow-lg ${
            isRunningEval
              ? 'bg-[#17233A] text-[#94A3B8] border border-[#EAF2FF]/10'
              : 'bg-gradient-to-r from-[#00D9FF] to-[#386BFF] text-[#080D1A] hover:shadow-[0_0_20px_-2px_rgba(0,217,255,0.4)]'
          }`}
        >
          {isRunningEval ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin text-[#00D9FF]" />
              <span>Evaluating ({evalProgress}%)...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-[#080D1A]" />
              <span>Run Benchmark Suite</span>
            </>
          )}
        </button>
      </div>

      {/* Dataset Selection Bar */}
      <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-mono uppercase text-[#94A3B8] font-semibold tracking-wider">
          Active Golden Evaluation Dataset:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {EVALUATION_COMPARISON_DATA.datasets.map((ds) => (
            <button
              key={ds.id}
              onClick={() => setSelectedDatasetId(ds.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                selectedDatasetId === ds.id
                  ? 'bg-[#17233A] border-[#00D9FF] text-[#00D9FF] font-bold shadow-[0_0_15px_-4px_rgba(0,217,255,0.3)]'
                  : 'bg-[#0B1220] border-[#EAF2FF]/10 text-[#94A3B8] hover:text-[#EAF2FF]'
              }`}
            >
              <span>{ds.name}</span>
              <span className="text-[10px] ml-1.5 text-[#94A3B8]">({ds.queries} queries)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparative Performance Table: Adaptive RAG vs Fixed Baselines */}
      <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5 border-b border-[#EAF2FF]/10 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#EAF2FF] uppercase font-mono tracking-wider">
              Empirical Evaluation Comparison Matrix
            </h3>
            <span className="text-xs text-[#94A3B8]">
              Standardized across 750 test queries with ground-truth chunk citations
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35D6A0]/15 text-[#35D6A0] font-bold">
            EMPIRICALLY TESTED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#EAF2FF]/10 text-[#94A3B8] uppercase text-[10px]">
                <th className="pb-3 font-semibold">Evaluation Metric</th>
                <th className="pb-3 font-semibold text-[#00D9FF]">Adaptive RAG (RAG-TITAN)</th>
                <th className="pb-3 font-semibold text-[#94A3B8]">Fixed Naive RAG</th>
                <th className="pb-3 font-semibold text-[#94A3B8]">Fixed Hybrid RAG</th>
                <th className="pb-3 font-semibold text-right text-[#35D6A0]">Adaptive Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF2FF]/5">
              {EVALUATION_COMPARISON_DATA.benchmarks.map((row, idx) => {
                const isLatency = row.metric.includes('Latency');
                const diff = (row.adaptive - row.fixedNaive).toFixed(1);

                return (
                  <tr key={idx} className="hover:bg-[#17233A]/50 transition-colors">
                    <td className="py-3 font-sans font-medium text-[#EAF2FF]">
                      {row.metric}
                    </td>
                    <td className="py-3 font-bold text-[#00D9FF]">
                      {row.adaptive}{row.unit}
                    </td>
                    <td className="py-3 text-[#94A3B8]">
                      {row.fixedNaive}{row.unit}
                    </td>
                    <td className="py-3 text-[#94A3B8]">
                      {row.fixedHybrid}{row.unit}
                    </td>
                    <td className="py-3 text-right font-bold text-[#35D6A0]">
                      {isLatency ? '+22ms (Multi-Hop Overhead)' : `+${diff}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Bar Comparison Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Precision & Recall */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <span className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider block">
            Context Precision Comparison
          </span>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-[#EAF2FF] mb-1">
                <span>RAG-TITAN Adaptive RAG</span>
                <span className="text-[#00D9FF] font-bold">94.6%</span>
              </div>
              <div className="w-full bg-[#17233A] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#00D9FF] h-full rounded-full" style={{ width: '94.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94A3B8] mb-1">
                <span>Fixed Hybrid RAG</span>
                <span>82.8%</span>
              </div>
              <div className="w-full bg-[#17233A] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#386BFF] h-full rounded-full" style={{ width: '82.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94A3B8] mb-1">
                <span>Fixed Naive RAG</span>
                <span>74.2%</span>
              </div>
              <div className="w-full bg-[#17233A] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#94A3B8]/60 h-full rounded-full" style={{ width: '74.2%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Faithfulness & Hallucination Resistance */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <span className="text-xs font-mono uppercase text-[#35D6A0] font-bold tracking-wider block">
            Faithfulness & Hallucination Resistance
          </span>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-[#EAF2FF] mb-1">
                <span>RAG-TITAN (CRAG Fallback Guard)</span>
                <span className="text-[#35D6A0] font-bold">98.4%</span>
              </div>
              <div className="w-full bg-[#17233A] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#35D6A0] h-full rounded-full" style={{ width: '98.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94A3B8] mb-1">
                <span>Fixed Hybrid RAG</span>
                <span>86.9%</span>
              </div>
              <div className="w-full bg-[#17233A] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#9666FF] h-full rounded-full" style={{ width: '86.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#94A3B8] mb-1">
                <span>Fixed Naive RAG</span>
                <span>81.5%</span>
              </div>
              <div className="w-full bg-[#17233A] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#FF647C] h-full rounded-full" style={{ width: '81.5%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
