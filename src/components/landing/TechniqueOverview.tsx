'use client'

import { motion } from 'framer-motion'
import { TECHNIQUES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'

const complexityLabels: Record<string, { text: string; primary: boolean }> = {
  low: { text: 'Low', primary: false },
  medium: { text: 'Medium', primary: true },
  high: { text: 'High', primary: true },
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
    <section id="techniques" className="vercel-section">
      <div className="vercel-section-header">
        <h2 className="vercel-section-title">Six Techniques</h2>
        <p className="vercel-section-desc">
          From simple to advanced — choose the right strategy for your use case.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="vercel-grid vercel-grid-3"
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
              <div className="tech-card-icon">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="tech-card-title">
                {tech.id.replace('-', ' ')}
              </h3>
              <p className="tech-card-desc">
                {tech.description}
              </p>
              <div className="tech-card-tags">
                <span className={`tech-tag ${complexity.primary ? 'primary' : ''}`}>
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
