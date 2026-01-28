import { ChatOpenAI } from "@langchain/openai"

export const oai5mini = new ChatOpenAI({ model: 'gpt-5-mini' })
export const oai5nano = new ChatOpenAI({ model: 'gpt-5-nano' })
export const oai5_1 = new ChatOpenAI({ model: 'gpt-5.1-chat-latest' })

