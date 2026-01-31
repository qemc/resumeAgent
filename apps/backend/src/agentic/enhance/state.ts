import { Annotation } from "@langchain/langgraph";
import z from "zod";
import type { resumeLanguage } from "@resume-builder/shared";
import type { AgentStatus } from "../../types/agent";


// state
export const State = Annotation.Root({
    userSummary: Annotation<string>(),
    workstreams: Annotation<Workstream[]>(),
    writerRedefinedTopics: Annotation<WriterRedefinedTopic[]>(),
    expId: Annotation<number>(),
    userId: Annotation<number>(),
    resumeLang: Annotation<resumeLanguage>(),
    operationStatus: Annotation<AgentStatus>(),
    error: Annotation<undefined | string>()
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
