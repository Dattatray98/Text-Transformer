
interface FileData {
    path: string;
    content: string;
}

interface Chunk {
    path: string;
    startLine: number;
    endLine: number;
    text: string;
}

export async function CreateChunks(files: FileData[]): Promise<Chunk[]> {

    const chunkSize = 60;
    const overlap = 10;

    const chunks: Chunk[] = [];

    for (const file of files) {

        const lines = file.content.split("\n");

        for (let i = 0; i < lines.length; i += (chunkSize - overlap)) {

            const chunkLines = lines.slice(i, i + chunkSize);

            const text = chunkLines.join("\n").trim();

            if (text.length < 30){
                continue;
            }

            chunks.push({
                path: file.path,
                startLine: i + 1,
                endLine: i + chunkLines.length,
                text
            });
        }
    }

    return chunks;
}

export const CreateContentChunk  = (path: string, content : string)=>{
    const chunkSize = 100;
    const overlap = 20;

    const Chunks: any[] = [];

    const lines = content.split('\n');

    for (let i = 0; i<lines.length; i += (chunkSize - overlap)){
        const chunkLines = lines.slice(i, i+chunkSize);

        if(chunkLines.length === 0){
            continue;
        }

        const chunkText = chunkLines.join("\n");

        Chunks.push({
            path: path,
            startLine: i + 1,
            endLine : i + chunkLines.length,
            text: chunkText
        });
    }

    return Chunks;
};