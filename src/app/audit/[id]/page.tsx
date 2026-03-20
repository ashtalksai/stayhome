import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, Download, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScoreRing } from "@/components/dashboard/score-ring"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"

const severityConfig: Record<string, { label: string; border: string; bg: string; text: string }> = {
  critical: { label: "Critical", border: "border-[var(--risk-critical)]", bg: "bg-[var(--destructive-bg)]", text: "text-[var(--risk-critical)]" },
  high: { label: "High", border: "border-[var(--risk-high)]", bg: "bg-[var(--destructive-bg)]", text: "text-[var(--risk-high)]" },
  medium: { label: "Medium", border: "border-[var(--risk-medium)]", bg: "bg-[var(--warning-bg)]", text: "text-[var(--risk-medium)]" },
  low: { label: "Low", border: "border-[var(--risk-low)]", bg: "bg-[var(--success-bg)]", text: "text-[var(--risk-low)]" },
}

const demoReport = {
  id: "demo",
  propertyName: "Mom's House",
  address: "123 Oak Street, Portland, OR",
  safetyScore: 67,
  status: "COMPLETED",
  createdAt: new Date(),
  report: {
    summary: "Several important safety improvements needed. Prioritize high-risk items first.",
    riskItems: [
      { room: "Stairs", risk: "Missing or loose stair railing", severity: "critical", fix: "Install handrails on both sides of the staircase", cost: "$800–$1,500" },
      { room: "Bathroom", risk: "No grab bars near toilet/shower", severity: "high", fix: "Install ADA-compliant grab bars near toilet and in shower", cost: "$150–$300" },
      { room: "Bathroom", risk: "No non-slip mat in shower/tub", severity: "high", fix: "Add suction-cup non-slip mat or adhesive strips", cost: "$20–$80" },
      { room: "General", risk: "Inadequate night lighting in hallways", severity: "medium", fix: "Install motion-sensor night lights in hallway and bathroom", cost: "$50–$150" },
      { room: "Kitchen", risk: "Frequently used items stored above shoulder height", severity: "medium", fix: "Reorganize to lower shelves; add a sturdy step stool", cost: "$0–$100" },
      { room: "Bedroom", risk: "No phone accessible from bed", severity: "low", fix: "Place phone/device on bedside table or get a medical alert device", cost: "$0–$300/year" },
    ],
  },
}

interface RiskItem {
  room: string
  risk: string
  severity: string
  fix: string
  cost: string
}

interface ReportData {
  summary: string
  riskItems: RiskItem[]
}

export default async function AuditResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let auditData: typeof demoReport = demoReport

  if (id !== "demo") {
    const session = await auth()
    if (!session?.user?.id) {
      redirect("/login")
    }

    const audit = await prisma.audit.findFirst({
      where: { id, userId: session.user.id },
    }).catch(() => null)

    if (audit) {
      auditData = {
        id: audit.id,
        propertyName: audit.propertyName,
        address: audit.address || "",
        safetyScore: audit.safetyScore || 0,
        status: audit.status,
        createdAt: audit.createdAt,
        report: (audit.report as unknown as ReportData) || demoReport.report,
      }
    }
  }

  const report = auditData
  const score = report.safetyScore
  const riskItems: RiskItem[] = (report.report as ReportData)?.riskItems || []

  const criticalItems = riskItems.filter((r) => r.severity === "critical" || r.severity === "high")
  const mediumItems = riskItems.filter((r) => r.severity === "medium")
  const lowItems = riskItems.filter((r) => r.severity === "low")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-20">
        {/* Hero */}
        <div className="bg-[var(--surface-alt)] py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Safety Report · {report.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <h1 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-2">
                  {report.propertyName}
                </h1>
                {report.address && (
                  <p className="text-[var(--text-muted)] text-sm mb-4">{report.address}</p>
                )}
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {(report.report as ReportData)?.summary}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <ScoreRing score={score} size={160} />
                <p className="text-sm text-[var(--text-muted)] text-center">Your home&apos;s safety score</p>
                <div className="flex gap-6 text-center">
                  <div>
                    <p className="font-mono font-bold text-lg text-[var(--risk-high)]">{criticalItems.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">High Priority</p>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-lg text-[var(--risk-medium)]">{mediumItems.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Medium Priority</p>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-lg text-[var(--risk-low)]">{lowItems.length}</p>
                    <p className="text-xs text-[var(--text-muted)]">Low Priority</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk breakdown */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)]">
              Risk Findings ({riskItems.length} items)
            </h2>
            <Button asChild variant="outline" className="rounded-full border-[var(--border)] text-[var(--text-secondary)] gap-2">
              <Link href={`/audit/${id}/report`}>
                <Download className="w-4 h-4" />
                PDF View
              </Link>
            </Button>
          </div>

          {[
            { items: criticalItems, title: "High Priority" },
            { items: mediumItems, title: "Medium Priority" },
            { items: lowItems, title: "Low Priority" },
          ].map(({ items, title }) =>
            items.length > 0 ? (
              <div key={title} className="mb-8">
                <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-3">{title}</h3>
                <div className="flex flex-col gap-3">
                  {items.map((item, i) => {
                    const config = severityConfig[item.severity] || severityConfig.low
                    return (
                      <div
                        key={i}
                        className={`border-l-4 ${config.border} ${config.bg} rounded-r-md p-5`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-mono font-medium ${config.text} uppercase`}>
                                {config.label} · {item.room}
                              </span>
                            </div>
                            <p className="font-body font-medium text-[var(--text-primary)] mb-2">{item.risk}</p>
                            <p className="text-sm text-[var(--text-secondary)]">
                              <strong>Fix:</strong> {item.fix}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-[var(--text-muted)]">Est. cost</p>
                            <p className="font-mono font-medium text-[var(--text-primary)] text-sm">{item.cost}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null
          )}

          {/* Contractor CTA */}
          <div className="mt-12 bg-[var(--accent-light)] rounded-lg p-8 border border-[var(--accent)]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-2">
                Ready to fix these issues?
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Get matched with vetted local contractors who specialize in senior home modifications. Background-checked, licensed, and insured.
              </p>
            </div>
            <Button
              asChild
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-button shrink-0"
            >
              <Link href="/contractors" className="gap-2 flex items-center">
                <Users className="w-4 h-4" />
                Find Contractors
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
