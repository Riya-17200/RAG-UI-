// RAG-TITAN Adaptive RAG Intelligence Platform — Core Data & Knowledge Base

export const SYSTEM_STATS = {
  totalQueriesAnalyzed: '148,920',
  adaptiveStrategySelections: '98.4%',
  retrievalSuccessRate: '96.2%',
  avgRetrievalLatencyMs: 142,
  p95LatencyMs: 285,
  compositeConfidenceScore: '0.934',
  fallbackActivations: '3.8%',
  totalDocumentsIndexed: 1428,
  totalVectorEmbeddings: '348,200',
  activeRouterModel: 'gemma3:4b-adaptive',
  activeGeneratorModel: 'llama3.3:70b-instruct',
  activeEmbedder: 'nomic-embed-text-v1.5 (768d)',
  activeReranker: 'bge-reranker-large',
  systemStatus: 'OPTIMAL',
  uptime: '99.99%',
  lastEvaluated: '2 mins ago'
};

export const STRATEGY_DEFINITIONS = [
  {
    id: 'direct_bypass',
    name: 'Direct Generation (Bypass)',
    code: 'STRAT_BYPASS_01',
    category: 'Fast Path',
    badge: 'Zero-Retrieval',
    color: '#386BFF',
    accent: 'blue',
    description: 'Bypasses vector retrieval entirely for conversational, greeting, or meta-system inquiries.',
    selectionConditions: [
      'Query is classified as conversational, meta, or greeting',
      'Informational entropy score < 0.15',
      'Zero factual entities or internal system keywords detected'
    ],
    retrievalBehavior: 'Zero database lookups. Direct prompt routing to the Generator LLM with system context only.',
    input: 'Conversational query string (e.g., "Hello, what can you do?")',
    output: 'Instant synthesized reply without grounding overhead',
    avgLatency: '38ms',
    accuracy: '99.1%',
    llmCalls: '1 call',
    costRating: 'Lowest ($0.0001)',
    frequency: '14.2%',
    status: 'ACTIVE'
  },
  {
    id: 'lightweight_dense',
    name: 'Lightweight Dense Retrieval',
    code: 'STRAT_DENSE_02',
    category: 'Standard Path',
    badge: 'Single-Pass',
    color: '#00D9FF',
    accent: 'cyan',
    description: 'High-speed single-pass dense vector retrieval with semantic embedding and top-N keyword reranking.',
    selectionConditions: [
      'Query complexity <= 3.5 / 10',
      'Single factual intent detected (single entity target)',
      'Ambiguity entropy <= 0.25'
    ],
    retrievalBehavior: 'Cosine similarity search over 768d HNSW vector index (top_k=4) -> Lexical overlap reranking to top_n=2.',
    input: 'Atomic factual query (e.g., "What is our annual vacation leave policy?")',
    output: 'Top 2 high-relevance chunks with verified page and section anchors',
    avgLatency: '114ms',
    accuracy: '95.8%',
    llmCalls: '1 call',
    costRating: 'Low ($0.0004)',
    frequency: '48.6%',
    status: 'ACTIVE'
  },
  {
    id: 'multihop_decomposition',
    name: 'Adaptive Multi-Hop & Decomposition',
    code: 'STRAT_MULTIHOP_03',
    category: 'Complex Path',
    badge: 'Multi-Step',
    color: '#9666FF',
    accent: 'violet',
    description: 'Decomposes complex multi-faceted queries into targeted sub-queries, executes parallel retrieval, and fuses context.',
    selectionConditions: [
      'Query complexity >= 6.5 / 10',
      'Comparative, multi-entity, or conditional intent detected',
      'Spans multiple document domains or disparate policy sections'
    ],
    retrievalBehavior: 'LLM decomposes query into 2-4 sub-questions -> Parallel vector & hybrid search -> Reciprocal cross-context synthesis.',
    input: 'Multi-part query (e.g., "Compare remote work stipend with healthcare subsidy and explain approvals")',
    output: 'Decomposed sub-query results aggregated into structured contextual evidence map',
    avgLatency: '318ms',
    accuracy: '93.4%',
    llmCalls: '3 calls',
    costRating: 'Medium ($0.0018)',
    frequency: '22.3%',
    status: 'ACTIVE'
  },
  {
    id: 'disambiguation_refine',
    name: 'Query Disambiguation & Refinement',
    code: 'STRAT_REFINE_04',
    category: 'Refinement Path',
    badge: 'Clarification',
    color: '#FFB454',
    accent: 'warning',
    description: 'Detects semantic ambiguity and underspecified queries; reformulates query dimensions and presents disambiguated paths.',
    selectionConditions: [
      'Query ambiguity entropy > 0.60',
      'Multiple conflicting semantic clusters identified in knowledge base',
      'Missing critical scope specifier (e.g., environment, version, domain)'
    ],
    retrievalBehavior: 'Semantic expansion + intent clustering -> Proactive clarifying option generation or multi-cluster retrieval union.',
    input: 'Underspecified query (e.g., "How do I fix the timeout error?")',
    output: 'Disambiguated candidate queries with scoped context previews for each system layer',
    avgLatency: '242ms',
    accuracy: '89.7%',
    llmCalls: '2 calls',
    costRating: 'Moderate ($0.0011)',
    frequency: '11.1%',
    status: 'ACTIVE'
  },
  {
    id: 'corrective_crag',
    name: 'Corrective RAG (CRAG) & Fallback',
    code: 'STRAT_CRAG_05',
    category: 'Fallback Path',
    badge: 'Self-Corrective',
    color: '#FF647C',
    accent: 'error',
    description: 'Self-reflecting evaluator grades retrieved chunk confidence; triggers query rewriting and safety guardrails if below threshold.',
    selectionConditions: [
      'Initial retrieval confidence score < 0.70 threshold',
      'High hallucination risk or zero document semantic overlap',
      'Out-of-distribution or future temporal entity detected'
    ],
    retrievalBehavior: 'Confidence Gate rejection -> Query Rewriting with synonym injection -> Secondary hybrid search -> Transparent ungrounded notification if still unresolved.',
    input: 'Low-confidence or unindexed query (e.g., "What are the Q3 2029 quantum key rotation guidelines?")',
    output: 'Self-reflection audit log, rewritten query attempts, and refusal/safety boundary response',
    avgLatency: '388ms',
    accuracy: '97.2% (safety-aligned)',
    llmCalls: '2-4 calls',
    costRating: 'High ($0.0024)',
    frequency: '3.8%',
    status: 'ACTIVE'
  }
];

