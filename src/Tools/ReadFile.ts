import * as vscode from "vscode";

export const ReadFileContent = async (FilePath: string) => {
    const path = vscode.Uri.file(FilePath);
    const contentArray =  await vscode.workspace.fs.readFile(path);
    const content = Buffer.from(contentArray).toString('utf-8');

    console.log(content);
    return content;
};