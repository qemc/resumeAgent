import { workstreamSchema, writerRedefinedTopicSchema } from "../agentic/enhance/state";
import z from "zod";
export type AgentStatus = 'success' | 'failed' | 'init';
export type Workstream = z.infer<typeof workstreamSchema>;
export type WriterRedefinedTopic = z.infer<typeof writerRedefinedTopicSchema>;
export type CareerPath = {
    name: string;
    description: string;
};
export type Topic = {
    topic: string;
    preTopic: WriterRedefinedTopic;
};
//# sourceMappingURL=agent.d.ts.map