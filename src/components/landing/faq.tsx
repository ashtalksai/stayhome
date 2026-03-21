"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Who is StayHome for?",
    a: "StayHome is designed for adult children (ages 35–55) who are worried about their aging parents' home safety. You don't need to be an expert — if you can answer yes/no questions about a home, you can complete the audit.",
  },
  {
    q: "How accurate is the AI risk assessment?",
    a: "Our AI was trained on thousands of real home safety assessments conducted by certified aging-in-place specialists. It identifies the same risk factors a professional would look for — at a fraction of the cost. It's not a replacement for a professional inspection, but it's a powerful first step.",
  },
  {
    q: "What if I'm not satisfied with the report?",
    a: "We offer a full refund within 7 days if you're not satisfied with your report. No questions asked.",
  },
  {
    q: "How are contractors vetted?",
    a: "All contractors in our network are background-checked, licensed, insured, and have specific experience with senior home modifications. We verify references and only accept contractors with 4.5+ star ratings from previous clients.",
  },
  {
    q: "How is this different from AARP HomeFit?",
    a: "AARP HomeFit is a free PDF guide — it gives general advice, not a personalized assessment of your parent's specific home. StayHome gives you room-by-room risk scores, prioritized fixes, real cost estimates, and connections to vetted contractors who will actually do the work.",
  },
  {
    q: "Can I complete the audit if I don't live with my parents?",
    a: "Yes — many of our users complete the audit during a visit, or walk through it on a video call with their parents. You can also save your progress and return later. The questions are designed to be answerable by anyone who has been in the home.",
  },
]

export function FAQ() {
  return (
    <section className="section-padding bg-[var(--surface-alt)]" id="faq">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Questions families ask
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-[var(--surface)] rounded-md border border-[var(--border-light)] px-6 shadow-card"
              >
                <AccordionTrigger className="font-body font-semibold text-[var(--text-primary)] text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--text-secondary)] text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
