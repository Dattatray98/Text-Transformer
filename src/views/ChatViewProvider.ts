import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class ChatViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = "aiChatView";

  constructor(private context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {

    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(
          path.join(this.context.extensionPath, "dist-webview")
        )
      ]
    };

    const htmlPath = path.join(
      this.context.extensionPath,
      "dist-webview",
      "index.html"
    );

    let html = fs.readFileSync(htmlPath, "utf8");

    // Convert asset paths to webview-safe paths
    html = html.replace(
      /src="(.*?)"/g,
      (_, src) => `src="${webview.asWebviewUri(
        vscode.Uri.file(path.join(this.context.extensionPath, "dist-webview", src))
      )}"`
    );

    webview.html = html;

    webview.onDidReceiveMessage(async (message) => {

      if (message.command === "chat") {

        const response = `AI: ${message.text}`;

        webview.postMessage({
          command: "response",
          text: response
        });

      }

    });

  }
}