'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface MovieFormProps {
    initialData?: {
        title: string;
        year: string;
        imageUrl: string;
    };
    mode?: 'create' | 'edit';
}

export const MovieForm = ({ initialData, mode = 'create' }: MovieFormProps) => {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [year, setYear] = useState(initialData?.year || '');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(initialData?.imageUrl || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submit:', { title, year, image });
        // API integration later
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 pb-20">
            <h1 className="text-white text-4xl md:text-5xl font-semibold mb-16">
                {mode === 'create' ? 'Create a new movie' : 'Edit'}
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Left Column: Image Upload */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square w-full max-w-[473px] border-2 border-dashed border-white rounded-[10px] bg-input flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all group relative overflow-hidden"
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={() => setPreviewUrl('')}
                        />
                    ) : (
                        <div className="flex flex-col items-center space-y-4 text-white text-center px-4">
                            <Upload size={24} className="opacity-80" />
                            <p className="text-sm font-normal">
                                {mode === 'create' ? 'Drop an image here' : 'Drop other image here'}
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {/* Right Column: Form Fields */}
                <div className="flex flex-col space-y-6 max-w-[362px]">
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <div className="w-full md:w-2/3">
                        <Input
                            placeholder="Publishing year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex space-x-4 pt-8">
                        <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            onClick={() => router.push('/movies')}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" fullWidth>
                            {mode === 'create' ? 'Submit' : 'Update'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
