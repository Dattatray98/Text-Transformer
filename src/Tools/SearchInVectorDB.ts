import * as vscode from "vscode";
import { InitDatabase } from "../config/vectorDatabase";
import { CreateQueryEmbeddings } from "../services/CreateEmbeddings";

export const SearchInVectorDB = async (input: string) => {
    vscode.window.showInformationMessage("Search_chunk_in_vectorDatabase tool called");
    const db = await InitDatabase();

    const queryVector = await CreateQueryEmbeddings(input);

    const table = await db.openTable('code_chunks');

    const result = await table.search(queryVector).limit(5).toArray();

    return result;
};