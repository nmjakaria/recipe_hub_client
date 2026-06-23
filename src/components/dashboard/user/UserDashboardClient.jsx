"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

// Framer motion orchestration configs
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.02 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } }
};

export default function UserDashboardClient({ user }) {
    const [stats, setStats] = useState({
        totalRecipes: 0,
        totalFavorites: 0,
        totalLikes: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const isPremium = user?.plan && user.plan !== "user_free";

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const [recipesData, favoritesData] = await Promise.all([
                    getRecipeByUser(),
                    getMyFavorites()
                ]);

                const recipes = Array.isArray(recipesData) ? recipesData : [];
                const favorites = Array.isArray(favoritesData) ? favoritesData : [];

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
                console.error("Error aggregating user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const isLimitReached = !isPremium && stats.totalRecipes >= 2;

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-10 p-6 max-w-7xl mx-auto selection:bg-zinc-200 dark:selection:bg-zinc-800"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Overview</h1>
                        {isPremium ? (
                            <Chip
                                color="warning"
                                className="font-semibold text-xs px-2"
                            >
                                <span className="flex items-center gap-1"><Crown className="size-3.5 text-warning-500" /> Premium Pro</span>
                            </Chip>
                        ) : (
                            <Chip color="default" className="font-semibold text-xs text-zinc-600 dark:text-zinc-400 px-2 bg-zinc-100 dark:bg-zinc-800">
                                Free Tier
                            </Chip>
                        )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Welcome back, <span className="font-medium text-zinc-800 dark:text-zinc-200">{user?.name || "Chef"}</span>. Here is your command center.
                    </p>
                </div>

                {!isPremium && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/dashboard/user/billing" className="self-start sm:self-auto inline-block">
                            <Button
                                as="span"
                                color="primary"
                                className="rounded-xl font-semibold text-xs h-10 px-4 cursor-pointer shadow-sm   hover:opacity-90 transition-opacity"
                            >
                                Upgrade to Pro <ArrowRight className="size-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Published Recipes */}
                <motion.div variants={itemVariants}>
                    <Card className="p-5 bg-white dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between gap-5 group h-full">
                        <div className="space-y-4">
                            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 w-fit transition-transform duration-300 group-hover:scale-105">
                                <ChefHat className="size-5 stroke-2" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">Published Recipes</p>
                                <h4 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    {isLoading ? <Spinner size="sm" color="current" className="h-9" /> : stats.totalRecipes.toLocaleString()}
                                </h4>
                            </div>
                        </div>
                        <Link href="/dashboard/user/my-recipes" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors pt-2 border-t border-zinc-100 dark:border-zinc-800/60 w-full">
                            View recipe library
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Card>
                </motion.div>

                {/* Saved Favorites */}
                <motion.div variants={itemVariants}>
                    <Card className="p-5 bg-white dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between gap-5 group h-full">
                        <div className="space-y-4">
                            <div className="p-2.5 rounded-xl bg-danger-50 dark:bg-danger-950/20 text-danger w-fit transition-transform duration-300 group-hover:scale-105">
                                <Heart className="size-5 stroke-2" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">Saved Favorites</p>
                                <h4 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    {isLoading ? <Spinner size="sm" color="current" className="h-9" /> : stats.totalFavorites.toLocaleString()}
                                </h4>
                            </div>
                        </div>
                        <Link href="/dashboard/user/favorites" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors pt-2 border-t border-zinc-100 dark:border-zinc-800/60 w-full">
                            View bookmarked items
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Card>
                </motion.div>

                {/* Total Engagement */}
                <motion.div variants={itemVariants}>
                    <Card className="p-5 bg-white dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between gap-5 group h-full">
                        <div className="space-y-4">
                            <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary w-fit transition-transform duration-300 group-hover:scale-105">
                                <ThumbsUp className="size-5 stroke-2" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">Total Engagement</p>
                                <h4 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    {isLoading ? <Spinner size="sm" color="current" className="h-9" /> : stats.totalLikes.toLocaleString()}
                                </h4>
                            </div>
                        </div>
                        <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium pt-2 border-t border-zinc-100 dark:border-zinc-800/60 w-full">
                            Likes aggregated across your shared custom meals.
                        </div>
                    </Card>
                </motion.div>

            </div>

            {/* Dynamic Premium Limit Banner Notifications */}
            {!isLoading && (
                <motion.div variants={itemVariants} className="w-full">
                    {isLimitReached ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-danger-200 dark:border-danger-900/50 bg-danger-50/60 dark:bg-danger-950/10 gap-4 shadow-sm backdrop-blur-sm">
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 rounded-xl bg-danger-100 dark:bg-danger-950/50 text-danger shrink-0">
                                    <AlertTriangle className="size-5 shrink-0" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-bold text-danger-800 dark:text-danger-400">
                                        Recipe Storage Limit Reached ({stats.totalRecipes}/2)
                                    </h4>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        Your free account tier is maxed out. You must upgrade to premium to publish additional custom masterpieces.
                                    </p>
                                </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto shrink-0">
                                <Link href="/dashboard/user/billing" className="inline-block w-full">
                                    <Button
                                        as="span"
                                        color="danger"
                                        className="font-bold rounded-xl text-xs h-10 px-5 cursor-pointer w-full shadow-sm bg-danger text-white hover:opacity-90 transition-opacity"
                                    >
                                        Go to Premium
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    ) : (
                        !isPremium && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 gap-4 shadow-sm">
                                <div className="flex items-center gap-3.5">
                                    <span className="size-2 rounded-full bg-primary animate-pulse shrink-0 ml-1" />
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            Storage Status: {stats.totalRecipes}/2 Recipes
                                        </h4>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                            Basic accounts are limited to 2 recipes. Upgrade to unlock unlimited canvas space.
                                        </p>
                                    </div>
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto shrink-0">
                                    <Link href="/dashboard/user/billing" className="inline-block w-full">
                                        <Button
                                            as="span"
                                            color="primary"
                                            className="font-medium rounded-xl text-xs h-9 px-4 cursor-pointer w-full shadow-sm bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                        >
                                            Upgrade Account
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        )
                    )}
                </motion.div>
            )}

            {/* Quick Actions Container Grid Section */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
                <div className="space-y-1">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Quick Actions</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Speed parameters to launch operations and tools across your ecosystem configuration panel.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Create New Recipe */}
                    <Link href={isLimitReached ? "/dashboard/user/billing" : "/dashboard/user/add-recipe"} className="group outline-none block">
                        <Card className="p-4 bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all duration-200 flex flex-col justify-between gap-3 h-32 shadow-sm group-focus-visible:ring-2 group-focus-visible:ring-zinc-400">
                            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 w-fit">
                                {isLimitReached ? <Crown className="size-4 text-amber-500" /> : <Plus className="size-4" />}
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                    {isLimitReached ? "Unlock Unlimited (Pro)" : "Create New Recipe"}
                                </h5>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1">Deploy creation layout module canvas.</p>
                            </div>
                        </Card>
                    </Link>

                    {/* Browse Gallery */}
                    <Link href="/recipes" className="group outline-none block">
                        <Card className="p-4 bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all duration-200 flex flex-col justify-between gap-3 h-32 shadow-sm group-focus-visible:ring-2 group-focus-visible:ring-zinc-400">
                            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 w-fit">
                                <Compass className="size-4" />
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Browse Gallery</h5>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1">Explore platform shared feed arrays.</p>
                            </div>
                        </Card>
                    </Link>

                    {/* View Saved Items */}
                    <Link href="/dashboard/user/favorites" className="group outline-none block">
                        <Card className="p-4 bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all duration-200 flex flex-col justify-between gap-3 h-32 shadow-sm group-focus-visible:ring-2 group-focus-visible:ring-zinc-400">
                            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 w-fit">
                                <Heart className="size-4" />
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Saved Favorites</h5>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1">Manage private bookmarks ledger indexes.</p>
                            </div>
                        </Card>
                    </Link>

                    {/* Account Settings */}
                    <Link href="/dashboard/user/my-profile" className="group outline-none block">
                        <Card className="p-4 bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all duration-200 flex flex-col justify-between gap-3 h-32 shadow-sm group-focus-visible:ring-2 group-focus-visible:ring-zinc-400">
                            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 w-fit">
                                <Settings className="size-4" />
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Account Settings</h5>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1">Tune credentials parameters layout logs.</p>
                            </div>
                        </Card>
                    </Link>

                </div>
            </motion.div>

        </motion.div>
    );
}