"use client";

import React, { useState } from 'react';
import { Clock, ChefHat, Heart, Bookmark, AlertTriangle, CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button, toast } from '@heroui/react';
import Link from 'next/link';
import { createFavorite, createLikeUnlike, createRecipeReport } from '@/lib/actions/recipe';

export default function RecipeDetailsView({ recipe }) {
    const {
        recipeName,
        recipeImage,
        category,
        cuisineType,
        difficultyLevel,
        preparationTime,
        ingredients,
        instructions,
        description,
        authorName,
        likesCount: initialLikesCount,
        isLikedByUser,       // Loaded dynamically from your updated backend GET route
        isFavoritedByUser,   // Loaded dynamically from your updated backend GET route
    } = recipe;

    const recipeId = recipe._id || recipe.id;

    // --- Dynamic Component States ---
    const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
    const [isLiked, setIsLiked] = useState(isLikedByUser || false);         // Updated state initialization
    const [isFavorited, setIsFavorited] = useState(isFavoritedByUser || false); // Updated state initialization
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    // --- Action 1: Stripe Purchase Handler ---
    const handlePurchase = async () => {
        setIsPurchasing(true);
        try {
            const response = await fetch('/api/checkout/stripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipeId, recipeName, price: 499 })
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to initiate Stripe session.");
            }
        } catch (err) {
            console.error("Stripe error: ", err);
        } finally {
            setIsPurchasing(false);
        }
    };

    // --- Action 2: Like Handler ---
    const handleLikeToggle = async () => {
        const checkState = !isLiked;
        setIsLiked(checkState);
        setLikesCount(prev => checkState ? prev + 1 : prev - 1);

        try {
            await createLikeUnlike(recipeId);
        } catch (err) {
            console.error("Failed syncing like counter status", err);
            // Rollback UI states if network request fails
            setIsLiked(!checkState);
            setLikesCount(prev => !checkState ? prev + 1 : prev - 1);
        }
    };

    // --- Action 3: Favorite Handler (Connected to Express Endpoint) ---
    const handleFavoriteToggle = async () => {
        const fallbackState = isFavorited;
        setIsFavorited(!fallbackState); // Optimistic UI Update

        try {
            await createFavorite(recipeId, recipeName)
            toast.success(`You are Liked ${recipeName}`, {
                description: "Best of Luck for you.",
                timeout: 2000,
            });

        } catch (err) {
            console.error("Failed updating bookmark arrays:", err);
            setIsFavorited(fallbackState); // Rollback on network failure
        }
    };

    // --- Action 4: Report Submission Handler (Connected to Express Endpoint) ---
    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!reportReason.trim()) return;

        setIsSubmittingReport(true);
        try {
            const result = await createRecipeReport(recipeId, reportReason);
            if (result?.success) {
                setIsReportModalOpen(false);
                setReportReason('');
                toast.success("Recipe report submitted successfully for evaluation.", {
                    description: "Keep Going on!.",
                    timeout: 2000,
                });
            } else {
                toast.warning(result?.message || "Failed to log violation incident.");
            }
        } catch (err) {
            console.error("Compliance log network failure:", err);
            toast.warning("Network error processing report request.");
        } finally {
            setIsSubmittingReport(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen text-foreground">

            {/* Navigation Header */}
            <Link href="/recipes" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-primary transition-colors mb-6">
                <ArrowLeft className="size-4" /> Back to explore
            </Link>

            {/* Split Screen Container Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Columns Matrix: Primary Recipe Meta & Data */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 border border-default">
                        <img src={recipeImage || "/api/placeholder/800/450"} alt={recipeName} className="w-full h-full object-cover" />
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-zinc-100 dark:bg-zinc-800 text-foreground text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-default">{category}</span>
                            <span className="bg-zinc-100 dark:bg-zinc-800 text-foreground text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-default">{cuisineType}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{recipeName}</h1>
                        <p className="text-xs text-zinc-400 mt-1">Published by <span className="text-zinc-600 dark:text-zinc-300 font-medium">{authorName}</span></p>
                    </div>

                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-default">
                        <h3 className="text-sm font-bold mb-1">Chef Overview</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description || "No recipe summary information available."}</p>
                    </div>

                    {/* Ingredients Routine Rendering Box */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold border-b border-default pb-2">Ingredients Required</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {ingredients?.map((item, index) => (
                                <li key={index} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Routing Progression Sequence */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b border-default pb-2">Preparation Sequence</h2>
                        <ol className="space-y-3">
                            {instructions?.map((step, index) => (
                                <li key={index} className="flex gap-4 p-3 rounded-xl border border-default bg-white dark:bg-zinc-900/40 items-start">
                                    <span className="size-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-xs text-zinc-500 shrink-0">{index + 1}</span>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-0.5">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Right Column Matrix: Interactive Action Control Widget Bar */}
                <div className="space-y-5 lg:sticky lg:top-6 h-fit">
                    <div className="border border-default bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm space-y-4">

                        {/* Static Spec Configuration Rows */}
                        <div className="grid grid-cols-2 gap-4 text-center border-b border-default pb-4">
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-default rounded-xl">
                                <Clock className="size-4 text-zinc-400 mb-1" />
                                <span className="text-xs font-semibold">{preparationTime || 0} Mins</span>
                                <span className="text-[10px] text-zinc-400">Time Limit</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-default rounded-xl">
                                <ChefHat className="size-4 text-zinc-400 mb-1" />
                                <span className="text-xs font-semibold">{difficultyLevel || "Easy"}</span>
                                <span className="text-[10px] text-zinc-400">Skill Level</span>
                            </div>
                        </div>

                        {/* Interactive Engagement Analytics Block */}
                        <div className="flex items-center justify-between text-xs px-1 text-zinc-400">
                            <span>Community Rating Stats:</span>
                            <span className="font-bold text-foreground flex items-center gap-1"><Heart className="size-3.5 fill-danger text-danger" /> {likesCount} Likes</span>
                        </div>

                        {/* Complete 4 Actions Integration Buttons Stack */}
                        <div className="flex flex-col gap-2.5 pt-2">

                            {/* Action Button 1: Purchase via Stripe Hook */}
                            <Button color="primary" className="w-full font-bold h-12 shadow-md" startContent={<CreditCard className="size-4" />} onClick={handlePurchase} isLoading={isPurchasing}>
                                Purchase Recipe Access
                            </Button>

                            <div className="grid grid-cols-2 gap-2">
                                {/* Action Button 2: Dynamic Counter Liking Interaction */}
                                <Button variant="flat" className={`font-semibold border h-11 ${isLiked ? 'bg-danger/10 border-danger/30 text-danger' : 'border-default'}`} startContent={<Heart className={`size-4 ${isLiked ? 'fill-danger' : ''}`} />} onClick={handleLikeToggle}>
                                    {isLiked ? 'Liked' : 'Like'}
                                </Button>

                                {/* Action Button 3: Bookmarking Favorite List Matrix */}
                                <Button variant="flat" className={`font-semibold border h-11 ${isFavorited ? 'bg-warning/10 border-warning/30 text-warning' : 'border-default'}`} startContent={<Bookmark className={`size-4 ${isFavorited ? 'fill-warning' : ''}`} />} onClick={handleFavoriteToggle}>
                                    {isFavorited ? 'Favorited' : 'Favorite'}
                                </Button>
                            </div>

                            {/* Action Button 4: Report Flag Hook Modality Activation */}
                            <Button variant="light" color="danger" size="sm" className="w-full font-medium mt-1" startContent={<AlertTriangle className="size-3.5" />} onClick={() => setIsReportModalOpen(true)}>
                                Report Content Violation
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controlled HTML Layer Safe Overlay Modal Implementation */}
            {isReportModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-950 border border-default w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div>
                            <h3 className="text-base font-bold text-foreground flex items-center gap-2"><AlertTriangle className="size-5 text-danger" /> Report Recipe Content</h3>
                            <p className="text-xs text-zinc-400 mt-1">Please provide clear context regarding what violates rules inside this submission.</p>
                        </div>

                        <form onSubmit={handleReportSubmit} className="space-y-4">
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Describe the violation (e.g., plagiarized recipe, explicit text, dangerous instructions)..."
                                rows={4}
                                required
                                className="w-full border border-default bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-3 text-sm focus:border-primary outline-none resize-none transition-colors"
                            />

                            <div className="flex justify-end gap-2 text-xs">
                                <Button type="button" variant="flat" size="sm" onClick={() => { setIsReportModalOpen(false); setReportReason(''); }} className="font-semibold">Cancel</Button>
                                <Button type="submit" color="danger" size="sm" isLoading={isSubmittingReport} className="font-semibold">Submit Incident Report</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}