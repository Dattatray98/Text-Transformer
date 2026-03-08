import * as vscode from "vscode";
import { scanFolders } from "../Tools/ScanWorkSpace";
import { ReadFileContent } from "../Tools/ReadFile";


export function registerTestCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        "testCommand",
        async () => {
            const paths = await scanFolders();
            if (!paths) {
                return;
            }
            ReadFileContent(paths[0].path);
        }
    );
}