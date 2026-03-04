import * as vscode from "vscode";
import { SummaryModel } from "../config/Model";

export function registerModelCommand(context: vscode.ExtensionContext) {
    const AskOllama = vscode.commands.registerCommand(
        'Summaries-with-AI',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage('No active editor found.');
                return;
            }

            const fileContent = editor?.document.getText();

            const finalPrompt = `Summarize this content professionally with headings and bullet points, also show the content line range:\n\n${fileContent}`;

            vscode.window.showInformationMessage('Started generation');

            const response = await SummaryModel(finalPrompt);

            if(!response){
                vscode.window.showErrorMessage("failed to generate summary");
                return;
            }

            const workspaceFolders = vscode.workspace.workspaceFolders;

            if(!workspaceFolders){
                vscode.window.showInformationMessage("Open a workspace folder first.");
                return;
            }

            const workspacePath = workspaceFolders[0].uri;
            const fileUri = vscode.Uri.joinPath(workspacePath, "README.md");

            const encoder = new TextEncoder();
            const data = encoder.encode(response);

            await vscode.workspace.fs.writeFile(fileUri, data);
            const doc = await vscode.workspace.openTextDocument(fileUri);
            await vscode.window.showTextDocument(doc);

            vscode.window.showInformationMessage("summary file created.");
        }
    );

    context.subscriptions.push(AskOllama);
}