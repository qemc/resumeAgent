export declare const topicsAgent: import("@langchain/langgraph").CompiledStateGraph<{
    expId: number;
    careerPathId: number;
    writerRedefinedTopics: {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[];
    careerPath: import("../../types/agent").CareerPath;
    careerPathTopics: import("../../types/agent").Topic[];
    operationStatus: import("../../types/agent").AgentStatus;
    resumeLang: import("@resume-builder/shared").resumeLanguage;
    error: string;
}, {
    expId?: number;
    careerPathId?: number;
    writerRedefinedTopics?: {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[];
    careerPath?: import("../../types/agent").CareerPath;
    careerPathTopics?: import("../../types/agent").Topic[];
    operationStatus?: import("../../types/agent").AgentStatus;
    resumeLang?: import("@resume-builder/shared").resumeLanguage;
    error?: string;
}, "topics" | "check" | "__start__" | "unify", {
    expId: import("@langchain/langgraph").LastValue<number>;
    careerPathId: import("@langchain/langgraph").LastValue<number>;
    writerRedefinedTopics: import("@langchain/langgraph").BinaryOperatorAggregate<{
        redefinedTopic: string;
        refinedQuotes: string[];
    }[], {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[]>;
    careerPath: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").CareerPath, import("../../types/agent").CareerPath>;
    careerPathTopics: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").Topic[], import("../../types/agent").Topic[]>;
    operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").AgentStatus, import("../../types/agent").AgentStatus>;
    resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<import("@resume-builder/shared").resumeLanguage, import("@resume-builder/shared").resumeLanguage>;
    error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}, {
    expId: import("@langchain/langgraph").LastValue<number>;
    careerPathId: import("@langchain/langgraph").LastValue<number>;
    writerRedefinedTopics: import("@langchain/langgraph").BinaryOperatorAggregate<{
        redefinedTopic: string;
        refinedQuotes: string[];
    }[], {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[]>;
    careerPath: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").CareerPath, import("../../types/agent").CareerPath>;
    careerPathTopics: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").Topic[], import("../../types/agent").Topic[]>;
    operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<import("../../types/agent").AgentStatus, import("../../types/agent").AgentStatus>;
    resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<import("@resume-builder/shared").resumeLanguage, import("@resume-builder/shared").resumeLanguage>;
    error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}, import("@langchain/langgraph").StateDefinition, {
    check: {
        writerRedefinedTopics: {
            redefinedTopic: string;
            refinedQuotes: string[];
        }[];
        careerPath: import("../../types/agent").CareerPath;
        resumeLang: import("@resume-builder/shared").resumeLanguage;
    };
    topics: {
        careerPathTopics: import("../../types/agent").Topic[];
    };
    unify: {
        careerPathTopics: import("../../types/agent").Topic[];
    };
}, unknown, unknown>;
//# sourceMappingURL=topics.d.ts.map