import { CreateEmbeddings, CreateQueryEmbeddings } from "../services/CreateEmbeddings";
import { ReadFileContent } from "./ReadFile";
import { scanFolders } from "./ScanWorkSpace";
import { SearchInFile } from "./SearchInFile";
import { SearchInVectorDB } from "./SearchInVectorDB";

export const tools: any = {
    Search_In_File : SearchInFile,
    Read_file: ReadFileContent,
    scan_workspace: scanFolders,
    create_chunk_embeddings: CreateEmbeddings,
    create_query_embeddings: CreateQueryEmbeddings,
    Search_chunk_in_VectorDatabase : SearchInVectorDB,
    
};