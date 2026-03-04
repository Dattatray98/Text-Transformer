import * as vscode from 'vscode';

export function registerOpenChatCommand(context: vscode.ExtensionContext) {
    const OpenChat = vscode.commands.registerCommand(
        'ai-tools.openChat',
        async () => {
            await vscode.commands.executeCommand(
                "workbench.view.extension.ai-tools"
            );

            await vscode.commands.executeCommand(
                "aiChatView.focus"
            );
        }
    );

    context.subscriptions.push(OpenChat);
}