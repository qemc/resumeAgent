import {
    StateGraph,
    START,
    END
} from "@langchain/langgraph";
import { State } from "./state";
import {
    checkAiEnhancedExperience,
    generateTopics
} from "./nodes";


const workflow = new StateGraph(State)
    .addNode('check', checkAiEnhancedExperience)
    .addNode('topics', generateTopics)
    .addEdge(START, 'check')
    .addEdge('check', 'topics')
    .addEdge('topics', END)

export const topicsAgent = workflow.compile()