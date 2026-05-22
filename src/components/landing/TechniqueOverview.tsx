'use client'

import { motion } from 'framer-motion'
import { TECHNIQUES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'

const complexityLabels: Record<string, { text: string; accent: boolean }> = {
  low: { text: 'Low', accent: false },
  medium: { text: 'Medium', accent: true },
  high: { text: 'High', accent: true },
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function TechniqueOverview() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const setSelectedTechnique = useAppStore((s) => s.setSelectedTechnique)

  return (
    <section id="techniques" className="max-w-[1120px] mx-auto px-6 md:px-14 py-20 md:py-36">
      <h2>
        Six <em>techniques</em>
      </h2>
      <p className="text-text-dim text-sm mt-3 mb-12 max-w-md font-light">
        From simple to advanced — choose the right strategy for your use case.
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="tech-grid"
      >
        {TECHNIQUES.map((tech) => {
          const Icon = tech.icon
          const complexity = complexityLabels[tech.complexity]

          return (
            <motion.div
              key={tech.id}
              variants={item}
              className="tech-card"
              onClick={() => {
                setSelectedTechnique(tech.id)
                setActiveTab('playground')
              }}
            >
              <div className="tech-card-title">
                {tech.id.replace('-', ' ')}
              </div>
              
              <p className="tech-card-desc">
                {tech.description}
              </p>

              <div className="tech-card-meta">
                <span className={`tech-tag ${complexity.accent ? 'accent' : ''}`}>
                  {complexity.text}
                </span>
                <span className="tech-tag">
                  {tech.infrastructure}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
