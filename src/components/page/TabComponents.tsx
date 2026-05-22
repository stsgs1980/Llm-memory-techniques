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
    <div className="zai-section">
      <div className="zai-section-header">
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-muted)',
          marginBottom: 'var(--zai-space-2)'
        }}>Learning</p>
        <h2 className="zai-section-title">Master Memory Techniques</h2>
        <p className="zai-section-desc">
          Step-by-step learning from basics to advanced approaches. Each module includes theory, visualizations, and practical examples.
        </p>
      </div>
      <div className="zai-grid zai-grid-2">
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
      <div style={{ marginTop: 'var(--fib-13)' }} id="learn-explorer">
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-muted)',
          marginBottom: 'var(--zai-space-2)'
        }}>Interactive Explorer</p>
        <h3 style={{
          fontSize: 'var(--zai-font-size-6)',
          fontWeight: 600,
          color: 'var(--zai-color-text-primary)',
          marginBottom: 'var(--zai-space-6)'
        }}>Step-by-Step Visualization</h3>
        <InteractiveExplorer />
      </div>
      <div style={{ marginTop: 'var(--fib-13)' }}><PromptTemplates /></div>
      <div style={{ marginTop: 'var(--fib-13)' }}><Glossary /></div>
      <div style={{ marginTop: 'var(--fib-13)' }}><RoadmapSection /></div>
      <div style={{ marginTop: 'var(--fib-13)' }}><QuickQuiz /></div>
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
    <div className="zai-section">
      <div className="zai-section-header">
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-muted)',
          marginBottom: 'var(--zai-space-2)'
        }}>Tools</p>
        <h2 className="zai-section-title">Calculators & Analysis</h2>
        <p className="zai-section-desc">
          Calculate costs, compare techniques, and choose the optimal strategy for your project.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: 'var(--zai-space-3)',
        marginBottom: 'var(--fib-8)'
      }}>
        {TOOLS_SUBTABS.map((tool) => (
          <ToolQuickCard key={tool.id} name={tool.label} icon={tool.icon} onClick={() => scrollToTool(tool.id)} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fib-13)' }}>
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
    <div className="zai-section">
      <div className="zai-section-header">
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-muted)',
          marginBottom: 'var(--zai-space-2)'
        }}>Playground</p>
        <h2 className="zai-section-title">Experiment with Techniques</h2>
        <p className="zai-section-desc">
          Try each technique in action: switch approaches in live chat, explore step-by-step visualizations.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fib-13)' }}>
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
    <div className="zai-section">
      <div className="zai-section-header">
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-muted)',
          marginBottom: 'var(--zai-space-2)'
        }}>Resources</p>
        <h2 className="zai-section-title">Reference & Community</h2>
        <p className="zai-section-desc">
          Glossary, FAQ, roadmap, and tips from the developer community.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--zai-space-3)',
        marginBottom: 'var(--fib-8)'
      }}>
        {RESOURCES_SUBTABS.map((res) => (
          <button 
            key={res.id} 
            onClick={() => scrollToRes(res.id)} 
            className="zai-card"
            style={{
              padding: 'var(--zai-space-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--zai-space-3)',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--zai-radius-lg)',
              background: 'var(--zai-color-bg-secondary)',
              border: '1px solid var(--zai-color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <res.icon style={{ 
                width: 20, 
                height: 20, 
                color: 'var(--zai-color-text-muted)' 
              }} />
            </div>
            <span style={{
              fontSize: 'var(--zai-font-size-2)',
              fontWeight: 500,
              color: 'var(--zai-color-text-muted)'
            }}>{res.label}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fib-13)' }}>
        <div ref={(el) => { resRefs.current['glossary'] = el; }}><Glossary /></div>
        <div ref={(el) => { resRefs.current['faq'] = el; }}><FaqAccordion /></div>
        <div ref={(el) => { resRefs.current['roadmap'] = el; }}><RoadmapSection /></div>
        <div ref={(el) => { resRefs.current['case-studies'] = el; }}><CaseStudies /></div>
        <div ref={(el) => { resRefs.current['community'] = el; }}><CommunityInsights /></div>
      </div>
    </div>
  );
}
