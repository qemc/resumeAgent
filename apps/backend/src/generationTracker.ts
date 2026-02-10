/**
 * In-memory tracker for active AI generation tasks.
 * Survives client disconnects and page refreshes.
 * Does NOT survive server restarts (acceptable — restart kills running work anyway).
 */

interface ActiveGenerations {
    generatingAllExpIds: Set<number>;
    regeneratingTopicIds: Set<number>;
}

const activeByUser = new Map<number, ActiveGenerations>();

function getOrCreate(userId: number): ActiveGenerations {
    let entry = activeByUser.get(userId);
    if (!entry) {
        entry = { generatingAllExpIds: new Set(), regeneratingTopicIds: new Set() };
        activeByUser.set(userId, entry);
    }
    return entry;
}

// ── Generate All ──

export function trackGenerateAll(userId: number, experienceId: number) {
    getOrCreate(userId).generatingAllExpIds.add(experienceId);
}

export function untrackGenerateAll(userId: number, experienceId: number) {
    const entry = activeByUser.get(userId);
    if (entry) {
        entry.generatingAllExpIds.delete(experienceId);
    }
}

// ── Regenerate Single ──

export function trackRegenerate(userId: number, topicId: number) {
    getOrCreate(userId).regeneratingTopicIds.add(topicId);
}

export function untrackRegenerate(userId: number, topicId: number) {
    const entry = activeByUser.get(userId);
    if (entry) {
        entry.regeneratingTopicIds.delete(topicId);
    }
}

// ── Status Query ──

export function getActiveGenerations(userId: number): {
    generatingAllExpIds: number[];
    regeneratingTopicIds: number[];
} {
    const entry = activeByUser.get(userId);
    if (!entry) return { generatingAllExpIds: [], regeneratingTopicIds: [] };
    return {
        generatingAllExpIds: [...entry.generatingAllExpIds],
        regeneratingTopicIds: [...entry.regeneratingTopicIds],
    };
}
