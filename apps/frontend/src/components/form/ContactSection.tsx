import { Card, Input } from '@/components/ui';
import type { Contact } from '@/types';

// Labels in English and Polish
const labels = {
    EN: {
        title: 'Contact Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        phone: 'Phone Number',
        email: 'Email',
        linkedin: 'LinkedIn Profile',
        github: 'GitHub Profile',
    },
    PL: {
        title: 'Dane kontaktowe',
        firstName: 'Imię',
        lastName: 'Nazwisko',
        phone: 'Numer telefonu',
        email: 'E-mail',
        linkedin: 'Profil LinkedIn',
        github: 'Profil GitHub',
    },
};

/**
 * Props for ContactSection component.
 */
export interface ContactSectionProps {
    /** Current contact data */
    data: Contact;
    /** Callback when any field changes */
    onChange: (field: keyof Contact, value: string) => void;
    /** Extra action to display in header (e.g., Save button) */
    extraHeaderAction?: React.ReactNode;
    /** Language for labels (default: 'EN') */
    lang?: 'EN' | 'PL';
}

/**
 * Contact Information section of the resume form.
 * 
 * Collects:
 * - First and Last name (required)
 * - Phone and Email (required)
 * - LinkedIn and GitHub profiles (optional)
 */
export function ContactSection({ data, onChange, extraHeaderAction, lang = 'EN' }: ContactSectionProps) {
    const t = labels[lang];

    return (
        <Card
            sectionNumber={1}
            title={t.title}
            badgeColor="blue"
            headerAction={extraHeaderAction}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={t.firstName}
                    required
                    value={data.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    placeholder={lang === 'EN' ? 'John' : 'Jan'}
                />
                <Input
                    label={t.lastName}
                    required
                    value={data.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    placeholder={lang === 'EN' ? 'Doe' : 'Kowalski'}
                />
                <Input
                    label={t.phone}
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    placeholder="+48 123 456 789"
                />
                <Input
                    label={t.email}
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    placeholder={lang === 'EN' ? 'john.doe@email.com' : 'jan.kowalski@email.com'}
                />
                <Input
                    label={t.linkedin}
                    type="url"
                    value={data.linkedin}
                    onChange={(e) => onChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe"
                />
                <Input
                    label={t.github}
                    type="url"
                    value={data.github}
                    onChange={(e) => onChange('github', e.target.value)}
                    placeholder="https://github.com/johndoe"
                />
            </div>
        </Card>
    );
}
