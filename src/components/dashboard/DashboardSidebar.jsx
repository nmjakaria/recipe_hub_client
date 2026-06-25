/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { 
    House, 
    PlusCircle, 
    ChefHat, 
    ShoppingBag, 
    Heart, 
    User, 
    Users, 
    Utensils, 
    Flag, 
    CreditCard 
} from "lucide-react";
import Link from "next/link";

export function DashboardSidebar({ user }) {
    const pathname = usePathname();
    
    // User Navigation Links
    const userNavLinks = [
        { icon: House, href: "/dashboard/user", label: "Dashboard" },
        { icon: PlusCircle, href: "/dashboard/user/add-recipe", label: "Add Recipe" },
        { icon: ChefHat, href: "/dashboard/user/my-recipes", label: "My Recipes" },
        { icon: ShoppingBag, href: "/dashboard/user/recipe-book", label: "My Purchased Recipes" },
        { icon: Heart, href: "/dashboard/user/favorites", label: "Favorites" },
        { icon: User, href: "/dashboard/user/my-profile", label: "My Profile" },
    ];

    // Admin Navigation Links
    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: Utensils, href: "/dashboard/admin/recipes", label: "Manage Recipes" },
        { icon: Flag, href: "/dashboard/admin/recipe-reports", label: "Recipe Reports" },
        { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
        { icon: User, href: "/dashboard/admin/my-profile", label: "Profile" },
    ];

    const navLinksMap = {
        user: userNavLinks,
        admin: adminNavLinks
    };

    const navItems = navLinksMap[user?.role || 'user'];

    const navContent = (
        <div className="flex flex-col w-full h-full justify-between">
            <div className="flex flex-col w-full">
                {/* Dynamic User Profile Header */}
                <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
                    {user?.image ? (
                        <img 
                            src={user.image} 
                            alt={user?.name || "User Avatar"} 
                            className="size-10 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-800 shadow-sm shrink-0" 
                        />
                    ) : (
                        <div className="size-10 rounded-full bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center font-bold text-xs uppercase text-zinc-700 dark:text-zinc-300 shrink-0 shadow-sm">
                            {user?.name ? user.name.slice(0, 2) : "CH"}
                        </div>
                    )}
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold truncate text-zinc-900 dark:text-zinc-50 tracking-tight">
                            {user?.name || "Chef Workspace"}
                        </span>
                        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 capitalize truncate flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            {user?.role || "User"} Account
                        </span>
                    </div>
                </div>

                {/* Navigation Lists */}
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 relative group ${
                                    isActive 
                                        ? "bg-orange-500 dark:bg-orange-600 text-white shadow-md shadow-orange-500/10 dark:shadow-none" 
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                                }`}
                                href={item.href}
                            >
                                <item.icon className={`size-4.5 transition-transform duration-200 shrink-0 ${
                                    isActive 
                                        ? "text-white scale-105" 
                                        : "text-zinc-400 dark:text-zinc-500 group-hover:scale-105 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                                }`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            
            {/* Subtle branding footer anchor inside your self-contained scroll */}
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6 text-[11px] font-semibold tracking-wider text-zinc-300 dark:text-zinc-700 uppercase select-none">
                Recipe Hub v1.0
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop View Sidebar - Fixed Sticky Frame with Independent Scroll */}
            <aside className="hidden w-64 shrink-0 border-r border-zinc-200/80 dark:border-zinc-800 p-5 lg:flex flex-col sticky top-0 h-screen bg-white dark:bg-zinc-950 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {navContent}
            </aside>

            {/* Mobile Sidebar Frame & Action Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Drawer>
                    <Button variant="secondary" isIconOnly className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900 backdrop-blur-md">
                        <LayoutSideContentLeft className="size-5 text-zinc-600 dark:text-zinc-300" />
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="w-72 max-w-[85vw]">
                            <Drawer.Dialog className="bg-white dark:bg-zinc-950 p-5 h-full border-r border-default">
                                <div className="flex items-center justify-between mb-5">
                                    <Drawer.Heading className="text-sm font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Navigation</Drawer.Heading>
                                    <Drawer.CloseTrigger />
                                </div>
                                <Drawer.Body className="p-0 overflow-y-auto h-[calc(100vh-80px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}