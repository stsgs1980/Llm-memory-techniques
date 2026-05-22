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
    <section className="vercel-section">
      <div className="vercel-section-header">
        <h2 className="vercel-section-title">How to Start</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="vercel-grid vercel-grid-3"
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={item} className="vercel-card p-8 relative">
            <div className="text-5xl font-bold text-[#404040] absolute top-6 right-6">{step.number}</div>
            <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
            <p className="text-sm text-[#a0a0a0] leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
