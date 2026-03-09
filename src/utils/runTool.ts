import { tools } from "../Tools";

export const runTool = async (toolName: string, input: any)=>{
    console.log("using this tool : ", toolName, "with this input : ", input);
    const tool = tools[toolName];
    if(!tool){
        throw new Error("Tool not found : " + toolName);
    }

    const result = await tool(input);

    return result;
};