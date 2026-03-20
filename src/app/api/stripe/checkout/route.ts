import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

const PRICES = {
  audit: process.env.STRIPE_PRICE_AUDIT || "price_audit_placeholder",
  full: process.env.STRIPE_PRICE_FULL || "price_full_placeholder",
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { tier } = await req.json()
  const priceId = tier === "full" ? PRICES.full : PRICES.audit

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: session.user.email!,
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
      metadata: { userId: session.user.id!, tier },
    })
    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
