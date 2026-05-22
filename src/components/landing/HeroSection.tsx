'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

export default function HeroSection() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <section className="max-w-[1120px] mx-auto px-6 md:px-14 pt-32 md:pt-48 pb-16 md:pb-24 grid md:grid-cols-[1.4fr_1fr] gap-20 items-end">
      {/* Left Column */}
      <div>
        <div className="eyebrow">
          <span className="eyebrow-line" />
          Context Engineering Guide
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Master LLM<br />
          <em>Memory</em>
        </motion.h1>
      </div>
      
      {/* Right Column */}
      <motion.div 
        className="pb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-base leading-relaxed mb-9">
          Six architectural patterns for context management in LLM applications. 
          Each technique includes interactive demos, code examples, and cost analysis.
        </p>
        
        <div className="flex gap-3">
          <button 
            className="btn-fill"
            onClick={() => setActiveTab('learn')}
          >
            Start Learning
          </button>
          <button 
            className="btn-ghost"
            onClick={() => setActiveTab('playground')}
          >
            View Demo
          </button>
        </div>
      </motion.div>
    </section>
  )
}
