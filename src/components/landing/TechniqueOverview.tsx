'use client'

import { motion } from 'framer-motion'
import { TECHNIQUES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'
import { ArrowRight } from 'lucide-react'

const complexityLabels: Record<string, { text: string; className: string }> = {
  low: { text: 'LOW', className: 'amber-badge-success' },
  medium: { text: 'MEDIUM', className: 'amber-badge-primary' },
  high: { text: 'HIGH', className: 'amber-badge-primary' },
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
    <section id="technique-overview" className="py-16 md:py-24 px-4 md:px-8">
      <div>
        {/* Header */}
        <div className="amber-section-title">
          ./techniques
        </div>
        <p className="text-lg text-muted-foreground mt-2 font-mono">
          From simple to advanced — choose your strategy
        </p>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="technique-grid mt-10"
        >
          {TECHNIQUES.map((tech) => {
            const Icon = tech.icon
            const complexity = complexityLabels[tech.complexity]

            return (
              <motion.div
                key={tech.id}
                variants={item}
                className="amber-card p-5 cursor-pointer group"
                onClick={() => {
                  setSelectedTechnique(tech.id)
                  setActiveTab('playground')
                }}
              >
                {/* Top Row: Icon + Name */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 border border-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-sm font-semibold">{tech.id}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-mono">
                  {tech.description}
                </p>

                {/* Bottom Row */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <span className={complexity.className}>
                      {complexity.text}
                    </span>
                    <span className="amber-badge-muted">
                      {tech.infrastructure}
                    </span>
                  </div>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors size-4" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
