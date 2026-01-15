

import { useResumeForm } from '@/hooks';
import { Button } from '@/components/ui';
import {
    ContactSection,
    ExperienceSection,
    SkillsSection,
    CertificatesSection,
    ProjectsSection,
} from '@/components/form';

/**
 * Check icon for submit button.
 */
const CheckIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

/**
 * ResumeForm - Main form orchestrator component.
 * 
 * This component:
 * - Uses the useResumeForm hook for all state management
 * - Renders form sections in a logical order
 * - Handles form submission
 * 
 * The component is kept intentionally thin - all logic lives in
 * the hook, making it easy to test and maintain.
 */
export default function ResumeForm() {
    const {
        formData,
        isSubmitting,
        updateContact,
        addExperience,
        removeExperience,
        updateExperience,
        addSkill,
        removeSkill,
        updateSkill,
        addCertificate,
        removeCertificate,
        updateCertificate,
        addProject,
        removeProject,
        updateProject,
        handleSubmit,
    } = useResumeForm();

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Resume Builder
                </h1>
                <p className="text-muted-foreground mt-2">
                    Fill in your details to create a personalized CV
                </p>
            </header>

            {/* Form Sections */}
            <ContactSection
                data={formData.contact}
                onChange={updateContact}
            />

            <ExperienceSection
                experiences={formData.experiences}
                onAdd={addExperience}
                onRemove={removeExperience}
                onUpdate={updateExperience}
            />

            <SkillsSection
                skills={formData.skills}
                onAdd={addSkill}
                onRemove={removeSkill}
                onUpdate={updateSkill}
            />

            <CertificatesSection
                certificates={formData.certificates}
                onAdd={addCertificate}
                onRemove={removeCertificate}
                onUpdate={updateCertificate}
            />

            <ProjectsSection
                projects={formData.projects}
                onAdd={addProject}
                onRemove={removeProject}
                onUpdate={updateProject}
            />

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    leftIcon={!isSubmitting ? <CheckIcon /> : undefined}
                    className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Resume'}
                </Button>
            </div>
        </form>
    );
}
