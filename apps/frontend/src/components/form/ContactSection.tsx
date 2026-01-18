

import { Card, Input } from '@/components/ui';
import type { Contact } from '@/types';

/**
 * Props for ContactSection component.
 */
export interface ContactSectionProps {
    /** Current contact data */
    data: Contact;
    /** Callback when any field changes */
    onChange: (field: keyof Contact, value: string) => void;
}

/**
 * Contact Information section of the resume form.
 * 
 * Collects:
 * - First and Last name (required)
 * - Phone and Email (required)
 * - LinkedIn and GitHub profiles (optional)
 */
export function ContactSection({ data, onChange }: ContactSectionProps) {
    return (
        <Card
            sectionNumber={1}
            title="Contact Information"
            badgeColor="blue"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    required
                    value={data.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    placeholder="John"
                />
                <Input
                    label="Last Name"
                    required
                    value={data.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    placeholder="Doe"
                />
                <Input
                    label="Phone Number"
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    placeholder="+1 234 567 890"
                />
                <Input
                    label="Email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    placeholder="john.doe@email.com"
                />
                <Input
                    label="LinkedIn Profile"
                    type="url"
                    value={data.linkedin}
                    onChange={(e) => onChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe"
                />
                <Input
                    label="GitHub Profile"
                    type="url"
                    value={data.github}
                    onChange={(e) => onChange('github', e.target.value)}
                    placeholder="https://github.com/johndoe"
                />
            </div>
        </Card>
    );
}
