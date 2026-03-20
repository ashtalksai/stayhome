"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Fill the free room-by-room audit",
    desc: "Answer simple yes/no questions about each room in the home. No expertise needed — we guide you through everything. Takes 10 minutes.",
    time: "~10 min",
  },
  {
    number: "02",
    title: "Receive your AI safety report with risk scores",
    desc: "Our AI analyzes your answers and generates a comprehensive safety report with prioritized risk levels, specific recommendations, and real cost estimates.",
    time: "Instant",
  },
  {
    number: "03",
    title: "Get matched with vetted local contractors",
    desc: "We connect you with background-checked contractors who specialize in senior home modifications — grab bars, ramps, lighting, stair lifts, and more.",
    time: "48 hrs",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.15, once: true })

  return (
    <section className="section-padding bg-[var(--background)]" id="how-it-works">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            From worried to confident in 3 steps
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            No home safety expertise required. Just honest answers about the home you love.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 border-t-2 border-dashed border-[var(--border)] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-button">
                  <span className="font-mono font-bold text-lg text-white">{step.number}</span>
                </div>
                <div>
                  <span className="inline-block bg-[var(--surface-muted)] text-[var(--text-muted)] text-xs font-mono px-2 py-1 rounded-sm mb-3">
                    {step.time}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
