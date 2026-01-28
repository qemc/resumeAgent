import { State } from './state';
import {
    getExperience,
    getAiEnhancedExperience
} from '../utils';

export async function checkAiEnhancedExperience(state: typeof State.State) {


    return {
        experienceId: ''
    }
}

export async function testNode(state: typeof State.State) {

    const expId = state.experienceId
    const firstNodeMessage = `second node ${expId}`
    console.log(firstNodeMessage)

    return {
        experienceId: firstNodeMessage
    }
}