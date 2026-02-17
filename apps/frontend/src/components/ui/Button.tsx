

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Show loading spinner and disable button */
    isLoading?: boolean;
    /** Icon to display before the button text */
    leftIcon?: React.ReactNode;
    /** Icon to display after the button text */
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
    ghost:
        'hover:bg-accent hover:text-accent-foreground',
    outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 py-2 text-sm rounded-lg',
    lg: 'h-12 px-6 py-3 text-base rounded-lg',
};

const LoadingSpinner = () => (
    <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center gap-2 font-medium',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    'transition-all duration-200',
                    'disabled:pointer-events-none disabled:opacity-50',
                    'active:scale-[0.98]',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    leftIcon && <span className="shrink-0">{leftIcon}</span>
                )}
                {children}
                {rightIcon && !isLoading && (
                    <span className="shrink-0">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
