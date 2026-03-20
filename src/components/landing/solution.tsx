"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Room-by-room AI risk assessment in under 10 minutes",
  "Prioritized action plan with real cost estimates",
  "Matched with vetted, background-checked local contractors",
]

export function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.15, once: true })

  return (
    <section
      className="section-padding bg-[var(--surface-alt)] relative overflow-hidden"
      id="solution"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/bg-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-[var(--surface)] rounded-lg p-2 shadow-modal border border-[var(--border-light)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-2 py-2 border-b border-[var(--border-light)]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <Image
                src="/mockups/audit-form-mockup.png"
                alt="StayHome audit form — multi-step room assessment"
                width={600}
                height={400}
                className="rounded-b-md w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)]">
              StayHome gives you the plan and the people.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              We guide you through a simple room-by-room assessment, generate an AI-powered risk report with specific fixes and costs, then match you with pre-vetted contractors who specialize in senior home modifications.
            </p>
            <div className="flex flex-col gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)] mt-0.5 shrink-0" />
                  <p className="text-[var(--text-secondary)]">{b}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
