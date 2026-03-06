export const SearchChunks = async (db:any, queryVector: Float32Array)=>{
    const table = await db.openTable('code_chunks');

    const results = await table.search(queryVector).column("embedding").limit(5).toArray();


    let context = "";
    
    for (const r of results){
        context += `File: ${r.path}\n`;
        context += r.text + "\n\n";
    }

    return context;
};