export function toUpperCase(text: string): string {
    return text.toUpperCase();
}

export function toLowerCase(text: string): string {
    return text.toLowerCase();
}

export function ReverceText(text: string): string {
    return text.split('').reverse().join('');
}

export function removeSpaces(text: string): string {
    return text.replace(/\s+/g, '');
}


export function countWords(text: string): string {
    const words = text.trim().split(/\s+/).length;
    return `Word Count : ${words}`;
}