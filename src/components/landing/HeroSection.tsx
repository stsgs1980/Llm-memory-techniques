'use client'

import { motion } from 'framer-motion'
import { Brain, Layers, Database, FileJson, Scissors, Zap, ArrowRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function HeroSection() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 industrial-grid">
      <div>
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="industrial-badge border-primary/50 text-primary">
            ИНТЕРАКТИВНЫЙ ГИД
          </span>
        </motion.div>

        {/* Main Heading */}
        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight">
            Управление памятью LLM
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light mt-3">
            как заставить модель
          </p>
          <p className="text-3xl md:text-4xl font-bold mt-1">
            <span className="industrial-text-gradient">помнить всё</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mt-6 text-base md:text-lg leading-relaxed">
          Интерактивный гид по 6 архитектурным подходам к управлению контекстом. Каждая техника — с наглядной визуализацией, примерами кода и сравнением.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            className="industrial-btn bg-primary text-primary-foreground border-primary"
            onClick={() => setActiveTab('learn')}
          >
            Смотреть техники
            <ArrowRight size={16} />
          </button>
          <button
            className="industrial-btn border-border text-foreground"
            onClick={() => setActiveTab('playground')}
          >
            Попробовать демо
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
          {[
            { value: '34', label: 'интерактивных демо' },
            { value: '6', label: 'техник управления' },
            { value: '~15 мин', label: 'чтения' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold font-mono text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="industrial-card industrial-glow relative p-4 md:p-5 mt-12"
        >
          <div className="w-1 h-full bg-primary rounded-full absolute left-0 top-0" />
          <div className="pl-3">
            <span className="industrial-badge border-primary/50 text-primary mb-3">
              ПРОБЛЕМА
            </span>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              LLM не имеют постоянной памяти. Каждый запрос — с чистого листа. История сжигает токены и упирается в лимит контекстного окна.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                '128K макс. контекст (GPT-4o)',
                '$10/1M цена за input токенов',
                'до 95% экономия токенов',
              ].map((metric) => (
                <span
                  key={metric}
                  className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded-sm"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
