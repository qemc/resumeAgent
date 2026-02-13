import { State } from './state';
import type { resumeLanguage } from '@resume-builder/shared';
import type { CareerPath, Topic } from '../../types/agent';
export declare function checkAiEnhancedExperience(state: typeof State.State): Promise<{
    writerRedefinedTopics: {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[];
    careerPath: CareerPath;
    resumeLang: resumeLanguage;
}>;
export declare function generateTopics(state: typeof State.State): Promise<{
    careerPathTopics: Topic[];
}>;
export declare function unifyText(state: typeof State.State): Promise<{
    careerPathTopics: Topic[];
}>;
//# sourceMappingURL=nodes.d.ts.map