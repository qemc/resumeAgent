import z from "zod";
import { oai5nano } from "../models";
import { singleTopicPromptEn, singleTopicPromptPl, single_topic_reason_en, single_topic_reason_pl, bullet_point_en, bullet_point_pl } from "./prompts";
export async function generateSingleTopic(careerPath, writerRedefinedTopic, lang, userComment = '', previousItem = '') {
    let outputDsc_strategy_and_reasoning = single_topic_reason_en;
    let outputDsc_final_bullet_point = bullet_point_en;
    let singleTopicPrompt = singleTopicPromptEn;
    let userCommentAdjusted = userComment;
    let previousItemAdjusted = previousItem;
    if (userComment.length > 0) {
        userCommentAdjusted = `User hint:\n${userComment}`;
    }
    if (previousItem.length > 0) {
        previousItemAdjusted = `Previous item:\n${previousItem}`;
    }
    if (lang !== 'EN') {
        outputDsc_strategy_and_reasoning = single_topic_reason_pl;
        outputDsc_final_bullet_point = bullet_point_pl;
        singleTopicPrompt = singleTopicPromptPl;
        if (userComment.length > 0) {
            userCommentAdjusted = `Wskazówka uzytkownika:\n${userComment}`;
        }
        if (previousItem.length > 0) {
            previousItemAdjusted = `Wcześniej wygenerowany temat:\n${previousItem}`;
        }
    }
    const singleTopicStructuredOutput = z.object({
        strategy_and_reasoning: z.string().describe(outputDsc_strategy_and_reasoning),
        final_bullet_point: z.string().describe(outputDsc_final_bullet_point)
    });
    const topicModel = oai5nano.withStructuredOutput(singleTopicStructuredOutput);
    const chain = singleTopicPrompt.pipe(topicModel);
    const result = await chain.invoke({
        topicName: writerRedefinedTopic.redefinedTopic,
        topicDescription: writerRedefinedTopic.refinedQuotes.join('\n'),
        careerPathName: careerPath.name,
        careerPathDescription: careerPath.description,
        userHint: userCommentAdjusted,
        previousItem: previousItemAdjusted
    });
    const finalTopic = {
        topic: result.final_bullet_point,
        preTopic: writerRedefinedTopic
    };
    return finalTopic;
}
//# sourceMappingURL=singleTopic.js.map