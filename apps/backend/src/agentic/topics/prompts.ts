import { ChatPromptTemplate } from "@langchain/core/prompts";

export function defaultPrompt(systemPrompt: string, userPrompt: string) {
    return ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        ["human", userPrompt]
    ])
}

export const architectPrompt = defaultPrompt(
    // system prompt
    `
    
    `,


    // user prompt
    `

    `
)