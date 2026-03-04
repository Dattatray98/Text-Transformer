import * as vscode from "vscode";
import {  registerUppercaseCommand } from "./commands/uppercaseCommand";


export function activate(context: vscode.ExtensionContext) {
	registerUppercaseCommand(context);
}

export function deactivate() { }