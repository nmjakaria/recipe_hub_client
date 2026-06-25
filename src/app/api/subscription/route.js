import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, userEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          // Swap this out with your actual recurring price ID generated in your Stripe dashboard
          price: 'price_1TlzjLBmPdF0o6vmmXO7cZlM', 
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user/cancel`,
      metadata: {
        userId: userId,
        userEmail: userEmail,
        planType: "premium"
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}