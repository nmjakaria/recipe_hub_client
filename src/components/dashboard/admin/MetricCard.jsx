// components/admin/MetricCard.jsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@heroui/react';

const cardItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 25 } }
};

export default function MetricCard({ card }) {
    const Icon = card.icon;
    
    return (
        <motion.div variants={cardItemVariants}>
            <Card className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        {card.title}
                    </span>
                    <div className={`p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 ${card.bgAccent} ${card.iconColor}`}>
                        <Icon className="size-4.5 stroke-[1.75]" />
                    </div>
                </div>
                <div>
                    <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                        {card.value.toLocaleString()}
                    </span>
                </div>
            </Card>
        </motion.div>
    );
}