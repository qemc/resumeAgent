

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Option type for Select component.
 */
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

/**
 * Props for the Select component.
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    /** Label text displayed above the select */
    label?: string;
    /** Error message to display below the select */
    error?: string;
    /** Array of options */
    options: SelectOption[];
    /** Placeholder option text */
    placeholder?: string;
    /** Additional wrapper class names */
    wrapperClassName?: string;
}

/**
 * Reusable Select component with consistent styling.
 * 
 * Features:
 * - Built-in label support
 * - Error state styling
 * - Placeholder option support
 * - Full accessibility
 * 
 * @example
 * <Select
 *   label="Skill Level"
 *   options={[
 *     { value: 'beginner', label: 'Beginner' },
 *     { value: 'intermediate', label: 'Intermediate' },
 *   ]}
 *   value={level}
 *   onChange={handleChange}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            options,
            placeholder,
            wrapperClassName,
            id,
            required,
            ...props
        },
        ref
    ) => {
        const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <div className={cn('space-y-1.5', wrapperClassName)}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-foreground"
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
                <select
                    id={selectId}
                    ref={ref}
                    required={required}
                    className={cn(
                        // Base styles
                        'flex h-10 w-full rounded-lg border bg-background px-4 py-2',
                        'text-sm text-foreground',
                        // Focus styles
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                        // Transition
                        'transition-all duration-200',
                        // Disabled state
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        // Appearance
                        'appearance-none cursor-pointer',
                        // Custom dropdown arrow
                        'bg-no-repeat bg-right',
                        'pr-10',
                        // Error state
                        error
                            ? 'border-destructive focus:ring-destructive'
                            : 'border-input hover:border-muted-foreground/50',
                        className
                    )}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundSize: '1.25rem',
                        backgroundPosition: 'right 0.75rem center',
                    }}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
