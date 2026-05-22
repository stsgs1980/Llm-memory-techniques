'use client'

import { motion } from 'framer-motion'

interface TokenEntry {
  name: string
  tokens: number
  savings: string
}

const TOKEN_DATA: TokenEntry[] = [
  { name: 'No management', tokens: 8000, savings: '—' },
  { name: 'Sliding Window', tokens: 3200, savings: '60%' },
  { name: 'Summarization', tokens: 1200, savings: '85%' },
  { name: 'Hierarchical', tokens: 2000, savings: '75%' },
  { name: 'RAG', tokens: 600, savings: '92.5%' },
  { name: 'Fact Extraction', tokens: 300, savings: '96.25%' },
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
    <section className="vercel-section">
      <div className="vercel-section-header">
        <p className="text-sm text-[#a0a0a0] mb-2">Token Savings</p>
        <h2 className="vercel-section-title">Compare Efficiency</h2>
        <p className="vercel-section-desc">
          Comparison for a 50-message conversation (~8,000 tokens history)
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-4"
      >
        {TOKEN_DATA.map((entry, i) => {
          const pct = (entry.tokens / MAX_TOKENS) * 100

          return (
            <motion.div key={entry.name} variants={item}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{entry.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#a0a0a0]">
                    {entry.tokens.toLocaleString()} tokens
                  </span>
                  {entry.savings !== '—' && (
                    <span className="text-sm text-white font-medium">
                      −{entry.savings}
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-[#111111] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                  style={{ opacity: 0.2 + (1 - pct/100) * 0.8 }}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
