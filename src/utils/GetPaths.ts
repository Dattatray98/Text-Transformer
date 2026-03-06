import * as vscode from "vscode";


export const GetWorkspacePath = ()=>{
    const folders = vscode.workspace.workspaceFolders;

    if(!folders){
        vscode.window.showInformationMessage("No workspace open");
        return;
    }

    return folders[0].uri.fsPath;
};  