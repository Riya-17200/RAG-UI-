// RAG-TITAN Adaptive RAG Execution Engine
// Implements intelligent decision-making, dynamic routing, confidence assessment & fallback

import { PRESET_SCENARIOS, STRATEGY_DEFINITIONS, MOCK_DOCUMENTS } from '../data/mockData';

export class AdaptiveRagEngine {
  constructor() {
    this.documents = MOCK_DOCUMENTS;
    this.strategies = STRATEGY_DEFINITIONS;
  }

  // Get all indexed chunks flattened
  getAllChunks() {
    const chunks = [];
    this.documents.forEach(doc => {
      if (doc.chunks && Array.isArray(doc.chunks)) {
        doc.chunks.forEach(c => {
          chunks.push({
            ...c,
            docName: doc.name,
            docType: doc.type,
            docSize: doc.size
          });
        });
      }
    });
    return chunks;
  }

  // Analyze query traits
  analyzeQuery(queryText) {
    const text = queryText.trim().toLowerCase();
    const words = text.split(/\W+/).filter(w => w.length > 0);

    // Check conversational / greeting
    if (words.length <= 3 && (text.includes('hello') || text.includes('hi') || text.includes('who are you') || text.includes('help'))) {
      return {
        intent: 'Conversational / System Inquiry',
        intentConfidence: 0.99,
        complexity: 1.2,
        ambiguity: 0.05,
        entities: [{ text: 'system capabilities', type: 'META', salience: 0.9 }],
        domain: 'Conversational Interface',
        decomposed: false,
        recommendedStrategy: 'direct_bypass',
        reason: 'Zero factual entities or internal documentation scope required. Bypassing retrieval to minimize latency and compute.'
      };
    }

    // Check low-confidence / futuristic / OOD
    if (text.includes('quantum') || text.includes('2029') || text.includes('2030') || text.includes('blockchain') || text.includes('mars')) {
      return {
        intent: 'Out-of-Distribution / Future Entity Query',
        intentConfidence: 0.52,
        complexity: 6.8,
        ambiguity: 0.35,
        entities: [
          { text: 'Q3 2029 / Quantum Specs', type: 'UNINDEXED_TEMPORAL', salience: 0.98 },
          { text: 'encryption key rotation', type: 'CRYPTOGRAPHY_TECH', salience: 0.92 }
        ],
        domain: 'Cryptographic Security & Futuristic Standards',
        decomposed: false,
        recommendedStrategy: 'corrective_crag',
        reason: 'Entities appear out-of-distribution or beyond indexed corporate timeline. Evidence Checker will verify grounding and trigger CRAG fallback if confidence < 0.70.'
      };
    }

    // Check ambiguous
    if ((text.includes('timeout') || text.includes('error') || text.includes('fail') || text.includes('crash')) &&
        !text.includes('redis') && !text.includes('vector') && !text.includes('api') && words.length < 10) {
      return {
        intent: 'System Error Troubleshooting (Underspecified)',
        intentConfidence: 0.72,
        complexity: 4.8,
        ambiguity: 0.82,
        entities: [
          { text: 'timeout error', type: 'ERROR_TYPE', salience: 0.95 },
          { text: 'system', type: 'UNSCOPED_TARGET', salience: 0.60 }
        ],
        domain: 'Multi-Tier Infrastructure',
        decomposed: false,
        recommendedStrategy: 'disambiguation_refine',
        reason: 'High ambiguity entropy (0.82). Query mentions generic failure without architectural layer context (Vector DB, Redis Cache, or API Gateway). Disambiguation required.'
      };
    }

    // Check complex multi-part
    if (words.length > 9 || text.includes('compare') || text.includes('and') || text.includes('versus') || (text.includes('stipend') && text.includes('subsidy'))) {
      return {
        intent: 'Comparative Multi-Policy Synthesis',
        intentConfidence: 0.94,
        complexity: 8.2,
        ambiguity: 0.16,
        entities: [
          { text: 'equipment stipend', type: 'BENEFIT_ALLOWANCE', salience: 0.92 },
          { text: 'healthcare subsidy', type: 'BENEFIT_HEALTH', salience: 0.89 },
          { text: 'approval thresholds', type: 'GOVERNANCE_MATRIX', salience: 0.86 }
        ],
        domain: 'HR Benefits & Finance Governance',
        decomposed: true,
        subQueries: [
          { id: 'sub_1', text: 'What is the equipment stipend policy amount and eligibility?', domain: 'Equipment' },
          { id: 'sub_2', text: 'What is the health and wellness subsidy limit?', domain: 'Healthcare' },
          { id: 'sub_3', text: 'What are the managerial approval levels for expenses?', domain: 'Finance' }
        ],
        recommendedStrategy: 'multihop_decomposition',
        reason: 'Multi-faceted query spans distinct policy documents. Query decomposition and parallel retrieval are required to prevent incomplete retrieval.'
      };
    }

    // Default: Lightweight atomic factual
    return {
      intent: 'Atomic Factual Policy Lookup',
      intentConfidence: 0.96,
      complexity: 2.4,
      ambiguity: 0.10,
      entities: [
        { text: words.slice(0, 3).join(' '), type: 'TOPIC_KEYWORD', salience: 0.88 }
      ],
      domain: 'Enterprise Knowledge Base',
      decomposed: false,
      recommendedStrategy: 'lightweight_dense',
      reason: 'Low complexity (2.4/10) with targeted entity focus. Single-pass vector search with cross-reranking delivers optimal precision at sub-120ms latency.'
    };
  }

