// app/recipes/page.jsx
import RecipeCard from '@/components/RecipeCard';
import RecipeControls from '@/components/RecipeControls';
import { getRecipes } from '@/lib/api/recipe';
import { FilterX } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: "Browse Recipes | Recipe Hub",
  description: "Explore a vast collection of delicious recipes. Search by ingredients, cuisine, or dietary preferences to find your next perfect meal.",
};

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
                <div
                    className="group text-center py-16 px-6 border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-900/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-4 select-none outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700"
                >
                    {/* Animated Icon Container */}
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 group-hover:scale-105 transition-all duration-300">
                        <FilterX className="size-6 stroke-[1.5]" />
                    </div>

                    {/* Text Context Content */}
                    <div className="space-y-1 max-w-sm mx-auto">
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm transition-colors">
                            No recipes found matching your filter selection rules.
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                            Click anywhere inside this area to reset active parameters.
                        </p>
                    </div>
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