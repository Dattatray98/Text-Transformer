import * as vscode from 'vscode';

export const SearchRepo = async (query: string, files: { path: string }[]) => {
    const results = [];

    for (const file of files) {
        const filePath = vscode.Uri.file(file.path);
        const contentArray = await vscode.workspace.fs.readFile(filePath);
        const content = Buffer.from(contentArray).toString('utf-8');

        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push(file.path);
        }
    }

    return results;
};