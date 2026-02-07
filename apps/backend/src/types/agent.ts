import {
    workstreamSchema,
    writerRedefinedTopicSchema
} from "../agentic/enhance/state";
import z from "zod";
import type { CareerPathsDb } from "../db/schema";

// COMMON
export type AgentStatus = 'success' | 'failed' | 'init';

// ENHANCE
export type Workstream = z.infer<typeof workstreamSchema>
export type WriterRedefinedTopic = z.infer<typeof writerRedefinedTopicSchema>

// TOPICS
export type CareerPath = {
    name: string,
    description: string
}
export type Topic = {
    topic: string,
    preTopic: WriterRedefinedTopic
}