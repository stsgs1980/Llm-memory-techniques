import {
  DollarSign,
  Swords,
  GitBranch,
  BarChart3,
  BookOpen,
  MessageSquare,
  Play,
  GraduationCap,
  BookMarked,
  Users,
  Lightbulb,
  HelpCircle,
  Clock,
  Briefcase,
  Calculator,
  ClipboardCheck,
  Database,
} from 'lucide-react';
import type { AppTab } from '@/lib/store';

export const TAB_CONFIG: { id: AppTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Обзор', icon: BookMarked },
  { id: 'learn', label: 'Обучение', icon: GraduationCap },
  { id: 'tools', label: 'Инструменты', icon: DollarSign },
  { id: 'playground', label: 'Песочница', icon: Play },
  { id: 'resources', label: 'Ресурсы', icon: Users },
];

export const TOOLS_SUBTABS = [
  { id: 'cost-sim', label: 'Симулятор', icon: DollarSign },
  { id: 'battle', label: 'Битва', icon: Swords },
  { id: 'decision-tree', label: 'Дерево', icon: GitBranch },
  { id: 'api-matrix', label: 'API Матрица', icon: Database },
  { id: 'token-calc', label: 'Токены', icon: Calculator },
  { id: 'recommender', label: 'Советник', icon: ClipboardCheck },
  { id: 'benchmarks', label: 'Бенчмарки', icon: BarChart3 },
  { id: 'quick-ref', label: 'Шпаргалка', icon: BookOpen },
] as const;

export const RESOURCES_SUBTABS = [
  { id: 'glossary', label: 'Глоссарий', icon: BookOpen },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'roadmap', label: 'Дорожная карта', icon: Clock },
  { id: 'case-studies', label: 'Кейсы', icon: Briefcase },
  { id: 'community', label: 'Сообщество', icon: Lightbulb },
] as const;

export const LEARNING_MODULES = [
  { id: 'basics', title: 'Основы контекстного окна', desc: 'Что такое токены, контекстное окно и почему LLM не имеют памяти.', difficulty: 'Базовый', time: '3 мин', icon: BookOpen },
  { id: 'why-manage', title: 'Зачем управлять памятью', desc: 'Стоимость, скорость и качество — три причины для управления контекстом.', difficulty: 'Базовый', time: '5 мин', icon: DollarSign },
  { id: 'sliding-window', title: 'Sliding Window', desc: 'Самый простой подход: хранение только последних N сообщений.', difficulty: 'Начинающий', time: '3 мин', icon: Swords },
  { id: 'summarization', title: 'Суммаризация', desc: 'Первая настоящая техника: сжатие истории в краткое резюме.', difficulty: 'Средний', time: '7 мин', icon: MessageSquare },
  { id: 'hierarchical', title: 'Иерархическая память', desc: 'Двухуровневая система: краткосрочная и долгосрочная память.', difficulty: 'Средний', time: '8 мин', icon: GitBranch },
  { id: 'rag', title: 'RAG — Векторный поиск', desc: 'Эмбеддинги и косинусное сходство для точного поиска.', difficulty: 'Продвинутый', time: '10 мин', icon: BarChart3 },
  { id: 'fact-extraction', title: 'Извлечение фактов', desc: 'Автоматическое создание JSON-профиля пользователя.', difficulty: 'Продвинутый', time: '6 мин', icon: BookMarked },
  { id: 'combined', title: 'Комбинированный подход', desc: 'Лучшая практика: сочетание нескольких техник.', difficulty: 'Продвинутый', time: '5 мин', icon: Lightbulb },
];
