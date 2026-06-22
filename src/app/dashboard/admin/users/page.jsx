// app/dashboard/admin/user/page.jsx
import React from 'react';
import { requireRole } from "@/lib/core/session";
import { getUserForAdmin } from '@/lib/api/admin';
import UserManagementClient from '@/components/dashboard/admin/UserManagementClient';

const AdminUserManagementPage = async () => {
    // 1. Guard route context
    await requireRole("admin");

    // 2. Fetch the initial data array
    const initialUsers = await getUserForAdmin().catch(() => []);

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    User Account Registers
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Manage system clearance profiles, toggle platform entry bands, and review billing plans.
                </p>
            </div>

            {/* Client Shell handling state tables & modal workflows */}
            <UserManagementClient initialUsers={initialUsers} />
        </div>
    );
};

export default AdminUserManagementPage;