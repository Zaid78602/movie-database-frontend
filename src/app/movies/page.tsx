'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogOut } from 'lucide-react';
import { MovieCard } from '@/components/movies/MovieCard';
import { WaveFooter } from '@/components/ui/WaveFooter';
import { EmptyState } from '@/components/movies/EmptyState';

export default function MoviesPage() {
    const router = useRouter();

    // Mock data for UI-only phase (8 movies to show the grid)
    const [movies, setMovies] = useState(
        Array(8).fill(null).map((_, i) => ({
            id: String(i + 1),
            title: 'Movie ' + (i + 1),
            year: '2021',
            imageUrl: `https://picsum.photos/seed/${i + 10}/600/800`
        }))
    );

    const handleDelete = (id: string) => {
        setMovies(prev => prev.filter(movie => movie.id !== id));
    };

    return (
        <main className="min-h-screen relative flex flex-col pb-20">
            <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* Header Substantially Reduced Spacing */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-white text-3xl md:text-5xl font-semibold">My movies</h1>
                        <Link href="/movies/create" className="text-white hover:text-primary transition-colors">
                            <PlusCircle size={32} />
                        </Link>
                    </div>
                    <button
                        onClick={() => router.push('/login')}
                        className="flex items-center space-x-3 text-white font-semibold hover:opacity-80 transition-opacity"
                    >
                        <span className="hidden md:inline">Logout</span>
                        <LogOut size={24} />
                    </button>
                </div>

                {/* Grid with optimized gaps */}
                {movies.length === 0 ? (
                    <div className="flex-1 flex justify-center items-center py-10">
                        <EmptyState />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} {...movie} onDelete={handleDelete} />
                            ))}
                        </div>

                        {/* Pagination Reduced Spacing */}
                        <div className="flex items-center justify-center space-x-4 mt-12 md:mt-16">
                            <button className="text-white font-bold hover:text-primary transition-colors">Prev</button>
                            <div className="flex items-center space-x-2">
                                <button className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold">1</button>
                                <button className="w-8 h-8 rounded bg-card text-white flex items-center justify-center font-bold hover:bg-card/70">2</button>
                            </div>
                            <button className="text-white font-bold hover:text-primary transition-colors">Next</button>
                        </div>
                    </>
                )}
            </div>

            <WaveFooter />
        </main>
    );
}
