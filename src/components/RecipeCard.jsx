/* eslint-disable @next/next/no-img-element */
// components/RecipeCard.jsx
import React from 'react';
import Link from 'next/link'; // Imported for client-side navigation
import { Clock, Heart, ChefHat } from 'lucide-react';
import { Button } from '@heroui/react';

export default function RecipeCard({ recipe }) {
    if (!recipe) return null;

    const {
        recipeName,
        recipeImage,
        category,
        cuisineType,
        difficultyLevel,
        preparationTime,
        description,
        authorName,
        likesCount
    } = recipe;

    // Safely extract the database ID (handles MongoDB _id or standard id)
    const recipeId = recipe._id || recipe.id;

    // Computed style helper for difficulty levels
    const getDifficultyColor = (level) => {
        if (level === 'Hard') return 'text-danger bg-danger/10 border-danger/20';
        if (level === 'Medium') return 'text-warning bg-warning/10 border-warning/20';
        return 'text-success bg-success/10 border-success/20';
    };

    return (
        <Link 
            href={`/recipes/${recipeId}`}
            className="group bg-white dark:bg-zinc-900 border border-default rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col h-full cursor-pointer"
        >
            {/* Feature Banner Img Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img 
                    src={recipeImage || "/api/placeholder/400/300"} 
                    alt={recipeName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                
                {/* Meta Category Tags Overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                    {category && (
                        <span className="bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-white/20 shadow-sm">
                            {category}
                        </span>
                    )}
                    {cuisineType && (
                        <span className="bg-background-inverse text-background text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                            {cuisineType}
                        </span>
                    )}
                </div>
            </div>

            {/* Core Card Details Container */}
            <div className="p-4 flex flex-col flex-grow justify-between space-y-3.5">
                <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
                        {recipeName}
                    </h3>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2 h-8 leading-normal">
                        {description || "No summary overview provided for this entry."}
                    </p>
                </div>

                {/* Technical Meta Specs Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-default text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-zinc-400" />
                        <span>{preparationTime || 0} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                        <ChefHat className="size-3.5 text-zinc-400" />
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium border ${getDifficultyColor(difficultyLevel)}`}>
                            {difficultyLevel || 'Easy'}
                        </span>
                    </div>
                </div>

                {/* Author Frame & Social Indicators Footer */}
                <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-[130px]">
                        by {authorName}
                    </span>
                    <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 group/heart">
                        <Heart className="size-3.5 text-danger fill-danger/10 group-hover/heart:fill-danger transition-colors duration-200" />
                        <span className="text-xs font-semibold">{likesCount || 0}</span>
                    </div>
                </div>
                <div className='text-center'>

                    <Button>
                        View details
                    </Button>

                </div>
            </div>
        </Link>
    );
}