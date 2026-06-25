"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Clock, Sparkles, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function CookingPaths() {
    const paths = [
        {
            title: "15-Minute Rush",
            desc: "Fast, high-flavor assets for busy schedules.",
            icon: <Clock className="size-6 text-amber-500" />,
            bgGrad: "from-amber-500/10 via-transparent to-transparent",
            borderHover: "hover:border-amber-400/50",
            count: "40+ Guides",
            slug: "quick-meals"
        },
        {
            title: "Midnight Cravings",
            desc: "Guilty-pleasure comfort snacks engineered for late hours.",
            icon: <Zap className="size-6 text-indigo-500" />,
            bgGrad: "from-indigo-500/10 via-transparent to-transparent",
            borderHover: "hover:border-indigo-400/50",
            count: "18+ Recipes",
            slug: "late-night"
        },
        {
            title: "Mindful Clean Eating",
            desc: "Macro-tracked, wholesome entries without flavor compromises.",
            icon: <Heart className="size-6 text-emerald-500" />,
            bgGrad: "from-emerald-500/10 via-transparent to-transparent",
            borderHover: "hover:border-emerald-400/50",
            count: "55+ Menus",
            slug: "healthy"
        },
        {
            title: "Masterclass Baking",
            desc: "Scientific dessert protocols scaled for home ovens.",
            icon: <Sparkles className="size-6 text-rose-500" />,
            bgGrad: "from-rose-500/10 via-transparent to-transparent",
            borderHover: "hover:border-rose-400/50",
            count: "32+ Courses",
            slug: "baking"
        }
    ];

    return (
        <div className='w-full bg-linear-to-b from-rose-50/60 via-zinc-50 to-rose-100/40 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/80 transition-colors duration-500'>
            <section className="relative w-full max-w-7xl mx-auto my-25 px-4 sm:px-6 lg:px-8">

                {/* Header Block */}
                <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
                    <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-900/40 text-xs font-bold uppercase tracking-wider">
                        <Compass className="size-3.5 animate-spin animation-duration-[10s]" /> Smart Curation
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                        Choose Your <span className="bg-linear-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Flavor Path</span>
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                        Skip standard lists. Select a tailored atmospheric node calibrated around your mood, lifestyle, or immediate time constraints.
                    </p>
                </div>

                {/* Path Grid Structure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paths.map((path, idx) => (
                        <Link href={`/collections/${path.slug}`} key={idx} className="block group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className={`h-full bg-linear-to-br ${path.bgGrad} bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm transition-all duration-300 ${path.borderHover} hover:shadow-md flex flex-col justify-between`}
                            >
                                <div className="space-y-4">
                                    {/* Icon container drop frame */}
                                    <div className="p-3 bg-white dark:bg-zinc-950 rounded-2xl w-fit border border-zinc-100 dark:border-zinc-900 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        {path.icon}
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-lg tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                                            {path.title}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                            {path.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Mini counter foot indicator */}
                                <div className="pt-6 mt-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                    <span>{path.count}</span>
                                    <span className="opacity-25 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-zinc-600 dark:text-zinc-300">
                                        Explore &rarr;
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}