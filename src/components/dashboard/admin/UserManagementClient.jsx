/* eslint-disable @next/next/no-img-element */
// components/dashboard/admin/UserManagementClient.jsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Eye, Search } from 'lucide-react';
import UserDetailModal from './UserDetailModal';
import { updateUserBlockStatus } from '@/lib/actions/admin';
import { toast } from '@heroui/react';

export default function UserManagementClient({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [processingId, setProcessingId] = useState(null);

    // Toggle blocking function state
    const handleToggleBlock = async (user) => {
        const userId = user._id?.$oid || user._id;
        const nextBlockState = !user.isBlocked;

        setProcessingId(userId);
        try {
            if (user?.role === 'admin') {
                toast.warning("You are admin", {
                    description: "Admins cannot block themselves.",
                    timeout: 2000,
                })
                return;
            } else {
                await updateUserBlockStatus(userId, nextBlockState);

            }

            // Optimistic localized UI matrix state updates
            setUsers(prev => prev.map(u => {
                const uId = u._id?.$oid || u._id;
                return uId === userId ? { ...u, isBlocked: nextBlockState, updatedAt: { $date: new Date().toISOString() } } : u;
            }));

            // Synchronize focused open modal view context state parameters
            if (selectedUser && (selectedUser._id?.$oid || selectedUser._id) === userId) {
                setSelectedUser(prev => ({ ...prev, isBlocked: nextBlockState }));
            }
        } catch (err) {
            alert("Could not update user block parameters cleanly.");
        } finally {
            setProcessingId(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Search Filter Strip */}
            <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search accounts name or email matches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all shadow-sm"
                />
            </div>

            {/* Core Data Array Table View layout */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-400 font-semibold tracking-wider uppercase text-[10px]">
                            <th className="p-4">Profile Account Identity</th>
                            <th className="p-4">System Role</th>
                            <th className="p-4">Billing Plan</th>
                            <th className="p-4">Status Check</th>
                            <th className="p-4 text-right">Operational Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-zinc-400 dark:text-zinc-500 italic">
                                    No user accounts matched criteria searches.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => {
                                const userId = user._id?.$oid || user._id;
                                return (
                                    <tr key={userId} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-800/20 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.image || "https://avatar.iran.liara.run/public"}
                                                    alt={user.name}
                                                    className="size-8 rounded-full border border-zinc-200/60 dark:border-zinc-700 bg-zinc-100 object-cover shrink-0"
                                                />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</span>
                                                    <span className="text-zinc-400 truncate text-[11px]">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${user.role === 'admin' ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                            {user.plan || "user_free"}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[10px] uppercase tracking-wider ${user.isBlocked ? 'bg-danger-50 dark:bg-danger-950/20 text-danger' : 'bg-success-50 dark:bg-success-950/20 text-success'}`}>
                                                <span className={`size-1.5 rounded-full ${user.isBlocked ? 'bg-danger animate-pulse' : 'bg-success'}`} />
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                                                    className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 rounded-lg border border-zinc-200 dark:border-zinc-700/80 transition-colors"
                                                    title="View Profile Details"
                                                >
                                                    <Eye className="size-4" />
                                                </button>

                                                <button
                                                    disabled={processingId === userId}
                                                    onClick={() => handleToggleBlock(user)}
                                                    className={`px-2.5 py-1.5 font-semibold rounded-lg text-[11px] transition-all border ${user.isBlocked
                                                            ? 'bg-success hover:bg-success-600 text-white border-transparent shadow-sm'
                                                            : 'bg-white hover:bg-danger-50 dark:bg-zinc-900 border-zinc-200 hover:border-danger-200 dark:border-zinc-800 dark:hover:border-danger-950 text-danger font-medium'
                                                        } disabled:opacity-40`}
                                                >
                                                    {processingId === userId ? "Updating..." : user.isBlocked ? "Unblock Account" : "Block"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Detached Modal Overlay Container Management Trigger */}
            <AnimatePresence>
                {isModalOpen && selectedUser && (
                    <UserDetailModal
                        user={selectedUser}
                        onClose={() => { setIsModalOpen(false); setSelectedUser(null); }}
                        onToggleBlock={handleToggleBlock}
                        isProcessing={processingId === (selectedUser._id?.$oid || selectedUser._id)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}