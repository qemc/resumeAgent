import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";


export const State = Annotation.Root({
    userSummary: Annotation<string>(),
    experienceId: Annotation<number>()
})