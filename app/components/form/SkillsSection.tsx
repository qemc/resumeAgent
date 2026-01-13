'use client';

import { Card, CardItem, Input, Select, Button } from '@/app/components/ui';
import type { Skill } from '@/app/types';
import { SKILL_LEVELS } from '@/app/lib/constants';

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
 * Props for SkillsSection component.
 */
export interface SkillsSectionProps {
    /** Array of skill entries */
    skills: Skill[];
    /** Add a new skill entry */
    onAdd: () => void;
    /** Remove a skill by ID */
    onRemove: (id: string) => void;
    /** Update a field in a skill entry */
    onUpdate: (id: string, field: keyof Skill, value: string) => void;
}

/**
 * Convert skill levels to select options.
 */
const skillLevelOptions = SKILL_LEVELS.map((level) => ({
    value: level,
    label: level,
}));

/**
 * Skills section of the resume form.
 * 
 * Features:
 * - Dynamic add/remove entries
 * - Skill name with proficiency level
 * - Grid layout for compact display
 */
export function SkillsSection({
    skills,
    onAdd,
    onRemove,
    onUpdate,
}: SkillsSectionProps) {
    return (
        <Card
            sectionNumber={3}
            title="Skills"
            badgeColor="purple"
            headerAction={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<PlusIcon />}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    Add Skill
                </Button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <CardItem
                        key={skill.id}
                        onRemove={() => onRemove(skill.id)}
                        canRemove={skills.length > 1}
                        className="p-3"
                    >
                        <div className="space-y-2 pr-6">
                            <Input
                                required
                                value={skill.name}
                                onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
                                placeholder="e.g., React, Python, AWS"
                                className="text-sm"
                            />
                            <Select
                                value={skill.level}
                                onChange={(e) => onUpdate(skill.id, 'level', e.target.value)}
                                options={skillLevelOptions}
                                className="text-sm"
                            />
                        </div>
                    </CardItem>
                ))}
            </div>
        </Card>
    );
}
