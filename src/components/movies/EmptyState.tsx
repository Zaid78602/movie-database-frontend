'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-10 py-20 px-4 text-center">
            <h2 className="text-white text-3xl md:text-5xl font-semibold max-w-[600px] leading-tight text-balance">
                Your movie list is empty
            </h2>
            <Link href="/movies/create">
                <Button className="px-8">
                    Add a new movie
                </Button>
            </Link>
        </div>
    );
};