export const PRESET_SCENARIOS = {
  scenarioA: {
    id: 'scenarioA',
    badge: 'Scenario A',
    label: 'Simple Factual Query',
    tag: 'Lightweight Path',
    color: '#00D9FF',
    accent: 'cyan',
    query: 'What is our policy for paid annual vacation leave days?',
    explanation: 'Single-hop factual query with explicit entity "annual vacation leave days". Query complexity is minimal (2.2/10) with near-zero ambiguity. The engine selects Lightweight Dense Retrieval, bypassing expensive multi-hop logic for 114ms response time.',
    classification: {
      intent: 'Factual Policy Lookup',
      intentConfidence: 0.98,
      complexity: 2.2,
      ambiguity: 0.08,
      domain: 'Human Resources / Employee Benefits',
      entities: [
        { text: 'paid annual vacation leave', type: 'HR_POLICY', salience: 0.96 },
        { text: 'days', type: 'QUANTITY_METRIC', salience: 0.74 }
      ],
      decomposed: false,
      selectedStrategy: 'lightweight_dense',
      strategyReason: 'Complexity <= 3.0 & Ambiguity <= 0.15 indicates direct factual retrieval. Single-pass vector search with keyword reranking is optimal.'
    },
    pipelineTrace: [
      { step: 'Query Input', status: 'completed', timeMs: 2, detail: 'Received 52-char natural language query' },
      { step: 'Query Classification', status: 'completed', timeMs: 14, detail: 'Intent classified as "Factual Policy Lookup" (confidence: 98%)' },
      { step: 'Complexity Analysis', status: 'completed', timeMs: 9, detail: 'Complexity rated 2.2/10; Ambiguity entropy 0.08' },
      { step: 'Adaptive Strategy Selection', status: 'completed', timeMs: 8, detail: 'Selected STRAT_DENSE_02 (Lightweight Dense Retrieval)' },
      { step: 'Retrieval Execution', status: 'completed', timeMs: 38, detail: 'Dense cosine search retrieved 4 candidates from company_handbook_2026.pdf' },
      { step: 'Cross-Reranking', status: 'completed', timeMs: 16, detail: 'Lexical cross-reranker isolated top_n=2 chunks' },
      { step: 'Confidence Assessment', status: 'completed', timeMs: 12, detail: 'Evidence confidence 0.94 >= 0.70 threshold. Fallback not triggered.' },
      { step: 'Grounded Generation', status: 'completed', timeMs: 82, detail: 'Synthesized grounded answer citing chunk_0 with zero hallucination' }
    ],
    retrievedChunks: [
      {
        id: 'chunk_0',
        docName: 'company_handbook_2026.pdf',
        page: 1,
        section: 'Leave Policy > Annual Vacation Leave',
        score: 0.942,
        denseScore: 0.938,
        rerankScore: 0.946,
        relevance: 'HIGH',
        text: 'All full-time employees are entitled to 25 standard annual leave days per calendar year. Leave accrues on the first day of each month at a rate of 2.08 days per month. Unused annual leave up to 5 days can be carried forward into the subsequent calendar year, expiring on March 31st.',
        tokens: 58
      },
      {
        id: 'chunk_1',
        docName: 'company_handbook_2026.pdf',
        page: 1,
        section: 'Leave Policy > Sick and Medical Leave',
        score: 0.718,
        denseScore: 0.742,
        rerankScore: 0.694,
        relevance: 'PARTIAL',
        text: 'Employees receive 10 paid sick leave days annually. For absences exceeding three consecutive working days, a medical certificate signed by a licensed practitioner is required upon return.',
        tokens: 34
      }
    ],
    finalResponse: {
      answer: "Under our 2026 Employee Policy, all full-time employees are entitled to **25 standard annual leave days** per calendar year [chunk_0]. Leave accrues on the first day of each calendar month at a rate of **2.08 days per month** [chunk_0]. Employees may carry forward up to **5 unused vacation days** into the following calendar year, provided they are utilized prior to **March 31st** [chunk_0].",
      citations: [
        { chunkId: 'chunk_0', doc: 'company_handbook_2026.pdf', page: 1, section: 'Annual Vacation Leave' }
      ],
      confidence: 0.942,
      latencyMs: 114,
      totalTokens: 184,
      strategyUsed: 'Lightweight Dense Retrieval'
    }
  },

  scenarioB: {
    id: 'scenarioB',
    badge: 'Scenario B',
    label: 'Complex Multi-Part Query',
    tag: 'Multi-Hop Path',
    color: '#9666FF',
    accent: 'violet',
    query: 'Compare our remote work equipment stipend with our healthcare subsidy and explain approval thresholds.',
    explanation: 'Complex multi-aspect query spanning equipment benefits, healthcare allowances, and executive approval policy. The engine identifies 3 distinct entities and elevated complexity (8.4/10). It dynamically activates Adaptive Multi-Hop Decomposition, routing sub-queries in parallel.',
    classification: {
      intent: 'Comparative Multi-Policy Synthesis',
      intentConfidence: 0.95,
      complexity: 8.4,
      ambiguity: 0.18,
      domain: 'Cross-Domain Corporate Policies & Finance',
      entities: [
        { text: 'remote work equipment stipend', type: 'BENEFIT_ALLOWANCE', salience: 0.92 },
        { text: 'healthcare subsidy', type: 'BENEFIT_HEALTH', salience: 0.90 },
        { text: 'approval thresholds', type: 'GOVERNANCE_RULE', salience: 0.88 }
      ],
      decomposed: true,
      subQueries: [
        { id: 'sub_1', text: 'What is the remote work equipment stipend amount and eligibility?', domain: 'Equipment' },
        { id: 'sub_2', text: 'What is the healthcare wellness subsidy allowance?', domain: 'Healthcare' },
        { id: 'sub_3', text: 'What are the managerial approval thresholds for expense reimbursements?', domain: 'Finance' }
      ],
      selectedStrategy: 'multihop_decomposition',
      strategyReason: 'Complexity 8.4/10 with multiple distinct policy entities. Single-pass retrieval would cause context truncation. Multi-hop parallel decomposition selected.'
    },
    pipelineTrace: [
      { step: 'Query Input', status: 'completed', timeMs: 3, detail: 'Received 98-char multi-aspect query' },
      { step: 'Query Classification', status: 'completed', timeMs: 18, detail: 'Intent: "Comparative Multi-Policy Synthesis" (complexity: 8.4)' },
      { step: 'Query Decomposition', status: 'completed', timeMs: 44, detail: 'Decomposed into 3 targeted parallel sub-queries [sub_1, sub_2, sub_3]' },
      { step: 'Adaptive Strategy Selection', status: 'completed', timeMs: 10, detail: 'Selected STRAT_MULTIHOP_03 (Adaptive Multi-Hop & Decomposition)' },
      { step: 'Parallel Retrieval Execution', status: 'completed', timeMs: 78, detail: 'Retrieved 8 candidates across company_handbook_2026.pdf and finance_procurement_guide.md' },
      { step: 'Cross-Context Fusion & Rerank', status: 'completed', timeMs: 32, detail: 'Fused context matrix, reranked to top 3 comparative chunks' },
      { step: 'Confidence Assessment', status: 'completed', timeMs: 14, detail: 'Composite confidence 0.912 across all 3 sub-facets' },
      { step: 'Comparative Synthesis', status: 'completed', timeMs: 129, detail: 'Synthesized side-by-side comparative breakdown with grounded citations' }
    ],
    retrievedChunks: [
      {
        id: 'chunk_2',
        docName: 'company_handbook_2026.pdf',
        page: 2,
        section: 'Benefits > Remote Work Stipend',
        score: 0.958,
        denseScore: 0.952,
        rerankScore: 0.964,
        relevance: 'HIGH',
        text: 'A one-time home office setup grant of $1,200 USD is provided to all remote team members upon completion of their 90-day onboarding period. An ongoing monthly connectivity allowance of $75 USD is added directly to payroll.',
        tokens: 44
      },
      {
        id: 'chunk_8',
        docName: 'company_handbook_2026.pdf',
        page: 3,
        section: 'Benefits > Healthcare & Wellness Subsidy',
        score: 0.914,
        denseScore: 0.908,
        rerankScore: 0.920,
        relevance: 'HIGH',
        text: 'Full-time staff are eligible for a monthly healthcare & wellness reimbursement of up to $150 USD, covering gym memberships, mental health apps, and supplemental health insurance premiums.',
        tokens: 38
      },
      {
        id: 'chunk_12',
        docName: 'finance_procurement_guide.md',
        page: 2,
        section: 'Finance > Expense Approval Matrix',
        score: 0.886,
        denseScore: 0.875,
        rerankScore: 0.897,
        relevance: 'HIGH',
        text: 'Reimbursement claims under $500 USD require only immediate manager approval. Claims between $501 and $2,500 USD (including the $1,200 equipment setup grant) require Department Head sign-off. Claims exceeding $2,500 USD require VP Finance approval.',
        tokens: 52
      }
    ],
    finalResponse: {
      answer: "### Comparative Analysis: Equipment Stipend vs. Healthcare Subsidy\n\n| Benefit Feature | Remote Work Equipment Stipend | Healthcare & Wellness Subsidy |\n|---|---|---|\n| **Amount** | **$1,200 USD one-time grant** + $75/mo connectivity [chunk_2] | **Up to $150 USD monthly** reimbursement [chunk_8] |\n| **Eligibility** | Remote employees upon completing 90-day onboarding [chunk_2] | All full-time employees from Day 1 [chunk_8] |\n| **Eligible Items** | Desks, ergonomic chairs, monitors, peripherals [chunk_2] | Gym memberships, mental health apps, premiums [chunk_8] |\n\n### Approval Thresholds & Governance\n- **Monthly Allowances ($75 - $150):** Automatically processed through payroll or requires only **Direct Manager approval** since amounts are < $500 USD [chunk_12].\n- **Equipment Setup Grant ($1,200):** Falls within the $501–$2,500 USD tier and mandates **Department Head sign-off** in the procurement portal [chunk_12].",
      citations: [
        { chunkId: 'chunk_2', doc: 'company_handbook_2026.pdf', page: 2, section: 'Remote Work Stipend' },
        { chunkId: 'chunk_8', doc: 'company_handbook_2026.pdf', page: 3, section: 'Healthcare & Wellness Subsidy' },
        { chunkId: 'chunk_12', doc: 'finance_procurement_guide.md', page: 2, section: 'Expense Approval Matrix' }
      ],
      confidence: 0.912,
      latencyMs: 318,
      totalTokens: 412,
      strategyUsed: 'Adaptive Multi-Hop & Decomposition'
    }
  },

  scenarioC: {
    id: 'scenarioC',
    badge: 'Scenario C',
    label: 'Ambiguous Query',
    tag: 'Disambiguation Path',
    color: '#FFB454',
    accent: 'warning',
    query: 'How do I handle the timeout error in the system?',
    explanation: 'Highly underspecified query with multiple conflicting semantic meanings across infrastructure layers (API Gateway, Redis Cache, or Vector Store HNSW query timeout). Ambiguity entropy is measured at 0.79. The engine triggers Query Disambiguation & Refinement to present contextual paths.',
    classification: {
      intent: 'System Error Troubleshooting (Underspecified)',
      intentConfidence: 0.74,
      complexity: 4.8,
      ambiguity: 0.79,
      domain: 'Multi-Layer Infrastructure Engineering',
      entities: [
        { text: 'timeout error', type: 'ERROR_TYPE', salience: 0.95 },
        { text: 'system', type: 'UNSCOPED_TARGET', salience: 0.60 }
      ],
      decomposed: false,
      ambiguousClusters: [
        { layer: 'Vector Database', matchCount: 4, scenario: 'HNSW ANN search timeout > 250ms' },
        { layer: 'Redis Semantic Cache', matchCount: 3, scenario: 'Redis connection drop / query cache miss' },
        { layer: 'API Gateway', matchCount: 5, scenario: 'Client Bearer token verification timeout' }
      ],
      selectedStrategy: 'disambiguation_refine',
      strategyReason: 'Ambiguity entropy 0.79 exceeds threshold (0.60). Query lacks architectural context. Engine reformulates 3 scoped paths and synthesizes layered guidance.'
    },
    pipelineTrace: [
      { step: 'Query Input', status: 'completed', timeMs: 2, detail: 'Received 47-char generic error question' },
      { step: 'Query Classification', status: 'completed', timeMs: 15, detail: 'Ambiguity entropy detected at 0.79 (HIGH)' },
      { step: 'Cluster Disambiguation', status: 'completed', timeMs: 34, detail: 'Isolated 3 architectural clusters: Vector Store, Redis, API Gateway' },
      { step: 'Adaptive Strategy Selection', status: 'completed', timeMs: 8, detail: 'Selected STRAT_REFINE_04 (Query Disambiguation & Refinement)' },
      { step: 'Multi-Cluster Retrieval', status: 'completed', timeMs: 64, detail: 'Retrieved troubleshooting chunks across vector_search_architecture.md and system_incident_runbook.txt' },
      { step: 'Context Evaluation', status: 'completed', timeMs: 22, detail: 'Evaluated cross-layer relevance. Scored 0.76 overall' },
      { step: 'Structured Disambiguation Synthesis', status: 'completed', timeMs: 97, detail: 'Formulated categorized recovery procedures with clear disambiguation pills' }
    ],
    retrievedChunks: [
      {
        id: 'chunk_9',
        docName: 'system_incident_runbook.txt',
        page: 1,
        section: 'Incident Runbook > Vector Store Recovery',
        score: 0.842,
        denseScore: 0.835,
        rerankScore: 0.850,
        relevance: 'HIGH',
        text: 'Severity 1: If vector store latency exceeds 250ms for more than 3 consecutive minutes, failover DNS automatically redirects queries to the hot standby in us-east-2. Runbook task: execute "rag-titan cluster sync" to verify parity.',
        tokens: 42
      },
      {
        id: 'chunk_5',
        docName: 'vector_search_architecture.md',
        page: 2,
        section: 'Vector Architecture > Cache Invalidation',
        score: 0.764,
        denseScore: 0.780,
        rerankScore: 0.748,
        relevance: 'MEDIUM',
        text: 'The Redis semantic cache checks incoming question embeddings against a query cache. Entries with cosine similarity >= 0.98 return cached LLM responses with a TTL of 72 hours, automatically invalidated on document re-indexing.',
        tokens: 38
      }
    ],
    finalResponse: {
      answer: "Your query **\"timeout error\"** is ambiguous across multiple infrastructure components. Below are the verified protocols for the three primary timeout surfaces:\n\n1. **Vector Store Latency Timeout (>250ms):**\n   - If vector query times exceed 250ms for > 3 minutes, DNS failover redirects traffic to the `us-east-2` hot standby [chunk_9].\n   - Immediate remediation command: `rag-titan cluster sync` [chunk_9].\n\n2. **Redis Semantic Cache Timeout:**\n   - Check if Redis connection pool is saturated. Chunks with cosine similarity $\\ge$ 0.98 utilize 72-hr TTL; verify invalidation state [chunk_5].\n\n3. **API Client Gateway Timeout (HTTP 504):**\n   - Verify client Bearer token expiration (15-min TTL) and tenant rate-limit quota (60 req/min) [chunk_6].\n\n*(To narrow down, select which component threw the timeout: `[Vector DB]` `[Redis Cache]` `[API Gateway]`)*",
      citations: [
        { chunkId: 'chunk_9', doc: 'system_incident_runbook.txt', page: 1, section: 'Vector Store Recovery' },
        { chunkId: 'chunk_5', doc: 'vector_search_architecture.md', page: 2, section: 'Cache Invalidation' }
      ],
      confidence: 0.764,
      latencyMs: 242,
      totalTokens: 298,
      strategyUsed: 'Query Disambiguation & Refinement'
    }
  },

  scenarioD: {
    id: 'scenarioD',
    badge: 'Scenario D',
    label: 'Low-Confidence Retrieval',
    tag: 'Corrective CRAG Path',
    color: '#FF647C',
    accent: 'error',
    query: 'What are the Q3 2029 quantum encryption key rotation guidelines?',
    explanation: 'Query contains out-of-distribution entities ("Q3 2029", "quantum encryption key rotation") absent from current corporate documentation. Initial dense retrieval scores only 0.41 (well below the 0.70 confidence threshold). The Evidence Checker flags high hallucination hazard, triggering Corrective RAG (CRAG) fallback.',
    classification: {
      intent: 'Out-of-Distribution / Future Policy Inquiry',
      intentConfidence: 0.48,
      complexity: 6.2,
      ambiguity: 0.32,
      domain: 'Cryptographic Security (Unindexed Entity)',
      entities: [
        { text: 'Q3 2029', type: 'TEMPORAL_FUTURE', salience: 0.98 },
        { text: 'quantum encryption key rotation', type: 'CRYPTOGRAPHY_TECH', salience: 0.94 }
      ],
      decomposed: false,
      selectedStrategy: 'corrective_crag',
      strategyReason: 'Initial retrieval confidence score (0.41) < minimum confidence threshold (0.70). Query Rewriting and Hallucination Guardrail activated to prevent fabricated answers.'
    },
    pipelineTrace: [
      { step: 'Query Input', status: 'completed', timeMs: 2, detail: 'Received 66-char query on unindexed futuristic policy' },
      { step: 'Query Classification', status: 'completed', timeMs: 16, detail: 'Identified out-of-distribution temporal entity: "Q3 2029"' },
      { step: 'Initial Dense Retrieval', status: 'completed', timeMs: 39, detail: 'Best match chunk score: 0.412 (below 0.70 threshold)' },
      { step: 'Confidence Evaluation Gate', status: 'warning', timeMs: 14, detail: 'CRAG Trigger: Evidence confidence 0.412 < 0.700. Rejection initiated.' },
      { step: 'Query Rewriting Loop', status: 'completed', timeMs: 48, detail: 'Rewrote query: "encryption key rotation standards authentication Ed25519"' },
      { step: 'Secondary Hybrid Retrieval', status: 'completed', timeMs: 52, detail: 'Retrieved general cryptographic standards from api_security_standards.docx' },
      { step: 'Evidence Sufficiency Check', status: 'warning', timeMs: 24, detail: 'Evidence checker determined: NO quantum 2029 policy exists. Safe boundary enforced.' },
      { step: 'Safety-Grounded Response', status: 'completed', timeMs: 91, detail: 'Generated transparent ungrounded disclosure with existing security baseline' }
    ],
    retrievedChunks: [
      {
        id: 'chunk_6',
        docName: 'api_security_standards.docx',
        page: 1,
        section: 'Authentication > Token Policy',
        score: 0.412,
        denseScore: 0.412,
        rerankScore: 0.380,
        relevance: 'LOW',
        text: 'Authentication must utilize Bearer tokens signed with Ed25519 or RS256 with 15-minute expiration windows. Rate limits are enforced at 60 requests per minute per tenant API key.',
        tokens: 30
      }
    ],
    finalResponse: {
      answer: "⚠️ **Confidence Boundary Warning: Insufficient Grounded Context (Score: 0.41 < 0.70)**\n\nRAG-TITAN's Adaptive Evidence Checker evaluated retrieved documentation and determined that **no policy exists for \"Q3 2029 quantum encryption key rotation\"** within the indexed corpus.\n\n### Current Active Cryptographic Baseline:\n- Authentication tokens currently mandate **Ed25519 or RS256 signatures** with **15-minute expiration windows** [chunk_6].\n- Token rate limiting is capped at **60 requests/minute per tenant** [chunk_6].\n\n*The engine refused to fabricate or extrapolate unverified future cryptographic schedules, preventing a high-risk hallucination.*",
      citations: [
        { chunkId: 'chunk_6', doc: 'api_security_standards.docx', page: 1, section: 'Token Policy' }
      ],
      confidence: 0.412,
      latencyMs: 388,
      totalTokens: 215,
      strategyUsed: 'Corrective RAG (CRAG) & Fallback'
    }
  }
};

