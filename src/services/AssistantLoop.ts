import { AgenticModel } from "../config/Model";
import { parseToolCall } from "../utils/parseToolCall";
import { runTool } from "../utils/runTool";
import { systemPrompt } from "../utils/systemPrompt";


export const AssistantLoop = async (query: string) => {
    let messages: any[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
    ];

    while (true) {
        const prompt = messages.map((m) => `${m.role.toUpperCase()} : ${m.content}`).join("\n") + "\nAssistant:";
        console.log("this the prompt : ", prompt);

        // System prompt and the user query is given to LLM for reasoning.
        const response: string = await AgenticModel(prompt);
        console.log('first Response ', response);

        // Cheaking wheather LLM is calling a tool or not.
        const toolCall = await parseToolCall(response);
        console.log("tool Calle ", toolCall);

        // if it is toolcall then handling with given conditions.
        if (toolCall) {
            const toolResult:any = await runTool(toolCall.tool, toolCall.input);
            
            messages.push({
                role: "assistant",
                content: response,
            });
            
            messages.push({
                role: "system",
                content: toolResult
            });

            continue;
        }


        return response;
    }
};