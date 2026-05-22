import type { LucideIcon } from 'lucide-react';
import {
  Brain,
  Layers,
  Database,
  FileJson,
  Scissors,
  Zap,
  BookOpen,
  DollarSign,
  Swords,
  GitBranch,
  BarChart3,
  GraduationCap,
  BookMarked,
  Users,
  Play,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import type { AppTab } from '@/lib/store';

/* ────────────────────────────────────────────
   FAQ data (mirrored from FaqAccordion)
   ──────────────────────────────────────────── */
export const FAQ_ITEMS = [
  { q: 'Что такое управление памятью LLM?' },
  { q: 'Что такое контекстное окно?' },
  { q: 'Сколько стоит память API?' },
  { q: 'Какая техника экономит больше всего?' },
  { q: 'Можно ли комбинировать техники?' },
  { q: 'Как реализовать суммаризацию?' },
  { q: 'Какие библиотеки использовать?' },
  { q: 'Как мониторить расход токенов?' },
];

/* ────────────────────────────────────────────
   Community tips (mirrored from CommunityInsights)
   ──────────────────────────────────────────── */
export const COMMUNITY_TIPS = [
  { title: 'Устанавливайте бюджет токенов', desc: 'Определите максимальное количество токенов на запрос' },
  { title: 'Комбинируйте RAG + суммаризацию', desc: 'Точность извлечения + экономия токенов' },
  { title: 'Не игнорируйте переполнение контекста', desc: 'Проверяйте размер контекста перед отправкой' },
  { title: 'Кэшируйте саммари между запросами', desc: 'Экономия может достигать 60-80%' },
  { title: 'Мониторинг токенов в production', desc: 'Создайте middleware для подсчёта токенов' },
  { title: 'Не хардкодьте размеры контекста', desc: 'Используйте конфигурацию для лимитов' },
  { title: 'Версионируйте промпты вместе с кодом', desc: 'Храните промпты в отдельных файлах' },
  { title: 'Начните с простого sliding window', desc: 'Для базовых чат-ботов достаточно 10-15 последних сообщений' },
];

/* ────────────────────────────────────────────
   Glossary terms (mirrored from Glossary)
   ──────────────────────────────────────────── */
export const GLOSSARY_TERMS = [
  { term: 'Токен (Token)', def: 'Минимальная единица текста для LLM' },
  { term: 'Контекстное окно', def: 'Максимальный объём текста для обработки' },
  { term: 'Эмбеддинг', def: 'Числовое представление текста в векторном пространстве' },
  { term: 'Векторная БД', def: 'База данных для хранения эмбеддингов' },
  { term: 'RAG', def: 'Retrieval-Augmented Generation' },
  { term: 'Суммаризация', def: 'Сжатие длинной истории в краткое резюме' },
  { term: 'Sliding Window', def: 'Хранение только последних N сообщений' },
  { term: 'Извлечение фактов', def: 'Структурированные данные из диалога' },
  { term: 'Иерархическая память', def: 'Двухуровневая система памяти' },
  { term: 'Промпт', def: 'Текстовый запрос к LLM' },
  { term: 'Косинусное сходство', def: 'Метрика близости векторов' },
  { term: 'Чанк (Chunk)', def: 'Фрагмент текста для векторной БД' },
];

/* ────────────────────────────────────────────
   Learning modules (mirrored from page.tsx)
   ──────────────────────────────────────────── */
export const LEARNING_MODULES = [
  { id: 'basics', title: 'Основы контекстного окна', desc: 'Что такое токены, контекстное окно и почему LLM не имеют памяти' },
  { id: 'why-manage', title: 'Зачем управлять памятью', desc: 'Стоимость, скорость и качество' },
  { id: 'sliding-window', title: 'Sliding Window', desc: 'Хранение только последних N сообщений' },
  { id: 'summarization', title: 'Суммаризация', desc: 'Первая настоящая техника: сжатие истории в краткое резюме' },
  { id: 'hierarchical', title: 'Иерархическая память', desc: 'Двухуровневая система: краткосрочная и долгосрочная' },
  { id: 'rag', title: 'RAG — Векторный поиск', desc: 'Эмбеддинги и косинусное сходство для точного поиска' },
  { id: 'fact-extraction', title: 'Извлечение фактов', desc: 'Автоматическое создание JSON-профиля пользователя' },
  { id: 'combined', title: 'Комбинированный подход', desc: 'Лучшая практика: сочетание нескольких техник' },
];

/* ────────────────────────────────────────────
   Navigation tabs
   ──────────────────────────────────────────── */
export const NAV_TABS: { id: AppTab; label: string; desc: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Обзор', desc: 'Обзор всех техник управления памятью LLM', icon: BookMarked },
  { id: 'learn', label: 'Обучение', desc: 'Пошаговое обучение техникам', icon: GraduationCap },
  { id: 'tools', label: 'Инструменты', desc: 'Калькуляторы, сравнения и анализ', icon: DollarSign },
  { id: 'playground', label: 'Песочница', desc: 'Интерактивные демо и эксперименты', icon: Play },
  { id: 'resources', label: 'Ресурсы', desc: 'Глоссарий, FAQ, дорожная карта', icon: Users },
];

/* ────────────────────────────────────────────
   Icon lookup tables
   ──────────────────────────────────────────── */
export const TECHNIQUE_ICONS: Record<string, LucideIcon> = {
  summarization: Brain,
  hierarchical: Layers,
  rag: Database,
  'fact-extraction': FileJson,
  'sliding-window': Scissors,
  'semantic-cache': Zap,
};

export const DEMO_ICONS: Record<string, LucideIcon> = {
  'live-chat': Brain,
  explorer: Layers,
  playground: Database,
  battle: Zap,
  'cost-sim': FileJson,
  'token-calc': Scissors,
  benchmarks: Brain,
  'api-matrix': Database,
  'decision-tree': Layers,
  recommender: Zap,
  'quick-ref': FileJson,
  prompts: Scissors,
  glossary: Brain,
  quiz: Database,
  roadmap: Layers,
  cases: Zap,
  community: FileJson,
  faq: Scissors,
};

export const MODULE_ICONS: LucideIcon[] = [
  BookOpen, DollarSign, Swords, Brain,
  GitBranch, BarChart3, BookMarked, Lightbulb,
];

/* ────────────────────────────────────────────
   Category configuration
   ──────────────────────────────────────────── */
export const CATEGORY_ORDER = [
  'techniques',
  'demo',
  'learning',
  'tools',
  'resources',
  'navigation',
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  techniques: 'Техники',
  demo: 'Демо',
  learning: 'Обучение',
  tools: 'Инструменты',
  resources: 'Ресурсы',
  navigation: 'Навигация',
};

/* ────────────────────────────────────────────
   Tools sub-items
   ──────────────────────────────────────────── */
export const TOOL_ITEMS = [
  { id: 'tool-cost', label: 'Симулятор затрат', desc: 'Расчёт стоимости API вызовов' },
  { id: 'tool-battle', label: 'Битва техник', desc: 'Сравнение техник 1v1' },
  { id: 'tool-decision', label: 'Дерево решений', desc: 'Выбор техники по сценарию' },
  { id: 'tool-benchmarks', label: 'Бенчмарки', desc: 'Сравнение по метрикам' },
  { id: 'tool-quickref', label: 'Шпаргалка', desc: 'Быстрый справочник' },
];

export const TOOL_ICONS_MAP: LucideIcon[] = [DollarSign, Swords, Brain, BookOpen, BookOpen];
