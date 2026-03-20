import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const values = [
  {
    title: "Family First",
    desc: "Every decision we make is based on what helps families have more peace of mind and more time with the people they love.",
  },
  {
    title: "Honest Assessment",
    desc: "We don't sugarcoat risks. Families deserve to know what's actually dangerous in the home — not a sanitized version.",
  },
  {
    title: "Vetted Partners Only",
    desc: "We'd rather have fewer contractors in our network who are excellent than a large directory of unknowns. Quality over quantity.",
  },
  {
    title: "Accessible Expertise",
    desc: "Professional home safety assessments cost $350+ and aren't available everywhere. We believe every family should have access to this knowledge.",
  },
]

const stats = [
  { value: "1,200+", label: "Families helped" },
  { value: "2,400+", label: "Audits completed" },
  { value: "18,000+", label: "Risks identified" },
  { value: "40+", label: "Cities covered" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[var(--background)]">
        {/* Hero */}
        <section className="py-20 bg-[var(--surface-alt)] px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-4">About StayHome</p>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
                We built StayHome because we worried too.
              </h1>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                Like millions of adult children, we watched our parents age in homes that hadn&apos;t been designed with safety in mind. We didn&apos;t know what needed fixing. We didn&apos;t know who to call. We didn&apos;t know what it would cost.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                So we built the tool we wish we&apos;d had — an AI-powered assessment that gives families a clear, prioritized plan and connects them with contractors who know exactly what to do.
              </p>
            </div>
            <div>
              <Image
                src="/images/about-visual.png"
                alt="Family — daughter and elderly mother at home"
                width={560}
                height={420}
                className="rounded-[var(--radius-xl)] shadow-modal object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-6">
              Our mission
            </h2>
            <p className="text-[var(--text-secondary)] text-xl leading-relaxed">
              75% of seniors want to age in place. 25% will fall this year. We believe those two facts should not be in conflict. Every home can be made safer — families just need the knowledge and the right people to help.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[var(--accent)] px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-5xl text-white mb-1">{s.value}</p>
                <p className="text-[var(--accent-foreground)]/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] text-center mb-12">
              What we believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-[var(--surface)] rounded-md p-8 shadow-card border border-[var(--border-light)]">
                  <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-3">{v.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-[600px] mx-auto">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Ready to get started?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Take 10 minutes today. Give yourself real peace of mind about the home your parents love.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-10 shadow-button"
            >
              <Link href="/signup">Start Free Assessment</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
