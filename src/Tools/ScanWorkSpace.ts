import * as vscode from "vscode";
import * as path from "path";

const IgnoreFolders = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
    "__pycache__",
    ".ai-index"
]);

const allowedExtensions = new Set([
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".py",
    ".json",
    ".md",
    ".html",
    ".css"
]);

interface FilePaths {
    path: string
}


const ScannedPaths: FilePaths[] = [];

export const scanFolders = async () => {
    ScannedPaths.length = 0;

    const folders = vscode.workspace.workspaceFolders;

    console.log("Started scanning");
    vscode.window.showInformationMessage("Started scanning workspace");

    if (!folders) {
        vscode.window.showInformationMessage("No active workspace.");
        return;
    }

    for (const folder of folders) {
        await processFolders(folder.uri);
    }

    console.log("Scanning completed");
    console.log(ScannedPaths);

    vscode.window.showInformationMessage("Scanning completed. See results in console.");

    return ScannedPaths;
};


const processFolders = async (uri: vscode.Uri) => {

    const entries = await vscode.workspace.fs.readDirectory(uri);

    for (const [name, type] of entries) {

        if (IgnoreFolders.has(name)) {
            continue;
        }

        const childUri = vscode.Uri.file(path.join(uri.fsPath, name));

        if (type === vscode.FileType.Directory) {
            await processFolders(childUri);
        }

        else if (type === vscode.FileType.File) {

            const extension = name.substring(name.lastIndexOf('.'));

            if (!allowedExtensions.has(extension)) {
                continue;
            }

            ScannedPaths.push({
                path: childUri.fsPath
            });
        }
    }
};