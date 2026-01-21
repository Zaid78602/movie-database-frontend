'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Pencil, Trash2 } from 'lucide-react';

interface MovieCardProps {
    id: string;
    title: string;
    year: string;
    imageUrl: string;
    onDelete?: (id: string) => void;
}

export const MovieCard = ({ id, title, year, imageUrl, onDelete }: MovieCardProps) => {
    const router = useRouter();

    const posterUrl = imageUrl.startsWith('http')
        ? imageUrl
        : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3002'}${imageUrl}`;

    return (
        <div
            onClick={() => router.push(`/movies/edit/${id}`)}
            className="bg-card rounded-xl p-2 pb-4 cursor-pointer hover:bg-card/80 transition-all group relative"
        >
            <div className="relative aspect-[3/4] w-full mb-4 overflow-hidden rounded-xl">
                <Image
                    src={posterUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                />

                {/* Actions Overlay */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/movies/edit/${id}`);
                        }}
                        className="p-2 bg-background/80 backdrop-blur-sm rounded-full text-white hover:text-primary transition-colors hover:bg-background"
                        title="Edit"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(id);
                        }}
                        className="p-2 bg-background/80 backdrop-blur-sm rounded-full text-white hover:text-red-500 transition-colors hover:bg-background"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <div className="px-2 space-y-2">
                <h3 className="text-white text-lg font-medium truncate">{title}</h3>
                <p className="text-white text-sm opacity-60">{year}</p>
            </div>
        </div>
    );
};
