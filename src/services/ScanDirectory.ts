import * as vscode from "vscode";

const IgnoreFolders = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
    "__pycache__",
    ".ai-index"
]);


const allowedExtentions = new Set([
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


interface FileData {
    path: string,
    content: string,
}


const ScannedFolders: FileData[] = [];

export async function ScanWorkspace() {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders) {
        vscode.window.showInformationMessage("There is not folders in workspace");
        return;
    }

    for (const folder of folders) {
        await processDirectory(folder.uri);
    }

    console.log('Total file scanned : ', ScannedFolders.length);
    return ScannedFolders;
}



async function processDirectory(uri: vscode.Uri) {
    // read all folders and file in the current directory
    const entries = await vscode.workspace.fs.readDirectory(uri);

    for (const [name, type] of entries) {
        
        if (IgnoreFolders.has(name)) {
            continue;
        }


        const childUri = vscode.Uri.file(uri.fsPath + "/" + name);

        if (type === vscode.FileType.Directory) {
            await processDirectory(childUri);

        }

        else if (type === vscode.FileType.File) {
            const extension = name.substring(name.lastIndexOf('.'));
            if (!allowedExtentions.has(extension)) {
                continue;
            }

            const contentArray = await vscode.workspace.fs.readFile(childUri);
            const content = Buffer.from(contentArray).toString('utf-8');

            ScannedFolders.push({
                path: childUri.fsPath,
                content: content
            });
        }
    }
}