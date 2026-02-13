import { State } from './state';
import {
    getAiEnhancedExperience,
    getCareerPath,
    getExperience,
    updateAiEnhanceLastUpdate
} from '../utils';
import {
    unifyPromptEn,
    unifyPromptPl,
    unify_strategy_and_reasoning_en,
    unify_strategy_and_reasoning_pl,
    refined_topic_en,
    refined_topic_pl,
    original_id_en,
    original_id_pl,
    checkEnhanceAccuracyPromptEn,
    checkEnhanceAccuracyPromptPl,
    check_update_en,
    check_update_pl
} from './prompts';
import {
    oai5nano,
    oai5_1
} from '../models';
import { enhanceAgent } from '../enhance/enhance';
import type { resumeLanguage } from '@resume-builder/shared';
import { generateSingleTopic } from './singleTopic';
import z from 'zod';
import { AppError, ERRORS } from '../../../utils/errors';
import type { CareerPath, Topic } from '../../types/agent';

const unify_model = oai5nano
const check_update_model = oai5nano // Remains the cheapest one

export async function checkAiEnhancedExperience(state: typeof State.State) {

    // Career path description handling
    const careerPathId = state.careerPathId

    const careerPathDb = await getCareerPath(careerPathId)

    const resumeLang: resumeLanguage = careerPathDb.resume_lang as resumeLanguage

    const careerPath = {
        name: careerPathDb.name,
        description: careerPathDb.description
    } as CareerPath


    // Experience description handling
    const expId = state.expId

    const existingEnhance = await getAiEnhancedExperience(expId)
    const exisitingExp = await getExperience(expId)

    let redefinedTopics = existingEnhance?.experience

    if (!redefinedTopics) {
        redefinedTopics = (await enhanceAgent.invoke({
            expId: expId,
        })).writerRedefinedTopics
    }

    const lastUpdateEnhance = existingEnhance?.updatedAt
    const lastUpdateExp = exisitingExp?.updatedAt



    if (redefinedTopics && existingEnhance && (lastUpdateEnhance < lastUpdateExp)) {

        let checkUpdateOutputDsc = check_update_en
        let checkUpdatePrompt = checkEnhanceAccuracyPromptEn

        if (resumeLang !== 'EN') {
            checkUpdateOutputDsc = check_update_pl
            checkUpdatePrompt = checkEnhanceAccuracyPromptPl
        }

        const checkStructuredOutput = z.object({
            checkResult: z.boolean().describe(checkUpdateOutputDsc)
        })

        const check_update_so_llm = check_update_model.withStructuredOutput(checkStructuredOutput)

        const checkChain = checkUpdatePrompt.pipe(check_update_so_llm)

        const result = await checkChain.invoke({
            enhanced: existingEnhance.experience.map((item) => {
                const redefinedTopic = item.redefinedTopic
                const redefinedQuotes = item.refinedQuotes.join('\n')

                const finalString = [redefinedTopic, redefinedQuotes].join('\n')

                return finalString
            }).join('\n'),
            user: exisitingExp.experience.description
        })


        if (result.checkResult) {

            redefinedTopics = (await enhanceAgent.invoke({
                expId: expId,
            })).writerRedefinedTopics

            console.dir(`Enhance check executed successfully - True: ${result.checkResult}`, { depth: null })

        } else {
            console.dir(`Enhance check executed successfully - False: ${result.checkResult}`, { depth: null })
            // updating last check date
            try {
                await updateAiEnhanceLastUpdate(expId)
            } catch (error) {
                throw new AppError(ERRORS.AI_ERROR)
            }
        }
    }

    return {
        writerRedefinedTopics: redefinedTopics,
        careerPath: careerPath,
        resumeLang: resumeLang
    }
}

export async function generateTopics(state: typeof State.State) {

    const preTopics = state.writerRedefinedTopics
    const careerPath = state.careerPath
    const lang = state.resumeLang

    const topics = preTopics.map((item) => {
        return generateSingleTopic(careerPath, item, lang)
    })

    const result = await Promise.all(topics)
    return {
        careerPathTopics: result
    }
}

export async function unifyText(state: typeof State.State) {

    const lang = state.resumeLang;
    let allTopics = state.careerPathTopics.map((item, index) => {
        return `[ID: ${index}] Topic ${index}: ${item.topic}`
    }).join('\n')

    let prompt = unifyPromptEn
    let outputDsc_strategy_and_reasoning = unify_strategy_and_reasoning_en
    let outputDsc_refinedTopic = refined_topic_en
    let outputDsc_original_id = original_id_en

    if (lang !== 'EN') {

        allTopics = state.careerPathTopics.map((item, index) => {
            return `[ID: ${index}] Temat ${index}: ${item.topic}`
        }).join('\n')
        prompt = unifyPromptPl

        outputDsc_strategy_and_reasoning = unify_strategy_and_reasoning_pl
        outputDsc_refinedTopic = refined_topic_pl
        outputDsc_original_id = original_id_pl
    }

    const unifyStructuredOutput = z.object({

        strategy_and_reasoning: z.string().describe(outputDsc_strategy_and_reasoning),

        topics: z.array(z.object({
            original_id: z.number().describe(outputDsc_original_id),
            redefined_topic: z.string().describe(outputDsc_refinedTopic)
        })
        )
    })

    const llm_structured_output = unify_model.withStructuredOutput(unifyStructuredOutput)

    const chain = prompt.pipe(llm_structured_output)
    const result = await chain.invoke({
        topics: allTopics
    })

    if (result.topics.length !== state.careerPathTopics.length) throw new AppError(ERRORS.AI_ERROR, `Unify node error: returned topics list length is not equal to the initial topics list length. Initial topics list length: ${state.careerPathTopics.length}, Lenght of list returned by LLM: ${result.topics.length}`)

    const finalTopics = result.topics.map((item) => {
        const topic: Topic = {
            topic: item.redefined_topic,
            preTopic: state.careerPathTopics[item.original_id].preTopic
        }
        return topic
    })

    return {
        careerPathTopics: finalTopics
    }
}


