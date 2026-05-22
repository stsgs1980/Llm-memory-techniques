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
    <section className="vercel-section text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h1"
      >
        Start Building
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="text-[#a0a0a0] mt-4 mb-10 max-w-md mx-auto"
      >
        No single technique fits all. Combine methods based on your scenario.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
      >
        {progressions.map((p) => (
          <motion.div
            key={p.from}
            variants={item}
            className="vercel-card px-5 py-3 flex items-center gap-3"
          >
            <span className="text-sm text-[#a0a0a0]">{p.from}</span>
            <ArrowRight className="w-4 h-4 text-[#808080]" />
            <span className="text-sm text-white font-medium">{p.to}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="btn-primary"
        onClick={() => setActiveTab('learn')}
      >
        Begin Learning
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </section>
  )
}
