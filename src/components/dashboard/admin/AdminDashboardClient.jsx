"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, ChefHat, Sparkles, AlertTriangle } from 'lucide-react';
import MetricCard from './MetricCard';
import ActionHubSection from './ActionHubSection';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.02 }
    }
};

const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function AdminDashboardClient({ stats }) {
    // 🌟 FIXED: Mapped 'stats.pendingReports' explicitly to avoid undefined property calculations
    const statCards = [
        { title: "Total Platform Users", value: stats.totalUsers, icon: Users, bgAccent: "bg-zinc-50 dark:bg-zinc-800/60", iconColor: "text-zinc-600 dark:text-zinc-400" },
        { title: "Premium Upgrades", value: stats.premiumUsers, icon: Crown, bgAccent: "bg-amber-50 dark:bg-amber-950/20", iconColor: "text-amber-500 dark:text-amber-400" },
        { title: "Recipes Published", value: stats.totalRecipes, icon: ChefHat, bgAccent: "bg-zinc-50 dark:bg-zinc-800/60", iconColor: "text-zinc-600 dark:text-zinc-400" },
        { title: "Featured Creations", value: stats.featuredRecipes, icon: Sparkles, bgAccent: "bg-blue-50 dark:bg-blue-950/20", iconColor: "text-blue-500 dark:text-blue-400" },
        { 
            title: "Active Reports", 
            value: stats.pendingReports, 
            icon: AlertTriangle, 
            bgAccent: stats.pendingReports > 0 ? "bg-danger-50 dark:bg-danger-950/20" : "bg-zinc-50 dark:bg-zinc-800/60", 
            iconColor: stats.pendingReports > 0 ? "text-danger" : "text-zinc-400" 
        },
    ];

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-10 p-6 selection:bg-zinc-200 dark:selection:bg-zinc-800"
        >
            {/* Header Content Section */}
            <motion.div variants={headerVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="space-y-0.5">
                    <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Admin Dashboard Overview
                    </h1>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Operational infrastructure summaries, ledger telemetry, and database analytics arrays.
                    </p>
                </div>
                <div className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto">
                    <span className="size-2 rounded-full bg-success animate-pulse" />
                    Live System Sync Enabled
                </div>
            </motion.div>

            {/* Grid of Dynamic Stat Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((card, idx) => (
                    <MetricCard key={idx} card={card} />
                ))}
            </div>

            {/* Bottom Admin Control Panel Operations */}
            <ActionHubSection totalUsers={stats.totalUsers} pendingReports={stats.pendingReports} />
            
        </motion.div>
    );
}