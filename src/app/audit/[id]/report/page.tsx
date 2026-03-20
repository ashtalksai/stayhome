import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Home, Shield } from "lucide-react"
import { PrintButton } from "./print-button"

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
  generatedAt?: string
}

const severityConfig: Record<string, { label: string; color: string }> = {
  critical: { label: "CRITICAL", color: "#9B2F27" },
  high: { label: "HIGH", color: "#C0453A" },
  medium: { label: "MEDIUM", color: "#D4921E" },
  low: { label: "LOW", color: "#7BAB8B" },
}

export default async function AuditReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const audit = await prisma.audit.findFirst({
    where: { id, userId: session.user.id },
  }).catch(() => null)

  if (!audit) {
    redirect("/dashboard")
  }

  const reportData = audit.report as unknown as ReportData
  const riskItems: RiskItem[] = reportData?.riskItems || []
  const score = audit.safetyScore || 0

  const scoreColor = score >= 70 ? "#7BAB8B" : score >= 40 ? "#D4921E" : "#C0453A"
  const scoreLabel = score >= 70 ? "Good" : score >= 40 ? "Needs Attention" : "Urgent"

  const criticalItems = riskItems.filter((r) => r.severity === "critical" || r.severity === "high")
  const mediumItems = riskItems.filter((r) => r.severity === "medium")
  const lowItems = riskItems.filter((r) => r.severity === "low")

  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="min-h-screen bg-white">
      {/* Print toolbar — hidden on print */}
      <div className="print:hidden bg-[#FAF8F5] border-b border-[#EAE7E2] py-3 px-6 flex items-center justify-between">
        <Link href={`/audit/${id}`} className="flex items-center gap-2 text-sm text-[#7A706A] hover:text-[#2C2824] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Report
        </Link>
        <PrintButton />
      </div>

      {/* PDF Document */}
      <div className="max-w-[800px] mx-auto px-12 py-16 print:max-w-none print:px-16 print:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 pb-8 border-b-2 border-[#EAE7E2]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#7BAB8B] rounded-md flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-[#2C2824]" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>StayHome</span>
            </div>
            <h1 className="text-3xl font-bold text-[#2C2824] mb-1" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
              Home Safety Report
            </h1>
            <p className="text-[#7A706A] text-sm">{audit.propertyName}</p>
            {audit.address && <p className="text-[#7A706A] text-sm">{audit.address}</p>}
            <p className="text-[#7A706A] text-xs mt-2">
              Generated {new Date(audit.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Score ring */}
          <div className="flex flex-col items-center gap-2">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#EAE7E2" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={scoreColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="56" textAnchor="middle" fill={scoreColor} fontSize="28" fontWeight="bold" fontFamily="DM Mono, monospace">
                {score}
              </text>
              <text x="60" y="72" textAnchor="middle" fill="#7A706A" fontSize="11" fontFamily="Instrument Sans, sans-serif">
                /100
              </text>
            </svg>
            <p className="text-sm font-medium" style={{ color: scoreColor }}>{scoreLabel}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#F0EDE8] rounded-lg p-6 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#7BAB8B]" />
            <h2 className="font-semibold text-[#2C2824]" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>Assessment Summary</h2>
          </div>
          <p className="text-[#4A433D] text-sm leading-relaxed">{reportData?.summary}</p>
          <div className="flex gap-8 mt-4 pt-4 border-t border-[#D4CFCA]">
            <div>
              <p className="text-xl font-bold text-[#C0453A]" style={{ fontFamily: "DM Mono, monospace" }}>{criticalItems.length}</p>
              <p className="text-xs text-[#7A706A]">High Priority</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#D4921E]" style={{ fontFamily: "DM Mono, monospace" }}>{mediumItems.length}</p>
              <p className="text-xs text-[#7A706A]">Medium Priority</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#7BAB8B]" style={{ fontFamily: "DM Mono, monospace" }}>{lowItems.length}</p>
              <p className="text-xs text-[#7A706A]">Low Priority</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#2C2824]" style={{ fontFamily: "DM Mono, monospace" }}>{riskItems.length}</p>
              <p className="text-xs text-[#7A706A]">Total Items</p>
            </div>
          </div>
        </div>

        {/* Risk Items */}
        {[
          { items: criticalItems, title: "High Priority Items" },
          { items: mediumItems, title: "Medium Priority Items" },
          { items: lowItems, title: "Low Priority Items" },
        ].map(({ items, title }) =>
          items.length > 0 ? (
            <div key={title} className="mb-10">
              <h2
                className="text-lg font-bold text-[#2C2824] mb-4 pb-2 border-b border-[#EAE7E2]"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {title}
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((item, i) => {
                  const config = severityConfig[item.severity] || severityConfig.low
                  return (
                    <div key={i} className="border border-[#EAE7E2] rounded-md p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                              style={{ color: config.color, backgroundColor: `${config.color}18` }}
                            >
                              {config.label}
                            </span>
                            <span className="text-xs text-[#7A706A] font-medium">{item.room}</span>
                          </div>
                          <p className="font-medium text-[#2C2824] text-sm mb-2">{item.risk}</p>
                          <p className="text-sm text-[#4A433D]">
                            <strong>Recommended fix:</strong> {item.fix}
                          </p>
                        </div>
                        <div className="text-right shrink-0 pl-4">
                          <p className="text-xs text-[#7A706A]">Estimated cost</p>
                          <p className="font-mono font-bold text-sm text-[#2C2824]">{item.cost}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-[#EAE7E2] text-center">
          <p className="text-xs text-[#7A706A] mb-1">
            This report is generated by StayHome AI and is intended for informational purposes only.
          </p>
          <p className="text-xs text-[#7A706A] mb-3">
            For complex modifications, we recommend consulting a Certified Aging-in-Place Specialist (CAPS).
          </p>
          <p className="text-xs text-[#7A706A]">
            stayhome.ashketing.com · © {new Date().getFullYear()} StayHome — a ChimeStream product
          </p>
        </div>
      </div>


    </div>
  )
}
