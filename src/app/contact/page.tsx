import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Mail, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-[var(--background)] min-h-screen">
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-4">Contact</p>
              <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-6">
                We&apos;re here to help.
              </h1>
              <p className="text-[var(--text-secondary)] text-lg mb-10">
                Questions about the audit, report, or contractors? We respond to every message within one business day.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  { icon: Mail, title: "Email", desc: "hello@stayhome.io", sub: "Fastest way to reach us" },
                  { icon: Clock, title: "Response Time", desc: "Within 24 hours", sub: "Business days" },
                  { icon: MessageSquare, title: "Support", desc: "support@stayhome.io", sub: "For audit and billing questions" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--accent-light)] rounded-md flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-[var(--text-primary)] text-sm">{item.title}</p>
                      <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
                      <p className="text-[var(--text-muted)] text-xs">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-[var(--surface)] rounded-xl shadow-modal border border-[var(--border-light)] p-8">
              <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-6">
                Send us a message
              </h2>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[var(--text-secondary)] text-sm">First Name</Label>
                    <Input placeholder="Sarah" className="border-[var(--border)]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[var(--text-secondary)] text-sm">Last Name</Label>
                    <Input placeholder="Johnson" className="border-[var(--border)]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[var(--text-secondary)] text-sm">Email</Label>
                  <Input type="email" placeholder="sarah@example.com" className="border-[var(--border)]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[var(--text-secondary)] text-sm">Subject</Label>
                  <Input placeholder="Question about my audit report" className="border-[var(--border)]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[var(--text-secondary)] text-sm">Message</Label>
                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-sm text-sm text-[var(--text-primary)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                  />
                </div>
                <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-button">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
