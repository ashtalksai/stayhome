import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "StayHome — AI Home Safety Audit + Contractor Matching for Seniors",
  description: "Keep your parents home. Keep them safe. StayHome runs an AI-powered room-by-room safety audit, identifies fall risks, and connects you with vetted local contractors — in under 10 minutes.",
  openGraph: {
    title: "StayHome — AI Home Safety Audit for Seniors",
    description: "Keep your parents home. Keep them safe.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
