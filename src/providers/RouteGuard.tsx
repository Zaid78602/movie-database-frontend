'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export function RouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // If not initialized yet, don't do anything
        if (!isInitialized) return;

        const publicPaths = ['/login', '/register', '/'];
        const isPublicPath = publicPaths.includes(pathname);

        // If not authenticated and trying to access a protected route
        if (!isAuthenticated && !isPublicPath) {
            router.push('/login');
        }

        // If authenticated and trying to access login/register
        if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
            router.push('/movies');
        }
    }, [isAuthenticated, isInitialized, pathname, router]);

    // Prevent flashing protected content while initializing
    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
