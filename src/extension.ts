import * as vscode from "vscode";
import {  registerUppercaseCommand } from "./commands/uppercaseCommand";
<<<<<<< HEAD
import { registerModelCommand } from "./commands/modelcommand";
=======
>>>>>>> 6522f1d5ca8dc393350a66ed0c9ffc30f88f355e


export function activate(context: vscode.ExtensionContext) {
	registerUppercaseCommand(context);
<<<<<<< HEAD
	registerModelCommand(context);
=======
>>>>>>> 6522f1d5ca8dc393350a66ed0c9ffc30f88f355e
}

export function deactivate() { }