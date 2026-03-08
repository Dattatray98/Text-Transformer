import { AgenticModel} from "../config/Model";
import { parseToolCall } from "../utils/parseToolCall";
import { runTool } from "../utils/runTool";
import { systemPrompt } from "../utils/systemPrompt";


export const AssistantLoop = async (query: string) => {
    let messages : any[] = [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: query}
    ];


    while (true){
        const response:string = await AgenticModel(messages);
        const toolCall = parseToolCall(response);
        if(toolCall){
            const toolResult = runTool(toolCall.tool, toolCall.input);
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