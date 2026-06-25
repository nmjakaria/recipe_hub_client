import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 antialiased text-zinc-900 dark:text-zinc-50">
            <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                
                {/* Visual Glow Effect (Subtle red/orange tint for cancellation) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 dark:bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />

                {/* Status Cancel Icon */}
                <div className="flex flex-col items-center justify-center">
                    <div className="size-16 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 flex items-center justify-center border border-rose-100 dark:border-rose-900/50 shadow-sm relative z-10">
                        <XCircle className="size-9 stroke-2" />
                    </div>
                </div>

                {/* Informative Header Messaging */}
                <div className="space-y-2 relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Checkout Canceled</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium px-4">
                        The transaction was stopped. No charges were made to your account, and your current plan tier remains unchanged.
                    </p>
                </div>

                {/* Helpful Reminder Panel */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-left space-y-2.5">
                    <div className="flex items-start gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        <HelpCircle className="size-4 text-zinc-400 mt-0.5 shrink-0" />
                        <span>
                            Changed your mind or had trouble checking out? Your recipe configuration metrics and selection cart weights have been safely cached.
                        </span>
                    </div>
                </div>

                {/* Navigation Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                    {/* Try Again Option */}
                    <Link href="/dashboard/user/billing" className="w-full block">
                        <Button 
                            className="w-full font-bold h-12 rounded-xl text-sm shadow-md bg-orange-500 hover:bg-orange-600 text-white transition-all group"
                            startContent={<RefreshCw className="size-4 transition-transform group-hover:rotate-180 duration-500" />}
                        >
                            Review Pricing & Try Again
                        </Button>
                    </Link>
                    
                    {/* Safe Exit Back to Workspace */}
                    <Link href="/dashboard/user" className="w-full block">
                        <Button 
                            className="w-full font-bold h-11 rounded-xl text-xs bg-transparent border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
                            startContent={<ArrowLeft className="size-4" />}
                        >
                            Back to My Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}