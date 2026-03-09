import * as vscode from "vscode";
import { scanFolders } from "./ScanWorkSpace";

export const ReadFileContent = async (filePath: string) => {

    const scannedFolders = await scanFolders();

    let fullPath: string | null = null;

    for (const fPath of scannedFolders!) {
        if (fPath.toLowerCase().includes(filePath.toLowerCase())) {
            fullPath = fPath;
            break;
        }
    }

    if (!fullPath) {
        return {
            error: "File not found",
            requested_path: filePath,
            hint: "Use scan_workspace or search tools to find the correct file path."
        };
    }

    vscode.window.showInformationMessage("Using Read_file tool");

    const uri = vscode.Uri.file(fullPath);
    const contentArray = await vscode.workspace.fs.readFile(uri);
    const content = Buffer.from(contentArray).toString("utf-8");

    return content;
};