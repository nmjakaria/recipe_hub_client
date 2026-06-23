/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { Clock, ChefHat, Heart, Bookmark, AlertTriangle, CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button, toast } from '@heroui/react';
import Link from 'next/link';
import { createFavorite, createLikeUnlike, createRecipeReport } from '@/lib/actions/recipe';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function RecipeDetailsView({ recipe }) {

    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

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
        isLikedByUser,
        isFavoritedByUser,
    } = recipe;

    const recipeId = recipe._id || recipe.id;

    // --- Dynamic Component States ---
    const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
    const [isLiked, setIsLiked] = useState(isLikedByUser || false);
    const [isFavorited, setIsFavorited] = useState(isFavoritedByUser || false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    // ── common helper function for check user login──
    const checkAuthAndRedirect = () => {
        if (!session) {
            toast.warning("Authentication Required", {
                description: "Please login to perform this action.",
                timeout: 2000,
            });
            router.push(`/auth/signin?redirect=${encodeURIComponent(pathname)}`);
            return false;
        }
        return true;
    };

    // --- Action 1: Stripe Purchase Handler ---
    const handlePurchase = async () => {
        if (!checkAuthAndRedirect()) return;

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
        if (!checkAuthAndRedirect()) return;

        const checkState = !isLiked;
        setIsLiked(checkState);
        setLikesCount(prev => checkState ? prev + 1 : prev - 1);

        try {
            await createLikeUnlike(recipeId);
        } catch (err) {
            console.error("Failed syncing like counter status", err);
            setIsLiked(!checkState);
            setLikesCount(prev => !checkState ? prev + 1 : prev - 1);
        }
    };

    // --- Action 3: Favorite Handler ---
    const handleFavoriteToggle = async () => {
        if (!checkAuthAndRedirect()) return;

        const fallbackState = isFavorited;
        setIsFavorited(!fallbackState);

        try {
            const favoriteRecipeData = { recipeName, recipeImage, category, cuisineType };
            const res = await createFavorite(recipeId, favoriteRecipeData);
            setIsFavorited(res?.favorited);

            if (res?.favorited) {
                toast.success("Added to Favorites", {
                    description: `Successfully pinned ${recipeName} to your collection!`,
                    timeout: 2000,
                });
            } else {
                toast.success("Removed", {
                    description: `Removed ${recipeName} from your favorite collection!`,
                    timeout: 2000,
                });
            }

        } catch (err) {
            console.error("Failed updating bookmark arrays:", err);
            setIsFavorited(fallbackState);
            toast.error("Error", {
                description: "Could not update your bookmark selection.",
                timeout: 2000,
            });
        }
    };

    // --- Action 4: Report Modal Trigger ---
    const handleReportButtonClick = () => {
        if (!checkAuthAndRedirect()) return;
        setIsReportModalOpen(true);
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!reportReason.trim()) return;
        if (!checkAuthAndRedirect()) return; // check double security

        setIsSubmittingReport(true);
        try {
            const result = await createRecipeReport(recipeId, reportReason);
            if (result?.success) {
                setIsReportModalOpen(false);
                setReportReason('');
                toast.success("Recipe report submitted successfully.", { timeout: 2000 });
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
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 min-h-screen text-zinc-900 dark:text-zinc-50 antialiased selection:bg-orange-500/10">

            {/* Navigation Header */}
            <div className="mb-8">
                <Link href="/recipes" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to explore</span>
                </Link>
            </div>

            {/* Split Screen Container Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* Left Side Content Column */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Hero Display Image Area */}
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md group">
                        <img
                            src={recipeImage || "/api/placeholder/800/450"}
                            alt={recipeName}
                            className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Metadata Header & Identity Card */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-900/30">
                                {category}
                            </span>
                            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/50">
                                {cuisineType}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                                {recipeName}
                            </h1>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                                Formula curated by <span className="text-zinc-700 dark:text-zinc-300 font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">{authorName}</span>
                            </p>
                        </div>
                    </div>

                    {/* Chef Overview Description Card */}
                    <div className="p-6 bg-linear-to-br from-zinc-50/50 to-zinc-50/10 dark:from-zinc-900/40 dark:to-zinc-900/10 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-[0.02] pointer-events-none">
                            <ChefHat className="size-24" />
                        </div>
                        <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Chef Overview</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                            {description || "No recipe summary information available."}
                        </p>
                    </div>

                    {/* Ingredients Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold tracking-tight border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
                            <span>Ingredients Required</span>
                            <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">({ingredients?.length || 0} items)</span>
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {ingredients?.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300 p-3 bg-zinc-50/40 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800/40 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <CheckCircle2 className="size-4 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5 stroke-[2.5]" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Routing Sequence */}
                    <div className="space-y-5">
                        <h2 className="text-lg font-bold tracking-tight border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            Preparation Sequence
                        </h2>
                        <ol className="space-y-3.5">
                            {instructions?.map((step, index) => (
                                <li key={index} className="flex gap-4 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/30 shadow-sm items-start hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
                                    <span className="size-7 bg-zinc-900 dark:bg-zinc-800 group-hover:bg-orange-500 text-white dark:text-zinc-200 group-hover:text-white rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors duration-200 shadow-sm">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pt-0.5 font-normal">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Right Interactive Sidebar Sticky Widget Panel */}
                <div className="space-y-6 lg:sticky lg:top-25 h-fit w-full">
                    <div className="border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 rounded-2xl shadow-md backdrop-blur-md space-y-5">

                        {/* Spec Configuration Grid */}
                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-50/80 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl space-y-1">
                                <Clock className="size-4 text-zinc-400 dark:text-zinc-500" />
                                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{preparationTime || 0} Mins</span>
                                <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Time Limit</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-50/80 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl space-y-1">
                                <ChefHat className="size-4 text-zinc-400 dark:text-zinc-500" />
                                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{difficultyLevel || "Easy"}</span>
                                <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Skill Level</span>
                            </div>
                        </div>

                        {/* Interactive Engagement Analytics Bar */}
                        <div className="flex items-center justify-between text-xs px-1 border-y border-zinc-100 dark:border-zinc-800 py-3">
                            <span className="text-zinc-400 font-medium">Community Rating:</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-200/40 dark:border-zinc-700/40">
                                <Heart className="size-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                                {likesCount.toLocaleString()} Likes
                            </span>
                        </div>

                        {/* Main Action Buttons Stack Trigger Array */}
                        <div className="flex flex-col gap-3">

                            {/* Action Button 1: Purchase via Stripe Hook */}
                            <Button
                                color="primary"
                                className="w-full font-bold h-12 rounded-xl text-sm shadow-sm bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-all duration-200"
                                startContent={<CreditCard className="size-4" />}
                                onClick={handlePurchase}
                                isLoading={isPurchasing}
                            >
                                Purchase Recipe Access
                            </Button>

                            <div className="flex items-center justify-between gap-2.5">
                                {/* Action Button 2: Dynamic Counter Liking Interaction */}
                                <Button
                                    // variant="flat" 
                                    className={`font-bold rounded-xl text-xs h-11 border transition-all duration-200 ${isLiked
                                        ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400'
                                        : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                                        }`}
                                    onClick={handleLikeToggle}
                                >
                                    <Heart className={`size-4 transition-transform duration-200 ${isLiked ? 'fill-rose-500 text-rose-500 scale-105' : ''}`} />
                                    {isLiked ? 'Liked' : 'Like'}
                                </Button>

                                {/* Action Button 3: Bookmarking Favorite List Matrix */}
                                <Button
                                    // variant="flat" 
                                    className={`font-bold rounded-xl text-xs h-11 border transition-all duration-200 ${isFavorited
                                        ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400'
                                        : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                                        }`}
                                    onClick={handleFavoriteToggle}
                                >
                                    <Bookmark className={`size-4 transition-transform duration-200 ${isFavorited ? 'fill-amber-500 text-amber-500 scale-105' : ''}`} />
                                    {isFavorited ? 'Favorited' : 'Favorite'}
                                </Button>
                            </div>

                            {/* Action Button 4: Report Flag Hook Modality Activation */}
                            <Button
                                color="danger"
                                size="sm"
                                className="w-full font-bold text-xs"
                                startContent={<AlertTriangle className="size-3.5" />}
                                onClick={handleReportButtonClick}
                            >
                                Report Content Violation
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controlled HTML Layer Safe Overlay Modal Implementation */}
            {isReportModalOpen && (
                <div className="fixed inset-0 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">

                        <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 shrink-0">
                                <AlertTriangle className="size-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                                    Report Recipe Content
                                </h3>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                                    Please provide clear context regarding what violates rules inside this user submission.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleReportSubmit} className="space-y-4">
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Describe the violation (e.g., plagiarized recipe, explicit text, dangerous instructions)..."
                                rows={4}
                                required
                                className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl p-3 text-sm focus:border-zinc-400 dark:focus:border-zinc-600 outline-none resize-none font-medium text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all shadow-inner"
                            />

                            <div className="flex justify-end gap-2 pt-1">
                                <Button
                                    type="button"
                                    variant="flat"
                                    size="sm"
                                    onClick={() => { setIsReportModalOpen(false); setReportReason(''); }}
                                    className="font-bold text-xs px-4 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="danger"
                                    size="sm"
                                    isLoading={isSubmittingReport}
                                    className="font-bold text-xs px-4 h-9 rounded-xl bg-rose-600 text-white shadow-sm hover:opacity-90 transition-opacity"
                                >
                                    Submit Incident Report
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}