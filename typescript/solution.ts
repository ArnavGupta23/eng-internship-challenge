type Position = {
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

function buildPositionMap(square: string[][]): Map<string, Position> {
    const positions = new Map<string, Position>();

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            positions.set(square[row][col], { row, col });
        }
    }

    return positions;
}

function decryptPair(
    a: string,
    b: string,
    square: string[][],
    positions: Map<string, Position>
): string {
    const first = positions.get(a);
    const second = positions.get(b);

    if (!first || !second) {
        throw new Error("Both characters must exist in the key square");
    }

    // Same row shifts left, same column shifts up, otherwise swap columns.
    if (first.row === second.row) {
        return (
            square[first.row][(first.col + SIZE - 1) % SIZE] +
            square[second.row][(second.col + SIZE - 1) % SIZE]
        );
    }

    if (first.col === second.col) {
        return (
            square[(first.row + SIZE - 1) % SIZE][first.col] +
            square[(second.row + SIZE - 1) % SIZE][second.col]
        );
    }

    return square[first.row][second.col] + square[second.row][first.col];
}

function decrypt(cipherText: string, key: string): string {
  const square = buildKeySquare(key);
  const positions = buildPositionMap(square);
  const normalizedCipher = normalizeText(cipherText);

  if (normalizedCipher.length % 2 !== 0) {
    throw new Error("Cipher text must contain an even number of characters.");
  }

  let plaintext = "";

  for (let i = 0; i < normalizedCipher.length; i += 2) {
    plaintext += decryptPair(
      normalizedCipher[i],
      normalizedCipher[i + 1],
      square,
      positions
    );
  }
  // Remove 'X' and any non-alphabetic characters from the plaintext
  return plaintext.replace(/X/g, "").replace(/[^A-Z]/g, "");
}