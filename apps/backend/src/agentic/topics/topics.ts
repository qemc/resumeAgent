import {
    StateGraph,
    START,
    END
} from "@langchain/langgraph";
import { State } from "./state";
import {
    checkAiEnhancedExperience,
    testNode
} from "./nodes";


const workflow = new StateGraph(State)
    .addNode('check', checkAiEnhancedExperience)
    .addNode('test', testNode)

    .addEdge(START, 'check')
    .addEdge('check', 'test')
    .addEdge('test', END)

export const topicsAgent = workflow.compile()