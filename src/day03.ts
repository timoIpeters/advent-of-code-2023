import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'input-03.txt';

interface Range {
  from: number;
  to: number;
}

interface MappedChar {
  c: string, // character
  rowIdx: number,
  colIdx: number
}

interface MappedNumber {
  num: number;
  rowIdx: number;
  columnRange: Range;
}


/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  if (!inputArr || inputArr.length === 0) {
    return;
  }

  const usableCharsMatrix = getMatrixCoords(inputArr);
  const merged = mergeDigits(usableCharsMatrix, false);
  const filtered = filterAdjacentNumbers(merged);
  const result = filtered.reduce((acc, curr) => acc + curr.num, 0);
  console.log(`Part One: ${result}`);
}

// get matrix coords for all digits and symbols
function getMatrixCoords(inputArr: string[]): MappedChar[][] {
  let usableCharsMatrix: MappedChar[][] = [];
  inputArr.forEach((line, rowIdx) => {
     const mappedLineChars = line.split("")
     .map((c, colIdx) => { 
      return { c, rowIdx, colIdx };
     })
     .filter((mappedChar => mappedChar.c !== "."));

     usableCharsMatrix.push(mappedLineChars);
  });
  return usableCharsMatrix;
}

function mergeDigits(mappedCharStruct: MappedChar[][], removeNonStarSymbols: boolean): MappedNumber[] {
  const result: MappedNumber[] = [];

  mappedCharStruct.forEach((row) => {
    let currentGroup: { num: number; from: number; to: number } | null = null;

    row.forEach((item) => {
      if (typeof item.c === 'string' && /^\d$/.test(item.c)) {
        const digit = parseInt(item.c, 10);

        if (currentGroup === null || item.colIdx !== currentGroup.to + 1) {
          // Start a new group
          currentGroup = {
            num: digit,
            from: item.colIdx,
            to: item.colIdx,
          };
          result.push({ num: digit, rowIdx: item.rowIdx, columnRange: { from: item.colIdx, to: item.colIdx } });
        } else {
          // Add to the current group
          currentGroup.num = currentGroup.num * 10 + digit;
          currentGroup.to = item.colIdx;
          const lastIndex = result.length - 1;
          result[lastIndex].num = currentGroup.num;
          result[lastIndex].columnRange.to = currentGroup.to;
        }
      } else {
        // Non-digit item, add it to the result array
        // if the removeNonStarSymbols flag is set, only * symbols are being added
        if (removeNonStarSymbols) {
          if (item.c === "*") {
            result.push({ num: NaN, rowIdx: item.rowIdx, columnRange: { from: item.colIdx, to: item.colIdx } });
          }
        } else {
          result.push({ num: NaN, rowIdx: item.rowIdx, columnRange: { from: item.colIdx, to: item.colIdx } });
        }
        currentGroup = null; // Reset currentGroup for non-digit items
      }
    });
  });

  return result;
}

function isAdjacent(a: MappedNumber, b: MappedNumber): boolean {
  for (let i = a.columnRange.from; i <= a.columnRange.to; i++) {
    for (let j = b.columnRange.from; j <= b.columnRange.to; j++) {
      const rowDiff = Math.abs(a.rowIdx - b.rowIdx);
      const colDiff = Math.abs(i - j);

      // Check if items are adjacent horizontally, vertically, or diagonally
      if (rowDiff <= 1 && colDiff <= 1) {
        return true;
      }
    }
  }

  return false;
}

function filterAdjacentNumbers(input: MappedNumber[]): MappedNumber[] {
  const symbols = input.filter((item) => isNaN(item.num));

  // Filter numbers that are adjacent to a symbol
  const result = input.filter((item) => {
    if (!isNaN(item.num)) {
      return symbols.some((symbol) => isAdjacent(item, symbol));
    }
    return false; // remove symbols from the result
  });

  return result;
}

function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  if (!inputArr || inputArr.length === 0) {
    return;
  }

  const usableCharsMatrix = getMatrixCoords(inputArr);
  const merged = mergeDigits(usableCharsMatrix, true);
  const ratios = getGearRatios(merged);
  const result: number = ratios.reduce((acc, curr) => acc + curr, 0);
  console.log(`Part Two: ${result}`);
}

function getGearRatios(grid: MappedNumber[]): number[] {
  const ratios: number[] = [];

  // Iterate through grid items
  for (const item of grid) {
    if (isNaN(item.num)) {
      // Check if the NaN item has two adjacent numbers
      const adjacentNumbers = grid
        .filter((otherItem) => isAdjacent(item, otherItem))
        .filter((otherItem) => !isNaN(otherItem.num)); // Exclude NaN items

      if (adjacentNumbers.length === 2) {
        const ratio = adjacentNumbers.reduce((acc, curr) => acc * curr.num, 1);
        ratios.push(ratio);
      }
    }
  }

  return ratios;
}

solvePartOne();
solvePartTwo();
