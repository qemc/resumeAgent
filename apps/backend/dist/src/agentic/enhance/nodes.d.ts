import { State } from "./state";
import type { resumeLanguage } from "@resume-builder/shared";
export declare function fill(state: typeof State.State): Promise<{
    userSummary: string;
    userId: number;
    resumeLang: resumeLanguage;
}>;
export declare function architect(state: typeof State.State): Promise<{
    workstreams: {
        topicName: string;
        rawQuotes: string[];
    }[];
}>;
export declare function writer(state: typeof State.State): Promise<{
    writerRedefinedTopics: {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[];
}>;
export declare function saver(state: typeof State.State): Promise<{
    operationStatus: string;
    error?: undefined;
} | {
    operationStatus: string;
    error: string;
}>;
//# sourceMappingURL=nodes.d.ts.map