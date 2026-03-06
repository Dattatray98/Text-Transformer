import * as lancedb from "@lancedb/lancedb";
import * as vscode from "vscode";
import { GetWorkspacePath } from "../utils/GetPaths";
import path = require("path");
import * as fs from "fs";

export async function InitDatabase() {
    const workspacePath: any = GetWorkspacePath();

    const indexpath = path.join(workspacePath, ".ai-index");
    if (!fs.existsSync(indexpath)) {
        fs.mkdirSync(indexpath);
    }

    const db = lancedb.connect(indexpath);

    vscode.window.showInformationMessage("Create Database");
    return db;
}