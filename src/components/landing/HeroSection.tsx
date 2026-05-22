'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <section className="zai-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="zai-hero-badge"
      >
        <span style={{
          width: 'var(--zai-dot-size)',
          height: 'var(--zai-dot-size)',
          background: 'var(--zai-color-status-online)',
          borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }} />
        Context Engineering Guide
      </motion.div>
      
      <motion.h1
        className="zai-hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Master LLM Memory
      </motion.h1>
      
      <motion.p
        className="zai-hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Six architectural patterns for context management in LLM applications.
        Interactive demos, code examples, and cost analysis for each technique.
      </motion.p>
      
      <motion.div
        className="zai-hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button 
          className="zai-btn-primary"
          onClick={() => setActiveTab('learn')}
        >
          Start Learning
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          className="zai-btn-secondary"
          onClick={() => setActiveTab('playground')}
        >
          View Demo
        </button>
      </motion.div>
    </section>
  )
}
