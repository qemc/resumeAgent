import { State } from "./state";
import {
    oai5_1,
    oai5mini,
    oai4omini,
    oai5nano
} from "../models";
import {
    architectOutput,
    writerRedefinedTopicSchema
} from "./state";
import {
    architectPrompt,
    processSingleWorkstreamPrompt
} from "./prompts";
import {
    upsertAiEnhancedExperience,
    getExperience
} from "../utils";
import { stat } from "fs";
import type { resumeLanguage } from "@resume-builder/shared";
import type { WriterRedefinedTopic } from "../../types/agent";

const oai5_1_so_architect = oai5_1.withStructuredOutput(architectOutput)
const oai5_1_so_writer = oai5_1.withStructuredOutput(writerRedefinedTopicSchema)

const oai5mini_so_writer = oai5mini.withStructuredOutput(writerRedefinedTopicSchema)
const oai4omini_so_writer = oai4omini.withStructuredOutput(writerRedefinedTopicSchema)

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

    const userSum = state.userSummary
    const resultChain = architectPrompt.pipe(oai5nano_so_architect)

    const resutl = await resultChain.invoke({
        raw_text: userSum
    })

    console.dir(resutl, { depth: null, colors: true });
    return {
        workstreams: resutl.workstreams
    }
}

export async function writer(state: typeof State.State) {

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
            error: error instanceof Error ? error.message : 'Unknown error orccuerd'
        }
    }
}
