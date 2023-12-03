import { match } from 'assert';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'input-01.txt';

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);
  let sum: number = 0;

  inputArr.forEach((line:string) => {
    const tempArr:string[] = [];
    [...line].forEach(c => {
      if (Number(c))  {
        tempArr.push(c) + "";
      }
    });


    if (!tempArr || !tempArr[0] || !tempArr[tempArr.length - 1]) {
      return;
    }

    sum += Number(tempArr[0].concat(tempArr[tempArr.length - 1]));
  });

  console.log(`Part One: ${sum}`);
}

// TODO: For me part 2 does not work, i am getting a slightly different value than the actually result. Probably i am not handling the "twone" case which should result in "21". Instead for me it results in "22" because only the "two" is recognized as a number
// Result of this method = 54558, but actual result should be 54578
function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);
  const pattern = /(?:one|two|three|four|five|six|seven|eight|nine|\d)/gi;


  const lineResults: string[] = [];
  inputArr.forEach(line => {
    const matches = line.match(pattern)?.map(castToNumeric);
    if (!matches || !matches[0]) {
      return;
    }

    lineResults.push(matches[0] + matches[matches.length - 1]);
  });

  const result = lineResults.map(val => Number(val)).reduce((acc, curr) => acc + curr, 0);
  console.log(`Part Two: ${result}`);
}

function castToNumeric(match: string) {
  const mapper: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  }

  return mapper[match.toLocaleLowerCase()] || match;
}

solvePartOne();
solvePartTwo();
