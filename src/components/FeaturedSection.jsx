/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function FeaturedSection({ recipes }) {
    if (!recipes || recipes.length === 0) return null;

    return (
        <div className='w-full bg-background/80'>
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col mb-8 justify-center">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight flex items-center gap-2 text-zinc-900 dark:text-white">
                            <Star className="text-amber-500 fill-amber-500 size-7 animate-pulse" />
                            Chef's <span className="bg-linear-to-r from-amber-500 via-rose-500 to-violet-600 bg-clip-text text-transparent">Featured Spotlights</span>
                        </h2>
                        {/* 🌈 ANIMATED COLORFUL GAP INTERACTION BAR */}
                        <motion.div
                            className="h-1 bg-linear-to-r from-amber-400 via-rose-500 to-violet-600 rounded-full my-3"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                width: ["96px", "180px", "96px"]
                            }}
                            transition={{
                                backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
                                width: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl">
                            Handcrafted elite structural culinary creations selected by administration panels.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe, index) => {
                        const id = recipe._id || recipe.id;
                        return (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="bg-white dark:bg-zinc-900 border border-default rounded-3xl overflow-hidden shadow-sm transition-shadow hover:shadow-md flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden bg-zinc-100">
                                    <img
                                        src={recipe.recipeImage || '/placeholder.png'}
                                        alt={recipe.recipeName}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <span className="absolute top-3 left-3 bg-zinc-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm tracking-wider uppercase">
                                        {recipe.category}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col grow justify-between space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-base line-clamp-1 text-foreground">{recipe.recipeName}</h3>
                                        <p className="text-xs text-zinc-400 line-clamp-2">{recipe.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-default pt-4">
                                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                                            <Clock size={14} />
                                            <span>{recipe.preparationTime} Mins</span>
                                        </div>

                                        <Link href={`/recipes/${id}`}>
                                            <Button size="sm" color="primary" className="font-bold rounded-xl" endContent={<ArrowRight size={14} />}>
                                                View Recipe
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