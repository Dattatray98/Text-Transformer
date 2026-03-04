import * as vscode from "vscode";
<<<<<<< HEAD
import { countWords, removeSpaces, ReverceText, toLowerCase, toUpperCase } from "../services/textService";
=======
import { toLowerCase, toUpperCase } from "../services/textService";
>>>>>>> 6522f1d5ca8dc393350a66ed0c9ffc30f88f355e
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
<<<<<<< HEAD
                "lowercase",
                "reverseText",
                "removeSpaces",
                "countWords"
=======
                "lowercase"
>>>>>>> 6522f1d5ca8dc393350a66ed0c9ffc30f88f355e
            ], {
                placeHolder: "Choose text transformation"
            });

            if (!option) {
                return;
            }

            let result = selectedText;

            if (option === 'UPPERCASE') { result = toUpperCase(selectedText); }
            if (option === 'lowercase') { result = toLowerCase(selectedText); }
<<<<<<< HEAD
            if (option === 'reverseText') { result = ReverceText(selectedText); }
            if (option === 'removeSpaces') { result = removeSpaces(selectedText); }
            if (option === 'countWords') { result = countWords(selectedText); }
=======

>>>>>>> 6522f1d5ca8dc393350a66ed0c9ffc30f88f355e

            await editor.edit(editBuilder => {
                editBuilder.replace(selection, result);
            });

            log('Text converted to uppercase.');
            vscode.window.showInformationMessage("Text converted to uppercase!");
        }
    );

    context.subscriptions.push(disposable);

}