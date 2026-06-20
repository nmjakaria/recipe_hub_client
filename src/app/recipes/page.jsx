// app/recipes/page.jsx (or your specific browse path)
import RecipeCard from '@/components/RecipeCard';
import { getRecipe } from '@/lib/api/recipe';
import React from 'react';

export default async function BrowseRecipePage() {
    // Fetching array matching the database structure
    const recipes = await getRecipe() || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
            {/* Header Content Frame */}
            <div className="mb-8 border-b border-default pb-5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Explore Recipes
                </h1>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Discover your next favorite dish crafted by our global community.
                </p>
            </div>

            {/* Conditional Empty Fallback vs Content Grid Matrix */}
            {recipes.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-default rounded-2xl bg-white dark:bg-zinc-900/40">
                    <p className="text-zinc-400 text-sm">No recipes found. Be the first to publish one!</p>
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