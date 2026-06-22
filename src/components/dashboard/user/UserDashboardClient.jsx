"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Chip, Spinner } from "@heroui/react";
import {
    ChefHat,
    Heart,
    ThumbsUp,
    ArrowRight,
    Plus,
    Compass,
    Settings,
    Crown,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { getRecipeByUser } from "@/lib/api/recipe";
import { getMyFavorites } from "@/lib/api/favorite";

export default function UserDashboardClient({ user }) {
    // 1. Manage database metrics in dynamic component state
    const [stats, setStats] = useState({
        totalRecipes: 0,
        totalFavorites: 0,
        totalLikes: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const isPremium = user?.plan && user.plan !== "user_free";

    // 2. Lifecycle hook to safely fetch database data asynchronously
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);

                // Fetch both datasets concurrently for high performance
                const [recipesData, favoritesData] = await Promise.all([
                    getRecipeByUser(),
                    getMyFavorites()
                ]);

                const recipes = Array.isArray(recipesData) ? recipesData : [];
                const favorites = Array.isArray(favoritesData) ? favoritesData : [];

                // Calculate total engagement (sum of likes across all user's recipes)
                const totalLikes = recipes.reduce((sum, item) => {
                    const count = item.likeCount || (Array.isArray(item.likes) ? item.likes.length : 0) || 0;
                    return sum + count;
                }, 0);

                setStats({
                    totalRecipes: recipes.length,
                    totalFavorites: favorites.length,
                    totalLikes: totalLikes
                });
            } catch (error) {
                console.error("Error aggregating dashboard metrics data matrices:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // 3. Evaluation logic checking if free tier threshold has been maxed out
    const isLimitReached = !isPremium && stats.totalRecipes >= 2;

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
                                <Crown className="size-3.5" /> Premium Pro
                            </Chip>
                        ) : (
                            <Chip color="default" variant="flat" className="font-semibold text-xs text-zinc-600 dark:text-zinc-400">
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
                            endContent={<ArrowRight className="size-4" />}
                            className="rounded-xl font-medium text-sm cursor-pointer shadow-sm"
                        >
                            Upgrade to Pro
                        </Button>
                    </Link>
                )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Published Recipes */}
                <Card className="p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between h-40 rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Published Recipes</span>
                        <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-500">
                            <ChefHat className="size-5" />
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <Spinner size="sm" color="current" />
                        ) : (
                            <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{stats.totalRecipes}</span>
                        )}
                        <Link
                            href="/dashboard/user/my-recipes"
                            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium mt-2 group"
                        >
                            View details <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </Card>

                {/* Saved Favorites */}
                <Card className="p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between h-40 rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Saved Favorites</span>
                        <div className="p-2 rounded-xl bg-danger-50 dark:bg-danger-950/20 text-danger">
                            <Heart className="size-5" />
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <Spinner size="sm" color="current" />
                        ) : (
                            <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{stats.totalFavorites}</span>
                        )}
                        <Link
                            href="/dashboard/user/favorites"
                            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium mt-2 group"
                        >
                            View details <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </Card>

                {/* Total Engagement */}
                <Card className="p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between h-40 rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Engagement</span>
                        <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary">
                            <ThumbsUp className="size-5" />
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <Spinner size="sm" color="current" />
                        ) : (
                            <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{stats.totalLikes}</span>
                        )}
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                            Likes accumulated across all creations
                        </p>
                    </div>
                </Card>

            </div>

            {/* Dynamic Premium Limit & Warning Banner Container */}
            {!isLoading && (
                isLimitReached ? (
                    // Action Red Alert Block when a Free Account hits or exceeds the 2-recipe limit
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-danger-200 bg-danger-50 dark:bg-danger-950/10 gap-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-danger-100 dark:bg-danger-950/50 text-danger shrink-0">
                                <AlertTriangle className="size-5 shrink-0" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-danger-700 dark:text-danger-400">
                                    Recipe Storage Limit Reached ({stats.totalRecipes}/2)
                                </h4>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                    Your free account tier is maxed out. You must upgrade to premium to publish additional custom masterpieces.
                                </p>
                            </div>
                        </div>
                        <Link href="/dashboard/user/billing" className="shrink-0 inline-block w-full sm:w-auto">
                            <Button
                                as="span"
                                color="danger"
                                className="font-bold rounded-xl text-xs h-10 px-5 cursor-pointer w-full shadow-sm"
                            >
                                Go to Premium
                            </Button>
                        </Link>
                    </div>
                ) : (
                    // Regular tier info notification card shown when limit isn't reached yet
                    !isPremium && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 gap-4 shadow-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-primary text-xl leading-none self-start mt-0.5">•</span>
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        Storage Status: {stats.totalRecipes}/2 Recipes
                                    </h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                        Basic accounts are limited to 2 recipes. Upgrade to unlock unlimited canvas space.
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
                    )
                )
            )}

            {/* Quick Actions Container Card */}
            <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-5 rounded-2xl">
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Quick Actions</h3>

                <div className="flex flex-wrap gap-3">
                    {/* Conditional rendering or disabling of creation trigger based on limit status */}
                    <Link
                        href={isLimitReached ? "/dashboard/user/billing" : "/dashboard/user/add-recipe"}
                        className="inline-block"
                    >
                        <Button
                            as="span"
                            color={isLimitReached ? "default" : "primary"}
                            isDisabled={isLoading}
                            className="font-bold rounded-xl text-sm h-11 px-5 cursor-pointer shadow-sm"
                        >
                            <span className="flex items-center gap-1.5">
                                {isLimitReached ? <Crown className="size-4 text-warning" /> : <Plus className="size-4" />}
                                {isLimitReached ? "Unlock Unlimited Recipes (Pro)" : "Create new recipe"}
                            </span>
                        </Button>
                    </Link>

                    <Link href="/gallery" className="inline-block">
                        <Button
                            as="span"
                            color="primary"
                            className="font-medium rounded-xl text-sm h-11 px-5 cursor-pointer shadow-sm"
                        >
                            <span className="flex items-center gap-1.5">
                                <Compass className="size-4" /> Browse gallery
                            </span>
                        </Button>
                    </Link>

                    <Link href="/dashboard/user/favorites" className="inline-block">
                        <Button
                            as="span"
                            color="primary"
                            className="font-medium rounded-xl text-sm h-11 px-5 cursor-pointer shadow-sm"
                        >
                            <span className="flex items-center gap-1.5">
                                <Heart className="size-4" /> View saved items
                            </span>
                        </Button>
                    </Link>

                    <Link href="/dashboard/user/my-profile" className="inline-block">
                        <Button
                            as="span"
                            color="primary"
                            className="font-medium rounded-xl text-sm h-11 px-5 cursor-pointer shadow-sm"
                        >
                            <span className="flex items-center gap-1.5">
                                <Settings className="size-4" /> Account settings
                            </span>
                        </Button>
                    </Link>
                </div>
            </Card>

        </div>
    );
}