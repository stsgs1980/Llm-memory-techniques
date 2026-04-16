'use client'

import { motion } from 'framer-motion'
import { TECHNIQUES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'

const complexityLabels: Record<string, { text: string; colorClass: string }> = {
  low: { text: 'НИЗКАЯ', colorClass: 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400' },
  medium: { text: 'СРЕДНЯЯ', colorClass: 'border-amber-500/50 text-amber-600 dark:text-amber-400' },
  high: { text: 'ВЫСОКАЯ', colorClass: 'border-red-500/50 text-red-600 dark:text-red-400' },
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function TechniqueOverview() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const setSelectedTechnique = useAppStore((s) => s.setSelectedTechnique)

  return (
    <section id="technique-overview" className="py-16 md:py-24 px-4 md:px-8 industrial-lines">
      <div>
        {/* Header */}
        <div className="text-sm font-mono font-medium text-primary uppercase tracking-widest">
          6 ТЕХНИК УПРАВЛЕНИЯ
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          От простого к сложному — выберите стратегию для вашего проекта
        </p>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10"
        >
          {TECHNIQUES.map((tech) => {
            const Icon = tech.icon
            const complexity = complexityLabels[tech.complexity]

            return (
              <motion.div
                key={tech.id}
                variants={item}
                className="industrial-card p-5 cursor-pointer group"
                onClick={() => {
                  setSelectedTechnique(tech.id)
                  setActiveTab('playground')
                }}
              >
                {/* Top Row: Icon + Name */}
                <div className="flex items-center gap-2.5">
                  <Icon size={20} className={tech.colorClass} />
                  <span className="font-mono text-sm font-semibold">{tech.name}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {tech.description}
                </p>

                {/* Bottom Row */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <span
                      className={`industrial-badge border text-[10px] ${complexity.colorClass}`}
                    >
                      {complexity.text}
                    </span>
                    <span className="industrial-badge border-border text-muted-foreground text-[10px]">
                      {tech.infrastructure}
                    </span>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg leading-none">
                    →
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
