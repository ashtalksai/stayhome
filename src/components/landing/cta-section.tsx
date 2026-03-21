"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="section-padding bg-[var(--text-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-inverse)] max-w-2xl">
            Start your free home safety assessment today
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl">
            Join 1,200+ families who&apos;ve replaced worry with a real plan. Takes 10 minutes. Peace of mind lasts much longer.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-10 py-6 text-lg shadow-button"
          >
            <Link href="/signup">
              Start Free Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <p className="text-[var(--text-muted)] text-sm">
            Free eBook • No credit card required • $99 AI Audit anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
