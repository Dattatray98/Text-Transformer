import * as vscode from "vscode";

type SearchInput = {
    query: string;
    files: string[];
};

export const SearchInFile = async (input: SearchInput) => {
    vscode.window.showInformationMessage("Search_In_File tool Calling");

    const results: string[] = [];

    for (const file of input.files) {
        try {
            const fileUri = vscode.Uri.file(file);

            const contentArray = await vscode.workspace.fs.readFile(fileUri);
            const content = Buffer.from(contentArray).toString("utf-8");

            if (content.toLowerCase().includes(input.query.toLowerCase())) {
                results.push(file);   // file itself is the path
            }

        } catch (error) {
            console.log("Failed to read file:", file);
        }
    }

    return results;
};