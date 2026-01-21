'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogOut } from 'lucide-react';
import { MovieCard } from '@/components/movies/MovieCard';
import { WaveFooter } from '@/components/ui/WaveFooter';
import { EmptyState } from '@/components/movies/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/features/authSlice';
import { fetchMovies, deleteMovie, setPage } from '@/store/features/movieSlice';
import toast from 'react-hot-toast';

export default function MoviesPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { movies, total, page, limit, totalPages, isLoading } = useAppSelector((state) => state.movie);
    const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            dispatch(fetchMovies({ page, limit }));
        }
    }, [dispatch, page, limit, isInitialized, isAuthenticated]);

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteMovie(id)).unwrap();
            toast.success('Movie deleted successfully');
        } catch (error) {
            toast.error('Failed to delete movie');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        router.push('/login');
    };

    if (isLoading && (!movies || movies.length === 0)) {
        return (
            <main className="min-h-screen relative flex flex-col items-center justify-center bg-background">
                <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen relative flex flex-col pb-20">
            <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-white text-3xl md:text-5xl font-semibold">My movies</h1>
                        <Link href="/movies/create" className="text-white hover:text-primary transition-colors">
                            <PlusCircle size={32} />
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-white font-semibold hover:opacity-80 transition-opacity"
                    >
                        <span className="hidden md:inline">Logout</span>
                        <LogOut size={24} />
                    </button>
                </div>

                {/* Grid */}
                {!isLoading && movies.length === 0 ? (
                    <div className="flex-1 flex justify-center items-center py-10">
                        <EmptyState />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie._id}
                                    id={movie._id}
                                    title={movie.title}
                                    year={String(movie.publishingYear)}
                                    imageUrl={movie.poster}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center space-x-4 mt-12 md:mt-16">
                                <button
                                    onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
                                    disabled={page === 1}
                                    className="text-white font-bold hover:text-primary transition-colors disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <div className="flex items-center space-x-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => dispatch(setPage(p))}
                                            className={`w-8 h-8 rounded flex items-center justify-center font-bold transition-colors ${p === page ? 'bg-primary text-white' : 'bg-card text-white hover:bg-card/70'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => dispatch(setPage(Math.min(totalPages, page + 1)))}
                                    disabled={page === totalPages}
                                    className="text-white font-bold hover:text-primary transition-colors disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <WaveFooter />
        </main>
    );
}
