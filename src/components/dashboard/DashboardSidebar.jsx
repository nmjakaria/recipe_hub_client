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
        <div className="flex flex-col w-full">
            {/* Dynamic User Profile Header */}
            <div className="flex items-center gap-3 border-b border-default pb-4 mb-4">
                {user?.image ? (
                    <img 
                        src={user.image} 
                        alt={user?.name || "User Avatar"} 
                        className="size-10 rounded-full object-cover border border-default bg-zinc-100 dark:bg-zinc-800 shrink-0" 
                    />
                ) : (
                    <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-default flex items-center justify-center font-bold text-xs uppercase text-zinc-700 dark:text-zinc-300 shrink-0">
                        {user?.name ? user.name.slice(0, 2) : "CH"}
                    </div>
                )}
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold truncate text-zinc-950 dark:text-zinc-50">
                        {user?.name || "Chef Workspace"}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize truncate">
                        {user?.role || "User"} Account
                    </span>
                </div>
            </div>

            {/* Navigation Lists */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                    // Check if current browser URL matches the item link route perfectly
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                                isActive 
                                    ? "bg-accent text-accent-foreground font-medium shadow-sm" 
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                            }`}
                            href={item.href}
                        >
                            <item.icon className={`size-5 transition-colors ${
                                isActive 
                                    ? "text-white dark:text-zinc-950" 
                                    : "text-zinc-400 dark:text-zinc-500"
                            }`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* Desktop View Sidebar - Sticky Container */}
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block sticky top-0 h-screen bg-white dark:bg-zinc-950">
                {navContent}
            </aside>

            {/* Mobile Sidebar Frame & Action Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Drawer>
                    <Button variant="secondary" isIconOnly className="rounded-xl border border-default shadow-sm bg-white dark:bg-zinc-900">
                        <LayoutSideContentLeft className="size-5" />
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="w-72 max-w-[85vw]">
                            <Drawer.Dialog className="bg-white dark:bg-zinc-900 p-4 h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <Drawer.Heading className="text-base font-bold">Navigation</Drawer.Heading>
                                    <Drawer.CloseTrigger />
                                </div>
                                <Drawer.Body className="p-0 overflow-y-auto">
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