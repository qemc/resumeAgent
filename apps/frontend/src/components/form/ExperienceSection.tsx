

import { Card, CardItem, Input, Textarea, Button, Checkbox } from '@/components/ui';
import type { Experience } from '@/types';
import { FORM_VALIDATION } from '@/lib/constants';

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

/**
 * Props for ExperienceSection component.
 */
export interface ExperienceSectionProps {
    /** Array of experience entries */
    experiences: Experience[];
    /** Add a new experience entry */
    onAdd: () => void;
    /** Remove an experience by ID */
    onRemove: (id: string) => void;
    /** Update a field in an experience entry */
    onUpdate: (id: string, field: keyof Experience, value: string | boolean) => void;
}

/**
 * Work Experience section of the resume form.
 * 
 * Features:
 * - Dynamic add/remove entries
 * - Single text area for description (AI will process into bullets later)
 * - Date range with "Currently working" option
 */
export function ExperienceSection({
    experiences,
    onAdd,
    onRemove,
    onUpdate,
}: ExperienceSectionProps) {
    return (
        <Card
            sectionNumber={2}
            title="Work Experience"
            badgeColor="green"
            headerAction={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<PlusIcon />}
                    className="bg-green-600 hover:bg-green-700"
                >
                    Add Experience
                </Button>
            }
        >
            <div className="space-y-4">
                {experiences.map((exp) => (
                    <CardItem
                        key={exp.id}
                        onRemove={() => onRemove(exp.id)}
                        canRemove={experiences.length > 1}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="Company"
                                required
                                value={exp.company}
                                onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                                placeholder="Acme Inc."
                            />
                            <Input
                                label="Position"
                                required
                                value={exp.position}
                                onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                                placeholder="Software Engineer"
                            />
                            <Input
                                label="Start Date"
                                type="month"
                                required
                                value={exp.startDate}
                                onChange={(e) => onUpdate(exp.id, 'startDate', e.target.value)}
                            />
                            <div className="space-y-2">
                                <Input
                                    label="End Date"
                                    type="month"
                                    value={exp.endDate}
                                    disabled={exp.current}
                                    onChange={(e) => onUpdate(exp.id, 'endDate', e.target.value)}
                                />
                                <Checkbox
                                    label="Currently working here"
                                    checked={exp.current}
                                    onChange={(e) => onUpdate(exp.id, 'current', e.target.checked)}
                                />
                            </div>
                        </div>

                        {/* Description field - single text area for AI processing */}
                        <Textarea
                            label="Description"
                            required
                            value={exp.description}
                            onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
                            placeholder="Describe your responsibilities, achievements, and the impact you made. Be as detailed as possible - AI will help format this into bullet points later..."
                            rows={5}
                            showCount
                            maxLength={FORM_VALIDATION.maxDescriptionLength}
                        />
                    </CardItem>
                ))}
            </div>
        </Card>
    );
}
