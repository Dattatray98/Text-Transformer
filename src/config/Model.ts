import { Ollama } from "ollama";

const ollama = new Ollama({ host: 'http://localhost:11434' });


export const SummaryModel = async (Prompt: string) => {
    const response = await ollama.generate({
        model: "llama3",
        prompt: Prompt,
        stream: false
    });

    return response.response;
};



export const AgenticModel = async (prompt: any) => {
    const response = await ollama.generate({
        model: 'llama3',
        prompt: prompt,
        stream: false,
    });

    return response.response;
};