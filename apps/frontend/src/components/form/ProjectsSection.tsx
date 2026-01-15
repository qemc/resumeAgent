

import { Card, CardItem, Input, Textarea, Button } from '@/components/ui';
import type { Project } from '@/types';
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
 * Props for ProjectsSection component.
 */
export interface ProjectsSectionProps {
    /** Array of project entries */
    projects: Project[];
    /** Add a new project entry */
    onAdd: () => void;
    /** Remove a project by ID */
    onRemove: (id: string) => void;
    /** Update a field in a project entry */
    onUpdate: (id: string, field: keyof Project, value: string) => void;
}

/**
 * Projects section of the resume form.
 * 
 * Features:
 * - Optional section (starts empty)
 * - Dynamic add/remove entries
 * - Project name, description, technologies, and URL
 */
export function ProjectsSection({
    projects,
    onAdd,
    onRemove,
    onUpdate,
}: ProjectsSectionProps) {
    return (
        <Card
            sectionNumber={5}
            title="Projects"
            badgeColor="teal"
            isOptional
            headerAction={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<PlusIcon />}
                    className="bg-teal-600 hover:bg-teal-700"
                >
                    Add Project
                </Button>
            }
        >
            {projects.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                    No projects added yet. Click the button above to add one.
                </p>
            ) : (
                <div className="space-y-4">
                    {projects.map((proj) => (
                        <CardItem
                            key={proj.id}
                            onRemove={() => onRemove(proj.id)}
                            canRemove
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Project Name"
                                    required
                                    value={proj.name}
                                    onChange={(e) => onUpdate(proj.id, 'name', e.target.value)}
                                    placeholder="My Awesome Project"
                                />
                                <Input
                                    label="Technologies Used"
                                    required
                                    value={proj.technologies}
                                    onChange={(e) => onUpdate(proj.id, 'technologies', e.target.value)}
                                    placeholder="React, Node.js, PostgreSQL"
                                />
                                <div className="md:col-span-2">
                                    <Textarea
                                        label="Description"
                                        required
                                        value={proj.description}
                                        onChange={(e) => onUpdate(proj.id, 'description', e.target.value)}
                                        placeholder="Describe your project and its impact..."
                                        rows={3}
                                        showCount
                                        maxLength={FORM_VALIDATION.maxProjectDescriptionLength}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Project URL"
                                        type="url"
                                        value={proj.url || ''}
                                        onChange={(e) => onUpdate(proj.id, 'url', e.target.value)}
                                        placeholder="https://github.com/username/project"
                                    />
                                </div>
                            </div>
                        </CardItem>
                    ))}
                </div>
            )}
        </Card>
    );
}
