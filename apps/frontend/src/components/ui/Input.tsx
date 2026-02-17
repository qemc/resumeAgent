

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Label text displayed above the input */
    label?: string;
    /** Error message to display below the input */
    error?: string;
    /** Additional wrapper class names */
    wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, wrapperClassName, id, required, ...props }, ref) => {
        const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <div className={cn('space-y-1.5', wrapperClassName)}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-foreground"
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    required={required}
                    className={cn(
                        'flex h-10 w-full rounded-lg border bg-background px-4 py-2',
                        'text-sm text-foreground placeholder:text-muted-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                        'transition-all duration-200',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error
                            ? 'border-destructive focus:ring-destructive'
                            : 'border-input hover:border-muted-foreground/50',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
