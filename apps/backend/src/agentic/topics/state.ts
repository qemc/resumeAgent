import { Annotation } from "@langchain/langgraph";
import type { WriterRedefinedTopic } from "../enhance/state";
import type { AgentStatus } from "../../types/agent";
import type { resumeLanguage } from "@resume-builder/shared";


export const State = Annotation.Root({
    writerRedefinedTopics: Annotation<WriterRedefinedTopic[]>({
        reducer: (x, y) => y ?? x,
        default: () => []
    }),
    careerPathUser: Annotation<string>({
        reducer: (x, y) => y ?? x,
        default: () => ''
    }),
    careerPathTopics: Annotation<string[]>({
        reducer: (x, y) => y ?? x,
        default: () => []
    }),
    expId: Annotation<number>(),
    careerPathId: Annotation<number>(),
    operationStatus: Annotation<AgentStatus>({
        reducer: (x, y) => y ?? x,
        default: () => 'init'
    }),
    resumeLang: Annotation<resumeLanguage>({
        reducer: (x, y) => y ?? x,
        default: () => 'EN'
    }),
    error: Annotation<undefined | string>({
        reducer: (x, y) => y ?? x,
        default: () => undefined
    })
})