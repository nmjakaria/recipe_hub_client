/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Edit, Plus, Eye, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@heroui/react';
import { getAllRecipes } from '@/lib/api/recipe';
import DeleteRecipeModal from '@/components/dashboard/admin/DeleteRecipeModal';
import { updateRecipeFeaturedStatus, updateRecipeModerationStatus } from '@/lib/actions/admin';

export default function AdminRecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(null); // Track specific field mutations by ID

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setIsLoading(true);
                const response = await getAllRecipes();

                console.log("Backend response received:", response);

                if (Array.isArray(response)) {
                    setRecipes(response);
                } else if (response && Array.isArray(response.data)) {
                    setRecipes(response.data);
                } else if (response && Array.isArray(response.recipes)) {
                    setRecipes(response.recipes);
                } else {
                    console.error("API did not return an array. Received:", response);
                    setRecipes([]);
                }

            } catch (err) {
                console.error("Failed to load global system recipes:", err);
                setError("Could not retrieve system recipes. Please verify authentication privileges.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    // Master administrative field modifier handler
    const handleUpdateField = async (id, fieldName, newValue) => {
        try {
            setIsUpdating(`${id}-${fieldName}`);

            // Dynamically routing to the correct mutation action helper
            if (fieldName === 'isFeatured') {
                await updateRecipeFeaturedStatus(id, newValue);
            } else if (fieldName === 'status') {
                await updateRecipeModerationStatus(id, newValue);
            }

            // Optimistic UI synchronizer array mapping update
            setRecipes((prev) =>
                prev.map((item) => {
                    const currentId = item._id || item.id;
                    return currentId === id ? { ...item, [fieldName]: newValue } : item;
                })
            );
        } catch (err) {
            console.error("Administrative update payload failure:", err);
            alert("Failed to modify target schema record. Ensure access policies are active.");
        } finally {
            setIsUpdating(null);
        }
    };

    const handleDeleteSuccess = (deletedId) => {
        setRecipes((prev) => prev.filter((item) => (item._id || item.id) !== deletedId));
    };

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="size-7 text-primary animate-spin" />
                <p className="text-xs font-semibold text-zinc-400">Loading master catalog matrices...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
                <p className="text-sm font-semibold text-danger">{error}</p>
                <Button size="sm" color="primary" onClick={() => window.location.reload()}>Retry Sync Connection</Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {/* Header Content */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-default pb-5">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">Global Recipe Registry</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Admin administrative portal to observe, edit structural arrays, and destroy application-wide recipes.</p>
                </div>
                {/* Fixed: Wrapped Button inside Link, removed directly attached href and as props */}
                <Link href="/recipes/create">
                    <Button color="primary" size="md" className="font-bold rounded-xl" startContent={<Plus className="size-4" />}>
                        Create Global Recipe
                    </Button>
                </Link>
            </div>

            {/* Catalog Output List */}
            {recipes.length === 0 ? (
                <div className="border border-dashed border-default rounded-2xl p-12 text-center text-sm text-zinc-400">
                    No active recipes found residing in the current schema database blocks.
                </div>
            ) : (
                <div className="overflow-x-auto border border-default rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-default text-xs font-bold text-zinc-500 tracking-wider">
                                <th className="p-4">Recipe Info</th>
                                <th className="p-4">Category / Cuisine</th>
                                <th className="p-4">Prep Time</th>
                                <th className="p-4 text-center">Featured Spotlight</th>
                                <th className="p-4 text-center">Moderation Status</th>
                                <th className="p-4 text-right">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default text-sm">
                            {recipes.map((item) => {
                                const id = item._id || item.id;
                                const isItemFeatured = item.isFeatured || false;
                                const currentStatus = item.status || 'pending';

                                return (
                                    <tr key={id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <img
                                                src={item.recipeImage || '/placeholder.png'}
                                                alt={item.recipeName}
                                                className="w-12 h-12 rounded-xl object-cover border border-default bg-zinc-100"
                                            />
                                            <div>
                                                <p className="font-bold text-foreground max-w-xs truncate">{item.recipeName}</p>
                                                <p className="text-xs text-zinc-400 capitalize">{item.difficultyLevel || 'Easy'}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-zinc-600 dark:text-zinc-300">
                                            <span className="capitalize block font-medium">{item.category || 'Uncategorized'}</span>
                                            <span className="text-xs text-zinc-400 capitalize">{item.cuisineType}</span>
                                        </td>
                                        <td className="p-4 text-zinc-600 dark:text-zinc-300">{item.preparationTime} Mins</td>

                                        {/* Toggle isFeatured Element */}
                                        <td className="p-4 text-center">
                                            <Button
                                                size="sm"
                                                color={isItemFeatured ? "warning" : "default"}
                                                disabled={isUpdating === `${id}-isFeatured`}
                                                onClick={() => handleUpdateField(id, 'isFeatured', !isItemFeatured)}
                                                className="rounded-xl font-bold min-w-[100px]"
                                            >
                                                <Star className={`size-3.5 ${isItemFeatured ? 'fill-current' : ''}`} />
                                                {isItemFeatured ? "Featured" : "Standard"}
                                            </Button>
                                        </td>

                                        {/* Toggle status Element */}
                                        <td className="p-4 text-center">
                                            <Button
                                                size="sm"
                                                color={currentStatus === 'allowed' ? "success" : "danger"}
                                                disabled={isUpdating === `${id}-status`}
                                                onClick={() => handleUpdateField(id, 'status', currentStatus === 'allowed' ? 'pending' : 'allowed')}
                                                className="rounded-xl font-bold text-white min-w-[100px] capitalize"
                                            >
                                                <span>{currentStatus === 'allowed' ? <CheckCircle className="size-3.5" /> : <AlertCircle className="size-3.5" />}</span>
                                                {currentStatus}
                                            </Button>
                                        </td>

                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Fixed: Wrapped inside cleanly isolated Next.js Link wrapper without component property hooks */}
                                                <Link href={`/recipes/${id}`}>
                                                    <Button size="sm" className="rounded-xl w-9 h-9 border border-default bg-zinc-50 dark:bg-zinc-900">
                                                        <Eye size={16} className="text-zinc-500" />
                                                    </Button>
                                                </Link>

                                                {/* Fixed: Removed variant="flat" and wrapped with explicit NextLink markup container blocks */}
                                                <Link href={`/dashboard/admin/recipes/edit/${id}`}>
                                                    <Button size="sm" className="rounded-xl w-9 h-9 border border-default bg-zinc-50 dark:bg-zinc-900 hover:bg-primary-50">
                                                        <Edit size={16} className="text-accent" />
                                                    </Button>
                                                </Link>

                                                <DeleteRecipeModal recipe={item} onDeleteSuccess={handleDeleteSuccess} />
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