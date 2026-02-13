import { StateGraph, START, END } from "@langchain/langgraph";
import { State } from "./state";
import { checkAiEnhancedExperience, generateTopics, unifyText } from "./nodes";
const workflow = new StateGraph(State)
    .addNode('check', checkAiEnhancedExperience)
    .addNode('topics', generateTopics)
    .addNode('unify', unifyText)
    .addEdge(START, 'check')
    .addEdge('check', 'topics')
    .addEdge('topics', 'unify')
    .addEdge('unify', END);
export const topicsAgent = workflow.compile();
//# sourceMappingURL=topics.js.map