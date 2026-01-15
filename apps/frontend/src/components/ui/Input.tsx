

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Input component.
 * Extends native input attributes with custom props for labels and errors.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Label text displayed above the input */
    label?: string;
    /** Error message to display below the input */
    error?: string;
    /** Additional wrapper class names */
    wrapperClassName?: string;
}

/**
 * Reusable Input component with consistent styling.
 * 
 * Features:
 * - Built-in label support
 * - Error state styling
 * - Focus ring animation
 * - Full TypeScript support via forwardRef
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   required
 *   placeholder="john@example.com"
 *   error={errors.email}
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, wrapperClassName, id, required, ...props }, ref) => {
        // Generate a unique ID if not provided
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
                        // Base styles
                        'flex h-10 w-full rounded-lg border bg-background px-4 py-2',
                        'text-sm text-foreground placeholder:text-muted-foreground',
                        // Focus styles
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                        // Transition
                        'transition-all duration-200',
                        // Disabled state
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        // Error state
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
