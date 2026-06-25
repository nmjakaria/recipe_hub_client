"use client";

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { CheckCircle2, Sparkles, ShieldCheck, Zap, ChefHat, Flame } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function BillingPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [loading, setLoading] = useState(false);

    // Fallback Mock values if user object prop is loading slowly
    const currentPlan = user?.plan || "user_free";
    const isPremium = currentPlan === "premium";

    const premiumPerks = [
        { title: "Unlimited Recipe Publishing", desc: "Share your cooking insights without any monthly soft caps." },
        { title: "Advanced Marketplace Access", desc: "Sell premium cookbooks directly to your readers with lower service fees." },
        { title: "Smart Nutritional Analytics", desc: "Automate macronutrient calculations instantly using AI engines." },
        { title: "Verified Chef Badge", desc: "Gain search visibility credibility with a profile badge markup." },
        { title: "Ad-free Workspace Experience", desc: "Zero external distractions while preparing your kitchen creations." }
    ];

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id, // Default fallback for verification
                    userEmail: user?.email
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url; // Forward directly to the secure Stripe platform gateway
            } else {
                alert("Something went wrong setting up checkout.");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-4 text-zinc-900 dark:text-zinc-50 antialiased">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Account Billing & Licensing</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Manage your workspace access tiers and plan opportunities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan Opportunities Features Section */}
                <div className="md:col-span-2 space-y-4">
                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-6 shadow-sm">
                        <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Sparkles className="size-4 stroke-[2.5]" />
                            </div>
                            <h2 className="text-lg font-bold">Premium Workspace Opportunities</h2>
                        </div>

                        <div className="grid gap-4">
                            {premiumPerks.map((perk, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{perk.title}</h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">{perk.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Real-time Pricing Action Card */}
                <div className="md:col-span-1">
                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-orange-500/80 dark:border-orange-600 shadow-xl relative overflow-hidden flex flex-col justify-between h-full space-y-6">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl-xl flex items-center gap-1">
                            <Flame className="size-3 fill-white" /> Recommended
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">PRO CHEF PASS</span>
                                <h3 className="text-2xl font-black">Premium Tier</h3>
                            </div>

                            <div className="flex items-baseline gap-1 py-2">
                                <span className="text-4xl font-black tracking-tight">$9.99</span>
                                <span className="text-xs font-bold text-zinc-400">/ year</span>
                            </div>

                            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-2.5">
                                <div className="size-2 rounded-full bg-orange-500 animate-ping" />
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                    Current Plan: <b className="capitalize text-zinc-800 dark:text-zinc-200">{currentPlan.replace('_', ' ')}</b>
                                </span>
                            </div>
                        </div>

                        <Button
                            disabled={isPremium || loading}
                            isLoading={loading}
                            onClick={handleUpgrade}
                            className={`w-full font-bold h-12 rounded-xl text-sm transition-all shadow-md ${isPremium
                                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed shadow-none"
                                    : "bg-orange-500 text-white hover:bg-orange-600 active:scale-[0.98]"
                                }`}
                        >
                            {isPremium ? "Active Subscription" : "Upgrade to Premium"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}