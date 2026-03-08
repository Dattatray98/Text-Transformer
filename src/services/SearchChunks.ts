export const SearchChunks = async (db: any, queryVector: number[]) => {

    const table = await db.openTable("code_chunks");

    const results = await table
        .search(queryVector)
        .limit(5)
        .toArray();

    return results;
};