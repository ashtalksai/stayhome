import Link from "next/link"
import { Home } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-[var(--text-inverse)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-md flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">StayHome</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Keep your parents home. Keep them safe.
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-4">
              AI-powered home safety audits + vetted contractor matching for families who want their loved ones to age safely in place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Product
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/#how-it-works", label: "How It Works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/about", label: "About" },
                { href: "/contractors", label: "Contractors" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-inverse)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-inverse)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-xs text-[var(--text-muted)]">
                © {new Date().getFullYear()} StayHome. All rights reserved.
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                ChimeStream B.V.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
