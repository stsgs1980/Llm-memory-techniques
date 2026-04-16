import {
  Brain,
  Layers,
  Database,
  FileJson,
  Scissors,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Technique {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  complexity: "low" | "medium" | "high";
  savings: string;
  infrastructure: string;
  bestFor: string;
  color: string;
  colorClass: string;
}

export const TECHNIQUES: Technique[] = [
  {
    id: "summarization",
    name: "Суммаризация",
    shortName: "Саммари",
    description: "Сжатие длинной истории диалога в краткое резюме с помощью LLM",
    icon: Brain,
    complexity: "low",
    savings: "70–90%",
    infrastructure: "Только API",
    bestFor: "Длинные чаты, снижение затрат",
    color: "#f59e0b",
    colorClass: "text-amber-500",
  },
  {
    id: "hierarchical",
    name: "Иерархическая память",
    shortName: "Иерархия",
    description: "Двухуровневая система: краткосрочная (последние сообщения) и долгосрочная (архив)",
    icon: Layers,
    complexity: "medium",
    savings: "60–80%",
    infrastructure: "Сервер/БД",
    bestFor: "Продвинутые ассистенты",
    color: "#06b6d4",
    colorClass: "text-cyan-500",
  },
  {
    id: "rag",
    name: "RAG (векторный поиск)",
    shortName: "RAG",
    description: "Эмбеддинги + векторный поиск по истории диалога для релевантных фрагментов",
    icon: Database,
    complexity: "high",
    savings: "80–95%",
    infrastructure: "Векторная БД",
    bestFor: "Огромные истории, документация",
    color: "#8b5cf6",
    colorClass: "text-violet-500",
  },
  {
    id: "fact-extraction",
    name: "Извлечение фактов",
    shortName: "Факты",
    description: "Автоматическое извлечение ключевых данных в структурированный JSON-профиль",
    icon: FileJson,
    complexity: "high",
    savings: "90–99%",
    infrastructure: "SQL / NoSQL",
    bestFor: "Персонализация, долгосрочная память",
    color: "#22c55e",
    colorClass: "text-emerald-500",
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    shortName: "Окно",
    description: "Хранение только последних N сообщений — простейший FIFO-подход",
    icon: Scissors,
    complexity: "low",
    savings: "40–60%",
    infrastructure: "Нет",
    bestFor: "Быстрый прототип, простой чат-бот",
    color: "#ef4444",
    colorClass: "text-red-500",
  },
  {
    id: "semantic-cache",
    name: "Семантический кэш",
    shortName: "Кэш",
    description: "Кэширование ответов по семантическому сходству запросов",
    icon: Zap,
    complexity: "medium",
    savings: "90–99%",
    infrastructure: "Векторная БД + Сервер",
    bestFor: "FAQ, поддержка, повторяющиеся запросы",
    color: "#f97316",
    colorClass: "text-orange-500",
  },
];

export interface DemoItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: "playground" | "tools" | "learning" | "resources" | "reference";
  tags: string[];
  technique?: string;
}

export const DEMO_ITEMS: DemoItem[] = [
  { id: "live-chat", name: "Live Чат", description: "Переключение техник в реальном чате", icon: Brain, category: "playground", tags: ["интерактивное", "чат"], technique: "all" },
  { id: "explorer", name: "Проводник", description: "Пошаговая визуализация техник", icon: Layers, category: "playground", tags: ["визуализация", "пошагово"], technique: "all" },
  { id: "playground", name: "Площадка", description: "Интерактивная песочница памяти", icon: Database, category: "playground", tags: ["песочница", "эксперименты"] },
  { id: "battle", name: "Битва техник", description: "Сравнение техник 1v1", icon: Zap, category: "tools", tags: ["сравнение", "турнир"] },
  { id: "cost-sim", name: "Симулятор затрат", description: "Расчёт стоимости API", icon: FileJson, category: "tools", tags: ["калькулятор", "стоимость"] },
  { id: "token-calc", name: "Калькулятор токенов", description: "Подсчёт расхода токенов", icon: Scissors, category: "tools", tags: ["калькулятор", "токены"] },
  { id: "benchmarks", name: "Бенчмарки", description: "Сравнение по ключевым метрикам", icon: Brain, category: "tools", tags: ["аналитика", "сравнение"] },
  { id: "api-matrix", name: "API Матрица", description: "Сравнение провайдеров", icon: Database, category: "tools", tags: ["сравнение", "api"] },
  { id: "decision-tree", name: "Дерево решений", description: "Выбор техники по сценарию", icon: Layers, category: "tools", tags: ["выбор", "рекомендация"] },
  { id: "recommender", name: "Советник", description: "Опросник для подбора техники", icon: Zap, category: "tools", tags: ["рекомендация", "опрос"] },
  { id: "quick-ref", name: "Шпаргалка", description: "Быстрый справочник", icon: FileJson, category: "reference", tags: ["справка", "код"] },
  { id: "prompts", name: "Промпты", description: "Готовые шаблоны промптов", icon: Scissors, category: "reference", tags: ["шаблоны", "промпты"] },
  { id: "glossary", name: "Глоссарий", description: "Термины и определения", icon: Brain, category: "learning", tags: ["обучение", "термины"] },
  { id: "quiz", name: "Квиз", description: "Тест знаний", icon: Database, category: "learning", tags: ["тест", "обучение"] },
  { id: "roadmap", name: "Дорожная карта", description: "Эволюция памяти LLM", icon: Layers, category: "learning", tags: ["история", "тренды"] },
  { id: "cases", name: "Кейсы", description: "Примеры из реального мира", icon: Zap, category: "resources", tags: ["практика", "кейсы"] },
  { id: "community", name: "Сообщество", description: "Советы и лайфхаки", icon: FileJson, category: "resources", tags: ["советы", "community"] },
  { id: "faq", name: "FAQ", description: "Часто задаваемые вопросы", icon: Scissors, category: "resources", tags: ["faq", "справка"] },
];

export const MODEL_PRICES = {
  "gpt-4o": { name: "GPT-4o", provider: "OpenAI", input: 2.5, output: 10.0, context: 128000 },
  "gpt-4o-mini": { name: "GPT-4o Mini", provider: "OpenAI", input: 0.15, output: 0.60, context: 128000 },
  "claude-3.5-sonnet": { name: "Claude 3.5 Sonnet", provider: "Anthropic", input: 3.0, output: 15.0, context: 200000 },
  "claude-3-haiku": { name: "Claude 3 Haiku", provider: "Anthropic", input: 0.80, output: 4.0, context: 200000 },
  "gemini-1.5-pro": { name: "Gemini 1.5 Pro", provider: "Google", input: 1.25, output: 5.0, context: 2000000 },
  "gemini-1.5-flash": { name: "Gemini 1.5 Flash", provider: "Google", input: 0.075, output: 0.30, context: 1000000 },
};

export type ModelId = keyof typeof MODEL_PRICES;

export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU");
}

export function formatUSD(n: number): string {
  if (n < 0.01) return "<$0.01";
  return `$${n.toFixed(2)}`;
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length * 0.4);
}
