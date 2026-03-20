import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X, Shield } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const plans = [
  {
    name: "Free Starter",
    price: "$0",
    desc: "Lead magnet",
    cta: "Download Free",
    href: "/signup",
    highlight: false,
    dark: false,
    features: [
      { text: "Home Safety eBook (PDF)", included: true },
      { text: "Top 10 fall prevention tips", included: true },
      { text: "Room-by-room checklist", included: true },
      { text: "AI risk assessment", included: false },
      { text: "Safety score", included: false },
      { text: "PDF report", included: false },
      { text: "Contractor matching", included: false },
      { text: "30-day follow-up", included: false },
    ],
  },
  {
    name: "AI Audit",
    price: "$99",
    desc: "Most popular",
    cta: "Start Your Audit",
    href: "/signup",
    highlight: true,
    dark: false,
    features: [
      { text: "Home Safety eBook (PDF)", included: true },
      { text: "Full AI room-by-room assessment", included: true },
      { text: "Safety score (0–100)", included: true },
      { text: "Prioritized risk recommendations", included: true },
      { text: "Cost estimates per fix", included: true },
      { text: "Downloadable PDF report", included: true },
      { text: "Contractor matching", included: false },
      { text: "30-day follow-up", included: false },
    ],
  },
  {
    name: "Full Package",
    price: "$199",
    desc: "Complete solution",
    cta: "Get Full Package",
    href: "/signup",
    highlight: false,
    dark: true,
    features: [
      { text: "Everything in AI Audit", included: true },
      { text: "Vetted contractor matching", included: true },
      { text: "3 contractor quotes guaranteed", included: true },
      { text: "30-day safety follow-up", included: true },
      { text: "Priority support", included: true },
      { text: "Contractor vetting report", included: true },
      { text: "Updated safety score at 30 days", included: true },
      { text: "Shareable family report", included: true },
    ],
  },
]

const pricingFaqs = [
  { q: "Is this a subscription?", a: "No. StayHome uses one-time pricing. You pay once and get your report and contractor matches. No recurring charges ever." },
  { q: "What's included in the audit?", a: "The AI audit covers all 6 areas of the home: entry/hallways, living room, kitchen, bathroom, bedroom, and stairs/exterior. You get a scored risk report with prioritized recommendations and cost estimates." },
  { q: "How quickly will I get my results?", a: "The safety score is generated instantly when you complete the audit. The detailed PDF report is ready within minutes." },
  { q: "What if I'm not happy with the report?", a: "We offer a full 7-day money-back guarantee, no questions asked. If you don't find the report valuable, we'll refund you completely." },
  { q: "How does contractor matching work?", a: "After completing your audit, we match you with 3 pre-vetted contractors in your area who specialize in senior home modifications. All are background-checked, licensed, and insured. You receive quotes within 48 hours." },
  { q: "Can I share the report with family or doctors?", a: "Yes. The PDF report is designed to be shared with family members, healthcare providers, or anyone helping with care decisions." },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[var(--background)]">
        {/* Header */}
        <section className="py-20 bg-[var(--surface-alt)] text-center px-6">
          <h1 className="font-display font-bold text-5xl md:text-6xl text-[var(--text-primary)] mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            One-time fee. No subscriptions. No surprises. Peace of mind shouldn&apos;t be a monthly bill.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="py-20 px-6">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-8 relative border-2 ${
                  plan.highlight
                    ? "border-[var(--accent)] bg-[var(--surface)]"
                    : plan.dark
                    ? "border-transparent bg-[var(--text-primary)]"
                    : "border-[var(--border-light)] bg-[var(--surface)]"
                } shadow-card`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--accent)] text-white text-xs font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <p className={`text-xs font-mono uppercase tracking-wider mb-1 ${plan.dark ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>
                  {plan.desc}
                </p>
                <h2 className={`font-display font-bold text-2xl mb-3 ${plan.dark ? "text-[var(--text-inverse)]" : "text-[var(--text-primary)]"}`}>
                  {plan.name}
                </h2>
                <div className="mb-8">
                  <span className={`font-display font-bold text-5xl ${plan.dark ? "text-[var(--text-inverse)]" : "text-[var(--text-primary)]"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.dark ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>
                    one-time
                  </span>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-start gap-2">
                      {f.included ? (
                        <Check className="w-4 h-4 text-[var(--success)] mt-0.5 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[var(--text-muted)] mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm ${f.included ? (plan.dark ? "text-[var(--text-inverse)]" : "text-[var(--text-secondary)]") : "text-[var(--text-muted)]"}`}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className={`w-full rounded-full ${
                    plan.highlight
                      ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-button"
                      : plan.dark
                      ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-button"
                      : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
                  }`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Money back guarantee */}
          <div className="max-w-[600px] mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-[var(--success)] mb-2">
              <Shield className="w-5 h-5" />
              <span className="font-body font-semibold">7-Day Money-Back Guarantee</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm">
              If you&apos;re not completely satisfied with your report, we&apos;ll refund you fully — no questions asked.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] text-center mb-12">
              Pricing questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {pricingFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-[var(--surface)] rounded-md border border-[var(--border-light)] px-6 shadow-card"
                >
                  <AccordionTrigger className="font-body font-semibold text-[var(--text-primary)] text-left hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--text-secondary)] text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
