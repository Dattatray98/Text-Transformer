export const parseToolCall = (response: string) => {
    try {

        const start = response.indexOf("{");
        const end = response.lastIndexOf("}");

        const jsonString = response.slice(start, end + 1);

        const parsed = JSON.parse(jsonString);
        if (parsed.tool && parsed.input !== undefined) {
            return parsed;
        }
        
    } catch (error) {
        return null;
    }

    return null;
};