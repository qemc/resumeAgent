/**
 * In-memory tracker for active AI generation tasks.
 * Survives client disconnects and page refreshes.
 * Does NOT survive server restarts (acceptable — restart kills running work anyway).
 */
export declare function trackGenerateAll(userId: number, experienceId: number): void;
export declare function untrackGenerateAll(userId: number, experienceId: number): void;
export declare function trackRegenerate(userId: number, topicId: number): void;
export declare function untrackRegenerate(userId: number, topicId: number): void;
export declare function getActiveGenerations(userId: number): {
    generatingAllExpIds: number[];
    regeneratingTopicIds: number[];
};
//# sourceMappingURL=generationTracker.d.ts.map