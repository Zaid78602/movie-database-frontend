'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MovieForm } from '@/components/movies/MovieForm';
import { WaveFooter } from '@/components/ui/WaveFooter';

export default function EditMoviePage() {
    const { id } = useParams();

    // Mock data for UI-only phase
    const mockMovie = {
        title: 'Movie ' + id,
        year: '2021',
        imageUrl: ''
    };

    return (
        <main className="min-h-screen relative">
            <MovieForm mode="edit" initialData={mockMovie} />
            <WaveFooter />
        </main>
    );
}
