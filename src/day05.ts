import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'input-05.txt';

// describes how to convert numbers from a source category into numbers in a destination category
interface DescriptionMapElement {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

type DescriptionMap = DescriptionMapElement[];

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArrSplitByEmptyLine(INPUT_FILE);
  const seeds: number[] = inputArr[0].split(":")[1].trim().split(/\s+/).map(value => parseInt(value));

  // creates a list of all description maps mapped to the corresponding Type
  const maps: DescriptionMap[] = inputArr.slice(1).map(item => extractDescriptionMap(item));

  const locations = applyMappings(seeds, maps);

  const lowestLocationNumber = Math.min(...locations);
  console.log(`Part One: ${lowestLocationNumber}`);
}

function extractDescriptionMap(mapRepresentation: string): DescriptionMap {
  const map: DescriptionMap = [];
  const mapLines = mapRepresentation.split(":")[1].trim().split(/\r\n/);

  mapLines.forEach(line => {
    const lineNumbers = line.trim().split(/\s+/);
    map.push({
      destinationRangeStart: parseInt(lineNumbers[0]),
      sourceRangeStart: parseInt(lineNumbers[1]),
      rangeLength: parseInt(lineNumbers[2])
    });
  });

  return map;
}

function isInRange(num: number, rangeStart: number, rangeLength: number) {
  return num >= rangeStart && num < rangeStart + rangeLength;
}

function applyMappings(source: number[], maps: DescriptionMap[]): number[] {
  let mappingResult: number[] = [];
  source.forEach(sourceValue => {
    let currentConversionValue = sourceValue;
    maps.forEach(map => {
      map.some(mapEntry => {
        // check if the seed is in range of one of the map entries
        const mappedValue = mapValueToDestination(currentConversionValue, mapEntry.sourceRangeStart, mapEntry.rangeLength, mapEntry.destinationRangeStart);
        if (mappedValue) {
          currentConversionValue = mappedValue;
          return true;
        }
        return false;
      });
    });
    mappingResult.push(currentConversionValue);
  });
  return mappingResult;
}

function mapValueToDestination(sourceValue: number, sourceStart: number, sourceRange: number, destStart: number): number | null {
  if (isInRange(sourceValue, sourceStart, sourceRange)) {
    const relativePos = sourceValue - sourceStart;
    const destValue = destStart + relativePos;
    return destValue;
  }
  return null;
}

function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  console.log(`Part Two: ${inputArr}`);
}

solvePartOne();
// solvePartTwo();
