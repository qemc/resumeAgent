import { State } from "./state";
import { oai5nano } from "../models";
import {
    architectOutput,
    writerRedefinedTopicSchema
} from "./state";
import {
    architectPromptEn,
    architectPromptPl,
    processSingleWorkstreamPromptEn,
    processSingleWorkstreamPromptPl
} from "./prompts";
import {
    upsertAiEnhancedExperience,
    getExperience
} from "../utils";
import type { resumeLanguage } from "@resume-builder/shared";
import type { WriterRedefinedTopic } from "../../types/agent";

const oai5nano_so_architect = oai5nano.withStructuredOutput(architectOutput)
const oai5nano_so_writer = oai5nano.withStructuredOutput(writerRedefinedTopicSchema)

export async function fill(state: typeof State.State) {

    const expId = state.expId
    const rawExperience = await getExperience(expId)

    return {
        userSummary: rawExperience.experience.description,
        userId: rawExperience.user_id,
        resumeLang: rawExperience.resume_lang as resumeLanguage,
    }
}

export async function architect(state: typeof State.State) {

    let architectPrompt = architectPromptEn
    if (state.resumeLang !== 'EN') architectPrompt = architectPromptPl

    const userSum = state.userSummary
    const resultChain = architectPrompt.pipe(oai5nano_so_architect)

    const result = await resultChain.invoke({
        raw_text: userSum
    })

    return {
        workstreams: result.workstreams
    }
}

export async function writer(state: typeof State.State) {

    let processSingleWorkstreamPrompt = processSingleWorkstreamPromptEn
    if (state.resumeLang !== 'EN') processSingleWorkstreamPrompt = processSingleWorkstreamPromptPl


    const workstreams = state.workstreams

    const resultsToBe = workstreams.map(async (workstream) => {

        const chain = processSingleWorkstreamPrompt.pipe(oai5nano_so_writer)

        const topic = workstream.topicName
        const rawQuotes = workstream.rawQuotes.map((quote) => {
            return `-${quote}`
        }).join('\n')

        return chain.invoke({
            topic: topic,
            rawQuotes: rawQuotes
        })
    })

    const results = await Promise.all(resultsToBe)
    return {
        writerRedefinedTopics: results
    }
}

export async function saver(state: typeof State.State) {

    try {
        const result = await upsertAiEnhancedExperience(
            state.writerRedefinedTopics,
            state.userId,
            state.expId,
            state.resumeLang,
        )
        return {
            operationStatus: 'success'
        }
    } catch (error) {
        return {
            operationStatus: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}
