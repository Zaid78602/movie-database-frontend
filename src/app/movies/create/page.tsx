'use client';

import React from 'react';
import { MovieForm } from '@/components/movies/MovieForm';
import { WaveFooter } from '@/components/ui/WaveFooter';

export default function CreateMoviePage() {
    return (
        <main className="min-h-screen relative">
            <MovieForm mode="create" />
            <WaveFooter />
        </main>
    );
}
