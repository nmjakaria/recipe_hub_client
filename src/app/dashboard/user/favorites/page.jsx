/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import { HeartCrack, UtensilsCrossed, Loader2, Eye, Calendar } from 'lucide-react';
// Fixed: Swapped out 'toast' for HeroUI's proper 'addToast' utility
import { Button, addToast, toast } from '@heroui/react'; 
import Link from 'next/link';
import { getMyFavorites } from '@/lib/api/favorite';
import { unfavoriteRecipe } from '@/lib/actions/recipe';

export default function UserFavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    const fetchFavorites = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const responseData = await getMyFavorites();
            if (Array.isArray(responseData)) {
                setFavorites(responseData);
            } else {
                console.error("API response format error:", responseData);
                setFavorites([]);
            }
        } catch (err) {
            console.error("Error loading favorite data array:", err);
            setError(err.message || "Failed to compile your custom cookbook map.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleUnfavorite = async (favoriteId) => {
        setProcessingId(favoriteId);
        try {
            const res = await unfavoriteRecipe(favoriteId);

            if (res?.success) {
                setFavorites((prev) => prev.filter((item) => (item._id || item.id) !== favoriteId));
                
                // Fixed: Correct HeroUI notification structure for success
                toast.success("Removed", {
                    description: "Removed from your favorite collection!",
                    timeout: 3000,
                });
            } else {
                // Fixed: Correct HeroUI notification structure for predictable errors
                toast.warning("Action Failed",{
                    description: res?.message || "Could not modify database record index.",
                    timeout: 2000,
                });
            }
        } catch (err) {
            console.error(err);
            // Fixed: Correct HeroUI notification structure for network failures
            toast.warning("Error",{
                description: "An unexpected error occurred during state mutation.",
                timeout: 3000
            });
        } finally {
            setProcessingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="size-7 text-primary animate-spin" />
                <p className="text-xs font-semibold text-zinc-400">Parsing saved catalog records...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <p className="text-sm font-semibold text-danger mb-2">Syncing Interrupted</p>
                <p className="text-xs text-zinc-400 max-w-sm">{error}</p>
                <Button size="sm" color="primary" variant="flat" className="mt-4 font-bold" onClick={fetchFavorites}>
                    Retry Sync
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-4">
            <div className="border-b border-default pb-5">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl text-foreground">
                    My Saved Masterpieces
                </h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                    Quickly access, review, or unfavorite recipe items pinned across your dashboard node matrix.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-2xl py-16 px-4 text-center max-w-md mx-auto mt-8 space-y-4">
                    <div className="size-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto border border-default">
                        <UtensilsCrossed className="size-5 text-zinc-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-foreground">No Favorites Saved</h3>
                        <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1">
                            Your saved cookbook module is empty. Browse recipes from our global community to add them here!
                        </p>
                    </div>
                    <Button as={Link} href="/recipes" color="primary" size="sm" className="font-bold">
                        Explore Public Recipes
                    </Button>
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-xl border border-default bg-white dark:bg-zinc-950 shadow-sm">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-default bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                <th className="p-4">Recipe</th>
                                <th className="p-4 hidden md:table-cell">Category</th>
                                <th className="p-4 hidden sm:table-cell">Cuisine Type</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default">
                            {favorites.map((item) => {
                                const favoriteId = item._id || item.id;
                                const actualRecipeId = item.recipeId || item.recipe?._id || item.recipe?.id;
                                const name = item.recipeName || item.recipe?.recipeName || "Unknown dish";
                                const image = item.recipeImage || item.recipe?.recipeImage || "/api/placeholder/80/80";
                                const category = item.category || item.recipe?.category || "Unassigned";
                                const cuisine = item.cuisineType || item.recipe?.cuisineType || "General";

                                const formattedDate = item.createdAt
                                    ? new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                                    : 'Recent';

                                return (
                                    <tr key={favoriteId} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={image}
                                                    alt={name}
                                                    className="size-12 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 border border-default"
                                                />
                                                <div className="space-y-0.5">
                                                    <span className="font-bold text-foreground line-clamp-1">{name}</span>
                                                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                                                        <Calendar className="size-3" /> Saved {formattedDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-default">
                                                {category}
                                            </span>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                                            {cuisine}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {actualRecipeId && (
                                                    <Link href={`/recipes/${actualRecipeId}`}>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            isIconOnly
                                                            title="View Full Recipe"
                                                            className="text-zinc-500 hover:text-foreground"
                                                        >
                                                            <Eye className="size-4" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button
                                                    variant="light"
                                                    color="danger"
                                                    size="sm"
                                                    isIconOnly
                                                    title="Remove from Favorites"
                                                    isLoading={processingId === favoriteId}
                                                    onClick={() => handleUnfavorite(favoriteId)}
                                                    className="hover:bg-danger-50 dark:hover:bg-danger-950/30 text-rose-500"
                                                >
                                                    {processingId !== favoriteId && <HeartCrack className="size-4" />}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}