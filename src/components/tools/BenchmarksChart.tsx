'use client';

import { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TECHNIQUES } from '@/lib/constants';

const RADAR_DATA = [
  {
    metric: 'Экономия',
    summarization: 80,
    hierarchical: 70,
    rag: 90,
    'fact-extraction': 95,
    'sliding-window': 50,
    'semantic-cache': 90,
  },
  {
    metric: 'Скорость',
    summarization: 60,
    hierarchical: 50,
    rag: 65,
    'fact-extraction': 85,
    'sliding-window': 95,
    'semantic-cache': 98,
  },
  {
    metric: 'Простота',
    summarization: 90,
    hierarchical: 50,
    rag: 20,
    'fact-extraction': 30,
    'sliding-window': 100,
    'semantic-cache': 60,
  },
  {
    metric: 'Масштаб.',
    summarization: 60,
    hierarchical: 70,
    rag: 95,
    'fact-extraction': 80,
    'sliding-window': 20,
    'semantic-cache': 70,
  },
  {
    metric: 'Надёжн.',
    summarization: 75,
    hierarchical: 80,
    rag: 70,
    'fact-extraction': 65,
    'sliding-window': 30,
    'semantic-cache': 55,
  },
];

const TECH_COLORS: Record<string, string> = {
  summarization: '#f59e0b',
  hierarchical: '#06b6d4',
  rag: '#8b5cf6',
  'fact-extraction': '#22c55e',
  'sliding-window': '#ef4444',
  'semantic-cache': '#f97316',
};

const TECH_DISPLAY: Record<string, string> = {
  summarization: 'Саммари',
  hierarchical: 'Иерархия',
  rag: 'RAG',
  'fact-extraction': 'Факты',
  'sliding-window': 'Окно',
  'semantic-cache': 'Кэш',
};

const INSIGHTS = [
  {
    label: 'Лучший баланс',
    value: 'Суммаризация',
    desc: 'Высокая экономия, простота реализации и надёжность',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    label: 'Максимальная экономия',
    value: 'Извлечение фактов',
    desc: 'До 99% экономии токенов с сохранением персонализации',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    label: 'Самый быстрый',
    value: 'Семантический кэш',
    desc: 'Почти нулевая задержка при попавших в кэш запросах',
    color: 'border-orange-500/30 bg-orange-500/5',
  },
  {
    label: 'Лучше всего масштабируется',
    value: 'RAG',
    desc: 'Обрабатывает миллионы записей без потери качества',
    color: 'border-violet-500/30 bg-violet-500/5',
  },
];

export default function BenchmarksChart() {
  const [activeTechs, setActiveTechs] = useState<string[]>([
    'summarization',
    'rag',
    'sliding-window',
  ]);

  const toggleTech = (id: string) => {
    setActiveTechs((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          БЕНЧМАРКИ
        </h2>
        <p className="text-muted-foreground text-sm">
          Сравнение 6 техник по ключевым показателям
        </p>
      </div>

      {/* Technique Filter */}
      <div className="flex flex-wrap gap-2">
        {TECHNIQUES.map((t) => {
          const isActive = activeTechs.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => toggleTech(t.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded-sm transition-all duration-200 ${
                isActive
                  ? 'border-primary/50 bg-primary/10 text-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-muted-foreground/50'
              }`}
            >
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: TECH_COLORS[t.id] }}
              />
              {t.shortName}
            </button>
          );
        })}
      </div>

      {/* Radar Chart */}
      <div className="industrial-card p-6">
        <div className="w-full h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="oklch(0.78 0.005 80)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{
                  fill: 'oklch(0.52 0.01 60)',
                  fontSize: 12,
                  fontFamily: 'monospace',
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              {activeTechs.map((techId) => (
                <Radar
                  key={techId}
                  name={TECH_DISPLAY[techId]}
                  dataKey={techId}
                  stroke={TECH_COLORS[techId]}
                  fill={TECH_COLORS[techId]}
                  fillOpacity={activeTechs.length === 1 ? 0.3 : 0.1}
                  strokeWidth={2}
                />
              ))}
              <Legend
                wrapperStyle={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INSIGHTS.map((insight) => (
          <div
            key={insight.label}
            className={`industrial-card p-4 border ${insight.color}`}
          >
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
              {insight.label}
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">
              {insight.value}
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              {insight.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
