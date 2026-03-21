"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Start here",
    cta: "Download Free eBook",
    href: "/signup",
    features: ["Home Safety eBook (PDF)", "Top 10 fall prevention tips", "Checklist for every room"],
    highlight: false,
  },
  {
    name: "AI Audit",
    price: "$99",
    desc: "Most popular",
    cta: "Start Your Audit",
    href: "/signup",
    features: [
      "Full AI room-by-room assessment",
      "Safety score (0–100)",
      "Prioritized risk recommendations",
      "Cost estimates for every fix",
      "Downloadable PDF report",
    ],
    highlight: true,
  },
  {
    name: "Full Package",
    price: "$199",
    desc: "Complete solution",
    cta: "Get Full Package",
    href: "/signup",
    features: [
      "Everything in AI Audit",
      "Vetted contractor matching",
      "3 contractor quotes",
      "30-day follow-up check",
      "Priority support",
    ],
    highlight: false,
  },
]

export function PricingPreview() {
  return (
    <section className="section-padding bg-[var(--background)]" id="pricing-preview">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            One-time fee. No subscriptions. No surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-lg p-8 border-2 relative ${
                plan.highlight
                  ? "border-[var(--accent)] bg-[var(--surface)]"
                  : "border-[var(--border-light)] bg-[var(--surface)]"
              } shadow-card`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[var(--accent)] text-white text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">{plan.desc}</p>
                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">{plan.name}</h3>
                <div className="mt-3">
                  <span className="font-display font-bold text-4xl text-[var(--text-primary)]">{plan.price}</span>
                  <span className="text-[var(--text-muted)] text-sm ml-1">one-time</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--success)] mt-0.5 shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className={`w-full rounded-full ${
                  plan.highlight
                    ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-button"
                    : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild variant="ghost" className="text-[var(--accent)]">
            <Link href="/pricing">View full pricing comparison →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
