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

const testExp = await getExperience(12)
const testCareer = await getCareerPath(10)
const enhancedExp = await getAiEnhancedExperience(12)

console.log(testExp)
console.log(testCareer)


export async function invokeEnhanceAgent() {
    const result = await enhanceAgent.invoke({
        expId: testExp.id
    })
    return result
}



// const result = invokeEnhanceAgent()
// console.dir(result, { depth: null, colors: true });

const test = {
    redefinedTopic: "Analytical Data Lake On-Premises Integration with AWS ETL",
    refinedQuotes: [
        "Designed and implemented end-to-end Analytical Data Lake integration with an on-premises system using AWS services (Step Functions", "EventBridge, Athena, IAM, Lambda); developed the ETL workflow to move files between sources using TypeScript and AWS CDK; collaborated with the on-prem vendor to define technical requirements and accepted data formats; obtained stakeholder approval and delivered the solution."
    ]
} as WriterRedefinedTopic



const topicsTest = await topicsAgent.invoke({
    expId: 12,
    careerPathId: 10
})



console.dir(topicsTest, { depth: null })


// To do:
// Finish endpoints for topics
// Figure out potential improvement in code structure