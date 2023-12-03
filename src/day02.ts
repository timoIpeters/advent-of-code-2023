import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'input-02.txt';

const MAX_BAG_CONTENT: Record<string,number> = {
  red: 12,
  green: 13,
  blue: 14
}

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  const gameIDs: number[] = [];

  // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  // Task: What is the sum of the IDs of all games that are valid
  inputArr.forEach(line => {
    const sets = line
    .split(": ")[1]
    .split("; ");

    // a game (each line) is only valid if every reveal of every set is valid
    // a reveal is only valid if the amount of cubes of each color does not exceed the maximum available bag content that color
    let isGameValid = sets
    .every(set => {
      const reveals = set.split(", ");
      return reveals.every(reveal => {
        const [amount, color] = reveal.split(" ");
        return Number(amount) <= MAX_BAG_CONTENT[color];
      });
    });

    // add gameID if the game is valid
    if (isGameValid) {
      const gameID: number = Number(line.split(":")[0].split(" ")[1]);
      gameIDs.push(gameID);
    }
  });

  // sum up the gameIDs of all valid games
  const result = gameIDs.reduce((acc, curr) => acc + curr, 0);
  console.log(`Part One: ${result}`);
}

// What is the sum of the power of the minimal sets for each game
// the power of a set is defined as the product of their used cubes
function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);
  const powers: number[] = [];

  // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  inputArr.forEach(line => {
    const sets = line
    .split(": ")[1]
    .split("; ");

    const minimalGame: Record<string, number> = { red: 1, green: 1, blue: 1 }
    sets.forEach(set => {
      const reveals = set.split(", ");
      reveals.forEach(reveal => {
        const [amount, color] = reveal.split(" ");

        if(minimalGame[color] === null) {
          minimalGame[color] = Number(amount);
        } else if (Number(amount) > minimalGame[color]) {
          minimalGame[color] = Number(amount);
        }
      });
    });

    powers.push(minimalGame["red"] * minimalGame["green"] * minimalGame["blue"]);
    console.log(minimalGame)
  });

  const result = powers.reduce((acc, curr) => acc + curr, 0);
  console.log(`Part Two: ${result}`);
}

solvePartOne();
solvePartTwo();
