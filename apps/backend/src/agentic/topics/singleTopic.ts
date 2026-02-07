import type {
    CareerPath,
    WriterRedefinedTopic,
    Topic,
} from "../../types/agent";
import z from "zod";
import { oai5_1, oai5nano } from "../models";
import { singleTopicPrompt } from "./prompts";
import type { resumeLanguage } from "@resume-builder/shared";



export async function generateSingleTopic(careerPath: CareerPath, writerRedefinedTopic: WriterRedefinedTopic, lang: resumeLanguage, userComment: string = '') {

    let outputDsc_strategy_and_reasoning = ''
    let outputDsc_final_bullet_point = ''

    if (lang === 'EN') {

        outputDsc_strategy_and_reasoning = `Step-by-step reasoning. Identify the specific skills in the raw input that match the target persona. Explicitly state which 'hyperbolic' words you will avoid.`

        outputDsc_final_bullet_point = `The final, polished, and grounded bullet point (1-2 sentences max).`
    } else {

        outputDsc_strategy_and_reasoning = `Rozumowanie krok po kroku. Zidentyfikuj w tekście źródłowym konkretne umiejętności, które pasują do docelowej persony. Wyraźnie określ, których „hiperbolicznych” słów zamierzasz unikać.`

        outputDsc_final_bullet_point = `Ostateczny, dopracowany i rzeczowy punkt listy (maksymalnie 1-2 zdania).`
    }

    const singleTopicStructuredOutput = z.object({

        strategy_and_reasoning: z.string().describe(outputDsc_strategy_and_reasoning),
        final_bullet_point: z.string().describe(outputDsc_final_bullet_point)
    })

    // to be changed
    const oai5_1_so_topicCOT = oai5nano.withStructuredOutput(singleTopicStructuredOutput)

    let userCommentAdjusted = userComment

    if (userComment.length > 0) {
        userCommentAdjusted = `User hint:\n${userComment}`
    }

    const chain = singleTopicPrompt.pipe(oai5_1_so_topicCOT)
    const result = await chain.invoke({
        topicName: writerRedefinedTopic.redefinedTopic,
        topicDescription: writerRedefinedTopic.refinedQuotes.join('\n'),
        careerPathName: careerPath.name,
        careerPathDescription: careerPath.description,
        userHint: userCommentAdjusted
    })

    const finalTopic: Topic = {
        topic: result.final_bullet_point,
        preTopic: writerRedefinedTopic
    }

    return finalTopic
}