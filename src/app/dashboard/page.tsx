import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audits: any[] = await prisma.audit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  // Seed a demo audit if none exist
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let displayAudits: any[] = audits
  if (audits.length === 0) {
    displayAudits = [
      {
        id: "demo",
        userId: session.user.id,
        propertyName: "Mom's House",
        address: "123 Oak Street, Portland, OR",
        safetyScore: 67,
        status: "COMPLETED" as const,
        tier: "AUDIT" as const,
        answers: null,
        report: {
          score: 67,
          summary: "Several important safety improvements needed. Prioritize high-risk items first.",
          riskItems: [
            { room: "Bathroom", risk: "No grab bars near toilet/shower", severity: "high", fix: "Install grab bars", cost: "$150–$300" },
            { room: "Stairs", risk: "Missing stair railing on one side", severity: "critical", fix: "Install railings on both sides", cost: "$800–$1,500" },
            { room: "General", risk: "Inadequate night lighting in hallways", severity: "medium", fix: "Install motion-sensor night lights", cost: "$50–$150" },
          ],
        },
        pdfUrl: null,
        stripePaymentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  }

  return (
    <DashboardClient
      user={{ name: session.user.name || "there", email: session.user.email || "" }}
      audits={displayAudits}
    />
  )
}
