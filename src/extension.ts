import * as vscode from "vscode";
import { registerUppercaseCommand } from "./commands/uppercaseCommand";
import { registerModelCommand } from "./commands/modelcommand";
import { AIToolsProvider } from "./views/AIToolsProvider";
import { ChatViewProvider } from "./views/ChatViewProvider";
import { registerOpenChatCommand } from "./commands/openChat";
import { registerScanDirectoryCommand } from "./commands/RagPipeline";
import { registerTestCommand } from "./commands/testCommands";


export function activate(context: vscode.ExtensionContext) {
	registerUppercaseCommand(context);
	registerModelCommand(context);
	registerOpenChatCommand(context);
	registerScanDirectoryCommand(context);
	registerTestCommand(context);

	const provider = new AIToolsProvider();

	vscode.window.registerTreeDataProvider(
		'aiToolsView',
		provider
	);	

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			ChatViewProvider.viewType,
			new ChatViewProvider(context)
		)
	);
	
}

export function deactivate() { }