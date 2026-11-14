import React, { useState } from 'react';
import {
  Database,
  FileText,
  Search,
  Upload,
  CheckCircle2,
  Clock,
  Layers,
  Eye,
  X,
  FileCode,
  Sparkles
} from 'lucide-react';
import { MOCK_DOCUMENTS } from '../../data/mockData';

export default function KnowledgeSources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(MOCK_DOCUMENTS[0]);
  const [activeChunk, setActiveChunk] = useState(null);

  const filteredDocs = MOCK_DOCUMENTS.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              Corpus Index
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Vectorized Enterprise Knowledge Sources
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            Knowledge Sources
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Inspect indexed enterprise documentation, chunking boundary configurations, and vectorized representations backing the adaptive retrieval engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#17233A] hover:bg-[#1f2f4e] border border-[#EAF2FF]/10 text-xs font-mono text-[#EAF2FF] transition-all">
            <Upload className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>Ingest Document</span>
          </button>
        </div>
      </div>

      {/* Two-Column Document List & Chunk Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Document List (5 cols) */}
        <div className="lg:col-span-5 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search indexed documents..."
              className="w-full bg-[#080D1A] border border-[#EAF2FF]/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#EAF2FF] focus:outline-none focus:border-[#00D9FF] font-mono"
            />
          </div>

          <div className="space-y-2.5">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => { setSelectedDoc(doc); setActiveChunk(null); }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_15px_-4px_rgba(0,217,255,0.4)]'
                      : 'bg-[#17233A]/40 border-[#EAF2FF]/5 hover:border-[#00D9FF]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#EAF2FF] flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-[#00D9FF]" />
                      {doc.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#35D6A0]/15 text-[#35D6A0] font-bold">
                      {doc.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#94A3B8] line-clamp-2 mb-2 font-sans">
                    {doc.summary}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] border-t border-[#EAF2FF]/10 pt-2">
                    <span>{doc.size} • {doc.chunksCount} chunks</span>
                    <span className="text-[#9666FF] font-semibold">{doc.chunker}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chunk Inspector & Document Preview (7 cols) */}
        <div className="lg:col-span-7 bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#EAF2FF] flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#00D9FF]" />
                {selectedDoc.name}
              </h3>
              <span className="text-[10px] font-mono text-[#94A3B8]">
                Loader: {selectedDoc.loader} • Chunker: {selectedDoc.chunker} • Uploaded: {selectedDoc.uploadedAt}
              </span>
            </div>
            <span className="text-[10px] font-mono bg-[#17233A] text-[#00D9FF] px-2.5 py-1 rounded-lg border border-[#EAF2FF]/10">
              {selectedDoc.chunks?.length || 0} Sample Chunks
            </span>
          </div>

          {/* Chunk Cards */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8] tracking-wider font-semibold block">
              Vectorized Chunks in this Document:
            </span>

            {selectedDoc.chunks?.map((chunk) => (
              <div
                key={chunk.id}
                onClick={() => setActiveChunk(chunk)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  activeChunk?.id === chunk.id
                    ? 'bg-[#17233A] border-[#00D9FF] shadow-[0_0_15px_-4px_rgba(0,217,255,0.4)]'
                    : 'bg-[#17233A]/60 border-[#EAF2FF]/10 hover:border-[#00D9FF]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                  <span className="font-bold text-[#00D9FF]">[{chunk.id}]</span>
                  <span className="text-[#94A3B8]">Page {chunk.page} • {chunk.tokens} tokens</span>
                </div>
                <div className="text-[10px] font-mono text-[#9666FF] mb-1">
                  Section: {Array.isArray(chunk.section) ? chunk.section.join(' > ') : chunk.section}
                </div>
                <p className="text-xs text-[#EAF2FF] leading-relaxed font-sans">
                  "{chunk.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