  // Execute retrieval and scoring simulation
  executeRetrieval(queryText, strategyId, options = {}) {
    const topK = options.topK || 4;
    const threshold = options.confidenceThreshold !== undefined ? options.confidenceThreshold : 0.70;
    const textLower = queryText.toLowerCase();

    // Check if matching preset scenario for pixel-perfect demonstration
    if (textLower.includes('vacation') || textLower.includes('annual') || textLower.includes('leave')) {
      return this.formatExecutionResult(PRESET_SCENARIOS.scenarioA, strategyId, threshold);
    }
    if (textLower.includes('compare') || (textLower.includes('stipend') && textLower.includes('subsidy'))) {
      return this.formatExecutionResult(PRESET_SCENARIOS.scenarioB, strategyId, threshold);
    }
    if (textLower.includes('timeout') || textLower.includes('error')) {
      return this.formatExecutionResult(PRESET_SCENARIOS.scenarioC, strategyId, threshold);
    }
    if (textLower.includes('quantum') || textLower.includes('2029') || textLower.includes('unindexed')) {
      return this.formatExecutionResult(PRESET_SCENARIOS.scenarioD, strategyId, threshold);
    }

    // Dynamic fallback execution for custom arbitrary queries
    const analysis = this.analyzeQuery(queryText);
    const chosenStrategy = strategyId || analysis.recommendedStrategy;
    const allChunks = this.getAllChunks();

    // Search and score chunks
    const queryWords = textLower.split(/\W+/).filter(w => w.length > 2);
    const scoredChunks = allChunks.map(chunk => {
      const chunkText = chunk.text.toLowerCase();
      let matches = 0;
      queryWords.forEach(w => {
        if (chunkText.includes(w)) matches++;
      });
      const lexicalScore = queryWords.length > 0 ? matches / queryWords.length : 0.2;
      const denseBase = 0.52 + lexicalScore * 0.42;
      const score = Math.min(0.96, Math.max(0.38, parseFloat(denseBase.toFixed(3))));
      return {
        ...chunk,
        score,
        denseScore: score,
        rerankScore: parseFloat((score * 1.02).toFixed(3)),
        relevance: score >= 0.80 ? 'HIGH' : score >= 0.65 ? 'PARTIAL' : 'LOW'
      };
    }).sort((a, b) => b.score - a.score).slice(0, topK);

    const bestScore = scoredChunks.length > 0 ? scoredChunks[0].score : 0.45;
    const isConfidencePassed = bestScore >= threshold;

    let finalAnswer = '';
    let citations = [];

    if (chosenStrategy === 'direct_bypass') {
      finalAnswer = `Hello! I am **RAG-TITAN**, an enterprise-grade Adaptive RAG Intelligence Engine. I dynamically route incoming queries across single-pass dense retrieval, multi-hop decomposition, disambiguation refiners, and self-corrective fallback pipelines.`;
    } else if (!isConfidencePassed) {
      finalAnswer = `⚠️ **Low-Confidence Retrieval Notice (Score: ${bestScore} < ${threshold})**\n\nThe Adaptive Evidence Evaluator determined that available document chunks do not satisfy grounding requirements for: "${queryText}". A query rewrite loop was executed to avoid hallucination.`;
      if (scoredChunks.length > 0) {
        citations.push({
          chunkId: scoredChunks[0].id,
          doc: scoredChunks[0].docName,
          page: scoredChunks[0].page || 1,
          section: (scoredChunks[0].section && scoredChunks[0].section[0]) || 'General'
        });
      }
    } else {
      const topChunk = scoredChunks[0];
      finalAnswer = `Based on verified enterprise documentation from **${topChunk.docName}**, ${topChunk.text.slice(0, 180)}... [${topChunk.id}]. This answer was synthesized with high grounding verification.`;
      citations.push({
        chunkId: topChunk.id,
        doc: topChunk.docName,
        page: topChunk.page || 1,
        section: (topChunk.section && topChunk.section[0]) || 'Overview'
      });
    }

    return {
      query: queryText,
      analysis,
      strategyUsed: this.strategies.find(s => s.id === chosenStrategy)?.name || 'Adaptive Dynamic Route',
      strategyKey: chosenStrategy,
      confidence: bestScore,
      isConfidencePassed,
      retrievedChunks: scoredChunks,
      finalResponse: {
        answer: finalAnswer,
        citations,
        confidence: bestScore,
        latencyMs: chosenStrategy === 'direct_bypass' ? 38 : chosenStrategy === 'multihop_decomposition' ? 320 : 135,
        totalTokens: 180,
        strategyUsed: this.strategies.find(s => s.id === chosenStrategy)?.name || 'Adaptive Dynamic Route'
      },
      pipelineTrace: [
        { step: 'Query Input', status: 'completed', timeMs: 2, detail: `Received ${queryText.length}-char query` },
        { step: 'Query Classification', status: 'completed', timeMs: 12, detail: `Classified as ${analysis.intent}` },
        { step: 'Complexity Analysis', status: 'completed', timeMs: 8, detail: `Complexity: ${analysis.complexity}/10; Ambiguity: ${analysis.ambiguity}` },
        { step: 'Adaptive Strategy Selection', status: 'completed', timeMs: 6, detail: `Routed to ${chosenStrategy}` },
        { step: 'Retrieval Execution', status: 'completed', timeMs: 42, detail: `Retrieved ${scoredChunks.length} candidate chunks` },
        { step: 'Cross-Reranking', status: 'completed', timeMs: 18, detail: `Re-ranked top candidates` },
        { step: 'Confidence Assessment', status: isConfidencePassed ? 'completed' : 'warning', timeMs: 14, detail: `Confidence ${bestScore} ${isConfidencePassed ? '>= threshold' : '< threshold (Triggered Guardrail)'}` },
        { step: 'Grounded Generation', status: 'completed', timeMs: 68, detail: `Generated grounded response with citations` }
      ]
    };
  }

  formatExecutionResult(scenario, strategyOverride, threshold) {
    const strat = strategyOverride || scenario.classification.selectedStrategy;
    const isPassed = scenario.finalResponse.confidence >= threshold;
    return {
      query: scenario.query,
      analysis: scenario.classification,
      strategyUsed: this.strategies.find(s => s.id === strat)?.name || scenario.finalResponse.strategyUsed,
      strategyKey: strat,
      confidence: scenario.finalResponse.confidence,
      isConfidencePassed: isPassed,
      retrievedChunks: scenario.retrievedChunks,
      finalResponse: scenario.finalResponse,
      pipelineTrace: scenario.pipelineTrace
    };
  }
}

export const ragEngine = new AdaptiveRagEngine();
