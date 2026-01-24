import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import {
    ContactSection,
    SkillsSection,
    LanguagesSection,
    InterestsSection,
    ExperienceSection,
    CertificatesSection,
    ProjectsSection,
    SummarySection,
} from '@/components/form';
import type { Contact, Skill, Language, Interest, ResumeData, ResumeLang } from '@/types';
import { generateId } from '@/lib/utils';
import { emptyContact, emptyResumeData } from '@/lib/constants';
import {
    getResume,
    createResume,
    updateContact,
    updateSkills,
    updateLanguages,
    updateInterests,
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    updateSummary,
} from '@/services/resume';



/**
 * My Resume Data Page
 * 
 * Single page with language toggle and all resume sections.
 * Supports EN (English) and PL (Polish) versions.
 */
export function MyResumePage() {
    // Active language
    const [activeLang, setActiveLang] = useState<ResumeLang>('EN');

    // Loading states
    const [isLoading, setIsLoading] = useState(true);
    const [savingSection, setSavingSection] = useState<string | null>(null);

    // Data for both languages
    const [enData, setEnData] = useState<ResumeData>(emptyResumeData);
    const [plData, setPlData] = useState<ResumeData>(emptyResumeData);

    // Get current data based on active language
    const currentData = activeLang === 'EN' ? enData : plData;
    const setCurrentData = activeLang === 'EN' ? setEnData : setPlData;

    // Page translations
    const pageLabels = {
        EN: {
            title: 'My Resume Data',
            loading: 'Loading your resume data...',
            noResume: 'No English resume yet. Save any section to create one.',
            save: 'Save',
            saving: 'Saving...',
        },
        PL: {
            title: 'Moje Dane CV',
            loading: 'Wczytywanie danych CV...',
            noResume: 'Brak CV w języku polskim. Zapisz dowolną sekcję, aby utworzyć.',
            save: 'Zapisz',
            saving: 'Zapisywanie...',
        }
    };

    const t = pageLabels[activeLang];

    // Load all data on mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Load both EN and PL data in parallel
                const [enResume, enExps, enCerts, enProjs, plResume, plExps, plCerts, plProjs] = await Promise.all([
                    getResume('EN'),
                    getExperiences('EN'),
                    getCertificates('EN'),
                    getProjects('EN'),
                    getResume('PL'),
                    getExperiences('PL'),
                    getCertificates('PL'),
                    getProjects('PL'),
                ]);

                setEnData({
                    resumeId: enResume?.id ?? null,
                    contact: enResume?.contact ?? emptyContact,
                    summary: enResume?.summary ?? '',
                    skills: enResume?.skills ?? [],
                    languages: enResume?.languages ?? [],
                    interests: enResume?.interests ?? [],
                    experienceRows: enExps,
                    certificateRows: enCerts,
                    projectRows: enProjs,
                });

                setPlData({
                    resumeId: plResume?.id ?? null,
                    contact: plResume?.contact ?? emptyContact,
                    summary: plResume?.summary ?? '',
                    skills: plResume?.skills ?? [],
                    languages: plResume?.languages ?? [],
                    interests: plResume?.interests ?? [],
                    experienceRows: plExps,
                    certificateRows: plCerts,
                    projectRows: plProjs,
                });
            } catch (error) {
                console.error('Failed to load resume data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // ==========================================================================
    // Contact Handlers
    // ==========================================================================
    const handleContactChange = (field: keyof Contact, value: string) => {
        setCurrentData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
    };

    const handleSummaryChange = (value: string) => {
        setCurrentData(prev => ({ ...prev, summary: value }));
    };

    const handleSaveContact = async () => {
        setSavingSection('contact');
        try {
            if (currentData.resumeId) {
                await updateContact(activeLang, currentData.contact);
            } else {
                const newResume = await createResume({
                    resume_lang: activeLang,
                    contact: currentData.contact,
                    skills: [],
                    languages: [],
                    interests: [],
                });
                setCurrentData(prev => ({ ...prev, resumeId: newResume.id }));
            }
        } catch (error) {
            console.error('Failed to save contact:', error);
        } finally {
            setSavingSection(null);
        }
    };

    const handleSaveSummary = async () => {
        setSavingSection('summary');
        try {
            if (currentData.resumeId) {
                await updateSummary(activeLang, currentData.summary);
            } else {
                const newResume = await createResume({
                    resume_lang: activeLang,
                    contact: currentData.contact,
                    summary: currentData.summary,
                    skills: [],
                    languages: [],
                    interests: [],
                });
                setCurrentData(prev => ({ ...prev, resumeId: newResume.id }));
            }
        } catch (error) {
            console.error('Failed to save summary:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Skills Handlers
    // ==========================================================================
    const handleAddSkill = () => {
        setCurrentData(prev => ({
            ...prev,
            skills: [...prev.skills, { id: generateId(), name: '', level: 'beginner', category: '' }]
        }));
    };

    const handleRemoveSkill = (id: string) => {
        setCurrentData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s.id !== id)
        }));
    };

    const handleUpdateSkill = (id: string, field: keyof Skill, value: string) => {
        setCurrentData(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
        }));
    };

    const handleSaveSkills = async () => {
        setSavingSection('skills');
        try {
            if (currentData.resumeId) {
                await updateSkills(activeLang, currentData.skills);
            } else {
                const newResume = await createResume({
                    resume_lang: activeLang,
                    contact: currentData.contact,
                    skills: currentData.skills,
                    languages: [],
                    interests: [],
                });
                setCurrentData(prev => ({ ...prev, resumeId: newResume.id }));
            }
        } catch (error) {
            console.error('Failed to save skills:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Languages Handlers
    // ==========================================================================
    const handleAddLanguage = () => {
        setCurrentData(prev => ({
            ...prev,
            languages: [...prev.languages, { id: generateId(), name: '', level: 'B1' }]
        }));
    };

    const handleRemoveLanguage = (id: string) => {
        setCurrentData(prev => ({
            ...prev,
            languages: prev.languages.filter(l => l.id !== id)
        }));
    };

    const handleUpdateLanguage = (id: string, field: keyof Language, value: string) => {
        setCurrentData(prev => ({
            ...prev,
            languages: prev.languages.map(l => l.id === id ? { ...l, [field]: value } : l)
        }));
    };

    const handleSaveLanguages = async () => {
        setSavingSection('languages');
        try {
            if (currentData.resumeId) {
                await updateLanguages(activeLang, currentData.languages);
            } else {
                const newResume = await createResume({
                    resume_lang: activeLang,
                    contact: currentData.contact,
                    skills: [],
                    languages: currentData.languages,
                    interests: [],
                });
                setCurrentData(prev => ({ ...prev, resumeId: newResume.id }));
            }
        } catch (error) {
            console.error('Failed to save languages:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Interests Handlers
    // ==========================================================================
    const handleAddInterest = () => {
        setCurrentData(prev => ({
            ...prev,
            interests: [...prev.interests, { id: generateId(), name: '' }]
        }));
    };

    const handleRemoveInterest = (id: string) => {
        setCurrentData(prev => ({
            ...prev,
            interests: prev.interests.filter(i => i.id !== id)
        }));
    };

    const handleUpdateInterest = (id: string, field: keyof Interest, value: string) => {
        setCurrentData(prev => ({
            ...prev,
            interests: prev.interests.map(i => i.id === id ? { ...i, [field]: value } : i)
        }));
    };

    const handleSaveInterests = async () => {
        setSavingSection('interests');
        try {
            if (currentData.resumeId) {
                await updateInterests(activeLang, currentData.interests);
            } else {
                const newResume = await createResume({
                    resume_lang: activeLang,
                    contact: currentData.contact,
                    skills: [],
                    languages: [],
                    interests: currentData.interests,
                });
                setCurrentData(prev => ({ ...prev, resumeId: newResume.id }));
            }
        } catch (error) {
            console.error('Failed to save interests:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Experiences Handlers
    // ==========================================================================
    const handleAddExperience = async () => {
        const newExp = {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            highlights: [],
        };
        try {
            const created = await createExperience(activeLang, newExp);
            setCurrentData(prev => ({
                ...prev,
                experienceRows: [...prev.experienceRows, created]
            }));
        } catch (error) {
            console.error('Failed to create experience:', error);
        }
    };

    const handleRemoveExperience = async (id: string) => {
        const numId = parseInt(id, 10);
        try {
            await deleteExperience(numId);
            setCurrentData(prev => ({
                ...prev,
                experienceRows: prev.experienceRows.filter(e => e.id !== numId)
            }));
        } catch (error) {
            console.error('Failed to delete experience:', error);
        }
    };

    const handleUpdateExperienceLocal = (id: string, field: string, value: string | boolean) => {
        const numId = parseInt(id, 10);
        setCurrentData(prev => ({
            ...prev,
            experienceRows: prev.experienceRows.map(row =>
                row.id === numId
                    ? { ...row, experience: { ...row.experience, [field]: value } }
                    : row
            )
        }));
    };

    const handleSaveExperiences = async () => {
        setSavingSection('experiences');
        try {
            await Promise.all(
                currentData.experienceRows.map(row =>
                    updateExperience(row.id, row.experience)
                )
            );
        } catch (error) {
            console.error('Failed to save experiences:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Certificates Handlers
    // ==========================================================================
    const handleAddCertificate = async () => {
        const newCert = {
            name: '',
            issuer: '',
            date: '',
            expiryDate: '',
            credentialId: '',
            url: '',
        };
        try {
            const created = await createCertificate(activeLang, newCert);
            setCurrentData(prev => ({
                ...prev,
                certificateRows: [...prev.certificateRows, created]
            }));
        } catch (error) {
            console.error('Failed to create certificate:', error);
        }
    };

    const handleRemoveCertificate = async (id: string) => {
        const numId = parseInt(id, 10);
        try {
            await deleteCertificate(numId);
            setCurrentData(prev => ({
                ...prev,
                certificateRows: prev.certificateRows.filter(c => c.id !== numId)
            }));
        } catch (error) {
            console.error('Failed to delete certificate:', error);
        }
    };

    const handleUpdateCertificateLocal = (id: string, field: string, value: string) => {
        const numId = parseInt(id, 10);
        setCurrentData(prev => ({
            ...prev,
            certificateRows: prev.certificateRows.map(row =>
                row.id === numId
                    ? { ...row, certificate: { ...row.certificate, [field]: value } }
                    : row
            )
        }));
    };

    const handleSaveCertificates = async () => {
        setSavingSection('certificates');
        try {
            await Promise.all(
                currentData.certificateRows.map(row =>
                    updateCertificate(row.id, row.certificate)
                )
            );
        } catch (error) {
            console.error('Failed to save certificates:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Projects Handlers
    // ==========================================================================
    const handleAddProject = async () => {
        const newProj = {
            name: '',
            description: '',
            technologies: [],
            startDate: '',
            endDate: '',
            url: '',
        };
        try {
            const created = await createProject(activeLang, newProj);
            setCurrentData(prev => ({
                ...prev,
                projectRows: [...prev.projectRows, created]
            }));
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const handleRemoveProject = async (id: string) => {
        const numId = parseInt(id, 10);
        try {
            await deleteProject(numId);
            setCurrentData(prev => ({
                ...prev,
                projectRows: prev.projectRows.filter(p => p.id !== numId)
            }));
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleUpdateProjectLocal = (id: string, field: string, value: string | string[]) => {
        const numId = parseInt(id, 10);
        setCurrentData(prev => ({
            ...prev,
            projectRows: prev.projectRows.map(row =>
                row.id === numId
                    ? { ...row, project: { ...row.project, [field]: value } }
                    : row
            )
        }));
    };

    const handleSaveProjects = async () => {
        setSavingSection('projects');
        try {
            await Promise.all(
                currentData.projectRows.map(row =>
                    updateProject(row.id, row.project)
                )
            );
        } catch (error) {
            console.error('Failed to save projects:', error);
        } finally {
            setSavingSection(null);
        }
    };

    // ==========================================================================
    // Render
    // ==========================================================================

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-lg text-muted-foreground">{t.loading}</p>
            </div>
        );
    }

    // Save button component for sections
    const SaveButton = ({ section, onClick }: { section: string; onClick: () => void }) => (
        <Button
            onClick={onClick}
            disabled={savingSection === section}
            size="sm"
            variant="outline"
        >
            {savingSection === section ? t.saving : t.save}
        </Button>
    );

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Language Toggle */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                    <button
                        onClick={() => setActiveLang('EN')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeLang === 'EN'
                            ? 'bg-white shadow-md text-foreground ring-2 ring-blue-500 font-bold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                            }`}
                    >
                        <span className="text-lg">🇬🇧</span>
                        <span>EN</span>
                    </button>
                    <button
                        onClick={() => setActiveLang('PL')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeLang === 'PL'
                            ? 'bg-white shadow-md text-foreground ring-2 ring-red-500 font-bold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                            }`}
                    >
                        <span className="text-lg">🇵🇱</span>
                        <span>PL</span>
                    </button>
                </div>
            </div>

            {/* Indicator for resume status */}
            {!currentData.resumeId && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md">
                    {t.noResume}
                </div>
            )}

            {/* Contact Section */}
            <ContactSection
                data={currentData.contact}
                onChange={handleContactChange}
                extraHeaderAction={<SaveButton section="contact" onClick={handleSaveContact} />}
                lang={activeLang}
            />

            {/* Experiences Section */}
            <ExperienceSection
                experiences={currentData.experienceRows.map(row => ({
                    id: String(row.id),
                    ...row.experience,
                }))}
                onAdd={handleAddExperience}
                onRemove={handleRemoveExperience}
                onUpdate={handleUpdateExperienceLocal}
                extraHeaderAction={<SaveButton section="experiences" onClick={handleSaveExperiences} />}
                lang={activeLang}
            />

            {/* Skills Section */}
            <SkillsSection
                skills={currentData.skills}
                onAdd={handleAddSkill}
                onRemove={handleRemoveSkill}
                onUpdate={handleUpdateSkill}
                extraHeaderAction={<SaveButton section="skills" onClick={handleSaveSkills} />}
                lang={activeLang}
            />

            {/* Certificates Section */}
            <CertificatesSection
                certificates={currentData.certificateRows.map(row => ({
                    id: String(row.id),
                    ...row.certificate,
                }))}
                onAdd={handleAddCertificate}
                onRemove={handleRemoveCertificate}
                onUpdate={handleUpdateCertificateLocal}
                extraHeaderAction={<SaveButton section="certificates" onClick={handleSaveCertificates} />}
                lang={activeLang}
            />

            {/* Projects Section */}
            <ProjectsSection
                projects={currentData.projectRows.map(row => ({
                    id: String(row.id),
                    ...row.project,
                }))}
                onAdd={handleAddProject}
                onRemove={handleRemoveProject}
                onUpdate={handleUpdateProjectLocal}
                extraHeaderAction={<SaveButton section="projects" onClick={handleSaveProjects} />}
                lang={activeLang}
            />

            {/* Languages Section */}
            <LanguagesSection
                languages={currentData.languages}
                onAdd={handleAddLanguage}
                onRemove={handleRemoveLanguage}
                onUpdate={handleUpdateLanguage}
                extraHeaderAction={<SaveButton section="languages" onClick={handleSaveLanguages} />}
                lang={activeLang}
            />

            {/* Interests Section */}
            <InterestsSection
                interests={currentData.interests}
                onAdd={handleAddInterest}
                onRemove={handleRemoveInterest}
                onUpdate={handleUpdateInterest}
                extraHeaderAction={<SaveButton section="interests" onClick={handleSaveInterests} />}
                lang={activeLang}
            />

            {/* Summary Section */}
            <SummarySection
                summary={currentData.summary}
                onChange={handleSummaryChange}
                extraHeaderAction={<SaveButton section="summary" onClick={handleSaveSummary} />}
                lang={activeLang}
            />
        </div>
    );
}
