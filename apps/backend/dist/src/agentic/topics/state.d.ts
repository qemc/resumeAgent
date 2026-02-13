import type { AgentStatus, CareerPath, Topic } from "../../types/agent";
import type { resumeLanguage } from "@resume-builder/shared";
export declare const State: import("@langchain/langgraph").AnnotationRoot<{
    expId: import("@langchain/langgraph").LastValue<number>;
    careerPathId: import("@langchain/langgraph").LastValue<number>;
    writerRedefinedTopics: import("@langchain/langgraph").BinaryOperatorAggregate<{
        redefinedTopic: string;
        refinedQuotes: string[];
    }[], {
        redefinedTopic: string;
        refinedQuotes: string[];
    }[]>;
    careerPath: import("@langchain/langgraph").BinaryOperatorAggregate<CareerPath, CareerPath>;
    careerPathTopics: import("@langchain/langgraph").BinaryOperatorAggregate<Topic[], Topic[]>;
    operationStatus: import("@langchain/langgraph").BinaryOperatorAggregate<AgentStatus, AgentStatus>;
    resumeLang: import("@langchain/langgraph").BinaryOperatorAggregate<resumeLanguage, resumeLanguage>;
    error: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}>;
//# sourceMappingURL=state.d.ts.map