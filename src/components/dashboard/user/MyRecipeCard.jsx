"use client";

import React from 'react';
import { Clock, ChefHat, Eye, Trash2, Edit } from 'lucide-react';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function MyRecipeCard({ recipe, onDeleteRefresh }) {
    const { _id, id, recipeName, recipeImage, category, preparationTime, difficultyLevel } = recipe;
    const recipeId = _id || id;

    return (
        <div className="border border-default bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            {/* Card Image Cover Section */}
            <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800 border-b border-default">
                <img 
                    src={recipeImage || "/api/placeholder/400/225"} 
                    alt={recipeName} 
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                    {category}
                </span>
            </div>

            {/* Core Metadata Frame */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 className="font-bold text-base text-foreground line-clamp-1">{recipeName}</h3>
                    
                    <div className="flex gap-3 text-xs text-zinc-400 mt-2">
                        <span className="flex items-center gap-1">
                            <Clock className="size-3.5" /> {preparationTime || 0} mins
                        </span>
                        <span className="flex items-center gap-1">
                            <ChefHat className="size-3.5" /> {difficultyLevel || 'Easy'}
                        </span>
                    </div>
                </div>

                {/* Dashboard Control Utility Row */}
                <div className="flex gap-2 pt-2 border-t border-default text-xs">
                    <Button 
                        as={Link} 
                        href={`/recipes/${recipeId}`} 
                        variant="flat" 
                        size="sm" 
                        className="flex-1 font-semibold"
                        startContent={<Eye className="size-3.5" />}
                    >
                        View
                    </Button>
                    
                    <Button 
                        variant="flat" 
                        color="danger" 
                        size="sm" 
                        isIconOnly
                        onClick={() => onDeleteRefresh(recipeId)}
                        className="border border-danger/20"
                    >
                        <Trash2 className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}