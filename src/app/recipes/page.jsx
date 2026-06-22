// app/recipes/page.jsx
import RecipeCard from '@/components/RecipeCard';
import RecipeControls from '@/components/RecipeControls';
import { getRecipes } from '@/lib/api/recipe';
import React from 'react';

export default async function BrowseRecipePage({ searchParams }) {
    // Resolve search parameters cleanly
    const resolvedParams = await searchParams;
    const category = resolvedParams?.category || "";
    const cuisineType = resolvedParams?.cuisineType || "";
    const page = parseInt(resolvedParams?.page) || 1;

    // Execute paginated call mapping the options
    const { recipes, pagination } = await getRecipes({
        category,
        cuisineType,
        page,
        limit: 8 // Showcases 8 recipes per layout window matrix
    }) || { recipes: [], pagination: { totalPages: 1, currentPage: 1, totalCount: 0 } };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
            {/* Header Content Frame */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Explore Recipes
                </h1>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Discover your next favorite dish crafted by our global community.
                </p>
            </div>

            {/* Category / Cuisine Filter Hub & Pagination System */}
            <RecipeControls pagination={pagination} />

            {/* Conditional Empty Fallback vs Content Grid Matrix */}
            {recipes.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/40">
                    <p className="text-zinc-400 text-sm">No recipes found matching your filter selection rules.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
}