export declare const enhanceAgent: import("@langchain/langgraph").CompiledStateGraph<{
    userSummary: string;
    workstreams: {
        topicName: string;
        rawQuotes: string[];
    }[];
    writerRedefinedTopics: {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[];
    expId: number;
    userId: number;
    resumeLang: import("@resume-builder/shared").resumeLanguage;
    operationStatus: import("../../types/agent").AgentStatus;
    error: string;
}, {
    userSummary?: string;
    workstreams?: {
        topicName: string;
        rawQuotes: string[];
    }[];
    writerRedefinedTopics?: {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[];
    expId?: number;
    userId?: number;
    resumeLang?: import("@resume-builder/shared").resumeLanguage;
    operationStatus?: import("../../types/agent").AgentStatus;
    error?: string;
}, "fill" | "__start__" | "architect" | "writer" | "saver", {
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
    resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<import("@resume-builder/shared").resumeLanguage, import("@resume-builder/shared").resumeLanguage>;
    operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").AgentStatus, import("../../types/agent").AgentStatus>;
    error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}, {
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
    resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<import("@resume-builder/shared").resumeLanguage, import("@resume-builder/shared").resumeLanguage>;
    operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").AgentStatus, import("../../types/agent").AgentStatus>;
    error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}, import("@langchain/langgraph").StateDefinition, {
    fill: {
        userSummary: string;
        userId: number;
        resumeLang: import("@resume-builder/shared").resumeLanguage;
    };
    architect: {
        workstreams: {
            topicName: string;
            rawQuotes: string[];
        }[];
    };
    writer: {
        writerRedefinedTopics: {
            redefinedTopic: string;
            refinedQuotes: string[];
        }[];
    };
    saver: import("@langchain/langgraph").UpdateType<{
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
        resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<import("@resume-builder/shared").resumeLanguage, import("@resume-builder/shared").resumeLanguage>;
        operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").AgentStatus, import("../../types/agent").AgentStatus>;
        error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
    }>;
}, unknown, unknown>;
//# sourceMappingURL=enhance.d.ts.map