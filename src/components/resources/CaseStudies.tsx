'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Briefcase,
  TrendingUp,
  Users,
  Code2,
  BarChart3,
  ArrowRight,
  Filter,
  Layers,
  Building2,
} from 'lucide-react';
import { CASE_STUDIES, ALL_TECHNIQUES, ALL_INDUSTRIES, TECHNIQUE_COLORS, INDUSTRY_ICONS, MetricBar as MetricBarType } from '@/data/case-studies';
import { useCaseStudies } from '@/hooks/useCaseStudies';

function MetricBar({ metric }: { metric: MetricBarType }) {
  const maxVal = Math.max(metric.before, metric.after);
  const beforePct = maxVal > 0 ? (metric.before / maxVal) * 100 : 0;
  const afterPct = maxVal > 0 ? (metric.after / maxVal) * 100 : 0;
  const improved = metric.lowerIsBetter ? metric.after < metric.before : metric.after > metric.before;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-foreground">{metric.label}</span>
        <span className={`text-[11px] font-mono font-medium ${improved ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
          {metric.lowerIsBetter ? `-${Math.round(((metric.before - metric.after) / metric.before) * 100)}%` : `+${Math.round(((metric.after - metric.before) / metric.before) * 100)}%`}
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground/70 w-12 flex-shrink-0">Before</span>
          <div className="flex-1 h-2.5 bg-muted/50 rounded-sm overflow-hidden">
            <div className="h-full bg-muted-foreground/30 rounded-sm transition-all duration-700" style={{ width: `${Math.max(beforePct, 3)}%` }} />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground w-16 text-right flex-shrink-0">{metric.before}{metric.unit}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-primary/70 w-12 flex-shrink-0">After</span>
          <div className="flex-1 h-2.5 bg-primary/5 rounded-sm overflow-hidden">
            <div className={`h-full rounded-sm transition-all duration-700 ${improved ? 'bg-primary/70' : 'bg-red-400/50 dark:bg-red-500/40'}`} style={{ width: `${Math.max(afterPct, 3)}%` }} />
          </div>
          <span className="text-[10px] font-mono text-primary w-16 text-right flex-shrink-0 font-medium">{metric.after}{metric.unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const {
    techniqueFilter,
    industryFilter,
    filteredStudies,
    hasActiveFilter,
    clearFilters,
    toggleTechniqueFilter,
    toggleIndustryFilter,
    totalStudies,
  } = useCaseStudies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-primary tracking-wider">CASE STUDIES</span>
            <span className="text-xs text-muted-foreground font-mono">({filteredStudies.length}/{totalStudies})</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-lg">
            Real-world applications of LLM memory techniques across industries — with metrics, implementation details, and key takeaways.
          </p>
        </div>
        {hasActiveFilter && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="font-mono text-xs h-7">Clear filters</Button>
        )}
      </div>

      {/* Technique Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Filter by technique</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => toggleTechniqueFilter(null)} className={`px-2.5 py-1 text-[11px] font-mono rounded-sm border transition-colors ${techniqueFilter === null ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:border-primary/50'}`}>All techniques</button>
          {ALL_TECHNIQUES.map((tech) => (
            <button key={tech} onClick={() => toggleTechniqueFilter(techniqueFilter === tech ? null : tech)} className={`px-2.5 py-1 text-[11px] font-mono rounded-sm border transition-colors ${techniqueFilter === tech ? TECHNIQUE_COLORS[tech] || 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:border-primary/50'}`}>{tech}</button>
          ))}
        </div>
      </div>

      {/* Industry Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Building2 className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Filter by industry</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => toggleIndustryFilter(null)} className={`px-2.5 py-1 text-[11px] font-mono rounded-sm border transition-colors ${industryFilter === null ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:border-primary/50'}`}>All industries</button>
          {ALL_INDUSTRIES.map((ind) => {
            const IndIcon = INDUSTRY_ICONS[ind] || Building2;
            return (
              <button key={ind} onClick={() => toggleIndustryFilter(industryFilter === ind ? null : ind)} className={`px-2.5 py-1 text-[11px] font-mono rounded-sm border transition-colors flex items-center gap-1.5 ${industryFilter === ind ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:border-primary/50'}`}>
                <IndIcon className="h-3 w-3" />
                {ind}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Studies Accordion */}
      <Accordion type="multiple" className="space-y-3">
        {filteredStudies.map((cs, index) => {
          const IndustryIcon = cs.industryIcon;
          return (
            <AccordionItem key={cs.id} value={cs.id} className="industrial-card border-0 px-0 data-[state=open]:border-primary/30 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 sm:px-5 sm:py-4 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]>svg]:text-primary">
                <div className="flex items-start gap-3 text-left flex-1 min-w-0">
                  <span className="font-mono text-xs text-primary/50 flex-shrink-0 mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-mono text-sm font-medium text-foreground">{cs.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="font-mono text-[10px] bg-muted/50 border-border flex items-center gap-1"><IndustryIcon className="h-2.5 w-2.5" />{cs.industry}</Badge>
                      <Badge variant="outline" className="font-mono text-[10px] flex items-center gap-1"><Users className="h-2.5 w-2.5" />{cs.company}</Badge>
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {cs.techniques.map((tech) => (<Badge key={tech} variant="outline" className={`font-mono text-[10px] ${TECHNIQUE_COLORS[tech] || ''}`}>{tech}</Badge>))}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">{cs.headlineResult}</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-5 pb-4 pt-0">
                <div className="ml-5 sm:ml-6 mr-1 animate-industrial-slide-up space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-red-400" /><span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Problem</span></div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-2.5 border-l-2 border-red-400/30">{cs.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5"><BarChart3 className="h-3 w-3 text-primary" /><span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Before / After Metrics</span></div>
                    <Card className="bg-muted/20 border-border/50">
                      <CardContent className="p-4 space-y-3">{cs.metrics.map((metric, i) => (<MetricBar key={i} metric={metric} />))}</CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5"><Code2 className="h-3 w-3 text-primary" /><span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Implementation Details</span></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.details}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5"><Layers className="h-3 w-3 text-primary" /><span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Tech Stack</span></div>
                    <div className="flex gap-1.5 flex-wrap">{cs.toolsUsed.map((tool) => (<Badge key={tool} variant="outline" className="font-mono text-[10px] bg-background">{tool}</Badge>))}</div>
                  </div>
                  <div className="rounded-sm bg-primary/5 border border-primary/15 p-4">
                    <div className="flex items-center gap-1.5 mb-2"><ArrowRight className="h-3 w-3 text-primary" /><span className="text-[11px] font-mono text-primary uppercase tracking-wider font-medium">Key Takeaway</span></div>
                    <p className="text-sm text-foreground/80 leading-relaxed font-mono">{cs.takeaway}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Filter className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-mono">No case studies match the selected filters</p>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="font-mono text-xs mt-3">Clear all filters</Button>
        </div>
      )}

      {/* Summary Stats */}
      <Card className="industrial-card bg-muted/20">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Cross-Case Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center"><div className="font-mono text-2xl font-bold text-primary">8</div><div className="text-[10px] font-mono text-muted-foreground mt-0.5">Case Studies</div></div>
            <div className="text-center"><div className="font-mono text-2xl font-bold text-primary">6</div><div className="text-[10px] font-mono text-muted-foreground mt-0.5">Techniques Used</div></div>
            <div className="text-center"><div className="font-mono text-2xl font-bold text-primary">8</div><div className="text-[10px] font-mono text-muted-foreground mt-0.5">Industries</div></div>
            <div className="text-center"><div className="font-mono text-2xl font-bold text-primary">92%</div><div className="text-[10px] font-mono text-muted-foreground mt-0.5">Avg Improvement</div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
