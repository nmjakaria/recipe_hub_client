/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Heart, Flame, Eye } from 'lucide-react';

export default function PopularSection({ recipes }) {
    if (!recipes || recipes.length === 0) return null;

    return (
        <div className='w-full bg-accent-soft/20'>
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col mb-8 justify-center">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight flex items-center gap-2 text-zinc-900 dark:text-white">
                            <Flame className="text-orange-500 fill-orange-500 size-7" />
                            Trending & <span className="bg-linear-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">Most Popular</span>
                        </h2>
                        {/* 🌈 ANIMATED COLORFUL GAP INTERACTION BAR */}
                        <motion.div
                            className="h-1 bg-linear-to-r from-orange-400 via-amber-500 to-cyan-500 rounded-full my-3"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                width: ["70px", "150px", "70px"]
                            }}
                            transition={{
                                backgroundPosition: { duration: 3.5, repeat: Infinity, ease: "linear" },
                                width: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl">
                            The community has spoken. These entries carry the highest operational like metrics across the ecosystem.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recipes.map((recipe, index) => {
                        const id = recipe._id || recipe.id;
                        return (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white dark:bg-zinc-900 border border-default rounded-3xl overflow-hidden p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm"
                            >
                                <div className="w-full sm:w-40 h-32 relative shrink-0 rounded-2xl overflow-hidden border border-default bg-zinc-100">
                                    <img
                                        src={recipe.recipeImage || '/placeholder.png'}
                                        alt={recipe.recipeName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
                                        <Heart size={12} className="fill-current" />
                                        <span>{recipe.likesCount || 0}</span>
                                    </div>
                                </div>
                                <div className="grow w-full space-y-3 flex flex-col justify-between h-full py-1">
                                    <div>
                                        <span className="text-[10px] text-primary font-bold tracking-widest uppercase">{recipe.cuisineType} Cuisine</span>
                                        <h3 className="font-extrabold text-base text-foreground line-clamp-1 mt-0.5">{recipe.recipeName}</h3>
                                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">Crafted beautifully by {recipe.authorName || "Anonymous Chef"}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-default">
                                        <span className="text-xs font-semibold capitalize text-zinc-500 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                            Difficulty: {recipe.difficultyLevel || 'Easy'}
                                        </span>
                                        <Link href={`/recipes/${id}`}>
                                            <Button size="sm" className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold rounded-xl" startContent={<Eye size={14} />}>
                                                Explore
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}