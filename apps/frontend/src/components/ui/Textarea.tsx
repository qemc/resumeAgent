

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Textarea component.
 * Extends native textarea attributes with custom props.
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Label text displayed above the textarea */
    label?: string;
    /** Error message to display below the textarea */
    error?: string;
    /** Additional wrapper class names */
    wrapperClassName?: string;
    /** Character count limit to display */
    maxLength?: number;
    /** Show character counter */
    showCount?: boolean;
}

/**
 * Reusable Textarea component with consistent styling.
 * 
 * Features:
 * - Built-in label support
 * - Optional character counter
 * - Error state styling
 * - Auto-resize ready (via CSS)
 * 
 * @example
 * <Textarea
 *   label="Description"
 *   placeholder="Describe your experience..."
 *   rows={4}
 *   showCount
 *   maxLength={5000}
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error,
            wrapperClassName,
            id,
            required,
            maxLength,
            showCount = false,
            value,
            ...props
        },
        ref
    ) => {
        const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
        const currentLength = typeof value === 'string' ? value.length : 0;

        return (
            <div className={cn('space-y-1.5', wrapperClassName)}>
                {label && (
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor={textareaId}
                            className="block text-sm font-medium text-foreground"
                        >
                            {label}
                            {required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        {showCount && maxLength && (
                            <span
                                className={cn(
                                    'text-xs',
                                    currentLength > maxLength * 0.9
                                        ? 'text-destructive'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {currentLength} / {maxLength}
                            </span>
                        )}
                    </div>
                )}
                <textarea
                    id={textareaId}
                    ref={ref}
                    required={required}
                    maxLength={maxLength}
                    value={value}
                    className={cn(
                        // Base styles
                        'flex w-full rounded-lg border bg-background px-4 py-3',
                        'text-sm text-foreground placeholder:text-muted-foreground',
                        // Focus styles
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                        // Transition
                        'transition-all duration-200',
                        // Resize
                        'resize-y min-h-[80px]',
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

Textarea.displayName = 'Textarea';