export const RECENT_EXECUTION_TRACES = [
  {
    traceId: 'tr-9842a',
    timestamp: '2026-11-14 19:48:12',
    query: 'What is our policy for paid annual vacation leave days?',
    strategy: 'Lightweight Dense Retrieval',
    strategyKey: 'lightweight_dense',
    complexity: 2.2,
    confidence: 0.942,
    latencyMs: 114,
    status: 'OPTIMAL',
    llmCalls: 1,
    tokens: 184,
    scenarioId: 'scenarioA'
  },
  {
    traceId: 'tr-9842b',
    timestamp: '2026-11-14 19:42:05',
    query: 'Compare our remote work equipment stipend with our healthcare subsidy and explain approval thresholds.',
    strategy: 'Adaptive Multi-Hop & Decomposition',
    strategyKey: 'multihop_decomposition',
    complexity: 8.4,
    confidence: 0.912,
    latencyMs: 318,
    status: 'OPTIMAL',
    llmCalls: 3,
    tokens: 412,
    scenarioId: 'scenarioB'
  },
  {
    traceId: 'tr-9842c',
    timestamp: '2026-11-14 19:35:48',
    query: 'How do I handle the timeout error in the system?',
    strategy: 'Query Disambiguation & Refinement',
    strategyKey: 'disambiguation_refine',
    complexity: 4.8,
    confidence: 0.764,
    latencyMs: 242,
    status: 'ADAPTED',
    llmCalls: 2,
    tokens: 298,
    scenarioId: 'scenarioC'
  },
  {
    traceId: 'tr-9842d',
    timestamp: '2026-11-14 19:28:19',
    query: 'What are the Q3 2029 quantum encryption key rotation guidelines?',
    strategy: 'Corrective RAG (CRAG) & Fallback',
    strategyKey: 'corrective_crag',
    complexity: 6.2,
    confidence: 0.412,
    latencyMs: 388,
    status: 'FALLBACK',
    llmCalls: 2,
    tokens: 215,
    scenarioId: 'scenarioD'
  },
  {
    traceId: 'tr-9842e',
    timestamp: '2026-11-14 19:15:33',
    query: 'Hello system, can you tell me what you do?',
    strategy: 'Direct Generation (Bypass)',
    strategyKey: 'direct_bypass',
    complexity: 1.0,
    confidence: 0.990,
    latencyMs: 38,
    status: 'BYPASS',
    llmCalls: 1,
    tokens: 95,
    scenarioId: 'scenarioE'
  }
];

