"use client";

import React, { useState } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import { User, Mail, Calendar, ShieldAlert, Gem, CheckCircle2, XCircle, PenSquare } from 'lucide-react';

export default function ProfileClient({ initialUser }) {
    // Initialize component state using real database properties passed from the server
    const [userData, setUserData] = useState(initialUser);
    const [formName, setFormName] = useState(initialUser?.name || "");
    const [formImage, setFormImage] = useState(initialUser?.image || "");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            // OPTIONAL: Call your backend API route or Server Action here:
            // await updateProfileInDatabase({ name: formName, image: formImage });

            // Optimistically update the UI layer state
            setUserData(prev => ({
                ...prev,
                name: formName,
                image: formImage,
                updatedAt: new Date().toISOString()
            }));
        } catch (error) {
            console.error("Profile synchronization failed:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        // Handle both raw MongoDB objects or standard ISO string formats gracefully
        const targetDate = dateString.$date ? dateString.$date : dateString;
        return new Date(targetDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">

            {/* ── PROFILE METRICS HEADER ── */}
            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                    <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={userData?.image || "https://cdn-icons-png.flaticon.com/512/3781/3781986.png"}
                            alt={userData?.name}
                            className="size-24 rounded-2xl object-cover border-4 border-zinc-100 dark:border-zinc-800 shadow-md bg-zinc-100"
                        />
                        <div className="absolute -bottom-1.5 -right-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow">
                            {userData?.role || "user"}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">{userData?.name}</h1>
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-800">
                                <Gem className="size-3" /> {userData?.plan?.replace('_', ' ') || "Free Plan"}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 dark:text-zinc-500">{userData?.email}</p>
                    </div>
                </div>

                {/* ── HEROUI MODAL SYSTEM ── */}
                <Modal>
                    <Button
                        color="primary"
                        className="font-bold rounded-xl shadow-md shadow-primary-500/10 shrink-0"
                        startContent={<PenSquare className="size-4" />}
                    >
                        Update Profile
                    </Button>

                    <Modal.Backdrop>
                        <Modal.Container placement="auto">
                            <Modal.Dialog className="sm:max-w-md">
                                <Modal.CloseTrigger />

                                <Modal.Header>
                                    <Modal.Icon className="bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400">
                                        <User className="size-5" />
                                    </Modal.Icon>
                                    <Modal.Heading>Edit Profile Metrics</Modal.Heading>
                                    <p className="mt-1.5 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                                        Modify your public configuration below. Changes reflect across all public recipes.
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="p-6">
                                    <Surface variant="default">
                                        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">

                                            <TextField className="w-full" name="name" type="text" variant="secondary">
                                                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Display Name</Label>
                                                <Input
                                                    value={formName}
                                                    onChange={(e) => setFormName(e.target.value)}
                                                    placeholder="Enter your public display name"
                                                    className="h-9 px-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:border-primary"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="imageUrl" type="url" variant="secondary">
                                                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Avatar Image URL</Label>
                                                <Input
                                                    value={formImage}
                                                    onChange={(e) => setFormImage(e.target.value)}
                                                    placeholder="https://example.com/avatar.png"
                                                    className="h-9 px-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:border-primary"
                                                />
                                            </TextField>

                                        </form>
                                    </Surface>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button slot="close" variant="secondary" className="rounded-xl font-semibold">
                                        Cancel
                                    </Button>
                                    <Button
                                        slot="close"
                                        color="primary"
                                        className="rounded-xl font-bold text-white"
                                        onClick={handleUpdateProfile}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Saving..." : "Save Settings"}
                                    </Button>
                                </Modal.Footer>

                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>

            {/* ── METADATA INFRASTRUCTURE DIRECTORY ── */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-8 shadow-sm">
                <h2 className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6">Database Schema Registry</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex items-start gap-3.5 p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900 rounded-2xl">
                        <Mail className="size-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Registered Email Address</h3>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1">{userData?.email}</p>
                            <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                                {userData?.emailVerified ? (
                                    <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1"><CheckCircle2 className="size-3.5" /> Verified Account Hook</span>
                                ) : (
                                    <span className="text-amber-600 dark:text-amber-400 inline-flex items-center gap-1"><XCircle className="size-3.5" /> Verification Pending</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900 rounded-2xl">
                        <Calendar className="size-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Account Lifecycle</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                Created: <span className="font-bold text-zinc-800 dark:text-zinc-200">{formatDate(userData?.createdAt)}</span>
                            </p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                Last Mutation: {formatDate(userData?.updatedAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900 rounded-2xl">
                        <User className="size-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Document Identifier (ID)</h3>
                            <code className="text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 px-2 py-0.5 rounded-md block mt-1.5 w-fit text-zinc-600 dark:text-zinc-400 break-all select-all">
                                {userData?.id || userData?._id?.$oid || "Transient Session Hook"}
                            </code>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900 rounded-2xl">
                        <ShieldAlert className="size-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Moderation Firewall Status</h3>
                            <div className="mt-2">
                                {userData?.isBlocked ? (
                                    <span className="bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/40 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider">
                                        Access Revoked
                                    </span>
                                ) : (
                                    <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider">
                                        Account Active
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}