// components/admin/ActionHubSection.jsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@heroui/react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, FolderHeart, Settings, ArrowRight } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 22 } }
};

export default function ActionHubSection({ totalUsers, totalReports }) {
    const quickActions = [
        { title: "User Management Log", description: "Modify roles, monitor credentials, verify membership status levels, and view ledger logs.", href: "/dashboard/admin/users", icon: ShieldCheck, badge: `${totalUsers} Registered` },
        { title: "Moderation Queue", description: "Review recipe user flag reports, settle policy parameters, or issue dynamic content blocks.", href: "/dashboard/admin/reports", icon: AlertTriangle, badge: totalReports > 0 ? `${totalReports} Pending Review` : "Clear", isAlert: totalReports > 0 },
        { title: "Curated Showcase Engine", description: "Promote items to home feeds, handle system features, and manage categorical assignments.", href: "/dashboard/admin/recipes", icon: FolderHeart, badge: "Manage Catalog" },
        { title: "System Parameters", description: "Adjust processing API limits, tune image dimensions, and update security environment variables.", href: "/dashboard/admin/settings", icon: Settings, badge: "v1.4.2 Stable" }
    ];

    return (
        <motion.div variants={sectionVariants} className="space-y-4 pt-2">
            <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Administrative Action Hub
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Launch deep ledger debugging tools or edit data rows.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                    const ActionIcon = action.icon;
                    return (
                        <motion.div key={index} variants={itemVariants}>
                            <Link href={action.href} className="group block outline-none h-full">
                                <Card className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 rounded-2xl shadow-sm transition-all duration-300 flex flex-col justify-between h-full space-y-4 group-focus-visible:ring-2 group-focus-visible:ring-zinc-400">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                                                <ActionIcon className="size-5 stroke-[1.75]" />
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                                action.isAlert 
                                                    ? "bg-danger-50 dark:bg-danger-950/30 text-danger" 
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                            }`}>
                                                {action.badge}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                                                {action.title}
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 pt-2 transition-colors">
                                        Open Management Console
                                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}