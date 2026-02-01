import { State } from './state';
import {
    getAiEnhancedExperience,
    getCareerPath
} from '../utils';
import { enhanceAgent } from '../enhance/enhance';
import type { resumeLanguage } from '@resume-builder/shared';


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

export async function testNode(state: typeof State.State) {
    return {
        experienceId: ''
    }
}

// To do:
// Continuee topics generation Agent
// Figure out how to handle single Topic Generation
// First Topic generation:
// -> 
// Figure out human in the loop with react app
// Single topic generation prompt? 
// 
// Does a single prompt can handle the Topic Generation? 