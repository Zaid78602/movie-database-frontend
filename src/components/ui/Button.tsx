import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    children,
    className,
    variant = 'primary',
    fullWidth = false,
    isLoading = false,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-primary hover:bg-primary/90 text-background font-bold',
        outline: 'border border-foreground hover:bg-foreground/10 text-foreground font-bold',
    };

    return (
        <button
            className={cn(
                'h-[54px] px-6 rounded-button transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                fullWidth && 'w-full',
                className
            )}
            disabled={props.disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};
