import { Annotation } from "@langchain/langgraph";
import z from "zod";


// state
export const State = Annotation.Root({
    userSummary: Annotation<string>(),
    workstreams: Annotation<Workstream[]>()
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