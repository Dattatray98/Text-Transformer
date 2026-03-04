import * as vscode from "vscode";

export class AIToolsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {

        const summarizeFile = new vscode.TreeItem("summarize current file");
        summarizeFile.command = {
            command: 'Summaries-with-AI',
            title: 'Summarie file'
        };

        const aiChat = new vscode.TreeItem('OpenChat');
        aiChat.command = {
            "command": "ai-tools.openChat",
            "title": "Open AI Chat"
        };

        return [summarizeFile, aiChat];
    }
}