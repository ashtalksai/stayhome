"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ExternalLink, FileText, Menu, X, Home, ChevronRight, TrendingUp, Target, Megaphone, Palette, Presentation } from "lucide-react"

// Brand tokens
const brand = {
  bg: "#FAF8F5",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EDE8",
  surfaceMuted: "#F5F3EF",
  text: "#2C2824",
  textSecondary: "#4A433D",
  textMuted: "#7A706A",
  accent: "#7BAB8B",
  accentLight: "#EBF3EE",
  border: "#D4CFCA",
  borderLight: "#EAE7E2",
  warning: "#D4921E",
  warningBg: "#FDF3E3",
}

const navItems = [
  { id: "research", label: "Research", icon: TrendingUp, emoji: "📊" },
  { id: "gtm", label: "GTM Plan", icon: Target, emoji: "🎯" },
  { id: "marketing", label: "Marketing", icon: Megaphone, emoji: "📣" },
  { id: "brand", label: "Brand", icon: Palette, emoji: "🎨" },
  { id: "pitch", label: "Pitch", icon: Presentation, emoji: "🎤" },
]

// ── SECTION COMPONENTS ───────────────────────────────────────────

function SectionHeader({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{emoji}</span>
        <h2 className="font-display font-bold text-3xl" style={{ color: brand.text }}>{title}</h2>
      </div>
      <p className="text-sm" style={{ color: brand.textMuted }}>{desc}</p>
      <div className="mt-4 h-px" style={{ background: brand.borderLight }} />
    </div>
  )
}

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-xl p-6 border" style={{ background: brand.surface, borderColor: brand.borderLight }}>
      <p className="font-display font-bold text-4xl mb-1" style={{ color: brand.accent }}>{value}</p>
      <p className="font-medium text-sm" style={{ color: brand.text }}>{label}</p>
      {sub && <p className="text-xs mt-1" style={{ color: brand.textMuted }}>{sub}</p>}
    </div>
  )
}

function DocLink({ title, url, updated, internal }: { title: string; url: string; updated: string; internal?: boolean }) {
  return (
    <a
      href={url}
      target={internal ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-xl p-5 border transition-all duration-200 group"
      style={{ background: brand.surface, borderColor: brand.borderLight }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = brand.accent }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = brand.borderLight }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: brand.accentLight }}>
          <FileText className="w-4 h-4" style={{ color: brand.accent }} />
        </div>
        <div>
          <p className="font-medium text-sm" style={{ color: brand.text }}>{title}</p>
          <p className="text-xs" style={{ color: brand.textMuted }}>Updated {updated}</p>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: brand.textMuted }} />
    </a>
  )
}

// ── RESEARCH SECTION ─────────────────────────────────────────────

