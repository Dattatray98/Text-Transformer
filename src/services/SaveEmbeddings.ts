export async function SaveEmbeddings(db: any, rows: Array<any>) {
    let table;

    try {
        table = await db.openTable("code_chunks");
    } catch {
        table = await db.createTable("code_chunks", [
            {
                id: "init",
                path: "init",
                text: "init",
                embedding: new Float32Array(768)
            }
        ]);
    }

    await table.add(rows);
}