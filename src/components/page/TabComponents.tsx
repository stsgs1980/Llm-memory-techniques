'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { TOOLS_SUBTABS, RESOURCES_SUBTABS, LEARNING_MODULES } from '@/data/navigation';
import { ModuleCard, ToolQuickCard } from './ModuleCard';
import { BackButton, ScrollToTop, BreadcrumbNav } from '@/components/ui/BackButton';
import { ArrowUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';

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

export function OverviewTab() {
  return (
    <div>
      <HeroSection />
      <TechniqueOverview />
      <TokenFlowComparison />
      <HowToStart />
      <KeyTakeaway />
      <ScrollToTopButton />
    </div>
  );
}

export function LearnTab() {
  const { activeTab, setActiveTab } = useAppStore();
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav 
        items={[
          { label: 'Главная', onClick: () => setActiveTab('overview') },
          { label: 'Обучение' }
        ]} 
        className="mb-6"
      />
      
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Обучение</p>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">Изучите техники управления памятью</h2>
          </div>
          <BackButton variant="back" onClick={() => setActiveTab('overview')} />
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Пошаговое обучение от основ до продвинутых подходов. Каждый модуль включает теорию, визуализации и практические примеры.
        </p>
      </div>
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
      <div className="mt-16" id="learn-explorer">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Интерактивный исследователь</p>
        <h3 className="text-lg font-bold font-mono mb-6">Пошаговая визуализация техник</h3>
        <InteractiveExplorer />
      </div>
      <div className="mt-16"><PromptTemplates /></div>
      <div className="mt-16"><Glossary /></div>
      <div className="mt-16"><RoadmapSection /></div>
      <div className="mt-16"><QuickQuiz /></div>
      
      {/* Scroll to Top */}
      <ScrollToTopButton />
    </div>
  );
}

export function ToolsTab() {
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { activeTab, setActiveTab } = useAppStore();

  const scrollToTool = useCallback((id: string) => {
    const el = toolRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav 
        items={[
          { label: 'Главная', onClick: () => setActiveTab('overview') },
          { label: 'Инструменты' }
        ]} 
        className="mb-6"
      />
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Инструменты</p>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">Калькуляторы, сравнения и анализ</h2>
          </div>
          <BackButton variant="back" onClick={() => setActiveTab('overview')} />
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Рассчитайте стоимость, сравните техники и выберите оптимальную стратегию для вашего проекта.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {TOOLS_SUBTABS.map((tool) => (
          <ToolQuickCard key={tool.id} name={tool.label} icon={tool.icon} onClick={() => scrollToTool(tool.id)} />
        ))}
      </div>
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
      
      {/* Scroll to Top */}
      <ScrollToTopButton />
    </div>
  );
}

export function PlaygroundTab() {
  const { setActiveTab } = useAppStore();
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav 
        items={[
          { label: 'Главная', onClick: () => setActiveTab('overview') },
          { label: 'Песочница' }
        ]} 
        className="mb-6"
      />
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Песочница</p>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">Экспериментируйте с техниками</h2>
          </div>
          <BackButton variant="back" onClick={() => setActiveTab('overview')} />
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Попробуйте каждую технику в действии: переключайте подходы в живом чате, исследуйте пошаговые визуализации.
        </p>
      </div>
      <div className="space-y-16">
        <LiveChatDemo />
        <InteractiveExplorer />
      </div>
      
      {/* Scroll to Top */}
      <ScrollToTopButton />
    </div>
  );
}

export function ResourcesTab() {
  const resRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { activeTab, setActiveTab } = useAppStore();

  const scrollToRes = useCallback((id: string) => {
    const el = resRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav 
        items={[
          { label: 'Главная', onClick: () => setActiveTab('overview') },
          { label: 'Ресурсы' }
        ]} 
        className="mb-6"
      />
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Ресурсы</p>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">Справочные материалы и сообщество</h2>
          </div>
          <BackButton variant="back" onClick={() => setActiveTab('overview')} />
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Глоссарий, FAQ, дорожная карта и советы от сообщества разработчиков.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {RESOURCES_SUBTABS.map((res) => (
          <button key={res.id} onClick={() => scrollToRes(res.id)} className="industrial-card p-3 flex flex-col items-center gap-2 text-center cursor-pointer group w-full">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <res.icon className="size-4 text-primary" />
            </div>
            <span className="text-xs font-mono font-medium">{res.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-16">
        <div ref={(el) => { resRefs.current['glossary'] = el; }}><Glossary /></div>
        <div ref={(el) => { resRefs.current['faq'] = el; }}><FaqAccordion /></div>
        <div ref={(el) => { resRefs.current['roadmap'] = el; }}><RoadmapSection /></div>
        <div ref={(el) => { resRefs.current['case-studies'] = el; }}><CaseStudies /></div>
        <div ref={(el) => { resRefs.current['community'] = el; }}><CommunityInsights /></div>
      </div>
      
      {/* Scroll to Top */}
      <ScrollToTopButton />
    </div>
  );
}

/* ────────────────────────────────────────────
   Scroll to Top Button Component
   Shows when scrolling down
   ──────────────────────────────────────────── */

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        glassmorphism-card
        flex items-center justify-center
        text-primary hover:text-foreground
        hover:border-primary/40
        transition-all duration-200
        shadow-lg shadow-black/30
        animate-amber-fade-in
      "
      aria-label="Прокрутить наверх"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}


