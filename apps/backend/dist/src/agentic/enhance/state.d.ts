import z from "zod";
import type { resumeLanguage } from "@resume-builder/shared";
import type { AgentStatus } from "../../types/agent";
export declare const State: import("@langchain/langgraph").AnnotationRoot<{
    userSummary: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
    workstreams: import("@langchain/langgraph").BinaryOperatorAggregate<{
        topicName: string;
        rawQuotes: string[];
    }[], {
        topicName: string;
        rawQuotes: string[];
    }[]>;
    writerRedefinedTopics: import("@langchain/langgraph").BinaryOperatorAggregate<{
        redefinedTopic: string;
        refinedQuotes: string[];
    }[], {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[]>;
    expId: import("@langchain/langgraph").LastValue<number>;
    userId: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<resumeLanguage, resumeLanguage>;
    operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<AgentStatus, AgentStatus>;
    error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}>;
export declare const workstreamSchema: z.ZodObject<{
    topicName: z.ZodString;
    rawQuotes: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const architectOutput: z.ZodObject<{
    workstreams: z.ZodArray<z.ZodObject<{
        topicName: z.ZodString;
        rawQuotes: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const writerRedefinedTopicSchema: z.ZodObject<{
    redefinedTopic: z.ZodString;
    refinedQuotes: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=state.d.ts.map