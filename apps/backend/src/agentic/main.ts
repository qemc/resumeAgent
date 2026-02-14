import 'dotenv/config';
import {
    getExperience,
    getCareerPath,
    getAiEnhancedExperience
} from './utils';
import { topicsAgent } from './topics/topics';
import { enhanceAgent } from './enhance/enhance';
import type { resumeLanguage } from '@resume-builder/shared';
import { generateSingleTopic } from './topics/singleTopic';
import type { WriterRedefinedTopic } from '../types/agent';



export async function invokeEnhanceAgent() {
    const result = await enhanceAgent.invoke({
        expId: 11
    })
    return result
}

const result = await invokeEnhanceAgent()
console.dir(result, { depth: null, colors: true });
