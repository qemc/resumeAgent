import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import type { ResumeLang, CareerPath } from '@/types';
import {
    getCareerPaths,
    createCareerPath,
    updateCareerPath,
    deleteCareerPath,
} from '@/services/careerPaths';

/**
 * Delete Confirmation Modal Component
 */
function DeleteConfirmModal({
    isOpen,
    careerPathName,
    onConfirm,
    onCancel,
    lang,
}: {
    isOpen: boolean;
    careerPathName: string;
    onConfirm: () => void;
    onCancel: () => void;
    lang: ResumeLang;
}) {
    if (!isOpen) return null;

    const labels = {
        EN: {
            title: 'Delete Career Path',
            message: 'Are you sure you want to delete',
            warning: 'This action cannot be undone.',
            confirm: 'Delete',
            cancel: 'Cancel',
        },
        PL: {
            title: 'Usuń Ścieżkę Kariery',
            message: 'Czy na pewno chcesz usunąć',
            warning: 'Tej operacji nie można cofnąć.',
            confirm: 'Usuń',
            cancel: 'Anuluj',
        },
    };

    const t = labels[lang];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
                <h2 className="text-xl font-bold text-foreground mb-4">
                    {t.title}
                </h2>
                <p className="text-muted-foreground mb-2">
                    {t.message}:
                </p>
                <p className="font-semibold text-foreground mb-4 p-3 bg-gray-100 rounded-lg">
                    "{careerPathName}"
                </p>
                <p className="text-sm text-red-500 mb-6">
                    ⚠️ {t.warning}
                </p>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onCancel}>
                        {t.cancel}
                    </Button>
                    <Button
                        variant="ghost"
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        {t.confirm}
                    </Button>
                </div>
            </div>
        </div>
    );
}

/**
 * Career Paths Page
 * 
 * Page for managing career paths with language toggle.
 * Users can add, edit, and delete career paths.
 */
