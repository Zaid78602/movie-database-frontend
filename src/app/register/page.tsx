'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { WaveFooter } from '@/components/ui/WaveFooter';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register attempt:', { name, email, password });
        // API integration will be done later
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

                    <Button type="submit" fullWidth>
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
