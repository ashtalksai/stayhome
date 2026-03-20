import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[var(--background)] min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 py-20">
          <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-4">Legal</p>
          <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-4">Privacy Policy</h1>
          <p className="text-[var(--text-muted)] text-sm mb-12">Last updated: March 2026</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            {[
              {
                title: "1. Information We Collect",
                content: `We collect information you provide directly to us, including when you create an account, complete a home safety audit, or contact us for support. This includes:
                
• Name and email address
• Home address (optional, for audit context only)
• Audit responses (room-by-room answers to safety questions)
• Payment information (processed securely by Stripe — we never store card details)
• Communications you send us

We also automatically collect certain technical information when you use StayHome, including IP address, browser type, device information, and usage patterns (via anonymous analytics).`,
              },
              {
                title: "2. How We Use Your Information",
                content: `We use your information to:
                
• Create and maintain your account
• Generate your AI-powered home safety report
• Match you with relevant local contractors (if you purchase the Full Package)
• Process payments securely through Stripe
• Send you your audit results and recommendations
• Provide customer support
• Improve our service (using anonymized, aggregated data only)
• Comply with legal obligations`,
              },
              {
                title: "3. Information Sharing",
                content: `We do not sell your personal information. We share your information only in the following circumstances:

• With contractors (First and Last name, property address, audit summary) — only when you've purchased contractor matching and explicitly requested quotes
• With service providers who help us operate StayHome (Stripe for payments, hosting providers) — under strict data processing agreements
• If required by law or to protect the rights and safety of StayHome, our users, or others`,
              },
              {
                title: "4. Data Security",
                content: `We implement industry-standard security measures including:
                
• Encrypted data transmission (TLS/HTTPS)
• Encrypted passwords (bcrypt hashing)
• Database encryption at rest
• Regular security audits
• Strict access controls

No method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we take reasonable precautions to protect your data.`,
              },
              {
                title: "5. Your Rights",
                content: `You have the right to:
                
• Access the personal data we hold about you
• Correct inaccurate data
• Delete your account and associated data
• Download a copy of your audit data
• Opt out of marketing communications (you can always unsubscribe)

To exercise these rights, contact us at privacy@stayhome.io`,
              },
              {
                title: "6. Data Retention",
                content: `We retain your account information for as long as your account is active. If you delete your account, we will delete or anonymize your personal data within 30 days, except where we are legally required to retain it longer (e.g., payment records, which we keep for 7 years per financial regulations).`,
              },
              {
                title: "7. Cookies",
                content: `We use cookies for authentication (keeping you logged in), preferences, and anonymous analytics. We do not use advertising cookies or track you across other websites. You can disable cookies in your browser settings, but this may affect functionality.`,
              },
              {
                title: "8. Contact",
                content: `For privacy-related questions, email privacy@stayhome.io or write to: StayHome / ChimeStream B.V., Rotterdam, Netherlands.`,
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
