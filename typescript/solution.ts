type position = {
    row: number;
    col: number;
}

function normalizeText(text:string): string {
    return text.toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");
}