/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { stripe } from '@/lib/stripe';
import { createSubscription } from '@/lib/actions/user';


export default async function SubscriptionSuccessPage({ searchParams }) {
    const params = await searchParams;
    const sessionId = params?.session_id;

    let processSuccess = false;
    let customerEmail = "";

    if (sessionId) {
        try {
            // 1. Fetch complete subscription billing objects back from Stripe
            const session = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ['subscription']
            });

            const subscription = session.subscription;
            customerEmail = session.customer_details?.email || session.metadata?.userEmail;

            // Inside your Next.js Server Component success page:
            if (session.payment_status === 'paid' && subscription) {

                const expirationDate = subscription?.current_period_end
                    ? new Date(subscription.current_period_end * 1000).toISOString()
                    : null;

                const subscriptionData = {
                    userId: session.metadata?.userId,
                    userEmail: customerEmail,
                    stripeSubscriptionId: subscription.id || session.subscription, // Fallback to raw string ID if not expanded
                    stripePriceId: subscription?.items?.data?.[0]?.price?.id || '',
                    status: subscription.status || 'active',
                    amount: session.amount_total / 100,
                    expiresAt: expirationDate
                };

                // 🔴 FIX: Capture the actual return value from your database action
                const dbResponse = await createSubscription(subscriptionData);

                if (dbResponse && dbResponse.success === true) {
                    processSuccess = true;

                } else {
                    console.error("🔴 Express Backend rejected saving data:", dbResponse);
                }
            }
        } catch (err) {
            console.error("🔴 Error compiling subscription synchronization step:", err);
        }
    }

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 antialiased text-zinc-900 dark:text-zinc-50">
            <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">

                {/* Aesthetic Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />

                <div className="flex flex-col items-center justify-center">
                    <div className="size-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center border border-orange-400/20 shadow-lg shadow-orange-500/20 relative z-10 animate-pulse">
                        <ShieldCheck className="size-9 stroke-2" />
                    </div>
                </div>

                <div className="space-y-2 relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Upgrade Confirmed!</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                        {processSuccess
                            ? `Welcome to the Inner Circle. Premium privileges have been synced to ${customerEmail}.`
                            : "Your subscription verification logic is synchronizing with our database cluster workspace."
                        }
                    </p>
                </div>

                {/* Premium Membership Status Badge */}
                <div className="p-4 bg-linear-to-br from-amber-50 to-orange-50 dark:from-zinc-950/60 dark:to-zinc-950/20 border border-orange-200/40 dark:border-zinc-800 rounded-2xl flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Star className="size-4 fill-amber-500" />
                        </div>
                        <div>
                            <div className="text-xs font-extrabold text-orange-600 dark:text-orange-400 tracking-wider uppercase">Tier Account Level</div>
                            <div className="text-sm font-black text-zinc-800 dark:text-zinc-100">Premium Pro Access</div>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500 text-white rounded-full uppercase tracking-wider">Active</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 text-left max-w-sm mx-auto">
                    <div className="size-7 rounded-lg bg-orange-500/10 dark:bg-orange-500/5 flex items-center justify-center text-orange-500 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063 1.06l-.041.02a.75.75 0 0 1-1.062-1.06Zm0 4.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" />
                        </svg>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                        Dashboard status didn't refresh? Please <span className="font-extrabold text-zinc-800 dark:text-zinc-200">log out and sign back in</span> to update your token cache.
                    </p>
                </div>

                {/* Actions Route Controls */}
                <div className="flex flex-col gap-2 pt-2">
                    <Link href="/dashboard/user" className="w-full block">
                        <Button
                            className="w-full font-bold h-12 rounded-xl text-sm shadow-md bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-all group"
                            endContent={<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                        >
                            Open Premium Dashboard Workspace
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}