"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const rooms = [
  {
    id: "entry",
    label: "Entry & Hallways",
    questions: [
      { id: "entryLighting", text: "Is the entry well-lit with easy-to-reach switches?", tip: "Poor lighting is a leading cause of falls" },
      { id: "entryRugs", text: "Are all rugs secured with non-slip backing?", tip: "Loose rugs are a major trip hazard" },
      { id: "entryClutter", text: "Are hallways clear of clutter and obstructions?", tip: "Clear paths allow safe navigation" },
      { id: "entryHandrail", text: "Is there a handrail at the front entry steps?", tip: "Required if there are 2+ steps" },
    ],
  },
  {
    id: "living",
    label: "Living Room",
    questions: [
      { id: "livingFurniture", text: "Is furniture arranged to allow clear walking paths?", tip: "Furniture corners are a major injury risk" },
      { id: "livingCords", text: "Are electrical cords tucked away and not crossing walking areas?", tip: "Cords on the floor are trip hazards" },
      { id: "livingSeating", text: "Are chairs and sofas firm enough to support getting up?", tip: "Soft seating is difficult for seniors to rise from" },
      { id: "livingLighting", text: "Is there adequate lighting throughout the room?", tip: "Seniors need 3x more light than younger adults" },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    questions: [
      { id: "kitchenReach", text: "Are frequently used items stored at easy-to-reach heights?", tip: "Avoid storing daily items above shoulder level" },
      { id: "kitchenFloor", text: "Is the kitchen floor non-slip and in good condition?", tip: "Wet kitchen floors are high-risk" },
      { id: "kitchenStool", text: "Is there a sturdy step stool for hard-to-reach items?", tip: "Never use chairs as step stools" },
      { id: "kitchenFire", text: "Is there a working smoke detector near the kitchen?", tip: "Test smoke detectors monthly" },
    ],
  },
  {
    id: "bathroom",
    label: "Bathroom",
    questions: [
      { id: "bathroomGrabBars", text: "Are grab bars installed near the toilet and in the shower/tub?", tip: "This is the #1 fall-prevention modification" },
      { id: "bathroomNonSlip", text: "Is there a non-slip mat in the shower/tub?", tip: "Wet surfaces are extremely dangerous" },
      { id: "bathroomLighting", text: "Is the bathroom well-lit, including at night?", tip: "Most bathroom falls happen at night" },
      { id: "bathroomDoor", text: "Can the bathroom door open from the outside in an emergency?", tip: "Outward-opening or sliding doors are safer" },
    ],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    questions: [
      { id: "bedroomNightLight", text: "Is there a night light or easy-to-reach lamp beside the bed?", tip: "Path to bathroom must be visible at night" },
      { id: "bedroomBedHeight", text: "Is the bed at a comfortable height (not too high or low)?", tip: "18-23 inches from floor to top of mattress is ideal" },
      { id: "bedroomPhone", text: "Is a phone accessible from the bed for emergencies?", tip: "Emergency calls must be reachable at any time" },
      { id: "bedroomClutter", text: "Is the path from bed to bathroom clear of obstacles?", tip: "Night-time falls are common and serious" },
    ],
  },
  {
    id: "stairs",
    label: "Stairs & Exterior",
    questions: [
      { id: "staircaseRailing", text: "Are there sturdy handrails on both sides of the stairs?", tip: "Critical safety requirement for any staircase" },
      { id: "staircaseLighting", text: "Are stairs well-lit with accessible switches at top and bottom?", tip: "Staircase falls cause 12,000 deaths/year in the US" },
      { id: "staircaseContrast", text: "Are stair edges clearly visible (contrast tape or edge marking)?", tip: "Depth perception decreases with age" },
      { id: "exteriorEntry", text: "Is the exterior pathway to the home even, well-lit, and slip-resistant?", tip: "Outdoor falls are often overlooked" },
    ],
  },
]

type Answer = "yes" | "no" | "unsure"

