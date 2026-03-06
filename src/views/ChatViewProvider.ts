import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { SummaryModel } from "../config/Model";
import { WorkSpaceAssistant } from "../config/WorkSpaceAssistant";

export class ChatViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = "aiChatView";

  constructor(private context: vscode.ExtensionContext) { }

  resolveWebviewView(webviewView: vscode.WebviewView) {

    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(
          path.join(this.context.extensionPath, "src", "WebView")
        )
      ]
    };


    const webviewPath = path.join(
      this.context.extensionPath,
      "src",
      "WebView"
    );

    const htmlPath = path.join(webviewPath, "chat.html");

    
    const cssUri = webview.asWebviewUri(
      vscode.Uri.file(path.join(webviewPath, "chat.css"))
    );
    
    const jsUri = webview.asWebviewUri(
      vscode.Uri.file(path.join(webviewPath, "chat.js"))
    );
    
    let html = fs.readFileSync(htmlPath, "utf8");

    html = html
      .replace("chat.css", cssUri.toString())
      .replace("chat.js", jsUri.toString());



    webview.html = html;


    const editor = vscode.window.activeTextEditor;

    if(!editor){
      vscode.window.showInformationMessage("No active editor found.");
      return;
    }

    const fileContent = editor.document.getText();

    webview.onDidReceiveMessage(async (message) => {

      if (message.command === "chat") {

        const prompt = message.text;

        const workspacePrompt:any = await WorkSpaceAssistant(prompt);

        const response = await SummaryModel(workspacePrompt);

        webview.postMessage({
          command: "response",
          text: response
        });

      }
    });

  }
}