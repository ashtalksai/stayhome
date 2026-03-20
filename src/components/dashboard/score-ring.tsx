"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface ScoreRingProps {
  score: number
  size?: number
}

export function ScoreRing({ score, size = 120 }: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference

  const getColor = (s: number) => {
    if (s >= 70) return "var(--success)"
    if (s >= 40) return "var(--warning)"
    return "var(--destructive)"
  }

  const getLabel = (s: number) => {
    if (s >= 70) return "Safe"
    if (s >= 40) return "Caution"
    return "At Risk"
  }

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(eased * score))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, score])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-light)"
            strokeWidth="8"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - progress } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-bold text-2xl" style={{ color: getColor(score) }}>
            {displayScore}
          </span>
          <span className="text-xs text-[var(--text-muted)]">/100</span>
        </div>
      </div>
      <span
        className="text-xs font-medium font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
        style={{
          color: getColor(score),
          background: `${getColor(score)}20`,
        }}
      >
        {getLabel(score)}
      </span>
    </div>
  )
}
