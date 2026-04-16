'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useAppStore, type AppTab } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Landing
import HeroSection from '@/components/landing/HeroSection';
import TechniqueOverview from '@/components/landing/TechniqueOverview';
import TokenFlowComparison from '@/components/landing/TokenFlowComparison';
import HowToStart from '@/components/landing/HowToStart';
import KeyTakeaway from '@/components/landing/KeyTakeaway';

// Tools
import CostSimulator from '@/components/tools/CostSimulator';
import TechniqueBattle from '@/components/tools/TechniqueBattle';
import DecisionTree from '@/components/tools/DecisionTree';
import BenchmarksChart from '@/components/tools/BenchmarksChart';
import QuickReference from '@/components/tools/QuickReference';
import ApiMatrix from '@/components/tools/ApiMatrix';
import TokenCalculator from '@/components/tools/TokenCalculator';
import Recommender from '@/components/tools/Recommender';

// Playground
import LiveChatDemo from '@/components/playground/LiveChatDemo';
import InteractiveExplorer from '@/components/playground/InteractiveExplorer';

// Resources
import Glossary from '@/components/resources/Glossary';
import FaqAccordion from '@/components/resources/FaqAccordion';
import RoadmapSection from '@/components/resources/RoadmapSection';
import CommunityInsights from '@/components/resources/CommunityInsights';
import CaseStudies from '@/components/resources/CaseStudies';

// Learn
import PromptTemplates from '@/components/learn/PromptTemplates';
import QuickQuiz from '@/components/learn/QuickQuiz';

// Overlay
import GlobalSearch from '@/components/overlay/GlobalSearch';
import GuidedTour from '@/components/overlay/GuidedTour';

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

const TAB_CONFIG: { id: AppTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Обзор', icon: BookMarked },
  { id: 'learn', label: 'Обучение', icon: GraduationCap },
  { id: 'tools', label: 'Инструменты', icon: DollarSign },
  { id: 'playground', label: 'Песочница', icon: Play },
  { id: 'resources', label: 'Ресурсы', icon: Users },
];

const TOOLS_SUBTABS = [
  { id: 'cost-sim', label: 'Симулятор', icon: DollarSign },
  { id: 'battle', label: 'Битва', icon: Swords },
  { id: 'decision-tree', label: 'Дерево', icon: GitBranch },
  { id: 'api-matrix', label: 'API Матрица', icon: Database },
  { id: 'token-calc', label: 'Токены', icon: Calculator },
  { id: 'recommender', label: 'Советник', icon: ClipboardCheck },
  { id: 'benchmarks', label: 'Бенчмарки', icon: BarChart3 },
  { id: 'quick-ref', label: 'Шпаргалка', icon: BookOpen },
] as const;

const RESOURCES_SUBTABS = [
  { id: 'glossary', label: 'Глоссарий', icon: BookOpen },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'roadmap', label: 'Дорожная карта', icon: Clock },
  { id: 'case-studies', label: 'Кейсы', icon: Briefcase },
  { id: 'community', label: 'Сообщество', icon: Lightbulb },
] as const;

export default function Home() {
  const { activeTab, setActiveTab, setSearchOpen } = useAppStore();

  // Ctrl+K global search shortcut
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    },
    [setSearchOpen],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Sub-navigation tabs */}
      <nav className="border-b border-border bg-card/30 sticky top-14 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0.5 overflow-x-auto scrollbar-industrial -mb-px">
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'learn' && <LearnTab />}
        {activeTab === 'tools' && <ToolsTab />}
        {activeTab === 'playground' && <PlaygroundTab />}
        {activeTab === 'resources' && <ResourcesTab />}
      </main>

      <Footer />

      {/* Overlay dialogs */}
      <GlobalSearch />
      <GuidedTour />
    </div>
  );
}

/* ─────────── Overview Tab ─────────── */
function OverviewTab() {
  return (
    <div>
      <HeroSection />
      <TechniqueOverview />
      <TokenFlowComparison />
      <HowToStart />
      <KeyTakeaway />
    </div>
  );
}

