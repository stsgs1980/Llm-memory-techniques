'use client';

import { useCallback } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useAppStore, type AppTab } from '@/lib/store';
import { TECHNIQUES, DEMO_ITEMS } from '@/lib/constants';
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
  Clock,
  Lightbulb,
  Compass,
  Search,
} from 'lucide-react';

/* ────────────────────────────────────────────
   Search entry type
   ──────────────────────────────────────────── */
interface SearchEntry {
  id: string;
  label: string;
  description: string;
  category: string;
  categoryKey: string;
  icon: LucideIcon;
  action: () => void;
}

/* ────────────────────────────────────────────
   FAQ data (mirrored from FaqAccordion)
   ──────────────────────────────────────────── */
const FAQ_ITEMS = [
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
const COMMUNITY_TIPS = [
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
const GLOSSARY_TERMS = [
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
const LEARNING_MODULES = [
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
const NAV_TABS: { id: AppTab; label: string; desc: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Обзор', desc: 'Обзор всех техник управления памятью LLM', icon: BookMarked },
  { id: 'learn', label: 'Обучение', desc: 'Пошаговое обучение техникам', icon: GraduationCap },
  { id: 'tools', label: 'Инструменты', desc: 'Калькуляторы, сравнения и анализ', icon: DollarSign },
  { id: 'playground', label: 'Песочница', desc: 'Интерактивные демо и эксперименты', icon: Play },
  { id: 'resources', label: 'Ресурсы', desc: 'Глоссарий, FAQ, дорожная карта', icon: Users },
];

/* ────────────────────────────────────────────
   Icon lookup for techniques
   ──────────────────────────────────────────── */
const TECHNIQUE_ICONS: Record<string, LucideIcon> = {
  summarization: Brain,
  hierarchical: Layers,
  rag: Database,
  'fact-extraction': FileJson,
  'sliding-window': Scissors,
  'semantic-cache': Zap,
};

const DEMO_ICONS: Record<string, LucideIcon> = {
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

const MODULE_ICONS: LucideIcon[] = [
  BookOpen, DollarSign, Swords, Brain,
  GitBranch, BarChart3, BookMarked, Lightbulb,
];

/* ────────────────────────────────────────────
   Category display order
   ──────────────────────────────────────────── */
const CATEGORY_ORDER = [
  'techniques',
  'demo',
  'learning',
  'tools',
  'resources',
  'navigation',
];

const CATEGORY_LABELS: Record<string, string> = {
  techniques: 'Техники',
  demo: 'Демо',
  learning: 'Обучение',
  tools: 'Инструменты',
  resources: 'Ресурсы',
  navigation: 'Навигация',
};

/* ────────────────────────────────────────────
   GlobalSearch component
   ──────────────────────────────────────────── */
export default function GlobalSearch() {
  const { searchOpen, setSearchOpen, setActiveTab, setSelectedTechnique } = useAppStore();

  const handleSelect = useCallback(
    (entry: SearchEntry) => {
      entry.action();
      setSearchOpen(false);
    },
    [setSearchOpen],
  );

  const buildEntries = useCallback((): SearchEntry[] => {
    const entries: SearchEntry[] = [];

    // Techniques
    TECHNIQUES.forEach((t) => {
      entries.push({
        id: `tech-${t.id}`,
        label: t.name,
        description: t.shortName
          ? `${t.shortName} — ${t.description}`
          : t.description,
        category: CATEGORY_LABELS.techniques,
        categoryKey: 'techniques',
        icon: TECHNIQUE_ICONS[t.id] ?? Brain,
        action: () => {
          setActiveTab('learn');
          setSelectedTechnique(t.id);
        },
      });
    });

    // Demo items
    DEMO_ITEMS.forEach((d) => {
      const catLabel =
        d.category === 'playground'
          ? 'Песочница'
          : d.category === 'tools'
            ? 'Инструменты'
            : d.category === 'learning'
              ? 'Обучение'
              : d.category === 'resources'
                ? 'Ресурсы'
                : 'Справка';

      entries.push({
        id: `demo-${d.id}`,
        label: d.name,
        description: d.description,
        category: CATEGORY_LABELS.demo,
        categoryKey: 'demo',
        icon: DEMO_ICONS[d.id] ?? Zap,
        action: () => {
          if (
            d.category === 'playground' ||
            d.category === 'tools'
          ) {
            setActiveTab(d.category);
          } else if (d.category === 'learning' || d.category === 'resources') {
            setActiveTab(d.category);
          } else {
            setActiveTab('resources');
          }
        },
      });
    });

    // Learning modules
    LEARNING_MODULES.forEach((m, i) => {
      entries.push({
        id: `learn-${m.id}`,
        label: m.title,
        description: m.desc,
        category: CATEGORY_LABELS.learning,
        categoryKey: 'learning',
        icon: MODULE_ICONS[i] ?? BookOpen,
        action: () => setActiveTab('learn'),
      });
    });

    // Tools sub-items
    const TOOL_ITEMS = [
      { id: 'tool-cost', label: 'Симулятор затрат', desc: 'Расчёт стоимости API вызовов' },
      { id: 'tool-battle', label: 'Битва техник', desc: 'Сравнение техник 1v1' },
      { id: 'tool-decision', label: 'Дерево решений', desc: 'Выбор техники по сценарию' },
      { id: 'tool-benchmarks', label: 'Бенчмарки', desc: 'Сравнение по метрикам' },
      { id: 'tool-quickref', label: 'Шпаргалка', desc: 'Быстрый справочник' },
    ];
    const TOOL_ICONS_MAP: LucideIcon[] = [DollarSign, Swords, GitBranch, BarChart3, BookOpen];
    TOOL_ITEMS.forEach((t, i) => {
      entries.push({
        id: t.id,
        label: t.label,
        description: t.desc,
        category: CATEGORY_LABELS.tools,
        categoryKey: 'tools',
        icon: TOOL_ICONS_MAP[i] ?? Zap,
        action: () => setActiveTab('tools'),
      });
    });

    // Resources: Glossary
    GLOSSARY_TERMS.forEach((g) => {
      entries.push({
        id: `glossary-${g.term}`,
        label: g.term,
        description: g.def,
        category: CATEGORY_LABELS.resources,
        categoryKey: 'resources',
        icon: BookOpen,
        action: () => setActiveTab('resources'),
      });
    });

    // Resources: FAQ
    FAQ_ITEMS.forEach((f, i) => {
      entries.push({
        id: `faq-${i}`,
        label: f.q,
        description: 'Часто задаваемый вопрос',
        category: CATEGORY_LABELS.resources,
        categoryKey: 'resources',
        icon: HelpCircle,
        action: () => setActiveTab('resources'),
      });
    });

    // Resources: Community tips
    COMMUNITY_TIPS.forEach((c, i) => {
      entries.push({
        id: `community-${i}`,
        label: c.title,
        description: c.desc,
        category: CATEGORY_LABELS.resources,
        categoryKey: 'resources',
        icon: Lightbulb,
        action: () => setActiveTab('resources'),
      });
    });

    // Navigation tabs
    NAV_TABS.forEach((nav) => {
      entries.push({
        id: `nav-${nav.id}`,
        label: nav.label,
        description: nav.desc,
        category: CATEGORY_LABELS.navigation,
        categoryKey: 'navigation',
        icon: nav.icon,
        action: () => setActiveTab(nav.id),
      });
    });

    return entries;
  }, [setActiveTab, setSelectedTechnique]);

  const allEntries = buildEntries();

  // Group entries by categoryKey, preserving order
  const grouped = CATEGORY_ORDER.map((catKey) => {
    const items = allEntries.filter((e) => e.categoryKey === catKey);
    return { key: catKey, label: CATEGORY_LABELS[catKey], items };
  }).filter((g) => g.items.length > 0);

  return (
    <CommandDialog
      open={searchOpen}
      onOpenChange={setSearchOpen}
      title="Глобальный поиск"
      description="Поиск по всем разделам приложения"
      className="sm:max-w-xl"
    >
      <CommandInput
        placeholder="Введите запрос для поиска..."
        className="font-mono text-sm h-12"
      />
      <CommandList className="max-h-[420px] overflow-y-auto">
        <CommandEmpty className="py-8">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Search className="size-6 opacity-30" />
            <p className="font-mono text-sm">Ничего не найдено</p>
            <p className="font-mono text-xs opacity-60">Попробуйте другой запрос</p>
          </div>
        </CommandEmpty>

        {grouped.map((group, gi) => (
          <div key={group.key}>
            {gi > 0 && <CommandSeparator />}
            <CommandGroup heading={group.label}>
              {group.items.map((entry) => {
                const Icon = entry.icon;
                return (
                  <CommandItem
                    key={entry.id}
                    value={`${entry.label} ${entry.description}`}
                    onSelect={() => handleSelect(entry)}
                    className="font-mono text-xs gap-3 px-3 py-2.5 cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="size-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {entry.label}
                      </div>
                      <div className="text-muted-foreground truncate mt-0.5 opacity-70">
                        {entry.description}
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 shrink-0 uppercase tracking-wider font-mono">
                      {group.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ))}
      </CommandList>

      {/* Footer hint */}
      <div className="border-t border-border px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-4 select-none items-center rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
              ↑↓
            </kbd>
            навигация
          </span>
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-4 select-none items-center rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
              ↵
            </kbd>
            выбрать
          </span>
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-4 select-none items-center rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
              esc
            </kbd>
            закрыть
          </span>
        </span>
      </div>
    </CommandDialog>
  );
}
