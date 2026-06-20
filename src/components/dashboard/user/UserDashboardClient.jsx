// app/dashboard/user/UserDashboardClient.jsx
"use client";

import React from "react";
import { Card, Button, Chip } from "@heroui/react";
import { 
    ChefHat, 
    Heart, 
    ThumbsUp, 
    ArrowRight, 
    Plus, 
    Compass, 
    Settings, 
    Crown 
} from "lucide-react";
import Link from "next/link";

export default function UserDashboardClient({ user }) {
    // Fallback/mock values mirroring layout specifications
    const stats = {
        totalRecipes: user?.totalRecipes || 0,
        totalFavorites: user?.totalFavorites || 2,
        totalLikes: user?.totalLikes || 0
    };

    const isPremium = user?.plan && user.plan !== "user_free";

    return (
        <div className="space-y-8 p-6 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Overview</h1>
                        {isPremium ? (
                            <Chip 
                                color="warning" 
                                variant="flat" 
                                className="font-semibold text-xs"
                            >
                                <span><Crown className="size-3.5" /></span>
                                Premium Pro
                            </Chip>
                        ) : (
                            <Chip color="default" variant="flat" className="font-semibold text-xs text-zinc-600">
                                Free Tier
                            </Chip>
                        )}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Welcome back, {user?.name || "Chef"}. Here is your command center.
                    </p>
                </div>

                {!isPremium && (
                    <Link href="/dashboard/user/billing" className="self-start sm:self-auto inline-block">
                        <Button 
                            as="span" 
                            color="primary"
                            variant="flat" 
                            endContent={<ArrowRight className="size-4" />}
                            className="rounded-xl font-medium text-sm cursor-pointer"
                        >
                            Upgrade to Pro
                        </Button>
                    </Link>
                )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Published Recipes */}
                <Card className="p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Published Recipes</span>
                        <ChefHat className="size-5 text-zinc-400" />
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{stats.totalRecipes}</span>
                        <Link 
                            href="/dashboard/user/my-recipes" 
                            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium mt-2 group"
                        >
                            View details <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </Card>

                {/* Saved Favorites */}
                <Card className="p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Saved Favorites</span>
                        <Heart className="size-5 text-zinc-400" />
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{stats.totalFavorites}</span>
                        <Link 
                            href="/dashboard/user/favorites" 
                            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium mt-2 group"
                        >
                            View details <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </Card>

                {/* Total Engagement */}
                <Card className="p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Engagement</span>
                        <ThumbsUp className="size-5 text-zinc-400" />
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{stats.totalLikes}</span>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                            Across all recipes
                        </p>
                    </div>
                </Card>

            </div>

            {/* Premium Callout/Limit Dynamic Banner */}
            {!isPremium && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 gap-4 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="text-zinc-900 dark:text-zinc-100 self-start mt-1">•</span>
                        <div>
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                Storage Limit: {stats.totalRecipes}/2 Recipes
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Basic accounts are limited to 2 recipes. Upgrade to unlock unlimited storage.
                            </p>
                        </div>
                    </div>
                    <Link href="/dashboard/user/billing" className="shrink-0 inline-block">
                        <Button 
                            as="span"
                            color="primary"
                            className="font-medium rounded-xl text-xs h-9 px-4 cursor-pointer"
                        >
                            Upgrade Account
                        </Button>
                    </Link>
                </div>
            )}

            {/* Quick Actions Container Card */}
            <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-4">
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Quick Actions</h3>
                
                <div className="flex flex-wrap gap-3">
                    <Link href="/dashboard/user/add-recipe" className="inline-block">
                        <Button 
                            as="span"
                            color="primary"
                            startContent={<Plus className="size-4" />}
                            className="font-medium rounded-xl text-sm h-10 px-4 cursor-pointer"
                        >
                            Create new recipe
                        </Button>
                    </Link>

                    <Link href="/gallery" className="inline-block">
                        <Button 
                            as="span" 
                            color="primary"
                            variant="flat"
                            startContent={<Compass className="size-4" />}
                            className="font-medium rounded-xl text-sm h-10 px-4 cursor-pointer"
                        >
                            Browse gallery
                        </Button>
                    </Link>

                    <Link href="/dashboard/user/favorites" className="inline-block">
                        <Button 
                            as="span" 
                            color="primary"
                            variant="flat"
                            startContent={<Heart className="size-4" />}
                            className="font-medium rounded-xl text-sm h-10 px-4 cursor-pointer"
                        >
                            View saved items
                        </Button>
                    </Link>

                    <Link href="/dashboard/user/my-profile" className="inline-block">
                        <Button 
                            as="span" 
                            color="primary"
                            variant="flat"
                            startContent={<Settings className="size-4" />}
                            className="font-medium rounded-xl text-sm h-10 px-4 cursor-pointer"
                        >
                            Account settings
                        </Button>
                    </Link>
                </div>
            </Card>

        </div>
    );
}