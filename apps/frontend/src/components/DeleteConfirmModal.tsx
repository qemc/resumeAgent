import { Button } from '@/components/ui';
import type { ResumeLang } from '@/types';

/**
 * Delete Confirmation Modal Component
 * Reusable confirmation dialog for destructive actions.
 */
export function DeleteConfirmModal({
    isOpen,
    itemName,
    onConfirm,
    onCancel,
    lang,
}: {
    isOpen: boolean;
    itemName: string;
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
                    "{itemName}"
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
