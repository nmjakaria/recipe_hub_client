/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { CheckCircle2, ShoppingBag, ArrowRight, Sparkles, Receipt, AlertTriangle } from 'lucide-react';
import { stripe } from '@/lib/stripe';
import { createPurchases } from '@/lib/actions/purchases';

export default async function PaymentSuccessPage({ searchParams }) {
    const params = await searchParams;
    const sessionId = params?.session_id;

    let session = null;
    let saveSuccess = false;
    let errorMessage = null;

    if (sessionId) {
        try {
            session = await stripe.checkout.sessions.retrieve(sessionId);

            const userId = session.metadata?.userId;
            const userEmail = session.metadata?.userEmail;
            const recipeId = session.metadata?.recipeId;
            const transactionId = session.payment_intent; 
            const amount = session.amount_total / 100; 
            const paymentStatus = session.payment_status; 
            const paidAt = new Date(); 

            if (paymentStatus === 'paid') {
                const purchasesData = {
                    userId,
                    userEmail,
                    recipeId,
                    amount,
                    transactionId,
                    paymentStatus,
                    paidAt
                };

                await createPurchases(purchasesData);
                saveSuccess = true;
                console.log(`🎉 Success Page: Payment saved for Recipe ${recipeId}`);
            }
        } catch (err) {
            console.error("🔴 Failed to process checkout database insertion:", err);
            errorMessage = "We verified your payment, but had trouble linking it to your dashboard profile. Please contact support.";
        }
    }

    const recipeName = session?.metadata?.recipeName || "Premium Recipe Access";
    const totalAmount = session?.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 text-zinc-900 dark:text-zinc-50 antialiased">
            <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                
                {/* Visual Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />

                {/* Main Status Icon */}
                <div className="flex flex-col items-center justify-center relative">
                    {saveSuccess ? (
                        <>
                            <div className="size-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50 shadow-sm relative z-10 animate-bounce">
                                <CheckCircle2 className="size-8 stroke-[2.5]" />
                            </div>
                            <div className="absolute size-20 bg-emerald-500/10 rounded-full animate-ping opacity-40 pointer-events-none" />
                        </>
                    ) : (
                        <div className="size-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900/50 shadow-sm relative z-10">
                            <AlertTriangle className="size-8" />
                        </div>
                    )}
                </div>

                {/* Status Messages */}
                <div className="space-y-2 relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                        {saveSuccess ? "Payment Confirmed!" : "Processing Order..."}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium px-2">
                        {errorMessage || "Your purchase was successful and has been recorded in our system database workspace."}
                    </p>
                </div>

                {/* Receipt Card Details */}
                {session && (
                    <div className="p-5 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-left space-y-3.5 shadow-inner">
                        <div className="flex items-center gap-2 border-b border-zinc-200/60 dark:border-zinc-800 pb-2.5">
                            <Receipt className="size-4 text-zinc-400" />
                            <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">Transaction Summary</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-zinc-400 font-medium">Recipe item:</span>
                                <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[200px]">{recipeName}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-900 dark:text-zinc-100 font-bold">Paid Amount:</span>
                                <span className="text-base font-black text-orange-500">${totalAmount} USD</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sync Note Banner */}
                {saveSuccess && (
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-2 rounded-xl border border-emerald-200/40 dark:border-emerald-900/20">
                        <Sparkles className="size-3.5 shrink-0" />
                        <span>Saved to your personal account library successfully!</span>
                    </div>
                )}

                {/* Navigation Buttons (Fixed Boundary Mappings) */}
                <div className="flex flex-col gap-2 pt-2">
                    <Link href="/dashboard/user/recipe-book" className="w-full block">
                        <Button 
                            className="w-full font-bold h-12 rounded-xl text-sm shadow-md bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-all group"
                            endContent={<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                        >
                            Go to My Purchased Recipes
                        </Button>
                    </Link>
                    
                    <Link href="/dashboard/user" className="w-full block">
                        <Button 
                            className="w-full font-bold h-11 rounded-xl text-xs bg-transparent border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
                            startContent={<ShoppingBag className="size-4" />}
                        >
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}