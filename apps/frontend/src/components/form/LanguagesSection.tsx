
import { Card, CardItem, Input, Button } from '@/components/ui';
import type { Language, LanguageLevel } from '@/types';

/**
 * Plus icon component.
 */
const PlusIcon = () => (
    <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
        />
    </svg>
);

export interface LanguagesSectionProps {
    languages: Language[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: keyof Language, value: string) => void;
}

const LANGUAGE_LEVELS: LanguageLevel[] = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C1',
    'Native'
];

export function LanguagesSection({
    languages,
    onAdd,
    onRemove,
    onUpdate,
}: LanguagesSectionProps) {
    return (
        <Card
            sectionNumber={6}
            title="Languages"
            badgeColor="purple"
            headerAction={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<PlusIcon />}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    Add Language
                </Button>
            }
        >
            {languages.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                    No languages added yet. Click the button above to add one.
                </p>
            ) : (
                <div className="space-y-4">
                    {languages.map((lang) => (
                        <CardItem
                            key={lang.id}
                            onRemove={() => onRemove(lang.id)}
                            canRemove
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Language"
                                    required
                                    value={lang.name}
                                    onChange={(e) => onUpdate(lang.id, 'name', e.target.value)}
                                    placeholder="English, Spanish, etc."
                                />
                                <div>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Level <span className="text-destructive">*</span>
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 mt-1 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all"
                                        value={lang.level}
                                        onChange={(e) => onUpdate(lang.id, 'level', e.target.value as LanguageLevel)}
                                    >
                                        {LANGUAGE_LEVELS.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </CardItem>
                    ))}
                </div>
            )}
        </Card>
    );
}
