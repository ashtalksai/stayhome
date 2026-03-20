"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function Hero() {
  return (
    <section className="min-h-screen bg-[var(--surface-alt)] relative overflow-hidden flex items-center pt-16">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/bg-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-medium px-4 py-2 rounded-full">
                🏡 Trusted by 1,200+ families
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display font-bold text-[var(--text-primary)] leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Is your parents&apos; home safe for the next 20 years?
            </motion.h1>

            <motion.p
              variants={item}
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: "1.25rem" }}
            >
              StayHome runs an AI-powered room-by-room safety audit, identifies fall risks, and connects you with vetted local contractors — in under 10 minutes.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-8 shadow-button"
              >
                <Link href="/signup">
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--success)] text-[var(--success)] hover:bg-[var(--success-bg)] rounded-full px-8"
              >
                <Link href="/#how-it-works">
                  <Play className="mr-2 w-4 h-4" />
                  See How It Works
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-[var(--text-primary)]">2,400+</span>
                <span className="text-xs text-[var(--text-muted)]">Audits completed</span>
              </div>
              <div className="w-px h-10 bg-[var(--border)]" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-[var(--text-primary)]">18K+</span>
                <span className="text-xs text-[var(--text-muted)]">Risks prevented</span>
              </div>
              <div className="w-px h-10 bg-[var(--border)]" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-[var(--text-primary)]">40+</span>
                <span className="text-xs text-[var(--text-muted)]">Cities covered</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white/40 rounded-[var(--radius-xl)] blur-xl" />
              <Image
                src="/images/hero-illustration.png"
                alt="Cozy home exterior — safe for aging in place"
                width={560}
                height={480}
                className="hero-illustration relative rounded-[var(--radius-xl)] shadow-modal object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
