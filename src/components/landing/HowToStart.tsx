'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: 1,
    title: 'Оцените сценарий',
    description:
      'Определите тип вашего приложения и используйте Советник или Дерево решений для подбора.',
  },
  {
    number: 2,
    title: 'Выберите технику',
    description:
      'Начните с Суммаризации, используйте Битву техник для сравнения, Калькулятор для расчёта.',
  },
  {
    number: 3,
    title: 'Реализуйте и тестируйте',
    description:
      'Используйте Песочницу для тестирования, Конструктор для проектирования, Шпаргалку для промптов.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function HowToStart() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 industrial-dots">
      <div>
        {/* Header */}
        <div className="text-sm font-mono font-medium text-primary uppercase tracking-widest">
          КАК НАЧАТЬ
        </div>
        <p className="text-muted-foreground mt-2">
          3 шага для внедрения управления памятью
        </p>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 space-y-4"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={item} className="flex gap-4">
              {/* Step Number */}
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary font-bold shrink-0 mt-0.5">
                {step.number}
              </div>

              {/* Content Card */}
              <div className="industrial-card p-4 flex-1">
                <div className="font-mono text-sm font-semibold">{step.title}</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
