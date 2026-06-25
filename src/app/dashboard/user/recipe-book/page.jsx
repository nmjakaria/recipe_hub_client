/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { ChefHat, BookOpen, Calendar, DollarSign, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@heroui/react';
import { getUserSession } from '@/lib/core/session';
import { getUserRecipeBook } from '@/lib/api/recipe';


export default async function UserRecipeBookPage() {
    const user = await getUserSession();
    const userId = user?.id; 
    
    const purchasedRecipes = await getUserRecipeBook(userId);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 text-zinc-900 dark:text-zinc-50 antialiased min-h-screen">
            
            {/* Page Header */}
            <div className="space-y-1.5 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-orange-500/10 text-orange-500 rounded-xl">
                        <BookOpen className="size-5" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">My Premium Vault</h1>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    Your personal library of permanently unlocked culinary blueprints and curated instructions.
                </p>
            </div>

            {/* Empty State */}
            {purchasedRecipes.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-xl">
                    <div className="size-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 mx-auto">
                        <ChefHat className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-base">Your Recipe Vault is Empty</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium px-2">
                            You haven't purchased any premium standalone recipe guides yet. Explore the marketplace to unlock one!
                        </p>
                    </div>
                    <Link href="/dashboard/user/recipes" className="block pt-2">
                        <Button className="w-full font-bold h-10 rounded-xl text-xs bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950">
                            Browse Marketplace
                        </Button>
                    </Link>
                </div>
            ) : (
                /* Recipe Grid Workspace */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedRecipes.map((item) => (
                        <div 
                            key={item.purchaseId} 
                            className="group bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col h-full"
                        >
                            {/* Card Media Header - Uses recipeImage */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                                <img 
                                    src={item.recipeImage} 
                                    alt={item.recipeName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-zinc-900/80 dark:bg-zinc-900/90 text-white backdrop-blur-xs rounded-lg border border-white/10">
                                    {item.category}
                                </span>
                            </div>

                            {/* Card Information - Uses recipeName & preparationTime */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <h2 className="font-black text-lg text-zinc-800 dark:text-zinc-100 tracking-tight leading-snug line-clamp-2">
                                        {item.recipeName}
                                    </h2>
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                                        <Clock className="size-3.5 text-zinc-400" />
                                        <span>Prep Time: {item.preparationTime}</span>
                                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                        <span className="text-zinc-400">{item.cuisineType}</span>
                                    </div>
                                </div>

                                {/* Financial Receipt Summary Breakdown */}
                                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-2 text-xs">
                                    <div className="flex items-center justify-between font-medium">
                                        <span className="text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                                            <Calendar className="size-3.5" /> Unlocked On
                                        </span>
                                        <span className="text-zinc-700 dark:text-zinc-300">
                                            {item.paidAt ? new Date(item.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between font-medium">
                                        <span className="text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                                            <DollarSign className="size-3.5" /> Amount Paid
                                        </span>
                                        <span className="font-black text-zinc-800 dark:text-zinc-200">
                                            ${item.amountPaid.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="pt-1.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                                        <span>TX_ID</span>
                                        <span className="max-w-32.5 truncate select-all">{item.transactionId}</span>
                                    </div>
                                </div>

                                {/* Dynamic Details Action CTA Button */}
                                <Link href={`/recipes/${item.recipeId}`} className="block w-full pt-1">
                                    <Button 
                                        className="w-full font-bold h-11 rounded-xl text-xs bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 shadow-xs transition-colors"
                                    >
                                        View Details <ExternalLink className="size-3.5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}