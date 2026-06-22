"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 text-center selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="max-w-md w-full space-y-6 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm">
        
        {/* Visual Header / Alert Icon */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 ring-4 ring-zinc-100/50 dark:ring-zinc-800/10">
            <ShieldAlert className="size-10 stroke-[1.5]" />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              401
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
              Unauthorized Access
            </h2>
          </div>
        </div>

        {/* Descriptive Text Context */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
          You do not have the required permissions to view this resource. Please log in with an authorized account or return to safety.
        </p>

        {/* Cohesive Action Control Layout */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 w-full">
          <Link
            href="/auth/signin"
            className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <LogIn className="size-4" />
            Sign In
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft className="size-4" />
            Go Back Home
          </Link>
        </div>

      </div>
    </div>
  );
}