import { Annotation } from "@langchain/langgraph";
import z from "zod";
import type { resumeLanguage } from "@resume-builder/shared";
import type { AgentStatus } from "../../types/agent";


// state
export const State = Annotation.Root({
    userSummary: Annotation<string>({
        reducer: (x, y) => y ?? x,
        default: () => ''
    }),
    workstreams: Annotation<Workstream[]>({
        reducer: (x, y) => y ?? x,
        default: () => []
    }),
    writerRedefinedTopics: Annotation<WriterRedefinedTopic[]>({
        reducer: (x, y) => y ?? x,
        default: () => []
    }),
    expId: Annotation<number>(),
    userId: Annotation<number>({
        reducer: (x, y) => y ?? x,
        default: () => 1
    }),
    resumeLang: Annotation<resumeLanguage>({
        reducer: (x, y) => y ?? x,
        default: () => 'EN'
    }),
    operationStatus: Annotation<AgentStatus>({
        reducer: (x, y) => y ?? x,
        default: () => 'init'
    }),
    error: Annotation<undefined | string>({
        reducer: (x, y) => y ?? x,
        default: () => undefined
    })
})


// ARCHITECT
export const workstreamSchema = z.object({
    topicName: z.string().describe('The single sentence or two that describes the workstream'),
    rawQuotes: z.array(z.string()).describe('A raw quote that proves the workstream existance.')
})
export type Workstream = z.infer<typeof workstreamSchema>

export const architectOutput = z.object({
    workstreams: z.array(workstreamSchema).describe("An array of all workstreams found in the user experience")
})

//WRITER
export const writerRedefinedTopic = z.object({
    redefinedTopic: z.string().describe('A redefined topic name'),
    refinedQuotes: z.array(z.string()).describe('An array of refined quotes')
})
export type WriterRedefinedTopic = z.infer<typeof workstreamSchema>
