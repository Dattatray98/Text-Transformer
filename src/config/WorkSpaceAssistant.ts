import { CreateQueryEmbeddings } from "../services/CreateEmbeddings";
import { SearchChunks } from "../services/SearchChunks";
import { SummaryModel } from "./Model";
import { InitDatabase } from "./vectorDatabase";

export const WorkSpaceAssistant = async (text: string) =>{
    const db = await InitDatabase();
    const QueryEmbeddings:any = await CreateQueryEmbeddings(text);
    console.log(QueryEmbeddings.length);
    const context = await SearchChunks(db, QueryEmbeddings);

    const prompt = `
    You are a coding assistant.

    Use the following code context to answer the question.

    context : ${context}
    Question : ${text}
    `;

    return prompt;
};