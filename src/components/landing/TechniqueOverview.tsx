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
    <section id="techniques" className="zai-section">
      <div className="zai-section-header">
        <h2 className="zai-section-title">Six Techniques</h2>
        <p className="zai-section-desc">
          From simple to advanced — choose the right strategy for your use case.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="zai-grid zai-grid-3"
      >
        {TECHNIQUES.map((tech) => {
          const Icon = tech.icon
          const complexity = complexityLabels[tech.complexity]

          return (
            <motion.div
              key={tech.id}
              variants={item}
              className="zai-tech-card"
              onClick={() => {
                setSelectedTechnique(tech.id)
                setActiveTab('playground')
              }}
            >
              <div className="zai-tech-card-icon">
                <Icon style={{ width: 20, height: 20 }} />
              </div>
              <h3 className="zai-tech-card-title">
                {tech.id.replace('-', ' ')}
              </h3>
              <p className="zai-tech-card-desc">
                {tech.description}
              </p>
              <div className="zai-tech-card-tags">
                <span className={`zai-tag ${complexity.accent ? 'zai-badge-accent' : ''}`}>
                  {complexity.text}
                </span>
                <span className="zai-tag">
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
