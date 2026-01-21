'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store/store';
import { initializeAuth, logout } from '../store/features/authSlice';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>(null);

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.dispatch(initializeAuth());
        }

        // Listen for storage changes (manual deletion or logout in another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token' && !e.newValue && storeRef.current) {
                storeRef.current.dispatch(logout());
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
