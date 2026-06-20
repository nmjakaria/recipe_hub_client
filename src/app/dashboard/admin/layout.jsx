"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@heroui/react';

export default function AdminLayout({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdminAuth = async () => {
            try {
                // Call your existing session route
                const res = await fetch('/api/auth/get-session');
                const session = await res.json();

                // 🌟 Check if they are logged in AND if they are an admin
                if (res.ok && session?.user?.role === 'admin') {
                    setIsAuthorized(true);
                } else {
                    // Kick them out if they are a regular user or guest
                    toast.warning("This route only for admin.",{
                        description: "You are not a admin of this website. Goto your dashboard.",
                        timeout: 3000,
                    });
                    router.replace('/dashboard/user'); // or '/login'
                }
            } catch (err) {
                router.replace('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAdminAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p className="text-sm font-semibold animate-pulse">Verifying Admin Credentials...</p>
            </div>
        );
    }

    // Only render the admin pages if authorized matches true
    return isAuthorized ? <>{children}</> : null;
}