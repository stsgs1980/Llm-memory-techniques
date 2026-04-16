'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

interface TokenEntry {
  name: string
  tokens: number
  savings: string
  color: string
}

const TOKEN_DATA: TokenEntry[] = [
  { name: 'Без управления', tokens: 8000, savings: '—', color: 'oklch(0.55 0.01 250)' },
  { name: 'Sliding Window', tokens: 3200, savings: '60%', color: '#ef4444' },
  { name: 'Суммаризация', tokens: 1200, savings: '85%', color: '#f59e0b' },
  { name: 'Иерархическая', tokens: 2000, savings: '75%', color: '#06b6d4' },
  { name: 'RAG', tokens: 600, savings: '92.5%', color: '#8b5cf6' },
  { name: 'Извлечение фактов', tokens: 300, savings: '96.25%', color: '#22c55e' },
]

const MAX_TOKENS = 8000

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function TokenFlowComparison() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8">
      <div>
        {/* Header */}
        <div className="text-sm font-mono font-medium text-primary uppercase tracking-widest">
          СРАВНЕНИЕ РАСХОДА ТОКЕНОВ
        </div>
        <p className="text-muted-foreground mt-2">
          Для диалога из 50 сообщений (~8 000 токенов истории)
        </p>

        {/* Bar Chart */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 space-y-3"
        >
          {TOKEN_DATA.map((entry) => {
            const pct = (entry.tokens / MAX_TOKENS) * 100

            return (
              <motion.div key={entry.name} variants={item} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-foreground">
                    {entry.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {entry.tokens.toLocaleString('ru-RU')} токенов
                    </span>
                    {entry.savings !== '—' && (
                      <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        −{entry.savings}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-8 bg-secondary rounded-sm overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-sm relative"
                    style={{ backgroundColor: entry.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {/* Animated token flow overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 10px)',
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Insight Box */}
        <div className="industrial-card p-5 mt-10">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-primary" />
            <span className="font-mono text-xs text-primary uppercase tracking-wider font-medium">
              Ключевые выводы
            </span>
          </div>
          <ul className="space-y-2">
            {[
              'Факты сокращают расход на 96% — с 8 000 до 300 токенов',
              'RAG сохраняет детали, которые суммаризация теряет',
              'Комбинируйте: суммаризация + RAG = баланс экономии и качества',
            ].map((insight) => (
              <li
                key={insight}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary mt-1.5 shrink-0">—</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
