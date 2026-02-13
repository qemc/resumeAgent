/**
 * In-memory tracker for active AI generation tasks.
 * Survives client disconnects and page refreshes.
 * Does NOT survive server restarts (acceptable — restart kills running work anyway).
 */
const activeByUser = new Map();
function getOrCreate(userId) {
    let entry = activeByUser.get(userId);
    if (!entry) {
        entry = { generatingAllExpIds: new Set(), regeneratingTopicIds: new Set() };
        activeByUser.set(userId, entry);
    }
    return entry;
}
// ── Generate All ──
export function trackGenerateAll(userId, experienceId) {
    getOrCreate(userId).generatingAllExpIds.add(experienceId);
}
export function untrackGenerateAll(userId, experienceId) {
    const entry = activeByUser.get(userId);
    if (entry) {
        entry.generatingAllExpIds.delete(experienceId);
    }
}
// ── Regenerate Single ──
export function trackRegenerate(userId, topicId) {
    getOrCreate(userId).regeneratingTopicIds.add(topicId);
}
export function untrackRegenerate(userId, topicId) {
    const entry = activeByUser.get(userId);
    if (entry) {
        entry.regeneratingTopicIds.delete(topicId);
    }
}
// ── Status Query ──
export function getActiveGenerations(userId) {
    const entry = activeByUser.get(userId);
    if (!entry)
        return { generatingAllExpIds: [], regeneratingTopicIds: [] };
    return {
        generatingAllExpIds: [...entry.generatingAllExpIds],
        regeneratingTopicIds: [...entry.regeneratingTopicIds],
    };
}
//# sourceMappingURL=generationTracker.js.map