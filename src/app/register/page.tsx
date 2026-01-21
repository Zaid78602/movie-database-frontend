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

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        dispatch(setLoading(true));

        try {
            const response = await authService.register({ name, email, password });
            dispatch(setCredentials(response));
            toast.success('Account created successfully!');
            router.push('/movies');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            dispatch(setError(message));
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
            <div className="w-full max-w-[300px] text-center space-y-10 mb-20 z-10">
                <h1 className="text-white text-5xl font-semibold">Sign up</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                    />

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

                    <Input
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        required
                    />

                    <Button type="submit" fullWidth isLoading={isSubmitting}>
                        Create account
                    </Button>

                    <p className="text-white text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>

            <WaveFooter />
        </main>
    );
}
