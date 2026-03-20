"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: "title",
    bg: "var(--surface-alt)",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6">
        <div className="w-16 h-16 bg-[var(--accent)] rounded-xl flex items-center justify-center">
          <span className="text-white text-2xl">🏠</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-6xl text-[var(--text-primary)] mb-4">StayHome</h1>
          <p className="text-[var(--text-secondary)] text-2xl">Keep your parents home. Keep them safe.</p>
        </div>
        <p className="text-[var(--text-muted)] text-sm">Investor Presentation · March 2026</p>
      </div>
    ),
  },
  {
    id: "problem",
    bg: "var(--text-primary)",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 px-4">
        <h2 className="font-display font-bold text-5xl text-white">The Problem</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { stat: "75%", desc: "of seniors want to age in place" },
            { stat: "1 in 4", desc: "will fall this year" },
            { stat: "$35K", desc: "avg. fall hospitalization cost" },
          ].map((s) => (
            <div key={s.stat} className="bg-white/10 rounded-lg p-6 text-center">
              <p className="font-display font-bold text-4xl text-[var(--accent)] mb-2">{s.stat}</p>
              <p className="text-white/80 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-white/70 text-lg">Families don&apos;t know what to fix, what it costs, or who to hire. The entire space looks like 2012-era healthcare.</p>
      </div>
    ),
  },
  {
    id: "solution",
    bg: "var(--surface-alt)",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 px-4">
        <h2 className="font-display font-bold text-5xl text-[var(--text-primary)]">The Solution</h2>
        <p className="text-[var(--text-secondary)] text-xl">AI-powered home safety audit + vetted contractor matching — in 10 minutes</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { step: "1", title: "Room-by-Room Audit", desc: "24 questions, 6 rooms, 10 minutes" },
            { step: "2", title: "AI Safety Report", desc: "Risk score + prioritized fixes + cost estimates" },
            { step: "3", title: "Contractor Matching", desc: "3 vetted local quotes in 48 hours" },
          ].map((s) => (
            <div key={s.step} className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)]">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold mb-4">{s.step}</div>
              <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "traction",
    bg: "var(--background)",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 px-4">
        <h2 className="font-display font-bold text-5xl text-[var(--text-primary)]">Early Traction</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { value: "1,200+", label: "Families helped" },
            { value: "2,400+", label: "Audits completed" },
            { value: "18,000+", label: "Risks identified" },
            { value: "$99–$199", label: "Per audit (one-time)" },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--surface-alt)] rounded-lg p-8">
              <p className="font-display font-bold text-5xl text-[var(--accent)] mb-2">{s.value}</p>
              <p className="text-[var(--text-secondary)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "market",
    bg: "var(--accent)",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 px-4">
        <h2 className="font-display font-bold text-5xl text-white">Market Opportunity</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-lg p-6">
            <p className="font-display font-bold text-4xl text-white mb-2">$1M–$10M</p>
            <p className="text-white/80">Projected ARR</p>
          </div>
          <div className="bg-white/20 rounded-lg p-6">
            <p className="font-display font-bold text-4xl text-white mb-2">6,600/mo</p>
            <p className="text-white/80">Searches for &quot;aging in place home modifications&quot; (+1,963% growth)</p>
          </div>
        </div>
        <p className="text-white/80 text-lg">First-mover opportunity. Entire space is institutional and ugly. Airbnb-meets-healthcare brand nobody has built here.</p>
      </div>
    ),
  },
]

export default function DeckPage() {
  const [current, setCurrent] = useState(0)
  const total = slides.length

  const slide = slides[current]

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: `var(--background)` }}
    >
      <div
        className="flex-1 relative"
        style={{ background: slide.bg }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 px-16 py-12"
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="bg-[var(--surface)] border-t border-[var(--border-light)] px-8 py-4 flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--text-muted)]">
          {current + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "w-6 bg-[var(--accent)]" : "bg-[var(--border)]"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={current === total - 1}
            className="bg-[var(--accent)] text-white rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
