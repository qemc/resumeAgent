

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Label text displayed next to the checkbox */
    label?: string;
}

/**
 * Reusable Checkbox component with label.
 * 
 * @example
 * <Checkbox
 *   label="Currently working here"
 *   checked={isCurrentlyWorking}
 *   onChange={handleChange}
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, id, ...props }, ref) => {
        const checkboxId = id || `checkbox-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <label
                htmlFor={checkboxId}
                className={cn(
                    'flex items-center gap-2 cursor-pointer text-sm',
                    'select-none',
                    props.disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
            >
                <input
                    id={checkboxId}
                    ref={ref}
                    type="checkbox"
                    className={cn(
                        'h-4 w-4 rounded border-input',
                        'text-primary focus:ring-2 focus:ring-ring focus:ring-offset-1',
                        'transition-colors cursor-pointer',
                        'disabled:cursor-not-allowed'
                    )}
                    {...props}
                />
                {label && <span className="text-foreground">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';
