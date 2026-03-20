"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Home, Shield, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
    setLoading(false)
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
            Welcome back.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12 leading-relaxed">
            Your home safety dashboard and audit history are waiting.
          </p>
          <div className="bg-white rounded-md p-6 shadow-card border border-[var(--border-light)]">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
              ))}
            </div>
            <p className="text-[var(--text-secondary)] text-sm italic mb-4">
              &ldquo;My siblings kept arguing about what needed fixing first. The report settled it — we had a prioritized list with costs.&rdquo;
            </p>
            <p className="text-[var(--text-primary)] text-sm font-semibold">Sarah L. — Daughter, Chicago IL</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-24 bg-[var(--background)]">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">
              Log in to StayHome
            </h1>
            <p className="text-[var(--text-secondary)] text-sm mb-8">
              Access your safety dashboard and audit reports.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-[var(--text-secondary)] text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[var(--border)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[var(--text-secondary)] text-sm">Password</Label>
                  <Link href="#" className="text-xs text-[var(--accent)] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[var(--border)]"
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
                {loading ? "Logging in..." : "Log In"}
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
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Continue with Google
            </Button>

            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[var(--accent)] hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
