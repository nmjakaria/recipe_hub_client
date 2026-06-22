"use client";

import React from 'react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Award, Flame, Users, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreatorSpotlight() {
    const creators = [
        {
            name: "Chef Marcus Vance",
            role: "Pastry Specialist",
            avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
            recipesCount: 142,
            followers: "12.8k",
            badge: "Master Chef"
        },
        {
            name: "Elena Rostova",
            role: "Healthy & Vegan Creator",
            avatar: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=400&q=80",
            recipesCount: 89,
            followers: "9.4k",
            badge: "Rising Star"
        },
        {
            name: "Tariq Mahmood",
            role: "Spices & Fusion Expert",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
            recipesCount: 210,
            followers: "24.1k",
            badge: "Community Idol"
        }
    ];

    return (
        <section className="relative w-full max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 rounded-full bg-orange-200/20 dark:from-orange-950/10 blur-[120px] -z-10" />

            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-900/40 text-xs font-bold uppercase tracking-wider">
                        <Award className="size-3.5" /> Top Artisans
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                        Meet the <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Masterminds</span>
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
                        Follow elite home cooks and international chefs turning raw culinary craft into easy-to-follow artwork.
                    </p>
                </div>
                <Link href="/chefs">
                    <Button variant="flat" radius="xl" className="font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200">
                        View All Creators
                    </Button>
                </Link>
            </div>

            {/* Creators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {creators.map((creator, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-950/50 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Decorative Card Light Accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-orange-500/5 to-transparent rounded-bl-full pointer-events-none" />

                        <div className="flex items-center gap-4 mb-5">
                            <div className="relative shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={creator.avatar} 
                                    alt={creator.name} 
                                    className="size-16 rounded-2xl object-cover border-2 border-white dark:border-zinc-800 shadow-md group-hover:scale-105 transition-transform duration-300" 
                                />
                                <div className="absolute -bottom-1 -right-1 bg-linear-to-r from-orange-500 to-rose-500 text-white p-1 rounded-lg shadow">
                                    <Flame className="size-3" />
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-extrabold tracking-widest text-orange-500 uppercase">{creator.badge}</span>
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-orange-500 transition-colors">{creator.name}</h3>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500">{creator.role}</p>
                            </div>
                        </div>

                        {/* Metrics Panel */}
                        <div className="grid grid-cols-2 gap-2 py-3 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl text-center mb-5 border border-zinc-100 dark:border-zinc-900">
                            <div>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500">Recipes</p>
                                <p className="text-sm font-black text-zinc-800 dark:text-zinc-200">{creator.recipesCount}</p>
                            </div>
                            <div className="border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-center">
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-1"><Users className="size-3" /> Fans</p>
                                <p className="text-sm font-black text-zinc-800 dark:text-zinc-200">{creator.followers}</p>
                            </div>
                        </div>

                        {/* Call to action element */}
                        <Button 
                            fullWidth 
                            color="primary"
                            variant="bordered"
                            className="font-bold rounded-xl border-zinc-200 dark:border-zinc-800 group-hover:bg-primary group-hover:text-premium group-hover:border-transparent transition-all duration-300"
                            startContent={<Plus className="size-4" />}
                        >
                            Follow Chef
                        </Button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}