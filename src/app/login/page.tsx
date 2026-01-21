'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { WaveFooter } from '@/components/ui/WaveFooter';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { authService } from '@/services/authService';
import { setCredentials, setLoading, setError } from '@/store/features/authSlice';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(setLoading(true));

        try {
            const response = await authService.login({ email, password });
            dispatch(setCredentials(response));
            toast.success('Logged in successfully!');
            router.push('/movies');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            dispatch(setError(message));
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
            <div className="w-full max-w-[300px] text-center space-y-10 mb-20">
                <h1 className="text-white text-5xl font-semibold">Sign in</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />

                    <Input
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />

                    <div className="flex items-center justify-center space-x-2">
                        <div
                            className="relative flex items-center justify-center cursor-pointer"
                            onClick={() => setRememberMe(!rememberMe)}
                        >
                            <input
                                type="checkbox"
                                className="peer h-5 w-5 opacity-0 absolute"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <div className="h-[18px] w-[18px] rounded-[5px] bg-input border-0 peer-checked:bg-primary transition-colors"></div>
                            {rememberMe && (
                                <svg className="absolute w-3 h-3 text-background pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span className="text-white text-sm">Remember me</span>
                    </div>

                    <Button type="submit" fullWidth isLoading={isSubmitting}>
                        Login
                    </Button>

                    <p className="text-white text-sm">
                        Don’t have an account?{' '}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>

            <WaveFooter />
        </main>
    );
}
