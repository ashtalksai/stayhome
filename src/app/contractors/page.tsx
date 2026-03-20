import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Shield, Phone } from "lucide-react"

const contractors = [
  {
    name: "SafeHome Specialists",
    specialty: ["Grab Bars", "Ramps", "Stair Lifts", "Bathroom Modifications"],
    rating: 4.9,
    reviews: 142,
    distance: "2.3 miles",
    city: "Portland, OR",
    verified: true,
    bio: "15+ years specializing in CAPS-certified senior home modifications. From grab bars to full accessibility remodels.",
  },
  {
    name: "Aging In Place Pros",
    specialty: ["Railing Systems", "Lighting", "Flooring", "Entry Modifications"],
    rating: 4.8,
    reviews: 98,
    distance: "4.1 miles",
    city: "Portland, OR",
    verified: true,
    bio: "CAPS-certified team with deep expertise in fall prevention. Specializing in stair railings, lighting, and flooring upgrades.",
  },
  {
    name: "HomeComfort Contractors",
    specialty: ["Grab Bars", "Walk-in Tubs", "Shower Conversions", "Bathroom Safety"],
    rating: 4.7,
    reviews: 76,
    distance: "5.8 miles",
    city: "Portland, OR",
    verified: true,
    bio: "Bathroom modification specialists. Over 500 walk-in shower conversions and grab bar installations for seniors.",
  },
]

export default function ContractorsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[var(--background)] min-h-screen">
        {/* Header */}
        <section className="py-16 bg-[var(--surface-alt)] px-6">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-3">Contractor Network</p>
            <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-4">
              Vetted local contractors
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
              Every contractor in our network is background-checked, licensed, insured, and has CAPS certification or equivalent senior home modification experience.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <section className="py-6 px-6 border-b border-[var(--border-light)] bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto flex items-center gap-4 flex-wrap">
            <span className="text-sm text-[var(--text-muted)]">Filter by:</span>
            {["All", "Bathroom Safety", "Stair Modifications", "Ramps & Entry", "Lighting", "Flooring"].map((f) => (
              <button
                key={f}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  f === "All"
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Contractor cards */}
        <section className="py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Upsell banner */}
            <div className="mb-8 bg-[var(--accent-light)] rounded-lg p-6 border border-[var(--accent)]/20 flex items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-1">
                  Complete your audit to get personalized matches
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  After your AI Audit, we match you with contractors who specialize in exactly the fixes your home needs.
                </p>
              </div>
              <Button asChild className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-button shrink-0">
                <Link href="/audit/new">Start Audit ($99)</Link>
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {contractors.map((c) => (
                <div key={c.name} className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)] hover:shadow-card-hover transition-all duration-200">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display font-semibold text-xl text-[var(--text-primary)]">{c.name}</h3>
                        {c.verified && (
                          <span className="flex items-center gap-1 text-xs bg-[var(--success-bg)] text-[var(--success)] px-2 py-0.5 rounded-full">
                            <Shield className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
                          {c.rating} ({c.reviews} reviews)
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {c.distance} · {c.city}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm mb-4">{c.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {c.specialty.map((s) => (
                          <span key={s} className="text-xs bg-[var(--surface-muted)] text-[var(--text-secondary)] px-2.5 py-1 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-button shrink-0 gap-2">
                      <Phone className="w-4 h-4" />
                      Request Quote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
