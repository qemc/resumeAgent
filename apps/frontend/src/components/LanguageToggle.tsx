
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

import type { LanguageCode } from '@/types';

interface LanguageToggleProps {
    activeLang: LanguageCode;
    onChange: (lang: LanguageCode) => void;
    className?: string;
}

export function LanguageToggle({ activeLang, onChange, className }: LanguageToggleProps) {
    return (
        <div className={cn("flex items-center gap-2 p-1 bg-secondary rounded-lg border border-border w-fit", className)}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange('EN')}
                className={cn(
                    "relative transition-all duration-200 px-4",
                    activeLang === 'EN'
                        ? "bg-background shadow-sm text-foreground hover:bg-background"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <span className="mr-2">🇬🇧</span>
                English
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange('PL')}
                className={cn(
                    "relative transition-all duration-200 px-4",
                    activeLang === 'PL'
                        ? "bg-background shadow-sm text-foreground hover:bg-background"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <span className="mr-2">🇵🇱</span>
                Polski
            </Button>
        </div>
    );
}
