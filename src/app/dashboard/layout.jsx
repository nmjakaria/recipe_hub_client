import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { getUserSession } from "@/lib/core/session";
import React from 'react';

const DashboardLayout = async ({ children }) => {
    // Fetch session on the server side here
    const user = await getUserSession();

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Pass user down to the sidebar component */}
            <DashboardSidebar user={user} />
            
            <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
                <main className="p-6 md:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;