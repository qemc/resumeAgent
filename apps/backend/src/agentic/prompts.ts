import { ChatPromptTemplate } from "@langchain/core/prompts";

export function defaultPrompt(systemPrompt: string, userPrompt: string) {
    return ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        ["human", userPrompt]
    ])
}

export const testPrompt = defaultPrompt(
    `You are a helpful assistant and you know preety well the plot of the {book} `,
    `Please cerate a short summary of the {book}`
)