"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "I'd been putting this off for years because I didn't know where to start. StayHome gave me a clear plan in 15 minutes. Mom's bathroom now has grab bars and better lighting — I sleep so much better.",
    name: "Jennifer M.",
    location: "Daughter, San Diego CA",
    score: 5,
  },
  {
    quote: "The contractor they matched us with was incredible. He'd done 200+ senior home modifications. He even spotted two things we missed in the audit. Worth every penny.",
    name: "Robert K.",
    location: "Son, Austin TX",
    score: 5,
  },
  {
    quote: "My siblings kept arguing about what needed fixing first. The report settled it — we had a prioritized list with costs. We tackled the high-risk items in a month.",
    name: "Sarah L.",
    location: "Daughter, Chicago IL",
    score: 5,
  },
]

export function SocialProof() {
  return (
    <section className="section-padding bg-[var(--surface-alt)]" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            Peace of mind for 1,200+ families
          </h2>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: "2,400+", label: "Audits completed" },
              { value: "18,000+", label: "Risks prevented" },
              { value: "40+", label: "Cities covered" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-4xl text-[var(--accent)]">{stat.value}</p>
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[var(--surface)] rounded-md p-6 shadow-card border border-[var(--border-light)]"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.score }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-body font-semibold text-[var(--text-primary)] text-sm">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
