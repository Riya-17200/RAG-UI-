import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Send,
  Sparkles,
  Key,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function ApiIntegration() {
  const [selectedLang, setSelectedLang] = useState('python');
  const [copiedCode, setCopiedCode] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const snippets = {
    python: `import requests

client_endpoint = "https://api.rag-titan.ai/v1/query/adaptive"
headers = {
    "Authorization": "Bearer titan_live_98a72b14c3e89f",
    "Content-Type": "application/json"
}

payload = {
    "query": "Compare remote work stipend with healthcare subsidy and explain approval thresholds",
    "router_mode": "autonomous_adaptive",
    "confidence_threshold": 0.70,
    "top_k": 4,
    "stream": True
}

response = requests.post(client_endpoint, json=payload, headers=headers)
result = response.json()

print(f"Strategy Selected: {result['strategy_used']}")
print(f"Confidence: {result['confidence']}")
print(f"Answer: {result['answer']}")
print(f"Citations: {result['citations']}")`,

    curl: `curl -X POST "https://api.rag-titan.ai/v1/query/adaptive" \\
  -H "Authorization: Bearer titan_live_98a72b14c3e89f" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What is our policy for paid annual vacation leave days?",
    "router_mode": "autonomous_adaptive",
    "confidence_threshold": 0.70,
    "top_k": 4
  }'`,

    typescript: `import { RagTitanClient } from '@rag-titan/sdk';

const titan = new RagTitanClient({
  apiKey: process.env.RAG_TITAN_API_KEY
});

const execution = await titan.adaptiveQuery({
  query: "How do I handle the timeout error in the system?",
  routerMode: "autonomous_adaptive",
  confidenceThreshold: 0.70,
  topK: 4
});

console.log("Selected Route:", execution.strategyUsed);
console.log("Answer:", execution.answer);
console.log("Telemetry Trace:", execution.trace);`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[selectedLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF2FF]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-bold">
              Developer SDK & REST Endpoints
            </span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Adaptive RAG Core API v2.4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAF2FF] tracking-tight">
            API & Integration
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Integrate RAG-TITAN's dynamic routing engine directly into your enterprise production microservices with Python, TypeScript, and cURL interfaces.
          </p>
        </div>
      </div>

      {/* API Key Capsule */}
      <div className="p-4 rounded-xl bg-[#111A2E] border border-[#EAF2FF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-[#00D9FF]" />
          <span className="text-[#94A3B8]">Active Secret Key:</span>
          <span className="text-[#EAF2FF] font-bold">
            {apiKeyVisible ? 'titan_live_98a72b14c3e89f928a' : 'titan_live_••••••••••••••••••••'}
          </span>
        </div>
        <button
          onClick={() => setApiKeyVisible(!apiKeyVisible)}
          className="text-[11px] text-[#00D9FF] hover:underline"
        >
          {apiKeyVisible ? 'Hide Key' : 'Reveal Key'}
        </button>
      </div>

      {/* Code Snippets Viewer */}
      <div className="bg-[#111A2E] border border-[#EAF2FF]/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAF2FF]/10 pb-3">
          <div className="flex items-center gap-2">
            {['python', 'typescript', 'curl'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  selectedLang === lang
                    ? 'bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40'
                    : 'bg-[#17233A] text-[#94A3B8] hover:text-[#EAF2FF]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17233A] hover:bg-[#1f2f4e] text-xs font-mono text-[#EAF2FF] transition-all"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-[#35D6A0]" /> : <Copy className="w-3.5 h-3.5 text-[#00D9FF]" />}
            <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="bg-[#080D1A] rounded-xl p-4 border border-[#EAF2FF]/10 font-mono text-xs text-[#EAF2FF] overflow-x-auto leading-relaxed">
          <pre>{snippets[selectedLang]}</pre>
        </div>
      </div>
    </div>
  );
}