/* ─────────── Learn Tab ─────────── */
function LearnTab() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
          Обучение
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
          Изучите техники управления памятью
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Пошаговое обучение от основ до продвинутых подходов. Каждый модуль включает теорию, визуализации и практические примеры.
        </p>
      </div>

      {/* Learning modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_MODULES.map((mod, i) => (
          <ModuleCard key={mod.id} module={mod} index={i} onClick={() => {
            const el = document.getElementById('learn-explorer');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }} />
        ))}
      </div>

      {/* Interactive explorer below */}
      <div className="mt-16" id="learn-explorer">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
          Интерактивный исследователь
        </p>
        <h3 className="text-lg font-bold font-mono mb-6">
          Пошаговая визуализация техник
        </h3>
        <InteractiveExplorer />
      </div>

      {/* Prompt Templates */}
      <div className="mt-16">
        <PromptTemplates />
      </div>

      {/* Glossary */}
      <div className="mt-16">
        <Glossary />
      </div>

      {/* Roadmap */}
      <div className="mt-16">
        <RoadmapSection />
      </div>

      {/* Quick Quiz */}
      <div className="mt-16">
        <QuickQuiz />
      </div>
    </div>
  );
}

const LEARNING_MODULES = [
  {
    id: 'basics',
    title: 'Основы контекстного окна',
    desc: 'Что такое токены, контекстное окно и почему LLM не имеют памяти.',
    difficulty: 'Базовый',
    time: '3 мин',
    icon: BookOpen,
  },
  {
    id: 'why-manage',
    title: 'Зачем управлять памятью',
    desc: 'Стоимость, скорость и качество — три причины для управления контекстом.',
    difficulty: 'Базовый',
    time: '5 мин',
    icon: DollarSign,
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    desc: 'Самый простой подход: хранение только последних N сообщений.',
    difficulty: 'Начинающий',
    time: '3 мин',
    icon: Swords,
  },
  {
    id: 'summarization',
    title: 'Суммаризация',
    desc: 'Первая настоящая техника: сжатие истории в краткое резюме.',
    difficulty: 'Средний',
    time: '7 мин',
    icon: MessageSquare,
  },
  {
    id: 'hierarchical',
    title: 'Иерархическая память',
    desc: 'Двухуровневая система: краткосрочная и долгосрочная память.',
    difficulty: 'Средний',
    time: '8 мин',
    icon: GitBranch,
  },
  {
    id: 'rag',
    title: 'RAG — Векторный поиск',
    desc: 'Эмбеддинги и косинусное сходство для точного поиска.',
    difficulty: 'Продвинутый',
    time: '10 мин',
    icon: BarChart3,
  },
  {
    id: 'fact-extraction',
    title: 'Извлечение фактов',
    desc: 'Автоматическое создание JSON-профиля пользователя.',
    difficulty: 'Продвинутый',
    time: '6 мин',
    icon: BookMarked,
  },
  {
    id: 'combined',
    title: 'Комбинированный подход',
    desc: 'Лучшая практика: сочетание нескольких техник.',
    difficulty: 'Продвинутый',
    time: '5 мин',
    icon: Lightbulb,
  },
];

