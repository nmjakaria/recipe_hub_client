/* eslint-disable @next/next/no-img-element */
// components/dashboard/admin/UserDetailModal.jsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Modal, Button } from "@heroui/react";
import { X, Calendar, Shield, Mail, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function UserDetailModal({ user, onClose, onToggleBlock, isProcessing }) {
    
    // Formatting mongo structured calendar dates safely
    const formatDate = (dateObj) => {
        if (!dateObj) return "N/A";
        const d = dateObj.$date ? new Date(dateObj.$date) : new Date(dateObj);
        return d.toLocaleDateString('en-US', { dateStyle: 'long' }) + " at " + d.toLocaleTimeString('en-US', { timeStyle: 'short' });
    };

    return (
        /* CHANGED: 'open={true}' to 'isOpen={true}' to match HeroUI specification mappings */
        <Modal isOpen={true} onClose={onClose}>
            {/* Custom structural backdrop overlay wrapper */}
            <Modal.Backdrop>
                <div className="fixed inset-0 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    
                    {/* Animated central dialog body anchor containment card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                        className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <Modal.Container>
                            <Modal.Dialog>
                                
                                {/* Custom Structural Close Header Anchor Element */}
                                <div className="absolute right-4 top-4 z-20">
                                    <Button 
                                        onClick={onClose}
                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </div>

                                {/* Custom Content Header Profile Banner */}
                                <Modal.Header className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 flex gap-4 items-center">
                                    <div className="relative shrink-0">
                                        <img 
                                            src={user.image || "https://avatar.iran.liara.run/public"} 
                                            alt={user.name} 
                                            className="size-14 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white shadow-sm object-cover"
                                        />
                                        <span className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${user.isBlocked ? 'bg-danger' : 'bg-success'}`} />
                                    </div>
                                    <div className="space-y-0.5 min-w-0">
                                        <Modal.Heading className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight truncate pr-6">
                                            {user.name}
                                        </Modal.Heading>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono select-all truncate block">
                                            ID: {user._id?.$oid || user._id}
                                        </span>
                                    </div>
                                </Modal.Header>

                                {/* Main Parameter Grid Information Layout Body */}
                                <Modal.Body className="p-6 space-y-4 text-xs">
                                    
                                    {/* Email Parameter Info Box Row */}
                                    <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 rounded-xl">
                                        <Mail className="size-4 text-zinc-400 mt-0.5" />
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Email Address</p>
                                            <p className="font-medium text-zinc-800 dark:text-zinc-200 truncate select-all">{user.email}</p>
                                            <div className="flex items-center gap-1 text-[10px] mt-0.5 font-medium">
                                                {user.emailVerified ? (
                                                    <span className="text-success flex items-center gap-0.5">
                                                        <CheckCircle2 className="size-3" /> System Verified Account
                                                    </span>
                                                ) : (
                                                    <span className="text-amber-500 flex items-center gap-0.5">
                                                        <AlertOctagon className="size-3" /> Verification Pending
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Parameters Attributes Two-Column Info-Strip */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 border border-zinc-100 dark:border-zinc-800/80 rounded-xl space-y-0.5">
                                            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">System Role</p>
                                            <div className="flex items-center gap-1.5 pt-0.5">
                                                <Shield className="size-3.5 text-zinc-400" />
                                                <span className="font-semibold text-zinc-800 dark:text-zinc-200 capitalize">{user.role}</span>
                                            </div>
                                        </div>

                                        <div className="p-3 border border-zinc-100 dark:border-zinc-800/80 rounded-xl space-y-0.5">
                                            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Allocated Plan</p>
                                            <p className="font-mono font-semibold text-zinc-800 dark:text-zinc-200 pt-0.5">{user.plan || "user_free"}</p>
                                        </div>
                                    </div>

                                    {/* Structural Timestamp Registers Rows Layout */}
                                    <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-400 dark:text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="size-3.5 shrink-0 text-zinc-400" />
                                            <span>Registered Profile: <strong className="text-zinc-600 dark:text-zinc-300 font-medium">{formatDate(user.createdAt)}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="size-3.5 shrink-0 text-zinc-400" />
                                            <span>Database Revision: <strong className="text-zinc-600 dark:text-zinc-300 font-medium">{formatDate(user.updatedAt)}</strong></span>
                                        </div>
                                    </div>
                                </Modal.Body>

                                {/* Interactive Action Footing Base Command Matrix */}
                                <Modal.Footer className="p-6 pt-3 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/20 flex flex-col sm:flex-row-reverse gap-2">
                                    <button
                                        disabled={isProcessing}
                                        onClick={() => onToggleBlock(user)}
                                        className={`w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                                            user.isBlocked
                                                ? 'bg-success hover:bg-success-600 border-transparent text-white shadow-sm active:scale-[0.98]'
                                                : 'bg-danger hover:bg-danger-600 border-transparent text-white shadow-sm active:scale-[0.98]'
                                        } disabled:opacity-40`}
                                    >
                                        {isProcessing ? "Processing..." : user.isBlocked ? "Unblock Account Access" : "Block User Profile"}
                                    </button>
                                    <button 
                                        onClick={onClose}
                                        className="w-full sm:w-auto px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Dismiss Detail Panel
                                    </button>
                                </Modal.Footer>

                            </Modal.Dialog>
                        </Modal.Container>
                    </motion.div>
                </div>
            </Modal.Backdrop>
        </Modal>
    );
}