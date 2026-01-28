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
    You are an architect of the resume experience refinment process.
    Your goal is to analyze the user job description and structure it into workstreams. 
    The definition of workstream:
    - It is highlighted by the user and from the context you can assume that this was meant to be understood as a single bullet point.
    - The output of the task of series of task is provided. For example: scripts automated file analysis, reports were deployed to production, machines were working smothly etc.
    - It was not an overnight thing. It was an effort, not a trivial bug fix. 

    Description of the input: it is a raw text written by the user describing his single job experience. The raw text is in <raw></raw> tags

    Instructions:
    1. Scan the text.
    2. Identify distinct topics that where highlighted by the user and responisbities.
    3. Check if those topics matches criteria of the workstream.
    4. Group the exact raw sentences from the text under the workstreams
    5. Ignore trivial additions - noise.

    Output:
    Return a JSON object matching the 'architectOutput' schema.
    ensure 'rawQuotes' contains only text copied directly from the source.
    `,


    // user prompt
    `
    <raw>
    {raw_text}
    </raw>
    `
)