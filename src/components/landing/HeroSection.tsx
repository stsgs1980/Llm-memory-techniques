'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function HeroSection() {
  const setActiveTab = useAppStore((s) => s.setActiveTab)

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div>
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm mb-6"
        >
          <div className="text-terminal-green">$</div>
          <div className="text-cyan"> cat guide.md</div>
          <div className="text-muted-foreground mt-1">Loading LLM Memory Management Guide...</div>
          <div className="text-terminal-green mt-1">✓ 6 techniques loaded</div>
        </motion.div>

        {/* Main Heading */}
        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight">
            <span className="amber-glow-intense">LLM Memory</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-mono font-light mt-3">
            Management
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mt-6 text-base md:text-lg leading-relaxed font-mono">
          Interactive terminal guide to 6 architectural patterns for context management. Each technique includes demos, code examples, and comparisons.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            className="amber-btn"
            onClick={() => setActiveTab('learn')}
          >
            <Terminal size={14} />
            ./explore
            <ArrowRight size={14} />
          </button>
          <button
            className="amber-btn-secondary"
            onClick={() => setActiveTab('playground')}
          >
            ./demo
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg border border-border p-4 bg-card/50">
          {[
            { value: '34', label: 'demos' },
            { value: '6', label: 'techniques' },
            { value: '~15m', label: 'read time' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold font-mono text-primary amber-glow">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem Callout - Terminal Style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="amber-card relative p-4 md:p-5 mt-12"
        >
          <div className="font-mono text-xs text-terminal-green mb-2">
            $ problem --context
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed font-mono">
            LLMs have no persistent memory. Each request starts fresh. History burns tokens and hits context window limits.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              '128K max context (GPT-4o)',
              '-80% token savings',
              '$10/1M input tokens',
            ].map((metric) => (
              <span
                key={metric}
                className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 border border-primary/30"
              >
                {metric}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
