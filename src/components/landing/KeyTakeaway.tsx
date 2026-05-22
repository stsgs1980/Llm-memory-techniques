'use client'

import { motion } from 'framer-motion'
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
    <section className="max-w-[1120px] mx-auto px-6 md:px-14 py-28 md:py-40 text-center border-t border-line">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Start <em>building</em>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="text-text-dim text-sm mt-4 mb-10 max-w-md mx-auto font-light"
      >
        No single technique fits all. Combine methods based on your scenario.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
      >
        {progressions.map((p) => (
          <motion.div
            key={p.from}
            variants={item}
            className="mono-card px-5 py-3 flex items-center gap-3"
          >
            <span className="text-sm text-text-dim font-light">{p.from}</span>
            <span className="text-accent">→</span>
            <span className="text-sm text-accent-bright">{p.to}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="btn-fill"
        onClick={() => setActiveTab('learn')}
      >
        Begin Learning
      </motion.button>
    </section>
  )
}
