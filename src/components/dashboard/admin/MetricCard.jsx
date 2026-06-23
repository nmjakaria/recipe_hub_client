"use client";

import React from 'react';
import { Card } from '@heroui/react';

export default function MetricCard({ card }) {
    const Icon = card.icon;

    // Safe parsing: ensures that if value is undefined or missing, it safely falls back to 0
    const displayValue = card.value !== undefined && card.value !== null
        ? card.value.toLocaleString()
        : "0";

    return (
        <Card className="p-5 bg-white dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="space-y-4">
                {/* 🌟 Top Row: Icon Container */}
                <div className={`p-2.5 rounded-xl ${card.bgAccent} ${card.iconColor} w-fit transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="size-5 stroke-2" />
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
                        {card.title}
                    </p>
                    <h4 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {displayValue}
                    </h4>
                </div>
            </div>

            {/* Elegant visual indicator at the bottom of the card */}
            <div className="h-0.5 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 transition-all duration-300 group-hover:w-16 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600" />
        </Card>
    );
}