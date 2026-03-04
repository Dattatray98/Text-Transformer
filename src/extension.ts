import * as vscode from "vscode";
import {  registerUppercaseCommand } from "./commands/uppercaseCommand";
import { registerModelCommand } from "./commands/modelcommand";


export function activate(context: vscode.ExtensionContext) {
	registerUppercaseCommand(context);
	registerModelCommand(context);
}

export function deactivate() { }