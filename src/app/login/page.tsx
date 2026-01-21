'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { WaveFooter } from '@/components/ui/WaveFooter';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password, rememberMe });
        // API integration will be done later
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

                    <Button type="submit" fullWidth>
                        Login
                    </Button>
                </form>
            </div>

            <WaveFooter />
        </main>
    );
}
