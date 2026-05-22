'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Assess',
    description:
      'Identify your application type. Use the Advisor or Decision Tree to find the right technique.',
  },
  {
    number: '02',
    title: 'Compare',
    description:
      'Start with Summarization. Use Technique Battle for comparison, Calculator for cost analysis.',
  },
  {
    number: '03',
    title: 'Implement',
    description:
      'Test in Playground. Use the Constructor for design, Quick Reference for prompts.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function HowToStart() {
  return (
    <section className="zai-section">
      <div className="zai-section-header">
        <h2 className="zai-section-title">How to Start</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="zai-grid zai-grid-3"
      >
        {steps.map((step) => (
          <motion.div 
            key={step.number} 
            variants={item} 
            className="zai-card"
            style={{
              padding: 'var(--zai-space-8)',
              position: 'relative'
            }}
          >
            <div style={{
              fontSize: 'var(--zai-font-size-9)',
              fontWeight: 700,
              color: 'var(--zai-color-text-disabled)',
              position: 'absolute',
              top: 'var(--zai-space-6)',
              right: 'var(--zai-space-6)',
              lineHeight: 1
            }}>{step.number}</div>
            <h3 style={{
              fontSize: 'var(--zai-font-size-5)',
              fontWeight: 600,
              color: 'var(--zai-color-text-primary)',
              marginBottom: 'var(--zai-space-3)'
            }}>{step.title}</h3>
            <p style={{
              fontSize: 'var(--zai-font-size-2)',
              color: 'var(--zai-color-text-secondary)',
              lineHeight: 1.65
            }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
