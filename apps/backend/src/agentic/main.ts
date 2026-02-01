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

const testExp = await getExperience(12)
const testCareer = await getCareerPath(7)
const enhancedExp = await getAiEnhancedExperience(12)

console.log(testExp)
console.log(testCareer)


export async function invokeEnhanceAgent() {
    const result = await enhanceAgent.invoke({
        expId: testExp.id
    })
    return result
}


const result = invokeEnhanceAgent()
console.dir(result, { depth: null, colors: true });


// To do:

// Figure out how what changes were made to backend by Antigravity for description update
// Focus on single topic generator.
// In case of experience description change, the notification should be available for the user. The notification can be later on confirmed
// To implement => Enhance validation !!! To check if the update of the experience was significant that it needs to regenerate the enhancement. 
// If the validation was true, the expirience gets validated, if not, it keeps current enhancement option 

// The DB schema needs to be changed and variations to be removed. Topics to became lowest item in the structure for experience
// Single topic needs to be assgined to the possible topics, from AI enhanced experience. 
// In case of edition of experience and positive validation (new enhancement needed) all topics under relevant experience across all in career paths gets deleted. 
// The enhancement needs to validate not all items at one, but needs to say which option may need a replacement or maybe new topic has arise. 
// In this case there also needs to be a correct handler on the side of career paths. 