export default function AuditNewPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [propertyName, setPropertyName] = useState("")
  const [address, setAddress] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const currentRoom = rooms[step]
  const totalSteps = rooms.length
  const progress = ((step) / totalSteps) * 100

  const allAnswered = currentRoom?.questions.every((q) => answers[q.id])
  const isIntro = step === -1

  const handleAnswer = (questionId: string, answer: Answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyName: propertyName || "My Home", address, answers }),
      })
      if (res.ok) {
        const data = await res.json()
        router.push(`/audit/${data.id}`)
      } else if (res.status === 401) {
        router.push("/login?redirect=/audit/new")
      }
    } catch {
      setSubmitting(false)
    }
  }

  const getAnswerStyle = (qId: string, opt: Answer) => {
    const selected = answers[qId] === opt
    const baseStyle = "flex-1 py-3 text-sm font-medium rounded-sm border-2 transition-all duration-150 text-center cursor-pointer"
    if (!selected) return `${baseStyle} border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]`
    if (opt === "yes") return `${baseStyle} border-[var(--success)] bg-[var(--success-bg)] text-[var(--success)]`
    if (opt === "no") return `${baseStyle} border-[var(--destructive)] bg-[var(--destructive-bg)] text-[var(--destructive)]`
    return `${baseStyle} border-[var(--warning)] bg-[var(--warning-bg)] text-[var(--warning)]`
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-20 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          {/* Progress bar */}
          {step >= 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Room {step + 1} of {totalSteps}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {Math.round(((step + 1) / totalSteps) * 100)}% complete
                </span>
              </div>
              <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {/* Room pills */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {rooms.map((room, i) => (
                  <span
                    key={room.id}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      i < step
                        ? "bg-[var(--success-bg)] text-[var(--success)]"
                        : i === step
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--surface-muted)] text-[var(--text-muted)]"
                    }`}
                  >
                    {room.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === -1 ? (
              /* Intro */
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[var(--accent-light)] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Home className="w-8 h-8 text-[var(--accent)]" />
                </div>
                <h1 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
                  Home Safety Assessment
                </h1>
                <p className="text-[var(--text-secondary)] text-lg mb-8">
                  Answer simple yes/no/unsure questions about each room. Takes about 10 minutes. We&apos;ll generate your Safety Score instantly.
                </p>
                <div className="bg-[var(--surface)] rounded-lg p-6 shadow-card border border-[var(--border-light)] mb-8 text-left">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                        Property Name (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mom&apos;s House, Dad's Apartment"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-sm text-sm text-[var(--text-primary)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                        Address (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St, Portland, OR"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-sm text-sm text-[var(--text-primary)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setStep(0)}
                  size="lg"
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-10 shadow-button"
                >
                  Start Assessment
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              /* Room questions */
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-8">
                  <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">
                    {currentRoom.label}
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm">
                    {currentRoom.questions.length} questions — be honest, this is for safety
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-10">
                  {currentRoom.questions.map((q, i) => (
                    <div
                      key={q.id}
                      className="bg-[var(--surface)] rounded-md p-5 shadow-card border border-[var(--border-light)]"
                    >
                      <p className="font-body font-medium text-[var(--text-primary)] mb-1 text-sm">{q.text}</p>
                      <p className="text-xs text-[var(--text-muted)] mb-4">💡 {q.tip}</p>
                      <div className="flex gap-2">
                        {(["yes", "no", "unsure"] as Answer[]).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(q.id, opt)}
                            className={getAnswerStyle(q.id, opt)}
                          >
                            {opt === "yes" ? "✓ Yes" : opt === "no" ? "✗ No" : "? Unsure"}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setStep((s) => s - 1)}
                    className="text-[var(--text-muted)]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!allAnswered || submitting}
                    className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-8 shadow-button disabled:opacity-50"
                  >
                    {submitting ? "Analyzing..." : step === totalSteps - 1 ? "Generate My Report" : "Next Room"}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  )
}
