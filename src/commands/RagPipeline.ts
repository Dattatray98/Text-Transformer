import * as vscode from "vscode";
import { ScanWorkspace } from "../services/ScanDirectory";
import { CreateChunks } from "../services/ChunkingFileContent";
import { CreateEmbeddings } from "../services/CreateEmbeddings";
import { InitDatabase } from "../config/vectorDatabase";
import { SaveEmbeddings } from "../services/SaveEmbeddings";


export function registerScanDirectoryCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        'Scan-Directory',
        async () => {
            const response: any = await ScanWorkspace();
            const Chunks: any = await CreateChunks(response);
            const embeddings: any = await CreateEmbeddings(Chunks);
            const db = await InitDatabase();
            await SaveEmbeddings(db, embeddings);
            vscode.window.showInformationMessage("Process Completed");
        }
    );

    context.subscriptions.push(disposable);

}