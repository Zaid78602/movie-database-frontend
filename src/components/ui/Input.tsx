import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2 text-white">
                {label && <label className="text-sm font-medium">{label}</label>}
                <input
                    className={cn(
                        'flex h-[45px] w-full rounded-card bg-input px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        error ? 'border-2 border-error' : 'border-0',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="text-xs text-error mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
