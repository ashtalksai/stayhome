import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ExternalLink, FileText } from "lucide-react"

const sections = [
  {
    id: "research",
    icon: "📊",
    title: "Research",
    desc: "IdeaBrowser data, competitor analysis, and market research",
    docs: [
      { title: "Research Report — StayHome", link: "https://docs.google.com/document/d/1BYETp0T0y9gHlD6-rmztHJtvFzInN_1x_YRhi0J4AII/edit", updated: "March 2026" },
    ],
  },
  {
    id: "gtm",
    icon: "🎯",
    title: "GTM",
    desc: "Go-to-market strategy and distribution plan",
    docs: [],
  },
  {
    id: "marketing",
    icon: "📣",
    title: "Marketing",
    desc: "Marketing plan, content strategy, and campaign assets",
    docs: [],
  },
  {
    id: "brand",
    icon: "🎨",
    title: "Brand",
    desc: "Brand identity, design system, and visual guidelines",
    docs: [
      { title: "Brand & Design Spec — StayHome", link: "https://docs.google.com/document/d/166_Ma6HC4QkQnIK1zd6qKjMMwkf4o_Gthf6EcOoEUAg/edit", updated: "March 2026" },
    ],
  },
  {
    id: "pitch",
    icon: "🎤",
    title: "Pitch",
    desc: "Pitch deck and investor materials",
    docs: [
      { title: "Interactive Pitch Deck", link: "/deck", updated: "March 2026", internal: true },
    ],
  },
]

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-24 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 bg-[var(--surface-alt)] border-r border-[var(--border-light)] fixed h-full mt-16">
          <div className="p-6">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-4">Documents</p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span>{s.icon}</span>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 md:ml-56 px-8 py-12">
          <div className="max-w-[900px]">
            <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-3">StayHome</p>
            <h1 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-2">Document Hub</h1>
            <p className="text-[var(--text-muted)] text-sm mb-12">All research, strategy, and brand documents in one place.</p>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <h2 className="font-display font-semibold text-xl text-[var(--text-primary)]">{section.title}</h2>
                      <p className="text-[var(--text-muted)] text-xs">{section.desc}</p>
                    </div>
                  </div>

                  {section.docs.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {section.docs.map((doc) => (
                        <a
                          key={doc.title}
                          href={doc.link}
                          target={"internal" in doc && doc.internal ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-[var(--surface)] rounded-md p-5 shadow-card border border-[var(--border-light)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[var(--text-muted)]" />
                            <div>
                              <p className="font-body font-medium text-[var(--text-primary)] text-sm group-hover:text-[var(--accent)] transition-colors">
                                {doc.title}
                              </p>
                              <p className="text-[var(--text-muted)] text-xs">Updated {doc.updated}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[var(--surface-muted)] rounded-md p-6 border border-dashed border-[var(--border)] text-center">
                      <p className="text-[var(--text-muted)] text-sm">Documents will appear here after Stage 8 (Marketing Plan).</p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
