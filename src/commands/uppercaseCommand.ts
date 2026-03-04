import * as vscode from "vscode";
import { toLowerCase, toUpperCase } from "../services/textService";
import { log } from "../utils/logger";

export function registerUppercaseCommand(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand(
        'text-transformer.uppercase',
        async () => {
            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                vscode.window.showInformationMessage('No active editor found.');
                return;
            }

            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            if (!selectedText) {
                vscode.window.showInformationMessage("No text selected.");
                return;
            }

            const option = await vscode.window.showQuickPick([
                'UPPERCASE',
                "lowercase"
            ], {
                placeHolder: "Choose text transformation"
            });

            if (!option) {
                return;
            }

            let result = selectedText;

            if (option === 'UPPERCASE') { result = toUpperCase(selectedText); }
            if (option === 'lowercase') { result = toLowerCase(selectedText); }


            await editor.edit(editBuilder => {
                editBuilder.replace(selection, result);
            });

            log('Text converted to uppercase.');
            vscode.window.showInformationMessage("Text converted to uppercase!");
        }
    );

    context.subscriptions.push(disposable);

}