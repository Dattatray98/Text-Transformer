import ollama from "ollama";


interface Chunk {
    path: string;
    startLine: number;
    endLine: number;
    text: string;
}


export async function CreateEmbeddings(Chunks: Chunk[]) {
    const embeddings = [];
    for (const chunk of Chunks) {
        const response = await ollama.embed({
            model: "nomic-embed-text",
            input: chunk.text
        });

        embeddings.push(response.embeddings);
    }

    return embeddings;
}