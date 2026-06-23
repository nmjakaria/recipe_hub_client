/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, ShieldAlert, Check, Trash2, Eye, Calendar, Mail } from 'lucide-react';
import { Button } from '@heroui/react';
import { getRecipeReportForAdmin } from '@/lib/api/admin';
import { deleteRecipeReport, updateRecipeReportStatus } from '@/lib/actions/admin';

export default function AdminRecipeReportsPage() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(null); // Tracks operations per report ID

    // 📥 Fetch all community reports
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setIsLoading(true);
                const data = await getRecipeReportForAdmin();

                // Defensive check to extract arrays cleanly
                if (Array.isArray(data)) {
                    setReports(data);
                } else if (data && Array.isArray(data.data)) {
                    setReports(data.data);
                } else {
                    setReports([]);
                }
            } catch (err) {
                console.error("Error compiling system reports:", err);
                setError("Could not retrieve active report tickets.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    // 🛡️ Action 1: Dismiss Report (Updates status to 'dismissed')
    const handleDismissReport = async (reportId) => {
        try {
            setIsProcessing(`${reportId}-dismiss`);

            // 🌟 FIXED: Passed 'dismissed' status and captured the returned object
            const result = await updateRecipeReportStatus(reportId, 'dismissed');

            // Adjust this condition based on how your serverMutation formats errors
            if (result && result.success === false) {
                throw new Error(result.message || "Could not update state.");
            }

            // Optimistic state change update
            setReports((prev) =>
                prev.map((item) => {
                    const currentId = item._id?.$oid || item._id || item.id;
                    return currentId === reportId ? { ...item, status: 'dismissed' } : item;
                })
            );
        } catch (err) {
            console.error(err);
            alert("Failed to dismiss the report ticket.");
        } finally {
            setIsProcessing(null);
        }
    };

    // 🗑️ Action 2: Delete Report Entry
    const handleDeleteReport = async (reportId) => {
        if (!confirm("Are you sure you want to permanently delete this report record?")) return;

        try {
            setIsProcessing(`${reportId}-delete`);

            const result = await deleteRecipeReport(reportId);
            
            if (result && result.success === false) {
                throw new Error(result.message || "Could not delete resource.");
            }

            // Wipe out item from client cache pool matrix instantly
            setReports((prev) => prev.filter((item) => (item._id?.$oid || item._id || item.id) !== reportId));
        } catch (err) {
            console.error(err);
            alert("Failed to delete target report documentation.");
        } finally {
            setIsProcessing(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="size-7 text-primary animate-spin" />
                <p className="text-xs font-semibold text-zinc-400">Loading moderation tracking matrix...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
                <p className="text-sm font-semibold text-danger">{error}</p>
                <Button size="sm" color="primary" onClick={() => window.location.reload()}>Retry Connection</Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {/* Header Content */}
            <div className="flex flex-col mb-4 justify-center border-b border-default pb-5">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-zinc-900 dark:text-white">
                        <ShieldAlert className="text-rose-500 size-7" />
                        Community <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">Moderation Queue</span>
                    </h1>

                    {/* Animated colorful visual divider */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-full my-3"
                        style={{ backgroundSize: '200% 200%' }}
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            width: ["120px", "220px", "120px"]
                        }}
                        transition={{
                            backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
                            width: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />

                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Review flag validations generated by end users. Dismiss false claims or remove components to enforce guidelines.
                    </p>
                </div>
            </div>

            {/* Catalog Reports List */}
            {reports.length === 0 ? (
                <div className="border border-dashed border-default rounded-2xl p-12 text-center text-sm text-zinc-400">
                    Excellent work! The moderation index database reports block is completely empty.
                </div>
            ) : (
                <div className="overflow-x-auto border border-default rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-default text-xs font-bold text-zinc-500 tracking-wider">
                                <th className="p-4">Target Recipe ID</th>
                                <th className="p-4">Reporter Profile</th>
                                <th className="p-4">Violation Flag Reason</th>
                                <th className="p-4">Submission Date</th>
                                <th className="p-4 text-center">Ticket Status</th>
                                <th className="p-4 text-right">Moderation Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default text-sm">
                            {reports.map((item, index) => {
                                const id = item._id?.$oid || item._id || item.id;
                                const targetRecipeId = item.recipeId?.$oid || item.recipeId;
                                const createdDate = item.createdAt?.$date || item.createdAt;
                                const reportStatus = item.status || 'pending';

                                return (
                                    <motion.tr
                                        key={id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                                    >
                                        <td className="p-4 font-mono text-xs text-zinc-500">
                                            {targetRecipeId}
                                        </td>

                                        <td className="p-4 text-zinc-700 dark:text-zinc-300">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                <Mail size={12} className="text-zinc-400" />
                                                <span>{item.reporterEmail}</span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-zinc-600 dark:text-zinc-300 max-w-xs">
                                            <p className="italic bg-zinc-50 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-default text-xs line-clamp-2">
                                                "{item.reason}"
                                            </p>
                                        </td>

                                        <td className="p-4 text-zinc-500 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                <span>{new Date(createdDate).toLocaleDateString()}</span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-center">
                                            <span className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                                                reportStatus === 'pending'
                                                    ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30'
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30'
                                            }`}>
                                                {reportStatus}
                                            </span>
                                        </td>

                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/recipes/${targetRecipeId}`}>
                                                    <button title="View Target Recipe" className="p-2 border border-default rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:text-primary transition-colors">
                                                        <Eye size={15} />
                                                    </button>
                                                </Link>

                                                {reportStatus === 'pending' && (
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        className="rounded-xl min-w-0 font-bold"
                                                        disabled={isProcessing === `${id}-dismiss`}
                                                        onClick={() => handleDismissReport(id)}
                                                    >
                                                        <Check size={14} className="text-white" />
                                                    </Button>
                                                )}

                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    className="rounded-xl min-w-0 font-bold"
                                                    disabled={isProcessing === `${id}-delete`}
                                                    onClick={() => handleDeleteReport(id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}