export const parseToolCall = (response: string)=>{
    try{
        const parsed = JSON.parse(response);
        if(parsed.tool && parsed.input !== undefined){
            return parsed;
        } 

    }catch(error){
        return null;

    }

    return null;
};