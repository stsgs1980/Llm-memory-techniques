export type TechniqueId = 'sliding-window' | 'summarization' | 'hierarchical' | 'rag' | 'fact-extraction' | 'semantic-cache';

export interface QuestionOption {
  label: string;
  value: string;
  desc: string;
}

export interface Question {
  id: string;
  title: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'project_type',
    title: 'Какой у вас тип проекта?',
    options: [
      { label: 'Чат-бот', value: 'chatbot', desc: 'Ответы на вопросы, поддержка' },
      { label: 'Ассистент', value: 'assistant', desc: 'Продвинутый AI-помощник' },
      { label: 'Аналитика', value: 'analytics', desc: 'Обработка данных, отчёты' },
      { label: 'Персонализация', value: 'personalization', desc: 'Рекомендации, профиль' },
    ],
  },
  {
    id: 'dialog_volume',
    title: 'Каков объём диалогов?',
    options: [
      { label: 'Короткие (<10 сообщений)', value: 'short', desc: 'Быстрые вопросы' },
      { label: 'Средние (10–50)', value: 'medium', desc: 'Типичная сессия' },
      { label: 'Длинные (50+)', value: 'long', desc: 'Глубокие разговоры' },
      { label: 'Очень длинные (1000+)', value: 'very_long', desc: 'Архивные истории' },
    ],
  },
  {
    id: 'priority',
    title: 'Что важнее?',
    options: [
      { label: 'Экономия стоимости', value: 'cost', desc: 'Минимизировать затраты' },
      { label: 'Качество ответов', value: 'quality', desc: 'Максимальная точность' },
      { label: 'Скорость', value: 'speed', desc: 'Быстрое время отклика' },
      { label: 'Персонализация', value: 'personal', desc: 'Запоминать пользователя' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Какая инфраструктура доступна?',
    options: [
      { label: 'Только API', value: 'api_only', desc: 'Нет своего сервера' },
      { label: 'Сервер + БД', value: 'server_db', desc: 'Базовая инфраструктура' },
      { label: 'Полный стек', value: 'full_stack', desc: 'Контролируемое окружение' },
      { label: 'Векторная БД', value: 'vector_db', desc: 'Pinecone, Qdrant и т.д.' },
    ],
  },
  {
    id: 'memory_precision',
    title: 'Нужна ли точная память о деталях?',
    options: [
      { label: 'Да, цитаты и факты', value: 'exact', desc: 'Точные воспоминания' },
      { label: 'Нет, общий контекст', value: 'general', desc: 'Общая картина' },
      { label: 'Не важно', value: 'dont_care', desc: 'Не приоритет' },
    ],
  },
  {
    id: 'budget',
    title: 'Бюджет на разработку?',
    options: [
      { label: 'Минимум (1 день)', value: 'minimal', desc: 'Быстрый старт' },
      { label: 'Средний (1 неделя)', value: 'medium', desc: 'Баланс времени/качества' },
      { label: 'Большой (1 месяц+)', value: 'large', desc: 'Продвинутая реализация' },
    ],
  },
];

export const SCORING: Record<string, Record<string, Record<TechniqueId, number>>> = {
  project_type: {
    chatbot: { 'sliding-window': 3, summarization: 2, hierarchical: 2, rag: 2, 'fact-extraction': 1, 'semantic-cache': 4 },
    assistant: { 'sliding-window': 1, summarization: 3, hierarchical: 4, rag: 3, 'fact-extraction': 3, 'semantic-cache': 2 },
    analytics: { 'sliding-window': 1, summarization: 3, hierarchical: 2, rag: 4, 'fact-extraction': 4, 'semantic-cache': 1 },
    personalization: { 'sliding-window': 1, summarization: 2, hierarchical: 3, rag: 3, 'fact-extraction': 5, 'semantic-cache': 2 },
  },
  dialog_volume: {
    short: { 'sliding-window': 5, summarization: 1, hierarchical: 1, rag: 1, 'fact-extraction': 1, 'semantic-cache': 3 },
    medium: { 'sliding-window': 3, summarization: 3, hierarchical: 3, rag: 2, 'fact-extraction': 2, 'semantic-cache': 3 },
    long: { 'sliding-window': 1, summarization: 4, hierarchical: 4, rag: 3, 'fact-extraction': 3, 'semantic-cache': 2 },
    very_long: { 'sliding-window': 0, summarization: 3, hierarchical: 3, rag: 5, 'fact-extraction': 4, 'semantic-cache': 1 },
  },
  priority: {
    cost: { 'sliding-window': 4, summarization: 4, hierarchical: 3, rag: 2, 'fact-extraction': 2, 'semantic-cache': 5 },
    quality: { 'sliding-window': 1, summarization: 3, hierarchical: 4, rag: 5, 'fact-extraction': 4, 'semantic-cache': 2 },
    speed: { 'sliding-window': 5, summarization: 2, hierarchical: 2, rag: 1, 'fact-extraction': 2, 'semantic-cache': 5 },
    personal: { 'sliding-window': 0, summarization: 2, hierarchical: 3, rag: 3, 'fact-extraction': 5, 'semantic-cache': 2 },
  },
  infrastructure: {
    api_only: { 'sliding-window': 5, summarization: 4, hierarchical: 1, rag: 0, 'fact-extraction': 0, 'semantic-cache': 1 },
    server_db: { 'sliding-window': 3, summarization: 4, hierarchical: 4, rag: 2, 'fact-extraction': 3, 'semantic-cache': 2 },
    full_stack: { 'sliding-window': 2, summarization: 3, hierarchical: 5, rag: 4, 'fact-extraction': 5, 'semantic-cache': 3 },
    vector_db: { 'sliding-window': 1, summarization: 2, hierarchical: 3, rag: 5, 'fact-extraction': 4, 'semantic-cache': 5 },
  },
  memory_precision: {
    exact: { 'sliding-window': 0, summarization: 2, hierarchical: 3, rag: 5, 'fact-extraction': 5, 'semantic-cache': 2 },
    general: { 'sliding-window': 3, summarization: 4, hierarchical: 4, rag: 2, 'fact-extraction': 1, 'semantic-cache': 3 },
    dont_care: { 'sliding-window': 5, summarization: 3, hierarchical: 2, rag: 1, 'fact-extraction': 1, 'semantic-cache': 4 },
  },
  budget: {
    minimal: { 'sliding-window': 5, summarization: 4, hierarchical: 1, rag: 0, 'fact-extraction': 0, 'semantic-cache': 2 },
    medium: { 'sliding-window': 3, summarization: 4, hierarchical: 4, rag: 3, 'fact-extraction': 2, 'semantic-cache': 3 },
    large: { 'sliding-window': 1, summarization: 3, hierarchical: 4, rag: 5, 'fact-extraction': 5, 'semantic-cache': 4 },
  },
};

export const REASONS: Record<TechniqueId, string> = {
  'sliding-window': 'Минимальная реализация — просто храните последние N сообщений. Идеально для прототипов и проектов с ограниченным бюджетом.',
  summarization: 'Автоматическое сжатие истории в краткое резюме. Отличная экономия токенов с сохранением контекста диалога.',
  hierarchical: 'Двухуровневая система с краткосрочной и долгосрочной памятью. Баланс между качеством и сложностью реализации.',
  rag: 'Векторный поиск по истории — находит релевантные фрагменты из миллионов записей. Масштабируемость без компромиссов.',
  'fact-extraction': 'Структурированный JSON-профиль с ключевыми фактами о пользователе. Лучший выбор для персонализации.',
  'semantic-cache': 'Кэширование по смыслу запросов — мгновенные ответы на повторяющиеся вопросы с максимальной экономией.',
};

export const TECHNIQUE_COMPLEXITY: Record<TechniqueId, { label: string; color: string }> = {
  'sliding-window': { label: 'Низкая', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  summarization: { label: 'Низкая', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  hierarchical: { label: 'Средняя', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  rag: { label: 'Высокая', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  'fact-extraction': { label: 'Высокая', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  'semantic-cache': { label: 'Средняя', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
};

export const TECHNIQUE_IDS: TechniqueId[] = [
  'sliding-window',
  'summarization',
  'hierarchical',
  'rag',
  'fact-extraction',
  'semantic-cache',
];
