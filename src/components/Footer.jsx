"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, UtensilsCrossed } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Social links block array
    const socialLinks = [
        { icon: <FaFacebook className="size-5" />, href: "https://facebook.com", label: "Facebook" },
        { icon: <BsInstagram className="size-5" />, href: "https://instagram.com", label: "Instagram" },
        { icon: <BsTwitter className="size-5" />, href: "https://twitter.com", label: "Twitter" },
        { icon: <BsYoutube className="size-5" />, href: "https://youtube.com", label: "YouTube" },
    ];

    // Navigation links categorized arrays
    const quickLinks = [
        { name: "Explore Dishes", href: "/recipes" },
        { name: "Share a Recipe", href: "/dashboard/user/add-recipe" },
        { name: "Top Culinary Chefs", href: "/chefs" },
        { name: "Trending Articles", href: "/blog" },
    ];

    const legalLinks = [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Preferences", href: "/cookies" },
        { name: "Help & Support", href: "/support" },
    ];

    return (
        <footer className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-zinc-900/60 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                
                {/* ── TOP SECTION: BRAND, NAV, AND NEWSLETTER ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-12">
                    
                    {/* Column 1: Identity & Description (4 Cols) */}
                    <div className="lg:col-span-4 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl shadow-md shadow-orange-500/10 text-white group-hover:rotate-6 transition-transform duration-300">
                                <UtensilsCrossed className="size-5" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                                Recipe<span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Hub</span>
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                            Join our global community of home cooks and professional chefs. Share your culinary art and find your next favorite meal plan safely.
                        </p>
                        
                        {/* Interactive Social Media Badges */}
                        <div className="flex items-center gap-2 pt-2">
                            {socialLinks.map((social, index) => (
                                <motion.div key={index} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        as="a"
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        isIconOnly
                                        variant="light"
                                        className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-rose-400 rounded-xl hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 shadow-sm transition-all duration-200"
                                    >
                                        {social.icon}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links (2 Cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Platform</h2>
                        <ul className="space-y-2.5 text-sm">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-orange-500 dark:hover:text-rose-400 transition-colors duration-200 block py-0.5">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Help (2 Cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Company</h2>
                        <ul className="space-y-2.5 text-sm">
                            {legalLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-orange-500 dark:hover:text-rose-400 transition-colors duration-200 block py-0.5">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Newsletter Input (4 Cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Contact & Updates</h2>
                        
                        {/* Semantic Address Blocks */}
                        <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-orange-500/80 shrink-0" />
                                <a href="mailto:support@recipehub.com" className="hover:underline">support@recipehub.com</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-4 text-orange-500/80 shrink-0" />
                                <span>+1 (555) 234-5678</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="size-4 text-orange-500/80 shrink-0" />
                                <span>101 Culinary Ave, San Francisco, CA</span>
                            </div>
                        </div>

                        {/* Newsletter Input Form */}
                        <div className="pt-2">
                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
                                {/* ✅ FIXED: Swapped out HeroUI Input to prevent DOM prop leakage */}
                                <input 
                                    type="email"
                                    placeholder="Newsletter Email..."
                                    className="w-full h-8 px-3 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-orange-500 dark:focus:border-rose-500 transition-colors duration-200"
                                />
                                <Button 
                                    isIconOnly 
                                    color="primary" 
                                    size="sm"
                                    type="submit" 
                                    className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl shadow-md text-white px-4 shrink-0"
                                >
                                    <Send className="size-3.5" />
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Native HTML Divider line */}
                <hr className="my-6 border-t border-zinc-200/80 dark:border-zinc-900" />

                {/* ── BOTTOM BAR: LEGAL & COPYRIGHT ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                    <p>&copy; {currentYear} Recipe Hub Inc. All rights preserved globally.</p>
                    <div className="flex items-center gap-4">
                        <span>System Status: <span className="text-emerald-500 font-semibold">Operational</span></span>
                    </div>
                </div>

            </div>
        </footer>
    );
}