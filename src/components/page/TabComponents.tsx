'use client';

import { useRef, useCallback } from 'react';
import { TOOLS_SUBTABS, RESOURCES_SUBTABS, LEARNING_MODULES } from '@/data/navigation';
import { ModuleCard, ToolQuickCard } from './ModuleCard';

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
    </div>
  );
}

export function LearnTab() {
  return (
    <div className="vercel-section">
      <div className="vercel-section-header">
        <p className="text-sm text-[#a0a0a0] mb-2">Learning</p>
        <h2 className="vercel-section-title">Master Memory Techniques</h2>
        <p className="vercel-section-desc">
          Step-by-step learning from basics to advanced approaches. Each module includes theory, visualizations, and practical examples.
        </p>
      </div>
      <div className="vercel-grid vercel-grid-2">
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
      <div className="mt-24" id="learn-explorer">
        <p className="text-sm text-[#a0a0a0] mb-2">Interactive Explorer</p>
        <h3 className="text-xl font-semibold text-white mb-6">Step-by-Step Visualization</h3>
        <InteractiveExplorer />
      </div>
      <div className="mt-24"><PromptTemplates /></div>
      <div className="mt-24"><Glossary /></div>
      <div className="mt-24"><RoadmapSection /></div>
      <div className="mt-24"><QuickQuiz /></div>
    </div>
  );
}

export function ToolsTab() {
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToTool = useCallback((id: string) => {
    const el = toolRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="vercel-section">
      <div className="vercel-section-header">
        <p className="text-sm text-[#a0a0a0] mb-2">Tools</p>
        <h2 className="vercel-section-title">Calculators & Analysis</h2>
        <p className="vercel-section-desc">
          Calculate costs, compare techniques, and choose the optimal strategy for your project.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-12">
        {TOOLS_SUBTABS.map((tool) => (
          <ToolQuickCard key={tool.id} name={tool.label} icon={tool.icon} onClick={() => scrollToTool(tool.id)} />
        ))}
      </div>
      <div className="space-y-24">
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

export function PlaygroundTab() {
  return (
    <div className="vercel-section">
      <div className="vercel-section-header">
        <p className="text-sm text-[#a0a0a0] mb-2">Playground</p>
        <h2 className="vercel-section-title">Experiment with Techniques</h2>
        <p className="vercel-section-desc">
          Try each technique in action: switch approaches in live chat, explore step-by-step visualizations.
        </p>
      </div>
      <div className="space-y-24">
        <LiveChatDemo />
        <InteractiveExplorer />
      </div>
    </div>
  );
}

export function ResourcesTab() {
  const resRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToRes = useCallback((id: string) => {
    const el = resRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="vercel-section">
      <div className="vercel-section-header">
        <p className="text-sm text-[#a0a0a0] mb-2">Resources</p>
        <h2 className="vercel-section-title">Reference & Community</h2>
        <p className="vercel-section-desc">
          Glossary, FAQ, roadmap, and tips from the developer community.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        {RESOURCES_SUBTABS.map((res) => (
          <button 
            key={res.id} 
            onClick={() => scrollToRes(res.id)} 
            className="vercel-card p-4 flex flex-col items-center gap-3 text-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center group-hover:border-[#333333] transition-colors">
              <res.icon className="w-5 h-5 text-[#a0a0a0]" />
            </div>
            <span className="text-sm font-medium text-[#a0a0a0]">{res.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-24">
        <div ref={(el) => { resRefs.current['glossary'] = el; }}><Glossary /></div>
        <div ref={(el) => { resRefs.current['faq'] = el; }}><FaqAccordion /></div>
        <div ref={(el) => { resRefs.current['roadmap'] = el; }}><RoadmapSection /></div>
        <div ref={(el) => { resRefs.current['case-studies'] = el; }}><CaseStudies /></div>
        <div ref={(el) => { resRefs.current['community'] = el; }}><CommunityInsights /></div>
      </div>
    </div>
  );
}
