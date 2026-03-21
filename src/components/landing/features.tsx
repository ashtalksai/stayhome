"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { DollarSign, CalendarCheck } from "lucide-react"

export function Features() {
  return (
    <section className="section-padding bg-[var(--background)]" id="features">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Everything a worried family needs
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            One platform to assess, plan, and fix — so you can stop worrying and start acting.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large — room audit */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-2 bg-[var(--surface-alt)] rounded-lg p-8 shadow-card border border-[var(--border-light)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider">01 / ASSESS</span>
                <h3 className="font-display font-semibold text-2xl text-[var(--text-primary)] mt-2 mb-3">
                  Room-by-Room Assessment
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Answer simple yes/no questions about each room — entry, living room, kitchen, bathroom, bedroom, and stairs. Takes 10 minutes. No expertise required.
                </p>
              </div>
              <Image
                src="/images/feature-audit.png"
                alt="Room audit feature"
                width={200}
                height={160}
                className="rounded-md object-cover mx-auto"
              />
            </div>
          </motion.div>

          {/* AI Risk Scoring */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--text-primary)] rounded-lg p-8 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
          >
            <span className="text-xs font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">02 / SCORE</span>
            <h3 className="font-display font-semibold text-2xl text-[var(--text-inverse)]">
              AI Risk Scoring
            </h3>
            {/* Mini score ring */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.74} ${2 * Math.PI * 40}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono font-bold text-xl text-white">74</span>
                </div>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Get an instant 0–100 safety score with color-coded risk breakdown by category.
            </p>
          </motion.div>

          {/* Contractor matching */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[var(--surface)] rounded-lg p-8 shadow-card border border-[var(--border-light)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider">03 / CONNECT</span>
            <h3 className="font-display font-semibold text-2xl text-[var(--text-primary)] mt-2 mb-3">
              Vetted Contractor Matching
            </h3>
            <Image
              src="/images/feature-contractors.png"
              alt="Contractor matching"
              width={200}
              height={120}
              className="rounded-md object-cover w-full mb-3"
            />
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Matched with background-checked local contractors who specialize in senior home modifications.
            </p>
          </motion.div>

          {/* PDF Report */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[var(--accent-light)] rounded-lg p-8 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase tracking-wider">04 / REPORT</span>
            <h3 className="font-display font-semibold text-2xl text-[var(--text-primary)] mt-2 mb-3">
              PDF Safety Report
            </h3>
            <Image
              src="/images/feature-report.png"
              alt="AI safety report"
              width={200}
              height={120}
              className="rounded-md object-cover w-full mb-3"
            />
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Download a comprehensive PDF report to share with family, contractors, or healthcare providers.
            </p>
          </motion.div>

          {/* Cost estimates */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-[var(--surface-muted)] rounded-lg p-8 shadow-card border border-[var(--border-light)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-[var(--success-bg)] rounded-md flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-[var(--success)]" />
            </div>
            <span className="text-xs font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">05 / PLAN</span>
            <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mt-2 mb-3">
              Real Cost Estimates
            </h3>
            <div className="space-y-2">
              {[
                { item: "Grab bars (bathroom)", cost: "$150–$300" },
                { item: "Stair railing", cost: "$800–$1,500" },
                { item: "Lighting upgrade", cost: "$200–$500" },
              ].map((e) => (
                <div key={e.item} className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{e.item}</span>
                  <span className="font-mono font-medium text-[var(--text-primary)]">{e.cost}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 30-day follow-up */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[var(--success-bg)] rounded-lg p-8 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center mb-4">
              <CalendarCheck className="w-5 h-5 text-[var(--success)]" />
            </div>
            <span className="text-xs font-mono font-medium text-[var(--success)] uppercase tracking-wider">06 / SUPPORT</span>
            <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mt-2 mb-3">
              30-Day Follow-Up
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              We check in at 30 days to see what&apos;s been fixed and update your safety score. Peace of mind, ongoing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
