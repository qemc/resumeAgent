
import { useState, useCallback } from 'react';
import {
    type ResumeFormData,
    type Contact,
    type Experience,
    type Skill,
    type Certificate,
    type Project,
    type Interest,
    type Language,
    type LanguageCode,
    createEmptyContact,
    createEmptyExperience,
    createEmptySkill,
    createEmptyCertificate,
    createEmptyProject,
    createEmptyInterest,
    createEmptyLanguage,
} from '@/types';
import { generateId } from '@/lib/utils';

/**
 * Return type for the useResumeForm hook.
 */
export interface UseResumeFormReturn {
    // Form data for the ACTIVE language
    formData: ResumeFormData;

    // Language State
    activeLang: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;

    // Submission state
    isSubmitting: boolean;

    // Contact handlers
    updateContact: (field: keyof Contact, value: string) => void;

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

    // Interest handlers
    addInterest: () => void;
    removeInterest: (id: string) => void;
    updateInterest: (id: string, field: keyof Interest, value: string) => void;

    // Language handlers
    addLanguage: () => void;
    removeLanguage: (id: string) => void;
    updateLanguage: (id: string, field: keyof Language, value: string) => void;

    // Form actions
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    resetForm: () => void;
}

// Internal state structure
interface MultiLanguageState {
    activeLang: LanguageCode;
    data: Record<LanguageCode, ResumeFormData>;
}

const createInitialResumeData = (): ResumeFormData => ({
    contact: createEmptyContact(),
    experiences: [createEmptyExperience('exp-initial-0')],
    skills: [createEmptySkill('skill-initial-0')],
    certificates: [],
    projects: [],
    interests: [],
    languages: [],
});

export function useResumeForm(): UseResumeFormReturn {
    // Initial state with both EN and PL buckets
    const [state, setState] = useState<MultiLanguageState>(() => ({
        activeLang: 'EN',
        data: {
            EN: createInitialResumeData(),
            PL: createInitialResumeData(),
        }
    }));

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Helper to update the CURRENT language's data safely
    const setFormData = useCallback((updater: (prev: ResumeFormData) => ResumeFormData) => {
        setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [prevState.activeLang]: updater(prevState.data[prevState.activeLang])
            }
        }));
    }, []);

    // Language Switcher
    const setLanguage = useCallback((lang: LanguageCode) => {
        setState((prev) => ({ ...prev, activeLang: lang }));
    }, []);

    // Derived Getter
    const formData = state.data[state.activeLang];


    // ============================================
    // Contact Handlers
    // ============================================

    const updateContact = useCallback((field: keyof Contact, value: string) => {
        setFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, [field]: value },
        }));
    }, [setFormData]);

    // ============================================
    // Experience Handlers
    // ============================================

    const addExperience = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            experiences: [...prev.experiences, createEmptyExperience(generateId())],
        }));
    }, [setFormData]);

    const removeExperience = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((exp) => exp.id !== id),
        }));
    }, [setFormData]);

    const updateExperience = useCallback(
        (id: string, field: keyof Experience, value: string | boolean) => {
            setFormData((prev) => ({
                ...prev,
                experiences: prev.experiences.map((exp) =>
                    exp.id === id ? { ...exp, [field]: value } : exp
                ),
            }));
        },
        [setFormData]
    );

    // ============================================
    // Skill Handlers
    // ============================================

    const addSkill = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, createEmptySkill(generateId())],
        }));
    }, [setFormData]);

    const removeSkill = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill.id !== id),
        }));
    }, [setFormData]);

    const updateSkill = useCallback(
        (id: string, field: keyof Skill, value: string) => {
            setFormData((prev) => ({
                ...prev,
                skills: prev.skills.map((skill) =>
                    skill.id === id ? { ...skill, [field]: value } : skill
                ),
            }));
        },
        [setFormData]
    );

    // ============================================
    // Certificate Handlers
    // ============================================

    const addCertificate = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            certificates: [...prev.certificates, createEmptyCertificate(generateId())],
        }));
    }, [setFormData]);

    const removeCertificate = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            certificates: prev.certificates.filter((cert) => cert.id !== id),
        }));
    }, [setFormData]);

    const updateCertificate = useCallback(
        (id: string, field: keyof Certificate, value: string) => {
            setFormData((prev) => ({
                ...prev,
                certificates: prev.certificates.map((cert) =>
                    cert.id === id ? { ...cert, [field]: value } : cert
                ),
            }));
        },
        [setFormData]
    );

    // ============================================
    // Project Handlers
    // ============================================

    const addProject = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            projects: [...prev.projects, createEmptyProject(generateId())],
        }));
    }, [setFormData]);

    const removeProject = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((proj) => proj.id !== id),
        }));
    }, [setFormData]);

    const updateProject = useCallback(
        (id: string, field: keyof Project, value: string) => {
            setFormData((prev) => ({
                ...prev,
                projects: prev.projects.map((proj) =>
                    proj.id === id ? { ...proj, [field]: value } : proj
                ),
            }));
        },
        [setFormData]
    );

    // ============================================
    // Interest Handlers
    // ============================================

    const addInterest = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            interests: [...prev.interests, createEmptyInterest(generateId())],
        }));
    }, [setFormData]);

    const removeInterest = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.filter((item) => item.id !== id),
        }));
    }, [setFormData]);

    const updateInterest = useCallback(
        (id: string, field: keyof Interest, value: string) => {
            setFormData((prev) => ({
                ...prev,
                interests: prev.interests.map((item) =>
                    item.id === id ? { ...item, [field]: value } : item
                ),
            }));
        },
        [setFormData]
    );

    // ============================================
    // Language Handlers
    // ============================================

    const addLanguage = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            languages: [...prev.languages, createEmptyLanguage(generateId())],
        }));
    }, [setFormData]);

    const removeLanguage = useCallback((id: string) => {
        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.filter((item) => item.id !== id),
        }));
    }, [setFormData]);

    const updateLanguage = useCallback(
        (id: string, field: keyof Language, value: string) => {
            setFormData((prev) => ({
                ...prev,
                languages: prev.languages.map((item) =>
                    item.id === id ? { ...item, [field]: value } : item
                ),
            }));
        },
        [setFormData]
    );

    // ============================================
    // Form Actions
    // ============================================

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Log only the active language data
            console.log(`Submitting Resume [${state.activeLang.toUpperCase()}]:`, state.data[state.activeLang]);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            alert(`Resume (${state.activeLang.toUpperCase()}) collected successfully! Check the console.`);
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }, [state.data, state.activeLang]);

    const resetForm = useCallback(() => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            setState({
                activeLang: 'EN',
                data: {
                    EN: createInitialResumeData(),
                    PL: createInitialResumeData(),
                }
            });
        }
    }, []);

    return {
        formData,
        activeLang: state.activeLang,
        setLanguage,
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
        addInterest,
        removeInterest,
        updateInterest,
        addLanguage,
        removeLanguage,
        updateLanguage,
        handleSubmit,
        resetForm,
    };
}
