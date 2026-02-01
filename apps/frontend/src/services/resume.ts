import { api } from './api';
import type {
    Contact,
    Skill,
    Language,
    Interest,
    ExperienceInput,
    CertificateInput,
    ProjectInput,
    ResumeLang,
    ResumeResponse,
    ExperienceRow,
    CertificateRow,
    ProjectRow,
} from '@/types';

// =============================================================================
// Resume (contact, skills, languages, interests)
// =============================================================================

export const getResume = async (lang: ResumeLang): Promise<ResumeResponse | null> => {
    try {
        const response = await api.get<ResumeResponse>(`/resume/${lang}`);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};

export const createResume = async (data: {
    resume_lang: ResumeLang;
    contact: Contact;
    summary?: string;
    skills: Skill[];
    languages: Language[];
    interests: Interest[];
}): Promise<ResumeResponse> => {
    const response = await api.post<ResumeResponse>('/resume', data);
    return response.data;
};

export const updateContact = async (lang: ResumeLang, contact: Contact): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${lang}`, { contact });
    return response.data;
};

export const updateSkills = async (lang: ResumeLang, skills: Skill[]): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${lang}`, { skills });
    return response.data;
};

export const updateLanguages = async (lang: ResumeLang, languages: Language[]): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${lang}`, { languages });
    return response.data;
};

export const updateInterests = async (lang: ResumeLang, interests: Interest[]): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${lang}`, { interests });
    return response.data;
};

export const updateSummary = async (lang: ResumeLang, summary: string): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${lang}`, { summary });
    return response.data;
};

// =============================================================================
// Experiences
// =============================================================================

export const getExperiences = async (lang: ResumeLang): Promise<ExperienceRow[]> => {
    const response = await api.get<ExperienceRow[]>(`/experiences/${lang}`);
    return response.data;
};

export const createExperience = async (lang: ResumeLang, data: ExperienceInput): Promise<ExperienceRow> => {
    const response = await api.post<ExperienceRow>('/experiences', {
        resume_lang: lang,
        experience: data,
    });
    return response.data;
};

export const updateExperience = async (
    id: number,
    data: Partial<ExperienceInput>,
    options?: { descriptionChanged?: boolean }
): Promise<ExperienceRow> => {
    const response = await api.patch<ExperienceRow>(`/experiences/${id}`, {
        ...data,
        _descriptionChanged: options?.descriptionChanged ?? true,
    });
    return response.data;
};

export const deleteExperience = async (id: number): Promise<void> => {
    await api.delete(`/experiences/${id}`);
};

// =============================================================================
// Certificates
// =============================================================================

export const getCertificates = async (lang: ResumeLang): Promise<CertificateRow[]> => {
    const response = await api.get<CertificateRow[]>(`/certificates/${lang}`);
    return response.data;
};

export const createCertificate = async (lang: ResumeLang, data: CertificateInput): Promise<CertificateRow> => {
    const response = await api.post<CertificateRow>('/certificates', {
        resume_lang: lang,
        certificate: data,
    });
    return response.data;
};

export const updateCertificate = async (
    id: number,
    data: Partial<CertificateInput>,
    options?: { descriptionChanged?: boolean }
): Promise<CertificateRow> => {
    const response = await api.patch<CertificateRow>(`/certificates/${id}`, {
        ...data,
        _descriptionChanged: options?.descriptionChanged ?? true,
    });
    return response.data;
};

export const deleteCertificate = async (id: number): Promise<void> => {
    await api.delete(`/certificates/${id}`);
};

// =============================================================================
// Projects
// =============================================================================

export const getProjects = async (lang: ResumeLang): Promise<ProjectRow[]> => {
    const response = await api.get<ProjectRow[]>(`/projects/${lang}`);
    return response.data;
};

export const createProject = async (lang: ResumeLang, data: ProjectInput): Promise<ProjectRow> => {
    const response = await api.post<ProjectRow>('/projects', {
        resume_lang: lang,
        project: data,
    });
    return response.data;
};

export const updateProject = async (
    id: number,
    data: Partial<ProjectInput>,
    options?: { descriptionChanged?: boolean }
): Promise<ProjectRow> => {
    const response = await api.patch<ProjectRow>(`/projects/${id}`, {
        ...data,
        _descriptionChanged: options?.descriptionChanged ?? true,
    });
    return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
};
