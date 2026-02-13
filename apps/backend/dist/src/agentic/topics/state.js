import { Annotation } from "@langchain/langgraph";
export const State = Annotation.Root({
    expId: Annotation(),
    careerPathId: Annotation(),
    writerRedefinedTopics: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => []
    }),
    careerPath: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => ({ name: '', description: '' })
    }),
    careerPathTopics: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => []
    }),
    operationStatus: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => 'init'
    }),
    resumeLang: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => 'EN'
    }),
    error: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => undefined
    })
});
//# sourceMappingURL=state.js.map