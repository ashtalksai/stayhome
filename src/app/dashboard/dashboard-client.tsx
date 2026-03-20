"use client"

import Link from "next/link"
import { Home, ClipboardList, Users, FileText, Settings, LogOut, Plus, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScoreRing } from "@/components/dashboard/score-ring"
import { signOut } from "next-auth/react"

interface Audit {
  id: string
  propertyName: string
  address: string | null
  safetyScore: number | null
  status: string
  createdAt: Date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any
}

interface Props {
  user: { name: string; email: string }
  audits: Audit[]
}

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", active: true },
  { href: "/audit/new", icon: ClipboardList, label: "New Audit" },
  { href: "/contractors", icon: Users, label: "Contractors" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function DashboardClient({ user, audits }: Props) {
  const latestAudit = audits[0]
  const score = latestAudit?.safetyScore ?? null
  const riskItems = (latestAudit?.report as { riskItems?: Array<{ severity: string }> })?.riskItems || []
  const highRisks = riskItems.filter((r) => r.severity === "high" || r.severity === "critical").length
  const fixedThisMonth = 0 // Would come from tracked completions

  const getDay = () => {
    const h = new Date().getHours()
    if (h < 12) return "morning"
    if (h < 17) return "afternoon"
    return "evening"
  }

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[var(--surface-alt)] border-r border-[var(--border-light)] fixed h-full">
        <div className="p-6 border-b border-[var(--border-light)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-md flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-[var(--text-primary)]">StayHome</span>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "border-l-2 border-[var(--accent)] bg-[var(--surface-hover)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-[var(--border-light)]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center">
              <span className="text-xs font-bold text-[var(--accent)]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 flex items-center gap-2 px-3 py-2 w-full text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--surface-hover)] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-60 p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">
            Good {getDay()}, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-[var(--text-muted)] mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Safety Score */}
          <div className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)] flex flex-col items-center gap-2">
            {score !== null ? (
              <ScoreRing score={score} />
            ) : (
              <div className="text-center">
                <p className="font-mono text-3xl font-bold text-[var(--text-muted)]">—</p>
                <p className="text-xs text-[var(--text-muted)]">No audit yet</p>
              </div>
            )}
            <p className="text-xs text-[var(--text-muted)] text-center">Safety Score</p>
          </div>

          {/* Risks Identified */}
          <div className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)] flex flex-col gap-2">
            <AlertTriangle className="w-6 h-6 text-[var(--destructive)]" />
            <p className="font-display font-bold text-4xl text-[var(--destructive)]">{highRisks}</p>
            <p className="text-xs text-[var(--text-muted)]">High-Risk Items</p>
          </div>

          {/* Fixed */}
          <div className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)] flex flex-col gap-2">
            <CheckCircle className="w-6 h-6 text-[var(--success)]" />
            <p className="font-display font-bold text-4xl text-[var(--success)]">{fixedThisMonth}</p>
            <p className="text-xs text-[var(--text-muted)]">Fixed This Month</p>
          </div>

          {/* Audits */}
          <div className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)] flex flex-col gap-2">
            <FileText className="w-6 h-6 text-[var(--text-muted)]" />
            <p className="font-display font-bold text-4xl text-[var(--text-primary)]">{audits.length}</p>
            <p className="text-xs text-[var(--text-muted)]">Audits Complete</p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mb-8">
          <div className="bg-[var(--accent-light)] rounded-lg p-6 border border-[var(--accent)]/20 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-1">
                {audits.length === 0 ? "Start your first home safety audit" : "Run another safety audit"}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                {audits.length === 0
                  ? "Answer room-by-room questions — takes 10 minutes. Get your Safety Score instantly."
                  : "Has anything changed at home? Run an updated assessment to refresh your score."}
              </p>
            </div>
            <Button
              asChild
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-button shrink-0 ml-4"
            >
              <Link href="/audit/new">
                <Plus className="w-4 h-4 mr-2" />
                New Audit
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Audits */}
        <div>
          <h2 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-4">Recent Audits</h2>
          {audits.length === 0 ? (
            <div className="bg-[var(--surface)] rounded-lg p-12 shadow-card border border-[var(--border-light)] text-center">
              <ClipboardList className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2">No audits yet</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Complete your first safety audit to see your home&apos;s risk score.</p>
              <Button asChild className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full">
                <Link href="/audit/new">Start First Audit</Link>
              </Button>
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-lg shadow-card border border-[var(--border-light)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-light)] bg-[var(--surface-muted)]">
                    <th className="text-left px-6 py-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Property</th>
                    <th className="text-left px-6 py-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider hidden md:table-cell">Address</th>
                    <th className="text-center px-6 py-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Score</th>
                    <th className="text-left px-6 py-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {audits.map((audit, i) => {
                    const score = audit.safetyScore ?? 0
                    const color = score >= 70 ? "var(--success)" : score >= 40 ? "var(--warning)" : "var(--destructive)"
                    return (
                      <tr key={audit.id} className={`${i < audits.length - 1 ? "border-b border-[var(--border-light)]" : ""} hover:bg-[var(--surface-muted)] transition-colors`}>
                        <td className="px-6 py-4">
                          <p className="font-body font-medium text-[var(--text-primary)] text-sm">{audit.propertyName}</p>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <p className="text-[var(--text-muted)] text-sm">{audit.address || "—"}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-mono font-bold text-sm" style={{ color }}>{score}/100</span>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <p className="text-[var(--text-muted)] text-sm">
                            {new Date(audit.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <Button asChild variant="ghost" size="sm" className="text-[var(--accent)] text-xs">
                            <Link href={`/audit/${audit.id}`}>View Report →</Link>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
