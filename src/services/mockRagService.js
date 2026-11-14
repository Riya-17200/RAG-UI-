import { MOCK_DOCUMENTS } from '../data/mockData';

// Simulated RAG runtime adhering strictly to RAG-TITAN API contract
export class RagTitanService {
  constructor() {
    this.documents = [...MOCK_DOCUMENTS];
  }

  // Get all indexed chunks flattened
  getAllChunks() {
    const chunks = [];
    this.documents.forEach(doc => {
      if (doc.chunks && Array.isArray(doc.chunks)) {
        doc.chunks.forEach(c => {
          chunks.push({
            ...c,
            sourceDoc: doc.name,
            docType: doc.type
          });
        });
      }
    });
    return chunks;
  }

  // Search chunks by keyword or semantic similarity simulation
  searchChunks(query, topK = 5, minScore = 0.5) {
    const allChunks = this.getAllChunks();
    const queryLower = query.toLowerCase().trim();
    const queryWords = queryLower.split(/\W+/).filter(w => w.length > 2);

    const scored = allChunks.map(chunk => {
      const textLower = chunk.text.toLowerCase();
      let matchCount = 0;
      queryWords.forEach(word => {
        if (textLower.includes(word)) matchCount++;
      });

      // Semantic base similarity + keyword overlap
      const lexicalScore = queryWords.length > 0 ? matchCount / queryWords.length : 0.3;
      let denseScore = 0.55 + lexicalScore * 0.42;

      // Boost specific topics
      if (queryLower.includes('leave') || queryLower.includes('vacation')) {
        if (chunk.id === 'chunk_0') denseScore = 0.94;
        if (chunk.id === 'chunk_1') denseScore = 0.82;
      } else if (queryLower.includes('remote') || queryLower.includes('stipend')) {
        if (chunk.id === 'chunk_2') denseScore = 0.96;
      } else if (queryLower.includes('cache') || queryLower.includes('invalidation')) {
        if (chunk.id === 'chunk_5') denseScore = 0.95;
      } else if (queryLower.includes('dedupe') || queryLower.includes('overlap')) {
        if (chunk.id === 'chunk_4') denseScore = 0.93;
      } else if (queryLower.includes('auth') || queryLower.includes('token') || queryLower.includes('security')) {
        if (chunk.id === 'chunk_6') denseScore = 0.92;
        if (chunk.id === 'chunk_7') denseScore = 0.88;
      } else if (queryLower.includes('incident') || queryLower.includes('runbook') || queryLower.includes('latency')) {
        if (chunk.id === 'chunk_8') denseScore = 0.91;
      }

      // Add small deterministic jitter
      const jitter = (chunk.id.charCodeAt(chunk.id.length - 1) % 5) * 0.01;
      const finalDense = Math.min(0.99, Math.max(0.2, denseScore - jitter));

      return {
        ...chunk,
        score: parseFloat(finalDense.toFixed(3)),
        retriever: 'dense',
        score_trace: {
          dense: parseFloat(finalDense.toFixed(3))
        }
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  // Rerank chunks using simulated KeywordReranker
  rerankChunks(chunks, query, topN = 2) {
    const queryWords = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);

    return chunks.slice(0, Math.max(topN, chunks.length)).map((chunk, idx) => {
      const textLower = chunk.text.toLowerCase();
      let matchCount = 0;
      queryWords.forEach(word => {
        if (textLower.includes(word)) matchCount++;
      });

      const keywordBoost = matchCount * 0.04;
      const rerankScore = Math.min(0.99, parseFloat((chunk.score + keywordBoost + 0.02).toFixed(3)));

      return {
        ...chunk,
        rerank_score: rerankScore,
        score_trace: {
          ...chunk.score_trace,
          keyword_rerank: rerankScore
        }
      };
    }).sort((a, b) => (b.rerank_score || b.score) - (a.rerank_score || a.score)).slice(0, topN);
  }

  // Execute full RAG run (Simple or Adaptive) matching rag_titan.RAGTitan.run()
  async runQuery({ query, ragType = 'simple', topK = 5, topN = 2, temperature = 0.2, model = 'gemma3:4b' }) {
    const startTime = performance.now();
    const queryLower = query.toLowerCase().trim();
    const isGreeting = /^(hi|hello|hey|good morning|greetings|help)\b/i.test(queryLower);

    // Adaptive RAG routing step
    if (ragType === 'adaptive') {
      if (isGreeting) {
        const routeTime = 18.2;
        const answer = "Hello! I am RAG-TITAN, your intelligent Retrieval-Augmented Generation system. Ask me anything about your indexed documents, leave policies, vector search architecture, or system runbooks.";
        return {
          answer,
          sources: [],
          steps: [
            {
              step: 'route',
              name: 'Router (LLM)',
              input: { query },
              output: 'direct',
              ms: routeTime,
              detail: 'Route classified as direct conversational reply — retrieval bypassed to save latency and token budget.'
            },
            {
              step: 'direct_reply',
              name: 'Direct Generator',
              input: { query, route: 'direct' },
              output: answer,
              ms: 45.1,
              detail: 'Direct zero-shot response generated without document retrieval.'
            }
          ],
          ragType: 'adaptive',
          route: 'direct',
          tokens: 68,
          costUsd: 0.00003,
          totalLatencyMs: Math.round(performance.now() - startTime + 63)
        };
      }
    }

    // Determine route if adaptive
    const isComplex = queryLower.includes('compare') || queryWordsCount(queryLower) > 8;
    const route = isComplex ? 'complex' : 'simple';
    const effectiveTopK = ragType === 'adaptive' ? (route === 'complex' ? 8 : 4) : topK;
    const effectiveTopN = ragType === 'adaptive' ? (route === 'complex' ? 4 : 2) : topN;

    const steps = [];

    if (ragType === 'adaptive') {
      steps.push({
        step: 'route',
        name: 'Router (LLM)',
        input: { query },
        output: route,
        ms: 38.4,
        detail: `Question categorized as '${route}'. Target retrieval breadth set to top_k=${effectiveTopK}, rerank top_n=${effectiveTopN}.`
      });
    }

    // Step: Retrieval
    const retrieved = this.searchChunks(query, effectiveTopK);
    const retrieveMs = 24.5;
    steps.push({
      step: 'retrieve',
      name: 'DenseRetriever',
      input: { query, top_k: effectiveTopK, model: 'nomic-embed-text' },
      output: `${retrieved.length} chunks retrieved from MemoryStore (highest score: ${retrieved[0]?.score || 0})`,
      matches: retrieved,
      ms: retrieveMs,
      detail: `Cosine similarity search over vector store returned ${retrieved.length} chunks.`
    });

    // Step: Reranker
    const reranked = this.rerankChunks(retrieved, query, effectiveTopN);
    const rerankMs = 12.1;
    steps.push({
      step: 'rerank',
      name: 'KeywordReranker',
      input: { query, matches: retrieved.length, top_n: effectiveTopN },
      output: `${reranked.length} chunks retained after cross-encoder lexical scoring`,
      matches: reranked,
      ms: rerankMs,
      detail: `Re-ordered candidates and pruned lowest scoring chunks; top candidate: ${reranked[0]?.id} (rerank: ${reranked[0]?.rerank_score}).`
    });

    // Adaptive Evidence Checker
    if (ragType === 'adaptive') {
      const highestScore = reranked[0]?.rerank_score || 0;
      const hasEnoughEvidence = highestScore > 0.65;

      steps.push({
        step: 'check',
        name: 'EvidenceChecker (LLM)',
        input: { query, chunk_ids: reranked.map(c => c.id) },
        output: hasEnoughEvidence ? 'Evidence Sufficient (True)' : 'Evidence Weak (False)',
        ms: 42.0,
        detail: hasEnoughEvidence
          ? 'LLM confirmed the retrieved passages provide verified, factual answers for the prompt.'
          : 'Retrieved context is ambiguous or insufficient. Query rewriter initiated.'
      });
    }

    // Step: Generator
    const generateMs = 95.8;
    const topChunk = reranked[0];
    let answer = '';

    if (queryLower.includes('leave') || queryLower.includes('vacation')) {
      answer = 'According to the Company Handbook, full-time employees are entitled to **25 standard annual vacation leave days** per calendar year [chunk_0]. Leave accrues at a rate of 2.08 days per month, and up to 5 unused days can be carried forward into the next year, expiring on March 31st [chunk_0].';
    } else if (queryLower.includes('sick') || queryLower.includes('medical')) {
      answer = 'Employees receive **10 paid sick leave days** annually [chunk_1]. For any absence exceeding three consecutive working days, an official medical certificate signed by a licensed healthcare practitioner is required upon return [chunk_1].';
    } else if (queryLower.includes('remote') || queryLower.includes('stipend') || queryLower.includes('setup')) {
      answer = 'Remote employees receive a **one-time home office setup grant of $1,200 USD** following the completion of their 90-day onboarding period [chunk_2]. In addition, an ongoing monthly connectivity stipend of **$75 USD** is credited to payroll [chunk_2].';
    } else if (queryLower.includes('cache') || queryLower.includes('invalidation')) {
      answer = 'The Redis semantic cache checks incoming question embeddings for a cosine similarity threshold of **>= 0.98** [chunk_5]. Cached responses are preserved with a **72-hour TTL** and are automatically invalidated whenever document re-indexing occurs [chunk_5].';
    } else if (queryLower.includes('dedupe') || queryLower.includes('overlap')) {
      answer = 'RAG-TITAN applies `DEDUPE_OVERLAP` (default **0.5**) to drop near-duplicate candidates whose token Jaccard overlap exceeds the threshold against higher-ranked matches [chunk_4]. This saves prompt tokens and prevents context window redundancy.';
    } else if (queryLower.includes('auth') || queryLower.includes('token') || queryLower.includes('security')) {
      answer = 'API authentication requires Bearer tokens signed with **Ed25519 or RS256** featuring **15-minute expiration windows** [chunk_6]. Rate limits are strictly enforced at 60 requests per minute per tenant [chunk_6], and PII scanning strips sensitive credentials prior to vector embedding [chunk_7].';
    } else if (queryLower.includes('incident') || queryLower.includes('runbook') || queryLower.includes('latency')) {
      answer = 'Under the SRE incident runbook, if vector store latency exceeds **250ms for more than 3 consecutive minutes**, automated DNS failover redirects traffic to the standby cluster in `us-east-2` [chunk_8]. Engineers must run `rag-titan cluster sync` to ensure index parity [chunk_8].';
    } else if (topChunk) {
      answer = `Based on **${topChunk.sourceDoc}** (${topChunk.section ? topChunk.section.join(' > ') : 'General'}):\n\n"${topChunk.text.slice(0, 220)}..." [${topChunk.id}]\n\n*Note: Synthesized strictly from indexed knowledge chunks.*`;
    } else {
      answer = 'No high-confidence factual matches were found in the current index for this query. Try ingesting related documentation or broadening your search parameters.';
    }

    steps.push({
      step: 'generate',
      name: 'GroundedGenerator',
      input: { query, context_chunks: reranked.map(c => c.id), model },
      output: answer,
      ms: generateMs,
      detail: 'Synthesized grounded response with verified inline citation markers.'
    });

    const totalLatencyMs = Math.round(performance.now() - startTime + retrieveMs + rerankMs + generateMs);
    const tokens = 320 + Math.floor(Math.random() * 140);
    const costUsd = parseFloat((tokens * 0.00000035).toFixed(6));

    return {
      answer,
      sources: reranked,
      steps,
      ragType,
      route,
      tokens,
      costUsd,
      totalLatencyMs
    };
  }

  // Add document simulation
  addDocument(doc) {
    this.documents.unshift(doc);
    return doc;
  }

  // Delete document
  deleteDocument(docId) {
    this.documents = this.documents.filter(d => d.id !== docId);
  }
}

function queryWordsCount(str) {
  return str.split(/\s+/).filter(Boolean).length;
}

export const ragService = new RagTitanService();
