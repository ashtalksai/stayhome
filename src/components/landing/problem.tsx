"use client"

import { motion } from "framer-motion"
import { AlertTriangle, HelpCircle, UserX } from "lucide-react"

const problems = [
  {
    icon: AlertTriangle,
    stat: "1 in 4 seniors falls every year",
    desc: "Falls are the leading cause of injury death among adults 65+. The average hospitalization costs $35,000 — and most falls happen at home.",
    color: "var(--destructive)",
    bg: "var(--destructive-bg)",
  },
  {
    icon: HelpCircle,
    stat: "Families don't know what needs fixing",
    desc: "Most adult children feel overwhelmed. What do you fix first? How urgent is it? What does it actually cost? There's no clear roadmap.",
    color: "var(--warning)",
    bg: "var(--warning-bg)",
  },
  {
    icon: UserX,
    stat: "Finding trustworthy contractors is a nightmare",
    desc: "Home modification contractors are unvetted, inconsistent, and hard to find. Families report 3–5 contractors before getting reliable help.",
    color: "var(--accent)",
    bg: "var(--accent-light)",
  },
]

export function Problem() {
  return (
    <section className="section-padding bg-[var(--background)]" id="problem">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Families are worried. And for good reason.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Aging in place is what every senior wants — but the risks are real, and most families aren&apos;t equipped to navigate them alone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[var(--surface)] rounded-md p-6 shadow-card border border-[var(--border-light)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center mb-4"
                style={{ background: p.bg }}
              >
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-3">
                {p.stat}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
