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
    <section className="max-w-[1120px] mx-auto px-6 md:px-14 py-20 md:py-36 border-t border-line">
      <h2>
        How to <em>start</em>
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="steps-grid mt-16"
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={item} className="step">
            <div className="step-num">{step.number}</div>
            <div className="step-title">{step.title}</div>
            <p className="step-desc">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
