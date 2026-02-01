import {
    workstreamSchema,
    writerRedefinedTopicSchema
} from "../agentic/enhance/state";
import z from "zod";

// COMMON
export type AgentStatus = 'success' | 'failed' | 'init';

// ENHANCE
export type Workstream = z.infer<typeof workstreamSchema>
export type WriterRedefinedTopicChat = z.infer<typeof writerRedefinedTopicSchema>
export type WriterRedefinedTopic = WriterRedefinedTopicChat & {
    id: number
}
