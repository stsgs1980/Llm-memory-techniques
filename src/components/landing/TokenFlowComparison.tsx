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
    <section className="zai-section">
      <div className="zai-section-header">
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-muted)',
          marginBottom: 'var(--zai-space-2)'
        }}>Token Savings</p>
        <h2 className="zai-section-title">Compare Efficiency</h2>
        <p className="zai-section-desc">
          Comparison for a 50-message conversation (~8,000 tokens history)
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--zai-space-4)' }}
      >
        {TOKEN_DATA.map((entry, i) => {
          const pct = (entry.tokens / MAX_TOKENS) * 100

          return (
            <motion.div key={entry.name} variants={item}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--zai-space-2)'
              }}>
                <span style={{
                  fontSize: 'var(--zai-font-size-2)',
                  color: 'var(--zai-color-text-primary)'
                }}>{entry.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--zai-space-4)' }}>
                  <span style={{
                    fontSize: 'var(--zai-font-size-2)',
                    color: 'var(--zai-color-text-muted)'
                  }}>
                    {entry.tokens.toLocaleString()} tokens
                  </span>
                  {entry.savings !== '—' && (
                    <span style={{
                      fontSize: 'var(--zai-font-size-2)',
                      color: 'var(--zai-color-text-primary)',
                      fontWeight: 600
                    }}>
                      −{entry.savings}
                    </span>
                  )}
                </div>
              </div>
              <div style={{
                height: 8,
                background: 'var(--zai-color-bg-secondary)',
                borderRadius: 'var(--zai-radius-full)',
                overflow: 'hidden'
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 'var(--zai-radius-full)',
                    background: 'var(--zai-color-accent)',
                    opacity: 0.2 + (1 - pct/100) * 0.8
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
