import { Annotation } from "@langchain/langgraph";
import z from "zod";


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
    error: Annotation<undefined | string>({
        reducer: (x, y) => y ?? x,
        default: () => undefined
    })
})


// ARCHITECT
export const workstreamSchema = z.object({
    topicName: z.string().describe('description'),
    rawQuotes: z.array(z.string()).describe('description')
})

export type Workstream = z.infer<typeof workstreamSchema>

export const architectOutput = z.object({
    workstreams: z.array(workstreamSchema).describe('description')
})

