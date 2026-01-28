import {
    StateGraph,
    START,
    END
} from "@langchain/langgraph";
import { State } from "./state";
import {
    architect
} from "./nodes";


const workflow = new StateGraph(State)
    .addNode('architect', architect)

    .addEdge(START, 'architect')
    .addEdge('architect', END)

export const enhanceAgent = workflow.compile()