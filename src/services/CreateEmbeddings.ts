import ollama from "ollama";

interface Chunk {
    path: string;
    startLine: number;
    endLine: number;
    text: string;
}

export async function CreateEmbeddings(chunks: Chunk[]) {

    const rows = [];
    let count = 0;

    for (const chunk of chunks) {

        const embeddingInput = `
File: ${chunk.path}
Lines: ${chunk.startLine}-${chunk.endLine}

${chunk.text}
`;

        const response = await ollama.embed({
            model: "nomic-embed-text",
            input: embeddingInput
        });

        rows.push({
            id: `chunk_${count}`,
            path: chunk.path,
            startLine: chunk.startLine,
            endLine: chunk.endLine,
            text: chunk.text,
            embedding: response.embeddings[0]
        });

        count++;
    }

    return rows;
}



export async function CreateQueryEmbeddings(query: string) {

    const response = await ollama.embed({
        model: "nomic-embed-text",
        input: query
    });

    return response.embeddings[0];
}