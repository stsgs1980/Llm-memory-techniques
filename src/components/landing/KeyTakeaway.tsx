'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const progressions = [
  { from: 'Simple chats', to: 'Summarization' },
  { from: 'Assistants', to: 'Hierarchical' },
  { from: 'Production', to: 'RAG + Facts' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function KeyTakeaway() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <section className="zai-section" style={{ textAlign: 'center' }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
      >
        Start Building
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{
          color: 'var(--zai-color-text-secondary)',
          marginTop: 'var(--zai-space-4)',
          marginBottom: 'var(--fib-5)',
          maxWidth: 480,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        No single technique fits all. Combine methods based on your scenario.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--zai-space-4)',
          marginBottom: 'var(--fib-5)'
        }}
      >
        {progressions.map((p) => (
          <motion.div
            key={p.from}
            variants={item}
            className="zai-glass-card"
            style={{
              padding: 'var(--zai-space-3) var(--zai-space-5)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--zai-space-3)'
            }}
          >
            <span style={{
              fontSize: 'var(--zai-font-size-2)',
              color: 'var(--zai-color-text-muted)'
            }}>{p.from}</span>
            <ArrowRight style={{
              width: 16,
              height: 16,
              color: 'var(--zai-color-text-disabled)'
            }} />
            <span style={{
              fontSize: 'var(--zai-font-size-2)',
              color: 'var(--zai-color-text-primary)',
              fontWeight: 500
            }}>{p.to}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="zai-btn-primary"
        onClick={() => setActiveTab('learn')}
      >
        Begin Learning
        <ArrowRight style={{ width: 16, height: 16 }} />
      </motion.button>
    </section>
  )
}
