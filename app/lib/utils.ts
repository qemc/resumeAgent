import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge.
 * This is the standard pattern used in shadcn/ui and most modern React projects.
 * 
 * @example
 * cn('px-4 py-2', condition && 'bg-blue-500', 'hover:bg-blue-600')
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID for form elements.
 * Uses crypto.randomUUID when available, falls back to timestamp + random.
 */
export function generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Formats a date string for display.
 * @param dateString - ISO date string or YYYY-MM format
 * @returns Formatted date like "January 2024"
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';

    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Debounce function for input handlers.
 * Useful for auto-save functionality.
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
