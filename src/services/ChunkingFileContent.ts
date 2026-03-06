export async function CreateChunks(ScannedFolders: [{ path: String, content: string }]) {

    const chunkSize = 100;
    const overlap = 20;

    const Chunks: any[] = [];

    for (const file of ScannedFolders) {
        const lines = file.content.split('\n');

        for (let i = 0; i < lines.length; i += (chunkSize - overlap)) {
            const chunkLines = lines.slice(i, i + chunkSize);

            if (chunkLines.length === 0) {
                continue;
            }

            const chunkText = chunkLines.join("\n");

            Chunks.push({
                path: file.path,
                startLine: i + 1,
                endLine: i + chunkLines.length,
                text: chunkText,
            });
        }
    }

    return Chunks;
}