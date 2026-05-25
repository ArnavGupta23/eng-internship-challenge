type position = {
    row: number;
    col: number;
}

function normalizeText(text:string): string {
    return text.toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");
}

const ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J is omitted
const SIZE = 5; // Size of the key square

function buildKeySquare(key: string): string[][] {
    const seen = new Set<string>(); 
    const squareChars: string[] = []; 

    const sourceText = normalizeText(key) + ALPHABET;

    for (const char of sourceText) {
        if (!seen.has(char)) {
            seen.add(char);
            squareChars.push(char);
        }
    }

    const square: string[][] = [];

    for (let row = 0; row < SIZE; row++) {
        square.push(squareChars.slice(row * SIZE, (row + 1) * SIZE));
    }

    return square;
}
