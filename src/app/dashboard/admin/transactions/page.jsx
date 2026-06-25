import React from 'react';
import { ArrowLeftRight, CreditCard, ShieldCheck, RefreshCw } from 'lucide-react';
import { getTransactions } from '@/lib/api/admin';



export default async function AdminTransactionsPage() {
    const transactions = await getTransactions();

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 text-zinc-900 dark:text-zinc-50 antialiased min-h-screen">
            
            {/* Header Identity Block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-orange-500/10 text-orange-500 rounded-xl">
                            <ArrowLeftRight className="size-5" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Financial Transactions</h1>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                        Unified collection control monitor tracking recipe purchases and core system subscription tiers.
                    </p>
                </div>
                
                {/* Micro KPIs metrics summary panels */}
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-xs">
                        <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Total Actions</div>
                        <div className="text-xl font-black">{transactions.length}</div>
                    </div>
                </div>
            </div>

            {/* Main Ledger Core Table Interface */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-extrabold tracking-wider uppercase text-zinc-400">
                                <th className="py-4 px-6">User / Profile</th>
                                <th className="py-4 px-6">Transaction Type</th>
                                <th className="py-4 px-6">Amount</th>
                                <th className="py-4 px-6">Date Processed</th>
                                <th className="py-4 px-6">Payment Status</th>
                                <th className="py-4 px-6">Reference ID Route</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm font-medium">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-zinc-400 dark:text-zinc-500 font-semibold">
                                        No transactions data currently found inside system database clusters.
                                    </td>
                                        </tr>
                            ) : (
                                transactions.map((tx) => {
                                    const isPaid = tx.status === 'paid' || tx.status === 'active';
                                    return (
                                        <tr key={tx.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors">
                                            {/* User Information Profile Column */}
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-zinc-800 dark:text-zinc-100">{tx.userName}</div>
                                                <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{tx.userEmail}</div>
                                            </td>

                                            {/* Type Badge Identifier Column */}
                                            <td className="py-4 px-6">
                                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                                                    tx.type === 'Subscription Tier'
                                                        ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30'
                                                        : 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30'
                                                }`}>
                                                    {tx.type}
                                                </span>
                                            </td>

                                            {/* Price Amount Column */}
                                            <td className="py-4 px-6 font-black text-base text-zinc-800 dark:text-zinc-50">
                                                ${tx.amount.toFixed(2)}
                                            </td>

                                            {/* Beautiful Human Readable Date Column */}
                                            <td className="py-4 px-6 text-xs text-zinc-500 dark:text-zinc-400">
                                                {tx.date ? new Date(tx.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) : 'N/A'}
                                            </td>

                                            {/* Controlled Payment Status Badge Component Column */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                                    isPaid
                                                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/40 dark:border-emerald-900/30'
                                                        : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200/40 dark:border-amber-900/30'
                                                }`}>
                                                    <span className={`size-1.5 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    {tx.status}
                                                </span>
                                            </td>

                                            {/* Transaction ID / Subscriptions ID Copy Code Column */}
                                            <td className="py-4 px-6 font-mono text-xs text-zinc-400 dark:text-zinc-500 select-all max-w-[180px] truncate">
                                                {tx.referenceId || "N/A"}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}