/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from 'react';
import { PlusCircle, UtensilsCrossed, Loader2, Eye, Edit3, Trash2, Calendar, Clock } from 'lucide-react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { getRecipeByUser } from '@/lib/api/recipe';
import { deleteRecipe } from '@/lib/actions/recipe';

export default function UserMyRecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Action: Fetch User Recipes ---
    const fetchMyRecipes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const responseData = await getRecipeByUser();

            if (Array.isArray(responseData)) {
                setRecipes(responseData);
            } else if (responseData && Array.isArray(responseData.recipes)) {
                setRecipes(responseData.recipes);
            } else if (responseData && Array.isArray(responseData.data)) {
                setRecipes(responseData.data);
            } else {
                console.error("API response format is not an array:", responseData);
                setRecipes([]);
            }
        } catch (err) {
            console.error("Error pulling account recipe matrix:", err);
            setError(err.message || "Failed to compile user catalog profile map.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyRecipes();
    }, []);

    // --- Action: Delete Recipe ---
    const handleDeleteRecipe = async (id) => {
        if (!confirm("Are you sure you want to delete this recipe permanently?")) return;

        try {
            const res = await deleteRecipe(id);

            if (res.success) {
                setRecipes(prev => prev.filter(item => (item._id || item.id) !== id));
                alert("Recipe removed successfully!");
            } else {
                alert(res.error || "Failed to delete the recipe. Please try again.");
            }
        } catch (err) {
            console.error("Error removing recipe catalog index:", err);
            alert(err.message || "An unexpected network error occurred.");
        }
    };

    // --- State Layout Render 1: Loading Spinner ---
    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="size-7 text-primary animate-spin" />
                <p className="text-xs font-semibold text-zinc-400">Compiling your culinary database...</p>
            </div>
        );
    }

    // --- State Layout Render 2: Error Feedback ---
    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <p className="text-sm font-semibold text-danger mb-2">Syncing Interrupted</p>
                <p className="text-xs text-zinc-400 max-w-sm">{error}</p>
                <Button size="sm" color="primary" variant="flat" className="mt-4 font-bold" onClick={fetchMyRecipes}>Retry Sync</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-4">

            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-default pb-5">
                <div>
                    <h1 className="text-xl font-black tracking-tight sm:text-2xl text-foreground">My Culinary Creations</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Manage, modify, or remove recipes published under your account credentials.</p>
                </div>
                <Link
                    href="/dashboard/user/add-recipe"
                >
                    <Button
                        color="primary"
                        size="sm"
                        className="font-bold shadow-sm self-start sm:self-auto"
                    >
                        <span><PlusCircle className="size-4" /></span>
                        Create New Recipe
                    </Button>
                </Link>

            </div>

            {/* Empty Fallback Frame */}
            {recipes.length === 0 ? (
                <div className="border border-dashed border-default bg-zinc-50/50 dark:bg-zinc-900/10 rounded-2xl py-16 px-4 text-center max-w-md mx-auto mt-8 space-y-4">
                    <div className="size-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto border border-default">
                        <UtensilsCrossed className="size-5 text-zinc-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-foreground">No Recipes Shared Yet</h3>
                        <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1">Your personal recipe book is blank. Start sharing your cooking procedures with the community matrix today!</p>
                    </div>
                    <Button
                        as={Link}
                        href="/dashboard/user/create-recipe"
                        color="primary"
                        size="sm"
                        className="font-bold"
                    >
                        Publish Your First Recipe
                    </Button>
                </div>
            ) : (
                /* --- Dynamic Data Management Table --- */
                <div className="w-full overflow-x-auto rounded-xl border border-default bg-white dark:bg-zinc-950 shadow-sm">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-default bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                <th className="p-4">Recipe</th>
                                <th className="p-4 hidden md:table-cell">Category</th>
                                <th className="p-4 hidden sm:table-cell">Prep Time</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default">
                            {recipes.map((item) => {
                                const recipeId = item._id || item.id;

                                // Format dates neatly if available
                                const formattedDate = item.createdAt
                                    ? new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                                    : 'Recent';

                                return (
                                    <tr key={recipeId} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">

                                        {/* Column 1: Image & Details */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.recipeImage || "/api/placeholder/80/80"}
                                                    alt={item.recipeName}
                                                    className="size-12 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 border border-default"
                                                />
                                                <div className="space-y-0.5">
                                                    <span className="font-bold text-foreground line-clamp-1">{item.recipeName}</span>
                                                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                                                        <Calendar className="size-3" /> {formattedDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 2: Category */}
                                        <td className="p-4 hidden md:table-cell">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-default">
                                                {item.category || item.cuisineType || 'Unassigned'}
                                            </span>
                                        </td>

                                        {/* Column 3: Prep Time */}
                                        <td className="p-4 hidden sm:table-cell">
                                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 text-xs">
                                                <Clock className="size-3.5 text-zinc-400" />
                                                <span>{item.preparationTime || 0} mins</span>
                                            </div>
                                        </td>

                                        {/* Column 4: System Verification Status Tag */}
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${item.status === 'approved'
                                                ? 'bg-success-50 text-success border-success-200 dark:bg-success-950/20 dark:border-success-800/30'
                                                : item.status === 'pending'
                                                    ? 'bg-warning-50 text-warning border-warning-200 dark:bg-warning-950/20 dark:border-warning-800/30'
                                                    : 'bg-danger-50 text-danger border-danger-200 dark:bg-danger-950/20 dark:border-danger-800/30'
                                                }`}>
                                                {item.status || 'pending'}
                                            </span>
                                        </td>

                                        {/* Column 5: Action Controls */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">

                                                {/* View Button */}
                                                <Link
                                                    href={`/recipes/${recipeId}`}
                                                >
                                                    <Button
                                                        variant="light"
                                                        size="sm"
                                                        isIconOnly
                                                        title="View Public Recipe"
                                                        className="text-zinc-500 hover:text-foreground"
                                                    >
                                                        <Eye className="size-4" />
                                                    </Button>
                                                </Link>

                                                {/* Edit / Update Button */}
                                                <Link
                                                    href={`/dashboard/user/edit-recipe/${recipeId}`}
                                                >
                                                    <Button
                                                        variant="light"
                                                        color="primary"
                                                        size="sm"
                                                        isIconOnly
                                                        title="Edit Recipe"
                                                        className="hover:bg-primary-50 dark:hover:bg-primary-950/30"
                                                    >
                                                        <Edit3 className="size-4" />
                                                    </Button>
                                                </Link>

                                                {/* Delete Button */}
                                                <Button
                                                    variant="light"
                                                    color="danger"
                                                    size="sm"
                                                    isIconOnly
                                                    title="Delete Permanently"
                                                    onClick={() => handleDeleteRecipe(recipeId)}
                                                    className="hover:bg-danger-50 dark:hover:bg-danger-950/30"
                                                >
                                                    <Trash2 className="size-4" />
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