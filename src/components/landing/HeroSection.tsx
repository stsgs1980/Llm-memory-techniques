'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <section className="vercel-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="vercel-hero-badge"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Context Engineering Guide
      </motion.div>
      
      <motion.h1
        className="vercel-hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Master LLM Memory
      </motion.h1>
      
      <motion.p
        className="vercel-hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Six architectural patterns for context management in LLM applications.
        Interactive demos, code examples, and cost analysis for each technique.
      </motion.p>
      
      <motion.div
        className="vercel-hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button 
          className="btn-primary"
          onClick={() => setActiveTab('learn')}
        >
          Start Learning
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          className="btn-secondary"
          onClick={() => setActiveTab('playground')}
        >
          View Demo
        </button>
      </motion.div>
    </section>
  )
}
