"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border-light)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-md flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-[var(--text-primary)]">StayHome</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Login
          </Link>
          <Button
            asChild
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full px-6 shadow-button"
          >
            <Link href="/signup">Start Free Assessment</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-[var(--text-primary)]">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-[var(--background)]">
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <div className="w-8 h-8 bg-[var(--accent)] rounded-md flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg">StayHome</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-[var(--border)] pt-6 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="text-center text-sm font-medium text-[var(--text-secondary)]"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Button
                  asChild
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full"
                >
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Start Free Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
