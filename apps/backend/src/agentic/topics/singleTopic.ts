import type { WriterRedefinedTopic } from "../../types/agent";
import z from "zod";
import { oai5_1 } from "../models";
import { singleTopicPrompt } from "./prompts";

const singleTopicStructuredOutput = z.object({
    strategy_and_reasoning: z.string().describe(
        `Step-by-step reasoning. Identify the specific skills in the raw input that match the target persona. Explicitly state which 'hyperbolic' words you will avoid.`
    ),
    final_bullet_point: z.string().describe(
        `The final, polished, and grounded bullet point (1-2 sentences max).`
    )
})

const oai5_1_so_topicCOT = oai5_1.withStructuredOutput(singleTopicStructuredOutput)

export async function generateSingleTopic(careerPathDescription: string, writerRedefinedTopic: WriterRedefinedTopic, userComment: string = '') {

    let userCommentAdjusted = userComment
    if (userComment.length > 0) {
        userCommentAdjusted = `User hint:\n${userComment}`
    }

    const chain = singleTopicPrompt.pipe(oai5_1_so_topicCOT)
    const result = await chain.invoke({
        topicName: writerRedefinedTopic.redefinedTopic,
        topicDescription: writerRedefinedTopic.refinedQuotes.join('\n'),
        careerPathDescription: careerPathDescription,
        userHint: userCommentAdjusted
    })

    return result.final_bullet_point
}