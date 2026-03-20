"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, Star, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      // Sign in after registration
      const { signIn } = await import("next-auth/react")
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/dashboard")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left panel */}
        <div className="hidden lg:flex flex-col justify-center bg-[var(--surface-alt)] px-16 py-24">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-md flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-[var(--text-primary)]">StayHome</span>
          </div>
          <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-6 leading-tight">
            Keep your parents home.<br />Keep them safe.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12 leading-relaxed">
            Join 1,200+ families who&apos;ve replaced worry with a real plan. Your AI-powered home safety assessment is waiting.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon: Shield, text: "AI-powered risk assessment in 10 minutes" },
              { icon: Star, text: "Prioritized fixes with real cost estimates" },
              { icon: Users, text: "Matched with vetted local contractors" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <span className="text-[var(--text-secondary)] text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-white rounded-md p-6 shadow-card border border-[var(--border-light)]">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
              ))}
            </div>
            <p className="text-[var(--text-secondary)] text-sm italic mb-4">
              &ldquo;I&apos;d been putting this off for years. StayHome gave me a clear plan in 15 minutes.&rdquo;
            </p>
            <p className="text-[var(--text-primary)] text-sm font-semibold">Jennifer M. — Daughter, San Diego CA</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-24 bg-[var(--background)]">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">
              Create your account
            </h1>
            <p className="text-[var(--text-secondary)] text-sm mb-8">
              Free eBook instantly. AI Audit available after signup.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-[var(--text-secondary)] text-sm">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Sarah Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-[var(--border)] focus:ring-[var(--accent)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-[var(--text-secondary)] text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[var(--border)] focus:ring-[var(--accent)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-[var(--text-secondary)] text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="border-[var(--border)] focus:ring-[var(--accent)]"
                />
              </div>

              {error && (
                <p className="text-[var(--destructive)] text-sm">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-button mt-2"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--background)] px-2 text-[var(--text-muted)]">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-full border-[var(--border)] text-[var(--text-secondary)]"
              onClick={() => {
                import("next-auth/react").then(({ signIn }) => signIn("google", { callbackUrl: "/dashboard" }))
              }}
            >
              Continue with Google
            </Button>

            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--accent)] hover:underline">
                Log in
              </Link>
            </p>
            <p className="text-center text-xs text-[var(--text-muted)] mt-4">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline">Terms</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
