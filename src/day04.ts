import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'input-04.txt';

interface Card {
  id: number;
  points: number;
  wins: number;
  amount: number;
}

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let result = 0;
  inputArr.forEach(card => {
    if (!card) return;

    result += createCardStruct(card).points;
  });

  console.log(`Part One: ${result}`);
}

function createCardStruct(card: string): Card {
  const cardId = parseInt(card.split(":")[0].split(" ")[1]);
  const numbers = card.split(":")[1].split("|");
  const winningNumbers = numbers[0].trim().split(/\s+/);
  const yourNumbers = numbers[1].trim().split(/\s+/);
  
  let points = 0;
  let wins = 0;
  winningNumbers.forEach(winningNumber => {
    if (yourNumbers.includes(winningNumber)) {
      points = (points === 0) ? (points + 1) : (points * 2);
      wins += 1;
    }
  });
  return { id: cardId, points: points, wins: wins, amount: 1 };
}

function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  const cards: Card[] = [];
  inputArr.forEach(card => {
    if (!card) return;
    cards.push(createCardStruct(card));
  });

  let result = 0;

  // Iterate through each card
  for (let i = 0; i < cards.length; i++) {
    const currentCard = cards[i];

    // If the current card has wins, distribute copies to the next cards
    for (let j = 1; j <= currentCard.wins; j++) {
      const nextCardIndex = i + j;

      // If the next card exists, add copies
      if (nextCardIndex < cards.length) {
        cards[nextCardIndex].amount += currentCard.amount;
      }
    }

    // Accumulate the final count based on the current card amount
    result += currentCard.amount;
  }

  console.log(`Part Two: ${result}`);
}

solvePartOne();
solvePartTwo();
