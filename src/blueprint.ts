import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'blueprint.txt';

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  console.log(`Part One: ${inputArr}`);
}

function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  console.log(`Part Two: ${inputArr}`);
}

solvePartOne();
solvePartTwo();
