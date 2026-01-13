'use client';

import { Card, CardItem, Input, Button } from '@/app/components/ui';
import type { Certificate } from '@/app/types';

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
 * Props for CertificatesSection component.
 */
export interface CertificatesSectionProps {
    /** Array of certificate entries */
    certificates: Certificate[];
    /** Add a new certificate entry */
    onAdd: () => void;
    /** Remove a certificate by ID */
    onRemove: (id: string) => void;
    /** Update a field in a certificate entry */
    onUpdate: (id: string, field: keyof Certificate, value: string) => void;
}

/**
 * Certificates section of the resume form.
 * 
 * Features:
 * - Optional section (starts empty)
 * - Dynamic add/remove entries
 * - Certificate name, issuer, date, and optional URL
 */
export function CertificatesSection({
    certificates,
    onAdd,
    onRemove,
    onUpdate,
}: CertificatesSectionProps) {
    return (
        <Card
            sectionNumber={4}
            title="Certificates"
            badgeColor="orange"
            isOptional
            headerAction={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                    leftIcon={<PlusIcon />}
                    className="bg-orange-600 hover:bg-orange-700"
                >
                    Add Certificate
                </Button>
            }
        >
            {certificates.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                    No certificates added yet. Click the button above to add one.
                </p>
            ) : (
                <div className="space-y-4">
                    {certificates.map((cert) => (
                        <CardItem
                            key={cert.id}
                            onRemove={() => onRemove(cert.id)}
                            canRemove
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Certificate Name"
                                    required
                                    value={cert.name}
                                    onChange={(e) => onUpdate(cert.id, 'name', e.target.value)}
                                    placeholder="AWS Solutions Architect"
                                />
                                <Input
                                    label="Issuing Organization"
                                    required
                                    value={cert.issuer}
                                    onChange={(e) => onUpdate(cert.id, 'issuer', e.target.value)}
                                    placeholder="Amazon Web Services"
                                />
                                <Input
                                    label="Date Obtained"
                                    type="month"
                                    required
                                    value={cert.date}
                                    onChange={(e) => onUpdate(cert.id, 'date', e.target.value)}
                                />
                                <Input
                                    label="Certificate URL"
                                    type="url"
                                    value={cert.url || ''}
                                    onChange={(e) => onUpdate(cert.id, 'url', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                        </CardItem>
                    ))}
                </div>
            )}
        </Card>
    );
}
