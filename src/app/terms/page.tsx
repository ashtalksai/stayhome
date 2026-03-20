import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[var(--background)] min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 py-20">
          <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-4">Legal</p>
          <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-4">Terms of Service</h1>
          <p className="text-[var(--text-muted)] text-sm mb-12">Last updated: March 2026</p>

          <div className="space-y-8">
            {[
              {
                title: "1. Acceptance of Terms",
                content: `By using StayHome, you agree to these Terms of Service. If you don't agree, please don't use our service. We may update these terms occasionally — continued use after changes means you accept the updated terms.`,
              },
              {
                title: "2. Service Description",
                content: `StayHome provides AI-powered home safety assessments and contractor matching services. Our assessments are informational tools designed to help families identify potential safety risks in homes. They are not professional engineering assessments, certified home inspections, or medical advice.

Our AI generates recommendations based on your answers. These recommendations are general guidance — they do not replace assessments by licensed professionals in your area.`,
              },
              {
                title: "3. User Accounts",
                content: `You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials. You must be 18 or older to use StayHome. One account per person.`,
              },
              {
                title: "4. Payments and Refunds",
                content: `All payments are processed securely through Stripe. Prices are in US Dollars unless otherwise specified.

Refund Policy: We offer a full refund within 7 days of purchase if you are not satisfied with your audit report. To request a refund, contact billing@stayhome.io. Refunds are not available after 7 days or after you have downloaded your PDF report and requested contractor quotes.`,
              },
              {
                title: "5. Limitation of Liability",
                content: `StayHome provides informational assessments only. We are not liable for:
                
• Physical injury or property damage arising from or related to our assessments
• Work performed by contractors in our network (contractors are independent businesses)
• The accuracy of cost estimates (these are ranges, not quotes)
• Actions or omissions of any contractors you engage

Our maximum liability to you for any claim is limited to the amount you paid for the service.`,
              },
              {
                title: "6. Contractor Relationships",
                content: `Contractors in our network are independent businesses. StayHome facilitates introductions but is not party to any contract between you and a contractor. We do not guarantee contractor availability, pricing, or workmanship. We recommend getting 2–3 quotes and verifying licenses independently before hiring.`,
              },
              {
                title: "7. Intellectual Property",
                content: `Your audit data belongs to you. You may download and share your reports. The StayHome platform, AI models, and branding are owned by ChimeStream B.V. You may not reverse-engineer, copy, or redistribute our platform.`,
              },
              {
                title: "8. Privacy",
                content: `Your use of StayHome is also governed by our Privacy Policy, which is incorporated by reference into these terms.`,
              },
              {
                title: "9. Governing Law",
                content: `These terms are governed by the laws of the Netherlands. Disputes will be resolved in Rotterdam, Netherlands courts.`,
              },
              {
                title: "10. Contact",
                content: `Questions about these terms: legal@stayhome.io | ChimeStream B.V., Rotterdam, Netherlands`,
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-4">
                  {section.title}
                </h2>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
