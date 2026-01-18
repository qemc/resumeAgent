
import { Card, CardItem, Input, Button } from '@/components/ui';
import type { Interest } from '@/types';

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

export interface InterestsSectionProps {
    interests: Interest[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: keyof Interest, value: string) => void;
}

export function InterestsSection({
    interests,
    onAdd,
    onRemove,
    onUpdate,
}: InterestsSectionProps) {
    return (
        <Card
            sectionNumber={7}
            title="Interests"
            badgeColor="orange"
            headerAction={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<PlusIcon />}
                    className="bg-orange-600 hover:bg-orange-700"
                >
                    Add Interest
                </Button>
            }
        >
            {interests.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                    No interests added yet. Click the button above to add one.
                </p>
            ) : (
                <div className="space-y-4">
                    {interests.map((item) => (
                        <CardItem
                            key={item.id}
                            onRemove={() => onRemove(item.id)}
                            canRemove
                        >
                            <Input
                                label="Interest"
                                required
                                value={item.name}
                                onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                                placeholder="Hiking, Photography, AI, etc."
                            />
                        </CardItem>
                    ))}
                </div>
            )}
        </Card>
    );
}
