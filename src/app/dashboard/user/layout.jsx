"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@heroui/react';

export default function UserLayout({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const res = await fetch('/api/auth/get-session');
                const session = await res.json();

                // 🌟 Ensure they are at least logged in as a user or an admin
                if (res.ok && (session?.user?.role === 'user' /* || session?.user?.role === 'admin' */)) {
                    setIsAuthorized(true);
                } else {
                    toast.warning("This route only for user.", {
                        description: "You are not a user/admin of this website. Goto your dashboard.",
                        timeout: 3000,
                    });
                    router.replace('/dashboard/admin');
                }
            } catch (err) {
                router.replace('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkUserAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p className="text-sm font-semibold animate-pulse">Loading Workspace...</p>
            </div>
        );
    }

    return isAuthorized ? <>{children}</> : null;
}