export function CareerPathsPage() {
    const [activeLang, setActiveLang] = useState<ResumeLang>('EN');
    const [isLoading, setIsLoading] = useState(true);
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [savingId, setSavingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteModalPath, setDeleteModalPath] = useState<CareerPath | null>(null);

    const pageLabels = {
        EN: {
            title: 'Career Paths',
            loading: 'Loading career paths...',
            noCareerPaths: 'No career paths yet. Click the + button to create your first one.',
            namePlaceholder: 'e.g., Data Engineering - Cloud Focus',
            descriptionPlaceholder: 'Describe your desired position in your own words. Include the type of role, key responsibilities, technologies you want to work with, industry preferences, and any other details that define your ideal career direction.',
            save: 'Save',
            saving: 'Saving...',
            cancel: 'Cancel',
            open: 'Open',
            edit: 'Edit',
            delete: 'Delete',
            addNew: 'Add Career Path',
        },
        PL: {
            title: 'Ścieżki Kariery',
            loading: 'Wczytywanie ścieżek kariery...',
            noCareerPaths: 'Brak ścieżek kariery. Kliknij + aby utworzyć pierwszą.',
            namePlaceholder: 'np. Inżynieria Danych - Fokus na Chmurę',
            descriptionPlaceholder: 'Opisz swoją wymarzoną pozycję własnymi słowami. Uwzględnij rodzaj roli, kluczowe obowiązki, technologie z którymi chcesz pracować, preferencje branżowe i inne szczegóły definiujące Twój idealny kierunek kariery.',
            save: 'Zapisz',
            saving: 'Zapisywanie...',
            cancel: 'Anuluj',
            open: 'Otwórz',
            edit: 'Edytuj',
            delete: 'Usuń',
            addNew: 'Dodaj Ścieżkę Kariery',
        }
    };

    const t = pageLabels[activeLang];

    // Load career paths when language changes
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const paths = await getCareerPaths(activeLang);
                setCareerPaths(paths);
            } catch (error) {
                console.error('Failed to load career paths:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [activeLang]);

    // Handle creating new career path
    const handleCreate = async () => {
        if (!newName.trim() || !newDescription.trim()) return;

        setSavingId(-1); // -1 indicates new form
        try {
            const created = await createCareerPath({
                resume_lang: activeLang,
                name: newName.trim(),
                description: newDescription.trim(),
            });
            setCareerPaths(prev => [...prev, created]);
            setNewName('');
            setNewDescription('');
            setShowNewForm(false);
        } catch (error) {
            console.error('Failed to create career path:', error);
        } finally {
            setSavingId(null);
        }
    };

    // Handle saving edited career path
    const handleSaveEdit = async (id: number) => {
        const path = careerPaths.find(cp => cp.id === id);
        if (!path) return;

        setSavingId(id);
        try {
            const updated = await updateCareerPath(id, {
                name: path.name,
                description: path.description
            });
            setCareerPaths(prev => prev.map(cp => cp.id === id ? updated : cp));
            setEditingId(null);
        } catch (error) {
            console.error('Failed to update career path:', error);
        } finally {
            setSavingId(null);
        }
    };

    // Handle confirming delete
    const handleConfirmDelete = async () => {
        if (!deleteModalPath) return;

        try {
            await deleteCareerPath(deleteModalPath.id);
            setCareerPaths(prev => prev.filter(cp => cp.id !== deleteModalPath.id));
        } catch (error) {
            console.error('Failed to delete career path:', error);
        } finally {
            setDeleteModalPath(null);
        }
    };

    // Handle local edit (before saving)
    const handleLocalEdit = (id: number, field: 'name' | 'description', value: string) => {
        setCareerPaths(prev => prev.map(cp =>
            cp.id === id ? { ...cp, [field]: value } : cp
        ));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-lg text-muted-foreground">{t.loading}</p>
            </div>
        );
    }

    return (
        <>
            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={!!deleteModalPath}
                careerPathName={deleteModalPath?.name || ''}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteModalPath(null)}
                lang={activeLang}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Language Toggle */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
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

                {/* Career Paths List */}
                {careerPaths.length === 0 && !showNewForm ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <p className="text-muted-foreground text-center max-w-md px-4">{t.noCareerPaths}</p>
                        <button
                            onClick={() => setShowNewForm(true)}
                            className="w-20 h-20 rounded-full bg-primary text-primary-foreground text-4xl font-light hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {careerPaths.map((path) => (
                            <Card key={path.id} className="p-6 sm:p-8">
                                {editingId === path.id ? (
                                    /* Edit Mode */
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                {activeLang === 'EN' ? 'Title' : 'Tytuł'}
                                            </label>
                                            <Input
                                                value={path.name}
                                                onChange={(e) => handleLocalEdit(path.id, 'name', e.target.value)}
                                                placeholder={t.namePlaceholder}
                                                className="text-lg font-semibold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">
                                                {activeLang === 'EN' ? 'Description' : 'Opis'}
                                            </label>
                                            <Textarea
                                                value={path.description}
                                                onChange={(e) => handleLocalEdit(path.id, 'description', e.target.value)}
                                                placeholder={t.descriptionPlaceholder}
                                                rows={6}
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-4 border-t">
                                            <Button
                                                onClick={() => handleSaveEdit(path.id)}
                                                disabled={savingId === path.id}
                                            >
                                                {savingId === path.id ? t.saving : t.save}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => setEditingId(null)}
                                            >
                                                {t.cancel}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    /* View Mode */
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">
                                            {path.name || t.namePlaceholder}
                                        </h3>
                                        <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {path.description || t.descriptionPlaceholder}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-4 border-t">
                                            <Button size="sm" variant="outline">
                                                {t.open}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setEditingId(path.id)}
                                            >
                                                {t.edit}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => setDeleteModalPath(path)}
                                            >
                                                {t.delete}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}

                        {/* New Career Path Form */}
                        {showNewForm && (
                            <Card className="p-6 sm:p-8 border-2 border-dashed border-primary/50">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            {activeLang === 'EN' ? 'Title' : 'Tytuł'}
                                        </label>
                                        <Input
                                            placeholder={t.namePlaceholder}
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="text-lg font-semibold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            {activeLang === 'EN' ? 'Description' : 'Opis'}
                                        </label>
                                        <Textarea
                                            placeholder={t.descriptionPlaceholder}
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                            rows={6}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                                        <Button
                                            onClick={handleCreate}
                                            disabled={savingId === -1 || !newName.trim() || !newDescription.trim()}
                                        >
                                            {savingId === -1 ? t.saving : t.save}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setShowNewForm(false);
                                                setNewName('');
                                                setNewDescription('');
                                            }}
                                        >
                                            {t.cancel}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Add Button */}
                        {!showNewForm && (
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={() => setShowNewForm(true)}
                                    className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-2xl font-light hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
