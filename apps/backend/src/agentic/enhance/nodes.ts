import { State } from "./state";
import { oai5_1 } from "../models";
import { architectOutput } from "./state";
import { architectPrompt } from "./prompts";


const oai5_1_so_architect = oai5_1.withStructuredOutput(architectOutput) // so - structured output

export async function architect(state: typeof State.State) {

    const userSum = state.userSummary
    const resultChain = architectPrompt.pipe(oai5_1_so_architect)

    const result = await resultChain.invoke({
        raw_text: userSum
    })

    console.dir(result, { depth: null, colors: true });

    return {
        workstreams: result
    }
}