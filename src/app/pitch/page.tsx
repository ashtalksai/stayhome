"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Home, X } from "lucide-react"
import Link from "next/link"

// Brand tokens
const brand = {
  bg: "#FAF8F5",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EDE8",
  text: "#2C2824",
  textSecondary: "#4A433D",
  textMuted: "#7A706A",
  accent: "#7BAB8B",
  accentLight: "#EBF3EE",
  border: "#D4CFCA",
  borderLight: "#EAE7E2",
}

interface Slide {
  id: string
  label: string
  bg: string
  dark?: boolean
  content: React.ReactNode
}

// ── SLIDE COMPONENTS ──────────────────────────────────────────────

function TitleSlide() {
  const [ring, setRing] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setRing(87), 600)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-8 max-w-3xl mx-auto">
      {/* Safety Score Ring */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke={brand.borderLight} strokeWidth="8" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke={brand.accent} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - ring / 100)}`}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-bold text-3xl" style={{ color: brand.accent }}>{ring}</span>
          <span className="text-xs font-mono" style={{ color: brand.textMuted }}>/ 100</span>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="font-display font-bold text-7xl mb-3" style={{ color: brand.text }}>StayHome</h1>
        <p className="text-2xl font-light" style={{ color: brand.textSecondary }}>
          Keep your parents home. Keep them safe.
        </p>
      </div>

      <p className="text-sm font-mono" style={{ color: brand.textMuted }}>
        Investor Presentation · ChimeStream B.V. · March 2026
      </p>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>The Problem</span>
        <h2 className="font-display font-bold text-5xl mt-2 text-white">Falls are the #1 cause of<br />injury death in seniors.</h2>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {[
          { stat: "75%", desc: "of seniors want to age in place — not nursing homes" },
          { stat: "1 in 4", desc: "seniors will fall this year — most in their own home" },
          { stat: "$35K", desc: "average hospitalization cost per fall" },
        ].map((s) => (
          <div key={s.stat} className="rounded-xl p-7 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
            <p className="font-display font-bold text-5xl mb-2" style={{ color: brand.accent }}>{s.stat}</p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
        Families don't know what to fix, what it costs, or who to hire. The entire space looks like 2012-era healthcare.
      </p>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.textMuted }}>The Solution</span>
        <h2 className="font-display font-bold text-5xl mt-2" style={{ color: brand.text }}>
          AI audit → Safety report → Contractor match
        </h2>
        <p className="text-xl mt-3" style={{ color: brand.textSecondary }}>From no idea what's wrong to 3 vetted contractor quotes — in 48 hours.</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {[
          { step: "01", title: "Room-by-Room Audit", desc: "24 questions across 6 rooms. Takes 10 minutes. Works on any device." },
          { step: "02", title: "AI Safety Report", desc: "Personalised risk score. Prioritised fixes. Real cost estimates." },
          { step: "03", title: "Contractor Matching", desc: "3 vetted local quotes delivered in 48 hours. Zero cold calls." },
        ].map((s) => (
          <div key={s.step} className="rounded-xl p-7 border" style={{ background: brand.surface, borderColor: brand.borderLight }}>
            <p className="font-mono text-xs mb-4" style={{ color: brand.accent }}>{s.step}</p>
            <h3 className="font-display font-semibold text-xl mb-2" style={{ color: brand.text }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: brand.textSecondary }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarketSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>Market Opportunity</span>
        <h2 className="font-display font-bold text-5xl mt-2 text-white">A $100B market nobody has<br />made beautiful yet.</h2>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-2">
        {[
          { value: "$100B+", label: "Home modification market (US)", sub: "Growing 8% YoY as boomers age" },
          { value: "+1,963%", label: "Keyword growth", sub: '"aging in place home modifications" — 6,600/mo' },
        ].map((m) => (
          <div key={m.value} className="rounded-xl p-7 border" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.18)" }}>
            <p className="font-display font-bold text-5xl text-white mb-1">{m.value}</p>
            <p className="font-medium text-white/90">{m.label}</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: "54M+", label: "US seniors 65+" },
          { value: "70%", label: "Live in homes with hazards" },
          { value: "$1M–$10M", label: "Projected ARR (Year 1–3)" },
        ].map((m) => (
          <div key={m.value} className="rounded-lg p-5 border text-center" style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="font-display font-bold text-3xl text-white">{m.value}</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function HowItWorksSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.textMuted }}>How It Works</span>
        <h2 className="font-display font-bold text-5xl mt-2" style={{ color: brand.text }}>Four steps to peace of mind.</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { step: "1", title: "Start the Audit", desc: "Daughter fills out 24 questions about Mom's home from her phone." },
          { step: "2", title: "AI Scores Risks", desc: "Our model identifies hazards, assigns a Safety Score, and prioritises fixes." },
          { step: "3", title: "Get Your Report", desc: "Detailed PDF: what to fix, estimated cost, which room first." },
          { step: "4", title: "Match Contractors", desc: "We source 3 vetted local pros. Family compares quotes and books." },
        ].map((s, i) => (
          <div key={s.step} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
                style={{ background: brand.accent, color: "white" }}>
                {s.step}
              </div>
              {i < 3 && <div className="flex-1 h-px" style={{ background: brand.borderLight }} />}
            </div>
            <div className="rounded-xl p-5 border h-full" style={{ background: brand.surface, borderColor: brand.borderLight }}>
              <h3 className="font-semibold text-sm mb-2" style={{ color: brand.text }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: brand.textSecondary }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-5 border flex items-center gap-4" style={{ background: brand.accentLight, borderColor: brand.accent + "33" }}>
        <span className="text-2xl">💬</span>
        <p className="text-sm italic" style={{ color: brand.text }}>
          "I kept putting it off because I didn't know where to start. StayHome gave me a list in 10 minutes and we had a contractor booked the same week."
        </p>
        <span className="ml-auto text-xs whitespace-nowrap font-mono" style={{ color: brand.accent }}>— Beta user</span>
      </div>
    </div>
  )
}

function TractionSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.textMuted }}>Traction</span>
        <h2 className="font-display font-bold text-5xl mt-2" style={{ color: brand.text }}>Community demand before a single ad.</h2>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {[
          { value: "8", label: "Active Reddit communities", sub: "r/AgingInPlace, r/CareGiving…" },
          { value: "6", label: "Facebook groups identified", sub: "Combined 180K+ members" },
          { value: "16", label: "YouTube channels covering space", sub: "Combined 2M+ subs" },
          { value: "6,600", label: "Monthly searches", sub: "Primary keyword +1,963% growth" },
        ].map((m) => (
          <div key={m.value} className="rounded-xl p-7 border" style={{ background: brand.surface, borderColor: brand.borderLight }}>
            <p className="font-display font-bold text-5xl mb-1" style={{ color: brand.accent }}>{m.value}</p>
            <p className="font-medium" style={{ color: brand.text }}>{m.label}</p>
            <p className="text-xs mt-1" style={{ color: brand.textMuted }}>{m.sub}</p>
          </div>
        ))}
      </div>
      <p className="text-sm" style={{ color: brand.textMuted }}>
        Community-first launch strategy: post in Reddit/Facebook, earn trust, convert with free eBook → $99 audit.
      </p>
    </div>
  )
}

function BusinessModelSlide() {
  const tiers = [
    { name: "eBook", price: "Free", sub: "Lead magnet", features: ["Home Safety eBook PDF", "Email capture", "Audit upsell CTA"], featured: false },
    { name: "Safety Audit", price: "$99", sub: "per audit", features: ["Full 24-question assessment", "AI safety report", "Priority fix list"], featured: true },
    { name: "Contractor Match", price: "$199", sub: "per consult", features: ["Everything in Audit", "3 vetted local quotes", "48hr turnaround"], featured: false },
    { name: "Pro Bundle", price: "$249", sub: "audit + match", features: ["Audit + Contractor Match", "Follow-up check-in", "Best value for families"], featured: false },
  ]

  return (
    <div className="flex flex-col justify-center h-full gap-7 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.textMuted }}>Business Model</span>
        <h2 className="font-display font-bold text-5xl mt-2" style={{ color: brand.text }}>Simple. High-margin. Transaction-based.</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-xl p-5 border flex flex-col"
            style={{
              background: t.featured ? brand.accent : brand.surface,
              borderColor: t.featured ? brand.accent : brand.borderLight,
              color: t.featured ? "white" : brand.text,
            }}>
            {t.featured && <span className="text-xs font-mono mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>★ MOST POPULAR</span>}
            <p className="font-semibold text-sm mb-1" style={{ color: t.featured ? "rgba(255,255,255,0.8)" : brand.textMuted }}>{t.name}</p>
            <p className="font-display font-bold text-3xl">{t.price}</p>
            <p className="text-xs mb-4" style={{ color: t.featured ? "rgba(255,255,255,0.6)" : brand.textMuted }}>{t.sub}</p>
            <ul className="flex flex-col gap-2 mt-auto">
              {t.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <span style={{ color: t.featured ? "rgba(255,255,255,0.7)" : brand.accent }}>✓</span>
                  <span style={{ color: t.featured ? "rgba(255,255,255,0.85)" : brand.textSecondary }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex gap-8">
        {[
          { label: "Month 1 target", value: "~$14K", sub: "100 audits + upgrades" },
          { label: "Month 3 target", value: "~$40K/mo", sub: "Scale via paid + SEO" },
          { label: "Month 6 run rate", value: "$80K/mo", sub: "$1M ARR milestone" },
        ].map(m => (
          <div key={m.label}>
            <p className="text-xs font-mono" style={{ color: brand.textMuted }}>{m.label}</p>
            <p className="font-display font-bold text-2xl" style={{ color: brand.accent }}>{m.value}</p>
            <p className="text-xs" style={{ color: brand.textMuted }}>{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompetitionSlide() {
  const cols = ["StayHome", "AARP HomeFit", "Age Safe America", "SafelyYou"]
  const rows = [
    { feature: "AI-powered assessment", values: [true, false, false, false] },
    { feature: "Contractor matching", values: [true, false, true, false] },
    { feature: "Consumer-grade UX", values: [true, false, false, false] },
    { feature: "Online self-service", values: [true, false, false, true] },
    { feature: "Under $200", values: [true, true, false, false] },
    { feature: "Mobile-first", values: [true, false, false, false] },
  ]

  return (
    <div className="flex flex-col justify-center h-full gap-7 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.textMuted }}>Competition</span>
        <h2 className="font-display font-bold text-5xl mt-2" style={{ color: brand.text }}>Nobody built the Airbnb of home safety.</h2>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: brand.borderLight }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: brand.surfaceAlt }}>
              <th className="text-left px-5 py-3 font-medium text-xs" style={{ color: brand.textMuted }}>Feature</th>
              {cols.map((c, i) => (
                <th key={c} className="px-5 py-3 font-semibold text-xs text-center"
                  style={{ color: i === 0 ? brand.accent : brand.textMuted }}>
                  {i === 0 ? "★ " : ""}{c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.feature} style={{ background: ri % 2 === 0 ? brand.surface : brand.bg }}>
                <td className="px-5 py-3" style={{ color: brand.textSecondary }}>{row.feature}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="px-5 py-3 text-center">
                    {v
                      ? <span style={{ color: brand.accent }} className="font-bold">✓</span>
                      : <span style={{ color: brand.border }}>✗</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm" style={{ color: brand.textMuted }}>
        Incumbents are institutional, expensive, or offline. We're the first consumer-grade, AI-powered, end-to-end solution.
      </p>
    </div>
  )
}

function GTMSlide() {
  const phases = [
    { phase: "Week 1–2", name: "Community Seeding", desc: "Reddit r/AgingInPlace + Facebook groups. Share free eBook. Build trust before the sell." },
    { phase: "Month 1", name: "SEO Foundation", desc: "5 pillar articles targeting +1,963% growth keyword. Organic flywheel starts." },
    { phase: "Month 2", name: "Paid Amplification", desc: "Facebook ads to daughter-demographic (32–52). $1,050 test budget. CPA target: <$30." },
    { phase: "Month 3", name: "ProductHunt + Pinterest", desc: "ProductHunt launch + Pinterest boards for DIY home safety. Dual viral channels." },
    { phase: "Month 4+", name: "B2B Partnerships", desc: "Certified Aging in Place Specialists (CAPS), senior living advisors, insurance referrals." },
  ]

  return (
    <div className="flex flex-col justify-center h-full gap-7 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.textMuted }}>Go-to-Market</span>
        <h2 className="font-display font-bold text-5xl mt-2" style={{ color: brand.text }}>Community first. Then content. Then paid.</h2>
      </div>
      <div className="flex flex-col gap-3">
        {phases.map((p, i) => (
          <div key={p.phase} className="flex items-start gap-5 rounded-xl p-5 border" style={{ background: brand.surface, borderColor: brand.borderLight }}>
            <div className="flex-shrink-0 text-right w-24">
              <p className="font-mono text-xs" style={{ color: brand.accent }}>{p.phase}</p>
            </div>
            <div className="w-px self-stretch" style={{ background: brand.borderLight }} />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: brand.text }}>{p.name}</p>
              <p className="text-xs leading-relaxed" style={{ color: brand.textSecondary }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>Team & Ask</span>
        <h2 className="font-display font-bold text-5xl mt-2 text-white">ChimeStream B.V. — serial AI builders.</h2>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-xl p-7 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
          <h3 className="font-display font-semibold text-xl text-white mb-1">ChimeStream B.V.</h3>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>Rotterdam, Netherlands — AI product studio</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              "Multiple AI SaaS products shipped",
              "Full-stack: strategy → design → code → marketing",
              "Stravix (AI content for SMBs) — live and growing",
              "Rapid iteration: idea to live app in days",
            ].map(b => (
              <li key={b} className="flex items-start gap-2">
                <span style={{ color: brand.accent }}>✓</span>
                <span style={{ color: "rgba(255,255,255,0.8)" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-7 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
          <h3 className="font-display font-semibold text-xl text-white mb-1">Partnership Ask</h3>
          <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>We're not raising — we're looking for strategic partners.</p>
          <ul className="flex flex-col gap-4">
            {[
              { icon: "🏥", label: "Healthcare networks", desc: "Patient referral pipelines" },
              { icon: "🔨", label: "Contractor networks", desc: "Vetted local pros in every city" },
              { icon: "📋", label: "CAPS specialists", desc: "Certified Aging in Place Specialists" },
            ].map(p => (
              <li key={p.label} className="flex items-center gap-3">
                <span className="text-xl">{p.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{p.label}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-xl p-5 border text-center" style={{ background: "rgba(123,171,139,0.15)", borderColor: "rgba(123,171,139,0.3)" }}>
        <p className="text-lg font-display font-medium text-white">
          Before the fall. Not after. — <span style={{ color: brand.accent }}>stayhome.ashketing.com</span>
        </p>
      </div>
    </div>
  )
}

// ── SLIDE DEFINITIONS ─────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: "title",
    label: "Title",
    bg: brand.bg,
    content: <TitleSlide />,
  },
  {
    id: "problem",
    label: "Problem",
    bg: brand.text,
    dark: true,
    content: <ProblemSlide />,
  },
  {
    id: "solution",
    label: "Solution",
    bg: brand.surfaceAlt,
    content: <SolutionSlide />,
  },
  {
    id: "market",
    label: "Market",
    bg: brand.accent,
    dark: true,
    content: <MarketSlide />,
  },
  {
    id: "how-it-works",
    label: "How It Works",
    bg: brand.bg,
    content: <HowItWorksSlide />,
  },
  {
    id: "traction",
    label: "Traction",
    bg: brand.surfaceAlt,
    content: <TractionSlide />,
  },
  {
    id: "business-model",
    label: "Business Model",
    bg: brand.bg,
    content: <BusinessModelSlide />,
  },
  {
    id: "competition",
    label: "Competition",
    bg: brand.surfaceAlt,
    content: <CompetitionSlide />,
  },
  {
    id: "gtm",
    label: "Go-to-Market",
    bg: brand.bg,
    content: <GTMSlide />,
  },
  {
    id: "team",
    label: "Team & Ask",
    bg: brand.text,
    dark: true,
    content: <TeamSlide />,
  },
]

// ── MAIN DECK ─────────────────────────────────────────────────────

export default function PitchPage() {
  const [current, setCurrent] = useState(0)
  const total = slides.length
  const slide = slides[current]

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next()
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev])

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: slide.bg, transition: "background 0.4s ease" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{
        background: slide.dark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.5)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${slide.dark ? "rgba(255,255,255,0.08)" : brand.borderLight}`,
      }}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: brand.accent }}>🏠</div>
          <span className="font-display font-bold text-base" style={{ color: slide.dark ? "white" : brand.text }}>StayHome</span>
          <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded" style={{
            background: slide.dark ? "rgba(255,255,255,0.1)" : brand.accentLight,
            color: slide.dark ? "rgba(255,255,255,0.7)" : brand.accent,
          }}>
            {slide.label}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs" style={{ color: slide.dark ? "rgba(255,255,255,0.4)" : brand.textMuted }}>
            {current + 1} / {total}
          </span>
          <Link href="/" className="p-1.5 rounded-lg transition-colors"
            style={{ color: slide.dark ? "rgba(255,255,255,0.5)" : brand.textMuted }}>
            <X className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 px-12 py-10 md:px-16 md:py-12"
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-8 py-4 flex-shrink-0" style={{
        background: slide.dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
        borderTop: `1px solid ${slide.dark ? "rgba(255,255,255,0.08)" : brand.borderLight}`,
      }}>
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: slide.dark
                  ? (i === current ? brand.accent : "rgba(255,255,255,0.25)")
                  : (i === current ? brand.accent : brand.border),
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
            style={{
              background: "transparent",
              borderColor: slide.dark ? "rgba(255,255,255,0.2)" : brand.border,
              color: slide.dark ? "white" : brand.text,
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={current === total - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: brand.accent, color: "white" }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
