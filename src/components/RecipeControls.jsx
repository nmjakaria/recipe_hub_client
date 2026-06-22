// components/RecipeControls.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";

// Example static categories/cuisines. Replace with your structural database options.
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Beverages"];
const CUISINES = ["Bangladeshi", "Italian", "Mexican", "Indian", "Chinese", "French", "Japanese", "American", "Mediterranean"];

export default function RecipeControls({ pagination }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") || "";
    const currentCuisine = searchParams.get("cuisineType") || "";
    const currentPage = parseInt(searchParams.get("page")) || 1;

    const updateFilters = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1"); // Reset pagination to page 1 on filter changes
        
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        router.push(`/recipes?${params.toString()}`);
    };

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`/recipes?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-6 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Category Filter Element */}
                    <select
                        value={currentCategory}
                        onChange={(e) => updateFilters("category", e.target.value)}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:border-primary"
                    >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Cuisine Filter Element */}
                    <select
                        value={currentCuisine}
                        onChange={(e) => updateFilters("cuisineType", e.target.value)}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:border-primary"
                    >
                        <option value="">All Cuisines</option>
                        {CUISINES.map((cui) => (
                            <option key={cui} value={cui}>{cui}</option>
                        ))}
                    </select>

                    {/* Clear Button active if filtering is set */}
                    {(currentCategory || currentCuisine) && (
                        <Button 
                            size="sm" 
                            variant="light" 
                            color="danger" 
                            onPress={() => router.push('/recipes')}
                            className="text-xs font-semibold rounded-lg"
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>

                <p className="text-xs text-zinc-500 font-medium">
                    Found {pagination.totalCount || 0} total recipes
                </p>
            </div>

            {/* Pagination Controls Footer Block */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2">
                    <Button
                        size="sm"
                        variant="bordered"
                        isDisabled={currentPage <= 1}
                        onPress={() => handlePageChange(currentPage - 1)}
                        className="rounded-xl font-medium text-xs dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                        Previous
                    </Button>
                    
                    <span className="text-xs font-semibold px-3 text-zinc-600 dark:text-zinc-400">
                        Page {currentPage} of {pagination.totalPages}
                    </span>

                    <Button
                        size="sm"
                        variant="bordered"
                        isDisabled={currentPage >= pagination.totalPages}
                        onPress={() => handlePageChange(currentPage + 1)}
                        className="rounded-xl font-medium text-xs dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}