import {
    StateGraph,
    START,
    END
} from "@langchain/langgraph";
import { State } from "./state";
import {
    architect,
    saver,
    writer
} from "./nodes";


const workflow = new StateGraph(State)
    .addNode('architect', architect)
    .addNode('writer', writer)
    .addNode('saver', saver)
    .addEdge(START, 'architect')
    .addEdge('architect', 'writer')
    .addEdge('writer', 'saver')
    .addEdge('saver', END)

export const enhanceAgent = workflow.compile()





// can be later on a part of the whole application


// list all main topics for this experience
// Focus on what user was doing and  


// Architecht
// the task needs to meet those:


// If this is excplictly highlighted by the user 
// It produces something
// It was not a one afternoon task

// identify the responsibility of the user 
// 

// Writer (what architect decide)


// Editior


// You are the ARCHITECT of a resume reconstruction pipeline.
// Your job is to read raw job experience text and CLUSTER it into 3-5 distinct "Work Streams" or "Initiatives".

// ### THE FILTERING CRITERIA
// You must only create a Work Stream if the work meets at least 2 of these 3 conditions:
// 1.  **Highlight Rule:** The user devoted significant text (e.g., a full paragraph) to describing it.
// 2.  **Artifact Rule:** It produced a tangible result (e.g., a System, a UI, a Pipeline, a Documented Process).
// 3.  **Duration Rule:** It was a sustained effort, not a "one afternoon task" or a trivial bug fix.

// ### INSTRUCTIONS:
// 1.  Scan the input text.
// 2.  Identify distinct projects or areas of responsibility.
// 3.  Check each against the Criteria above.
// 4.  Group the *exact raw sentences* from the text into these clusters.
// 5.  Ignore trivial details that do not fit these clusters.

// ### OUTPUT:
// Return a JSON object matching the 'ArchitectBlueprint' schema.
// ensure 'raw_quotes' contains only text copied directly from the source.