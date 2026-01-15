

import { useState, useCallback } from 'react';
import {
    type ResumeFormData,
    type ContactData,
    type Experience,
    type Skill,
    type Certificate,
    type Project,
    createEmptyContact,
    createEmptyExperience,
    createEmptySkill,
    createEmptyCertificate,
    createEmptyProject,
} from '@/types';
import { generateId } from '@/lib/utils';

/**
 * Return type for the useResumeForm hook.
 */
export interface UseResumeFormReturn {
    // Form data
    formData: ResumeFormData;

    // Submission state
    isSubmitting: boolean;

    // Contact handlers
    updateContact: (field: keyof ContactData, value: string) => void;

    // Experience handlers
    addExperience: () => void;
    removeExperience: (id: string) => void;
    updateExperience: (id: string, field: keyof Experience, value: string | boolean) => void;

    // Skill handlers
    addSkill: () => void;
    removeSkill: (id: string) => void;
    updateSkill: (id: string, field: keyof Skill, value: string) => void;

    // Certificate handlers
    addCertificate: () => void;
    removeCertificate: (id: string) => void;
    updateCertificate: (id: string, field: keyof Certificate, value: string) => void;

    // Project handlers
    addProject: () => void;
    removeProject: (id: string) => void;
    updateProject: (id: string, field: keyof Project, value: string) => void;

    // Form actions
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    resetForm: () => void;
}

/**
 * Custom hook for managing resume form state.
 * 
 * This hook encapsulates all form state and handlers, making the
 * ResumeForm component a thin orchestrator that just wires things together.
 * 
 * @example
 * function ResumeForm() {
 *   const form = useResumeForm();
 *   
 *   return (
 *     <form onSubmit={form.handleSubmit}>
 *       <ContactSection data={form.formData.contact} onChange={form.updateContact} />
 *       ...
 *     </form>
 *   );
 * }
 */
export function useResumeForm(): UseResumeFormReturn {
    // Initial form state with deterministic IDs to prevent hydration mismatch
    // Random IDs are only used when adding new entries dynamically
    const [formData, setFormData] = useState<ResumeFormData>(() => ({
        contact: createEmptyContact(),
        experiences: [createEmptyExperience('exp-initial-0')],
        skills: [createEmptySkill('skill-initial-0')],
        certificates: [],
        projects: [],
    }));

    const [isSubmitting, setIsSubmitting] = useState(false);


    // ============================================
    // Contact Handlers
    // ============================================

    const updateContact = useCallback((field: keyof ContactData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, [field]: value },
        }));
    }, []);

    // ============================================
    // Experience Handlers
    // ============================================

    const addExperience = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            experiences: [...prev.experiences, createEmptyExperience(generateId())],
        }));
    }, []);

    const removeExperience = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((exp) => exp.id !== id),
        }));
    }, []);

    const updateExperience = useCallback(
        (id: string, field: keyof Experience, value: string | boolean) => {
            setFormData((prev) => ({
                ...prev,
                experiences: prev.experiences.map((exp) =>
                    exp.id === id ? { ...exp, [field]: value } : exp
                ),
            }));
        },
        []
    );

    // ============================================
    // Skill Handlers
    // ============================================

    const addSkill = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, createEmptySkill(generateId())],
        }));
    }, []);

    const removeSkill = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill.id !== id),
        }));
    }, []);

    const updateSkill = useCallback(
        (id: string, field: keyof Skill, value: string) => {
            setFormData((prev) => ({
                ...prev,
                skills: prev.skills.map((skill) =>
                    skill.id === id ? { ...skill, [field]: value } : skill
                ),
            }));
        },
        []
    );

    // ============================================
    // Certificate Handlers
    // ============================================

    const addCertificate = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            certificates: [...prev.certificates, createEmptyCertificate(generateId())],
        }));
    }, []);

    const removeCertificate = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            certificates: prev.certificates.filter((cert) => cert.id !== id),
        }));
    }, []);

    const updateCertificate = useCallback(
        (id: string, field: keyof Certificate, value: string) => {
            setFormData((prev) => ({
                ...prev,
                certificates: prev.certificates.map((cert) =>
                    cert.id === id ? { ...cert, [field]: value } : cert
                ),
            }));
        },
        []
    );

    // ============================================
    // Project Handlers
    // ============================================

    const addProject = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            projects: [...prev.projects, createEmptyProject(generateId())],
        }));
    }, []);

    const removeProject = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((proj) => proj.id !== id),
        }));
    }, []);

    const updateProject = useCallback(
        (id: string, field: keyof Project, value: string) => {
            setFormData((prev) => ({
                ...prev,
                projects: prev.projects.map((proj) =>
                    proj.id === id ? { ...proj, [field]: value } : proj
                ),
            }));
        },
        []
    );

    // ============================================
    // Form Actions
    // ============================================

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Replace with actual API call via services/api.ts
            console.log('Resume Data:', formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            alert('Resume data collected successfully! Check the console for the data.');
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData]);

    const resetForm = useCallback(() => {
        setFormData({
            contact: createEmptyContact(),
            experiences: [createEmptyExperience('exp-initial-0')],
            skills: [createEmptySkill('skill-initial-0')],
            certificates: [],
            projects: [],
        });
    }, []);

    return {
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
        resetForm,
    };
}
