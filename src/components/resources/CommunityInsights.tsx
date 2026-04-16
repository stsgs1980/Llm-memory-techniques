'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertTriangle, Star, Users } from 'lucide-react';

const TIPS = [
  { title: 'Устанавливайте бюджет токенов', desc: 'Определите максимальное количество токенов на запрос до начала разработки.', author: 'Алексей Р.', tags: ['Бюджетирование', 'Планирование'], type: 'best-practice' },
  { title: 'Комбинируйте RAG + суммаризацию', desc: 'Точность извлечения + экономия токенов = лучшее из обоих миров.', author: 'Мария К.', tags: ['Суммаризация', 'RAG'], type: 'tip' },
  { title: 'Не игнорируйте переполнение контекста', desc: 'Проверяйте размер контекста перед отправкой. Реализуйте graceful degradation.', author: 'Дмитрий С.', tags: ['Контекст', 'Ошибки'], type: 'warning' },
  { title: 'Кэшируйте саммари между запросами', desc: 'Сохраняйте промежуточные саммари. Экономия может достигать 60-80%.', author: 'Ольга В.', tags: ['Кэширование', 'Оптимизация'], type: 'tip' },
  { title: 'Мониторинг токенов в production', desc: 'Создайте middleware для подсчёта токенов. Логируйте в Prometheus/Grafana.', author: 'Елена М.', tags: ['Мониторинг', 'Продакшн'], type: 'best-practice' },
  { title: 'Не хардкодьте размеры контекста', desc: 'Используйте конфигурацию для лимитов. GPT-4: 128K, Claude: 200K, Gemini: 1M.', author: 'Сергей Т.', tags: ['Конфигурация'], type: 'warning' },
  { title: 'Версионируйте промпты вместе с кодом', desc: 'Храните промпты в отдельных файлах рядом с кодом. Используйте git.', author: 'Павел Н.', tags: ['Промпты', 'Версионирование'], type: 'best-practice' },
  { title: 'Начните с простого sliding window', desc: 'Для базовых чат-ботов достаточно 10-15 последних сообщений.', author: 'Игорь П.', tags: ['Базовый'], type: 'tip' },
];

const FILTER_TABS = [
  { id: 'all', label: 'Все' },
  { id: 'best-practice', label: 'Лучшие практики' },
  { id: 'tip', label: 'Советы' },
  { id: 'warning', label: 'Предупреждения' },
] as const;

const TYPE_CONFIG: Record<string, { icon: typeof Star; colorClass: string; label: string }> = {
  'best-practice': {
    icon: Star,
    colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    label: 'Лучшая практика',
  },
  tip: {
    icon: Lightbulb,
    colorClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    label: 'Совет',
  },
  warning: {
    icon: AlertTriangle,
    colorClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    label: 'Предупреждение',
  },
};

export default function CommunityInsights() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTips = useMemo(() => {
    if (activeFilter === 'all') return TIPS;
    return TIPS.filter(t => t.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm text-primary tracking-wider">СООБЩЕСТВО</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Советы и лучшие практики от сообщества
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3 py-1 text-xs font-mono rounded-sm border transition-colors ${
              activeFilter === tab.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            {tab.label}
            <span className="ml-1 opacity-60">
              ({tab.id === 'all' ? TIPS.length : TIPS.filter(t => t.type === tab.id).length})
            </span>
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredTips.map((tip, index) => {
          const config = TYPE_CONFIG[tip.type];
          const TypeIcon = config.icon;

          return (
            <Card key={index} className="industrial-card animate-industrial-slide-up">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`font-mono text-[10px] flex items-center gap-1 ${config.colorClass}`}
                  >
                    <TypeIcon className="h-3 w-3" />
                    {config.label}
                  </Badge>
                </div>

                <h3 className="font-mono text-sm font-medium text-foreground mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {tip.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tip.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="font-mono text-[9px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0 ml-2">
                    — {tip.author}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-mono">Нет советов в этой категории</p>
        </div>
      )}
    </div>
  );
}
