import * as vscode from "vscode";
import { ScanWorkspace } from "../services/ScanDirectory";
import { CreateChunks } from "../services/ChunkingFileContent";
import { CreateEmbeddings } from "../services/CreateEmbeddings";
import { InitDatabase } from "../config/vectorDatabase";


export function registerScanDirectoryCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        'Scan-Directory',
        async () => {
            const response:any = await ScanWorkspace();
            const Chunks:any = await CreateChunks(response);
            const embeddings = await CreateEmbeddings(Chunks);
            InitDatabase();
            console.log(embeddings);
        }
    );
}