export async function SaveEmbeddings(db: any, rows: any[]) {

    let table;

    try {
        table = await db.openTable("code_chunks");
    } catch {

        // create table using real rows so LanceDB learns schema correctly
        table = await db.createTable("code_chunks", rows);

        return; // table already populated
    }

    await table.add(rows);
}