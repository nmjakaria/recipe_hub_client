//app/api/checkout/route.js
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, userEmail, recipeId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          price: 'price_1TlznbBmPdF0o6vmITtEHSaV',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/recipes/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,

      metadata: {
        userId: userId,
        userEmail: userEmail,
        recipeId: recipeId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}