import { ShoppingCart, Scale, GraduationCap, HeartPulse, Laptop, Handshake, PenTool, Landmark } from 'lucide-react';

export interface MetricBar {
  label: string;
  before: number;
  after: number;
  unit: string;
  lowerIsBetter?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  industryIcon: React.ElementType;
  problem: string;
  techniques: string[];
  headlineResult: string;
  metrics: MetricBar[];
  takeaway: string;
  details: string;
  toolsUsed: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ecommerce-chatbot',
    title: 'E-commerce Chatbot — Mem0',
    company: 'Online Retail Platform',
    industry: 'E-commerce',
    industryIcon: ShoppingCart,
    problem: 'Customer support chatbot had no memory of previous conversations. Returning customers had to repeat order details, preferences, and shipping info every single session, causing frustration and increasing handle time per ticket.',
    techniques: ['Fact Extraction', 'Hierarchical Memory'],
    headlineResult: '40% increase in customer satisfaction, 70% reduction in repeated questions',
    metrics: [
      { label: 'Repeated Questions', before: 68, after: 20, unit: '%', lowerIsBetter: true },
      { label: 'CSAT Score', before: 58, after: 81, unit: '%', lowerIsBetter: false },
      { label: 'Avg Handle Time', before: 8.5, after: 4.2, unit: 'min', lowerIsBetter: true },
      { label: 'First Contact Resolution', before: 34, after: 72, unit: '%', lowerIsBetter: false },
    ],
    takeaway: 'Fact extraction with hierarchical memory turns a stateless bot into a personalized assistant. The key is automatically extracting structured facts (order history, preferences) at the end of each conversation and injecting them as context at the start of the next.',
    details: 'The team integrated Mem0 to automatically extract customer facts at the end of every support session. A two-tier memory system was implemented: short-term memory holds the current conversation context, while long-term memory stores extracted facts like shipping address, preferred products, and past issues. When a returning customer initiates a new chat, the system pulls relevant facts from long-term memory and injects them into the system prompt. This gave the bot "memory" without any manual engineering. The implementation took 3 weeks and reduced API costs by 25% since fewer back-and-forth turns were needed per resolution.',
    toolsUsed: ['Mem0', 'OpenAI GPT-4o', 'PostgreSQL', 'FastAPI'],
  },
  {
    id: 'legal-document',
    title: 'Legal Document Assistant — RAG',
    company: 'Mid-size Law Firm',
    industry: 'Legal',
    industryIcon: Scale,
    problem: 'The firm needed an AI assistant to analyze thousands of legal documents, contracts, and case files. Keyword search was insufficient — attorneys needed semantic understanding to find relevant precedents and clause patterns across 50,000+ documents.',
    techniques: ['RAG'],
    headlineResult: '85% reduction in document review time',
    metrics: [
      { label: 'Review Time / Document', before: 45, after: 7, unit: 'min', lowerIsBetter: true },
      { label: 'Relevant Findings', before: 40, after: 92, unit: '%', lowerIsBetter: false },
      { label: 'Missed Precedents', before: 22, after: 3, unit: '%', lowerIsBetter: true },
      { label: 'Search Queries / Case', before: 15, after: 3, unit: '', lowerIsBetter: true },
    ],
    takeaway: 'RAG with high-quality chunking and metadata filtering transforms legal document search. The breakthrough was using recursive character splitting with overlap, plus tagging each chunk with document type, jurisdiction, and date for precise retrieval.',
    details: 'The team built a RAG pipeline using ChromaDB with recursive character splitting (512 tokens per chunk, 100 token overlap). Each chunk was enriched with metadata tags: document type, jurisdiction, date range, and relevance score. Embeddings were generated using text-embedding-3-large. The retrieval step used hybrid search — combining vector similarity with keyword matching for legal terminology. When attorneys query the system, it retrieves the top 10 most relevant chunks and passes them as context to GPT-4o for synthesis. The system achieved a 92% relevant findings rate, compared to 40% with traditional keyword search. Implementation cost was approximately $12,000, with ROI achieved within 2 months.',
    toolsUsed: ['LangChain', 'ChromaDB', 'OpenAI GPT-4o', 'text-embedding-3-large'],
  },
  {
    id: 'educational-platform',
    title: 'Educational Platform — Summarization',
    company: 'Online Learning Platform',
    industry: 'Education',
    industryIcon: GraduationCap,
    problem: 'Long tutoring sessions frequently exceeded context window limits. When sessions ran past ~50 exchanges, the model lost track of earlier discussion points. Students had to re-explain concepts, and the tutor could not reference previously covered material.',
    techniques: ['Summarization'],
    headlineResult: '60% cost reduction, unlimited session length',
    metrics: [
      { label: 'API Cost / Session', before: 0.85, after: 0.34, unit: '$', lowerIsBetter: true },
      { label: 'Max Session Length', before: 50, after: 500, unit: 'msgs', lowerIsBetter: false },
      { label: 'Context Retention', before: 30, after: 88, unit: '%', lowerIsBetter: false },
      { label: 'Token Usage / Request', before: 8500, after: 3200, unit: 'tok', lowerIsBetter: true },
    ],
    takeaway: 'Rolling summarization is the simplest way to enable unlimited conversation length. By periodically compressing the conversation history into a structured summary, you maintain context coherence while drastically reducing token usage.',
    details: 'The team implemented a rolling summarization strategy with two thresholds: at 4000 tokens, a lightweight compression pass runs using GPT-4o-mini (cost: $0.001/call) to compress older messages into a structured summary. At 8000 tokens, a more aggressive summarization runs using GPT-4o to create a comprehensive summary. The summary preserves: topic progression, key concepts covered, student questions, and areas of difficulty. The system maintains a rolling window of the last 10 messages in full, plus the compressed summary. This approach reduced token usage by 62% while maintaining 88% context retention as measured by human evaluators.',
    toolsUsed: ['GPT-4o', 'GPT-4o-mini', 'Custom middleware', 'Redis'],
  },
  {
    id: 'healthcare-triage',
    title: 'Healthcare Triage — Semantic Cache',
    company: 'Telemedicine Startup',
    industry: 'Healthcare',
    industryIcon: HeartPulse,
    problem: 'The AI triage system was answering the same patient questions repeatedly (e.g., "What are the symptoms of flu?" appeared 200+ times/day), wasting $5,000/month on redundant API calls. Simple exact-match caching was ineffective because patients phrase the same question differently.',
    techniques: ['Semantic Cache', 'RAG'],
    headlineResult: '92% cache hit rate, $4,600/month savings',
    metrics: [
      { label: 'Monthly API Cost', before: 5000, after: 400, unit: '$', lowerIsBetter: true },
      { label: 'Cache Hit Rate', before: 12, after: 92, unit: '%', lowerIsBetter: false },
      { label: 'Response Latency', before: 1200, after: 85, unit: 'ms', lowerIsBetter: true },
      { label: 'Unique Queries / Day', before: 3200, after: 256, unit: '', lowerIsBetter: false },
    ],
    takeaway: 'Semantic caching is the single most cost-effective optimization for high-volume AI services. A similarity threshold of 0.92 balances cache hits with answer accuracy — tune it carefully for your domain.',
    details: 'The team deployed a two-layer caching system. Layer 1: Exact match cache (Redis) for identical queries — handles ~12% of traffic. Layer 2: Semantic cache using GPT-4o-mini embeddings stored in Qdrant. Incoming queries are embedded and compared against cached entries using cosine similarity. If similarity > 0.92, the cached response is returned. If similarity is between 0.85 and 0.92, the system uses RAG to augment the cached response with any new context. Below 0.85, a full LLM call is made and the result is cached. The semantic cache also includes TTL-based expiration (24 hours for medical content) and category-based invalidation. The entire system reduced monthly costs from $5,000 to $400.',
    toolsUsed: ['Qdrant', 'Redis', 'GPT-4o-mini', 'FastAPI', 'text-embedding-3-small'],
  },
  {
    id: 'developer-assistant',
    title: 'Developer Assistant — Hierarchical Memory',
    company: 'SaaS Platform',
    industry: 'Technology',
    industryIcon: Laptop,
    problem: 'The AI coding assistant lost context of long debugging sessions. After 30+ messages, it forgot earlier hypotheses, tried previously-failed approaches again, and could not connect symptoms from different parts of the conversation. Developer productivity dropped significantly in complex debugging tasks.',
    techniques: ['Hierarchical Memory'],
    headlineResult: '35% improvement in code suggestions relevance',
    metrics: [
      { label: 'Suggestion Relevance', before: 55, after: 90, unit: '%', lowerIsBetter: false },
      { label: 'Repeated Suggestions', before: 28, after: 5, unit: '%', lowerIsBetter: true },
      { label: 'Debug Resolution Time', before: 45, after: 22, unit: 'min', lowerIsBetter: true },
      { label: 'Session Continuity', before: 40, after: 87, unit: '%', lowerIsBetter: false },
    ],
    takeaway: 'Hierarchical memory mirrors how humans debug: short-term working memory for the current approach, long-term memory for established facts and failed paths. The critical insight is explicitly tracking what has NOT worked.',
    details: 'The team implemented a two-tier memory architecture for the coding assistant. Short-term memory: the last 15 messages in full detail, preserving code snippets, error messages, and recent commands. Long-term memory: a structured JSON document maintained by the AI containing: (1) Problem description and constraints, (2) Hypotheses tested and their results, (3) Code files modified and changes made, (4) Failed approaches explicitly listed, (5) Current working hypothesis. Every 10 messages, the AI updates the long-term memory document. When generating suggestions, both tiers are injected as context with clear delineation. The "failed approaches" section proved most valuable — it reduced repeated suggestions by 82%.',
    toolsUsed: ['Claude 3.5 Sonnet', 'Letta (MemGPT)', 'SQLite', 'VS Code Extension API'],
  },
  {
    id: 'customer-onboarding',
    title: 'Customer Onboarding — Combined Approach',
    company: 'B2B SaaS Startup',
    industry: 'Enterprise',
    industryIcon: Handshake,
    problem: 'Personalized onboarding for 1,000+ enterprise clients was overwhelming the customer success team. Each client had different tech stacks, compliance requirements, integration needs, and timelines. The existing template-based approach had a 30% drop-off rate during onboarding.',
    techniques: ['Fact Extraction', 'RAG', 'Summarization'],
    headlineResult: '50% reduction in onboarding time',
    metrics: [
      { label: 'Onboarding Duration', before: 14, after: 7, unit: 'days', lowerIsBetter: true },
      { label: 'Client Drop-off', before: 30, after: 11, unit: '%', lowerIsBetter: true },
      { label: 'CS Effort / Client', before: 12, after: 4, unit: 'hrs', lowerIsBetter: true },
      { label: 'Time to First Value', before: 21, after: 9, unit: 'days', lowerIsBetter: true },
    ],
    takeaway: 'Combining three techniques creates a powerful onboarding intelligence system. Fact extraction builds the client profile, RAG retrieves relevant integration docs, and summarization tracks onboarding progress — together they automate 80% of repetitive onboarding tasks.',
    details: 'The team built a multi-layered memory system for client onboarding. Fact Extraction: After each onboarding call, GPT-4o extracts structured client facts (tech stack, compliance needs, team size, priorities) into a JSON profile stored in PostgreSQL. RAG: All integration documentation, FAQs, and past onboarding playbooks are chunked and stored in Pinecone. When a new question arises, the system retrieves the most relevant documentation chunks. Summarization: A weekly summary of onboarding progress is generated and stored, creating a living onboarding timeline. The AI assistant uses all three layers: client profile facts for personalization, RAG for accurate technical guidance, and the progress summary for continuity between sessions. CS reps now handle 3x more clients with higher satisfaction scores.',
    toolsUsed: ['LangChain', 'Pinecone', 'PostgreSQL', 'GPT-4o', 'Slack API'],
  },
  {
    id: 'content-creation',
    title: 'Content Creation Platform — Sliding Window',
    company: 'AI Writing Tool',
    industry: 'Content',
    industryIcon: PenTool,
    problem: 'The chat-based writing assistant needed a simple, fast memory mechanism. Users write articles, blog posts, and marketing copy through conversational interaction. The key requirement was simplicity — the small team (2 engineers) could not maintain a complex memory infrastructure.',
    techniques: ['Sliding Window'],
    headlineResult: 'Simple implementation, adequate for 85% of use cases',
    metrics: [
      { label: 'Implementation Time', before: 0, after: 2, unit: 'days', lowerIsBetter: true },
      { label: 'Context Coherence', before: 45, after: 78, unit: '%', lowerIsBetter: false },
      { label: 'User Satisfaction', before: 60, after: 82, unit: '%', lowerIsBetter: false },
      { label: 'Monthly Maintenance', before: 0, after: 1, unit: 'hr', lowerIsBetter: true },
    ],
    takeaway: 'Sliding window is the right choice when simplicity matters more than sophistication. For most chat-based writing tools where sessions are under 20 exchanges, keeping the last N messages provides sufficient context without any infrastructure overhead.',
    details: 'The team chose a sliding window of the last 20 messages (configurable per user tier). The implementation is remarkably simple: a deque in Redis that automatically discards the oldest message when the window exceeds 20 entries. Each message includes metadata (role, timestamp, token count). The system prompt is always prepended with the writing context (genre, tone, target audience) stored in user settings. This approach covers 85% of writing sessions which are under 15 exchanges. For the 15% of long sessions, the tool offers a "Session Summary" button that uses GPT-4o-mini to generate a compact summary, which replaces the sliding window when activated. The entire memory system is 45 lines of code with zero external dependencies beyond Redis.',
    toolsUsed: ['Redis', 'GPT-4o-mini', 'Next.js', 'No vector DB needed'],
  },
  {
    id: 'financial-advisory',
    title: 'Financial Advisory — Multi-agent',
    company: 'FinTech Company',
    industry: 'Finance',
    industryIcon: Landmark,
    problem: 'The financial advisory platform used multiple specialized AI agents (risk analysis, portfolio optimization, tax planning, market research). Each agent operated in isolation, so users had to repeat their financial situation to every agent. Cross-agent context sharing was critical for coherent financial advice.',
    techniques: ['RAG', 'Fact Extraction', 'Semantic Cache'],
    headlineResult: '75% cost reduction vs naive multi-agent approach',
    metrics: [
      { label: 'Cost / Advisory Session', before: 3.20, after: 0.80, unit: '$', lowerIsBetter: true },
      { label: 'Context Consistency', before: 35, after: 94, unit: '%', lowerIsBetter: false },
      { label: 'Avg Queries / Session', before: 12, after: 12, unit: '', lowerIsBetter: false },
      { label: 'Response Time', before: 8, after: 2.5, unit: 'sec', lowerIsBetter: true },
    ],
    takeaway: 'A shared memory layer between agents is essential for multi-agent systems. Fact extraction creates a unified client profile, semantic cache eliminates redundant agent calls, and RAG ensures each agent has access to the same financial knowledge base.',
    details: 'The team implemented a shared memory architecture connecting 4 specialized agents. Shared Fact Store: After each user interaction, facts are extracted and stored in a centralized PostgreSQL database accessible by all agents. Every agent reads the same client profile before generating advice. Shared Knowledge Base: All 4 agents query the same RAG system (Pinecone) containing financial regulations, market data, and historical case studies. This ensures consistent information across agents. Semantic Cache: A shared cache layer (Qdrant) sits in front of all agents. Common financial queries (e.g., "What are the tax implications of...") are cached at 0.89 similarity threshold, serving approximately 40% of queries from cache. The shared memory layer reduced per-session costs by 75% compared to each agent independently calling the LLM with full context. Context consistency improved from 35% to 94% — the most impactful improvement for user trust.',
    toolsUsed: ['LangGraph', 'Pinecone', 'Qdrant', 'PostgreSQL', 'GPT-4o'],
  },
];

export const ALL_TECHNIQUES = Array.from(new Set(CASE_STUDIES.flatMap((cs) => cs.techniques))).sort();
export const ALL_INDUSTRIES = Array.from(new Set(CASE_STUDIES.map((cs) => cs.industry))).sort();

export const TECHNIQUE_COLORS: Record<string, string> = {
  'Fact Extraction': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'Hierarchical Memory': 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  RAG: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  Summarization: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Semantic Cache': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  'Sliding Window': 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
};

export const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  Ecommerce: ShoppingCart,
  Legal: Scale,
  Education: GraduationCap,
  Healthcare: HeartPulse,
  Technology: Laptop,
  Enterprise: Handshake,
  Content: PenTool,
  Finance: Landmark,
};
