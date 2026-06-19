// app/components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ThemeSwitcher } from "./theme-switcher";
import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    const user = session?.user;

    const handleSignOut = async () => {
        await signOut();
    };

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Browse Recipes", href: "/recipes" },
        // { label: "Favorites", href: "/favorites" },
    ];

    const dashboardLink = {
        user: "/dashboard/user",
        admin: "/dashboard/admin",
    };

    if (user?.email) {
        navLinks.push({
            label: "Dashboard",
            href: dashboardLink[user?.role] || "/dashboard/user",
        });
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-default-100 bg-background/80 backdrop-blur-xl">
            {/* Changed to grid layout on desktop (md:grid-cols-3) to create three equal columns.
        This guarantees the middle menu stays mathematically dead-center.
      */}
            <div className="mx-auto flex md:grid md:grid-cols-3 h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LOGO AREA (Left Column) */}
                <div className="flex items-center justify-start">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg group-hover:scale-105 transition-transform duration-200">
                            <span className="text-xl font-bold text-white">R</span>
                        </div>
                        <div className="hidden leading-none sm:block">
                            <h1 className="text-lg font-bold text-foreground font-display tracking-tight">
                                Recipe Hub
                            </h1>
                        </div>
                    </Link>
                </div>

                {/* DESKTOP NAVIGATION MENU (Middle Column) */}
                <div className="hidden md:flex items-center justify-center">
                    <ul className="flex items-center gap-1 rounded-full border border-default-200 bg-default-50/50 px-2 py-1.5">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONTROLS AREA (Right Column) */}
                <div className="flex items-center justify-end gap-4">
                    {/* Desktop Controls */}
                    <div className="hidden items-center gap-4 md:flex">
                        {/* Theme Dropdown */}
                        <ThemeSwitcher />

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-default-200" />

                        {/* Authentication Links */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                <>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Hi, <span className="text-foreground font-semibold">{user.name}</span>!
                                    </span>
                                    <Button
                                        onClick={handleSignOut}
                                        variant="flat"
                                        color="danger"
                                        size="sm"
                                        className="rounded-full font-medium"
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        variant="light"
                                        size="sm"
                                        className="btn font-medium text-default-600 hover:text-foreground"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        size="sm"
                                        className="p-2.5 bg-accent text-accent-foreground font-medium shadow-sm rounded-full"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* MOBILE TOGGLE & SWITCHER BAR */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeSwitcher />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center justify-center rounded-xl p-2 text-foreground transition hover:bg-default-100"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE DRAWER MENU */}
            {isMenuOpen && (
                <div className="border-t border-default-100 bg-background/95 backdrop-blur-md md:hidden animate-in fade-in-50 slide-in-from-top-5 duration-200">
                    <div className="space-y-4 px-4 py-6">
                        <ul className="space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition hover:bg-default-100 hover:text-foreground"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-default-100 pt-4 space-y-3 flex flex-col">
                            {user ? (
                                <div className="flex flex-col gap-3 px-4">
                                    <span className="text-sm text-muted-foreground">Signed in as {user.name}</span>
                                    <Button
                                        onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                                        color="danger"
                                        variant="flat"
                                        className="w-full rounded-xl font-medium"
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 px-2">
                                    <Link
                                        href="/auth/signin"
                                        variant="light"
                                        className="w-full justify-start text-base font-medium text-default-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        color="primary"
                                        className="w-full font-semibold shadow-md rounded-xl text-center p-2.5 bg-accent text-accent-foreground"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}