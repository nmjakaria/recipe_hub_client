"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@heroui/react';
import { Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// Import motion directly from your animation stack
import { motion } from 'framer-motion';

export default function HeroBanner() {
    // Initialize Embla Carousel with Autoplay
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 3500, stopOnInteraction: false })
    ]);

    const sliderImages = [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1654863404432-cac67587e25d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1707013533606-62919aa3aa29?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1508615263227-c5d58c1e5821?auto=format&fit=crop&w=1200&q=80"
    ];

    // Framer Motion Orchestration Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Automatically staggers the entry of children text blocks
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="w-full bg-accent-soft-hover/20">
            <div className="relative bg-accent-soft/30 max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-[2.5rem]">
            
                {/* ── BACKGROUND CANVAS LAYER ── */}
                <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 -z-20" />
                <div className="absolute -top-40 -left-20 w-112.5 h-112.5 rounded-full bg-linear-to-br from-amber-200/50 to-orange-200/30 blur-[100px] dark:from-amber-900/10 -z-10" />
                <div className="absolute -bottom-20 right-10 w-125 h-125 rounded-full bg-linear-to-tr from-rose-200/40 to-primary-200/20 blur-[120px] dark:from-rose-950/10 -z-10" />
                {/* ── MAIN LAYOUT CONTENT ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-16 px-6 sm:px-10">
            
                    {/* ── LEFT SIDE: MOTION ANIMATED TEXT BLOCK ── */}
                    <motion.div
                        className="lg:col-span-5 space-y-6 text-left relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Animated Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                            <Sparkles className="size-4 text-amber-500 animate-spin animation-duration-[6s]" />
                            <span className="text-xs font-bold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase">The Foodie Community</span>
                        </motion.div>
                        {/* Bold Colorful Typography */}
                        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
                            Your Ultimate <br />
                            <span className="bg-linear-to-r from-orange-500 via-rose-500 to-warning bg-clip-text text-transparent drop-shadow-sm">
                                Recipe Hub
                            </span>
                        </motion.h1>
                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                            Discover, cook, and share delicious creations with an international group of chefs and home cooks. Transform your everyday ingredients into extraordinary dining memories.
                        </motion.p>
                        {/* Action Call-to-Actions */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-3">
                            <Link href="/recipes">
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="font-extrabold rounded-2xl shadow-xl shadow-primary-500/20 bg-linear-to-r from-primary to-primary-600 px-8 group"
                                    endContent={<UtensilsCrossed className="size-4 group-hover:rotate-12 transition-transform" />}
                                >
                                    Explore Dishes
                                </Button>
                            </Link>
            
                            <Link href="/dashboard/user/add-recipe">
                                <Button
                                    variant="light"
                                    size="lg"
                                    className="font-bold rounded-2xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 shadow-sm text-zinc-800 dark:text-zinc-200 group"
                                    endContent={<ArrowRight className="size-4 opacity-70 group-hover:translate-x-1 transition-transform" />}
                                >
                                    Share a Recipe
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                    {/* ── RIGHT SIDE: FLOATING SLIDER ── */}
                    <div className="lg:col-span-7 w-full relative">
                        {/* Decorative backframe accent */}
                        <div className="absolute -inset-2 bg-linear-to-tr from-amber-500 to-rose-500 rounded-[2.5rem] opacity-10 blur-xl" />
            
                        {/* Main Image Slider Wrapper */}
                        <div className="relative border-8 border-white dark:border-zinc-900 bg-white dark:bg-zinc-900 w-full h-80 sm:h-105 lg:h-125 rounded-[2.2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
            
                            {/* Embla Slider */}
                            <div className="w-full h-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
                                <div className="flex h-full w-full">
                                    {sliderImages.map((src, index) => (
                                        <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden">
                                            {/* Dynamic darkening tint overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10 z-10" />
            
                                            {/* Image Asset Rendering with Ken Burns pan animation */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={src}
                                                alt={`Culinary creation exhibition slide showcases #${index + 1}`}
                                                className="w-full h-full object-cover select-none pointer-events-none"
                                                style={{ animation: 'scaleUp 4.5s infinite alternate linear' }}
                                                loading={index === 0 ? "eager" : "lazy"}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Floating live indicator component badge */}
                            <div className="absolute bottom-6 right-6 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-800 shadow-lg hidden sm:flex items-center gap-2">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Live Showcases</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}