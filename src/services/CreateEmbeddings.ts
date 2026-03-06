import ollama from "ollama";


interface Chunk {
    path: string;
    startLine: number;
    endLine: number;
    text: string;
}


export async function CreateEmbeddings(Chunks: Chunk[]) {
    const embeddings = [];
    let count = 0;
    for (const chunk of Chunks) {
        const response = await ollama.embed({
            model: "nomic-embed-text",
            input: chunk.text
        });

        embeddings.push({
            id: `chunk_${count}`,
            path: chunk.path,
            text: chunk.text,
            embedding: response.embeddings[0],
        });

        count += 1;
    }

    return embeddings;
}




export async function CreateQueryEmbeddings(Query: string) {
    const response = await ollama.embed({
        model: 'nomic-embed-text',
        input: Query
    });

    return response.embeddings[0];
}

