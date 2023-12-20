import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'input-04.txt';

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let result = 0;
  inputArr.forEach(card => {
    if (!card) return;

    const numbers = card.split(":")[1].split("|");
    const winningNumbers = numbers[0].trim().split(/\s+/);
    const yourNumbers = numbers[1].trim().split(/\s+/);
    
    let points = 0;
    winningNumbers.forEach(winningNumber => {
      if (yourNumbers.includes(winningNumber)) {
        points = (points === 0) ? (points + 1) : (points * 2);
      }
    });
    result += points;
  });

  console.log(`Part One: ${result}`);
}

function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  console.log(`Part Two: ${inputArr}`);
}

solvePartOne();
// solvePartTwo();
