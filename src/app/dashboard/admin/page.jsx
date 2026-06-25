import React from 'react';
import { requireRole } from "@/lib/core/session";
import { getRecipes } from '@/lib/api/recipe';
import { getReportsForAdmin, getUserForAdmin } from '@/lib/api/admin';
import AdminDashboardClient from '@/components/dashboard/admin/AdminDashboardClient';

export const metadata = {
  title: "Admin Dashboard | Recipe Hub",
  description: "Manage recipes, users, categories, and track website analytics efficiently from the Recipe Hub admin control panel.",
};

const AdminDashboardPage = async () => {
    // 1. Guard route access using server-side session rules
    await requireRole("admin");

    // 2. Fetch dataset lengths with error protection fallbacks
    const users = await getUserForAdmin().catch(() => []);
    const reports = await getReportsForAdmin().catch(() => []);
    const recipeData = await getRecipes({ limit: 1000 }).catch(() => ({ recipes: [] }));
    const recipes = recipeData?.recipes || [];

    // 3. Compile lean numerical metrics payload
    const stats = {
        totalUsers: users.length,
        premiumUsers: users.filter(user => user.isPremium || user.plan !== 'user_free' && user.plan !== 'admin').length,
        totalRecipes: recipes.length,
        featuredRecipes: recipes.filter(recipe => recipe.isFeatured === true).length,
        // 🌟 CHANGED: Explicitly filter down to strictly 'pending' reports
        pendingReports: reports.filter(report => report.status === 'pending').length
    };

    return <AdminDashboardClient stats={stats} />;
};

export default AdminDashboardPage;