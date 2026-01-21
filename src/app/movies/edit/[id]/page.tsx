'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MovieForm } from '@/components/movies/MovieForm';
import { WaveFooter } from '@/components/ui/WaveFooter';
import { movieService } from '@/services/movieService';
import { Movie } from '@/types/movie';
import toast from 'react-hot-toast';

export default function EditMoviePage() {
    const { id } = useParams();
    const router = useRouter();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!id) return;
            try {
                const data = await movieService.getMovie(id as string);
                setMovie(data);
            } catch (error) {
                toast.error('Failed to load movie details');
                router.push('/movies');
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovie();
    }, [id, router]);

    if (isLoading) {
        return (
            <main className="min-h-screen relative flex items-center justify-center">
                <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </main>
        );
    }

    if (!movie) return null;

    return (
        <main className="min-h-screen relative">
            <MovieForm
                mode="edit"
                id={id as string}
                initialData={{
                    title: movie.title,
                    publishingYear: movie.publishingYear,
                    poster: movie.poster
                }}
            />
            <WaveFooter />
        </main>
    );
}
