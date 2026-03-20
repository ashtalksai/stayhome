import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const audits = await prisma.audit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(audits)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { propertyName, address, answers } = await req.json()

  // Calculate safety score from answers
  const safetyScore = calculateScore(answers)

  const audit = await prisma.audit.create({
    data: {
      userId: session.user.id,
      propertyName: propertyName || "My Home",
      address,
      answers,
      safetyScore,
      status: "COMPLETED",
      report: generateReport(answers, safetyScore),
    },
  })

  return NextResponse.json(audit)
}

function calculateScore(answers: Record<string, string>): number {
  if (!answers) return 75
  const total = Object.keys(answers).length
  if (total === 0) return 75
  const safe = Object.values(answers).filter((v) => v === "yes").length
  return Math.round((safe / total) * 100)
}

function generateReport(answers: Record<string, string>, score: number) {
  const riskItems = []
  
  if (answers?.bathroomGrabBars === "no") {
    riskItems.push({ room: "Bathroom", risk: "No grab bars near toilet/shower", severity: "high", fix: "Install grab bars", cost: "$150–$300" })
  }
  if (answers?.staircaseRailing === "no") {
    riskItems.push({ room: "Stairs", risk: "Missing or loose stair railing", severity: "critical", fix: "Install/reinforce railings on both sides", cost: "$800–$1,500" })
  }
  if (answers?.nightLighting === "no") {
    riskItems.push({ room: "General", risk: "Inadequate night lighting in hallways", severity: "medium", fix: "Install motion-sensor night lights", cost: "$50–$150" })
  }
  if (answers?.bathroomNonSlip === "no") {
    riskItems.push({ room: "Bathroom", risk: "No non-slip mat in shower/tub", severity: "high", fix: "Add non-slip mat or adhesive strips", cost: "$20–$80" })
  }
  if (answers?.kitchenReach === "no") {
    riskItems.push({ room: "Kitchen", risk: "Frequently used items stored too high", severity: "medium", fix: "Reorganize storage to lower shelves", cost: "$0–$50" })
  }

  if (riskItems.length === 0) {
    riskItems.push({ room: "General", risk: "Some areas could be improved", severity: "low", fix: "Schedule a professional follow-up inspection", cost: "$150–$350" })
  }

  return {
    score,
    riskItems,
    summary: score >= 70
      ? "This home has good baseline safety. Address the flagged items to maximize protection."
      : score >= 40
      ? "Several important safety improvements needed. Prioritize high-risk items first."
      : "Significant safety concerns identified. Immediate attention recommended.",
    generatedAt: new Date().toISOString(),
  }
}