function ModuleCard({
  module,
  index,
  onClick,
}: {
  module: (typeof LEARNING_MODULES)[number];
  index: number;
  onClick: () => void;
}) {
  const Icon = module.icon;
  const diffColor =
    module.difficulty === 'Базовый' || module.difficulty === 'Начинающий'
      ? 'border-emerald-500/30 text-emerald-500'
      : module.difficulty === 'Средний'
        ? 'border-amber-500/30 text-amber-500'
        : 'border-red-500/30 text-red-500';

  return (
    <button onClick={onClick} className="industrial-card p-5 flex gap-4 items-start group hover:border-primary/40 text-left w-full">
      <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-mono text-sm font-semibold truncate">
            {module.title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {module.desc}
        </p>
        <div className="flex gap-2 mt-3">
          <span
            className={`industrial-badge border ${diffColor}`}
          >
            {module.difficulty}
          </span>
          <span className="industrial-badge border border-border text-muted-foreground">
            {module.time}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─────────── Tools Tab ─────────── */
function ToolsTab() {
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToTool = useCallback((id: string) => {
    const el = toolRefs.current[id];
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
          Инструменты
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
          Калькуляторы, сравнения и анализ
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Рассчитайте стоимость, сравните техники и выберите оптимальную стратегию для вашего проекта.
        </p>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {TOOLS_SUBTABS.map((tool) => {
          const Icon = tool.icon;
          return (
            <ToolQuickCard key={tool.id} name={tool.label} icon={Icon} onClick={() => scrollToTool(tool.id)} />
          );
        })}
      </div>

      {/* All tools in sequence */}
      <div className="space-y-16">
        <div ref={(el) => { toolRefs.current['cost-sim'] = el; }}><CostSimulator /></div>
        <div ref={(el) => { toolRefs.current['token-calc'] = el; }}><TokenCalculator /></div>
        <div ref={(el) => { toolRefs.current['api-matrix'] = el; }}><ApiMatrix /></div>
        <div ref={(el) => { toolRefs.current['battle'] = el; }}><TechniqueBattle /></div>
        <div ref={(el) => { toolRefs.current['decision-tree'] = el; }}><DecisionTree /></div>
        <div ref={(el) => { toolRefs.current['recommender'] = el; }}><Recommender /></div>
        <div ref={(el) => { toolRefs.current['benchmarks'] = el; }}><BenchmarksChart /></div>
        <div ref={(el) => { toolRefs.current['quick-ref'] = el; }}><QuickReference /></div>
      </div>
    </div>
  );
}

function ToolQuickCard({
  name,
  icon: Icon,
  onClick,
}: {
  name: string;
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="industrial-card p-3 flex flex-col items-center gap-2 text-center cursor-pointer group w-full">
      <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-4 text-primary" />
      </div>
      <span className="text-xs font-mono font-medium">{name}</span>
    </button>
  );
}

/* ─────────── Playground Tab ─────────── */
function PlaygroundTab() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
          Песочница
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
          Экспериментируйте с техниками
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Попробуйте каждую технику в действии: переключайте подходы в живом чате, исследуйте пошаговые визуализации.
        </p>
      </div>

      <div className="space-y-16">
        <LiveChatDemo />
        <InteractiveExplorer />
      </div>
    </div>
  );
}

/* ─────────── Resources Tab ─────────── */
function ResourcesTab() {
  const resRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToRes = useCallback((id: string) => {
    const el = resRefs.current[id];
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
          Ресурсы
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
          Справочные материалы и сообщество
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Глоссарий, FAQ, дорожная карта и советы от сообщества разработчиков.
        </p>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {RESOURCES_SUBTABS.map((res) => {
          const Icon = res.icon;
          return (
            <button
              key={res.id}
              onClick={() => scrollToRes(res.id)}
              className="industrial-card p-3 flex flex-col items-center gap-2 text-center cursor-pointer group w-full"
            >
              <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="size-4 text-primary" />
              </div>
              <span className="text-xs font-mono font-medium">{res.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-16">
        <div ref={(el) => { resRefs.current['glossary'] = el; }}><Glossary /></div>
        <div ref={(el) => { resRefs.current['faq'] = el; }}><FaqAccordion /></div>
        <div ref={(el) => { resRefs.current['roadmap'] = el; }}><RoadmapSection /></div>
        <div ref={(el) => { resRefs.current['case-studies'] = el; }}><CaseStudies /></div>
        <div ref={(el) => { resRefs.current['community'] = el; }}><CommunityInsights /></div>
      </div>
    </div>
  );
}
