import { State } from './state';
import {
    getAiEnhancedExperience,
    getCareerPath
} from '../utils';
import { enhanceAgent } from '../enhance/enhance';
import type { resumeLanguage } from '@resume-builder/shared';
import { generateSingleTopic } from './singleTopic';



export async function checkAiEnhancedExperience(state: typeof State.State) {

    // Career path description handling
    const careerPathId = state.careerPathId

    const careerPathUserDb = await getCareerPath(careerPathId)
    let careerPathUser = ''

    if (careerPathUserDb.resume_lang === 'EN') {
        careerPathUser = [`Career Path Name: ${careerPathUserDb.name}`, `Career Path User Description${careerPathUserDb.description}`].join('')
    } else {
        careerPathUser = [`Nazwa ściezki kariery: ${careerPathUserDb.name}`, `Opis ściezki kariery stworzony przez uzytkownika: ${careerPathUserDb.description}`].join('')
    }

    // Expirience description handling
    const expId = state.expId

    const existingEnhance = await getAiEnhancedExperience(expId)
    let redefinedTopis = existingEnhance.experience

    if (!redefinedTopis) {
        redefinedTopis = (await enhanceAgent.invoke({
            expId: expId,
        })).writerRedefinedTopics
    }
    const resumeLang: resumeLanguage = existingEnhance.resume_lang as resumeLanguage

    return {
        writerRedefinedTopics: redefinedTopis,
        careerPathUser: careerPathUser,
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
    let allTopics = ''
    if (lang === 'PL') {

        allTopics = state.careerPathTopics.map((item, index) => {
            `Topic${index}: ${item}`
        }).join('\n')
    } else {

        allTopics = state.careerPathTopics.map((item, index) => {
            `Topic${index}: ${item}`
        }).join('\n')
    }
}

