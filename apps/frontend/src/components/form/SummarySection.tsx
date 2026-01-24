import { Card } from '@/components/ui';
import { Textarea } from '@/components/ui';

interface SummarySectionProps {
    summary: string;
    onChange: (value: string) => void;
    extraHeaderAction?: React.ReactNode;
    lang: 'EN' | 'PL';
}

export const SummarySection = ({ summary, onChange, extraHeaderAction, lang }: SummarySectionProps) => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        {lang === 'EN' ? 'Professional Summary' : 'Podsumowanie Zawodowe'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {lang === 'EN'
                            ? 'A brief overview of your professional background and goals.'
                            : 'Krótki opis Twojego doświadczenia zawodowego i celów.'}
                    </p>
                </div>
                {extraHeaderAction}
            </div>

            <div className="space-y-4">
                <Textarea
                    value={summary}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={lang === 'EN'
                        ? 'Write a professional summary...'
                        : 'Napisz podsumowanie zawodowe...'}
                    className="min-h-[150px]"
                />
            </div>
        </Card>
    );
};
