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
    - If there is a technical tool usage mentioned, it must be paried with business outcome


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

export const processSingleWorkstreamPrompt = defaultPrompt(
    `
    You are an AI Agent payload specialist. Your task is to refine the raw quotes that are provided in user prompt in <raw> </raw> tags. The quotes works as a prove that the topic is a potentially good bullet point on a resume. 

    Tone guidelines:
    Be confident, not arogant
    Too Cold: "I worked on SQL queries."
    Too Hype: "Revolutionized the entire data landscape."
    Just Right: "Engineered complex SQL queries..." or "Designed and implemented the reporting architecture..."
    Be Specific, Not Pedantic:
    Embed the tool names naturally into the action.
    Good:"Leveraged AWS Lambda to automate..." (Shows the 'How' and 'Why').
    Avoid word Led

    Thinking process:
    1. Analyze all items and group them into distinct items within same topic. 
    2. Check if any of the sub-groups are not dubbeled. 
    3. Verify all items that you plan to mention inside a single bullet point. 
    4. Adjust the tone and banned words and approaches (avoid word led, do not be hyperbolic)

    OVerall guideliness:
    1. Read all quotes first. If multiple quotes describe steps of the same process (e.g., "gathering requirements" -> "development" -> "testing"), combine them into one strong **Full Lifecycle** bullet. Do not fragment the story.
    2. You must use the provided quotes as your *only* source of truth. If a detail isn't there, do not invent it. Do not be hyperbolic. 
    3.Output 1-5 bullets based strictly on the amount of *distinct* work described. Do not force extra bullets if the content isn't there.

    ### OUTPUT STRUCTURE:
    - **refinedTitle:** A concise, standard industry title for this specific stream (e.g., "Reporting Solution Migration").
    - **bullets:** A list of strings.

    `,
    `
    <topic> {topic} </topic>
    
    <raw> {rawQuotes} </raw> 
    `
)