function ResearchSection() {
  return (
    <div>
      <SectionHeader emoji="📊" title="Research" desc="Market analysis, opportunity scoring, and validation signals." />

      <div className="grid grid-cols-2 gap-5 mb-6">
        <StatCard value="9/10" label="Opportunity Score" sub="Exceptional — IdeaBrowser rating" />
        <StatCard value="9/10" label="Problem Severity" sub="Severe pain, high motivation to pay" />
        <StatCard value="8/10" label="Why Now" sub="Great timing — boomer demographic peak" />
        <StatCard value="6/10" label="Feasibility" sub="Moderate challenge — worth attempting" />
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.accentLight, borderColor: brand.accent + "33" }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: brand.text }}>Market Opportunity</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "$100B+", label: "Home mod market (US)" },
            { value: "54M+", label: "US seniors 65+" },
            { value: "+1,963%", label: "Keyword growth" },
          ].map(m => (
            <div key={m.value} className="text-center">
              <p className="font-display font-bold text-2xl" style={{ color: brand.accent }}>{m.value}</p>
              <p className="text-xs" style={{ color: brand.textSecondary }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Competitive Landscape</h3>
        <div className="space-y-2">
          {[
            { name: "AARP HomeFit", weakness: "PDF checklist — no AI, no contractor match" },
            { name: "Age Safe America", weakness: "In-person only, $500+ consultant fee" },
            { name: "SafelyYou", weakness: "Falls detection tech only, no prevention" },
            { name: "StayHome", weakness: "✓ First consumer-grade AI + contractor solution", us: true },
          ].map(c => (
            <div key={c.name} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: c.us ? brand.accentLight : brand.surfaceMuted }}>
              <span className="text-xs font-mono w-36 flex-shrink-0 mt-0.5" style={{ color: c.us ? brand.accent : brand.textMuted }}>{c.name}</span>
              <span className="text-xs" style={{ color: c.us ? brand.text : brand.textSecondary }}>{c.weakness}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Validation Signals</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { platform: "Reddit", count: "8 communities", detail: "r/AgingInPlace, r/CareGiving…" },
            { platform: "Facebook", count: "6 groups", detail: "Combined 180K+ members" },
            { platform: "YouTube", count: "16 channels", detail: "Combined 2M+ subscribers" },
          ].map(v => (
            <div key={v.platform} className="rounded-lg p-4 text-center" style={{ background: brand.surfaceMuted }}>
              <p className="font-semibold text-sm" style={{ color: brand.text }}>{v.platform}</p>
              <p className="font-display font-bold text-xl mt-1" style={{ color: brand.accent }}>{v.count}</p>
              <p className="text-xs mt-1" style={{ color: brand.textMuted }}>{v.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <DocLink
        title="Research Report — StayHome"
        url="https://docs.google.com/document/d/1BYETp0T0y9gHlD6-rmztHJtvFzInN_1x_YRhi0J4AII/edit"
        updated="March 2026"
      />
    </div>
  )
}

// ── GTM SECTION ──────────────────────────────────────────────────

function GTMSection() {
  return (
    <div>
      <SectionHeader emoji="🎯" title="GTM Plan" desc="Go-to-market strategy, channel breakdown, timeline, and budget." />

      <div className="grid grid-cols-3 gap-5 mb-6">
        <StatCard value="$1,050" label="Month 1 budget" sub="Paid test + tools" />
        <StatCard value="~$14K" label="Month 1 revenue" sub="100 audits + upgrades" />
        <StatCard value="11" label="Audits to break-even" sub="Minimal risk threshold" />
      </div>

      <div className="rounded-xl border overflow-hidden mb-6" style={{ borderColor: brand.borderLight }}>
        <div className="px-6 py-4" style={{ background: brand.surfaceAlt }}>
          <h3 className="font-semibold text-sm" style={{ color: brand.text }}>5-Phase Launch Plan</h3>
        </div>
        <div className="divide-y" style={{ borderColor: brand.borderLight }}>
          {[
            { phase: "Week 1–2", name: "Community Seeding", desc: "Reddit r/AgingInPlace + Facebook groups. Free eBook as trust builder.", budget: "Free" },
            { phase: "Month 1", name: "SEO Foundation", desc: "5 pillar articles targeting 'aging in place home modifications' (+1,963% growth).", budget: "Tools" },
            { phase: "Month 2", name: "Paid Amplification", desc: "Facebook ads targeting adult daughters (32–52). CPA target: <$30.", budget: "$1,050" },
            { phase: "Month 3", name: "ProductHunt + Pinterest", desc: "ProductHunt launch + Pinterest boards for DIY home safety community.", budget: "Free" },
            { phase: "Month 4+", name: "B2B Partnerships", desc: "CAPS specialists, senior living advisors, insurance referrals.", budget: "Referral" },
          ].map(p => (
            <div key={p.phase} className="flex items-start gap-4 px-6 py-4" style={{ background: brand.surface }}>
              <div className="w-24 flex-shrink-0">
                <p className="text-xs font-mono" style={{ color: brand.accent }}>{p.phase}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm mb-0.5" style={{ color: brand.text }}>{p.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: brand.textSecondary }}>{p.desc}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs px-2 py-1 rounded-full font-mono" style={{ background: brand.accentLight, color: brand.accent }}>
                  {p.budget}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Revenue Projections</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { period: "Month 1", revenue: "~$14K", desc: "100 audits + upgrades" },
            { period: "Month 3", revenue: "~$40K/mo", desc: "Scale via paid + SEO" },
            { period: "Month 6", revenue: "$80K/mo", desc: "$1M ARR run rate" },
          ].map(r => (
            <div key={r.period} className="rounded-lg p-4" style={{ background: brand.surfaceMuted }}>
              <p className="text-xs font-mono mb-1" style={{ color: brand.textMuted }}>{r.period}</p>
              <p className="font-display font-bold text-2xl" style={{ color: brand.accent }}>{r.revenue}</p>
              <p className="text-xs mt-1" style={{ color: brand.textSecondary }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <DocLink
        title="GTM Plan — StayHome"
        url="https://docs.google.com/document/d/1O-PiRbovXyJHWN1o4JGjf_k993S7g3AldThQCXfHELw"
        updated="March 2026"
      />
    </div>
  )
}

// ── MARKETING SECTION ────────────────────────────────────────────

function MarketingSection() {
  return (
    <div>
      <SectionHeader emoji="📣" title="Marketing Plan" desc="Positioning, persona, content strategy, messaging pillars, and KPIs." />

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.accentLight, borderColor: brand.accent + "33" }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: brand.text }}>Positioning Statement</h3>
        <p className="text-lg font-display font-medium leading-relaxed" style={{ color: brand.text }}>
          "For adult daughters worried about aging parents who want to age in place safely, StayHome is the AI-powered home safety platform that turns anxiety into action — from hazard audit to vetted contractor, in 48 hours."
        </p>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Primary Persona</h3>
        <div className="flex items-start gap-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: brand.surfaceAlt }}>
            👩
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3">
            {[
              { label: "Name", value: "Sarah, 40" },
              { label: "Role", value: "Adult daughter, caretaker from afar" },
              { label: "Location", value: "Lives 2+ hrs from parents" },
              { label: "Emotion", value: "Worried, guilty, overwhelmed" },
              { label: "Budget", value: "$99–$199 = peace of mind" },
              { label: "Trigger", value: "Parent mentioned a near-miss fall" },
            ].map(d => (
              <div key={d.label}>
                <p className="text-xs" style={{ color: brand.textMuted }}>{d.label}</p>
                <p className="text-sm font-medium" style={{ color: brand.text }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Messaging Pillars</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { pillar: "Before the fall. Not after.", desc: "Proactive safety beats reactive crisis. We reframe from fear to empowerment." },
            { pillar: "10 minutes. Real answers.", desc: "No consultants, no endless forms. Actionable audit, immediate results." },
            { pillar: "Vetted. Fast. Trusted.", desc: "3 local contractor quotes in 48 hrs. Family never has to cold-call strangers." },
          ].map((p, i) => (
            <div key={p.pillar} className="rounded-xl p-5 border" style={{
              background: i === 1 ? brand.accent : brand.surfaceMuted,
              borderColor: i === 1 ? brand.accent : brand.borderLight,
            }}>
              <p className="font-display font-bold text-base mb-2 leading-snug" style={{ color: i === 1 ? "white" : brand.text }}>
                "{p.pillar}"
              </p>
              <p className="text-xs leading-relaxed" style={{ color: i === 1 ? "rgba(255,255,255,0.75)" : brand.textSecondary }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Content Strategy (4-Week Calendar)</h3>
        <div className="space-y-3">
          {[
            { week: "Week 1", focus: "Launch", blog: "Home Safety Guide for Seniors", email: "Welcome + eBook", social: "5 posts: problem/stat series" },
            { week: "Week 2", focus: "Educate", blog: "Aging in Place Modifications", email: "Audit upsell", social: "5 posts: how-it-works" },
            { week: "Week 3", focus: "Social Proof", blog: "Before/After case study", email: "Feature highlight", social: "5 posts: testimonial + tips" },
            { week: "Week 4", focus: "Convert", blog: "Fall Prevention Statistics", email: "Monthly roundup", social: "5 posts: urgency + CTA" },
          ].map(w => (
            <div key={w.week} className="grid grid-cols-4 gap-3 p-3 rounded-lg" style={{ background: brand.surfaceMuted }}>
              <div>
                <p className="text-xs font-mono" style={{ color: brand.accent }}>{w.week}</p>
                <p className="text-xs font-medium" style={{ color: brand.text }}>{w.focus}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: brand.textMuted }}>Blog</p>
                <p className="text-xs" style={{ color: brand.textSecondary }}>{w.blog}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: brand.textMuted }}>Email</p>
                <p className="text-xs" style={{ color: brand.textSecondary }}>{w.email}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: brand.textMuted }}>Social</p>
                <p className="text-xs" style={{ color: brand.textSecondary }}>{w.social}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DocLink
        title="Marketing Plan — StayHome"
        url="https://docs.google.com/document/d/16Plznh6CO2dIqV0zhu88GLFR7w5kAcUpfnAF0Qkd73M"
        updated="March 2026"
      />
    </div>
  )
}

// ── BRAND SECTION ────────────────────────────────────────────────

function BrandSection() {
  return (
    <div>
      <SectionHeader emoji="🎨" title="Brand" desc="Visual identity, color palette, typography, and design principles." />

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Color Palette</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: "Sage Green", hex: "#7BAB8B", role: "Primary accent" },
            { name: "Warm Sand", hex: "#FAF8F5", role: "Background" },
            { name: "Deep Oak", hex: "#2C2824", role: "Text primary" },
            { name: "Dusty Mist", hex: "#F0EDE8", role: "Surface alt" },
          ].map(c => (
            <div key={c.name} className="rounded-xl overflow-hidden border" style={{ borderColor: brand.borderLight }}>
              <div className="h-16 rounded-t-xl" style={{ background: c.hex }} />
              <div className="p-3" style={{ background: brand.surfaceMuted }}>
                <p className="font-semibold text-xs" style={{ color: brand.text }}>{c.name}</p>
                <p className="font-mono text-xs" style={{ color: brand.textMuted }}>{c.hex}</p>
                <p className="text-xs" style={{ color: brand.textMuted }}>{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Typography</h3>
        <div className="space-y-4">
          {[
            { font: "Cormorant Garamond", role: "Display — Headlines, hero text", sample: "Keep your parents home." },
            { font: "Instrument Sans", role: "Body — UI, paragraphs, labels", sample: "Clear, readable, and warm." },
            { font: "DM Mono", role: "Mono — Stats, data, code", sample: "87 / 100 safety score" },
          ].map(f => (
            <div key={f.font} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: brand.surfaceMuted }}>
              <div className="w-40 flex-shrink-0">
                <p className="text-xs font-mono" style={{ color: brand.textMuted }}>{f.font}</p>
                <p className="text-xs" style={{ color: brand.textSecondary }}>{f.role}</p>
              </div>
              <p className="text-xl" style={{ fontFamily: f.font === "Cormorant Garamond" ? "'Cormorant Garamond', serif" : f.font === "DM Mono" ? "'DM Mono', monospace" : "'Instrument Sans', sans-serif", color: brand.text }}>
                {f.sample}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border mb-6" style={{ background: brand.surface, borderColor: brand.borderLight }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: brand.text }}>Brand Voice</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: brand.accent }}>✓ DO</p>
            {[
              "Warm and reassuring — family first",
              "Specific and actionable — no fluff",
              "Empowering — anxiety → action",
              '"Before the fall, not after."',
            ].map(d => (
              <div key={d} className="flex items-start gap-2 mb-1">
                <span className="text-xs mt-0.5" style={{ color: brand.accent }}>✓</span>
                <p className="text-xs" style={{ color: brand.textSecondary }}>{d}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "#C0453A" }}>✗ DON'T</p>
            {[
              "Fear-mongering or guilt trips",
              "Medical/clinical jargon",
              "Corporate or insurance speak",
              '"Your loved one is at risk."',
            ].map(d => (
              <div key={d} className="flex items-start gap-2 mb-1">
                <span className="text-xs mt-0.5" style={{ color: "#C0453A" }}>✗</span>
                <p className="text-xs" style={{ color: brand.textSecondary }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DocLink
        title="Brand & Design Spec — StayHome"
        url="https://docs.google.com/document/d/166_Ma6HC4QkQnIK1zd6qKjMMwkf4o_Gthf6EcOoEUAg/edit"
        updated="March 2026"
      />
    </div>
  )
}

// ── PITCH SECTION ────────────────────────────────────────────────

function PitchSection() {
  const slides = [
    { n: 1, title: "Title", desc: "StayHome — Safety Score ring animation. 'Keep your parents home. Keep them safe.'" },
    { n: 2, title: "Problem", desc: "75% want to age in place. 1 in 4 will fall. $35K avg hospitalization. Families are lost." },
    { n: 3, title: "Solution", desc: "AI audit → personalized report → vetted contractor matching. 48 hours, not months." },
    { n: 4, title: "Market", desc: "$100B+ market, 54M seniors, +1,963% keyword growth. Nobody made it beautiful yet." },
    { n: 5, title: "How It Works", desc: "4-step flow: audit → AI score → report → contractor match. With real user quote." },
    { n: 6, title: "Traction", desc: "Community signals: 8 Reddit communities, 6 Facebook groups, 16 YouTube channels." },
    { n: 7, title: "Business Model", desc: "Free eBook → $99 Audit → $199 Contractor Match → $249 Bundle. Path to $1M ARR." },
    { n: 8, title: "Competition", desc: "Feature matrix: AARP, Age Safe America, SafelyYou vs StayHome. First mover." },
    { n: 9, title: "Go-to-Market", desc: "5-phase plan: community → SEO → paid → ProductHunt → B2B partnerships." },
    { n: 10, title: "Team & Ask", desc: "ChimeStream B.V. — serial AI builders. Looking for partners, not funding." },
  ]

  return (
    <div>
      <SectionHeader emoji="🎤" title="Pitch Deck" desc="10-slide interactive pitch deck for investors and partners." />

      <div className="rounded-xl p-7 border mb-6 flex items-center justify-between" style={{ background: brand.accentLight, borderColor: brand.accent + "33" }}>
        <div>
          <h3 className="font-display font-bold text-xl mb-1" style={{ color: brand.text }}>Interactive Pitch Deck</h3>
          <p className="text-sm" style={{ color: brand.textSecondary }}>Full-screen animated presentation. Arrow keys or swipe to navigate.</p>
        </div>
        <Link
          href="/pitch"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all"
          style={{ background: brand.accent }}
        >
          Open Pitch <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {slides.map(s => (
          <div key={s.n} className="flex items-start gap-4 p-4 rounded-xl border" style={{ background: brand.surface, borderColor: brand.borderLight }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold"
              style={{ background: brand.accentLight, color: brand.accent }}>
              {s.n}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: brand.text }}>{s.title}</p>
              <p className="text-xs leading-relaxed mt-0.5" style={{ color: brand.textSecondary }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <DocLink
          title="Pitch Deck Content — StayHome"
          url="https://docs.google.com/document/d/1Zlkr22WLy-0l1KvY_K6btpAwxZKB0Oh4jjoazDBP3IA"
          updated="March 2026"
        />
      </div>
    </div>
  )
}

// ── MAIN PAGE ────────────────────────────────────────────────────

const sectionComponents: Record<string, React.ReactNode> = {
  research: <ResearchSection />,
  gtm: <GTMSection />,
  marketing: <MarketingSection />,
  brand: <BrandSection />,
  pitch: <PitchSection />,
}

export default function DocsPage() {
  const [active, setActive] = useState("research")
  const [mobileOpen, setMobileOpen] = useState(false)

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && navItems.find(n => n.id === hash)) {
      setActive(hash)
    }
  }, [])

  const handleNav = (id: string) => {
    setActive(id)
    setMobileOpen(false)
    window.history.replaceState(null, "", `/docs#${id}`)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: brand.bg, fontFamily: "'Instrument Sans', sans-serif" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 border-b" style={{
        background: brand.surface,
        borderColor: brand.borderLight,
      }}>
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1.5 rounded-lg"
            style={{ color: brand.textMuted }}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium" style={{ color: brand.textMuted }}>
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">StayHome</span>
          </Link>
          <span style={{ color: brand.border }}>/</span>
          <span className="text-sm font-medium" style={{ color: brand.text }}>Docs</span>
        </div>
        <Link
          href="https://stayhome.ashketing.com"
          target="_blank"
          className="text-xs font-mono px-3 py-1.5 rounded-full border flex items-center gap-1.5"
          style={{ borderColor: brand.borderLight, color: brand.textMuted }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: brand.accent }} />
          Live App
        </Link>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${mobileOpen ? "flex" : "hidden"} md:flex flex-col fixed md:sticky top-[49px] h-[calc(100vh-49px)] w-64 border-r z-20 overflow-y-auto`}
          style={{ background: brand.surface, borderColor: brand.borderLight }}
        >
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: brand.textMuted }}>Sections</p>
            <nav className="flex flex-col gap-1">
              {navItems.map(item => {
                const isActive = active === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all w-full"
                    style={{
                      background: isActive ? brand.accentLight : "transparent",
                      color: isActive ? brand.accent : brand.textSecondary,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="mt-auto p-5 border-t" style={{ borderColor: brand.borderLight }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: brand.textMuted }}>Links</p>
            {[
              { label: "Live App", url: "https://stayhome.ashketing.com", external: true },
              { label: "Pitch Deck", url: "/pitch", external: false },
              { label: "GitHub", url: "https://github.com/ashtalksai/stayhome", external: true },
              { label: "Marketing Folder", url: "https://drive.google.com/drive/folders/12WdevW30vPyZGAf1E_7qahJHhLiULlBB", external: true },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target={link.external ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex items-center justify-between py-1.5 text-xs transition-colors"
                style={{ color: brand.textMuted }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = brand.accent }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = brand.textMuted }}
              >
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-10 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 py-10 md:px-12">
          <div className="max-w-[800px]">
            {sectionComponents[active]}
          </div>
        </main>
      </div>
    </div>
  )
}
