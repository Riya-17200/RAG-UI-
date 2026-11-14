import React, { useState } from 'react';
import {
  Cpu,
  Sliders,
  CheckCircle2,
  Database,
  ArrowRight,
  ShieldCheck,
  Zap,
  Server
} from 'lucide-react';

export default function ModelConfig() {
  const [routerModel, setRouterModel] = useState('gemma3:4b');
  const [generatorModel, setGeneratorModel] = useState('llama3.3:70b');
  const [embedder, setEmbedder] = useState('nomic-embed-text');
  const [reranker, setReranker] = useState('bge-reranker-large');
  const [vectorDb, setVectorDb] = useState('hnsw_memory');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9666FF] px-2.5 py-0.5 rounded-full bg-[#9666FF]/10 border border-[#9666FF]/20 font-bold">
              Compute & Routing
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              LLMs, Embedders & Vector Database Backends
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Model Configuration
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Configure the neural backbone powering the Adaptive Decision Engine, embedding projections, lexical rerankers, and final grounded answer synthesis.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#386BFF] text-[#080D1A] font-bold text-xs uppercase tracking-wider font-mono hover:shadow-[0_0_20px_-2px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
        >
          {savedNotice ? <CheckCircle2 className="w-4 h-4 text-[#080D1A]" /> : <Sliders className="w-4 h-4 text-[#080D1A]" />}
          <span>{savedNotice ? 'Configuration Saved!' : 'Save Parameters'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Router & Classifier LLM */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3">
            <span className="text-xs font-mono uppercase text-[#9666FF] font-bold tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Adaptive Router LLM
            </span>
            <span className="text-[10px] font-mono text-[#35D6A0]">Sub-15ms Latency</span>
          </div>
          <div>
            <label className="text-xs text-[#94A3B8] block mb-1 font-mono">Model Instance</label>
            <select
              value={routerModel}
              onChange={(e) => setRouterModel(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#EAF2FF]/15 rounded-xl px-3 py-2 text-xs font-mono text-[#EAF2FF] focus:outline-none focus:border-[#9666FF]"
            >
              <option value="gemma3:4b">gemma3:4b (Fastest, 14ms mean)</option>
              <option value="llama3.2:3b">llama3.2:3b-instruct (Edge optimized)</option>
              <option value="qwen2.5:7b">qwen2.5:7b (High precision intent)</option>
            </select>
          </div>
          <p className="text-[11px] text-[#94A3B8] font-sans">
            Responsible for Stage 02 & 03: fast intent classification, complexity scoring, entity salience extraction, and query decomposition.
          </p>
        </div>

        {/* Generator LLM */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3">
            <span className="text-xs font-mono uppercase text-[#00D9FF] font-bold tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Grounded Generator LLM
            </span>
            <span className="text-[10px] font-mono text-[#00D9FF]">High Faithfulness</span>
          </div>
          <div>
            <label className="text-xs text-[#94A3B8] block mb-1 font-mono">Model Instance</label>
            <select
              value={generatorModel}
              onChange={(e) => setGeneratorModel(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#EAF2FF]/15 rounded-xl px-3 py-2 text-xs font-mono text-[#EAF2FF] focus:outline-none focus:border-[#00D9FF]"
            >
              <option value="llama3.3:70b">llama3.3:70b-instruct (Strictly cited)</option>
              <option value="deepseek-r1:32b">deepseek-r1:32b (Chain-of-thought verification)</option>
              <option value="gpt-4o-mini">gpt-4o-mini (Cloud fallback)</option>
            </select>
          </div>
          <p className="text-[11px] text-[#94A3B8] font-sans">
            Synthesizes grounded final responses strictly constrained to cited chunk brackets [chunk_0].
          </p>
        </div>

        {/* Embedder Model */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3">
            <span className="text-xs font-mono uppercase text-[#386BFF] font-bold tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4" />
              Vector Embedder
            </span>
            <span className="text-[10px] font-mono text-[#386BFF]">768 Dimensions</span>
          </div>
          <div>
            <label className="text-xs text-[#94A3B8] block mb-1 font-mono">Embedding Model</label>
            <select
              value={embedder}
              onChange={(e) => setEmbedder(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#EAF2FF]/15 rounded-xl px-3 py-2 text-xs font-mono text-[#EAF2FF] focus:outline-none focus:border-[#386BFF]"
            >
              <option value="nomic-embed-text">nomic-embed-text-v1.5 (768d, Cosine)</option>
              <option value="bge-large-en">bge-large-en-v1.5 (1024d, High density)</option>
              <option value="text-embedding-3-small">text-embedding-3-small (1536d)</option>
            </select>
          </div>
        </div>

        {/* Cross-Encoder Reranker */}
        <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3">
            <span className="text-xs font-mono uppercase text-[#35D6A0] font-bold tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Cross-Encoder Reranker
            </span>
            <span className="text-[10px] font-mono text-[#35D6A0]">Top-N Pruning</span>
          </div>
          <div>
            <label className="text-xs text-[#94A3B8] block mb-1 font-mono">Reranking Engine</label>
            <select
              value={reranker}
              onChange={(e) => setReranker(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#EAF2FF]/15 rounded-xl px-3 py-2 text-xs font-mono text-[#EAF2FF] focus:outline-none focus:border-[#35D6A0]"
            >
              <option value="bge-reranker-large">bge-reranker-large (Cross-Attention)</option>
              <option value="flashrank">FlashRank (Ultra-fast Rust)</option>
              <option value="keyword_lexical">Keyword BM25 Lexical (Zero-model)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
