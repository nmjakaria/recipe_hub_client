"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { AlertTriangle, RotateCcw, Home, ChefHat, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Log the error to an error reporting service (e.g., Sentry, LogRocket)
        console.error("Captured Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 transition-colors duration-300">
            <div className="max-w-md w-full text-center space-y-6">
                
                {/* Visual Graphic Element */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-3xl shadow-sm">
                    <ChefHat className="size-12 text-amber-600 dark:text-amber-400 animate-pulse" />
                    <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1.5 rounded-xl shadow-md">
                        <AlertTriangle className="size-4" />
                    </div>
                </div>

                {/* Typography Block */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Something spilled!
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Our digital kitchen encountered an unexpected hitch while preparing this page. The recipe might need a quick reload.
                    </p>
                </div>

                {/* Primary/Secondary Call-To-Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {/* The mandatory reset function attempts to re-render the segment */}
                    <Button
                        color="primary"
                        onPress={() => reset()}
                        className="w-full sm:w-auto font-bold rounded-xl shadow-md shadow-primary-500/10 bg-linear-to-r from-primary to-primary-600 text-white px-6 h-11"
                        startContent={<RotateCcw className="size-4" />}
                    >
                        Try Again
                    </Button>

                    <Button
                        as={Link}
                        href="/"
                        variant="bordered"
                        className="w-full sm:w-auto font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 px-6 h-11"
                        startContent={<Home className="size-4" />}
                    >
                        Back to Home
                    </Button>
                </div>

                {/* Collapsible Technical Debugging Info Accordion */}
                <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors focus:outline-none"
                    >
                        {showDetails ? (
                            <>Hide Debugging Metrics <ChevronUp className="size-3.5" /></>
                        ) : (
                            <>Show Debugging Metrics <ChevronDown className="size-3.5" /></>
                        )}
                    </button>

                    {showDetails && (
                        <div className="mt-3 text-left p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-x-auto max-h-40 shadow-inner">
                            <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1 wrap-break-word">
                                Error: {error?.message || "An unclassified component crash occurred."}
                            </p>
                            {error?.digest && (
                                <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 break-all select-all">
                                    Digest ID: {error.digest}
                                </p>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}