export const MOCK_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'company_handbook_2026.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadedAt: '2026-11-12 14:20',
    chunksCount: 84,
    status: 'indexed',
    loader: 'PdfLoader',
    chunker: 'RecursiveChunker',
    summary: 'Internal employee handbook covering PTO leave policy, remote work, equipment allowance, and benefits.',
    chunks: [
      {
        id: 'chunk_0',
        page: 1,
        section: ['Leave Policy', 'Annual Vacation Leave'],
        text: 'All full-time employees are entitled to 25 standard annual leave days per calendar year. Leave accrues on the first day of each month at a rate of 2.08 days per month. Unused annual leave up to 5 days can be carried forward into the subsequent calendar year, expiring on March 31st.',
        tokens: 58
      },
      {
        id: 'chunk_1',
        page: 1,
        section: ['Leave Policy', 'Sick and Medical Leave'],
        text: 'Employees receive 10 paid sick leave days annually. For absences exceeding three consecutive working days, a medical certificate signed by a licensed practitioner is required upon return.',
        tokens: 34
      },
      {
        id: 'chunk_2',
        page: 2,
        section: ['Benefits', 'Remote Work Stipend'],
        text: 'A one-time home office setup grant of $1,200 USD is provided to all remote team members upon completion of their 90-day onboarding period. An ongoing monthly connectivity allowance of $75 USD is added directly to payroll.',
        tokens: 44
      },
      {
        id: 'chunk_8',
        page: 3,
        section: ['Benefits', 'Healthcare & Wellness Subsidy'],
        text: 'Full-time staff are eligible for a monthly healthcare & wellness reimbursement of up to $150 USD, covering gym memberships, mental health apps, and supplemental health insurance premiums.',
        tokens: 38
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'vector_search_architecture.md',
    type: 'md',
    size: '860 KB',
    uploadedAt: '2026-11-13 09:15',
    chunksCount: 42,
    status: 'indexed',
    loader: 'TextLoader',
    chunker: 'HeadingChunker',
    summary: 'Technical architecture specification for HNSW indexing, quantization, deduplication, and cache invalidation.',
    chunks: [
      {
        id: 'chunk_3',
        page: 1,
        section: ['Vector Architecture', 'ANN'],
        text: 'RAG-TITAN uses Hierarchical Navigable Small World (HNSW) indexing with M=16 and efConstruction=200. Cosine distance is calculated over normalized vector representations.',
        tokens: 28
      },
      {
        id: 'chunk_4',
        page: 1,
        section: ['Vector Architecture', 'Deduplication'],
        text: 'When DEDUPE_OVERLAP is configured (default 0.5), chunks with token Jaccard overlap exceeding the threshold against higher-ranked chunks are suppressed to avoid context window pollution.',
        tokens: 31
      },
      {
        id: 'chunk_5',
        page: 2,
        section: ['Vector Architecture', 'Cache Invalidation'],
        text: 'The Redis semantic cache checks incoming question embeddings against a query cache. Entries with cosine similarity >= 0.98 return cached LLM responses with a TTL of 72 hours, automatically invalidated on document re-indexing.',
        tokens: 38
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'api_security_standards.docx',
    type: 'docx',
    size: '1.2 MB',
    uploadedAt: '2026-11-14 11:05',
    chunksCount: 36,
    status: 'indexed',
    loader: 'DocxLoader',
    chunker: 'RecursiveChunker',
    summary: 'Enterprise security requirements, OAuth2 token rotation, rate limiting quotas, and PII anonymization in RAG prompts.',
    chunks: [
      {
        id: 'chunk_6',
        page: 1,
        section: ['Authentication', 'Token Policy'],
        text: 'Authentication must utilize Bearer tokens signed with Ed25519 or RS256 with 15-minute expiration windows. Rate limits are enforced at 60 requests per minute per tenant API key.',
        tokens: 30
      },
      {
        id: 'chunk_7',
        page: 1,
        section: ['Privacy', 'PII Anonymization'],
        text: 'PII detection scans all input questions for social security numbers, emails, and phone numbers before embedding generation.',
        tokens: 18
      }
    ]
  },
  {
    id: 'doc-4',
    name: 'system_incident_runbook.txt',
    type: 'txt',
    size: '340 KB',
    uploadedAt: '2026-11-14 16:40',
    chunksCount: 19,
    status: 'indexed',
    loader: 'TextLoader',
    chunker: 'WordChunker',
    summary: 'Site Reliability Engineering runbook for handling vector drift, model timeout failover, and cold-start mitigations.',
    chunks: [
      {
        id: 'chunk_9',
        page: 1,
        section: ['Incident Runbook', 'Vector Store Recovery'],
        text: 'Severity 1: If vector store latency exceeds 250ms for more than 3 consecutive minutes, failover DNS automatically redirects queries to the hot standby in us-east-2. Runbook task: execute "rag-titan cluster sync" to verify parity.',
        tokens: 42
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'finance_procurement_guide.md',
    type: 'md',
    size: '520 KB',
    uploadedAt: '2026-11-14 17:15',
    chunksCount: 28,
    status: 'indexed',
    loader: 'TextLoader',
    chunker: 'RecursiveChunker',
    summary: 'Corporate finance matrix specifying manager, department head, and VP expense reimbursement approval limits.',
    chunks: [
      {
        id: 'chunk_12',
        page: 2,
        section: ['Finance', 'Expense Approval Matrix'],
        text: 'Reimbursement claims under $500 USD require only immediate manager approval. Claims between $501 and $2,500 USD (including the $1,200 equipment setup grant) require Department Head sign-off. Claims exceeding $2,500 USD require VP Finance approval.',
        tokens: 52
      }
    ]
  }
];

export const EVALUATION_COMPARISON_DATA = {
  benchmarks: [
    { metric: 'Retrieval Accuracy', adaptive: 96.2, fixedNaive: 78.4, fixedHybrid: 85.1, unit: '%' },
    { metric: 'Context Precision', adaptive: 94.6, fixedNaive: 74.2, fixedHybrid: 82.8, unit: '%' },
    { metric: 'Context Recall', adaptive: 92.8, fixedNaive: 71.0, fixedHybrid: 84.3, unit: '%' },
    { metric: 'Faithfulness (No Hallucinations)', adaptive: 98.4, fixedNaive: 81.5, fixedHybrid: 86.9, unit: '%' },
    { metric: 'Answer Relevance', adaptive: 96.1, fixedNaive: 80.2, fixedHybrid: 87.4, unit: '%' },
    { metric: 'Average Latency', adaptive: 142, fixedNaive: 120, fixedHybrid: 195, unit: 'ms' },
    { metric: 'Fallback Effectiveness', adaptive: 97.4, fixedNaive: 0.0, fixedHybrid: 0.0, unit: '%' },
    { metric: 'Token Cost Efficiency', adaptive: 91.2, fixedNaive: 75.0, fixedHybrid: 68.4, unit: '%' }
  ],
  datasets: [
    { id: 'ds-1', name: 'EnterpriseWiki-PolicyBench', queries: 250, domain: 'HR, Procurement, IT', date: '2026-11-10' },
    { id: 'ds-2', name: 'CloudOps-Incident-KB', queries: 180, domain: 'SRE, Latency, Outages', date: '2026-11-12' },
    { id: 'ds-3', name: 'CryptoCompliance-Hotpot', queries: 320, domain: 'Security, Multi-Hop', date: '2026-11-13' }
  ]
};
