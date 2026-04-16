'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const progressions = [
  { from: 'Простые чаты', to: 'Суммаризация' },
  { from: 'Ассистенты', to: 'Иерархическая' },
  { from: 'Production', to: 'RAG + Факты' },
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
  return (
    <section className="py-16 md:py-20 px-4 md:px-8">
      <div className="text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <span className="industrial-badge border-primary/50 text-primary">
            ГЛАВНЫЙ ВЫВОД
          </span>
        </motion.div>

        {/* Main Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl leading-relaxed"
        >
          Не существует одной «лучшей» техники. Правильный подход —{' '}
          <span className="font-bold">комбинировать методы</span>{' '}
          в зависимости от сценария.
        </motion.p>

        {/* Progression Arrows */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {progressions.map((p) => (
            <motion.div
              key={p.from}
              variants={item}
              className="industrial-card px-4 py-3 flex items-center gap-2"
            >
              <span className="font-mono text-sm text-muted-foreground">
                {p.from}
              </span>
              <ArrowRight size={14} className="text-primary shrink-0" />
              <span className="font-mono text-sm font-semibold text-primary">
                {p.to}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
