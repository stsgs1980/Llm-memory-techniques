'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Rocket } from 'lucide-react';

const MILESTONES = [
  { year: '2020', title: 'GPT-3 (2K токены)', desc: 'Начало эры LLM. Контекстное окно всего 2048 токенов.', status: 'past' },
  { year: '2021', title: 'Prompt Engineering', desc: 'Ручные техники управления контекстом: Chain-of-Thought, Few-shot.', status: 'past' },
  { year: '2022', title: 'LangChain и фреймворки', desc: 'Первые стандартизированные абстракции для памяти LLM.', status: 'past' },
  { year: '2023', title: 'GPT-4 + RAG', desc: '128K контекст + векторный поиск стали стандартом.', status: 'past' },
  { year: '2024', title: 'Mem0, Letta', desc: 'Специализированные AI-системы для автоматического управления памятью.', status: 'past' },
  { year: '2025', title: 'Комбинированные подходы', desc: 'Мультиагентная память и самооптимизация.', status: 'past' },
  { year: '2026', title: 'Адаптивная память', desc: 'Автоматический выбор стратегии на основе контекста запроса.', status: 'current' },
  { year: '2027+', title: 'Бесконечный контекст', desc: 'Мемориальные сети и нейросимволические архитектуры.', status: 'future' },
];

export default function RoadmapSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm text-primary tracking-wider">ДОРОЖНАЯ КАРТА</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">Эволюция памяти LLM</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-border" />
        <div
          className="absolute left-4 md:left-6 top-2 w-px"
          style={{
            height: `${(MILESTONES.filter(m => m.status === 'past').length / MILESTONES.length) * 100}%`,
            backgroundColor: 'var(--primary)',
            opacity: 0.4,
          }}
        />

        <div className="space-y-6">
          {MILESTONES.map((milestone, index) => {
            const isCurrent = milestone.status === 'current';
            const isFuture = milestone.status === 'future';
            const isPast = milestone.status === 'past';

            return (
              <div key={index} className="relative flex gap-4 md:gap-6 animate-industrial-slide-up">
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div
                    className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                      isPast
                        ? 'bg-primary border-primary'
                        : isCurrent
                          ? 'bg-primary border-primary animate-industrial-pulse'
                          : 'bg-background border-border'
                    }`}
                    style={isFuture ? { borderStyle: 'dashed' } : {}}
                  >
                    {isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <Card
                    className={`industrial-card overflow-hidden ${
                      isCurrent ? 'industrial-glow' : ''
                    } ${isFuture ? 'opacity-60' : ''}`}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <Badge
                          variant="outline"
                          className={`font-mono text-xs flex-shrink-0 ${
                            isCurrent
                              ? 'bg-primary/10 text-primary border-primary/30'
                              : isPast
                                ? 'bg-primary/5 text-primary/70 border-primary/20'
                                : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {milestone.year}
                        </Badge>
                        {isCurrent && (
                          <Badge className="font-mono text-[10px] bg-primary text-primary-foreground animate-industrial-pulse">
                            МЫ ЗДЕСЬ
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-mono text-sm font-medium text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
