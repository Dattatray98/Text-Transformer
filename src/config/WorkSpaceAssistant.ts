import { CreateQueryEmbeddings } from "../services/CreateEmbeddings";
import { SearchChunks } from "../services/SearchChunks";
import { SummaryModel } from "./Model";
import { InitDatabase } from "./vectorDatabase";

export const BuildContext = (results: any[]) => {

    let context = "";

    for (const r of results) {

        context += `File: ${r.path} (lines ${r.startLine}-${r.endLine})\n`;
        context += r.text + "\n\n";
    }

    return context;
};


export const WorkSpaceAssistant = async (text: string) => {
    const db = await InitDatabase();
    const QueryEmbeddings: any = await CreateQueryEmbeddings(text);
    console.log(QueryEmbeddings.length);
    const results = await SearchChunks(db, QueryEmbeddings);

    const context = BuildContext(results);

    const prompt = `You are a senior backend engineer performing a code review.

Your task is to detect possible bugs, security issues, or production risks.

Use ONLY the provided code context.

If you find issues:
- explain the issue
- show where it appears
- explain why it is dangerous
- suggest a fix

If no issue exists, say: "No obvious production issues found."

Context:
${context}

Question:
${text}`;

    return prompt;
};



export const WorkSpaceAdvancedAssistant = async (text: string) => {
    const db = await InitDatabase();
    const QueryEmbeddings: any = await CreateQueryEmbeddings(text);
    console.log(QueryEmbeddings.length);
    const results = await SearchChunks(db, QueryEmbeddings);

} ;