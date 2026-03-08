import { CreateEmbeddings, CreateQueryEmbeddings } from "../services/CreateEmbeddings";
import { ScanWorkspace } from "../services/ScanDirectory";
import { SearchChunks } from "../services/SearchChunks";
import { ReadFileContent } from "./ReadFile";
import { SearchRepo } from "./SearchRepo";

export const tools: any = {
    Search_Repo : SearchRepo,
    Read_file: ReadFileContent,
    scan_workspace: ScanWorkspace,
    create_chunk_embeddings: CreateEmbeddings,
    create_query_embeddings: CreateQueryEmbeddings,
    Search_chunk_in_VectorDatabase : SearchChunks,
};